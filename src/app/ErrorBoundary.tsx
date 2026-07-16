import { Component, type ErrorInfo, type ReactNode } from "react";

import { RouteLink } from "./RouteLink";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  error: Error | null;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    error: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Unhandled portfolio route error", error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}

function ErrorFallback() {
  return (
    <div className="app-container py-section">
      <p className="text-sm font-medium text-danger">Application error</p>
      <h1 className="mt-sm text-4xl font-semibold text-text">Something went wrong</h1>
      <p className="mt-md max-w-2xl text-base leading-7 text-muted">
        The current view could not be rendered. Return home and try the route again.
      </p>
      <RouteLink
        className="mt-lg inline-flex rounded-pill border border-border bg-card px-lg py-sm text-sm font-medium text-text transition duration-200 ease-[var(--ease-standard)] hover:border-primary/60 hover:bg-surface"
        href="/"
      >
        Return home
      </RouteLink>
    </div>
  );
}
