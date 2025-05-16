import React from 'react';

const HeroSection: React.FC = () => {
    return (
        <section className="hero-section">
            <div className="hero-content">                <h1>Leading Consultancy Services from Hyderabad, India</h1>
                <p>JagadeeshIndia Consulting helps businesses and government agencies implement impactful projects and policies that drive economic growth.</p>
                <div className="hero-buttons">
                    <a href="/contact-us" className="primary-button">Get in Touch</a>
                    <a href="/recent-projects" className="secondary-button">View Our Work</a>
                </div>
            </div>
            <div className="hero-image">
                {/* This would typically be an image, using a placeholder div for now */}
                <div className="placeholder-image"></div>
            </div>
        </section>
    );
};

export default HeroSection;
