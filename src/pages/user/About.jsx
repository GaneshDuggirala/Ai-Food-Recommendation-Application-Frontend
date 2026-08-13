import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

export default function About() {
  return (
    <div className="container py-5">
      <div className="text-center mb-5 pb-3">
        <h1 className="fw-bold mb-3" style={{ fontSize: '3rem', letterSpacing: '-0.025em' }}>
          Our Story
        </h1>
        <p className="text-muted mx-auto" style={{ maxWidth: '600px', fontSize: '1.125rem' }}>
          Discover the passion and history behind AI Powered Restaurant.
        </p>
      </div>

      <div className="row align-items-center g-5 mb-5 pb-5">
        <div className="col-12 col-lg-6">
          <h2 className="fw-bold mb-4" style={{ letterSpacing: '-0.025em' }}>A Culinary Journey</h2>
          <p className="text-muted fs-5 mb-4" style={{ lineHeight: '1.8' }}>
            Founded in 2018, AI Powered Restaurant blends cutting-edge culinary techniques with traditional, locally-sourced ingredients. Our mission is to provide an unparalleled dining experience that delights the senses and brings people together.
          </p>
          <p className="text-muted fs-5 mb-4" style={{ lineHeight: '1.8' }}>
            Whether you're here for a quick bite or a luxurious multi-course meal, our staff is dedicated to ensuring your time with us is truly exceptional. Every dish is meticulously crafted to showcase the natural flavors of our seasonal produce.
          </p>
          <Link to="/">
            <Button variant="primary" className="px-4 py-2 mt-2 fw-bold">Explore Our Menu</Button>
          </Link>
        </div>
        <div className="col-12 col-lg-6 text-center">
          <div className="rounded-4 shadow-sm overflow-hidden" style={{ height: '450px', width: '100%', border: '1px solid rgba(0,0,0,0.05)' }}>
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Restaurant Interior"
              className="w-100 h-100 object-fit-cover"
            />
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <section id="contact" className="py-5 mt-2 mb-4">
        <div className="row g-5">
          <div className="col-12 col-lg-5">
            <h2 className="fw-bold mb-4" style={{ letterSpacing: '-0.025em' }}>Get in Touch</h2>
            <p className="text-muted fs-5 mb-4">
              Have a question about our menu, need to make a reservation, or want to host a private event? We'd love to hear from you.
            </p>
            <div className="d-flex flex-column gap-3 mt-4">
              <div className="d-flex align-items-center gap-3">
                <div className="bg-light rounded p-2 d-flex align-items-center justify-content-center">
                  <span className="material-symbols-outlined text-primary">location_on</span>
                </div>
                <span className="fw-medium">123 Culinary Avenue, Food City, FC 90210</span>
              </div>
              <div className="d-flex align-items-center gap-3">
                <div className="bg-light rounded p-2 d-flex align-items-center justify-content-center">
                  <span className="material-symbols-outlined text-primary">call</span>
                </div>
                <span className="fw-medium">(555) 123-4567</span>
              </div>
              <div className="d-flex align-items-center gap-3">
                <div className="bg-light rounded p-2 d-flex align-items-center justify-content-center">
                  <span className="material-symbols-outlined text-primary">mail</span>
                </div>
                <span className="fw-medium">hello@airestaurant.com</span>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-7">
            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold text-muted small text-uppercase mb-2">Name</label>
                    <input type="text" className="form-control form-control-lg fs-6 bg-light border-0" placeholder="Your name" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold text-muted small text-uppercase mb-2">Email</label>
                    <input type="email" className="form-control form-control-lg fs-6 bg-light border-0" placeholder="Your email" />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-bold text-muted small text-uppercase mb-2">Message</label>
                    <textarea className="form-control bg-light border-0" rows="4" placeholder="How can we help you?"></textarea>
                  </div>
                  <div className="col-12 mt-4">
                    <Button variant="primary" type="submit" className="w-100 py-3 fw-bold fs-6">Send Message</Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
