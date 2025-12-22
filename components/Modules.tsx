import React, { useState, useEffect, useRef, useMemo, useLayoutEffect } from 'react';
import { Card, Button, CategoryBadge } from './UI';
import { ScheduleItem, Booking, HighlightTag, HighlightColor, WeatherInfo } from '../types';

// --- HELPERS ---

const escapeRegExp = (string: string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const HighlightText: React.FC<{ text: string; highlight: string }> = ({ text, highlight }) => {
  if (!highlight.trim()) return <>{text}</>;
  
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
          part
        )
      )}
    </>
  );
};

// Helper for category icons
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
  return 'fa-location-dot';
};

// --- MOCK DATA ---
const MOCK_SCHEDULE: ScheduleItem[] = [
  // --- 1/4 (Sun) D1 ---
  { 
      id: 'd1-1', date: '2026-01-04', time: '09:20', displayTime: '09:20',
      title: '起飛', location: 'TPE 桃園機場 (Terminal 1)', category: 'transport', categoryColor: 'red',
      isCompleted: false 
  },
  { 
      id: 'd1-2', date: '2026-01-04', time: '12:50', displayTime: '12:50',
      title: '降落', location: 'KIX 關西機場', category: 'transport', categoryColor: 'red',
      isCompleted: false 
  },
  { 
      id: 'd1-3', date: '2026-01-04', time: '13:00', title: 'Dior 心斎橋', 
      location: '大阪 (心斎橋)', category: '購物', categoryColor: 'orange',
      businessHours: '11:00 - 20:00', isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/n9RXpreTK4BmtSKX7'
  },
  { 
      id: 'd1-4', date: '2026-01-04', time: '13:00', title: '大阪高島屋店', 
      location: '大阪 (難波)', category: '購物', categoryColor: 'orange',
      description: '1F SUQQU | 2F Dior | 3-4F Polo',
      businessHours: '10:00 - 20:00', isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/jv8vH9DvuRvfqx1U8'
  },
  { 
      id: 'd1-5', date: '2026-01-04', time: '13:00', title: '大丸心齋橋店 本館', 
      location: '大阪 (心斎橋)', category: '購物', categoryColor: 'orange',
      description: '1F SUQQU | 3F Celine | 9F pokemon center',
      businessHours: '10:00 - 20:00', isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/BCqeSZqrh5uiRvoy9'
  },
  { 
      id: 'd1-6', date: '2026-01-04', time: '13:00', title: 'Loewe 大丸梅田店', 
      location: '大阪 (梅田)', category: '購物', categoryColor: 'orange',
      description: '3F LOEWE男子',
      businessHours: '10:00 - 20:00', isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/fQjzaNz4cygtSEmSA'
  },
  { 
      id: 'd1-7', date: '2026-01-04', time: '13:00', title: 'Loewe 阪急男士大阪店', 
      location: '大阪 (梅田)', category: '購物', categoryColor: 'orange',
      description: '2F LOEWE男子',
      businessHours: '10:00 - 20:00', isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/oNoJb8b498ZQfhGbA'
  },
  { 
      id: 'd1-8', date: '2026-01-04', time: '13:00', title: 'Tables Cafe', 
      location: '大阪 (堀江)', category: '下午茶', categoryColor: 'blue',
      description: '草莓蛋糕',
      businessHours: '11:00 - 20:00', isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/xvZvhNF7KLUSNVAz7'
  },
  { 
      id: 'd1-9', date: '2026-01-04', time: '13:00', title: 'BicCamera 難波店', 
      location: '大阪 (難波)', category: '購物', categoryColor: 'orange',
      description: 'Sony 相機鏡頭',
      businessHours: '10:00 - 21:00', isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/2QzAfgJhk68BKUBt7'
  },
  { 
      id: 'd1-10', date: '2026-01-04', time: '15:00', displayTime: '15:00',
      title: 'Check In', location: '大阪難波東急STAY美居酒店', category: 'Check In', categoryColor: 'red',
      isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/N7ytR6Au52tiZJJ49'
  },
  { 
      id: 'd1-11', date: '2026-01-04', time: '16:00', title: '逛街', 
      location: '心斎橋', category: '逛街', categoryColor: 'purple',
      isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/Etpv8i3X6dN1ArEe8'
  },
  { 
      id: 'd1-12', date: '2026-01-04', time: '18:00', title: '麥×鷄', 
      location: '大阪 (心斎橋)', category: '晚餐', categoryColor: 'green',
      description: '雞白湯拉麵',
      businessHours: '18:00 - 22:00', isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/3x5qTHVEmY1XCb4f9'
  },

  // --- 1/5 (Mon) D2 ---
  { 
      id: 'd2-1', date: '2026-01-05', time: '09:00', title: 'COLONY by EQI', 
      location: '大阪 (西心斎橋)', category: '早午餐', categoryColor: 'green',
      description: '鬆餅',
      businessHours: '11:00 - 23:00',
      isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/Lfg2wRUuyf1fDih46'
  },
  { 
      id: 'd2-2', date: '2026-01-05', time: '09:30', title: 'MAZE CAFE', 
      location: '大阪 (西心斎橋)', category: '早午餐', categoryColor: 'green',
      businessHours: '08:00 - 16:00',
      isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/MQyHYzPZ8BCgt4PK7'
  },
  { 
      id: 'd2-3', date: '2026-01-05', time: '10:30', title: '3COINS+plus', 
      location: '大阪 (心斎橋)', category: '購物', categoryColor: 'orange',
      businessHours: '11:00 - 21:00',
      isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/fR5yQ1eUrYacsSmc6'
  },
  { 
      id: 'd2-4', date: '2026-01-05', time: '11:00', title: '3COINS', 
      location: '大阪 (難波/心斎橋)', category: '購物', categoryColor: 'orange',
      businessHours: '11:00 - 21:00',
      isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/xr7GvpuohiGVhw7K8'
  },
  { 
      id: 'd2-5', date: '2026-01-05', time: '11:30', title: '靴下屋', 
      location: '大阪', category: '購物', categoryColor: 'orange',
      businessHours: '11:00 - 21:00',
      isCompleted: false,
      mapUrl: 'https://www.google.com/maps'
  },
  { 
      id: 'd2-6', date: '2026-01-05', time: '12:30', title: 'Uniqlo', 
      location: '大阪', category: '購物', categoryColor: 'orange',
      description: '防寒衣物、花花發熱長袖',
      isCompleted: false,
      mapUrl: 'https://www.google.com/maps'
  },
  { 
      id: 'd2-7', date: '2026-01-05', time: '14:00', title: '淺草茶屋たばねのし', 
      location: '大阪 (難波)', category: '下午茶', categoryColor: 'blue',
      description: '可麗餅、抹茶拿鐵',
      businessHours: '11:30 - 21:00',
      isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/1Rx3JmBJCNg7nvrz5'
  },
  { 
      id: 'd2-8', date: '2026-01-05', time: '16:00', title: 'あべのソ拉哈', 
      location: '大阪 (阿倍野)', category: '購物', categoryColor: 'orange',
      description: '3F Ungrid服飾店',
      businessHours: '10:00 - 21:30',
      isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/KmBGoBB2fNMsXQdd7'
  },
  { 
      id: 'd2-9', date: '2026-01-05', time: '18:00', displayTime: '18:00',
      title: '牛舌的檸檬 大阪本店', 
      location: '大阪 (心斎橋)', category: '晚餐', categoryColor: 'red',
      isCompleted: false, isGoogle: true,
      mapUrl: 'https://maps.app.goo.gl/XyLM17JrCuZr45mt8'
  },
  { 
      id: 'd2-10', date: '2026-01-05', time: '20:00', title: '唐吉軻德', 
      location: '大阪 (心斎橋)', category: '購物', categoryColor: 'orange',
      businessHours: '24H',
      isCompleted: false,
      mapUrl: 'https://www.google.com/maps'
  },
  { 
      id: 'd2-11', date: '2026-01-05', time: '21:00', title: '藥妝店', 
      location: '大阪', category: '購物', categoryColor: 'orange',
      description: '量車藥、感冒藥、過敏藥補貨',
      isCompleted: false,
      mapUrl: 'https://www.google.com/maps'
  },

  // --- 1/6 (Tue) D3 ---
  { 
      id: 'd3-1', date: '2026-01-06', time: '11:00', 
      title: 'Tart Square', location: '大阪 (堀江)', category: '早午餐', categoryColor: 'green',
      description: '和牛鹹塔/甜食塔',
      businessHours: '11:00 - 19:00', isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/iKP9MLJs7AbywHKQ8'
  },
  { 
      id: 'd3-2', date: '2026-01-06', time: '11:30', title: 'LiLo Coffee Roasters', 
      location: '大阪 (心斎橋)', category: '外帶咖啡', categoryColor: 'blue',
      description: '咖啡廳 | 現金Only',
      isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/kr7uR73TsLyrguqRA'
  },
  { 
      id: 'd3-3', date: '2026-01-06', time: '12:00', 
      title: 'エモジ', location: '大阪 (松屋町)', category: '購物', categoryColor: 'orange',
      description: '御朱印帳、集章冊',
      businessHours: '12:00 - 18:00', isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/MHT3xD2ZRB9dz8E46'
  },
  { 
      id: 'd3-4', date: '2026-01-06', time: '13:00', title: '難波八阪神社', 
      location: '大阪 (難波)', category: '景點', categoryColor: 'purple',
      businessHours: '06:30 - 17:00',
      isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/ZgiFUDhiTbZUhQvk8'
  },
  { 
      id: 'd3-5', date: '2026-01-06', time: '14:30', title: 'COLONY by EQI', 
      location: '心斎橋アメ村店', category: '下午茶', categoryColor: 'blue',
      description: '舒芙蕾',
      businessHours: '11:00 - 23:00',
      isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/eZc5Hi3E5zW9A4sX6'
  },
  { 
      id: 'd3-6', date: '2026-01-06', time: '16:00', title: '道頓堀大觀覽車', 
      location: '道頓堀', category: '景點', categoryColor: 'purple',
      description: '唐吉訶德摩天輪\n週二定期維修會延後至13:00開放',
      businessHours: '11:00 - 21:30',
      isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/XtcYSxdr8Cnjb1Ua9'
  },
  { 
      id: 'd3-7', date: '2026-01-06', time: '18:30', displayTime: '18:30',
      title: 'YAKINIKUEN 忍鬨', location: '日本橋店', category: '晚餐', categoryColor: 'red',
      description: '燒肉',
      isCompleted: false, isTabelog: true,
      mapUrl: 'https://maps.app.goo.gl/2DAibjATzeB2CVxWA'
  },
  { 
      id: 'd3-8', date: '2026-01-06', time: '20:00', title: '超商購買明日早餐', 
      location: '大阪', category: '一般', categoryColor: 'gray',
      isCompleted: false,
      mapUrl: 'https://www.google.com/maps'
  },

  // --- 1/7 (Wed) D4 ---
  { 
      id: 'd4-1', date: '2026-01-07', time: '08:00', title: '超商早餐', 
      location: '環球影城', category: '早餐', categoryColor: 'green',
      isCompleted: false, isKlook: false,
      mapUrl: 'https://www.google.com/maps'
  },
  { 
      id: 'd4-2', date: '2026-01-07', time: '09:00', title: '好萊塢美夢·乘車遊~逆轉世界~', 
      location: 'USJ', category: '設施', categoryColor: 'purple',
      isCompleted: false, isKlook: false, 
      mapUrl: 'https://maps.app.goo.gl/m6eZWZhHxoUsrnha8'
  },
  { 
      id: 'd4-3', date: '2026-01-07', time: '15:00', displayTime: '15:00\n16:00',
      title: '超級任天堂園區入場卷', location: 'USJ', category: 'Express', categoryColor: 'red',
      isCompleted: false, isKlook: true,
      mapUrl: 'https://maps.app.goo.gl/m6eZWZhHxoUsrnha8'
  },
  { 
      id: 'd4-4', date: '2026-01-07', time: '15:00', displayTime: '15:00\n15:30',
      title: '瑪利歐賽車：庫巴的挑戰賽', location: 'USJ', category: 'Express', categoryColor: 'red',
      isCompleted: false, isKlook: true,
      mapUrl: 'https://maps.app.goo.gl/m6eZWZhHxoUsrnha8'
  },
  { 
      id: 'd4-5', date: '2026-01-07', time: '15:30', displayTime: '15:30\n16:00',
      title: '咚奇剛的瘋狂礦車™', location: 'USJ', category: 'Express', categoryColor: 'red',
      isCompleted: false, isKlook: true,
      mapUrl: 'https://maps.app.goo.gl/m6eZWZhHxoUsrnha8'
  },
  { 
      id: 'd4-6', date: '2026-01-07', time: '18:00',
      title: '燃えよ麺助', location: '大阪 (福島)', category: '晚餐', categoryColor: 'green',
      description: '蔥鴨拉麵、金色貝拉麵',
      businessHours: '18:00 - 21:00', isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/qKVRK9EiqsuWwL5k7'
  },

  // --- 1/8 (Thu) D5 ---
  { 
      id: 'd5-1', date: '2026-01-08', time: '12:00', 
      title: 'ろじうさぎ (Roji Usagi)', location: '京都 (宮川町)', category: '早午餐', categoryColor: 'green',
      description: '日式料理',
      businessHours: '12:00 - 15:30', isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/uJkpfNgAksJ5cWeM7'
  },
  { 
      id: 'd5-2', date: '2026-01-08', time: '13:30', title: '湯葉チーズ本舗', 
      location: '京都 (嵐山)', category: '點心', categoryColor: 'blue',
      description: '炸豆皮起司',
      businessHours: '11:00 - 17:30',
      isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/Mgt5YJiAe2frMuYo6'
  },
  { 
      id: 'd5-3', date: '2026-01-08', time: '14:30', title: '天龍寺', 
      location: '京都 (嵐山)', category: '景點', categoryColor: 'purple',
      businessHours: '08:30 - 17:00',
      isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/AkXiyUDh8qDgMTGj8'
  },
  { 
      id: 'd5-4', date: '2026-01-08', time: '15:30', title: '嵯峨野竹林小徑', 
      location: '京都 (嵐山)', category: '景點', categoryColor: 'purple',
      isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/x83m24TFXFNjCe8y5'
  },
  { 
      id: 'd5-5', date: '2026-01-08', time: '15:30', title: '野宮神社', 
      location: '京都 (嵐山)', category: '景點', categoryColor: 'purple',
      isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/q7fRDitmuVnYtKbu8'
  },
  { 
      id: 'd5-6', date: '2026-01-08', time: '16:30', title: '常寂光寺', 
      location: '京都 (嵐山)', category: '景點', categoryColor: 'purple',
      isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/xiiuvrhTuuvVWmAD9'
  },
  { 
      id: 'd5-7', date: '2026-01-08', time: '19:00', displayTime: '19:00',
      title: '京都力山 京都站前店', location: '京都 (下京區)', category: '晚餐', categoryColor: 'red',
      description: '很貴的和牛壽喜燒',
      isCompleted: false, isGoogle: true,
      mapUrl: 'https://maps.app.goo.gl/KzHuQyJdRQKDNHF7'
  },

  // --- 1/9 (Fri) D6 ---
  { 
      id: 'd6-1', date: '2026-01-09', time: '10:00', title: '今宮戎神社', 
      location: '大阪 (浪速區)', category: '景點', categoryColor: 'purple',
      description: '中午前會有獻鯛儀式',
      businessHours: '09:00 - 17:00',
      isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/Sww1UwU92RM9SPvQ7'
  },
  { 
      id: 'd6-3', date: '2026-01-09', time: '11:00', 
      title: 'pâtisserie accueil', location: '大阪 (西區)', category: '下午茶', categoryColor: 'blue',
      description: '法式甜點店',
      businessHours: '11:00 - 19:00', isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/ojQc91auSEy5C9VD8'
  },
  { 
      id: 'd6-4', date: '2026-01-09', time: '19:00', displayTime: '19:00',
      title: '炸牛 元村 難波御堂筋店', location: '大阪 (難波)', category: '晚餐', categoryColor: 'red',
      description: '1 × 炸牛排套餐3種小碗 195g\n1 × 炸牛排套餐3種小碗 260g',
      isCompleted: false, isTablecheck: true,
      mapUrl: 'https://maps.app.goo.gl/v3PsudaxqCnLeSyj6'
  },

  // --- 1/10 (Sat) D7 ---
  { 
      id: 'd7-1', date: '2026-01-10', time: '10:30', 
      title: '雞Soba 座銀 本店', 
      location: '大阪 (肥後橋)', category: '早午餐', categoryColor: 'green',
      description: '雞白湯拉麵',
      isCompleted: false,
      businessHours: '10:30 - 22:00',
      mapUrl: 'https://maps.app.goo.gl/5MiUPJFxft7BrtXA'
  },
  { 
      id: 'd7-2', date: '2026-01-10', time: '11:00', displayTime: '11:00',
      title: 'Check Out', 
      location: '大阪難波東急STAY美居酒店', category: 'Check Out', categoryColor: 'red',
      isCompleted: false 
  },
  { 
      id: 'd7-3', date: '2026-01-10', time: '14:00', displayTime: '14:00',
      title: '起飛 (KIX)', location: '關西機場', category: 'transport', categoryColor: 'red',
      isCompleted: false 
  },
  { 
      id: 'd7-4', date: '2026-01-10', time: '16:15', displayTime: '16:15',
      title: '降落 (TPE)', location: '桃園機場 Terminal 1', category: 'transport', categoryColor: 'red',
      isCompleted: false 
  },
];

