import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-6">
                        <AlertTriangle size={40} />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-800 mb-3">Something went wrong</h1>
                    <p className="text-slate-600 max-w-md mb-8">
                        An unexpected error occurred in the application. We suggest refreshing the page or returning home.
                    </p>
                    <div className="flex gap-4">
                        <button
                            onClick={() => window.location.reload()}
                            className="flex items-center gap-2 px-6 py-3 bg-[#112D4E] text-white rounded-xl font-bold hover:shadow-lg transition-all"
                        >
                            <RefreshCcw size={18} />
                            Reload Page
                        </button>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="px-6 py-3 border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-white transition-all"
                        >
                            Return Home
                        </button>
                    </div>
                    {process.env.NODE_ENV === 'development' && (
                        <div className="mt-12 p-4 bg-slate-100 rounded-lg text-left max-w-2xl overflow-auto">
                            <p className="text-xs font-mono text-red-600">{this.state.error?.toString()}</p>
                        </div>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
