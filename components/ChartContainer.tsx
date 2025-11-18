import React, { useState } from 'react';
import { Table, BarChart3, Download, ChevronRight, MoreHorizontal } from 'lucide-react';
import { ResponsiveContainer } from 'recharts';

interface ChartContainerProps {
  title: string;
  subtitle?: string;
  children: React.ReactElement;
  data: any[];
  className?: string;
  action?: React.ReactNode;
}

const ChartContainer: React.FC<ChartContainerProps> = ({ title, subtitle, children, data, className = '', action }) => {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');

  return (
    <div className={`glass-panel rounded-2xl flex flex-col shadow-lg transition-all duration-300 ${className}`}>
      <div className="p-5 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2 tracking-tight">
            {title}
          </h3>
          {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
        </div>
        
        <div className="flex items-center gap-2 flex-wrap">
           {action && (
             <div className="mr-1">
               {action}
             </div>
           )}
           
           <div className="flex items-center gap-2 bg-slate-950/30 p-1 rounded-lg border border-white/5">
              {/* Toggle Switch */}
              <button
                onClick={() => setViewMode('chart')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                    viewMode === 'chart' 
                    ? 'bg-slate-800 text-white shadow-sm ring-1 ring-white/10' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Chart</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                    viewMode === 'table' 
                    ? 'bg-slate-800 text-white shadow-sm ring-1 ring-white/10' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <Table className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Table</span>
              </button>
          </div>
        </div>
      </div>
      
      <div className="p-5 flex-1 min-h-[320px] relative">
        {viewMode === 'chart' ? (
          <div className="w-full h-full min-h-[320px] animate-fade-in">
             <ResponsiveContainer width="100%" height="100%">
                {children}
             </ResponsiveContainer>
          </div>
        ) : (
          <div className="overflow-hidden h-full max-h-[320px] w-full rounded-xl border border-white/5 animate-fade-in bg-slate-950/30 flex flex-col">
            <div className="overflow-auto custom-scrollbar flex-1">
              <table className="w-full text-left text-sm border-collapse">
                <thead className="bg-slate-900/90 backdrop-blur sticky top-0 z-10">
                  <tr>
                    {Object.keys(data[0] || {}).map((key) => (
                      <th key={key} className="px-5 py-3 font-semibold text-xs text-slate-400 uppercase tracking-wider border-b border-white/10 whitespace-nowrap">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {data.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors group">
                      {Object.values(row).map((val: any, cIdx) => (
                        <td key={cIdx} className="px-5 py-3 text-slate-300 tabular-nums text-xs group-hover:text-white transition-colors whitespace-nowrap">
                          {val.toLocaleString ? val.toLocaleString() : val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartContainer;