import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import './styles/components.css';
import './styles/project-cards.css';
import './styles/animations.css';
import './styles/form.css';
import './styles/hero-section-new.css'; // Using the new hero section
import './styles/carousel.css';
import './styles/services.css';
import './styles/process-timeline.css';
import './styles/cta.css';
import './styles/components.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);