import React from 'react';
import CodeEditor from './CodeEditor';
import { defaultCSSCode } from '../data/defaultCode';

const CSSCompiler = () => {
  return (
    <div>
      <h1>CSS Compiler</h1>
      <CodeEditor language="css" initialCode={defaultCSSCode} />
    </div>
  );
};

export default CSSCompiler;
