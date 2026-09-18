import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            error: null,
        };
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error,
        };
    }

    componentDidCatch(error, errorInfo) {
        console.error("React Error Boundary:", error);
        console.error("Component Stack:", errorInfo.componentStack);
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex min-h-screen items-center justify-center bg-background p-6">
                    <div className="w-full max-w-2xl rounded-lg border bg-card p-6 shadow-sm">
                        <div className="mb-4">
                            <h1 className="text-xl font-semibold text-destructive">
                                Something went wrong
                            </h1>

                            <p className="mt-1 text-sm text-muted-foreground">
                                An unexpected error occurred while rendering this page.
                            </p>
                        </div>

                        <div className="mb-4 rounded-md bg-muted p-4">
                            <p className="font-mono text-sm text-destructive">
                                {this.state.error?.message}
                            </p>
                        </div>

                        {import.meta.env.DEV && this.state.error?.stack && (
                            <details className="mb-4">
                                <summary className="cursor-pointer text-sm font-medium">
                                    Show error details
                                </summary>

                                <pre className="mt-3 max-h-96 overflow-auto rounded-md bg-muted p-4 text-xs">
                                    {this.state.error.stack}
                                </pre>
                            </details>
                        )}

                        <button
                            onClick={this.handleReload}
                            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
