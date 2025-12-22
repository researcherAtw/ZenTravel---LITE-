import React, { useState, useEffect, useRef } from 'react';
import { NAV_ITEMS } from './constants';
import { TabType, ZenTripData, ScheduleItem } from './types';
import { ScheduleTab, BookingsTab } from './components/Modules';
import { ZenDB } from './services/db';
import { INITIAL_TRIP_DATA } from './data/initialData';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('schedule');
  const [tripData, setTripData] = useState<ZenTripData | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  
  // Password Logic
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showError, setShowError] = useState(false);
  
  const headerRef = useRef<HTMLElement>(null);
  const searchBtnRef = useRef<HTMLButtonElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastScrollPos = useRef<number>(0);

  // Initialize and Load Data
  useEffect(() => {
    const init = async () => {
      let data = await ZenDB.loadTrip();
      if (!data) {
        await ZenDB.saveTrip(INITIAL_TRIP_DATA);
        data = INITIAL_TRIP_DATA;
      }
      setTripData(data);
    };
    init();
  }, []);

  // Persistence handler
  const updateTripData = async (newData: ZenTripData) => {
    setTripData(newData);
    setIsSyncing(true);
    try {
      await ZenDB.saveTrip(newData);
    } catch (e) {
      console.error('Failed to save trip:', e);
    } finally {
      setTimeout(() => setIsSyncing(false), 800);
    }
  };

  const handleUpdateSchedule = (newSchedule: ScheduleItem[]) => {
    if (!tripData) return;
    updateTripData({
      ...tripData,
      schedule: newSchedule,
      lastUpdated: Date.now()
    });
  };

  const handleUpdateTripName = (newName: string) => {
    if (!tripData) return;
    updateTripData({
      ...tripData,
      tripName: newName,
      lastUpdated: Date.now()
    });
  };

  useEffect(() => {
    if (searchTerm && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [searchTerm]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'auto' });
    }
    if (activeTab === 'bookings') {
        setShowError(false);
        setPasswordInput('');
    }
  }, [activeTab]);

  const handleKeypadPress = (num: string) => {
    if (passwordInput.length < 6) {
      const newVal = passwordInput + num;
      setPasswordInput(newVal);
      if (newVal === '333') {
        setIsUnlocked(true);
        setShowError(false);
        setPasswordInput('');
        return;
      } 
      if (newVal.length >= 3) {
        setShowError(true);
        setPasswordInput('');
        const timer = setTimeout(() => setShowError(false), 1500);
        return () => clearTimeout(timer);
      }
    }
  };

  const handleBackspace = () => {
    setPasswordInput(prev => prev.slice(0, -1));
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchTerm('');
    setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ 
          top: lastScrollPos.current, 
          behavior: 'smooth' 
        });
      }
    }, 10);
  };

  const handleToggleSearch = () => {
    if (isSearchOpen) {
      handleCloseSearch();
    } else {
      if (scrollContainerRef.current) {
        lastScrollPos.current = scrollContainerRef.current.scrollTop;
      }
      setIsSearchOpen(true);
    }
  };

  useEffect(() => {
    if (isSearchOpen) {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        const clickedOutsideHeader = headerRef.current && !headerRef.current.contains(target);
        const clickedOutsideSearchBtn = searchBtnRef.current && !searchBtnRef.current.contains(target);
        if (clickedOutsideHeader && clickedOutsideSearchBtn) {
          if (!searchTerm) {
            handleCloseSearch();
          }
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isSearchOpen, searchTerm]);

  const activeIndex = NAV_ITEMS.findIndex(item => item.id === activeTab);

  if (!tripData) return null;

  return (
    <div 
      ref={scrollContainerRef}
      className="h-[100dvh] text-zen-text font-sans max-w-md mx-auto relative shadow-2xl bg-zen-bg overflow-y-auto overflow-x-hidden no-scrollbar overscroll-y-none"
    >
      <header 
        ref={headerRef}
        className="px-6 h-[108px] flex flex-col justify-center bg-zen-bg sticky top-0 z-40 transform-gpu"
      >
        <div className="flex justify-between items-start w-full">
            <div className={`flex flex-col transition-all duration-500 ${isSearchOpen ? 'opacity-0 scale-95 translate-x-[-20px] pointer-events-none' : 'opacity-100 scale-100'}`}>
                <div className="mb-0.5 flex items-center gap-2">
                    <div className="text-2xl font-bold text-[#1a1a1a] tracking-normal leading-none font-sans">旅の禪</div>
                    {isSyncing && (
                      <div className="w-1.5 h-1.5 rounded-full bg-zen-secondary animate-pulse mt-0.5"></div>
                    )}
                </div>
                <h1 className="text-[8px] font-medium tracking-widest uppercase text-stone-400 mt-1 ml-0.5 font-sans">ZEN TRAVEL | SYNCED LOCAL</h1>
                {!isSearchOpen && (
                  <input 
                      type="text"
                      value={tripData.tripName}
                      onChange={(e) => handleUpdateTripName(e.target.value)}
                      className="bg-transparent text-sm font-bold text-zen-primary placeholder-zen-primary/50 focus:outline-none border-b border-transparent focus:border-zen-primary transition-all w-48 mt-0.5"
                      placeholder="Name your trip..."
                  />
                )}
            </div>

            <div className={`pt-1 transition-all duration-500 ${isSearchOpen ? 'opacity-0 scale-95' : 'opacity-100'}`}>
                <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden bg-stone-200">
                    <img className="w-full h-full object-cover" src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix" alt="User" />
                </div>
            </div>
        </div>

        {isSearchOpen && (
          <div className="absolute inset-x-6 bottom-4 animate-fade-in flex items-center gap-3">
            <div className="relative flex-1">
              <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-xs"></i>
              <input 
                autoFocus
                type="text"
                placeholder="搜尋行程、地點、內容..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-11 bg-white/80 backdrop-blur-md rounded-2xl pl-10 pr-4 text-sm font-medium border border-stone-200/40 focus:outline-none focus:ring-4 ring-zen-primary/10 shadow-inner"
              />
            </div>
            <button 
              onClick={handleCloseSearch}
              className="text-stone-400 text-xs font-bold hover:text-zen-text px-1 font-sans"
            >
              取消
            </button>
          </div>
        )}
      </header>

      <main className="px-5 pb-32">
        {activeTab === 'schedule' ? (
          <ScheduleTab searchTerm={searchTerm} items={tripData.schedule} onUpdateItems={handleUpdateSchedule} />
        ) : isUnlocked ? (
          <BookingsTab searchTerm={searchTerm} bookings={tripData.bookings} />
        ) : (
          <div className="flex flex-col items-center justify-center pt-2 pb-10 animate-fade-in h-[calc(100vh-250px)]">
            <div className="mb-10" />
            <div className="grid grid-cols-3 gap-3 w-full max-w-[240px]">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <button
                  key={num}
                  onClick={() => handleKeypadPress(num.toString())}
                  className="aspect-square flex items-center justify-center text-2xl font-mono font-bold text-zen-text bg-white rounded-2xl shadow-zen-sm border border-stone-50 active:scale-90 active:bg-stone-50 transition-all"
                >
                  {num}
                </button>
              ))}
              <div />
              <button
                onClick={() => handleKeypadPress('0')}
                className="aspect-square flex items-center justify-center text-2xl font-mono font-bold text-zen-text bg-white rounded-2xl shadow-zen-sm border border-stone-50 active:scale-90 active:bg-stone-50 transition-all"
              >
                0
              </button>
              <button
                onClick={handleBackspace}
                className="aspect-square flex items-center justify-center text-xl text-stone-400 active:scale-95 transition-all"
              >
                <i className="fa-solid fa-delete-left"></i>
              </button>
            </div>
            {showError && (
              <div className="mt-8 text-center text-[10px] text-red-500 font-bold uppercase tracking-widest py-1.5 animate-fade-in bg-red-50 px-5 rounded-full">
                密碼錯誤
              </div>
            )}
            <button 
              onClick={() => setActiveTab('schedule')}
              className="mt-12 text-stone-400 text-[12px] font-bold hover:text-zen-primary transition-colors flex items-center gap-2 font-sans"
            >
              <i className="fa-solid fa-arrow-left"></i>
              返回行程
            </button>
          </div>
        )}
      </main>

      <button 
        ref={searchBtnRef}
        onClick={handleToggleSearch}
        className={`fixed bottom-28 right-6 w-14 h-14 backdrop-blur-sm border border-white/20 rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.12)] active:scale-95 transition-all duration-500 z-50 flex items-center justify-center group ${isSearchOpen ? 'bg-zen-primary/60 text-white shadow-zen-primary/20' : 'bg-white/10 text-zen-primary'}`}
        aria-label="Toggle Search"
      >
        <i className={`fa-solid ${isSearchOpen ? 'fa-xmark' : 'fa-magnifying-glass'} text-xl group-hover:scale-110 transition-transform`}></i>
      </button>

      <nav className="fixed bottom-8 left-12 right-12 bg-white/10 backdrop-blur-3xl rounded-[32px] p-1 z-50 max-w-[calc(448px-6rem)] mx-auto shadow-[0_25px_50px_rgba(0,0,0,0.08)] border border-white/20">
        <div className="relative flex items-center h-12">
          <div 
            className="absolute h-10 bg-zen-primary/80 rounded-[26px] transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1) shadow-md"
            style={{ 
              width: `${(100 / NAV_ITEMS.length)}%`,
              left: `${(activeIndex * 100) / NAV_ITEMS.length}%`,
            }}
          />
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex-1 flex items-center justify-center gap-2 h-full transition-all duration-300 z-10 ${isActive ? 'text-white' : 'text-stone-400 hover:text-stone-600'}`}
              >
                <div className={`text-base transition-transform duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}>
                    <i className={`fa-solid ${item.icon}`}></i>
                </div>
                <span className={`text-xs font-bold tracking-wider transition-all duration-300 ${isActive ? 'opacity-100 w-auto ml-1' : 'opacity-0 w-0 overflow-hidden'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
      
      <div className="h-4 w-full fixed bottom-0 max-w-md mx-auto z-40 pointer-events-none"></div>
    </div>
  );
};

export default App;
