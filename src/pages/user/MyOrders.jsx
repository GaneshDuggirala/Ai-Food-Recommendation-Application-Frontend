import React, { useState, useEffect } from 'react';
import { orderService, foodItemService } from '../../services/api';
import { TableSkeleton } from '../../components/ui/Skeleton';
import { Link } from 'react-router-dom';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [ordersData, itemsData] = await Promise.all([
          orderService.getUserOrders(),
          foodItemService.getAllItems()
        ]);
        setOrders(ordersData);
        setFoodItems(itemsData);
      } catch (error) {
        console.error("Failed to load user orders:", error);
      }
      setLoading(false);
    };
    loadData();
  }, []);

  const getFoodItem = (id) => {
    return foodItems.find(f => f.id === Number(id)) || null;
  };

  const getStatusBadge = (status) => {
    let bgClass = 'bg-secondary';
    if (status === 'Picked Up') bgClass = 'bg-success';
    if (status === 'Placed') bgClass = 'bg-warning text-dark';
    if (status === 'Preparing') bgClass = 'bg-primary';
    if (status === 'Confirmed') bgClass = 'bg-info text-dark';
    if (status === 'Ready') bgClass = 'bg-success bg-opacity-75';

    return <span className={`badge ${bgClass} rounded-pill px-3 py-2`}>{status}</span>;
  };

  return (
    <div className="container py-5" style={{ minHeight: '60vh' }}>
      <div className="mb-5 border-bottom pb-3">
        <h2 className="fw-bold mb-1" style={{ letterSpacing: '-0.025em' }}>Your Orders</h2>
        <p className="text-muted">View and track the status of your recent orders.</p>
      </div>

      {loading ? (
        <TableSkeleton rows={3} columns={1} />
      ) : orders.length === 0 ? (
        <div className="text-center py-5">
          <span className="material-symbols-outlined text-muted mb-3" style={{ fontSize: '64px' }}>receipt_long</span>
          <h4 className="fw-bold">No orders yet</h4>
          <p className="text-muted mb-4">You haven't placed any orders with us yet.</p>
          <Link to="/" className="btn btn-primary px-4 py-2 rounded-pill fw-bold">Explore Menu</Link>
        </div>
      ) : (
        <div className="row g-4">
          {orders.map(order => {
            const item = getFoodItem(order.item_id);
            return (
              <div key={order.order_id} className="col-12 col-lg-6">
                <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden">
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3 border-bottom pb-3">
                      <div>
                        <span className="text-muted small fw-medium">Order ID: {order.order_id}</span>
                        <div className="mt-1 small text-muted">
                          {order.created_at ? new Date(order.created_at).toLocaleString() : 'Date unavailable'}
                        </div>
                      </div>
                      <div>
                        {getStatusBadge(order.status)}
                      </div>
                    </div>
                    <div className="d-flex flex-column gap-3 mt-2">
                      {order.item_id && Array.isArray(order.item_id) ? order.item_id.map((id, index) => {
                        const item = getFoodItem(id);
                        const qty = order.quantity && order.quantity[index] ? order.quantity[index] : 1;
                        return (
                          <div key={index} className="d-flex gap-3 align-items-center">
                            {item ? (
                              <img 
                                src={item.image_url} 
                                alt={item.name} 
                                className="rounded-3" 
                                style={{ width: '64px', height: '64px', objectFit: 'cover' }} 
                              />
                            ) : (
                              <div className="bg-light rounded-3 d-flex align-items-center justify-content-center text-muted" style={{ width: '64px', height: '64px' }}>
                                <span className="material-symbols-outlined">restaurant</span>
                              </div>
                            )}
                            
                            <div className="flex-grow-1">
                              <h6 className="fw-bold mb-1">{item ? item.name : `Item #${id}`}</h6>
                              <p className="text-muted mb-0 small fw-medium">Qty: {qty}</p>
                            </div>
                          </div>
                        );
                      }) : (
                        // Fallback for older orders where item_id was a single number
                        <div className="d-flex gap-3 align-items-center">
                          {(() => {
                            const item = getFoodItem(order.item_id);
                            return (
                              <>
                                {item ? (
                                  <img 
                                    src={item.image_url} 
                                    alt={item.name} 
                                    className="rounded-3" 
                                    style={{ width: '64px', height: '64px', objectFit: 'cover' }} 
                                  />
                                ) : (
                                  <div className="bg-light rounded-3 d-flex align-items-center justify-content-center text-muted" style={{ width: '64px', height: '64px' }}>
                                    <span className="material-symbols-outlined">restaurant</span>
                                  </div>
                                )}
                                
                                <div className="flex-grow-1">
                                  <h6 className="fw-bold mb-1">{item ? item.name : `Item #${order.item_id}`}</h6>
                                  <p className="text-muted mb-0 small fw-medium">Qty: {order.quantity}</p>
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      )}
                      
                      <div className="d-flex justify-content-between align-items-center border-top pt-3 mt-1">
                        <span className="fw-medium text-muted">Total Amount</span>
                        <h6 className="fw-bold text-success m-0">${(order.total_amount || 0).toFixed(2)}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
