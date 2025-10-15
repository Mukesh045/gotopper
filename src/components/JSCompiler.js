import React from 'react';
import CodeEditor from './CodeEditor';
import { defaultJSCode } from '../data/defaultCode';

const JSCompiler = () => {
  return (
    <div>
      <h1>JavaScript Compiler</h1>
      <CodeEditor language="js" initialCode={defaultJSCode} />
    </div>
  );
};

export default JSCompiler;
