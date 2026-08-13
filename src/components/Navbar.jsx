import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import CartModal from './CartModal';
import { Button } from './ui/Button';

function Navbar() {
  const { totalItems } = useCart(); // Get real-time cart item count!
  const [isCartOpen, setIsCartOpen] = useState(false); // State to open/close cart sidebar
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile hamburger menu

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
                <Link className="nav-link fw-medium" to="/" onClick={() => setIsMobileMenuOpen(false)}>Menu</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-medium" to="/admin" onClick={() => setIsMobileMenuOpen(false)}>Admin Dashboard</Link>
              </li>
              
              {/* The Cart Button! */}
              <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                <Button 
                  variant="primary"
                  className="d-flex align-items-center justify-content-center gap-2 py-2 px-3 w-100" 
                  onClick={() => {
                    setIsCartOpen(true);
                    setIsMobileMenuOpen(false); // Close mobile menu when opening cart
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>shopping_cart</span>
                  <span className="fw-bold">Cart ({totalItems})</span>
                </Button>
              </li>
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
