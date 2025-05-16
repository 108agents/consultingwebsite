import React from 'react';
import HeroSection from '../components/HeroSection';

const HomePage: React.FC = () => {
    return (
        <div className="home-page">
            <HeroSection />
            
            <div className="content-section">
                <h2>About JagadeeshIndia Consulting</h2>
                <p>
                    Based in Hyderabad, we provide expert consulting services with a focus on MSME development, government 
                    initiatives, and policy implementation. Our team of experienced professionals is dedicated to delivering 
                    impactful solutions that drive economic growth and development across India.
                </p>
                
                <div className="services-grid">
                    <div className="service-card">
                        <h3>Policy Implementation</h3>
                        <p>Expert implementation of government policies and initiatives for maximum impact.</p>
                    </div>
                    <div className="service-card">
                        <h3>MSME Development</h3>
                        <p>Specialized programs to help MSMEs grow, export, and contribute to economic development.</p>
                    </div>
                    <div className="service-card">
                        <h3>Project Management</h3>
                        <p>End-to-end management of complex projects with government and private sector stakeholders.</p>
                    </div>
                    <div className="service-card">
                        <h3>Economic Analysis</h3>
                        <p>Data-driven economic analysis to inform policy decisions and business strategies.</p>
                    </div>
                </div>
                
                <div className="cta-section">
                    <h2>Partner with JagadeeshIndia Consulting</h2>
                    <p>Discover how our expertise in policy implementation and MSME development can help you achieve your objectives.</p>
                    <a href="/contact-us" className="cta-button">Contact Us Today</a>
                </div>
            </div>
        </div>
    );
};

export default HomePage;