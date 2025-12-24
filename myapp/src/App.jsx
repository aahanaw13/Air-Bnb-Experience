import React, { useState, useEffect, useRef } from 'react';
import "./App.css";

const experiences = [
  {
    id: 1,
    title: "Northern Lights Hunt",
    location: "Tromsø, Norway",
    price: 299,
    rating: 4.97,
    reviews: 234,
    duration: "6 hours",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80",
    category: "Adventure",
    featured: true
  },
  {
    id: 2,
    title: "Ice Hotel Stay",
    location: "Jukkasjärvi, Sweden",
    price: 450,
    rating: 4.92,
    reviews: 189,
    duration: "1 night",
    image: "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800&q=80",
    category: "Unique Stays"
  },
  {
    id: 3,
    title: "Glacier Hiking Expedition",
    location: "Reykjavik, Iceland",
    price: 175,
    rating: 4.98,
    reviews: 412,
    duration: "8 hours",
    image: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=800&q=80",
    category: "Adventure",
    featured: true
  },
  {
    id: 4,
    title: "Husky Sledding Safari",
    location: "Rovaniemi, Finland",
    price: 220,
    rating: 4.95,
    reviews: 567,
    duration: "4 hours",
    image: "https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?w=800&q=80",
    category: "Wildlife"
  },
  {
    id: 5,
    title: "Arctic Sauna & Ice Swimming",
    location: "Helsinki, Finland",
    price: 85,
    rating: 4.89,
    reviews: 321,
    duration: "3 hours",
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80",
    category: "Wellness"
  },
  {
    id: 6,
    title: "Snowmobile Aurora Chase",
    location: "Abisko, Sweden",
    price: 340,
    rating: 4.96,
    reviews: 156,
    duration: "5 hours",
    image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800&q=80",
    category: "Adventure"
  }
];

const destinations = [
  { name: "Iceland", count: 47, image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=600&q=80" },
  { name: "Norway", count: 38, image: "https://images.unsplash.com/photo-1520769669658-f07657f5a307?w=600&q=80" },
  { name: "Finland", count: 52, image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80" },
  { name: "Sweden", count: 29, image: "https://images.unsplash.com/photo-1548266652-99cf27701ced?w=600&q=80" }
];

const testimonials = [
  {
    name: "Sarah Chen",
    location: "San Francisco, USA",
    text: "Witnessing the Northern Lights from a glass igloo was the most magical experience of my life. Absolutely unforgettable.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    experience: "Glass Igloo Northern Lights"
  },
  {
    name: "Marcus Weber",
    location: "Berlin, Germany",
    text: "The glacier hike in Iceland pushed me out of my comfort zone. The blue ice caves are like stepping into another world.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    experience: "Glacier Hiking Expedition"
  },
  {
    name: "Yuki Tanaka",
    location: "Tokyo, Japan",
    text: "Dog sledding through Finnish Lapland at sunset was pure joy. The connection with the huskies was incredible.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    experience: "Husky Sledding Safari"
  }
];

// Icons
const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const PlayIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z"/>
  </svg>
);

const HeartIcon = ({ filled }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);

const SnowflakeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

// Experience Card Component
const ExperienceCard = ({ experience, index }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="experience-card"
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-image-container">
        <img src={experience.image} alt={experience.title} className="card-image" />
        <div className={`card-overlay ${isHovered ? 'visible' : ''}`} />
        <button 
          className={`like-button ${isLiked ? 'liked' : ''}`}
          onClick={() => setIsLiked(!isLiked)}
        >
          <HeartIcon filled={isLiked} />
        </button>
        <span className="category-tag">{experience.category}</span>
        {experience.featured && <span className="featured-tag">✦ Featured</span>}
      </div>
      <div className="card-content">
        <div className="card-header">
          <div className="rating">
            <StarIcon />
            <span>{experience.rating}</span>
            <span className="reviews">({experience.reviews})</span>
          </div>
          <span className="duration">{experience.duration}</span>
        </div>
        <h3 className="card-title">{experience.title}</h3>
        <p className="card-location">{experience.location}</p>
        <div className="card-footer">
          <span className="price">From <strong>${experience.price}</strong> / person</span>
        </div>
      </div>
    </div>
  );
};

// Video Section Component
const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="video-section">
      <div className="video-content">
        <div className="video-text">
          <span className="video-label">Experience the Arctic</span>
          <h2>Where Silence Speaks Louder Than Words</h2>
          <p>
            Immerse yourself in the pristine wilderness of the far north. 
            From the dance of the aurora borealis to the ancient glaciers that 
            have stood for millennia, discover experiences that will transform 
            your perspective on the world.
          </p>
          <button className="cta-button">Explore All Experiences</button>
        </div>
        <div className="video-container">
          <video
            ref={videoRef}
            src="https://cdn.coverr.co/videos/coverr-northern-lights-in-tromso-norway-5085/1080p.mp4"
            poster="https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80"
            loop
            muted
            playsInline
          />
          <button 
            className={`play-button ${isPlaying ? 'playing' : ''}`}
            onClick={togglePlay}
          >
            {isPlaying ? (
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1"/>
                <rect x="14" y="4" width="4" height="16" rx="1"/>
              </svg>
            ) : (
              <PlayIcon />
            )}
          </button>
          <div className="video-frost" />
        </div>
      </div>
    </section>
  );
};