const MOCK_BOOKINGS: Booking[] = [
    {
        id: '1',
        type: 'flight',
        title: 'TPE - KIX',
        subTitle: '星宇航空',
        referenceNo: 'JX822',
        date: '2026-01-04',
        time: '09:20', 
        details: {
            '飛行時間': '2h 30m', 
            '抵達': '12:50', 
            '航廈': 'Terminal 1 (TPE)',
            '登機': '08:50',
            '登機門': 'B6',
            '座位': '12K',
            '行李': '2 × 23KG'
        },
        status: 'confirmed'
    },
    {
        id: '1-return',
        type: 'flight',
        title: 'KIX - TPE',
        subTitle: '星宇航空',
        referenceNo: 'JX823',
        date: '2026-01-10',
        time: '14:00', 
        details: {
            '飛行時間': '3h 15m',
            '抵達': '16:15',
            '航廈': 'Terminal 1 (TPE)',
            '登機': '13:20',
            '登機門': 'A3',
            '座位': '12K',
            '行李': '2 × 23KG'
        },
        status: 'confirmed'
    },
    {
        id: '2',
        type: 'hotel',
        title: '大阪難波東急STAY美居酒店',
        subTitle: 'Mercure Tokyu Stay Osaka Namba',
        referenceNo: '1677120264',
        date: '2026-01-04 ~ 2026-01-10', 
        details: {
            'Check-in': '14:00',
            'Check-out': '11:00', 
            'Phone': '+81 6-6214-0109', 
            'Nights': '6',
            'Guests': '2'
        },
        status: 'confirmed'
    },
    {
        id: '3-transfer',
        type: 'transfer',
        title: 'KIX 關西機場 ↔ 飯店',
        subTitle: 'Toyota Alphard Executive Lounge',
        referenceNo: 'MK-8829',
        date: '2026-01-04',
        time: '13:30',
        details: {
            '司機': '田中 健一 (Tanaka)',
            '車牌': '大阪 300 あ 88-29',
            '電話': '+81 90-1234-5678',
            '會面點': 'Terminal 1, Arrival Gate A',
            '人數': '4 Pax / 4 Luggage'
        },
        status: 'confirmed'
    }
];

