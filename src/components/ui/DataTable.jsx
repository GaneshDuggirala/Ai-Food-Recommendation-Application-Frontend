import { useState, useMemo } from 'react';

export function DataTable({ 
  columns = [], 
  data = [], 
  searchPlaceholder = "Search...", 
  itemsPerPage = 10,
  searchableKeys = [] // keys to search on
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    const lowerSearch = searchTerm.toLowerCase();
    return data.filter(item => {
      // If searchableKeys is provided, only search those. Otherwise search all values.
      const keysToSearch = searchableKeys.length > 0 ? searchableKeys : Object.keys(item);
      return keysToSearch.some(key => {
        const val = item[key];
        return val != null && val.toString().toLowerCase().includes(lowerSearch);
      });
    });
  }, [data, searchTerm, searchableKeys]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // reset to page 1 on search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
      <div className="card-header bg-white border-bottom p-4 d-flex justify-content-between align-items-center">
        <div className="position-relative" style={{ maxWidth: '300px', width: '100%' }}>
          <span className="material-symbols-outlined position-absolute top-50 translate-middle-y text-muted ms-3" style={{ fontSize: '20px' }}>search</span>
          <input 
            type="text" 
            className="form-control bg-light border-0 ps-5 rounded-pill" 
            placeholder={searchPlaceholder} 
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light text-uppercase" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>
            <tr>
              {columns.map((col, i) => (
                <th key={i} className="py-3 px-4 text-muted fw-bold">{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="px-4 py-3">
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center py-5 text-muted">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="card-footer bg-white border-top p-3 d-flex justify-content-between align-items-center flex-wrap gap-3">
          <span className="text-muted small">
            Showing {filteredData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} entries
          </span>
          <nav>
            <ul className="pagination mb-0 pagination-sm gap-1">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button 
                  className={`page-link shadow-none border-0 fw-medium rounded ${currentPage === 1 ? 'text-muted opacity-50' : 'text-dark'}`} 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>
              {[...Array(totalPages)].map((_, i) => {
                // simple pagination logic to not show too many buttons if lots of pages
                if (totalPages > 5 && (i < currentPage - 2 || i > currentPage)) {
                  if (i === 0 || i === totalPages - 1) return (
                    <li key={i} className="page-item disabled"><span className="page-link text-dark shadow-none border-0">...</span></li>
                  )
                  return null;
                }
                const isActive = currentPage === i + 1;
                return (
                  <li key={i} className="page-item">
                    <button 
                      className={`page-link shadow-none border-0 fw-bold rounded px-3 ${isActive ? 'bg-dark text-white' : 'text-dark bg-transparent'}`} 
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                );
              })}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button 
                  className={`page-link shadow-none border-0 fw-medium rounded ${currentPage === totalPages ? 'text-muted opacity-50' : 'text-dark'}`} 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
