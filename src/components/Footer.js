import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const location = useLocation();
  const tutorialPaths = ['/html', '/css', '/js', '/java', '/python'];
  const isTutorialPage = tutorialPaths.some(path => location.pathname.startsWith(path));

  return (
    <footer className={`footer ${isTutorialPage ? 'with-sidebar' : ''}`}>
      <div className="footer-content">
        <div className="footer-section">
          <h3>Go Topper</h3>
          <p>Your ultimate destination for learning programming languages with interactive tutorials and compilers.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/search">Search</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Tutorials</h4>
          <ul>
            <li><Link to="/html">HTML</Link></li>
            <li><Link to="/css">CSS</Link></li>
            <li><Link to="/js">JavaScript</Link></li>
            <li><Link to="/java">Java</Link></li>
            <li><Link to="/python">Python</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Compilers</h4>
          <ul>
            <li><Link to="/compiler/html">HTML Compiler</Link></li>
            <li><Link to="/compiler/css">CSS Compiler</Link></li>
            <li><Link to="/compiler/js">JS Compiler</Link></li>
            <li><Link to="/compiler/java">Java Compiler</Link></li>
            <li><Link to="/compiler/python">Python Compiler</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} GoTopper.com. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