// --- SHARED UTILS ---
const NODE_STYLES: Record<HighlightColor, string> = {
    red: 'border-red-400',
    orange: 'border-orange-400',
    green: 'border-green-600',
    blue: 'border-blue-400',
    purple: 'border-purple-400',
    gray: 'border-stone-400'
};

// --- SCHEDULE TAB ---

export const ScheduleTab: React.FC<{ searchTerm?: string }> = ({ searchTerm = '' }) => {
  const [selectedDate, setSelectedDate] = useState('2026-01-04');
  const [items, setItems] = useState(MOCK_SCHEDULE);
  const [weather, setWeather] = useState<WeatherInfo>({ condition: 'sunny', temp: 12, locationName: '日本大阪' });
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  
  const touchStartPos = useRef<number | null>(null);
  const dateRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const dates = useMemo(() => Array.from(new Set(items.map(i => i.date))).sort() as string[], [items]);
  const currentIndex = dates.indexOf(selectedDate);

  useEffect(() => {
    const locationName = selectedDate === '2026-01-08' ? '日本京都' : '日本大阪';
    setWeather(prev => ({ 
        ...prev, 
        locationName,
        temp: 12 + Math.floor(Math.random() * 2) - 1,
        condition: Math.random() > 0.8 ? 'cloudy' : 'sunny'
    }));
  }, [selectedDate]);

  useEffect(() => {
    const activeBtn = dateRefs.current.get(selectedDate);
    if (activeBtn) {
      activeBtn.scrollIntoView({
        behavior: 'auto', // Changed from smooth to auto for instant response
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [selectedDate]);

  useEffect(() => {
    const scrollContainer = document.querySelector('.overflow-y-auto');
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [selectedDate]);

  const toggleComplete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setItems(prev => prev.map(item => item.id === id ? { ...item, isCompleted: !item.isCompleted } : item));
  };

  const handleDateChange = (newDate: string) => {
    if (newDate === selectedDate) return;
    const newIndex = dates.indexOf(newDate);
    setSlideDirection(newIndex > currentIndex ? 'right' : 'left');
    setSelectedDate(newDate);
  };

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
    
    const matchSearch = 
        i.title.toLowerCase().includes(term) || 
        i.location.toLowerCase().includes(term) || 
        i.category.toLowerCase().includes(term) ||
        i.description?.toLowerCase().includes(term) ||
        i.businessHours?.toLowerCase().includes(term) ||
        i.displayTime?.toLowerCase().includes(term);
    
    return matchSearch;
  }), [items, selectedDate, searchTerm]);

  const handleNavigate = (item: ScheduleItem) => {
      const url = item.mapUrl || `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(item.location)}`;
      window.open(url, '_blank');
  };

  return (
    <div className="pb-20">
      
      {!searchTerm && (
        <div className="sticky top-[108px] z-30 -mx-5 px-5 bg-zen-bg pt-2 pb-2 transform-gpu">
            <div className="relative overflow-x-auto no-scrollbar py-2 snap-x items-center">
              <div className="flex gap-[6px] min-w-max relative px-1">
                <div 
                  className="absolute h-[78px] w-[58px] rounded-[24px] bg-[#464646] transition-transform duration-200 cubic-bezier pointer-events-none z-0"
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
                            <span className={`text-[10px] font-black tracking-widest mb-1 font-sans`}>{dayName}</span>
                            <span className={`text-[24px] font-bold font-mono leading-none`}>{dayNum}</span>
                        </button>
                    )
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
                const timeLines = item.displayTime?.split('\n') || [];
                const catIcon = getCategoryIcon(item.category);

                return (
                <div key={item.id} className="relative mb-0 group flex gap-0">
                    <div className="w-12 py-4 flex flex-col items-end justify-start flex-shrink-0 pr-1.5">
                        <div className="flex flex-col items-end gap-0.5">
                            {timeLines.map((time, idx) => {
                                const isPrimary = idx === 0;
                                return (
                                    <span 
                                        key={idx} 
                                        className={`font-mono font-bold text-right leading-none transition-all ${
                                            isPrimary ? 'text-lg' : 'text-[11px] opacity-80 mt-0.5'
                                        } ${item.isCompleted ? 'text-gray-300' : 'text-zen-text'}`}
                                    >
                                        {time}
                                    </span>
                                );
                            })}
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
                            className={`bg-white rounded-2xl p-4 shadow-zen border border-stone-50 transition-all duration-200 relative group ${item.isCompleted ? 'opacity-60 grayscale-[50%]' : ''}`}
                        >
                            <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                              <i className={`fa-solid ${catIcon} absolute -bottom-4 -right-2 text-[60px] text-stone-50/50 transform -rotate-12 transition-transform group-hover:scale-110 group-hover:rotate-0`}></i>
                            </div>

                            <div className="absolute -top-2 -right-2 z-20 flex flex-col gap-1 items-end pointer-events-none">
                              {item.isKlook && (
                                  <div className="bg-[#FF5E00] text-white text-[8px] font-black px-2 py-1 rounded-lg shadow-sm transform rotate-12 border border-white/50 whitespace-nowrap">KLOOK</div>
                              )}
                              {item.isTabelog && (
                                  <div className="bg-[#FF6B00] text-white text-[8px] font-black px-2 py-1 rounded-lg shadow-sm transform rotate-12 border border-white/50 whitespace-nowrap">Tabélog</div>
                              )}
                              {item.isGoogle && (
                                  <div className="bg-[#4285F4] text-white text-[8px] font-black px-2 py-1 rounded-lg shadow-sm transform rotate-12 border border-white/50 whitespace-nowrap">Google</div>
                              )}
                              {item.isTablecheck && (
                                  <div className="bg-[#312E81] text-white text-[8px] font-black px-2 py-1 rounded-lg shadow-sm transform rotate-12 border border-white/50 whitespace-nowrap">Tablecheck</div>
                              )}
                            </div>
                            
                            <div className="mb-3 pr-8 relative z-10">
                                <div className="flex items-center gap-2 mb-1">
                                  <i className={`fa-solid ${catIcon} text-[10px] text-stone-300`}></i>
                                  <h3 className={`font-bold text-lg leading-tight ${item.isCompleted ? 'text-stone-400 line-through' : 'text-zen-text'}`}>
                                    <HighlightText text={item.title} highlight={searchTerm} />
                                  </h3>
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

                            <div className="flex justify-between items-end gap-2 mt-auto relative z-10">
                                <div className="flex-grow min-w-0">
                                    <div className="text-[11px] text-stone-400 flex items-center gap-1.5 py-1 px-1 mt-1 bg-stone-50/40 rounded-lg">
                                        <i className="fa-solid fa-map-pin text-[10px] text-stone-300 flex-shrink-0"></i> 
                                        <span className="truncate font-medium">
                                          <HighlightText text={item.location} highlight={searchTerm} />
                                        </span>
                                    </div>
                                </div>
                                <button onClick={(e) => { e.stopPropagation(); handleNavigate(item); }} className="flex-shrink-0 w-10 h-10 rounded-xl bg-white border border-stone-200 text-zen-text flex flex-col items-center justify-center hover:bg-zen-primary hover:text-white transition-all shadow-sm active:scale-90 group-hover:border-zen-primary/30">
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

export const BookingsTab: React.FC<{ searchTerm?: string }> = ({ searchTerm = '' }) => {
    const [bookings] = useState<Booking[]>(MOCK_BOOKINGS);
    const [filter, setFilter] = useState<'all' | 'flight' | 'hotel' | 'transfer' | 'activity'>('all');
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
    const filterRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

    const filterOptions = ['all', 'flight', 'hotel', 'transfer', 'activity'];

    useLayoutEffect(() => {
      const el = filterRefs.current.get(filter);
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

    const filteredBookings = bookings.filter(b => {
      const matchType = filter === 'all' || b.type === filter;
      if (!searchTerm) return matchType;
      const term = searchTerm.toLowerCase();
      const matchSearch = 
          b.title.toLowerCase().includes(term) || 
          b.subTitle?.toLowerCase().includes(term) ||
          b.referenceNo.toLowerCase().includes(term);
      return matchType && matchSearch;
    });

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
                        {/* Sliding Background Indicator */}
                        <div 
                          className="absolute h-full rounded-2xl bg-[#464646] transition-all duration-200 cubic-bezier pointer-events-none z-0"
                          style={{ 
                            left: indicatorStyle.left, 
                            width: indicatorStyle.width,
                            top: 0
                          }}
                        />

                        {filterOptions.map(f => (
                            <button 
                                key={f} 
                                ref={(el) => { if (el) filterRefs.current.set(f, el); }}
                                onClick={() => setFilter(f as any)} 
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
                    <div key={booking.id} className="relative group animate-fade-in">
                        {booking.type === 'flight' ? (
                            <div className="bg-white rounded-[2rem] shadow-zen border border-stone-50 group-hover:shadow-zen-hover transition-all duration-500 overflow-visible relative flex items-stretch">
                                {/* Left Section - Main Ticket */}
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

                                {/* Perforation Section */}
                                <div className="w-[2px] relative flex flex-col items-center justify-between">
                                    <div className="absolute top-0 -translate-y-1/2 w-5 h-5 bg-zen-bg rounded-full border border-stone-100 z-10 -ml-0.5 shadow-inner"></div>
                                    <div className="h-full border-l-2 border-dashed border-stone-100 my-4"></div>
                                    <div className="absolute bottom-0 translate-y-1/2 w-5 h-5 bg-zen-bg rounded-full border border-stone-100 z-10 -ml-0.5 shadow-inner"></div>
                                </div>

                                {/* Right Section - Ticket Stub */}
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
