import React, { useState, useEffect } from 'react';
import { orderService, foodItemService } from '../../services/api';
import { DataTable } from '../../components/ui/DataTable';
import { TableSkeleton } from '../../components/ui/Skeleton';

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [ordersData, itemsData] = await Promise.all([
        orderService.getAllOrders(),
        foodItemService.getAllItems()
      ]);
      setOrders(ordersData);
      setFoodItems(itemsData);
    } catch (error) {
      console.error("Failed to load data", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      loadData();
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    }
  };

  // ---------------- Dashboard Stats Calculation ----------------
  
  // 1. Total Revenue for the day
  const today = new Date().toISOString().split('T')[0];
  const todayOrders = orders.filter(o => o.created_at && o.created_at.startsWith(today));
  const totalRevenue = todayOrders.reduce((sum, o) => sum + (o.total_amount || 0), 0);

  // 2. Orders by Status
  const statusCounts = { Placed: 0, Confirmed: 0, Preparing: 0, Ready: 0, 'Picked Up': 0 };
  orders.forEach(o => {
    if (statusCounts[o.status] !== undefined) {
      statusCounts[o.status]++;
    }
  });

  // 3. Popular Items
  const itemCounts = {};
  orders.forEach(o => {
    if (o.item_id && Array.isArray(o.item_id)) {
      o.item_id.forEach((id, index) => {
        if (!itemCounts[id]) itemCounts[id] = 0;
        const qty = o.quantity && o.quantity[index] ? o.quantity[index] : 1;
        itemCounts[id] += qty;
      });
    } else {
      if (!itemCounts[o.item_id]) itemCounts[o.item_id] = 0;
      itemCounts[o.item_id] += (o.quantity || 1);
    }
  });
  
  const popularItemIds = Object.entries(itemCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3); // top 3

  const getFoodName = (id) => {
    const item = foodItems.find(f => f.id === Number(id));
    return item ? item.name : `Item #${id}`;
  };

  // ---------------- Table Configuration ----------------

  const columns = [
    { header: 'Order ID', key: 'order_id', render: (row) => <span className="fw-bold">{row.order_id}</span> },
    { header: 'Customer ID', key: 'user_id' },
    { header: 'Item', key: 'item_id', render: (row) => (
      <div className="d-flex flex-column gap-1">
        {row.item_id && Array.isArray(row.item_id) ? (
          row.item_id.map((id, index) => (
            <span key={index}>{getFoodName(id)} (x{row.quantity && row.quantity[index] ? row.quantity[index] : 1})</span>
          ))
        ) : (
          <span>{getFoodName(row.item_id)} (x{row.quantity})</span>
        )}
      </div>
    ) },
    { header: 'Date', key: 'created_at', render: (row) => row.created_at ? new Date(row.created_at).toLocaleString() : 'N/A' },
    { header: 'Total', key: 'total_amount', render: (row) => <span className="fw-medium text-success">${(row.total_amount || 0).toFixed(2)}</span> },
    { 
      header: 'Status', 
      key: 'status',
      render: (row) => {
        let bgClass = 'bg-secondary';
        if (row.status === 'Picked Up') bgClass = 'bg-success';
        if (row.status === 'Placed') bgClass = 'bg-warning text-dark';
        if (row.status === 'Preparing') bgClass = 'bg-primary';
        if (row.status === 'Confirmed') bgClass = 'bg-info text-dark';
        if (row.status === 'Ready') bgClass = 'bg-success bg-opacity-75';

        return (
          <div className="d-flex align-items-center gap-2">
            <span className={`badge ${bgClass} rounded-pill px-3 py-2`} style={{ minWidth: '90px' }}>{row.status}</span>
            <select 
              className="form-select form-select-sm rounded-pill border-0 shadow-sm"
              value={row.status}
              onChange={(e) => handleStatusChange(row.order_id, e.target.value)}
              style={{ width: '130px', cursor: 'pointer', fontSize: '0.8rem', backgroundColor: '#f8f9fa' }}
            >
              <option value="Placed">Placed</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Preparing">Preparing</option>
              <option value="Ready">Ready</option>
              <option value="Picked Up">Picked Up</option>
            </select>
          </div>
        );
      }
    }
  ];

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
        <div>
          <h2 className="fw-bold mb-1" style={{ letterSpacing: '-0.025em' }}>Order Management & Dashboard</h2>
          <p className="text-muted mb-0">Track incoming orders and view daily restaurant performance.</p>
        </div>
      </div>

      {/* Dashboard Stats Row */}
      {!loading && (
        <div className="row g-4 mb-5">
          <div className="col-12 col-md-4">
            <div className="card border-0 shadow-sm h-100 rounded-4 p-4">
              <h6 className="text-muted text-uppercase fw-bold mb-3" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>Today's Revenue</h6>
              <h2 className="fw-bold m-0 text-success">${totalRevenue.toFixed(2)}</h2>
              <p className="text-muted small mt-2 m-0">From all orders created today</p>
            </div>
          </div>
          
          <div className="col-12 col-md-4">
            <div className="card border-0 shadow-sm h-100 rounded-4 p-4">
              <h6 className="text-muted text-uppercase fw-bold mb-3" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>Orders by Status</h6>
              <div className="d-flex flex-column gap-2 small fw-medium">
                <div className="d-flex justify-content-between"><span>Placed:</span> <span>{statusCounts.Placed}</span></div>
                <div className="d-flex justify-content-between"><span>Preparing:</span> <span>{statusCounts.Preparing}</span></div>
                <div className="d-flex justify-content-between"><span>Ready / Picked Up:</span> <span className="text-success">{statusCounts.Ready + statusCounts['Picked Up']}</span></div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="card border-0 shadow-sm h-100 rounded-4 p-4">
              <h6 className="text-muted text-uppercase fw-bold mb-3" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>Popular Items</h6>
              <ul className="list-unstyled m-0 d-flex flex-column gap-2 small fw-medium">
                {popularItemIds.length === 0 && <li className="text-muted">No items ordered yet.</li>}
                {popularItemIds.map(([id, count]) => (
                  <li key={id} className="d-flex justify-content-between">
                    <span className="text-truncate" style={{ maxWidth: '180px' }}>{getFoodName(id)}</span>
                    <span className="text-primary">{count} ordered</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      
      {/* Data Table */}
      {loading ? (
        <TableSkeleton rows={5} columns={6} />
      ) : (
        <DataTable 
          columns={columns} 
          data={orders} 
          searchPlaceholder="Search orders by Order ID or Status..." 
          searchableKeys={['order_id', 'status', 'user_id']}
          itemsPerPage={10}
        />
      )}
    </div>
  );
}
