import React from 'react';
import { Link } from 'react-router-dom';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

interface CtaSectionProps {
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

const CtaSection: React.FC<CtaSectionProps> = ({
  title,
  description,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink
}) => {
  const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <section
      ref={sectionRef}
      className={`cta-section ${isVisible ? 'animated' : ''}`}
    >
      <div className="cta-background"></div>
      <div className="cta-shape cta-shape-1"></div>
      <div className="cta-shape cta-shape-2"></div>
      <div className="cta-shape cta-shape-3"></div>

      <div className="cta-content">
        <h2 className={isVisible ? 'fadeIn' : ''}>{title}</h2>
        <p className={isVisible ? 'fadeIn' : ''}>{description}</p>
        
        <div className={`cta-buttons ${isVisible ? 'fadeIn' : ''}`}>
          <Link to={primaryButtonLink} className="cta-button primary">
            {primaryButtonText}
          </Link>
          
          {secondaryButtonText && secondaryButtonLink && (
            <Link to={secondaryButtonLink} className="cta-button secondary">
              {secondaryButtonText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
