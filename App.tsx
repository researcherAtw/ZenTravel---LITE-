
import React, { useState } from 'react';
import { NAV_ITEMS } from './constants';
import { TabType } from './types';
import { ScheduleTab, BookingsTab } from './components/Modules';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('schedule');
  const [tripName, setTripName] = useState('日本大阪7天6夜');

  const renderContent = () => {
    switch (activeTab) {
      case 'schedule': return <ScheduleTab />;
      case 'bookings': return <BookingsTab />;
      default: return <ScheduleTab />;
    }
  };

  return (
    <div className="min-h-screen text-zen-text font-sans pb-24 max-w-md mx-auto relative shadow-2xl bg-zen-bg overflow-hidden">
      
      {/* Top Bar */}
      <header className="px-6 pt-12 pb-4 flex justify-between items-start bg-gradient-to-b from-zen-bg to-transparent sticky top-0 z-10">
        <div className="flex flex-col">
            <div className="mb-1">
                <div className="text-2xl font-bold text-[#1a1a1a] tracking-normal leading-none font-sans">旅の禪</div>
                <h1 className="text-[8px] font-medium tracking-widest uppercase text-stone-400 mt-1 ml-0.5">ZEN TRAVEL</h1>
            </div>
            <input 
                type="text"
                value={tripName}
                onChange={(e) => setTripName(e.target.value)}
                className="bg-transparent text-sm font-bold text-zen-primary placeholder-zen-primary/50 focus:outline-none border-b border-transparent focus:border-zen-primary transition-all w-48 mt-1"
                placeholder="Name your trip..."
            />
        </div>
        <div className="pt-1">
            {/* Single User Avatar */}
            <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden bg-stone-200">
                <img className="w-full h-full object-cover" src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix" alt="User" />
            </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-5 min-h-screen">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-stone-100 pb-safe pt-2 z-50 max-w-md mx-auto shadow-[0_-5px_20px_rgba(0,0,0,0.03)]">
        <div className="flex justify-around items-end px-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center w-14 py-2 transition-all duration-300 ${isActive ? 'text-zen-text -translate-y-2' : 'text-gray-300 hover:text-gray-400'}`}
              >
                <div className={`text-xl mb-1 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}>
                    <i className={`fa-solid ${item.icon}`}></i>
                </div>
                <span className={`text-[10px] font-bold ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                  {item.label}
                </span>
                {isActive && <div className="w-1 h-1 bg-zen-primary rounded-full mt-1"></div>}
              </button>
            );
          })}
        </div>
      </nav>
      
      {/* Safe area padding for bottom nav on mobile */}
      <div className="h-6 w-full fixed bottom-0 bg-white max-w-md mx-auto z-50 pointer-events-none"></div>
    </div>
  );
};

export default App;
