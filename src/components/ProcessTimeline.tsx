import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

interface ProcessStep {
  number: number;
  title: string;
  description: string;
}

const ProcessTimeline: React.FC = () => {
  const [timelineRef, isVisible] = useIntersectionObserver<HTMLDivElement>({ 
    threshold: 0.3,
    triggerOnce: true 
  });

  const steps: ProcessStep[] = [
    {
      number: 1,
      title: 'Comprehensive Analysis',
      description: 'We conduct thorough research to understand your unique challenges and opportunities'
    },
    {
      number: 2,
      title: 'Strategic Planning',
      description: 'Our experts develop customized roadmaps with clear milestones and deliverables'
    },
    {
      number: 3,
      title: 'Implementation',
      description: 'We execute with precision, adapting to changing conditions while maintaining focus on objectives'
    },
    {
      number: 4,
      title: 'Measurement & Optimization',
      description: 'Continuous monitoring ensures targets are met and strategies are refined for maximum impact'
    }
  ];

  return (
    <div
      ref={timelineRef}
      className={`process-timeline ${isVisible ? 'animated' : ''}`}
    >
      {/* Connection dots */}
      {[1, 2, 3, 4, 5].map((_, index) => (
        <div key={index} className="connection-dot"></div>
      ))}
      
      {/* Process steps */}
      {steps.map((step, index) => (
        <div 
          key={index}
          className={`process-step ${isVisible ? 'animated' : ''}`}
        >
          <div className="step-number">{step.number}</div>
          <div className="step-content">
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProcessTimeline;
