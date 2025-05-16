import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import RecentProjectsPage from './pages/RecentProjectsPage';
import ContactUsPage from './pages/ContactUsPage';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recent-projects" element={<RecentProjectsPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;