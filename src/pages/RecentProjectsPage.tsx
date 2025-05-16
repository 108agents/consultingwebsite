import React from 'react';

interface Project {
    title: string;
    client: string;
    description: string;
    technologies: string[];
    year: number;
    image?: string; // Would normally point to an image file
}

const RecentProjectsPage: React.FC = () => {
    const projects: Project[] = [
        {
            title: 'Import Substitution Intervention',
            client: 'Ministry of MSME, Government of India',
            description: 'Implementation of Intervention of Import Substitution in the State of Telangana under RAMP Program of the Ministry of MSME, Government of India. Enhanced local manufacturing capabilities and reduced dependency on imports.',
            technologies: ['Policy Implementation', 'MSME Development', 'Import Substitution', 'Economic Analysis'],
            year: 2024,
        },
        {
            title: 'Export Champions Development',
            client: 'Ministry of MSME, Government of India',
            description: 'Implementation of the Project on \'Identification and Development of MSMEs as Export Champions through Reverse Buyer Seller Meets\' in Telangana under RAMP Program of MoMSME, Government of India. Successfully connected local manufacturers with international buyers.',
            technologies: ['Export Development', 'MSME Growth', 'Market Linkage', 'Trade Facilitation'],
            year: 2023,
        },
        {
            title: 'Digital Transformation Initiative',
            client: 'Global Financial Services Corp',
            description: 'Led a comprehensive digital transformation program that modernized legacy systems, enhanced customer experience, and improved operational efficiency by 35%. Implemented cloud-native architecture and microservices to increase flexibility and scalability.',
            technologies: ['Cloud Migration', 'API Development', 'UI/UX Redesign', 'DevOps'],
            year: 2022,
        },
        {
            title: 'E-commerce Platform Relaunch',
            client: 'RetailGiant Inc.',
            description: 'Completely redesigned and rebuilt the client\'s e-commerce platform, resulting in a 42% increase in conversion rate and 28% growth in average order value. The new system handles peak traffic of over 1M concurrent users without performance degradation.',
            technologies: ['React', 'Node.js', 'GraphQL', 'AWS', 'Elasticsearch'],
            year: 2022,
        },
        {
            title: 'Data Analytics Platform',
            client: 'HealthTech Solutions',
            description: 'Developed a sophisticated data analytics platform that aggregates and analyzes patient data to provide actionable insights for healthcare providers. The solution improved diagnostic accuracy by 18% and reduced patient wait times by 23%.',
            technologies: ['Python', 'TensorFlow', 'BigData', 'Data Visualization', 'Machine Learning'],
            year: 2021,
        },
    ];

    return (
        <div className="recent-projects">
            <div className="page-header">
                <h1>Recent Projects</h1>
                <p>Explore some of our most impactful work with industry-leading clients.</p>
            </div>

            <div className="projects-grid">
                {projects.map((project, index) => (
                    <div key={index} className="project-card">
                        <div className="project-image">
                            {/* We would typically have an actual image here */}
                            <div className="placeholder-project-image" />
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
                            <a href="#" className="read-more-btn">View Case Study</a>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="contact-cta">
                <h2>Ready to start your project?</h2>
                <p>Let\'s discuss how we can help you achieve your business objectives.</p>
                <a href="/contact-us" className="cta-button">Get in Touch</a>
            </div>
        </div>
    );
};

export default RecentProjectsPage;
