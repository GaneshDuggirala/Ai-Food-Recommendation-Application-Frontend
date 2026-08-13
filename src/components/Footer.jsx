import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-auto border-top border-secondary border-opacity-25">
      <div className="container">
        <div className="row gy-5">

          {/* Brand & Description */}
          <div className="col-12 col-lg-4 pe-lg-5">
            <Link className="d-flex align-items-center gap-2 text-white text-decoration-none mb-3" to="/">
              <span className="material-symbols-outlined text-white" style={{ fontSize: '28px' }}>restaurant</span>
              <span className="fw-bold fs-4" style={{ letterSpacing: '-0.025em' }}>Restaurant</span>
            </Link>
            <p className="text-secondary mb-4" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
              A culinary destination where tradition meets innovation. Join us for an unforgettable dining experience crafted with passion and locally sourced ingredients.
            </p>
            <div className="d-flex gap-4">
              <a href="#" className="text-secondary text-decoration-none hover-opacity-100 transition d-flex align-items-center gap-1">
                Instagram
              </a>
              <a href="#" className="text-secondary text-decoration-none hover-opacity-100 transition d-flex align-items-center gap-1">
                Facebook
              </a>
              <a href="#" className="text-secondary text-decoration-none hover-opacity-100 transition d-flex align-items-center gap-1">
                Twitter
              </a>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="col-12 col-md-6 col-lg-3 offset-lg-1">
            <h6 className="fw-bold text-uppercase mb-4 text-white-50" style={{ letterSpacing: '1px', fontSize: '0.8rem' }}>Opening Hours</h6>
            <ul className="list-unstyled d-flex flex-column gap-3 mb-0 text-secondary" style={{ fontSize: '0.95rem' }}>
              <li className="d-flex justify-content-between border-bottom border-secondary border-opacity-25 pb-2">
                <span>Mon - Thu</span>
                <span className="text-white fw-medium">11:00 AM - 10:00 PM</span>
              </li>
              <li className="d-flex justify-content-between border-bottom border-secondary border-opacity-25 pb-2">
                <span>Fri - Sat</span>
                <span className="text-white fw-medium">11:00 AM - 11:30 PM</span>
              </li>
              <li className="d-flex justify-content-between pb-1">
                <span>Sunday</span>
                <span className="text-white fw-medium">10:00 AM - 9:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Contact & Location */}
          <div className="col-12 col-md-6 col-lg-3 offset-lg-1">
            <h6 className="fw-bold text-uppercase mb-4 text-white-50" style={{ letterSpacing: '1px', fontSize: '0.8rem' }}>Contact Us</h6>
            <ul className="list-unstyled d-flex flex-column gap-3 mb-0 text-secondary" style={{ fontSize: '0.95rem' }}>
              <li className="d-flex gap-3 align-items-start">
                <span className="material-symbols-outlined fs-5 text-white">location_on</span>
                <span>123 Culinary Avenue<br />Food District, NY 10001</span>
              </li>
              <li className="d-flex gap-3 align-items-center">
                <span className="material-symbols-outlined fs-5 text-white">phone_in_talk</span>
                <a href="tel:+1234567890" className="text-white text-decoration-none hover-text-primary transition">(555) 123-4567</a>
              </li>
              <li className="d-flex gap-3 align-items-center">
                <span className="material-symbols-outlined fs-5 text-white">mail</span>
                <a href="mailto:hello@restaurant.com" className="text-white text-decoration-none hover-text-primary transition">hello@restaurant.com</a>
              </li>
            </ul>
          </div>

        </div>

        <hr className="border-secondary opacity-25 my-5" />

        {/* Bottom Footer */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <p className="text-secondary small mb-0">
            &copy; {new Date().getFullYear()} The Restaurant. All rights reserved.
          </p>
          <div className="d-flex gap-4 small">
            <a href="#" className="text-secondary text-decoration-none hover-text-white transition">Privacy Policy</a>
            <a href="#" className="text-secondary text-decoration-none hover-text-white transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
