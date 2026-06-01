import { useState, useEffect, useRef } from 'react';

// Menu Items Database
const MENU_ITEMS = [
  {
    id: 1,
    title: "Rose Lavender Honey Latte",
    price: "$7.50",
    category: "brews",
    img: "assets/coffee.png",
    badge: "Signature",
    desc: "Double-shot espresso infused with wild organic lavender syrup, steamed oat milk, local honey drizzle, and food-grade rose petals.",
    dietary: "Vegan Friendly",
    dietaryIcon: "fa-seedling",
    nutrition: "180 kcal | Gluten Free"
  },
  {
    id: 2,
    title: "Glazed Botanical Salmon",
    price: "$26.00",
    category: "mains",
    img: "assets/signature.png",
    badge: "Chef's Choice",
    desc: "Pan-seared glazed salmon over a rich herb-infused green pea risotto, accompanied by roasted baby heirloom carrots, edible flowers, and fresh microgreens.",
    dietary: "Gluten Free",
    dietaryIcon: "fa-wheat-free",
    nutrition: "450 kcal | Rich in Omega-3"
  },
  {
    id: 3,
    title: "Cafeaz Cold Drip Gold",
    price: "$8.00",
    category: "brews",
    img: "assets/coffee.png",
    badge: null,
    desc: "18-hour slow cold drip coffee filtered through active bamboo charcoal, sweetened with artisanal orange blossom sugar, served over crystal clear ice spheres.",
    dietary: "Organic",
    dietaryIcon: "fa-leaf",
    nutrition: "15 kcal | Zero Sugar"
  },
  {
    id: 4,
    title: "Double Baked Almond Croissant",
    price: "$6.75",
    category: "pastries",
    img: "assets/coffee.png",
    badge: "Daily Fresh",
    desc: "Handcrafted flaky 72-layer croissant filled with roasted sweet almond frangipane, topped with organic sliced almonds, and dusted with powdered vanilla pod sugar.",
    dietary: "Contains Nuts",
    dietaryIcon: "fa-cheese",
    nutrition: "320 kcal | Baked Daily"
  },
  {
    id: 5,
    title: "Truffle Wild Mushroom Benedict",
    price: "$19.50",
    category: "mains",
    img: "assets/signature.png",
    badge: null,
    desc: "Poached organic barnyard eggs on house-made brioche, smothered with shaved Umbrian black truffle hollandaise, sautéed woodside mushrooms, and fresh chives.",
    dietary: "Vegetarian",
    dietaryIcon: "fa-carrot",
    nutrition: "380 kcal | Chef Recommended"
  },
  {
    id: 6,
    title: "Pistachio Rose Cardamom Tart",
    price: "$9.00",
    category: "pastries",
    img: "assets/coffee.png",
    badge: null,
    desc: "A crisp shortbread crust filled with rich pistachio paste cream, lightly scented with cardamom pod oils, decorated with candied rose buds and crushed gold leaf.",
    dietary: "Signature Dessert",
    dietaryIcon: "fa-award",
    nutrition: "240 kcal | Premium Ingredients"
  }
];

// Aesthetic Seating Zones
const ZONES = [
  {
    id: "terrace",
    name: "Garden Terrace",
    icon: "fa-cloud-sun",
    description: "Surrounded by blooming flora under soft daytime sunlight. Perfect for refreshing brunches."
  },
  {
    id: "greenhouse",
    name: "Greenhouse Lounge",
    icon: "fa-gem",
    description: "Intimate glass conservatory lighting under active hanging foliage. Ultimate cozy vibe."
  },
  {
    id: "bar",
    name: "Specialty Coffee & Chef's Bar",
    icon: "fa-mug-hot",
    description: "Observe the baristas and chefs work their magic up close on premium solid oak seating."
  }
];

