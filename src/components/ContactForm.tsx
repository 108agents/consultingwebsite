import React, { useState } from 'react';
import { sendContactForm } from '../services/contactService';

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        organization: '',
        phone: '',
        sector: '',
        projectType: '',
        message: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        if (!formData.name || !formData.email || !formData.message) {
            setError('Name, email, and message are required fields.');
            setLoading(false);
            return;
        }

        try {
            const { organization, phone, sector, projectType, ...requiredData } = formData;
            await sendContactForm(requiredData);
            setSuccess('Thank you for your message. We\'ll get back to you shortly!');
            
            // Reset form
            setFormData({
                name: '',
                email: '',
                organization: '',
                phone: '',
                sector: '',
                projectType: '',
                message: '',
            });
        } catch (err) {
            setError('There was an error sending your message. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-header">
                <h3>Contact JagadeeshIndia Consulting</h3>
                <p>Fill out the form below to discuss your MSME development, policy implementation, or consulting needs.</p>
            </div>
            
            <div className="form-group">
                <div className="form-row">
                    <div className="form-field">
                        <label htmlFor="name">Full Name *</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>
                    
                    <div className="form-field">
                        <label htmlFor="email">Email Address *</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email address"
                            required
                        />
                    </div>
                </div>
                
                <div className="form-row">
                    <div className="form-field">
                        <label htmlFor="organization">Organization</label>
                        <input
                            type="text"
                            id="organization"
                            name="organization"
                            value={formData.organization}
                            onChange={handleChange}
                            placeholder="Enter your organization name (optional)"
                        />
                    </div>
                    
                    <div className="form-field">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number (optional)"
                        />
                    </div>
                </div>
                
                <div className="form-row">
                    <div className="form-field">
                        <label htmlFor="sector">Sector</label>
                        <input
                            type="text"
                            id="sector"
                            name="sector"
                            value={formData.sector}
                            onChange={handleChange}
                            placeholder="Government/MSME/Private/NGO (optional)"
                        />
                    </div>
                    
                    <div className="form-field">
                        <label htmlFor="projectType">Project Type</label>
                        <input
                            type="text"
                            id="projectType"
                            name="projectType"
                            value={formData.projectType}
                            onChange={handleChange}
                            placeholder="Type of project or consultation needed (optional)"
                        />
                    </div>
                </div>
                
                <div className="form-field">
                    <label htmlFor="message">Message *</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Describe your project needs, policy implementation requirements, or how we can assist your organization."
                        rows={5}
                        required
                    />
                </div>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            
            <button 
                type="submit" 
                className={`submit-button ${loading ? 'loading' : ''}`}
                disabled={loading}
            >
                {loading ? 'Sending...' : 'Send Message'}
            </button>
        </form>
    );
};

export default ContactForm;