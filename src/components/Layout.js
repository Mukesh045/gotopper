import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = () => {
  const location = useLocation();
  const isTutorialPage = ['/html', '/css', '/js', '/java', '/python'].some(path => location.pathname.startsWith(path));

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

  return (
    <div className="page-container">
      <Header />
      <div className="main-layout">
        {isTutorialPage && <Sidebar />}
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
