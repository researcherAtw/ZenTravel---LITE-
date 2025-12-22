
import React, { useState, useEffect, useRef } from 'react';
import { NAV_ITEMS } from './constants';
import { TabType } from './types';
import { ScheduleTab, BookingsTab } from './components/Modules';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('schedule');
  const [tripName, setTripName] = useState('日本大阪7天6夜');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const headerRef = useRef<HTMLElement>(null);
  const searchBtnRef = useRef<HTMLButtonElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastScrollPos = useRef<number>(0);

  /**
   * 搜尋結果置頂優化：
   * 當使用者輸入搜尋文字時，畫面立即捲動至最上方，確保從搜尋結果的第一筆開始瀏覽。
   * 使用 'auto' 確保切換瞬間到位，避免平滑捲動帶來的延遲感。
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
  }, [activeTab]);

  /**
   * 處理關閉搜尋：
   * 1. 關閉搜尋模式並清空關鍵字。
   * 2. 恢復到進入搜尋前的捲動位置，確保瀏覽連續性。
   */
  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchTerm('');
    
    // 透過延遲確保內容已渲染回原始狀態（例如日期選擇器已出現）後再恢復捲動位置
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
   * 點擊搜尋按鈕：
   * 開啟時記錄當前捲動座標，關閉時執行恢復邏輯。
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
          // 若搜尋框為空，點擊外部即視為取消搜尋
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
    switch (activeTab) {
      case 'schedule': return <ScheduleTab searchTerm={currentSearch} />;
      case 'bookings': return <BookingsTab searchTerm={currentSearch} />;
      default: return <ScheduleTab searchTerm={currentSearch} />;
    }
  };

  const activeIndex = NAV_ITEMS.findIndex(item => item.id === activeTab);

  return (
    <div 
      ref={scrollContainerRef}
      className="h-screen text-zen-text font-sans max-w-md mx-auto relative shadow-2xl bg-zen-bg overflow-y-auto overflow-x-hidden no-scrollbar"
    >
      
      {/* Header - Sticky with Search Integration */}
      <header 
        ref={headerRef}
        className="px-6 pt-10 pb-4 flex flex-col bg-zen-bg sticky top-0 z-40 transition-all duration-500"
      >
        <div className="flex justify-between items-start w-full">
            <div className={`flex flex-col transition-all duration-500 ${isSearchOpen ? 'opacity-0 scale-95 translate-x-[-20px] pointer-events-none' : 'opacity-100 scale-100'}`}>
                <div className="mb-1">
                    <div className="text-2xl font-bold text-[#1a1a1a] tracking-normal leading-none font-sans">旅の禪</div>
                    <h1 className="text-[8px] font-medium tracking-widest uppercase text-stone-400 mt-1 ml-0.5">ZEN TRAVEL</h1>
                </div>
                {!isSearchOpen && (
                  <input 
                      type="text"
                      value={tripName}
                      onChange={(e) => setTripName(e.target.value)}
                      className="bg-transparent text-sm font-bold text-zen-primary placeholder-zen-primary/50 focus:outline-none border-b border-transparent focus:border-zen-primary transition-all w-48 mt-1"
                      placeholder="Name your trip..."
                  />
                )}
            </div>

            {/* User Avatar */}
            <div className={`pt-1 transition-all duration-500 ${isSearchOpen ? 'opacity-0 scale-95' : 'opacity-100'}`}>
                <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden bg-stone-200">
                    <img className="w-full h-full object-cover" src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix" alt="User" />
                </div>
            </div>
        </div>

        {/* Search Input Bar */}
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
