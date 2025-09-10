import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Wait for the DOM to be fully loaded before running our script
window.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('root');

  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } else {
    console.error("Failed to find the 'root' element in the DOM.");
  }
});