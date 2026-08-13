import { useEffect, useState } from 'react';
import { foodItemService } from '../../services/api';
import { FoodCard } from '../../components/ui/FoodCard';
import { CardSkeleton } from '../../components/ui/Skeleton';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const { user } = useAuth();

  const searchPlaceholders = [
    "I want something spicy...",
    "Craving a light salad today...",
    "Show me the best desserts...",
    "Something sweet and crispy..."
  ];

  // Debounce the search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 600);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Fetch items based on AI search or fetch all
  useEffect(() => {
    let ignore = false;
    setLoading(true);
    
    if (debouncedQuery.trim()) {
      setSelectedCategory("All"); // Reset category filter when searching
      foodItemService.searchItems(debouncedQuery)
        .then(data => {
          if (!ignore) {
            setItems(data);
            setLoading(false);
          }
        })
        .catch(err => {
          if (!ignore) {
            console.error("AI Search Error:", err);
            setLoading(false);
          }
        });
    } else {
      foodItemService.getAllItems()
        .then(data => {
          if (!ignore) {
            setItems(data);
            setLoading(false);
          }
        })
        .catch(err => {
          if (!ignore) {
            console.error("Fetch Error:", err);
            setLoading(false);
          }
        });
    }

    return () => {
      ignore = true;
    };
  }, [debouncedQuery]);

  // Rotate the search placeholder every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setPlaceholderIndex(prev => (prev + 1) % searchPlaceholders.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [searchPlaceholders.length]);

  // Dynamically extract all unique categories from the database items!
  const categories = ["All", ...new Set(items.map(item => item.category))];

  // Filter items based on what button the customer clicked
  const filteredItems = selectedCategory === "All"
    ? items
    : items.filter(item => item.category === selectedCategory);

  // Show all items regardless of authentication
  const displayItems = filteredItems;

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

      {/*Search Bar  */}
      <div className="row justify-content-center mb-4">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="position-relative shadow-sm rounded-pill">
            <span
              className="material-symbols-outlined position-absolute top-50 translate-middle-y text-primary ms-4"
              style={{ fontSize: '24px', pointerEvents: 'none' }}
            >
              auto_awesome
            </span>
            <input
              type="text"
              className="form-control form-control-lg bg-white border-0 rounded-pill transition"
              placeholder={searchPlaceholders[placeholderIndex]}
              style={{ padding: '1rem 2rem 1rem 3.5rem', fontSize: '1.05rem', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05)', transition: 'all 0.3s ease' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Dynamic Category Filtering Buttons */}
      {(!searchQuery && !debouncedQuery) && (
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
      )}

      <div className="position-relative pb-5">

        <div className="row g-4">
          {loading ? (
            /* Skeleton Loading State */
            [...Array(6)].map((_, i) => (
              <div key={i} className="col-12 col-md-6 col-lg-4">
                <CardSkeleton />
              </div>
            ))
          ) : (
            /* Actual Food Cards */
            displayItems.map(item => (
              <div key={item.id} className="col-12 col-md-6 col-lg-4">
                <FoodCard item={item} />
              </div>
            ))
          )}

          {/* Empty state just in case */}
          {!loading && displayItems.length === 0 && (
            <div className="col-12 text-center py-5">
              <p className="text-muted fs-5">No items found in this category.</p>
            </div>
          )}
        </div>


      </div>



    </div>
  );
}

export default Home;
