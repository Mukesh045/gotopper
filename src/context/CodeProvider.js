import React, { useState, useCallback } from 'react';
import CodeContext from './CodeContext';
import {
  defaultHTMLCode,
  defaultCSSCode,
  defaultJSCode,
  defaultJavaCode,
  defaultPythonCode
} from '../data/defaultCode';

const CodeProvider = ({ children }) => {
  // State to track code for each language
  const [codeState, setCodeState] = useState({
    html: defaultHTMLCode,
    css: defaultCSSCode,
    js: defaultJSCode,
    java: defaultJavaCode,
    python: defaultPythonCode
  });

  // State to track which language is currently active
  const [currentLanguage, setCurrentLanguage] = useState('js');

  // State to track if code has been modified by user
  const [isModified, setIsModified] = useState({
    html: false,
    css: false,
    js: false,
    java: false,
    python: false
  });

  // Get default code for a language
  const getDefaultCode = useCallback((language) => {
    const defaultCodes = {
      html: defaultHTMLCode,
      css: defaultCSSCode,
      js: defaultJSCode,
      java: defaultJavaCode,
      python: defaultPythonCode
    };
    return defaultCodes[language] || '';
  }, []);

  // Get code for a specific language
  const getCode = useCallback((language) => {
    return codeState[language] || getDefaultCode(language);
  }, [codeState, getDefaultCode]);

  // Update code for a specific language
  const updateCode = useCallback((language, newCode) => {
    setCodeState(prev => ({
      ...prev,
      [language]: newCode
    }));

    // Mark as modified if it's different from default
    const defaultCode = getDefaultCode(language);
    setIsModified(prev => ({
      ...prev,
      [language]: newCode !== defaultCode
    }));
  }, [getDefaultCode]);

  // Reset code to default for a language
  const resetCode = useCallback((language) => {
    const defaultCode = getDefaultCode(language);
    setCodeState(prev => ({
      ...prev,
      [language]: defaultCode
    }));
    setIsModified(prev => ({
      ...prev,
      [language]: false
    }));
  }, [getDefaultCode]);

  // Set current language
  const setLanguage = useCallback((language) => {
    if (language) {
      // Always reset the code to the default for the new language when switching
      resetCode(language);
      setCurrentLanguage(language);
    }
  }, [resetCode]);

  // Get current code (for the active language)
  const getCurrentCode = useCallback(() => {
    return getCode(currentLanguage);
  }, [getCode, currentLanguage]);

  // Update current code
  const updateCurrentCode = useCallback((newCode) => {
    updateCode(currentLanguage, newCode);
  }, [updateCode, currentLanguage]);

  // Context value
  const value = {
    // State
    codeState,
    currentLanguage,
    isModified,

    // Getters
    getCode,
    getCurrentCode,
    getDefaultCode,

    // Setters
    updateCode,
    updateCurrentCode,
    setLanguage,
    resetCode
  };

  return (
    <CodeContext.Provider value={value}>
      {children}
    </CodeContext.Provider>
  );
};

export default CodeProvider;
