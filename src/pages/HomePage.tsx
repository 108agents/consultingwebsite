import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import TestimonialCarousel from '../components/TestimonialCarousel';
import ProcessTimeline from '../components/ProcessTimeline';
import CtaSection from '../components/CtaSection';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <HeroSection />
      
      <section className="services-section">
        <div className="section-header">
          <h2>Our Expertise</h2>
          <p>Comprehensive solutions tailored for Indian enterprises and government initiatives</p>
        </div>
        
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon policy-icon"></div>
            <h3>Policy Implementation</h3>
            <p>Strategic execution of government policies with measurable outcomes and compliance monitoring</p>
          </div>
          
          <div className="service-card">
            <div className="service-icon msme-icon"></div>
            <h3>MSME Development</h3>
            <p>Holistic growth strategies for Micro, Small & Medium Enterprises focusing on sustainability and scalability</p>
          </div>
          
          <div className="service-card">
            <div className="service-icon export-icon"></div>
            <h3>Export Facilitation</h3>
            <p>End-to-end support for businesses entering international markets, from compliance to logistics</p>
          </div>
          
          <div className="service-card">
            <div className="service-icon digital-icon"></div>
            <h3>Digital Transformation</h3>
            <p>Technology adoption frameworks that modernize operations while preserving core business values</p>
          </div>
        </div>
      </section>
      
      <section className="process-section">
        <div className="section-header">
          <h2>Our Approach</h2>
          <p>A proven methodology that delivers consistent results</p>
        </div>
        
        <ProcessTimeline />
      </section>
      
      <section className="clients-section">
        <div className="section-header">
          <h2>Our Partners</h2>
          <p>Trusted by government bodies and leading organizations</p>
        </div>
        
        <div className="client-logos">
          <div className="client-logo msme-ministry"></div>
          <div className="client-logo telangana-govt"></div>
          <div className="client-logo sidbi"></div>
          <div className="client-logo ficci"></div>
          <div className="client-logo cii"></div>
        </div>
      </section>
      
      <section className="testimonials-section">
        <div className="section-header">
          <h2>Client Testimonials</h2>
          <p>What our partners say about our work</p>
        </div>
        
        <TestimonialCarousel />
      </section>
      
      <CtaSection 
        title="Ready to Transform Your Organization?"
        description="Let's discuss how JagadeeshIndia Consulting can help you achieve your goals"
        primaryButtonText="Contact Our Experts"
        primaryButtonLink="/contact-us"
        secondaryButtonText="View Our Projects"
        secondaryButtonLink="/recent-projects"
      />
    </div>
  );
};

export default HomePage;