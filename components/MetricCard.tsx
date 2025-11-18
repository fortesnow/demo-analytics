import React from 'react';
import { ArrowUpRight, ArrowDownRight, HelpCircle } from 'lucide-react';
import { Metric } from '../types';

interface MetricCardProps {
  metric: Metric;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  const isPositive = metric.change >= 0;
  // For bounce rate, down is usually good
  const isTrendGood = metric.id === 'bounce' ? !isPositive : isPositive;
  const trendColor = isTrendGood ? 'text-emerald-400' : 'text-rose-400';
  const bgTrendColor = isTrendGood ? 'bg-emerald-500/10' : 'bg-rose-500/10';
  const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="glass-panel rounded-2xl p-5 relative overflow-hidden group transition-all duration-300 hover:-translate-y-1">
      {/* Decorative gradient glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500"></div>

      <div className="flex justify-between items-start mb-3 relative z-10">
        <div className="flex items-center gap-2 text-muted text-sm font-medium">
            {metric.label}
            {metric.description && (
                <div className="relative group/tooltip inline-flex items-center">
                    <HelpCircle className="w-3.5 h-3.5 text-slate-600 hover:text-primary cursor-help transition-colors" />
                    
                    {/* Tooltip Content */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-50 pointer-events-none transform translate-y-2 group-hover/tooltip:translate-y-0">
                        <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700 p-3 rounded-xl shadow-2xl text-xs text-slate-200 leading-relaxed relative">
                            <div className="font-semibold text-white mb-1 border-b border-slate-700 pb-1">{metric.label}</div>
                            {metric.description}
                            {/* Arrow */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-slate-800"></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold border border-transparent ${trendColor} ${bgTrendColor} group-hover:border-${isTrendGood ? 'emerald' : 'rose'}-500/20`}>
          <TrendIcon className="w-3 h-3" />
          <span>{Math.abs(metric.change)}%</span>
        </div>
      </div>
      
      <div className="text-3xl font-bold text-white tracking-tight mb-4 relative z-10 font-mono">
        {metric.value}
      </div>
      
      {/* Mini Progress/Trend Bar */}
      <div className="h-1.5 w-full bg-slate-800/80 rounded-full overflow-hidden relative z-10">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_currentColor] ${isTrendGood ? 'bg-emerald-500 text-emerald-500' : 'bg-rose-500 text-rose-500'}`} 
          style={{ width: `${Math.min(Math.abs(metric.change) * 5 + 20, 100)}%` }}
        ></div>
      </div>
    </div>
  );
};

export default MetricCard;