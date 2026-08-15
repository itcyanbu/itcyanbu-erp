import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Trash2 } from 'lucide-react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error in application:', error, errorInfo);
    }

    private handleReset = () => {
        try {
            // Clear contacts cache in case corrupted data caused the crash
            localStorage.removeItem('ghl_contacts');
            localStorage.removeItem('ghl_smart_lists');
        } catch {
            // ignore
        }
        window.location.href = '/';
    };

    private handleReload = () => {
        window.location.reload();
    };

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                    <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center animate-in fade-in zoom-in-95 duration-200">
                        <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-100 shadow-sm">
                            <AlertTriangle size={32} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h2>
                        <p className="text-sm text-gray-500 mb-6">
                            An unexpected issue occurred while rendering the page. You can try refreshing or resetting the local data cache.
                        </p>
                        
                        {this.state.error && (
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-left mb-6 overflow-auto max-h-32 text-xs text-red-600 font-mono">
                                {this.state.error.message}
                            </div>
                        )}

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={this.handleReload}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-ghl-blue text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm"
                            >
                                <RefreshCw size={16} />
                                Refresh Page
                            </button>
                            <button
                                onClick={this.handleReset}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors"
                            >
                                <Trash2 size={16} />
                                Clear Cache & Reset
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
