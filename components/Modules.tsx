import React, { useState, useEffect, useRef, useMemo, useLayoutEffect, useCallback } from 'react';
import { Card, Button, CategoryBadge } from './UI';
import { ScheduleItem, Booking, HighlightColor, WeatherInfo } from '../types';

// --- TYPES & INTERFACES ---

export type FilterType = 'all' | 'flight' | 'hotel' | 'transfer' | 'activity';

interface BookingsTabProps {
  searchTerm?: string;
  bookings: Booking[];
}

interface ScheduleTabProps {
  searchTerm?: string;
  items: ScheduleItem[];
  onUpdateItems: (newItems: ScheduleItem[]) => void;
}

// --- HELPERS ---

const escapeRegExp = (string: string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

/**
 * 支援關鍵字高亮與 Markdown 粗體 (**text**) 渲染的文字組件
 */
const HighlightText = React.memo(({ text, highlight }: { text: string; highlight: string }) => {
  const renderBold = (str: string) => {
    if (!str.includes('**')) return str;
    const boldRegex = /\*\*(.*?)\*\*/g;
    const parts = str.split(boldRegex);
    return parts.map((part, i) => 
      i % 2 === 1 ? (
        <b key={i} className="font-black text-zen-text underline decoration-zen-primary/30 decoration-2 underline-offset-4">
          {part}
        </b>
      ) : (
        part
      )
    );
  };

  if (!highlight || !highlight.trim()) return <>{renderBold(text)}</>;
  
  const escapedHighlight = escapeRegExp(highlight);
  const regex = new RegExp(`(${escapedHighlight})`, 'gi');
  const parts = text.split(regex);
  
  return (
    <>
      {parts.map((part, i) => 
        regex.test(part) ? (
          <mark 
            key={i} 
            className="bg-yellow-400 text-stone-900 px-0.5 mx-px rounded-sm font-bold shadow-sm inline-block animate-fade-in"
          >
            {part}
          </mark>
        ) : (
          renderBold(part)
        )
      )}
    </>
  );
});

const getCategoryIcon = (category: string): string => {
  const cat = category.toLowerCase();
  if (cat.includes('transport') || cat.includes('起飛') || cat.includes('降落')) return 'fa-plane-departure';
  if (cat.includes('購物') || cat.includes('買')) return 'fa-bag-shopping';
  if (cat.includes('餐') || cat.includes('下午茶') || cat.includes('點心') || cat.includes('咖啡')) return 'fa-utensils';
  if (cat.includes('景點') || cat.includes('拍照')) return 'fa-camera-retro';
  if (cat.includes('設施') || cat.includes('遊樂')) return 'fa-mountain-sun';
  if (cat.includes('express')) return 'fa-bolt-lightning';
  if (cat.includes('check')) return 'fa-key';
  if (cat.includes('逛街')) return 'fa-person-walking';
  if (cat.includes('提貨')) return 'fa-box-open';
  return 'fa-location-dot';
};

const NODE_STYLES: Record<string, string> = {
  red: 'border-red-400',
  orange: 'border-orange-400',
  green: 'border-green-600',
  blue: 'border-blue-400',
  purple: 'border-purple-400',
  gray: 'border-stone-400'
};

// --- SCHEDULE TAB ---

export const ScheduleTab: React.FC<ScheduleTabProps> = ({ searchTerm = '', items, onUpdateItems }) => {
  const dates = useMemo(() => Array.from(new Set(items.map(i => i.date))).sort() as string[], [items]);
  const [selectedDate, setSelectedDate] = useState(dates[0] || '2026-01-04');
  const [weather, setWeather] = useState<WeatherInfo>({ condition: 'sunny', temp: 12, locationName: '日本大阪' });
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  const touchStartPos = useRef<number | null>(null);
  const dateRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const currentIndex = dates.indexOf(selectedDate);

  useEffect(() => {
    const locationName = selectedDate === '2026-01-08' ? '日本京都' : '日本大阪';
    setWeather({ 
      locationName,
      temp: 12 + Math.floor(Math.random() * 2) - 1,
      condition: Math.random() > 0.8 ? 'cloudy' : 'sunny'
    });
  }, [selectedDate]);

  useEffect(() => {
    const activeBtn = dateRefs.current.get(selectedDate);
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'center' });
    }
  }, [selectedDate]);

  useEffect(() => {
    setExpandedId(null);
  }, [selectedDate]);

  const toggleComplete = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateItems(items.map(item => item.id === id ? { ...item, isCompleted: !item.isCompleted } : item));
  }, [items, onUpdateItems]);

  const toggleCheckListItem = useCallback((itemId: string, checkId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateItems(items.map(item => {
      if (item.id === itemId && item.checkList) {
        return {
          ...item,
          checkList: item.checkList.map(ci => ci.id === checkId ? { ...ci, isCompleted: !ci.isCompleted } : ci)
        };
      }
      return item;
    }));
  }, [items, onUpdateItems]);

  const handleDateChange = useCallback((newDate: string) => {
    if (newDate === selectedDate) return;
    const newIndex = dates.indexOf(newDate);
    setSlideDirection(newIndex > currentIndex ? 'right' : 'left');
    setSelectedDate(newDate);
  }, [selectedDate, currentIndex, dates]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartPos.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartPos.current === null) return;
    const touchEndPos = e.changedTouches[0].clientX;
    const distance = touchStartPos.current - touchEndPos;
    const minDistance = 50;

    if (Math.abs(distance) > minDistance) {
      if (distance > 0 && currentIndex < dates.length - 1) {
        handleDateChange(dates[currentIndex + 1]);
      } else if (distance < 0 && currentIndex > 0) {
        handleDateChange(dates[currentIndex - 1]);
      }
    }
    touchStartPos.current = null;
  };

  const filteredItems = useMemo(() => items.filter(i => {
    const matchDate = i.date === selectedDate;
    if (!searchTerm) return matchDate;

    const term = searchTerm.toLowerCase();
    return (
      i.title.toLowerCase().includes(term) || 
      i.location.toLowerCase().includes(term) || 
      i.category.toLowerCase().includes(term) ||
      i.description?.toLowerCase().includes(term) ||
      i.businessHours?.toLowerCase().includes(term) ||
      i.displayTime?.toLowerCase().includes(term) ||
      i.checkList?.some(cl => cl.text.toLowerCase().includes(term))
    );
  }), [items, selectedDate, searchTerm]);

  const handleNavigate = useCallback((item: ScheduleItem) => {
    const url = item.mapUrl || `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(item.location)}`;
    window.open(url, '_blank');
  }, []);

  const handleCardClick = useCallback((id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  }, []);

  return (
    <div className="pb-20">
      {!searchTerm && (
        <div className="sticky top-[108px] z-30 -mx-5 px-5 bg-zen-bg pt-2 pb-2 transform-gpu">
          <div className="relative overflow-x-auto no-scrollbar py-2 snap-x items-center">
            <div className="flex gap-[6px] min-w-max relative px-1">
              <div 
                className="absolute h-[78px] w-[58px] rounded-[24px] bg-[#464646] transition-transform duration-200 pointer-events-none z-0"
                style={{ 
                  left: '4px', 
                  transform: `translateX(${currentIndex * 64}px)`,
                }}
              />
              
              {dates.map((date) => {
                const d = new Date(date);
                const dayName = d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
                const dayNum = d.getDate();
                const isSelected = date === selectedDate;
                return (
                  <button
                    key={date}
                    ref={(el) => { if (el) dateRefs.current.set(date, el); }}
                    onClick={() => handleDateChange(date)}
                    className={`snap-center flex-shrink-0 flex flex-col items-center justify-center w-[58px] h-[78px] rounded-[24px] transition-all duration-200 relative z-10 ${
                      isSelected ? 'text-white' : 'bg-white text-stone-400'
                    }`}
                  >
                    <span className="text-[10px] font-black tracking-widest mb-1 font-sans">{dayName}</span>
                    <span className="text-[24px] font-bold font-mono leading-none">{dayNum}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between items-end px-1 mt-10 mb-2">
            <div className="relative">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 font-sans">Day Plan</div>
              <h2 className="text-3xl font-mono font-bold text-zen-text leading-tight">{selectedDate}</h2>
              <div className="flex items-center gap-2 mt-1 text-gray-500 text-sm">
                <i className="fa-solid fa-location-dot text-zen-primary"></i> 
                <span className="font-bold">{weather.locationName}</span>
              </div>
            </div>
            <div className="bg-white/80 border border-white p-2 px-3 rounded-2xl flex flex-col items-center min-w-[70px]">
              <div className="text-xl mb-0.5">
                {weather.condition === 'sunny' && <i className="fa-solid fa-sun text-orange-400 animate-spin-slow"></i>}
                {weather.condition === 'cloudy' && <i className="fa-solid fa-cloud text-gray-400"></i>}
                {weather.condition === 'rain' && <i className="fa-solid fa-cloud-rain text-blue-400"></i>}
                {weather.condition === 'snow' && <i className="fa-regular fa-snowflake text-blue-200"></i>}
              </div>
              <div className="text-xs font-black font-mono">{weather.temp}°C</div>
            </div>
          </div>
        </div>
      )}

      <div 
        className={`relative pl-0 pr-1 mt-4 transition-all duration-200 ${searchTerm ? 'pt-4' : ''}`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {searchTerm && (
          <div className="mb-6 px-1">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 font-sans">搜尋結果</div>
            <div className="text-sm font-bold text-zen-text">找到了 {filteredItems.length} 個符合的行程</div>
          </div>
        )}

        <div 
          key={searchTerm || selectedDate}
          className={`will-change-transform ${!searchTerm && slideDirection === 'right' ? 'animate-slide-in-right' : ''} ${!searchTerm && slideDirection === 'left' ? 'animate-slide-in-left' : ''} ${searchTerm || !slideDirection ? 'animate-fade-in' : ''}`}
        >
          {filteredItems.map((item) => {
            // 嚴格過濾時間顯示邏輯：僅當 displayTime 存在且不為空字串時顯示
            const showTime = item.displayTime && item.displayTime !== "";
            const timeLines = showTime ? item.displayTime!.split('\n') : [];
            
            const catIcon = getCategoryIcon(item.category);
            const isExpanded = expandedId === item.id;
            const hasChecklist = item.checkList && item.checkList.length > 0;

            return (
              <div key={item.id} className="relative mb-0 group flex gap-0 [content-visibility:auto] -ml-5">
                {/* 時間欄位：寬度適中，縮小主副時間落差，文字更貼近時間軸 */}
                <div className="w-14 py-4 flex flex-col items-end justify-start flex-shrink-0 pr-1.5">
                  <div className="flex flex-col items-end gap-0.5">
                    {timeLines.map((time, idx) => (
                      <span 
                        key={idx} 
                        className={`font-mono font-bold text-right leading-tight transition-all whitespace-nowrap ${
                          idx === 0 ? 'text-[12px]' : 'text-[10px] opacity-80 mt-0.5'
                        } ${item.isCompleted ? 'text-gray-300' : 'text-zen-text/70'}`}
                      >
                        {time}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative flex flex-col items-center px-0 flex-shrink-0 w-3">
                  <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1.5px] bg-stone-200"></div>
                  <div 
                    onClick={(e) => toggleComplete(item.id, e)}
                    className={`relative z-10 w-2.5 h-2.5 rounded-full border-2 bg-zen-bg transition-all duration-200 mt-[1.35rem] cursor-pointer hover:scale-150 ${item.isCompleted ? 'border-stone-300 bg-stone-300' : NODE_STYLES[item.categoryColor || 'gray'] || 'border-stone-400'}`}
                  >
                    {item.isCompleted && <i className="fa-solid fa-check text-white text-[5px] absolute inset-0 flex items-center justify-center"></i>}
                  </div>
                </div>

                <div className="flex-grow min-w-0 py-4 pb-6 pl-3 overflow-visible">
                  <div 
                    onClick={() => handleCardClick(item.id)}
                    className={`bg-white rounded-2xl p-4 shadow-zen border border-stone-50 transition-all duration-300 ease-out relative group cursor-pointer active:scale-[0.98] active:shadow-zen-sm ${item.isCompleted ? 'opacity-60 grayscale-[50%]' : ''} ${isExpanded ? 'ring-2 ring-zen-primary/30 shadow-zen-hover !border-zen-primary/20' : ''}`}
                  >
                    <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                      <i className={`fa-solid ${catIcon} absolute -bottom-4 -right-2 text-[60px] text-stone-50/50 transform -rotate-12 transition-transform duration-500 ${isExpanded ? 'scale-125 rotate-0 opacity-80' : 'group-hover:scale-110 group-hover:rotate-0'}`}></i>
                    </div>

                    <div className="absolute top-1.5 right-1.5 z-20 flex flex-col gap-1 items-end pointer-events-none">
                      {item.isKlook && <div className="bg-[#FF5E00] text-white text-[7px] font-black px-1.5 py-0.5 rounded shadow-sm border border-white/30 whitespace-nowrap transform rotate-3">KLOOK</div>}
                      {item.isTabelog && <div className="bg-[#FF6B00] text-white text-[7px] font-black px-1.5 py-0.5 rounded shadow-sm border border-white/30 whitespace-nowrap transform rotate-3">Tabélog</div>}
                      {item.isGoogle && <div className="bg-[#4285F4] text-white text-[7px] font-black px-1.5 py-0.5 rounded shadow-sm border border-white/30 whitespace-nowrap transform rotate-3">Google</div>}
                      {item.isTablecheck && <div className="bg-[#312E81] text-white text-[7px] font-black px-1.5 py-0.5 rounded shadow-sm border border-white/30 whitespace-nowrap transform rotate-3">Tablecheck</div>}
                    </div>
                    
                    <div className="mb-3 pr-10 relative z-10">
                      <div className="flex items-center gap-2 mb-1">
                        <i className={`fa-solid ${catIcon} text-[10px] text-stone-300`}></i>
                        <div className="flex-1 flex items-center gap-2 overflow-hidden">
                          <h3 className={`font-bold text-lg leading-tight transition-all duration-300 ${item.isCompleted ? 'text-stone-400 line-through' : 'text-zen-text'} ${isExpanded ? 'text-zen-primary' : ''}`}>
                            <HighlightText text={item.title} highlight={searchTerm} />
                          </h3>
                          {hasChecklist && (
                            <i className={`fa-solid fa-chevron-down text-[10px] text-stone-300 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-zen-primary' : ''}`}></i>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <CategoryBadge type={item.category} color={item.categoryColor} icon={catIcon} />
                        {item.businessHours && (
                          <div className="flex items-center gap-1.5 text-[9px] font-mono font-black text-stone-400 bg-stone-50 px-2 py-0.5 rounded-md border border-stone-100/50">
                            <i className="fa-regular fa-clock text-[8px]"></i>
                            <HighlightText text={item.businessHours} highlight={searchTerm} />
                          </div>
                        )}
                      </div>
                    </div>

                    {item.description && (
                      <div className="mb-4 p-3 bg-stone-50/80 rounded-xl border border-stone-100/50 relative z-10">
                        <p className="text-[11px] leading-relaxed text-stone-500 font-medium whitespace-pre-line">
                          <HighlightText text={item.description} highlight={searchTerm} />
                        </p>
                      </div>
                    )}

                    <div className={`grid transition-all duration-300 ease-in-out relative z-10 ${isExpanded && hasChecklist ? 'grid-rows-[1fr] opacity-100 mb-4' : 'grid-rows-[0fr] opacity-0 mb-0'}`}>
                      <div className="overflow-hidden">
                        <div className="h-px bg-stone-100 w-full my-3"></div>
                        <div className="space-y-2">
                          {item.checkList?.map(ci => (
                            <div 
                              key={ci.id} 
                              onClick={(e) => toggleCheckListItem(item.id, ci.id, e)}
                              className="flex items-center gap-3 p-2.5 bg-stone-50/50 rounded-xl border border-stone-100/50 transition-all hover:bg-stone-100/50 active:scale-95"
                            >
                              <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${ci.isCompleted ? 'bg-zen-primary border-zen-primary' : 'bg-white border-stone-200'}`}>
                                {ci.isCompleted && <i className="fa-solid fa-check text-white text-[10px]"></i>}
                              </div>
                              <span className={`text-[11px] font-bold leading-tight flex-1 ${ci.isCompleted ? 'text-stone-300 line-through' : 'text-stone-600'}`}>
                                <HighlightText text={ci.text} highlight={searchTerm} />
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-end gap-2 mt-auto relative z-10">
                      <div className="flex-grow min-w-0">
                        <div className="text-[11px] text-stone-400 flex items-center gap-1.5 py-1 px-1 mt-1 bg-stone-50/40 rounded-lg">
                          <i className="fa-solid fa-map-pin text-[10px] text-stone-300 flex-shrink-0"></i> 
                          <span className="truncate font-medium">
                            <HighlightText text={item.location} highlight={searchTerm} />
                          </span>
                        </div>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); handleNavigate(item); }} className="flex-shrink-0 w-10 h-10 rounded-xl bg-white border border-stone-200 text-zen-text flex flex-col items-center justify-center hover:bg-zen-primary hover:text-white transition-all shadow-sm active:scale-90">
                        <i className="fa-solid fa-diamond-turn-right text-sm"></i>
                        <span className="text-[7px] font-bold mt-0.5 uppercase tracking-tighter">GO</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredItems.length === 0 && (
            <div className="text-center py-20 text-stone-300 opacity-60 animate-fade-in">
              <i className="fa-regular fa-calendar-plus text-5xl mb-4"></i>
              <p className="text-sm font-bold">找不到符合關鍵字的行程。</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- BOOKINGS TAB ---

export const BookingsTab: React.FC<BookingsTabProps> = ({ searchTerm = '', bookings }) => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const filterRefs = useRef<{[key: string]: HTMLButtonElement | null}>({});

  const filterOptions: FilterType[] = ['all', 'flight', 'hotel', 'transfer', 'activity'];

  useLayoutEffect(() => {
    const el = filterRefs.current[filter];
    if (el) {
      setIndicatorStyle({
        left: el.offsetLeft,
        width: el.offsetWidth
      });
    }
  }, [filter]);

  const getIcon = (type: string) => {
    switch(type) {
      case 'flight': return 'fa-plane-up';
      case 'hotel': return 'fa-hotel';
      case 'activity': return 'fa-ticket';
      case 'transfer': return 'fa-van-shuttle';
      default: return 'fa-receipt';
    }
  };

  const filteredBookings = useMemo(() => bookings.filter(b => {
    const matchType = filter === 'all' || b.type === filter;
    if (!searchTerm) return matchType;
    const term = searchTerm.toLowerCase();
    return matchType && (
      b.title.toLowerCase().includes(term) || 
      b.subTitle?.toLowerCase().includes(term) ||
      b.referenceNo.toLowerCase().includes(term)
    );
  }), [bookings, filter, searchTerm]);

  return (
    <div className="pb-20">
      <div className="sticky top-[108px] z-30 -mx-5 px-5 bg-zen-bg pt-2 pb-5 transform-gpu">
        <div className="flex justify-between items-center mb-5 px-1">
          <h2 className="text-3xl font-mono font-bold text-zen-text leading-tight font-sans">Wallet</h2>
          <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-zen-primary border border-white">
            <i className="fa-solid fa-wallet text-lg"></i>
          </div>
        </div>
        
        <div className="relative overflow-x-auto no-scrollbar pb-1 px-1">
          <div className="flex gap-2 min-w-max relative">
            <div 
              className="absolute h-full rounded-2xl bg-[#464646] transition-all duration-200 pointer-events-none z-0"
              style={{ 
                left: indicatorStyle.left, 
                width: indicatorStyle.width,
                top: 0
              }}
            />

            {filterOptions.map(f => (
              <button 
                key={f} 
                ref={(el) => { filterRefs.current[f] = el; }}
                onClick={() => setFilter(f)} 
                className={`relative z-10 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-colors duration-200 whitespace-nowrap border font-sans ${
                  filter === f 
                  ? 'text-white border-transparent' 
                  : 'bg-white text-stone-400 border-stone-100 hover:border-stone-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6 px-1 mt-6">
        {filteredBookings.map(booking => (
          <div key={booking.id} className="relative group animate-fade-in [content-visibility:auto]">
            {booking.type === 'flight' ? (
              <div className="bg-white rounded-[2rem] shadow-zen border border-stone-50 group-hover:shadow-zen-hover transition-all duration-500 overflow-visible relative flex items-stretch">
                <div className="flex-grow p-6 flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-stone-50 flex items-center justify-center border border-stone-100 shadow-inner">
                        <i className="fa-solid fa-plane-up text-zen-primary text-sm"></i>
                      </div>
                      <div>
                        <div className="text-[9px] font-black font-mono text-stone-300 uppercase leading-none mb-1">Carrier</div>
                        <div className="font-black text-[13px] tracking-wide text-zen-text">
                          <HighlightText text={booking.subTitle || ''} highlight={searchTerm} />
                        </div>
                      </div>
                    </div>
                    <div className="bg-stone-50 px-3 py-1 rounded-xl border border-stone-100">
                      <span className="text-[10px] font-black font-mono text-zen-primary uppercase tracking-widest">{booking.referenceNo}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center my-6 relative">
                    <div className="flex flex-col">
                      <div className="text-3xl font-mono font-black text-zen-text leading-tight mb-1">
                        <HighlightText text={booking.title.split(' - ')[0]} highlight={searchTerm} />
                      </div>
                      <div className="text-[20px] font-mono font-black text-zen-primary leading-tight">
                        <HighlightText text={booking.time || ''} highlight={searchTerm} />
                      </div>
                      <div className="text-[9px] font-bold text-stone-300 mt-2 uppercase tracking-tighter">Taiwan Taoyuan</div>
                    </div>
                    
                    <div className="flex-1 flex flex-col items-center justify-center px-4">
                      <div className="w-full h-px bg-stone-100 relative mb-4">
                        <i className="fa-solid fa-plane absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-zen-primary/40 text-xs"></i>
                      </div>
                      <div className="bg-stone-50 px-2 py-0.5 rounded text-[14px] font-black text-stone-400 font-mono tracking-widest whitespace-nowrap">{booking.details['飛行時間']}</div>
                    </div>

                    <div className="flex flex-col items-end text-right">
                      <div className="text-3xl font-mono font-black text-zen-text leading-tight mb-1">
                        <HighlightText text={booking.title.split(' - ')[1]} highlight={searchTerm} />
                      </div>
                      <div className="text-[20px] font-mono font-black text-stone-500 leading-tight">
                        <HighlightText text={booking.details['抵達'] || ''} highlight={searchTerm} />
                      </div>
                      <div className="text-[9px] font-bold text-stone-300 mt-2 uppercase tracking-tighter">Kansai Int'l</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 mt-auto pt-6 border-t border-dashed border-stone-100">
                    <div>
                      <div className="text-[8px] text-stone-300 uppercase font-black tracking-widest mb-1 font-sans">Boarding</div>
                      <div className="font-black text-zen-text text-[11px] font-mono leading-none">
                        <HighlightText text={booking.details['登機'] || '--:--'} highlight={searchTerm} />
                      </div>
                    </div>
                    <div>
                      <div className="text-[8px] text-stone-300 uppercase font-black tracking-widest mb-1 font-sans">Gate</div>
                      <div className="font-black text-zen-text text-[11px] font-mono leading-none flex items-center gap-1">
                        <i className="fa-solid fa-door-open text-[8px] text-zen-primary/40"></i>
                        <HighlightText text={booking.details['登機門'] || '--'} highlight={searchTerm} />
                      </div>
                    </div>
                    <div>
                      <div className="text-[8px] text-stone-300 uppercase font-black tracking-widest mb-1 font-sans">Seat</div>
                      <div className="font-black text-zen-text text-[11px] font-mono leading-none flex items-center gap-1">
                        <i className="fa-solid fa-chair text-[8px] text-zen-primary/40"></i>
                        <HighlightText text={booking.details['座位'] || '--'} highlight={searchTerm} />
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[8px] text-stone-300 uppercase font-black tracking-widest mb-1 font-sans">Baggage</div>
                      <div className="font-black text-zen-text text-[11px] font-mono leading-none flex items-center justify-end gap-1">
                        <i className="fa-solid fa-suitcase-rolling text-[8px] text-zen-primary/40"></i>
                        <HighlightText text={booking.details['行李']?.split(' × ')[0] || '--'} highlight={searchTerm} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-[2px] relative flex flex-col items-center justify-between">
                  <div className="absolute top-0 -translate-y-1/2 w-5 h-5 bg-zen-bg rounded-full border border-stone-100 z-10 -ml-0.5 shadow-inner"></div>
                  <div className="h-full border-l-2 border-dashed border-stone-100 my-4"></div>
                  <div className="absolute bottom-0 translate-y-1/2 w-5 h-5 bg-zen-bg rounded-full border border-stone-100 z-10 -ml-0.5 shadow-inner"></div>
                </div>

                <div className="w-24 bg-stone-50/20 rounded-r-[2rem] flex flex-col items-center justify-between p-4 border-l border-stone-50">
                  <div className="flex flex-col items-center mt-6">
                    <div className="text-[10px] font-black text-stone-200 uppercase tracking-widest font-mono transform -rotate-90 origin-center whitespace-nowrap mb-12">ZEN BOARDING</div>
                  </div>
                  <div className="w-14 h-14 bg-stone-100 rounded-xl border border-stone-200 p-2 grid grid-cols-4 gap-0.5 opacity-30 shadow-inner">
                    {Array.from({length: 16}).map((_, i) => (
                      <div key={i} className={`rounded-[1px] ${Math.random() > 0.4 ? 'bg-stone-600' : 'bg-transparent'}`}></div>
                    ))}
                  </div>
                  <div className="mt-4 mb-2">
                    <div className="text-[14px] font-black font-mono text-zen-primary tracking-tighter text-center">
                      {booking.details['座位']}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-zen p-5 border border-stone-50 flex gap-5 items-stretch group-hover:shadow-zen-hover transition-all duration-300">
                <div className={`w-14 rounded-2xl flex items-center justify-center text-white text-2xl shadow-inner ${booking.type === 'hotel' ? 'bg-purple-400' : 'bg-orange-400'}`}>
                  <i className={`fa-solid ${getIcon(booking.type)}`}></i>
                </div>
                <div className="flex-1 min-w-0 py-1">
                  <h3 className="font-bold text-lg text-zen-text leading-tight mb-1 truncate">
                    <HighlightText text={booking.title} highlight={searchTerm} />
                  </h3>
                  {booking.subTitle && <div className="text-xs font-bold text-stone-400 mb-4 tracking-tight">
                    <HighlightText text={booking.subTitle} highlight={searchTerm} />
                  </div>}
                  <div className="grid grid-cols-1 gap-1.5">
                    {Object.entries(booking.details).map(([k, v]) => (
                      <div key={k} className="text-[11px] font-bold text-stone-500 flex items-center gap-2">
                        <span className="text-stone-300 uppercase tracking-tighter min-w-[60px] font-sans">{k}:</span> 
                        <span className="text-zen-text font-sans"><HighlightText text={v} highlight={searchTerm} /></span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};