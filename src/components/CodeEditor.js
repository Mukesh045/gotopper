import React, { useState, useEffect, useContext } from 'react';
import { Controlled as ControlledCodeMirror } from 'react-codemirror2';
import { BACKEND_URL } from '../config';
import CodeContext from '../context/CodeContext';
import {
  defaultHTMLCode,
  defaultCSSCode,
  defaultJSCode,
  defaultJavaCode,
  defaultPythonCode
} from '../data/defaultCode';

// Import codemirror styles and modes
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import 'codemirror/mode/clike/clike'; // for Java

const CodeEditor = ({ language, initialCode }) => {
  const codeContext = useContext(CodeContext);
  const [output, setOutput] = useState('');

  // Get current code from context
  const code = codeContext.getCurrentCode();

  // Update code in context when it changes
  const handleCodeChange = (newCode) => {
    codeContext.updateCurrentCode(newCode);
  };

  useEffect(() => {
    // Set the current language in the context. This will trigger the provider to load the correct code.
    codeContext.setLanguage(language);

    // If initialCode is provided (e.g., from a "Try it Yourself" button),
    // it should always override the current code for that language.
    if (initialCode) {
      codeContext.updateCode(language, initialCode);
    }

    setOutput(''); // Clear previous output on language change
  }, [language, initialCode, codeContext.updateCode, codeContext.setLanguage]);

  // Function to run code using local backend
  const runCodeBackend = async () => {
    const currentCode = codeContext.getCurrentCode(); // Get the latest code on execution
    try {
      const response = await fetch(`${BACKEND_URL}/run/${language}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: currentCode }),
      });

      if (!response.ok) {
        setOutput('Error running code.');
        return;
      }

      const data = await response.json();
      setOutput(data.output || 'No output');
    } catch (error) {
      console.error('Backend connection error:', error);
      setOutput('Error connecting to backend. Make sure the backend server is running.');
    }
  };

  // Function to run code locally in browser (fallback for HTML/CSS/JS)
  const runCodeLocally = () => {
    const currentCode = codeContext.getCurrentCode();

    if (language === 'html') {
      setOutput(currentCode);
    } else if (language === 'css') {
      const htmlWithCss = `<html><head><style>${currentCode}</style></head><body><h1>Styled Heading</h1><p>This paragraph is styled by your CSS code.</p><button>A Button</button></body></html>`;
      setOutput(htmlWithCss);
    } else if (language === 'js') {
      try {
        // For JavaScript, we'll try to execute it in a safe way
        // Note: This is limited and not as robust as server-side execution
        const result = eval(currentCode);
        setOutput(String(result));
      } catch (error) {
        setOutput(`JavaScript Error: ${error.message}`);
      }
    } else {
      setOutput('Local execution not supported for this language. Backend required.');
    }
  };

  const runCode = () => {
    // Check if we're on GitHub Pages (no backend available)
    if (window.location.hostname === 'mukesh045.github.io') {
      runCodeLocally();
    } else {
      runCodeBackend();
    }
  };

  const renderOutput = () => {
    if (!output) {
      return <pre style={{ backgroundColor: '#f0f0f0', padding: '10px', marginTop: '10px' }}>Click "Run Code" to see the output.</pre>;
    }

    if (language === 'html') {
      return (
        <iframe
          srcDoc={output}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          style={{ border: '1px solid #ccc', marginTop: '10px', height: '200px', backgroundColor: 'white' }}
        />
      );
    }

    if (language === 'css') {
      const htmlWithCss = `<html><head><style>${output}</style></head><body><h1>Styled Heading</h1><p>This paragraph is styled by your CSS code.</p><button>A Button</button></body></html>`;
      return (
        <iframe
          srcDoc={htmlWithCss}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          style={{ border: '1px solid #ccc', marginTop: '10px', height: '200px', backgroundColor: 'white' }}
        />
      );
    }

    return <pre style={{ backgroundColor: '#f0f0f0', padding: '10px', marginTop: '10px' }}>{output}</pre>;
  };

  return (
    <div>
      <div className="code-editor-wrapper">
        <ControlledCodeMirror
          value={code}
          options={{
            mode: language === 'java' ? 'text/x-java' : language === 'js' ? 'javascript' : language,
            theme: 'material',
            lineNumbers: true,
            lineWrapping: true,
            readOnly: false,
            indentWithTabs: true,
            smartIndent: true,
            autofocus: true,
          }}
          onBeforeChange={(editor, data, value) => {
            handleCodeChange(value);
          }}
          editorDidMount={(editor) => {
            editor.setSize(null, 500); // Set width to auto, height to 500px
          }}
        />
      </div>
      <button onClick={runCode} style={{ marginTop: '10px' }}>Run Code</button>
      {renderOutput()}
    </div>
  );
};

export default CodeEditor;
