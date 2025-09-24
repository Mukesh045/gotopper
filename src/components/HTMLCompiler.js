import React from 'react';
import { useLocation } from 'react-router-dom';
import CodeEditor from './CodeEditor';
import { defaultHTMLCode } from '../data/defaultCode';

const HTMLCompiler = () => {
  const location = useLocation();
  const initialCode = location.state?.initialCode || defaultHTMLCode;

  return (
    <div>
      <h1>HTML Compiler</h1>
      <CodeEditor language="html" initialCode={initialCode} />
    </div>
  );
};

export default HTMLCompiler;
