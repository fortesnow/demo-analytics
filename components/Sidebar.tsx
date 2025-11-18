import React from 'react';
import { LayoutDashboard, PieChart, Users, Settings, BarChart2, Zap, BookOpen, ChevronRight } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'audience', label: 'Audience', icon: Users },
    { id: 'acquisition', label: 'Acquisition', icon: PieChart },
    { id: 'behavior', label: 'Behavior', icon: BarChart2 },
    { id: 'realtime', label: 'Real-time', icon: Zap, badge: 'Live' },
  ];

  return (
    <aside className="w-64 glass-panel border-r-0 border-r border-white/5 hidden md:flex flex-col h-full fixed left-0 top-0 z-40 shadow-2xl">
      <div className="p-6 flex items-center gap-3 mb-2">
        <div className="w-9 h-9 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 ring-1 ring-white/10">
          <BarChart2 className="text-white w-5 h-5" />
        </div>
        <div>
            <h1 className="text-lg font-bold tracking-tight text-white leading-none">Nexus</h1>
            <span className="text-[10px] font-semibold text-primary tracking-widest uppercase">Analytics</span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
        <div className="px-3 mb-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Overview</div>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 group relative ${
              activeTab === item.id
                ? 'bg-primary/10 text-white'
                : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
            }`}
          >
            {activeTab === item.id && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full shadow-[0_0_10px_#6366f1]"></div>
            )}
            <div className="flex items-center gap-3">
              <item.icon className={`w-5 h-5 transition-colors ${activeTab === item.id ? 'text-primary drop-shadow-[0_0_5px_rgba(99,102,241,0.5)]' : 'text-slate-500 group-hover:text-slate-300'}`} />
              <span className="font-medium text-sm">{item.label}</span>
            </div>
            {item.badge ? (
              <span className="bg-rose-500/20 text-rose-400 text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse border border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.2)]">
                {item.badge}
              </span>
            ) : activeTab === item.id && (
                <ChevronRight className="w-4 h-4 text-primary/50" />
            )}
          </button>
        ))}
        
        <div className="px-3 mt-8 mb-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Resources</div>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors group">
             <BookOpen className="w-5 h-5 text-slate-500 group-hover:text-accent transition-colors" />
             <span className="font-medium text-sm">Beginner's Guide</span>
        </button>
      </nav>

      <div className="p-4 border-t border-white/5 bg-slate-950/30 backdrop-blur-sm">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
          <Settings className="w-5 h-5" />
          <span className="font-medium text-sm">Settings</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;