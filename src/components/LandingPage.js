import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Go Topper</h1>
          <p className="hero-subtitle">
            Master programming languages with easy-to-follow tutorials and interactive learning.
          </p>
          <Link to="/home" className="btn btn-primary hero-cta">
            Get Started
          </Link>
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title">Learn Popular Languages</h2>
        <div className="features-grid">
          <div className="feature-card html" >
            <div className="feature-icon">
              <span className="icon html-icon" aria-hidden="true">‹/›</span>
            </div>
            <h3 >HTML</h3>
            <p>Build the structure of web pages with the standard markup language.</p>
            <Link to="/html" className="btn btn-outline-primary">Start Learning HTML</Link>
          </div>
          <div className="feature-card css">
            <div className="feature-icon">
              <span className="icon css-icon" aria-hidden="true">{'{}'}</span>
            </div>
            <h3>CSS</h3>
            <p>Style your web pages with CSS for beautiful and responsive designs.</p>
            <Link to="/css" className="btn btn-outline-primary">Start Learning CSS</Link>
          </div>
          <div className="feature-card js" >
            <div className="feature-icon">
              <span className="icon js-icon" aria-hidden="true">⚡</span>
            </div>
            <h3>JavaScript</h3>
            <p>Add interactivity and dynamic behavior to your web pages.</p>
            <Link to="/js" className="btn btn-outline-primary">Start Learning JavaScript</Link>
          </div>
          <div className="feature-card java">
            <div className="feature-icon">
              <span className="icon java-icon" aria-hidden="true">☕</span>
            </div>
            <h3>Java</h3>
            <p>Develop robust applications and build your career as a software developer.</p>
            <Link to="/java" className="btn btn-outline-primary">Start Learning Java</Link>
          </div>
          <div className="feature-card python">
            <div className="feature-icon">
              <span className="icon python-icon" aria-hidden="true">🐍</span>
            </div>
            <h3>Python</h3>
            <p>Explore versatile programming for web, data science, AI, and more.</p>
            <Link to="/python" className="btn btn-outline-primary">Start Learning Python</Link>
          </div>
        </div>
      </section>

      <section className="why-choose-section">
        <h2 className="section-title">Why Choose Go Topper?</h2>
        <ul className="benefits-list">
          <li>Comprehensive tutorials for beginners and advanced learners</li>
          <li>Interactive coding exercises and real-time feedback</li>
          <li>Community support and expert guidance</li>
          <li>Regular updates with new content and features</li>
        </ul>
      </section>

      <section className="get-started-section">
        <h2 className="section-title">Ready to Start Learning?</h2>
        <Link to="/home" className="btn btn-primary btn-lg get-started-btn">
          Explore Courses
        </Link>
      </section>
    </div>
  );
};

export default LandingPage;
