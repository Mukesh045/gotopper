// src/components/CompilerPage.js (New File)
import React from 'react';
import { useLocation } from 'react-router-dom';
import CodeEditor from './CodeEditor';

const CompilerPage = ({ language, title, defaultCode }) => {
  const location = useLocation();
  const initialCode = location.state?.initialCode || defaultCode;

  return (
    <div>
      <h1>{title}</h1>
      <CodeEditor language={language} initialCode={initialCode} />
    </div>
  );
};

export default CompilerPage;
