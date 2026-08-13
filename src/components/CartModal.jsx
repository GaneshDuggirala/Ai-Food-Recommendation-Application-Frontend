import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/Button';
import { useNavigate } from 'react-router-dom';

export default function CartModal({ isOpen, onClose }) {
  const { cart, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleCheckout = () => {
    if (!user) {
      onClose();
      navigate('/login');
      return;
    }
    alert("Checkout functionality coming in Phase 2 with Backend Orders!");
  };

  return (
    <>
      {/* Dark overlay background that closes the modal when clicked */}
      <div 
        className="position-fixed top-0 start-0 w-100 h-100 bg-dark" 
        style={{ opacity: 0.5, zIndex: 1040 }} 
        onClick={onClose}
      ></div>

      {/* Sliding Sidebar Cart (Right side of screen) */}
      <div 
        className="position-fixed top-0 end-0 h-100 bg-white shadow-lg d-flex flex-column" 
        style={{ width: '400px', maxWidth: '100vw', zIndex: 1050, transform: 'translateX(0)', transition: 'transform 0.3s ease-in-out' }}
      >
        {/* Header */}
        <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
          <h4 className="fw-bold m-0">Your Order</h4>
          <Button variant="light" className="rounded-circle p-2 d-flex align-items-center justify-content-center" onClick={onClose}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>close</span>
          </Button>
        </div>

        {/* Cart Items Area */}
        <div className="p-4 flex-grow-1 overflow-auto">
          {cart.length === 0 ? (
            <p className="text-muted text-center mt-5">Your cart is completely empty.</p>
          ) : (
            <ul className="list-unstyled">
              {cart.map(item => (
                <li key={item.id} className="d-flex align-items-center gap-3 mb-4 pb-3 border-bottom">
                  {/* Thumbnail */}
                  <img src={item.image_url} alt={item.name} className="rounded" style={{ width: '64px', height: '64px', objectFit: 'cover' }} />
                  
                  {/* Item Details */}
                  <div className="flex-grow-1">
                    <h6 className="fw-bold m-0 text-truncate" style={{ maxWidth: '120px' }}>{item.name}</h6>
                    <span className="text-success fw-bold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>

                  {/* Quantity Controls */}
                  <div 
                    className="d-flex align-items-center rounded-pill" 
                    style={{ backgroundColor: '#f4f4f5', padding: '4px' }}
                  >
                    <Button 
                      variant=""
                      className="btn-sm d-flex align-items-center justify-content-center p-0" 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: 'white', color: '#71717a', border: '1px solid var(--bs-border-color)' }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '14px', fontWeight: 600 }}>remove</span>
                    </Button>
                    
                    <span className="fw-bold text-center" style={{ width: '32px', fontSize: '0.875rem', color: 'var(--bs-primary)' }}>
                      {item.quantity}
                    </span>
                    
                    <Button 
                      variant=""
                      className="btn-sm d-flex align-items-center justify-content-center p-0 shadow-sm" 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: 'var(--bs-primary)', color: 'white', border: 'none' }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '14px', fontWeight: 600 }}>add</span>
                    </Button>
                  </div>
                  
                  {/* Delete Button */}
                  <Button variant="outline-danger" className="btn-sm border-0 p-2" onClick={() => removeFromCart(item.id)}>
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>delete</span>
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer Area with Total and Checkout Button */}
        {cart.length > 0 && (
          <div className="p-4 border-top bg-light">
            <div className="d-flex justify-content-between mb-3">
              <span className="fs-5 text-muted">Total</span>
              <span className="fs-4 fw-bold text-success">${totalPrice.toFixed(2)}</span>
            </div>
            <Button variant="primary" className="w-100 py-3 fw-bold fs-5 shadow-sm" onClick={handleCheckout}>
              Place Order
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
