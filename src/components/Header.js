import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { tutorials } from '../data/tutorials';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { useAuth } from '../context/AuthProvider';
import { useTheme } from '../context/ThemeProvider';
import './Header.css';

const allSearchableContent = [];
// Note: I'm keeping your search data generation logic, but it's not used in the updated search form.
tutorials.forEach(tutorial => {
  tutorial.items.forEach(item => {
    const isHome = item === tutorial.title.replace(' Tutorial', ' HOME').toUpperCase();
    const path = isHome ? `/${tutorial.id}` : `/${tutorial.id}/${item.replace(/ /g, '-').toLowerCase()}`;
    allSearchableContent.push({
      title: item,
      path: path,
    });
  });
});

const Header = () => {
  const [query, setQuery] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();


  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      // Check for an exact match to navigate directly
      const exactMatch = allSearchableContent.find(
        item => item.title.toLowerCase() === trimmedQuery.toLowerCase()
      );

      if (exactMatch) {
        navigate(exactMatch.path);
      } else {
        // Otherwise, go to the search results page
        navigate(`/search?q=${trimmedQuery}`);
      }
      setQuery(''); // Optional: clear search bar after search
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src="https://i.postimg.cc/fb2WF2fK/gt.jpg" alt="Go Topper" style={{ height: '60px' }} />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="about">About Us</Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="tutorialsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Tutorials
                </a>
                <ul className="dropdown-menu" aria-labelledby="tutorialsDropdown">
                  <li><Link className="dropdown-item" to="/html">HTML Tutorial</Link></li>
                  <li><Link className="dropdown-item" to="/css">CSS Tutorial</Link></li>
                  <li><Link className="dropdown-item" to="/js">JavaScript Tutorial</Link></li>
                  <li><Link className="dropdown-item" to="/java">Java Tutorial</Link></li>
                  <li><Link className="dropdown-item" to="/python">Python Tutorial</Link></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="compilersDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Compilers
                </a>
                <ul className="dropdown-menu" aria-labelledby="compilersDropdown">
                  <li><Link className="dropdown-item" to="/compiler/html">HTML Compiler</Link></li>
                  <li><Link className="dropdown-item" to="/compiler/css">CSS Compiler</Link></li>
                  <li><Link className="dropdown-item" to="/compiler/js">JavaScript Compiler</Link></li>
                  <li><Link className="dropdown-item" to="/compiler/java">Java Compiler</Link></li>
                  <li><Link className="dropdown-item" to="/compiler/python">Python Compiler</Link></li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/login">Admin Login</Link>
              </li>
            </ul>
            <button onClick={toggleTheme} className="btn btn-outline-secondary me-3 theme-toggle-btn">
              {theme === 'light' ? 
                <i className="bi bi-moon-stars-fill"></i> : 
                <i className="bi bi-sun-fill"></i>
              }
            </button>
            <ul className="navbar-nav me-3">
              {user ? (
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {user.displayName || user.email}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                    <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                  </ul>
                </li>
              ) : (
                <li className="nav-item">
                  <button className="btn btn-primary" onClick={() => { setIsLoginView(true); setShowAuthModal(true); }}>
                    Login / Sign Up
                  </button>
                </li>
              )}
            </ul>
            <form className="d-flex flex-column flex-md-row gap-2 border border-primary rounded p-1 search-form" onSubmit={handleSearch}>
              <input
                className="form-control border-0 search-input"
                type="search"
                placeholder="Search..."
                aria-label="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)} />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
      {showAuthModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" onClick={() => setShowAuthModal(false)}>
          <div className="modal-dialog" role="document" onClick={e => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{isLoginView ? 'User Sign In' : 'Create Account'}</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowAuthModal(false)}></button>
              </div>
              <div className="modal-body">
                {isLoginView ? (
                  <>
                    <SignIn onSignInSuccess={() => setShowAuthModal(false)} />
                    <p className="text-center mt-3">
                      New to GoTopper? <button className="btn btn-link" onClick={() => setIsLoginView(false)}>Create an account</button>
                    </p>
                  </>
                ) : (
                  <>
                    <SignUp onSignUpSuccess={() => setShowAuthModal(false)} />
                    <p className="text-center mt-3">
                      Already have an account? <button className="btn btn-link" onClick={() => setIsLoginView(true)}>Sign In</button>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
