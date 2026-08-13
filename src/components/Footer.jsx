import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-auto">
      <div className="container">
        <div className="row gy-4">

          {/* Brand & Description */}
          <div className="col-12 col-lg-4 pe-lg-5">
            <Link className="d-flex align-items-center gap-2 text-white text-decoration-none mb-3" to="/">
              <span className="material-symbols-outlined" style={{ fontSize: '28px', color: 'var(--bs-primary)' }}>restaurant</span>
              <span className="fw-bold fs-4" style={{ letterSpacing: '-0.025em' }}>Restaurant</span>
            </Link>
            <p className="text-secondary mb-4" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
              Experience exceptional dining with our highly curated selection of dishes, crafted with passion and the finest ingredients for an unforgettable culinary journey.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-secondary text-decoration-none text-opacity-75 hover-opacity-100 transition">
                <span className="material-symbols-outlined fs-5">language</span>
              </a>
              <a href="#" className="text-secondary text-decoration-none text-opacity-75 hover-opacity-100 transition">
                <span className="material-symbols-outlined fs-5">share</span>
              </a>
              <a href="#" className="text-secondary text-decoration-none text-opacity-75 hover-opacity-100 transition">
                <span className="material-symbols-outlined fs-5">mail</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-6 col-lg-2 offset-lg-1">
            <h6 className="fw-bold text-uppercase mb-4 text-white-50" style={{ letterSpacing: '1px', fontSize: '0.8rem' }}>Explore</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
              <li><Link to="/" className="text-secondary text-decoration-none transition">Home</Link></li>
              <li><Link to="/chefs" className="text-secondary text-decoration-none transition">Our Chefs</Link></li>
              <li><Link to="/about" className="text-secondary text-decoration-none transition">About Us</Link></li>
              <li><Link to="/about#contact" className="text-secondary text-decoration-none transition">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-6 col-lg-2">
            <h6 className="fw-bold text-uppercase mb-4 text-white-50" style={{ letterSpacing: '1px', fontSize: '0.8rem' }}>Legal</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
              <li><a href="#" className="text-secondary text-decoration-none transition">Terms of Service</a></li>
              <li><a href="#" className="text-secondary text-decoration-none transition">Privacy Policy</a></li>
              <li><a href="#" className="text-secondary text-decoration-none transition">Refund Policy</a></li>
              <li><a href="#" className="text-secondary text-decoration-none transition">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div className="col-12 col-lg-3">
            <h6 className="fw-bold text-uppercase mb-4 text-white-50" style={{ letterSpacing: '1px', fontSize: '0.8rem' }}>Stay Updated</h6>
            <p className="text-secondary small mb-3">Subscribe to our newsletter for the latest menus and exclusive offers.</p>
            <form className="d-flex gap-2 mb-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                className="form-control form-control-sm bg-dark text-white border-secondary"
                placeholder="Email address"
                style={{ borderRadius: '0.375rem' }}
              />
              <button type="submit" className="btn btn-primary btn-sm px-3 fw-medium">
                Subscribe
              </button>
            </form>
          </div>

        </div>

        <hr className="border-secondary opacity-25 my-4" />

        {/* Copyright */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <p className="text-secondary small mb-0">
            &copy; {new Date().getFullYear()} AI Powered Restaurant. All rights reserved.
          </p>
          <p className="text-secondary small mb-0 d-flex align-items-center gap-1">
            Crafted with <span className="material-symbols-outlined text-danger" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>favorite</span> for food lovers
          </p>
        </div>
      </div>
    </footer>
  );
}
