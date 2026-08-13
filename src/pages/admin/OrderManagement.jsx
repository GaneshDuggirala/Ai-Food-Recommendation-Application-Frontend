import React, { useState, useEffect } from 'react';
import { DataTable } from '../../components/ui/DataTable';
import { TableSkeleton } from '../../components/ui/Skeleton';

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockOrders = [
      { id: 'ORD-001', customer: 'John Doe', total: 45.99, status: 'Pending', date: '2023-10-25' },
      { id: 'ORD-002', customer: 'Jane Smith', total: 112.50, status: 'Completed', date: '2023-10-26' },
      { id: 'ORD-003', customer: 'Bob Wilson', total: 24.00, status: 'Processing', date: '2023-10-26' },
      { id: 'ORD-004', customer: 'Alice Brown', total: 89.99, status: 'Completed', date: '2023-10-27' },
      { id: 'ORD-005', customer: 'Charlie Davis', total: 15.50, status: 'Cancelled', date: '2023-10-27' },
      { id: 'ORD-006', customer: 'Eva Green', total: 210.00, status: 'Pending', date: '2023-10-28' },
      { id: 'ORD-007', customer: 'Sarah Connor', total: 34.20, status: 'Completed', date: '2023-10-29' },
      { id: 'ORD-008', customer: 'Miles Dyson', total: 78.50, status: 'Processing', date: '2023-10-29' },
      { id: 'ORD-009', customer: 'Kyle Reese', total: 12.00, status: 'Pending', date: '2023-10-30' },
      { id: 'ORD-010', customer: 'T-800', total: 450.00, status: 'Cancelled', date: '2023-10-30' },
      { id: 'ORD-011', customer: 'John Connor', total: 88.90, status: 'Completed', date: '2023-10-31' },
      { id: 'ORD-012', customer: 'Ellen Ripley', total: 115.00, status: 'Pending', date: '2023-11-01' },
    ];
    
    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 500);
  }, []);

  const columns = [
    { header: 'Order ID', key: 'id', render: (row) => <span className="fw-bold">{row.id}</span> },
    { header: 'Customer Name', key: 'customer' },
    { header: 'Date', key: 'date' },
    { header: 'Total', key: 'total', render: (row) => `$${row.total.toFixed(2)}` },
    { 
      header: 'Status', 
      key: 'status',
      render: (row) => {
        let bgClass = 'bg-secondary';
        if (row.status === 'Completed') bgClass = 'bg-success';
        if (row.status === 'Pending') bgClass = 'bg-warning text-dark';
        if (row.status === 'Processing') bgClass = 'bg-primary';
        if (row.status === 'Cancelled') bgClass = 'bg-danger';
        return <span className={`badge ${bgClass} rounded-pill px-3 py-2`}>{row.status}</span>;
      }
    },
    { 
      header: 'Actions', 
      key: 'actions',
      render: (row) => (
        <button className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1 rounded-pill px-3">
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>visibility</span>
          View
        </button>
      )
    }
  ];

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
        <div>
          <h2 className="fw-bold mb-1" style={{ letterSpacing: '-0.025em' }}>Order Management</h2>
          <p className="text-muted mb-0">Track, manage, and process all customer orders.</p>
        </div>
      </div>
      
      {loading ? (
        <TableSkeleton rows={5} columns={6} />
      ) : (
        <DataTable 
          columns={columns} 
          data={orders} 
          searchPlaceholder="Search orders by ID, Customer Name, or Status..." 
          searchableKeys={['id', 'customer', 'status']}
          itemsPerPage={5}
        />
      )}
    </div>
  );
}
