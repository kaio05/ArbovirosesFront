import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import './css/style.css';
import './css/satoshi.css';
import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <ErrorBoundary>
        <AuthProvider>
          <Toaster position="top-right" />
          <App />
        </AuthProvider>
      </ErrorBoundary>
    </Router>
  </React.StrictMode>,
);
