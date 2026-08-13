import React from 'react';
import './Skeleton.css';

export function Skeleton({ width, height, borderRadius = '4px', className = '', style = {} }) {
  return (
    <div 
      className={`skeleton ${className}`} 
      style={{ width, height, borderRadius, ...style }} 
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="card h-100 border-0 shadow-sm overflow-hidden rounded-4">
      <Skeleton height="220px" borderRadius="0" />
      <div className="card-body p-4 d-flex flex-column gap-3">
        <Skeleton width="60%" height="24px" />
        <div className="d-flex gap-2">
           <Skeleton width="60px" height="24px" borderRadius="50rem" />
           <Skeleton width="80px" height="24px" borderRadius="50rem" />
        </div>
        <Skeleton width="100%" height="16px" className="mt-2" />
        <Skeleton width="90%" height="16px" />
        
        <div className="d-flex justify-content-between align-items-center mt-auto pt-4 border-top">
          <Skeleton width="60px" height="28px" />
          <Skeleton width="120px" height="38px" borderRadius="50rem" />
        </div>
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5, columns = 5 }) {
  return (
    <div className="table-responsive rounded border bg-white shadow-sm overflow-hidden">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            {[...Array(columns)].map((_, i) => (
              <th key={i} className="py-3 px-4">
                <Skeleton width="80%" height="16px" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(rows)].map((_, r) => (
            <tr key={r}>
              {[...Array(columns)].map((_, c) => (
                <td key={c} className="px-4 py-3">
                  <Skeleton width={c === 0 ? "40%" : "80%"} height="20px" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
