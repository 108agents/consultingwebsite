import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import '../styles/index.css';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="layout">
            <header>
                <nav className="navbar">
                    <div className="logo">
                        <Link to="/">
                            <h2>JagadeeshIndia Consulting</h2>
                        </Link>
                    </div>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/recent-projects">Recent Projects</Link>
                        </li>
                        <li>
                            <Link to="/contact-us">Contact Us</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            
            <main className="main-content">
                {children}
            </main>
            
            <footer>
                <div className="footer-content">
                    <div className="footer-logo">
                        <h3>JagadeeshIndia Consulting</h3>
                        <p>Innovative solutions for modern businesses</p>
                    </div>
                    <div className="footer-links">
                        <div className="footer-section">
                            <h4>Quick Links</h4>
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/recent-projects">Recent Projects</Link></li>
                                <li><Link to="/contact-us">Contact Us</Link></li>
                            </ul>
                        </div>
                        <div className="footer-section">
                            <h4>Contact</h4>
                            <p>info@jagadeeshindia.com</p>
                            <p>+91 (40) 1234-5678</p>
                            <p>Hyderabad, India</p>
                        </div>
                    </div>
                </div>
                <div className="copyright">
                    <p>&copy; {new Date().getFullYear()} JagadeeshIndia Consulting. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;