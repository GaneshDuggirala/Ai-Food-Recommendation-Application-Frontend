import { Badge } from './Badge';
import { Button } from './Button';
import { useCart } from '../../context/CartContext';

export function FoodCard({ item }) {
  // Grab the full cart and update tools from our global context
  const { cart, addToCart, updateQuantity } = useCart();
  
  // Check if this specific item is currently in the cart
  const cartItem = cart.find(i => i.id === item.id);

  return (
    <div className="card h-100">
      <img src={item.image_url} alt={item.name} className="card-img-top" style={{ height: '220px', objectFit: 'cover' }} />
      
      <div className="card-body d-flex flex-column p-4">
        <h5 className="card-title">{item.name}</h5>
        
        <div className="mb-3">
          {item.dietary_tags?.map(tag => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>

        <p className="card-text text-muted flex-grow-1" style={{ fontSize: '0.875rem' }}>
          {item.description}
        </p>
        
        <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
          <h5 className="fw-bold mb-0">${item.price.toFixed(2)}</h5>
          
          {/* Availability Check */}
          {item.availability !== false ? (
            
            cartItem ? (
              // ULTRA PREMIUM QUANTITY STEPPER
              <div 
                className="d-flex align-items-center justify-content-between rounded-pill shadow-sm" 
                style={{ 
                  width: '120px', 
                  backgroundColor: 'var(--bs-primary)', 
                  padding: '6px',
                  color: 'white',
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                {/* Minus Button: Translucent dark background */}
                <Button 
                  variant=""
                  className="btn-sm d-flex align-items-center justify-content-center p-0" 
                  onClick={() => updateQuantity(item.id, cartItem.quantity - 1)}
                  style={{ 
                    width: '28px', 
                    height: '28px', 
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.15)', 
                    color: 'white', 
                    border: 'none',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.25)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '16px', fontWeight: 600 }}>remove</span>
                </Button>
                
                {/* Number */}
                <span className="fw-bold text-center" style={{ fontSize: '0.95rem' }}>
                  {cartItem.quantity}
                </span>
                
                {/* Plus Button: Solid white background for visual emphasis */}
                <Button 
                  variant=""
                  className="btn-sm d-flex align-items-center justify-content-center p-0" 
                  onClick={() => updateQuantity(item.id, cartItem.quantity + 1)}
                  style={{ 
                    width: '28px', 
                    height: '28px', 
                    borderRadius: '50%',
                    backgroundColor: 'white', 
                    color: '#18181b', 
                    border: 'none',
                    transition: 'transform 0.1s'
                  }}
                  onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.85)'}
                  onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '16px', fontWeight: 600 }}>add</span>
                </Button>
              </div>
            ) : (
              // Default Add to Cart button
              <Button variant="primary" onClick={() => addToCart(item)}>Add to Cart</Button>
            )
            
          ) : (
             <span className="text-danger fw-bold" style={{fontSize: '0.875rem'}}>Sold Out</span>
          )}
        </div>
      </div>
    </div>
  );
}