// Destination Card
const DestinationCard = ({ destination, index }) => (
  <div className="destination-card" style={{ animationDelay: `${index * 0.15}s` }}>
    <img src={destination.image} alt={destination.name} />
    <div className="destination-overlay">
      <h3>{destination.name}</h3>
      <p>{destination.count} experiences</p>
    </div>
  </div>
);

// Testimonial Card
const TestimonialCard = ({ testimonial, index }) => (
  <div className="testimonial-card" style={{ animationDelay: `${index * 0.2}s` }}>
    <div className="quote-mark">"</div>
    <p className="testimonial-text">{testimonial.text}</p>
    <div className="testimonial-author">
      <img src={testimonial.avatar} alt={testimonial.name} className="author-avatar" />
      <div className="author-info">
        <strong>{testimonial.name}</strong>
        <span>{testimonial.location}</span>
        <span className="experience-tag">{testimonial.experience}</span>
      </div>
    </div>
  </div>
);

// Main App
export default function ArcticExperiences() {
  const [scrollY, setScrollY] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = ['All', 'Adventure', 'Unique Stays', 'Wildlife', 'Wellness'];

  const filteredExperiences = experiences.filter(exp => {
    const matchesCategory = activeCategory === 'All' || exp.category === activeCategory;
    const matchesSearch = exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exp.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="arctic-app">
      {/* Aurora Background */}
      <div className="aurora-bg">
        <div className="aurora-layer" />
      </div>

      {/* Snowfall */}
      <div className="snowfall">
        {[...Array(50)].map((_, i) => (
          <span
            key={i}
            className="snowflake"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${8 + Math.random() * 12}s`,
              animationDelay: `${Math.random() * 10}s`
            }}
          >
            ❄
          </span>
        ))}
      </div>

      {/* Header */}
      <header className={`header ${scrollY > 50 ? 'scrolled' : ''}`}>
        <div className="logo">
          <SnowflakeIcon />
          Arctic Escapes
        </div>
        <nav>
          <ul className="nav-links">
            <li><a href="#experiences">Experiences</a></li>
            <li><a href="#destinations">Destinations</a></li>
            <li><a href="#stories">Stories</a></li>
            <li><a href="#about">About</a></li>
          </ul>
        </nav>
        <div className="header-actions">
          <button className="host-button">Become a Host</button>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1920&q=80"
        >
          <source src="https://cdn.coverr.co/videos/coverr-northern-lights-in-tromso-norway-5085/1080p.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <div className="hero-content">
          <span className="hero-label">
            <SnowflakeIcon /> Winter 2024/25 Collection
          </span>
          <h1>Discover the Magic of the Frozen North</h1>
          <p>
            Curated experiences in the world's most breathtaking cold destinations. 
            From chasing auroras to sleeping in ice hotels, your arctic adventure awaits.
          </p>
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search destinations, experiences..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-button">
              <SearchIcon />
              Explore
            </button>
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <section className="section" id="experiences">
        <div className="section-header">
          <span className="section-label">Curated Adventures</span>
          <h2 className="section-title">Unforgettable Experiences</h2>
        </div>
        <div className="categories">
          {categories.map(cat => (
            <button
              key={cat}
              className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="experiences-grid">
          {filteredExperiences.map((exp, i) => (
            <ExperienceCard key={exp.id} experience={exp} index={i} />
          ))}
        </div>
      </section>

      {/* Destinations */}
      <section className="section" id="destinations">
        <div className="section-header">
          <span className="section-label">Where to Go</span>
          <h2 className="section-title">Explore Arctic Destinations</h2>
        </div>
        <div className="destinations-grid">
          {destinations.map((dest, i) => (
            <DestinationCard key={dest.name} destination={dest} index={i} />
          ))}
        </div>
      </section>

      {/* Video Section */}
      <VideoSection />

      {/* Testimonials */}
      <section className="testimonials-section" id="stories">
        <div className="section-header">
          <span className="section-label">Traveler Stories</span>
          <h2 className="section-title">Memories Worth Sharing</h2>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((test, i) => (
            <TestimonialCard key={i} testimonial={test} index={i} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <SnowflakeIcon />
              Arctic Escapes
            </div>
            <p>
              Connecting adventurers with extraordinary cold-weather experiences 
              across the world's most pristine northern landscapes.
            </p>
          </div>
          <div className="footer-links">
            <h4>Discover</h4>
            <ul>
              <li><a href="#">Northern Lights</a></li>
              <li><a href="#">Ice Hotels</a></li>
              <li><a href="#">Wildlife Safari</a></li>
              <li><a href="#">Winter Sports</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Support</h4>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Safety</a></li>
              <li><a href="#">Cancellation</a></li>
              <li><a href="#">Trust & Safety</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          © 2025 Arctic Escapes. All rights reserved. Made with ❄️ in the North.
        </div>
      </footer>
    </div>
  );
}