import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = () => {
  const location = useLocation();
  const isTutorialPage = ['/html', '/css', '/js', '/java', '/python'].some(path => location.pathname.startsWith(path));
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="page-container">
      <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} isTutorialPage={isTutorialPage} />
      {isTutorialPage && (
        <button className="sidebar-arrow-toggle" onClick={toggleSidebar} aria-label="Toggle sidebar">
          <i className={`fas ${sidebarOpen ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
        </button>
      )}
      <div className="main-layout">
        {isTutorialPage && <Sidebar sidebarOpen={sidebarOpen} />}
        {isTutorialPage && sidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
        <main className={isTutorialPage ? 'main-content with-sidebar' : 'main-content'}>
          <div className={isTutorialPage ? 'content-wrapper' : 'container'}>
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
