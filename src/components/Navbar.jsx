import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import CartModal from './CartModal';
import { Button } from './ui/Button';

function Navbar() {
  const { totalItems } = useCart();
  const { user, isAdmin, logout } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-top bg-white shadow-sm">
        <div className="container">

          <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
            <span className="material-symbols-outlined" style={{ fontSize: '24px', color: 'var(--bs-primary)' }}>restaurant</span>
            <span className="fw-bold" style={{ letterSpacing: '-0.025em' }}>Restaurant</span>
          </Link>

          {/* Mobile Hamburger Toggle Button */}
          <Button
            variant=""
            className="navbar-toggler border-0 px-0 focus-ring-none"
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ boxShadow: 'none' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '28px', color: 'var(--bs-primary)' }}>
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </Button>

          {/* Collapsible Menu Items */}
          <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`}>
            <ul className="navbar-nav ms-auto gap-3 mt-3 mt-lg-0 align-items-lg-center pb-3 pb-lg-0">
              <li className="nav-item">
                <Link className="nav-link fw-medium" to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link fw-medium" to="/chefs" onClick={() => setIsMobileMenuOpen(false)}>Our Chefs</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-medium" to="/about" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
              </li>


              {isAdmin && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link fw-medium" to="/admin" onClick={() => setIsMobileMenuOpen(false)}>Item Management</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link fw-medium" to="/admin/orders" onClick={() => setIsMobileMenuOpen(false)}>Order Management</Link>
                  </li>
                </>
              )}

              {!user ? (
                <li className="nav-item">
                  <Link className="nav-link fw-medium" to="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                </li>
              ) : (
                <li className="nav-item dropdown ms-lg-2">
                  <button 
                    className="nav-link btn btn-link d-flex align-items-center focus-ring-none position-relative" 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    style={{ textDecoration: 'none', boxShadow: 'none' }}
                  >
                    <span className="material-symbols-outlined fs-3 text-secondary transition hover-primary">account_circle</span>
                    {totalItems > 0 && (
                      <span 
                        className="position-absolute translate-middle badge rounded-pill bg-dark" 
                        style={{ top: '8px', right: '-12px', fontSize: '0.65rem', padding: '0.25em 0.5em' }}
                      >
                        {totalItems}
                      </span>
                    )}
                  </button>
                  
                  {isProfileOpen && (
                    <div 
                      className="dropdown-menu dropdown-menu-end show shadow-sm border-0 mt-2 rounded-3" 
                      style={{ right: 0, left: 'auto', minWidth: '180px' }}
                    >
                      <button 
                        className="dropdown-item d-flex align-items-center gap-3 py-2 fw-medium" 
                        onClick={() => { setIsCartOpen(true); setIsProfileOpen(false); setIsMobileMenuOpen(false); }}
                      >
                        <span className="material-symbols-outlined text-primary fs-5">shopping_cart</span>
                        Your Cart
                        {totalItems > 0 && <span className="badge bg-primary rounded-pill ms-auto">{totalItems}</span>}
                      </button>
                      <button 
                        className="dropdown-item d-flex align-items-center gap-3 py-2 fw-medium" 
                        onClick={() => { navigate('/my-orders'); setIsProfileOpen(false); setIsMobileMenuOpen(false); }}
                      >
                        <span className="material-symbols-outlined text-primary fs-5">receipt_long</span>
                        Your Orders
                      </button>
                      <div className="dropdown-divider my-1"></div>
                      <button 
                        className="dropdown-item d-flex align-items-center gap-3 py-2 fw-medium text-danger" 
                        onClick={() => { handleLogout(); setIsProfileOpen(false); }}
                      >
                        <span className="material-symbols-outlined fs-5">logout</span>
                        Sign Out
                      </button>
                    </div>
                  )}
                </li>
              )}
            </ul>
          </div>

        </div>
      </nav>

      {/* Render the Cart Sidebar here! It stays invisible until isCartOpen is true */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

export default Navbar;
