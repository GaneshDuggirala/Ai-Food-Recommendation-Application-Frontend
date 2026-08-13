import { useEffect, useState } from 'react';
import { foodItemService } from '../../services/api';
import { FoodCard } from '../../components/ui/FoodCard';
import { Button } from '../../components/ui/Button';

function Home() {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    foodItemService.getAllItems().then(data => setItems(data));
  }, []);

  // Dynamically extract all unique categories from the database items!
  const categories = ["All", ...new Set(items.map(item => item.category))];

  // Filter items based on what button the customer clicked
  const filteredItems = selectedCategory === "All" 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  return (
    <div className="container py-5">
      
      {/* Premium Hero Section */}
      <div className="text-center mb-5 pb-3">
        <h1 className="fw-bold mb-3" style={{ fontSize: '3rem', letterSpacing: '-0.025em' }}>
          Exceptional Dining
        </h1>
        <p className="text-muted mx-auto" style={{ maxWidth: '600px', fontSize: '1.125rem' }}>
          Explore our highly curated selection of premium dishes, crafted with passion and the finest ingredients.
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
          >
            {category}
          </Button>
        ))}
      </div>
      
      {/* Grid System for the items */}
      <div className="row g-4">
        {filteredItems.map(item => (
          <div key={item.id} className="col-12 col-md-6 col-lg-4">
            <FoodCard item={item} />
          </div>
        ))}
        
        {/* Empty state just in case */}
        {filteredItems.length === 0 && (
          <div className="col-12 text-center py-5">
            <p className="text-muted fs-5">No items found in this category.</p>
          </div>
        )}
      </div>
      
    </div>
  );
}

export default Home;
