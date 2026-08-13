import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/user/Home';
import About from './pages/user/About';
import Chefs from './pages/user/Chefs';
import AdminDashboard from './pages/admin/AdminDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import { useAuth } from './context/AuthContext';

function ProtectedRoute({ children, adminOnly = false }) {
  const { user, isAdmin, loading } = useAuth();

  if (loading) return <div className="d-flex justify-content-center py-5"><div className="spinner-border text-primary" role="status"></div></div>;
  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && !isAdmin) return <Navigate to="/" replace />;

  return children;
}

function GlobalFooter() {
  const location = useLocation();
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }
  return <Footer />;
}

function App() {
  return (
    <BrowserRouter>
      {/* Wrapper to ensure the footer is always pushed to the bottom of the screen */}
      <div className="d-flex flex-column min-vh-100">

        {/* The Navbar will show up on every single page! */}
        <Navbar />

        {/* The Routes determine which page loads based on the URL */}
        <main className="flex-grow-1">
          <Routes>
            {/* User Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/chefs" element={<Chefs />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Admin Route */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        {/* Conditionally rendered Footer */}
        <GlobalFooter />

      </div>
    </BrowserRouter>
  );
}

export default App;
