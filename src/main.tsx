import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Global error handler for debugging white screen
window.onerror = function(message, source, lineno, colno, error) {
  const errorDiv = document.createElement('div');
  errorDiv.style.position = 'fixed';
  errorDiv.style.top = '0';
  errorDiv.style.left = '0';
  errorDiv.style.width = '100%';
  errorDiv.style.height = '100%';
  errorDiv.style.backgroundColor = 'white';
  errorDiv.style.color = 'red';
  errorDiv.style.padding = '20px';
  errorDiv.style.zIndex = '9999';
  errorDiv.style.overflow = 'auto';
  errorDiv.innerHTML = `
    <h1>Runtime Error</h1>
    <p><strong>Message:</strong> ${message}</p>
    <p><strong>Source:</strong> ${source}</p>
    <p><strong>Line:</strong> ${lineno}, <strong>Column:</strong> ${colno}</p>
    <pre>${error?.stack || 'No stack trace available'}</pre>
    <button onclick="location.reload()" style="padding: 10px 20px; background: #00a2b1; color: white; border: none; border-radius: 5px; cursor: pointer;">Reload Page</button>
  `;
  document.body.appendChild(errorDiv);
  return false;
};

registerSW({ immediate: true });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
