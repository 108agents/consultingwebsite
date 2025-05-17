import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/hero-section-new.css';

const HeroSection: React.FC = () => {
  // Removed carousel state as we're using static content in the new design
  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__content">          <h1 className="hero__title">Transforming Indian MSMEs Through Expert Consulting</h1>
          <div className="hero__accent"></div>
          <h2 className="hero__subtitle">Driving Innovation in Government Initiatives</h2>
          
          <p className="hero__description">
            Strategic solutions for government initiatives and private enterprises 
            to drive innovation and economic growth with measurable outcomes
          </p>
          
          <p className="hero__description">
            Empowering MSMEs with tailored strategies for global competitiveness 
            and technological advancement
          </p>
          
          <div className="hero__buttons">
            <Link to="/contact-us" className="hero__button hero__button--primary">Schedule a Consultation</Link>
            <Link to="/recent-projects" className="hero__button hero__button--secondary">View Our Projects</Link>
          </div>
          
          <div className="hero__stats">
            <div className="hero__stat">
              <div className="hero__stat-number">50+</div>
              <div className="hero__stat-label">Government Projects</div>
            </div>
            <div className="hero__stat">
              <div className="hero__stat-number">100+</div>
              <div className="hero__stat-label">MSMEs Developed</div>
            </div>
            <div className="hero__stat">
              <div className="hero__stat-number">₹200Cr+</div>
              <div className="hero__stat-label">Economic Impact</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
