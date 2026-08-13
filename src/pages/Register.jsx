import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/api';
import { Button } from '../components/ui/Button';

export default function Register() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await authService.register(formData);
      // Automatically navigate to login after successful registration
      navigate('/login');
    } catch (err) {
      const detail = err.response?.data?.detail;
      let errorMessage = 'Failed to register. Please try again.';

      if (typeof detail === 'string') {
        errorMessage = detail;
      } else if (Array.isArray(detail)) {
        errorMessage = 'Please check your inputs and try again.';
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="card shadow-lg border-0" style={{ width: '100%', maxWidth: '450px', borderRadius: '1rem' }}>
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <h2 className="fw-bold mb-2" style={{ letterSpacing: '-0.025em' }}>Create Account</h2>
            <p className="text-muted">Join us to start ordering meals</p>
          </div>

          {error && (
            <div className="alert alert-danger p-3 mb-4" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="row g-3 mb-4">
              <div className="col-6">
                <label className="form-label fw-bold text-muted small text-uppercase mb-2">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  className="form-control form-control-lg fs-6"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="John"
                  required
                />
              </div>
              <div className="col-6">
                <label className="form-label fw-bold text-muted small text-uppercase mb-2">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  className="form-control form-control-lg fs-6"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold text-muted small text-uppercase mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-control form-control-lg fs-6"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold text-muted small text-uppercase mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                className="form-control form-control-lg fs-6"
                value={formData.phone}
                onChange={handleChange}
                placeholder="555-0123"
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold text-muted small text-uppercase mb-2">Password</label>
              <input
                type="password"
                name="password"
                className="form-control form-control-lg fs-6"
                value={formData.password}
                onChange={handleChange}
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
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <div className="text-center mt-4 pt-3 border-top">
            <p className="text-muted mb-0">
              Already have an account? <Link to="/login" className="fw-bold text-primary text-decoration-none">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
