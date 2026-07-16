"use client";

interface AIFilterBarProps {
    onOpenAI: (query?: string) => void;
}

export function AIFilterBar({ onOpenAI }: AIFilterBarProps) {
    return (
        <div className="max-w-7xl mx-auto px-4 mb-8">
            <div className="bg-linear-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-linear-to-r from-blue-600 to-cyan-600">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-lg">Let Titan AI Help You Find Perfect Shoes</h3>
                            <p className="text-slate-300 text-sm">Describe what you're looking for and get AI-powered recommendations</p>
                        </div>
                    </div>
                    <button
                        onClick={() => onOpenAI("Find me running shoes under $150")}
                        className="px-6 py-3 rounded-xl bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold transition-all flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        Ask Titan AI
                    </button>
                </div>
            </div>
        </div>
    );
}