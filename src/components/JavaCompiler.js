import React from 'react';
import CodeEditor from './CodeEditor';
import { defaultJavaCode } from '../data/defaultCode';

const JavaCompiler = () => {
  return (
    <div>
      <h1>Java Compiler</h1>
      <CodeEditor language="java" initialCode={defaultJavaCode} />
    </div>
  );
};

export default JavaCompiler;
