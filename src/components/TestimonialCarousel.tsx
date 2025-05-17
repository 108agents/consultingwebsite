import React, { useState, useEffect } from 'react';

interface Testimonial {
  id: number;
  content: string;
  author: string;
  position: string;
  image: string;
}

const TestimonialCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      content: "JagadeeshIndia Consulting provided exceptional guidance in implementing our MSME development program, resulting in measurable economic growth across the region.",
      author: "Rajesh Kumar",
      position: "Joint Secretary, Ministry of MSME",
      image: "govt-official"
    },
    {
      id: 2,
      content: "Their export facilitation program transformed our manufacturing unit from a local supplier to a global exporter with presence in 5 countries within just 18 months.",
      author: "Priya Sharma",
      position: "CEO, Innovative Textiles Ltd",
      image: "business-owner"
    },
    {
      id: 3,
      content: "The digital transformation strategy they designed for our organization has improved efficiency by 40% and reduced operational costs significantly.",
      author: "Vikram Mehta",
      position: "Director, Telangana Industrial Development Corp",
      image: "govt-official"
    },
    {
      id: 4,
      content: "Working with JagadeeshIndia has been transformative for our startup ecosystem. Their policy implementation expertise helped us secure government funding and support.",
      author: "Ananya Reddy",
      position: "Founder, Hyderabad Entrepreneurs Network",
      image: "business-owner"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [activeIndex]);

  const goToNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const goToPrev = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setActiveIndex((prevIndex) => 
        prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
      );
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const goToSlide = (index: number) => {
    if (!isAnimating && index !== activeIndex) {
      setIsAnimating(true);
      setActiveIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  return (
    <div className="testimonial-carousel">
      <div className="testimonial-carousel-inner">
        {testimonials.map((testimonial, index) => (
          <div 
            key={testimonial.id} 
            className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
            aria-hidden={index !== activeIndex}
          >
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="quote-mark">"</div>
                <p>{testimonial.content}</p>
              </div>
              <div className="testimonial-author">
                <div className={`author-image ${testimonial.image}`}></div>
                <div className="author-details">
                  <h4>{testimonial.author}</h4>
                  <p>{testimonial.position}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="carousel-controls">
        <button className="carousel-control prev" onClick={goToPrev} aria-label="Previous testimonial">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className="carousel-indicators">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`carousel-indicator ${index === activeIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            ></button>
          ))}
        </div>
        
        <button className="carousel-control next" onClick={goToNext} aria-label="Next testimonial">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
