import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, Send, Bot } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { Metric, AnalyticsData, TimeRange } from '../types';

interface AiPanelProps {
  metrics: Metric[];
  data: AnalyticsData;
  currentRange: TimeRange;
}

const AiPanel: React.FC<AiPanelProps> = ({ metrics, data, currentRange }) => {
  const [insight, setInsight] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [chatResponse, setChatResponse] = useState('');

  const fetchInsight = async () => {
    setLoading(true);
    const result = await geminiService.generateInsights(metrics, currentRange, data);
    setInsight(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchInsight();
  }, [currentRange, metrics, data]);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setChatResponse('Thinking...');
    const answer = await geminiService.askQuestion(query, { metrics, data });
    setChatResponse(answer);
    setQuery('');
  };

  return (
    <div className="glass-panel rounded-2xl border border-primary/20 p-6 relative overflow-hidden shadow-2xl group">
      {/* Animated background glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 blur-[80px] rounded-full pointer-events-none animate-pulse-slow"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/10 blur-[80px] rounded-full pointer-events-none animate-pulse-slow" style={{animationDelay: '2s'}}></div>

      <div className="flex items-center gap-2 mb-5 relative z-10 border-b border-white/5 pb-4">
        <div className="p-2 bg-gradient-to-br from-primary to-violet-600 rounded-lg shadow-lg shadow-primary/20">
             <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div>
            <h3 className="text-base font-bold text-white">AI Insights</h3>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">Powered by Gemini 2.5</p>
        </div>
        <button 
            onClick={fetchInsight}
            disabled={loading}
            className="ml-auto p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            title="Refresh Insights"
        >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="mb-6 bg-slate-950/40 rounded-xl p-4 border border-white/5 relative z-10 min-h-[100px]">
        {loading ? (
            <div className="flex flex-col gap-2">
                <div className="h-2 bg-slate-800 rounded w-3/4 animate-pulse"></div>
                <div className="h-2 bg-slate-800 rounded w-full animate-pulse delay-75"></div>
                <div className="h-2 bg-slate-800 rounded w-5/6 animate-pulse delay-150"></div>
            </div>
        ) : (
            <p className="text-slate-300 text-sm leading-relaxed">{insight}</p>
        )}
      </div>

      <div className="relative z-10 flex flex-col gap-3">
        {chatResponse && (
             <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-sm text-indigo-200 animate-slide-up">
                <div className="flex items-center gap-2 mb-1">
                    <Bot className="w-3 h-3 text-indigo-400" />
                    <span className="font-bold text-xs uppercase tracking-wider text-indigo-400">Answer</span>
                </div>
                {chatResponse}
             </div>
        )}
        <form onSubmit={handleAsk} className="relative group/input">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-xl blur opacity-0 group-focus-within/input:opacity-40 transition-opacity duration-500"></div>
            <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask Gemini about your data..."
                className="relative w-full bg-slate-900/80 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 placeholder-slate-500 transition-all shadow-inner"
            />
            <button 
                type="submit" 
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-lg transition-all duration-200"
            >
                <Send className="w-4 h-4" />
            </button>
        </form>
      </div>
    </div>
  );
};

export default AiPanel;