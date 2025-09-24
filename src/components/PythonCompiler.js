import React from 'react';
import CodeEditor from './CodeEditor';
import { defaultPythonCode } from '../data/defaultCode';

const PythonCompiler = () => {
  return (
    <div>
      <h1>Python Compiler</h1>
      <CodeEditor language="python" initialCode={defaultPythonCode} />
    </div>
  );
};

export default PythonCompiler;
