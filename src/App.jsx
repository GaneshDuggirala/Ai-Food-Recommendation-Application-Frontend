import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/user/Home';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      {/* The Navbar will show up on every single page! */}
      <Navbar />

      {/* The Routes determine which page loads based on the URL */}
      <Routes>
        {/* User Route: localhost:5173/ */}
        <Route path="/" element={<Home />} />

        {/* Admin Route: localhost:5173/admin */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
