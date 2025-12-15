import './App.css';
import React from 'react';
import './Theme.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import LandingPage from './components/LandingPage';
import HTMLPage from './components/HTMLPage';
import CSSPage from './components/CSSPage';
import JSPage from './components/JSPage';
import JavaPage from './components/JavaPage';
import PythonPage from './components/PythonPage';
import About from './components/About';
import SearchPage from './components/SearchPage';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthProvider';
import AdminAuthProvider from './context/AdminAuthProvider';
import { ThemeProvider } from './context/ThemeProvider';
import CodeProvider from './context/CodeProvider';
import HTMLCompiler from './components/HTMLCompiler';
import CSSCompiler from './components/CSSCompiler';
import JSCompiler from './components/JSCompiler';
import JavaCompiler from './components/JavaCompiler';
import PythonCompiler from './components/PythonCompiler';

function App() {
  return (
    <AuthProvider>
      <AdminAuthProvider>
        <ThemeProvider>
          <CodeProvider>
            <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<LandingPage />} />
              <Route path="" element={<LandingPage />} />
              <Route path="home" element={<HomePage />} />
              <Route path="html" element={<HTMLPage />} />
              <Route path="html/:topic" element={<HTMLPage />} />
              <Route path="html/:topic/:noteId" element={<HTMLPage />} />
              <Route path="css" element={<CSSPage />} />
              <Route path="css/:topic" element={<CSSPage />} />
              <Route path="css/:topic/:noteId" element={<CSSPage />} />
              <Route path="js" element={<JSPage />} />
              <Route path="js/:topic" element={<JSPage />} />
              <Route path="js/:topic/:noteId" element={<JSPage />} />
              <Route path="java" element={<JavaPage />} />
              <Route path="java/:topic" element={<JavaPage />} />
              <Route path="java/:topic/:noteId" element={<JavaPage />} />
              <Route path="python" element={<PythonPage />} />
              <Route path="python/:topic" element={<PythonPage />} />
              <Route path="python/:topic/:noteId" element={<PythonPage />} />
              <Route path="about" element={<About />} />
              <Route path="search" element={<SearchPage />} />

              <Route path="compiler/html" element={<HTMLCompiler />} />
              <Route path="compiler/css" element={<CSSCompiler />} />
              <Route path="compiler/js" element={<JSCompiler />} />
              <Route path="compiler/java" element={<JavaCompiler />} />
              <Route path="compiler/python" element={<PythonCompiler />} />

              {/* Admin Routes */}
              <Route path="admin/login" element={<AdminLogin />} />
              <Route path="admin/dashboard" element={
                <ProtectedRoute><AdminDashboard /></ProtectedRoute>
              } />
            </Route>
          </Routes>
          </CodeProvider>
        </ThemeProvider>
      </AdminAuthProvider>
    </AuthProvider>
  );
}

export default App;
