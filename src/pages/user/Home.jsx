import { useEffect, useState } from 'react';
import { foodItemService } from '../../services/api';
import { FoodCard } from '../../components/ui/FoodCard';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

function Home() {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { user } = useAuth();

  useEffect(() => {
    foodItemService.getAllItems().then(data => setItems(data));
  }, []);

  // Dynamically extract all unique categories from the database items!
  const categories = ["All", ...new Set(items.map(item => item.category))];

  // Filter items based on what button the customer clicked
  const filteredItems = selectedCategory === "All"
    ? items
    : items.filter(item => item.category === selectedCategory);

  // If the user isn't logged in, only give them a sneak peek of the first 3 items!
  const displayItems = user ? filteredItems : filteredItems.slice(0, 3);

  return (
    <div className="container py-5">

      {/* Hero Section */}
      <div className="text-center mb-5 pb-3">
        <h1 className="fw-bold mb-3" style={{ fontSize: '3rem', letterSpacing: '-0.025em' }}>
          Exceptional Dining
        </h1>
        <p className="text-muted mx-auto" style={{ maxWidth: '600px', fontSize: '1.125rem' }}>
          Explore our highly curated selection of dishes, crafted with passion and the finest ingredients.
        </p>
      </div>

      {/* Dynamic Category Filtering Buttons */}
      <div className="d-flex justify-content-center gap-2 mb-5 flex-wrap">
        {categories.map(category => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            variant={selectedCategory === category ? 'primary' : 'secondary'}
            className="rounded-pill px-4"
            disabled={!user}
            style={!user ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Grid System for the items with Overlay for unauthenticated users */}
      <div className="position-relative pb-5">

        <div
          className="row g-4"
          style={!user ? { filter: 'blur(6px)', pointerEvents: 'none', userSelect: 'none', opacity: 0.7 } : {}}
        >
          {displayItems.map(item => (
            <div key={item.id} className="col-12 col-md-6 col-lg-4">
              <FoodCard item={item} />
            </div>
          ))}

          {/* Empty state just in case */}
          {displayItems.length === 0 && (
            <div className="col-12 text-center py-5">
              <p className="text-muted fs-5">No items found in this category.</p>
            </div>
          )}
        </div>

        {/* Login Overlay - Only shows if user is NOT logged in */}
        {!user && (
          <div
            className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center"
            style={{ zIndex: 10, marginTop: displayItems.length > 0 ? '4rem' : '0' }}
          >
            <div className="bg-white p-5 rounded-4 shadow-lg text-center" style={{ maxWidth: '420px', border: '1px solid rgba(0,0,0,0.08)' }}>
              <div className="d-flex justify-content-center mb-3">
                <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                  <span className="material-symbols-outlined text-primary" style={{ fontSize: '40px' }}>lock</span>
                </div>
              </div>
              <h3 className="fw-bold mb-3" style={{ letterSpacing: '-0.025em' }}>Members Only</h3>
              <p className="text-muted mb-4 fs-6">
                Please log in to view our full menu, check prices, and place your order.
              </p>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Button variant="primary" className="w-100 py-3 fw-bold fs-6 shadow-sm">
                  Sign In to View Menu
                </Button>
              </Link>
            </div>
          </div>
        )}

      </div>



    </div>
  );
}

export default Home;
