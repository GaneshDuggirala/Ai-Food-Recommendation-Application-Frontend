export default function Chefs() {
  const chefsList = [
    {
      name: "Gordon Ramsay",
      role: "Executive Chef",
      image: "https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?q=80&w=465&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bio: "A multi-Michelin starred chef known for his extraordinary culinary vision and absolute perfectionism. With over 25 years of international experience, Gordon brings a relentless pursuit of flavor to every dish, crafting an unforgettable dining experience.",
      signature: "Beef Wellington with Truffle Jus",
      quote: "Cooking is about passion, so it may look slightly temperamental in a way that it's too assertive to the naked eye."
    },
    {
      name: "Dominique Crenn",
      role: "Head Pastry Chef",
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80",
      bio: "Brings poetic expression to our dessert menu, crafting visually stunning and incredibly delicious sweet creations. Dominique views every pastry as a canvas, blending seasonal fruits with avant-garde sugar work.",
      signature: "Midnight Chocolate Sphere",
      quote: "Food is art. It's a way to express yourself and share your soul with the world."
    },
    {
      name: "Massimo Bottura",
      role: "Sous Chef",
      image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800&q=80",
      bio: "Master of blending traditional Italian flavors with modern cooking techniques. Massimo's approach to our savory menu ensures that every bite respects the heritage of the ingredients while surprising the palate.",
      signature: "Five Ages of Parmigiano Reggiano",
      quote: "We are creating memories. That is the most beautiful thing about what we do."
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-dark text-white py-5 position-relative overflow-hidden">
        <div className="position-absolute w-100 h-100" style={{ top: 0, left: 0, opacity: 0.2, backgroundImage: "url('https://images.unsplash.com/photo-1556910103-1c02745a872f?w=1920&q=80')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className="container py-5 position-relative z-1 text-center">
          <h1 className="fw-bold mb-3 display-4" style={{ letterSpacing: '-0.025em' }}>
            Meet Our Masters
          </h1>
          <p className="mx-auto fs-5 text-white-50" style={{ maxWidth: '700px', lineHeight: '1.8' }}>
            The masterminds behind our curated menus. Our culinary team brings decades of Michelin-star experience directly to your table, pushing the boundaries of gastronomy.
          </p>
        </div>
      </section>

      {/* Chefs List */}
      <section className="container py-5 mt-4">
        <div className="row g-5">
          {chefsList.map((chef, index) => (
            <div key={index} className="col-12 col-lg-4">
              <div className="card border-0 h-100 shadow-sm rounded-4 overflow-hidden group-hover-effect">
                {/* Image Container with precise aspect ratio */}
                <div style={{ height: '350px', width: '100%', overflow: 'hidden' }}>
                  <img
                    src={chef.image}
                    alt={chef.name}
                    className="w-100 h-100 object-fit-cover transition"
                    style={{ filter: 'grayscale(20%)' }}
                  />
                </div>
                <div className="card-body p-4 p-xl-5 bg-white d-flex flex-column">
                  <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-bold text-uppercase mb-3 align-self-start" style={{ letterSpacing: '1px', fontSize: '0.75rem' }}>
                    {chef.role}
                  </span>
                  <h3 className="fw-bold mb-3">{chef.name}</h3>
                  <p className="text-muted mb-4 flex-grow-1" style={{ lineHeight: '1.7' }}>{chef.bio}</p>

                  <div className="border-top pt-4 mt-auto">
                    <p className="fw-bold text-dark mb-1 small text-uppercase">Signature Dish</p>
                    <p className="text-muted mb-4 fst-italic">"{chef.signature}"</p>
                    <blockquote className="border-start border-3 border-primary ps-3 mb-0">
                      <p className="text-secondary small fst-italic mb-0" style={{ lineHeight: '1.6' }}>
                        {chef.quote}
                      </p>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-light py-5 mt-5">
        <div className="container py-5 text-center">
          <span className="material-symbols-outlined text-primary mb-3" style={{ fontSize: '48px' }}>restaurant_menu</span>
          <h2 className="fw-bold mb-4">Our Culinary Philosophy</h2>
          <p className="text-muted mx-auto fs-5" style={{ maxWidth: '800px', lineHeight: '1.8' }}>
            We believe that extraordinary food requires an uncompromising dedication to quality. Our chefs source only the finest seasonal ingredients from local farms and trusted global artisans, transforming them into dishes that tell a story of passion, tradition, and innovation.
          </p>
        </div>
      </section>
    </div>
  );
}
