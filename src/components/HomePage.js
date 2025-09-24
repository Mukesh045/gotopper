import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const languages = [
    {
      id: 'html',
      name: 'HTML',
      description: 'Learn the basics of HTML, the standard markup language for creating web pages.',
      color: '#e34c26'
    },
    {
      id: 'css',
      name: 'CSS',
      description: 'Style your web pages with CSS, the language for describing the presentation of web pages.',
      color: '#1572b6'
    },
    {
      id: 'js',
      name: 'JavaScript',
      description: 'Make your web pages interactive with JavaScript, the programming language of the web.',
      color: '#f7df1e'
    },
    {
      id: 'java',
      name: 'Java',
      description: 'Make your career in a SDE and build a real-time application with Java.',
      color: '#ed8b00'
    },
    {
      id: 'python',
      name: 'Python',
      description: 'Python is a versatile language used for web development, data analysis, artificial intelligence, and more.',
      color: '#3776ab'
    }
  ];

  return (
    <div className="home-container">
      <section className="home-hero">
        <div className="home-hero-content">
          <h1 className="home-title">Welcome to Go Topper</h1>
          <p className="home-subtitle">
            Learn HTML, CSS, JavaScript, Java, Python and many more coming soon with our easy-to-follow tutorials.
          </p>
        </div>
      </section>

      <section className="languages-section">
        <h2 className="section-title">Choose Your Language</h2>
        <div className="languages-grid">
          {languages.map((lang) => (
            <div key={lang.id} className="language-card" style={{ borderTopColor: lang.color }}>
              <div className="language-icon">
                <span className={`icon ${lang.id}-icon`} aria-hidden="true">
                  {lang.id === 'html' && '‹/›'}
                  {lang.id === 'css' && '{}'}
                  {lang.id === 'js' && '⚡'}
                  {lang.id === 'java' && '☕'}
                  {lang.id === 'python' && '🐍'}
                </span>
              </div>
              <h3>{lang.name}</h3>
              <p>{lang.description}</p>
              <Link to={`/${lang.id}`} className="btn btn-primary">Start Learning {lang.name}</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <h2 className="section-title">Ready to Start Your Coding Journey?</h2>
        <p className="cta-text">Join thousands of learners mastering programming skills.</p>
        <Link to="/search" className="btn btn-primary btn-lg cta-btn">
          Explore All Tutorials
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
