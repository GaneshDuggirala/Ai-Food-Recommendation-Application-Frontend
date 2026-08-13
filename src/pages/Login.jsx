import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const data = await authService.login(email, password);
      login(data.access_token);
      
      // We don't have the role immediately until context updates, but we can decode it here to redirect admin
      const tokenPayload = JSON.parse(atob(data.access_token.split('.')[1]));
      if (tokenPayload.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="card shadow-lg border-0" style={{ width: '100%', maxWidth: '450px', borderRadius: '1rem' }}>
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <h2 className="fw-bold mb-2" style={{ letterSpacing: '-0.025em' }}>Welcome Back</h2>
            <p className="text-muted">Enter your details to access your account</p>
          </div>

          {error && (
            <div className="alert alert-danger p-3 mb-4" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label fw-bold text-muted small text-uppercase mb-2">Email Address</label>
              <input 
                type="email" 
                className="form-control form-control-lg fs-6" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required 
              />
            </div>
            
            <div className="mb-4">
              <label className="form-label fw-bold text-muted small text-uppercase mb-2">Password</label>
              <input 
                type="password" 
                className="form-control form-control-lg fs-6" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required 
              />
            </div>

            <Button 
              variant="primary" 
              type="submit" 
              className="w-100 py-3 fw-bold fs-6 mt-2" 
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="text-center mt-4 pt-3 border-top">
            <p className="text-muted mb-0">
              Don't have an account? <Link to="/register" className="fw-bold text-primary text-decoration-none">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
