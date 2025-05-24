import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Add error handling
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React Error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container mt-5">
          <div className="alert alert-danger">
            <h4>Something went wrong</h4>
            <p>{this.state.error && this.state.error.toString()}</p>
            <small>Check the console for more details</small>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Add network debugging
console.log("Starting React application with network debugging...");

// Debug axios requests
import axios from 'axios';
axios.interceptors.request.use(request => {
  console.log('Starting Request:', request.method, request.url);
  console.log('Request Headers:', request.headers);
  return request;
});

axios.interceptors.response.use(
  response => {
    console.log('Response:', response.status, response.config.url);
    return response;
  },
  error => {
    console.error('Axios Error:', error.message);
    if (error.response) {
      console.error('Error Status:', error.response.status);
      console.error('Error Data:', error.response.data);
    }
    return Promise.reject(error);
  }
);

const container = document.getElementById('root');
if (!container) {
  console.error("Root element not found!");
} else {
  console.log("Root element found, rendering app...");
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
}
