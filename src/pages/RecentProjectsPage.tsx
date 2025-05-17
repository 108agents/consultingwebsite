import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Project {
    title: string;
    client: string;
    description: string;
    technologies: string[];
    year: number;
    image?: string;
    featured?: boolean;
    category: string;
}

const RecentProjectsPage: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState<string>('all');
    const [animatedProjects, setAnimatedProjects] = useState<Project[]>([]);
    
    const projects: Project[] = [
        {
            title: 'Import Substitution Intervention',
            client: 'Ministry of MSME, Government of India',
            description: 'Implementation of Intervention of Import Substitution in the State of Telangana under RAMP Program of the Ministry of MSME, Government of India. Enhanced local manufacturing capabilities and reduced dependency on imports.',
            technologies: ['Policy Implementation', 'MSME Development', 'Import Substitution', 'Economic Analysis'],
            year: 2024,
            featured: true,
            image: '/images/project-import.svg',
            category: 'government'
        },
        {
            title: 'Export Champions Development',
            client: 'Ministry of MSME, Government of India',
            description: 'Implementation of the Project on \'Identification and Development of MSMEs as Export Champions through Reverse Buyer Seller Meets\' in Telangana under RAMP Program of MoMSME, Government of India. Successfully connected local manufacturers with international buyers.',
            technologies: ['Export Development', 'MSME Growth', 'Market Linkage', 'Trade Facilitation'],
            year: 2023,
            image: '/images/project-export.svg',
            category: 'government'
        },
        {
            title: 'Digital Transformation Initiative',
            client: 'Global Financial Services Corp',
            description: 'Led a comprehensive digital transformation program that modernized legacy systems, enhanced customer experience, and improved operational efficiency by 35%. Implemented cloud-native architecture and microservices to increase flexibility and scalability.',
            technologies: ['Cloud Migration', 'API Development', 'UI/UX Redesign', 'DevOps'],
            year: 2022,
            image: '/images/project-digital.svg',
            category: 'private'
        },
        {
            title: 'E-commerce Platform Relaunch',
            client: 'RetailGiant Inc.',
            description: 'Completely redesigned and rebuilt the client\'s e-commerce platform, resulting in a 42% increase in conversion rate and 28% growth in average order value. The new system handles peak traffic of over 1M concurrent users without performance degradation.',
            technologies: ['React', 'Node.js', 'GraphQL', 'AWS', 'Elasticsearch'],
            year: 2022,
            image: '/images/project-ecommerce.svg',
            category: 'private'
        },
        {
            title: 'Data Analytics Platform',
            client: 'HealthTech Solutions',
            description: 'Developed a sophisticated data analytics platform that aggregates and analyzes patient data to provide actionable insights for healthcare providers. The solution improved diagnostic accuracy by 18% and reduced patient wait times by 23%.',
            technologies: ['Python', 'TensorFlow', 'BigData', 'Data Visualization', 'Machine Learning'],
            year: 2021,
            image: '/images/project-analytics.svg',
            category: 'private'
        },
    ];

    useEffect(() => {
        const filteredProjects = activeFilter === 'all' 
            ? projects 
            : projects.filter(project => project.category === activeFilter);
        
        setAnimatedProjects(filteredProjects);
    }, [activeFilter]);

    return (
        <div className="recent-projects">
            <div className="page-header">
                <h1>Recent Projects</h1>
                <p>Explore some of our most impactful work with industry-leading clients.</p>
            </div>
            
            <div className="project-filters">
                <button 
                    className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setActiveFilter('all')}
                >
                    All Projects
                </button>
                <button 
                    className={`filter-btn ${activeFilter === 'government' ? 'active' : ''}`}
                    onClick={() => setActiveFilter('government')}
                >
                    Government Initiatives
                </button>
                <button 
                    className={`filter-btn ${activeFilter === 'private' ? 'active' : ''}`}
                    onClick={() => setActiveFilter('private')}
                >
                    Private Sector
                </button>
            </div>

            <div className="featured-project">
                {projects.filter(project => project.featured).map((project, index) => (
                    <div key={`featured-${index}`} className="featured-project-card">
                        <div className="featured-project-content">
                            <span className="featured-label">Featured Project</span>
                            <h2>{project.title}</h2>
                            <div className="project-meta">
                                <span className="client">{project.client}</span>
                                <span className="year">{project.year}</span>
                            </div>
                            <p>{project.description}</p>
                            <div className="tech-stack">
                                {project.technologies.map((tech, techIndex) => (
                                    <span key={techIndex} className="tech-tag">{tech}</span>
                                ))}
                            </div>
                            <Link to="#" className="primary-button">View Case Study</Link>
                        </div>
                        <div className="featured-project-image" style={{backgroundImage: `url(${project.image})`}}>
                        </div>
                    </div>
                ))}
            </div>

            <div className="projects-grid">
                {animatedProjects.filter(project => !project.featured).map((project, index) => (
                    <div key={index} className="project-card">
                        <div className="project-image" style={{backgroundImage: `url(${project.image})`}}>
                            <div className="project-overlay">
                                <Link to="#" className="view-project">View Details</Link>
                            </div>
                        </div>
                        <div className="project-content">
                            <h2>{project.title}</h2>
                            <div className="project-meta">
                                <span className="client">{project.client}</span>
                                <span className="year">{project.year}</span>
                            </div>
                            <p>{project.description}</p>
                            <div className="tech-stack">
                                {project.technologies.map((tech, techIndex) => (
                                    <span key={techIndex} className="tech-tag">{tech}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="contact-cta">
                <h2>Ready to start your project?</h2>
                <p>Let's discuss how we can help you achieve your business objectives.</p>
                <Link to="/contact-us" className="cta-button">Get in Touch</Link>
            </div>
        </div>
    );
};

export default RecentProjectsPage;