// Guest Testimonial Reviews
const REVIEWS = [
  {
    id: 0,
    stars: 5,
    text: "Cafeaz is an absolute aesthetic dream. But unlike most beautiful cafes, their culinary game is incredibly premium! The Glazed Salmon was spectacular, and the lavender latte tastes like a field of flowers in spring.",
    avatarIcon: "fa-user-tie",
    name: "Audrey Vance",
    title: "Gourmet Journalist"
  },
  {
    id: 1,
    stars: 5,
    text: "The Greenhouse Lounge is my absolute go-to workspace and weekend sanctuary. The attention to detail—from the bamboo-filtered cold drip to the beautiful 72-layer croissants—is master-class.",
    avatarIcon: "fa-user",
    name: "Liam Fletcher",
    title: "Creative Director"
  },
  {
    id: 2,
    stars: 5,
    text: "My partner and I celebrated our anniversary on the Garden Terrace. The lighting, ambient forest-vibes, and black truffle mushroom benedict made it an unforgettable evening. Dynamic booking ticket was super cool!",
    avatarIcon: "fa-heart",
    name: "Sophia Sterling",
    title: "Regular Gastronomist"
  }
];

function App() {
  // Navigation & Menu Status
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  // About Philosophy Tabs
  const [activeTab, setActiveTab] = useState('coffee');

  // Menu Category Filter
  const [activeFilter, setActiveFilter] = useState('all');

  // Table Reservations System State
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingDate, setBookingDate] = useState(new Date().toISOString().split('T')[0]);
  const [bookingTime, setBookingTime] = useState('');
  const [bookingGuests, setBookingGuests] = useState('2');
  const [bookingZone, setBookingZone] = useState('Garden Terrace');
  const [bookingNotes, setBookingNotes] = useState('');

  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [bookingTicket, setBookingTicket] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);

  // Testimonials Carousel
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselTouchStartX = useRef(0);
  const autoplayTimer = useRef(null);

  // Newsletter Signup Club
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('idle'); // 'idle' | 'subscribed'

  // Header Scroll State & Section Intersection Spy
  useEffect(() => {
    const handleScroll = () => {
      // Toggle header scrolled styling
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Scroll Spy sections
      const sections = document.querySelectorAll('section, header');
      let currentSectionId = 'hero';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
          const id = section.getAttribute('id');
          if (id) currentSectionId = id;
        }
      });
      setActiveSection(currentSectionId);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for Scroll Reveals (.reveal elements)
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Trigger only once
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(elem => {
      revealObserver.observe(elem);
    });

    return () => revealObserver.disconnect();
  }, []);

  // Testimonials Carousel Autoplay Setup (6s cycle)
  const startAutoplay = () => {
    stopAutoplay();
    autoplayTimer.current = setInterval(() => {
      setCarouselIndex(prev => (prev + 1) % REVIEWS.length);
    }, 6000);
  };

  const stopAutoplay = () => {
    if (autoplayTimer.current) {
      clearInterval(autoplayTimer.current);
    }
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  // Testimonials Touch Swipe Event Handlers
  const handleTouchStart = (e) => {
    carouselTouchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const threshold = 50;
    if (carouselTouchStartX.current - touchEndX > threshold) {
      // Swipe left -> Next slide
      setCarouselIndex(prev => (prev + 1) % REVIEWS.length);
      startAutoplay();
    } else if (touchEndX - carouselTouchStartX.current > threshold) {
      // Swipe right -> Prev slide
      setCarouselIndex(prev => (prev - 1 + REVIEWS.length) % REVIEWS.length);
      startAutoplay();
    }
  };

  // Synchronize visual zone click with form select dropdown
  const handleZoneCardSelect = (zoneName) => {
    setBookingZone(zoneName);
  };

  // Sanctuary Table Booking Submit Handler
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setIsBookingLoading(true);

    // Simulate database lookup and confirmation delay (1.8s)
    setTimeout(() => {
      const formattedDate = new Date(bookingDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      // Generate secure unique ticket code
      const randNum = Math.floor(1000 + Math.random() * 9000);
      const randLetters = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + String.fromCharCode(65 + Math.floor(Math.random() * 26));
      const refCode = `AZ-2026-${randNum}-${randLetters}`;

      const ticketDetails = {
        name: bookingName,
        email: bookingEmail,
        date: formattedDate,
        time: bookingTime,
        guests: bookingGuests,
        zone: bookingZone,
        notes: bookingNotes || 'None',
        refNum: refCode
      };

      // Flip card animation sequences
      setIsFlipped(true);
      setTimeout(() => {
        setBookingTicket(ticketDetails);
        setIsBookingLoading(false);
        setIsFlipped(false);
      }, 400);

    }, 1800);
  };

  // Reset Booking Form back to clean state
  const handleResetBooking = () => {
    setBookingTicket(null);
    setBookingName('');
    setBookingEmail('');
    setBookingDate(new Date().toISOString().split('T')[0]);
    setBookingTime('');
    setBookingGuests('2');
    setBookingZone('Garden Terrace');
    setBookingNotes('');
  };

  // Newsletter Submit Club Handler
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setNewsletterStatus('subscribed');
    setNewsletterEmail('');

    // Micro-animation resets after 3s
    setTimeout(() => {
      setNewsletterStatus('idle');
    }, 3000);
  };

  // Toggle mobile navigation screen
  const toggleMobileMenu = () => {
    setIsMenuOpen(prev => {
      const nextState = !prev;
      if (nextState) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      return nextState;
    });
  };

  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      {/* Transparent Frosted Header */}
      <header className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-container">
          <a href="#" className="logo" onClick={handleNavLinkClick}>
            <span className="logo-accent">Cafe</span>az
          </a>
          
          <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`} id="navMenu">
            <a href="#hero" className={`nav-link ${activeSection === 'hero' ? 'active' : ''}`} onClick={handleNavLinkClick}>Home</a>
            <a href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`} onClick={handleNavLinkClick}>Our Story</a>
            <a href="#menu" className={`nav-link ${activeSection === 'menu' ? 'active' : ''}`} onClick={handleNavLinkClick}>The Menu</a>
            <a href="#reservation" className={`nav-link ${activeSection === 'reservation' ? 'active' : ''}`} onClick={handleNavLinkClick}>Reservations</a>
            <a href="#reviews" className={`nav-link ${activeSection === 'reviews' ? 'active' : ''}`} onClick={handleNavLinkClick}>Reviews</a>
            <a href="#reservation" className="nav-cta-mobile" onClick={handleNavLinkClick}>Reserve a Table</a>
          </nav>

          <div className="navbar-actions">
            <a href="#reservation" className="btn btn-primary btn-nav-cta">Reserve a Table</a>
            <button 
              className={`hamburger-menu ${isMenuOpen ? 'active' : ''}`} 
              onClick={toggleMobileMenu}
              aria-label="Toggle Menu"
            >
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section" id="hero">
        <div className="hero-background" style={{ backgroundImage: "linear-gradient(180deg, rgba(9, 30, 26, 0.4) 0%, rgba(9, 30, 26, 0.95) 100%), url('assets/hero.png')" }}></div>
        <div className="container hero-content">
          <div className="status-badge-wrapper fade-in">
            <span className="status-dot"></span>
            <span className="status-text">Open Daily: 8:00 AM — 11:00 PM</span>
          </div>
          <h1 className="hero-title fade-in delay-1">Savor the Art of <br/><span className="text-gradient">Gathering</span></h1>
          <p className="hero-subtitle fade-in delay-2">A sensory sanctuary blending master-roasted specialty coffee, vibrant botanical design, and chef-crafted artisan dining.</p>
          <div className="hero-ctas fade-in delay-3">
            <a href="#menu" className="btn btn-primary">Explore Our Menu</a>
            <a href="#reservation" className="btn btn-secondary"><i className="fa-regular fa-calendar-days"></i> Book a Table</a>
          </div>
        </div>
        <div className="scroll-indicator">
          <span className="mouse-scroll"></span>
        </div>
      </section>

      <main>
        {/* Story / About Section */}
        <section className="about-section section-padding" id="about">
          <div className="container">
            <div className="grid grid-2">
              <div className="about-content-block reveal">
                <span className="section-tagline">Crafted with Passion</span>
                <h2 class="section-title">Where Botanical Luxury <br/>Meets Gastronomy</h2>
                <p className="section-desc">At Cafeaz, we believe a dining experience should nourish all senses. Our space is custom-designed as an architectural conservatory, inviting you to escape under a lush glass canopy while enjoying outstanding plates.</p>
                
                <div className="philosophy-tabs">
                  <div className="tab-triggers">
                    <button 
                      className={`tab-trigger ${activeTab === 'coffee' ? 'active' : ''}`} 
                      onClick={() => setActiveTab('coffee')}
                    >
                      Our Coffee
                    </button>
                    <button 
                      className={`tab-trigger ${activeTab === 'ingredients' ? 'active' : ''}`} 
                      onClick={() => setActiveTab('ingredients')}
                    >
                      Artisan Prep
                    </button>
                    <button 
                      className={`tab-trigger ${activeTab === 'ambience' ? 'active' : ''}`} 
                      onClick={() => setActiveTab('ambience')}
                    >
                      The Space
                    </button>
                  </div>
                  
                  {activeTab === 'coffee' && (
                    <div className="tab-content active" id="tab-coffee">
                      <p>We source single-origin arabica beans ethically from micro-lots across Colombia and Ethiopia. Each batch is light-medium roasted in-house to preserve delicate floral and fruity notes.</p>
                    </div>
                  )}
                  {activeTab === 'ingredients' && (
                    <div className="tab-content active" id="tab-ingredients">
                      <p>Every pastry is laminated by hand daily using organic grass-fed butter. Our savory menu celebrates organic microgreens, hyper-seasonal heirloom produce, and fresh sustainable seafood.</p>
                    </div>
                  )}
                  {activeTab === 'ambience' && (
                    <div className="tab-content active" id="tab-ambience">
                      <p>Surrounded by over fifty exotic plant species and bathed in soft ambient sunbeams, our sanctuary is designed for relaxed morning brainstorms, cozy lunches, and unforgettable nights.</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="about-visuals reveal">
                <div className="visuals-wrapper">
                  <div className="main-visual-card">
                    <img src="assets/coffee.png" alt="Specialty Pour and Croissant at Cafeaz" className="about-img" />
                    <div className="floating-badge">
                      <i className="fa-solid fa-award"></i>
                      <span>Award-winning Barista Blend</span>
                    </div>
                  </div>
                  <div className="secondary-visual-card">
                    <div className="fact-card glassmorphic">
                      <span className="fact-number">100%</span>
                      <span className="fact-label">Ethically Sourced</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Menu Section */}
        <section className="menu-section section-padding" id="menu">
          <div className="container">
            <div className="section-header reveal text-center">
              <span className="section-tagline">Sensory Selections</span>
              <h2 className="section-title">The Seasonal Menu</h2>
              <p className="section-desc centered">Explore a curated menu combining complex, aromatic flavor profiles, artisanal plating, and handcrafted beverage blends.</p>
            </div>

            {/* Menu Filters */}
            <div className="menu-filters reveal">
              <button 
                className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`} 
                onClick={() => setActiveFilter('all')}
              >
                All Selections
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'brews' ? 'active' : ''}`} 
                onClick={() => setActiveFilter('brews')}
              >
                Specialty Brews
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'mains' ? 'active' : ''}`} 
                onClick={() => setActiveFilter('mains')}
              >
                Bistro Mains
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'pastries' ? 'active' : ''}`} 
                onClick={() => setActiveFilter('pastries')}
              >
                Artisanal Bakery
              </button>
            </div>

            {/* Menu Grid */}
            <div className="menu-grid reveal">
              {MENU_ITEMS.map((item) => {
                const isVisible = activeFilter === 'all' || item.category === activeFilter;
                return (
                  <div 
                    key={item.id}
                    className="menu-item glassmorphic" 
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'scale(1)' : 'scale(0.95)',
                      display: isVisible ? 'flex' : 'none',
                      transition: 'opacity 0.35s ease, transform 0.35s ease'
                    }}
                  >
                    <div className="menu-item-img-wrapper">
                      <img src={item.img} alt={item.title} className="menu-item-img" />
                      {item.badge && <span className="menu-item-badge">{item.badge}</span>}
                    </div>
                    <div className="menu-item-details">
                      <div className="menu-item-header">
                        <h3 className="menu-item-title">{item.title}</h3>
                        <span className="menu-item-price">{item.price}</span>
                      </div>
                      <p className="menu-item-desc">{item.desc}</p>
                      <div className="menu-item-footer">
                        <span className="dietary-tag"><i className={`fa-solid ${item.dietaryIcon}`}></i> {item.dietary}</span>
                        <span className="nutrition-hover" title={item.nutrition}><i className="fa-solid fa-circle-info"></i> Info</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Reservation Section */}
        <section className="reservation-section section-padding" id="reservation">
          <div className="container">
            <div className="grid grid-2 align-center">
              
              <div className="reservation-info reveal">
                <span className="section-tagline">Join Us</span>
                <h2 className="section-title">Reserve Your Table At The Sanctuary</h2>
                <p className="section-desc">Experience intimate evenings, bright weekend brunches, or exclusive gatherings in our custom zones. Select your preferred atmosphere to secure your space.</p>
                
                <div className="zone-cards">
                  {ZONES.map((zone) => (
                    <div 
                      key={zone.id}
                      className={`zone-card glassmorphic ${bookingZone === zone.name ? 'active' : ''}`} 
                      onClick={() => handleZoneCardSelect(zone.name)}
                    >
                      <div className="zone-icon"><i className={`fa-solid ${zone.icon}`}></i></div>
                      <div className="zone-details">
                        <h4>{zone.name}</h4>
                        <p>{zone.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="reservation-form-container reveal">
                <div 
                  className="booking-card glassmorphic" 
                  id="bookingCard"
                  style={{
                    transform: isFlipped ? 'rotateY(90deg)' : 'rotateY(0deg)',
                    opacity: isFlipped ? 0 : 1,
                    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  {bookingTicket ? (
                    <div className="booking-ticket">
                      <div className="ticket-header">
                        <i className="fa-solid fa-circle-check"></i>
                        <h3>Table Secured!</h3>
                        <p>We look forward to hosting you at Cafeaz</p>
                      </div>
                      <div className="ticket-details">
                        <div className="ticket-field">
                          <span className="label">Guest Host</span>
                          <span className="value">{bookingTicket.name}</span>
                        </div>
                        <div className="ticket-field">
                          <span className="label">Date</span>
                          <span className="value">{bookingTicket.date}</span>
                        </div>
                        <div className="ticket-field">
                          <span className="label">Time Frame</span>
                          <span className="value">{bookingTicket.time}</span>
                        </div>
                        <div className="ticket-field">
                          <span className="label">Party Size</span>
                          <span className="value">{bookingTicket.guests} {bookingTicket.guests === '1' ? 'Guest' : 'Guests'}</span>
                        </div>
                        <div className="ticket-field">
                          <span className="label">Aesthetic Zone</span>
                          <span className="value">{bookingTicket.zone}</span>
                        </div>
                        <div className="ticket-field">
                          <span className="label">Special Notes</span>
                          <span className="value">{bookingTicket.notes}</span>
                        </div>
                      </div>
                      <div className="ticket-footer">
                        <span className="label">Reservation Code</span>
                        <span className="ticket-ref">{bookingTicket.refNum}</span>
                        <span className="ticket-tip">A confirmation receipt has been sent to {bookingTicket.email}.</span>
                      </div>
                      <div className="ticket-actions">
                        <button className="btn btn-primary btn-block" onClick={() => window.print()}>
                          <i className="fa-solid fa-print"></i> Print Ticket
                        </button>
                        <button className="btn btn-secondary btn-block" onClick={handleResetBooking}>
                          Book Another Table
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="booking-card-header">
                        <h3>Online Reservation</h3>
                        <p>Instant secure confirmation in 60 seconds</p>
                      </div>
                      
                      <form onSubmit={handleBookingSubmit} className="booking-form">
                        <div className="form-row">
                          <div className="form-group">
                            <label htmlFor="bookingName">Full Name</label>
                            <div className="input-wrapper">
                              <i className="fa-solid fa-user"></i>
                              <input 
                                type="text" 
                                id="bookingName" 
                                placeholder="E.g. Mohammed Mehraj" 
                                value={bookingName}
                                onChange={(e) => setBookingName(e.target.value)}
                                required 
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label htmlFor="bookingEmail">Email Address</label>
                            <div className="input-wrapper">
                              <i className="fa-solid fa-envelope"></i>
                              <input 
                                type="email" 
                                id="bookingEmail" 
                                placeholder="name@domain.com" 
                                value={bookingEmail}
                                onChange={(e) => setBookingEmail(e.target.value)}
                                required 
                              />
                            </div>
                          </div>
                        </div>

                        <div className="form-row">
                          <div className="form-group">
                            <label htmlFor="bookingDate">Date</label>
                            <div className="input-wrapper">
                              <i className="fa-solid fa-calendar"></i>
                              <input 
                                type="date" 
                                id="bookingDate" 
                                min={new Date().toISOString().split('T')[0]}
                                value={bookingDate}
                                onChange={(e) => setBookingDate(e.target.value)}
                                required 
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label htmlFor="bookingTime">Preferred Time</label>
                            <div className="input-wrapper">
                              <i className="fa-solid fa-clock"></i>
                              <select 
                                id="bookingTime" 
                                value={bookingTime}
                                onChange={(e) => setBookingTime(e.target.value)}
                                required
                              >
                                <option value="" disabled>Select slot</option>
                                <option value="09:00 AM">09:00 AM (Brunch)</option>
                                <option value="11:30 AM">11:30 AM (Lunch)</option>
                                <option value="01:30 PM">01:30 PM (Lunch)</option>
                                <option value="04:00 PM">04:00 PM (High Tea)</option>
                                <option value="06:30 PM">06:30 PM (Dinner)</option>
                                <option value="08:30 PM">08:30 PM (Dinner)</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="form-row">
                          <div className="form-group">
                            <label htmlFor="bookingGuests">Party Size</label>
                            <div className="input-wrapper">
                              <i className="fa-solid fa-users"></i>
                              <select 
                                id="bookingGuests" 
                                value={bookingGuests}
                                onChange={(e) => setBookingGuests(e.target.value)}
                                required
                              >
                                <option value="1">1 Guest</option>
                                <option value="2">2 Guests</option>
                                <option value="4">4 Guests</option>
                                <option value="6">6 Guests</option>
                                <option value="8">8+ (Large Party)</option>
                              </select>
                            </div>
                          </div>
                          <div className="form-group">
                            <label htmlFor="bookingZone">Aesthetic Zone</label>
                            <div className="input-wrapper">
                              <i className="fa-solid fa-location-dot"></i>
                              <select 
                                id="bookingZone" 
                                value={bookingZone}
                                onChange={(e) => setBookingZone(e.target.value)}
                                required
                              >
                                <option value="Garden Terrace">Garden Terrace</option>
                                <option value="Greenhouse Lounge">Greenhouse Lounge</option>
                                <option value="Specialty Coffee & Chef's Bar">Specialty Coffee & Chef's Bar</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <label htmlFor="bookingNotes">Dietary Notes & Special Requests</label>
                          <div className="input-wrapper textarea-wrapper">
                            <i className="fa-solid fa-pen-nib"></i>
                            <textarea 
                              id="bookingNotes" 
                              rows="2" 
                              placeholder="Gluten allergy, celebrating anniversary, etc."
                              value={bookingNotes}
                              onChange={(e) => setBookingNotes(e.target.value)}
                            ></textarea>
                          </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block" disabled={isBookingLoading}>
                          <span>{isBookingLoading ? 'Processing Sanctuary Table...' : 'Confirm Table Booking'}</span>
                          {isBookingLoading && <i className="fa-solid fa-circle-notch fa-spin" style={{ marginLeft: '10px' }}></i>}
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="reviews-section section-padding" id="reviews">
          <div className="container">
            <div className="section-header reveal text-center">
              <span className="section-tagline">Connoisseur Notes</span>
              <h2 className="section-title">What Our Guests Say</h2>
              <p className="section-desc centered">Read stories from food aficionados, morning coffee regulars, and evening diners who share their moments at Cafeaz.</p>
            </div>

            <div className="reviews-carousel reveal">
              <div 
                className="carousel-track-container"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div 
                  className="carousel-track" 
                  style={{ 
                    transform: `translateX(-${carouselIndex * 100}%)`,
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    display: 'flex'
                  }}
                >
                  {REVIEWS.map((review) => (
                    <div key={review.id} className="carousel-slide" style={{ width: '100%', flexShrink: 0 }}>
                      <div className="review-card glassmorphic">
                        <div className="stars">
                          {[...Array(review.stars)].map((_, i) => (
                            <i key={i} className="fa-solid fa-star"></i>
                          ))}
                        </div>
                        <p className="review-text">{review.text}</p>
                        <div className="reviewer-meta">
                          <div className="reviewer-avatar">
                            <i className={`fa-solid ${review.avatarIcon}`}></i>
                          </div>
                          <div>
                            <h4 className="reviewer-name">{review.name}</h4>
                            <span className="reviewer-title">{review.title}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="carousel-nav">
                {REVIEWS.map((review) => (
                  <button 
                    key={review.id}
                    className={`carousel-indicator ${carouselIndex === review.id ? 'active' : ''}`} 
                    onClick={() => {
                      setCarouselIndex(review.id);
                      startAutoplay();
                    }}
                    aria-label={`Slide ${review.id + 1}`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer-wrapper">
        <div className="container footer-content grid grid-4">
          
          <div className="footer-brand">
            <a href="#" className="logo footer-logo">
              <span className="logo-accent">Cafe</span>az
            </a>
            <p className="brand-desc">A botanical-inspired luxury café and bistro experience, nurturing standard culinary artistry and ethical coffee blends.</p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" className="social-link" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="social-link" aria-label="Pinterest"><i className="fa-brands fa-pinterest-p"></i></a>
              <a href="#" className="social-link" aria-label="Yelp"><i className="fa-brands fa-yelp"></i></a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Explore</h4>
            <ul>
              <li><a href="#about">The Concept</a></li>
              <li><a href="#menu">Our Menu</a></li>
              <li><a href="#reservation">Table Reservations</a></li>
              <li><a href="#reviews">Guest Feedback</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Say Hello</h4>
            <p><i className="fa-solid fa-location-dot"></i> 448 Greenhouse Blvd, <br/>Botanical District, NY 10014</p>
            <p><i className="fa-solid fa-phone"></i> +1 (212) 555-8829</p>
            <p><i className="fa-solid fa-envelope"></i> curate@cafeaz.com</p>
          </div>

          <div className="footer-newsletter">
            <h4>Connoisseur's Club</h4>
            <p>Subscribe to receive rare tasting micro-lot invites and seasonal secret menus.</p>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <div className="input-wrapper">
                <i className="fa-solid fa-paper-plane"></i>
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required 
                  disabled={newsletterStatus === 'subscribed'}
                />
              </div>
              <button 
                type="submit" 
                className="btn btn-primary btn-newsletter-submit"
                style={{
                  backgroundColor: newsletterStatus === 'subscribed' ? '#2ec4b6' : '',
                  color: newsletterStatus === 'subscribed' ? '#fff' : '',
                  borderColor: newsletterStatus === 'subscribed' ? '#2ec4b6' : ''
                }}
                disabled={newsletterStatus === 'subscribed'}
              >
                {newsletterStatus === 'subscribed' ? 'Welcome!' : 'Join'}
              </button>
            </form>
          </div>

        </div>

        <div className="footer-bottom text-center">
          <div className="container footer-bottom-container">
            <p>&copy; 2026 Cafeaz. Handcrafted with passion. All rights reserved.</p>
            <div className="footer-legal-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
