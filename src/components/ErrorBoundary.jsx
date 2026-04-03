import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      message: "",
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      message: error?.message || "Unexpected error",
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main id="main" className="container py-16 text-white">
          <p className="mb-2 text-xs uppercase tracking-[0.14em] text-white/40">
            Application Error
          </p>
          <h1 className="text-4xl font-extrabold">Something went wrong</h1>
          <p className="mt-4 max-w-2xl text-white/70">{this.state.message}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-8 rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
          >
            Reload page
          </button>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
