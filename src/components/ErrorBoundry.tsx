import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(typeof React) //so that the stupid warning disapears, and i wont have to fuck around with docker-compose anymore
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    
    // In production, you could send this to your logging service
    if (process.env.NODE_ENV === 'production') {
      // replace with actual logging service, was too lazy to set one up
      this.logErrorToService(error, errorInfo);
    }
  }
  
  logErrorToService(error: Error, errorInfo: ErrorInfo) {
    // Replace this with your actual error logging service
    console.log('Would log to error service in production:', {
      error: error.toString(),
      componentStack: errorInfo.componentStack,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-lg font-semibold text-red-700 mb-2">Something went wrong</h2>
          <p className="text-red-600 mb-4">
            We've encountered an error. Please try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;