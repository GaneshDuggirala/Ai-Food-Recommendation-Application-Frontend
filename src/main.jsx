import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css' // <--- IMPORT BOOTSTRAP FIRST!
import './index.css' // <--- IMPORT OUR SHADCN OVERRIDES SECOND!
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Wrap the App in our CartProvider so every page can access the cart! */}
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>,
)
