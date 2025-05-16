import React from 'react';
import ContactForm from '../components/ContactForm';

const ContactUsPage: React.FC = () => {
    return (
        <div className="contact-page">
            <div className="page-header">
                <h1>Contact Us</h1>
                <p>Have questions or ready to start a project? We're here to help!</p>
            </div>
            
            <div className="contact-container">
                <div className="contact-info">
                    <div className="info-card">
                        <h3>Visit Our Office</h3>
                        <p>Jubilee Hills<br />Hyderabad, India</p>
                        <p>Monday - Friday: 9:30 AM - 6:30 PM</p>
                    </div>
                    
                    <div className="info-card">
                        <h3>Contact Details</h3>
                        <p><strong>Email:</strong> info@jagadeeshindia.com</p>
                        <p><strong>Phone:</strong> +91 (40) 1234-5678</p>
                        <p><strong>Support:</strong> support@jagadeeshindia.com</p>
                    </div>
                    
                    <div className="info-card">
                        <h3>Connect With Us</h3>
                        <div className="social-links">
                            <a href="#" className="social-link">LinkedIn</a>
                            <a href="#" className="social-link">X (Twitter)</a>
                            <a href="#" className="social-link">WhatsApp</a>
                        </div>
                    </div>
                </div>
                
                <ContactForm />
            </div>
        </div>
    );
};

export default ContactUsPage;