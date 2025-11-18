import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import MetricCard from './components/MetricCard';
import ChartContainer from './components/ChartContainer';
import AiPanel from './components/AiPanel';
import { TimeRange, UserSegment } from './types';
import { MOCK_METRICS, generateData } from './constants';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  BarChart, Bar, PieChart, Pie, Cell, Legend, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import { 
  Calendar, Bell, Search, ChevronDown, Users, Info, SlidersHorizontal, 
  Layers, Activity, BarChart2 
} from 'lucide-react';

const COLORS = ['#6366f1', '#ec4899', '#8b5cf6', '#0ea5e9', '#10b981'];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [timeRange, setTimeRange] = useState<TimeRange>(TimeRange.Week);
  const [segment, setSegment] = useState<UserSegment>(UserSegment.All);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [trafficChartType, setTrafficChartType] = useState<'area' | 'bar' | 'line'>('area');
  
  // Simulate data changing when filters change
  const data = useMemo(() => generateData(timeRange, segment), [timeRange, segment]);
  
  // Custom Tooltip for Charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel !bg-slate-900/95 border-slate-700 p-3 rounded-xl shadow-2xl backdrop-blur-xl">
          <p className="text-slate-400 text-[10px] font-bold mb-2 uppercase tracking-wider">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-3 text-xs py-0.5">
              <div className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: entry.color, color: entry.color }} />
              <span className="text-slate-300 font-medium">{entry.name}:</span>
              <span className="text-white font-mono font-bold">{entry.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const trafficChartControls = (
    <div className="flex items-center gap-1 bg-slate-950/30 p-1 rounded-lg border border-white/5">
        <button
            onClick={() => setTrafficChartType('area')}
            className={`p-1.5 rounded-md transition-all ${trafficChartType === 'area' ? 'bg-slate-800 text-primary shadow-sm' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            title="Area Chart"
        >
            <Layers className="w-3.5 h-3.5" />
        </button>
        <button
            onClick={() => setTrafficChartType('bar')}
            className={`p-1.5 rounded-md transition-all ${trafficChartType === 'bar' ? 'bg-slate-800 text-primary shadow-sm' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            title="Bar Chart"
        >
            <BarChart2 className="w-3.5 h-3.5" />
        </button>
        <button
            onClick={() => setTrafficChartType('line')}
            className={`p-1.5 rounded-md transition-all ${trafficChartType === 'line' ? 'bg-slate-800 text-primary shadow-sm' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            title="Line Chart"
        >
            <Activity className="w-3.5 h-3.5" />
        </button>
    </div>
  );

  const renderTrafficChart = () => {
    const commonProps = {
      data: data.visitors,
      margin: { top: 10, right: 10, left: 0, bottom: 0 }
    };

    const commonComponents = (
      <>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
            <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ec4899" stopOpacity={0.1}/>
            <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
        <XAxis dataKey="name" stroke="#475569" tick={{fontSize: 10, fill: '#64748b'}} tickLine={false} axisLine={false} dy={10} />
        <YAxis stroke="#475569" tick={{fontSize: 10, fill: '#64748b'}} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#6366f1', strokeWidth: 1, strokeDasharray: '5 5' }} />
        <Legend wrapperStyle={{paddingTop: '10px'}} iconType="circle" formatter={(val) => <span className="text-slate-400 text-xs">{val}</span>}/>
      </>
    );

    if (trafficChartType === 'bar') {
      return (
        <BarChart {...commonProps}>
           {commonComponents}
           <Bar dataKey="value" name="Current Period" fill="#6366f1" radius={[4, 4, 0, 0]} animationDuration={1500} />
           <Bar dataKey="value2" name="Previous Period" fill="#ec4899" radius={[4, 4, 0, 0]} animationDuration={1500} fillOpacity={0.5} />
        </BarChart>
      );
    }

    if (trafficChartType === 'line') {
      return (
        <LineChart {...commonProps}>
           {commonComponents}
           <Line type="monotone" dataKey="value" name="Current Period" stroke="#6366f1" strokeWidth={3} dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6, strokeWidth: 0, fill: '#fff' }} animationDuration={1500} />
           <Line type="monotone" dataKey="value2" name="Previous Period" stroke="#ec4899" strokeWidth={2} strokeDasharray="4 4" dot={false} animationDuration={1500} />
        </LineChart>
      );
    }

    // Default Area
    return (
      <AreaChart {...commonProps}>
        {commonComponents}
        <Area type="monotone" dataKey="value" name="Current Period" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" activeDot={{ r: 6, strokeWidth: 0, fill: '#fff' }} animationDuration={1500} />
        <Area type="monotone" dataKey="value2" name="Previous Period" stroke="#ec4899" strokeWidth={2} strokeDasharray="4 4" fillOpacity={1} fill="url(#colorValue2)" animationDuration={1500} />
      </AreaChart>
    );
  };

  return (
    <div className="flex min-h-screen font-sans text-text selection:bg-primary/30 overflow-hidden bg-background">
      {/* Mobile Sidebar Toggle Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden animate-fade-in"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-0 md:ml-64 p-4 md:p-8 h-screen overflow-y-auto custom-scrollbar relative">
        {/* Header Section */}
        <header className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-8 animate-fade-in">
          <div>
            <div className="flex items-center gap-3 mb-2">
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden p-2 glass-panel rounded-lg text-slate-400">
                    <SlidersHorizontal className="w-5 h-5" />
                </button>
                <h2 className="text-3xl font-bold text-white tracking-tight">Dashboard</h2>
            </div>
            <div className="text-muted text-sm flex items-center gap-2 bg-white/5 w-fit px-3 py-1.5 rounded-full border border-white/5">
                <Info className="w-3.5 h-3.5 text-primary" />
                <span>Welcome back. Here's your <span className="text-white font-medium">Performance Report</span>.</span>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 animate-fade-in" style={{animationDelay: '0.1s'}}>
             {/* Search Bar */}
             <div className="hidden lg:flex items-center glass-input rounded-xl px-3 py-2 w-64 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all shadow-sm group">
                <Search className="w-4 h-4 text-slate-400 mr-2 group-focus-within:text-primary transition-colors" />
                <input type="text" placeholder="Search metrics..." className="bg-transparent border-none outline-none text-sm text-white w-full placeholder-slate-500" />
             </div>

             {/* Filter Group */}
             <div className="flex items-center gap-2 bg-slate-900/50 p-1 rounded-xl border border-white/5 shadow-sm">
                {/* Segment Filter */}
                <div className="relative group z-20">
                    <button className="flex items-center gap-2 hover:bg-white/5 text-slate-300 px-3 py-1.5 rounded-lg text-sm font-medium transition-all">
                        <Users className="w-3.5 h-3.5 text-secondary" />
                        <span>{segment}</span>
                        <ChevronDown className="w-3.5 h-3.5 ml-1 text-slate-500" />
                    </button>
                    <div className="absolute right-0 top-full mt-2 w-56 glass-panel rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0 overflow-hidden border border-white/10">
                        <div className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-950/50">Filter by Segment</div>
                        {Object.values(UserSegment).map((seg) => (
                            <button 
                                key={seg} 
                                onClick={() => setSegment(seg)}
                                className={`w-full text-left px-4 py-2.5 text-xs font-medium hover:bg-white/5 transition-colors flex items-center justify-between ${segment === seg ? 'text-primary bg-primary/5' : 'text-slate-300'}`}
                            >
                                {seg}
                                {segment === seg && <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_5px_#6366f1]"></div>}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="w-px h-4 bg-white/10"></div>

                {/* Time Filter */}
                <div className="relative group z-20">
                    <button className="flex items-center gap-2 hover:bg-white/5 text-slate-300 px-3 py-1.5 rounded-lg text-sm font-medium transition-all">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        <span>{timeRange === TimeRange.Day ? '24 Hours' : timeRange === TimeRange.Week ? '7 Days' : timeRange === TimeRange.Month ? '30 Days' : '1 Year'}</span>
                        <ChevronDown className="w-3.5 h-3.5 ml-1 text-slate-500" />
                    </button>
                    <div className="absolute right-0 top-full mt-2 w-48 glass-panel rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0 overflow-hidden border border-white/10">
                        <div className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-950/50">Time Range</div>
                        {Object.values(TimeRange).map((range) => (
                            <button 
                                key={range} 
                                onClick={() => setTimeRange(range)}
                                className={`w-full text-left px-4 py-2.5 text-xs font-medium hover:bg-white/5 transition-colors flex items-center justify-between ${timeRange === range ? 'text-primary bg-primary/5' : 'text-slate-300'}`}
                            >
                                {range === TimeRange.Day ? 'Last 24 Hours' : range === TimeRange.Week ? 'Last 7 Days' : range === TimeRange.Month ? 'Last 30 Days' : 'Last Year'}
                                {timeRange === range && <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_5px_#6366f1]"></div>}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <button className="p-2.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border border-slate-900 shadow-sm animate-pulse"></span>
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-slide-up" style={{animationDelay: '0.15s'}}>
          {MOCK_METRICS.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 animate-slide-up" style={{animationDelay: '0.25s'}}>
          {/* Main Chart (2/3 width) */}
          <div className="lg:col-span-2">
             <ChartContainer 
                title="Traffic Overview" 
                subtitle={`Visitors over the last ${timeRange}`} 
                data={data.visitors}
                className="h-full"
                action={trafficChartControls}
             >
                {renderTrafficChart()}
             </ChartContainer>
          </div>

          {/* AI & Donut Chart (1/3 width) */}
          <div className="flex flex-col gap-6">
            <AiPanel metrics={MOCK_METRICS} data={data} currentRange={timeRange} />
            
            <ChartContainer title="Device Distribution" subtitle="By user session" data={data.devices} className="flex-1 min-h-[300px]">
              <PieChart>
                <Pie
                  data={data.devices}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {data.devices.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="stroke-slate-900 stroke-2" />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                    verticalAlign="bottom" 
                    height={36} 
                    iconType="circle" 
                    formatter={(value) => <span className="text-slate-300 text-xs font-medium ml-1">{value}</span>}
                />
              </PieChart>
            </ChartContainer>
          </div>
        </div>

        {/* Secondary Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-up" style={{animationDelay: '0.35s'}}>
             <ChartContainer title="Acquisition Channels" subtitle="Top performing sources" data={data.sources}>
                <BarChart data={data.sources} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" horizontal={true} vertical={false} />
                    <XAxis type="number" stroke="#475569" tick={{fontSize: 10, fill: '#64748b'}} axisLine={false} tickLine={false} />
                    <YAxis dataKey="name" type="category" stroke="#94a3b8" tick={{fontSize: 11, fill: '#cbd5e1'}} width={100} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
                    <Bar dataKey="value" name="Sessions" radius={[0, 4, 4, 0]} barSize={24} animationDuration={1500}>
                        {data.sources.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
             </ChartContainer>

             <ChartContainer title="Revenue Trend" subtitle="Cumulative growth" data={data.revenue}>
                <BarChart data={data.revenue} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1}/>
                            <stop offset="100%" stopColor="#6366f1" stopOpacity={0.8}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                    <XAxis dataKey="name" stroke="#475569" tick={{fontSize: 10, fill: '#64748b'}} tickLine={false} axisLine={false} dy={10} />
                    <YAxis stroke="#475569" tick={{fontSize: 10, fill: '#64748b'}} tickLine={false} axisLine={false} tickFormatter={(val) => `¥${val/1000}k`} />
                    <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
                    <Bar dataKey="value" name="Revenue" fill="url(#barGradient)" radius={[4, 4, 0, 0]} animationDuration={1500} />
                </BarChart>
             </ChartContainer>
        </div>
      </main>
    </div>
  );
};

export default App;