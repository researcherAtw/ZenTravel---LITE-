import React, { useState, useEffect, useRef } from 'react';
import { NAV_ITEMS } from './constants';
import { TabType } from './types';
import { ScheduleTab, BookingsTab } from './components/Modules';
import { Button } from './components/UI';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('schedule');
  const [tripName, setTripName] = useState('日本大阪7天6夜');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Password Logic
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showError, setShowError] = useState(false);
  
  const headerRef = useRef<HTMLElement>(null);
  const searchBtnRef = useRef<HTMLButtonElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastScrollPos = useRef<number>(0);

  /**
   * 搜尋結果置頂優化
   */
  useEffect(() => {
    if (searchTerm && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [searchTerm]);

  /**
   * 分頁切換時，同樣將捲動位置重置。
   */
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'auto' });
    }
    // 每次切換分頁如果是去預訂頁，確保錯誤提示清空
    if (activeTab === 'bookings') {
        setShowError(false);
    }
  }, [activeTab]);

  const handlePasswordSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (passwordInput === '333') {
      setIsUnlocked(true);
      setShowError(false);
    } else {
      setShowError(true);
      setPasswordInput('');
      // Reset error message after a while
      setTimeout(() => setShowError(false), 3000);
    }
  };

  /**
   * 處理關閉搜尋
   */
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

  /**
   * 點擊搜尋按鈕
   */
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

  /**
   * 點擊外部自動收合搜尋列
   */
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

  /**
   * 渲染內容區域
   */
  const renderContent = () => {
    const currentSearch = isSearchOpen ? searchTerm : '';
    
    if (activeTab === 'bookings') {
      if (!isUnlocked) {
        return (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div className="w-20 h-20 bg-white rounded-3xl shadow-zen flex items-center justify-center text-zen-primary mb-8 border border-stone-50">
              <i className="fa-solid fa-lock text-3xl"></i>
            </div>
            <h2 className="text-xl font-bold text-zen-text mb-2 font-sans">存取受限</h2>
            <p className="text-xs text-stone-400 mb-8 font-bold tracking-widest uppercase">Password Required</p>
            
            <form onSubmit={handlePasswordSubmit} className="w-full max-w-[240px] flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <input 
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="輸入密碼"
                  className={`w-full h-12 bg-white rounded-2xl px-4 text-center text-lg font-mono tracking-widest border transition-all ${showError ? 'border-red-400 ring-4 ring-red-50 animate-pulse' : 'border-stone-100 focus:border-zen-primary focus:ring-4 ring-zen-primary/10'} shadow-sm outline-none`}
                />
                {showError && (
                  <div className="text-center text-[10px] text-red-500 font-bold uppercase tracking-tighter py-1 animate-fade-in">
                    密碼錯誤，請重試
                  </div>
                )}
              </div>
              <Button type="submit" className="w-full h-12 rounded-2xl">
                解鎖頁面
              </Button>
            </form>

            <button 
              onClick={() => setActiveTab('schedule')}
              className="mt-12 text-stone-400 text-xs font-bold hover:text-zen-primary transition-colors flex items-center gap-2"
            >
              <i className="fa-solid fa-arrow-left"></i>
              返回行程
            </button>
          </div>
        );
      }
      return <BookingsTab searchTerm={currentSearch} />;
    }
    
    return <ScheduleTab searchTerm={currentSearch} />;
  };

  const activeIndex = NAV_ITEMS.findIndex(item => item.id === activeTab);

  return (
    <div 
      ref={scrollContainerRef}
      className="h-[100dvh] text-zen-text font-sans max-w-md mx-auto relative shadow-2xl bg-zen-bg overflow-y-auto overflow-x-hidden no-scrollbar overscroll-y-none"
    >
      
      {/* Header */}
      <header 
        ref={headerRef}
        className="px-6 h-[108px] flex flex-col justify-center bg-zen-bg sticky top-0 z-40 transform-gpu"
      >
        <div className="flex justify-between items-start w-full">
            <div className={`flex flex-col transition-all duration-500 ${isSearchOpen ? 'opacity-0 scale-95 translate-x-[-20px] pointer-events-none' : 'opacity-100 scale-100'}`}>
                <div className="mb-0.5">
                    <div className="text-2xl font-bold text-[#1a1a1a] tracking-normal leading-none font-sans">旅の禪</div>
                    <h1 className="text-[8px] font-medium tracking-widest uppercase text-stone-400 mt-1 ml-0.5">ZEN TRAVEL</h1>
                </div>
                {!isSearchOpen && (
                  <input 
                      type="text"
                      value={tripName}
                      onChange={(e) => setTripName(e.target.value)}
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
              className="text-stone-400 text-xs font-bold hover:text-zen-text px-1"
            >
              取消
            </button>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="px-5 pb-32">
        {renderContent()}
      </main>

      {/* Floating Search Button */}
      <button 
        ref={searchBtnRef}
        onClick={handleToggleSearch}
        className={`fixed bottom-28 right-6 w-14 h-14 backdrop-blur-sm border border-white/20 rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.12)] active:scale-95 transition-all duration-500 z-50 flex items-center justify-center group ${isSearchOpen ? 'bg-zen-primary/60 text-white shadow-zen-primary/20' : 'bg-white/10 text-zen-primary'}`}
        aria-label="Toggle Search"
      >
        <i className={`fa-solid ${isSearchOpen ? 'fa-xmark' : 'fa-magnifying-glass'} text-xl group-hover:scale-110 transition-transform`}></i>
      </button>

      {/* Floating Bottom Navigation */}
      <nav className="fixed bottom-8 left-12 right-12 bg-white/10 backdrop-blur-3xl rounded-[32px] p-1 z-50 max-w-[calc(448px-6rem)] mx-auto shadow-[0_25px_50px_rgba(0,0,0,0.08)] border border-white/20">
        <div className="relative flex items-center h-12">
          
          <div 
            className="absolute h-10 bg-zen-primary/80 rounded-[26px] transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) shadow-md"
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
                className={`relative flex-1 flex items-center justify-center gap-2 h-full transition-all duration-500 z-10 ${isActive ? 'text-white' : 'text-stone-400 hover:text-stone-600'}`}
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