import { createContext, useContext, useState } from 'react';

// Create a context so any component can access the Cart!
const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]); // Array of items { ...foodItem, quantity: 1 }

  // Add an item to the cart or increase its quantity if it's already there
  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(i => i.id === item.id);
      if (existingItem) {
        // If it exists, increase quantity by 1
        return prevCart.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      // If it doesn't exist, add it with quantity 1
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  // Remove an item entirely
  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  // Update specific quantity (decrease or increase)
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prevCart => prevCart.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  // Clear the whole cart (used after checkout)
  const clearCart = () => setCart([]);

  // Automatically calculate total price and total items
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook so we don't have to import useContext everywhere
export function useCart() {
  return useContext(CartContext);
}
