
import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCcw } from "lucide-react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
                    <div className="max-w-md w-full bg-slate-900/50 backdrop-blur-xl border border-red-500/20 p-8 rounded-2xl shadow-2xl text-center">
                        <div className="mb-6 flex justify-center">
                            <div className="p-4 bg-red-500/10 rounded-full ring-1 ring-red-500/50">
                                <AlertTriangle className="w-12 h-12 text-red-400" />
                            </div>
                        </div>

                        <h1 className="text-2xl font-bold text-white mb-2">Упс! Что-то пошло не так</h1>
                        <p className="text-slate-400 mb-8 leading-relaxed">
                            Произошла ошибка при загрузке страницы. Пожалуйста, попробуйте обновить страницу.
                        </p>

                        {process.env.NODE_ENV === 'development' && (
                            <pre className="text-left bg-black/50 p-4 rounded mb-6 overflow-auto text-xs text-red-300 max-h-40">
                                {this.state.error?.toString()}
                            </pre>
                        )}

                        <Button
                            onClick={() => window.location.reload()}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 rounded-xl transition-all"
                        >
                            <RefreshCcw className="mr-2 h-5 w-5" />
                            Обновить страницу
                        </Button>
                    </div>
                </div>
            );
        }

        return this.children;
    }
}

export default ErrorBoundary;
