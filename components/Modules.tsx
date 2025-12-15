
import React, { useState, useEffect } from 'react';
import { Card, Button, CategoryBadge } from './UI';
import { ScheduleItem, Booking, HighlightTag, HighlightColor, WeatherInfo } from '../types';

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
      location: '大阪', category: '購物', categoryColor: 'orange',
      businessHours: '11:00 - 20:00', isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/n9RXpreTK4BmtSKX7'
  },
  { 
      id: 'd1-4', date: '2026-01-04', time: '13:00', title: '大阪高島屋店', 
      location: '大阪', category: '購物', categoryColor: 'orange',
      description: '(1F SUQQU | 2F Dior | 3-4F Polo)', businessHours: '10:00 - 20:00', isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/jv8vH9DvuRvfqx1U8'
  },
  { 
      id: 'd1-5', date: '2026-01-04', time: '13:00', title: '大丸心齋橋店 本館', 
      location: '大阪', category: '購物', categoryColor: 'orange',
      description: '(1F SUQQU | 3F Celine\n9F pokemon center)', businessHours: '10:00 - 20:00', isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/BCqeSZqrh5uiRpoy9'
  },
  { 
      id: 'd1-6', date: '2026-01-04', time: '13:00', title: 'Loewe 大丸梅田店', 
      location: '大阪', category: '購物', categoryColor: 'orange',
      description: '(3F LOEWE男士)', businessHours: '10:00 - 20:00', isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/fQjzaNz4cygtSEmSA'
  },
  { 
      id: 'd1-7', date: '2026-01-04', time: '13:00', title: 'Loewe 阪急男士大阪店', 
      location: '大阪', category: '購物', categoryColor: 'orange',
      description: '(2F LOEWE男士)', businessHours: '10:00 - 20:00', isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/oNoJb8b498ZQfhGbA'
  },
  { 
      id: 'd1-8', date: '2026-01-04', time: '13:00', title: 'Tables Cafe', 
      location: '大阪', category: '下午茶', categoryColor: 'blue',
      description: '(草莓蛋糕)', businessHours: '10:00 - 20:00', isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/xvZvhNF7KLUSNVAz7'
  },
  { 
      id: 'd1-9', date: '2026-01-04', time: '13:00', title: 'BicCamera 難波店', 
      location: '大阪', category: '購物', categoryColor: 'orange',
      description: '(Sony 相機鏡頭)', businessHours: '10:00 - 22:00', isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/2QzAfgJhk68BKUBt7'
  },
  { 
      id: 'd1-10', date: '2026-01-04', time: '15:00', displayTime: '15:00',
      title: 'Check In', location: '大阪難波東急STAY美居酒店', category: 'Check In', categoryColor: 'red',
      isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/N7ytR6Au52tiZJk49'
  },
  { 
      id: 'd1-11', date: '2026-01-04', time: '16:00', title: '逛街', 
      location: '心斎橋', category: '逛街', categoryColor: 'purple',
      isCompleted: false 
  },
  { 
      id: 'd1-12', date: '2026-01-04', time: '18:00', title: '麥×鷄', 
      location: '大阪', category: '晚餐', categoryColor: 'green',
      description: '(雞白湯拉麵)', businessHours: '18:00 - 22:00', isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/3x5qTHVEmY1XCb4f9'
  },

  // --- 1/5 (Mon) D2 ---
  { 
      id: 'd2-1', date: '2026-01-05', time: '09:00', title: 'COLONY by EQI', 
      location: '大阪', category: '早午餐', categoryColor: 'green',
      description: '(鬆餅)', isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/Lfg2wRUuyf1fDih46'
  },
  { 
      id: 'd2-2', date: '2026-01-05', time: '09:30', title: 'MAZE CAFE', 
      location: '大阪', category: '早午餐', categoryColor: 'green',
      isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/MQyHYzPZ8BCgt4PK7'
  },
  { 
      id: 'd2-3', date: '2026-01-05', time: '10:30', title: '3COINS+plus', 
      location: '大阪', category: '購物', categoryColor: 'orange',
      isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/fR5yQ1eUrYacsSmc6'
  },
  { 
      id: 'd2-4', date: '2026-01-05', time: '11:00', title: '3COINS', 
      location: '大阪', category: '購物', categoryColor: 'orange',
      isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/xr7GvpuohiGVhw7K8'
  },
  { 
      id: 'd2-5', date: '2026-01-05', time: '11:30', title: '靴下屋', 
      location: '大阪', category: '購物', categoryColor: 'orange',
      description: '(Tabio)', isCompleted: false 
  },
  { 
      id: 'd2-6', date: '2026-01-05', time: '12:30', title: 'Uniqlo', 
      location: '大阪', category: '購物', categoryColor: 'orange',
      description: '(防寒衣物、花花發熱長袖)', isCompleted: false 
  },
  { 
      id: 'd2-7', date: '2026-01-05', time: '14:00', title: '浅草茶屋たばねのし', 
      location: '大阪', category: '下午茶', categoryColor: 'blue',
      description: '(可麗餅、抹茶拿鐵)', isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/1Rx3JmBJCNg7nvrz5'
  },
  { 
      id: 'd2-8', date: '2026-01-05', time: '16:00', title: 'あべのソラハ', 
      location: '大阪', category: '購物', categoryColor: 'orange',
      description: '(3F Ungrid服飾店)', isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/KmBGoBB2fNMsXQdd7'
  },
  { 
      id: 'd2-9', date: '2026-01-05', time: '18:00', displayTime: '18:00',
      title: '牛舌的檸檬 大阪本店', 
      location: '大阪', category: '晚餐', categoryColor: 'red',
      description: '(已預約)', isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/XyLM17JrCuZr45mt8'
  },
  { 
      id: 'd2-10', date: '2026-01-05', time: '20:00', title: '唐吉軻德', 
      location: '大阪', category: '購物', categoryColor: 'orange',
      isCompleted: false 
  },
  { 
      id: 'd2-11', date: '2026-01-05', time: '21:00', title: '藥妝店', 
      location: '大阪', category: '購物', categoryColor: 'orange',
      description: '(暈車藥、感冒藥、過敏藥補貨)', isCompleted: false 
  },

  // --- 1/6 (Tue) D3 ---
  { 
      id: 'd3-1', date: '2026-01-06', time: '11:00', 
      title: 'Tart Square', location: '大阪', category: '早午餐', categoryColor: 'green',
      description: '(和牛鹹塔/甜食塔)', businessHours: '11:00-19:00', isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/iKP9MLJs7AbywHKQ8'
  },
  { 
      id: 'd3-2', date: '2026-01-06', time: '11:30', title: 'LiLo Coffee Roasters', 
      location: '大阪', category: '外帶咖啡', categoryColor: 'blue',
      description: '(咖啡廳 | 現金Only)', isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/kr7uR73TsLyrguqRA'
  },
  { 
      id: 'd3-3', date: '2026-01-06', time: '12:00', 
      title: 'エモジ (EMOJI)', location: '大阪', category: '購物', categoryColor: 'orange',
      description: '(御朱印帳、集章冊)', businessHours: '12:00 - 18:00', isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/MHT3xD2ZRB9dz8E46'
  },
  { 
      id: 'd3-4', date: '2026-01-06', time: '13:00', title: '難波八阪神社', 
      location: '大阪', category: '景點', categoryColor: 'purple',
      isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/ZgiFUDhiTbZUhQvk8'
  },
  { 
      id: 'd3-5', date: '2026-01-06', time: '14:30', title: 'COLONY by EQI', 
      location: '心斎橋アメ村店', category: '下午茶', categoryColor: 'blue',
      description: '(舒芙蕾)', isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/eZc5Hi3E5zW9A4sX6'
  },
  { 
      id: 'd3-6', date: '2026-01-06', time: '16:00', title: '道頓堀大觀覽車', 
      location: '道頓堀', category: '景點', categoryColor: 'purple',
      description: '(唐吉軻德摩天輪)', isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/XtcYSxdr8Cnjb1Ua9'
  },
  { 
      id: 'd3-7', date: '2026-01-06', time: '18:30', displayTime: '18:30',
      title: 'YAKINIKUEN 忍鬨', location: '日本橋店', category: '晚餐', categoryColor: 'red',
      description: '(燒肉 | 已預約)', isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/2DAibjATzeB2CVxWA'
  },
  { 
      id: 'd3-8', date: '2026-01-06', time: '20:00', title: '超商購買明日早餐', 
      location: '大阪', category: '一般', categoryColor: 'gray',
      isCompleted: false 
  },

  // --- 1/7 (Wed) D4 ---
  { 
      id: 'd4-1', date: '2026-01-07', time: '08:00', title: '超商早餐', 
      location: '環球影城', category: '早餐', categoryColor: 'green',
      isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/m6eZWZhHxoUsrnha8'
  },
  { 
      id: 'd4-2', date: '2026-01-07', time: '09:00', title: '好萊塢美夢·乘車遊~逆轉世界~', 
      location: 'USJ', category: '設施', categoryColor: 'purple',
      isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/m6eZWZhHxoUsrnha8'
  },
  { 
      id: 'd4-3', date: '2026-01-07', time: '15:00', displayTime: '15:00\n16:00',
      title: '超級任天堂園區入場卷', location: 'USJ', category: 'Express', categoryColor: 'red',
      isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/m6eZWZhHxoUsrnha8'
  },
  { 
      id: 'd4-4', date: '2026-01-07', time: '15:00', displayTime: '15:00\n15:30',
      title: '瑪利歐賽車：庫巴的挑戰書', location: 'USJ', category: 'Express', categoryColor: 'red',
      isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/m6eZWZhHxoUsrnha8'
  },
  { 
      id: 'd4-5', date: '2026-01-07', time: '15:30', displayTime: '15:30\n16:00',
      title: '哆奇剛的瘋狂礦車', location: 'USJ', category: 'Express', categoryColor: 'red',
      isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/m6eZWZhHxoUsrnha8'
  },
  { 
      id: 'd4-6', date: '2026-01-07', time: '18:00',
      title: '燃えよ麺助', location: '大阪', category: '晚餐', categoryColor: 'green',
      description: '(蔥鴨拉麵、金色貝拉麵)', businessHours: '18:00 - 21:00', isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/qKVRK9EiqsuWwL5k7'
  },

  // --- 1/8 (Thu) D5 ---
  { 
      id: 'd5-1', date: '2026-01-08', time: '12:00', 
      title: 'ろじうさぎ (Roji Usagi)', location: '京都', category: '早午餐', categoryColor: 'green',
      description: '(日式料理)', businessHours: '12:00 - 15:30', isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/uJkpfNgAksJ5cWeM7'
  },
  { 
      id: 'd5-2', date: '2026-01-08', time: '13:30', title: '湯葉チーズ本舗', 
      location: '京都', category: '點心', categoryColor: 'blue',
      description: '(炸豆皮起司)', isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/Mgt5YJiAe2frMuYo6'
  },
  { 
      id: 'd5-3', date: '2026-01-08', time: '14:30', title: '天龍寺', 
      location: '京都', category: '景點', categoryColor: 'purple',
      isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/AkXiyUDh8qDgMTGj8'
  },
  { 
      id: 'd5-4', date: '2026-01-08', time: '15:30', title: '嵯峨野竹林小徑', 
      location: '京都', category: '景點', categoryColor: 'purple',
      isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/x83m24TFXFNjCe8y5'
  },
  { 
      id: 'd5-5', date: '2026-01-08', time: '16:30', title: '野宮神社', 
      location: '京都', category: '景點', categoryColor: 'purple',
      isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/q7fRDitmuVnYtKbu8'
  },
  { 
      id: 'd5-6', date: '2026-01-08', time: '17:30', title: '常寂光寺', 
      location: '京都', category: '景點', categoryColor: 'purple',
      isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/xiiuvrhTuuvVWmAD9'
  },
  { 
      id: 'd5-7', date: '2026-01-08', time: '19:00', displayTime: '19:00',
      title: '京都力山 京都站前店', location: '京都', category: '晚餐', categoryColor: 'red',
      description: '(很貴的和牛壽喜燒 | 已預約)', isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/KzHuQyJdRQKDNHNf7'
  },

  // --- 1/9 (Fri) D6 ---
  { 
      id: 'd6-1', date: '2026-01-09', time: '10:00', title: '今宮戎神社', 
      location: '大阪', category: '景點', categoryColor: 'purple',
      description: '(中午前會有獻鯛儀式)', isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/Sww1UwU92RM9SPvQ7'
  },
  { 
      id: 'd6-2', date: '2026-01-09', time: '13:00', 
      title: '鮨 三心', location: '大阪', category: '早午餐', categoryColor: 'red',
      description: '(板前握壽司 | Visa預約中)', businessHours: '13:00 - 14:00', isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/bnc9p3BMeFgTPcUh7'
  },
  { 
      id: 'd6-3', date: '2026-01-09', time: '11:00', 
      title: 'pâtisserie accueil', location: '大阪', category: '下午茶', categoryColor: 'blue',
      description: '(法式甜點店)', businessHours: '11:00 - 19:00', isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/ojQc91auSEy5C9VD8'
  },
  { 
      id: 'd6-4', date: '2026-01-09', time: '19:00', displayTime: '19:00',
      title: '炸牛 元村 難波御堂筋店', location: '大阪', category: '晚餐', categoryColor: 'red',
      description: '(Visa預約中)', isCompleted: false,
      mapUrl: 'https://maps.app.goo.gl/v3PsudaxqCnLeSyj6'
  },

  // --- 1/10 (Sat) D7 ---
  { 
      id: 'd7-1', date: '2026-01-10', time: '10:30', 
      title: '雞Soba 座銀 本店', 
      location: '大阪', category: '早午餐', categoryColor: 'green',
      description: '(雞白湯拉麵)', isCompleted: false,
      businessHours: '10:30 - 22:00',
      mapUrl: 'https://maps.app.goo.gl/5MiUPJFxft7bBrtXA'
  },
  { 
      id: 'd7-2', date: '2026-01-10', time: '11:00', displayTime: '11:00',
      title: 'Check Out', 
      location: '大阪難波東急STAY美居酒店', category: 'Check Out', categoryColor: 'red',
      description: '(飯店寄存行李)', isCompleted: false 
  },
  { 
      id: 'd7-3', date: '2026-01-10', time: '14:00', displayTime: '14:00',
      title: '起飛 (KIX)', location: '關西機場', category: 'transport', categoryColor: 'red',
      description: '(逛免稅商店/伴手禮)', isCompleted: false 
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
        subTitle: '星宇航空 JX822',
        referenceNo: 'JX822',
        date: '2026-01-05',
        time: '09:20', 
        details: {
            '飛行時間': '2h 30m', 
            '抵達': '12:50', 
            '航廈': 'Terminal 1 (TPE)'
        },
        status: 'confirmed'
    },
    {
        id: '1-return',
        type: 'flight',
        title: 'KIX - TPE',
        subTitle: '星宇航空 JX823',
        referenceNo: 'JX823',
        date: '2026-01-10',
        time: '14:00', 
        details: {
            '飛行時間': '3h 15m',
            '抵達': '16:15',
            '航廈': 'Terminal 1 (TPE)'
        },
        status: 'confirmed'
    },
    {
        id: '2',
        type: 'hotel',
        title: '大阪難波東急STAY美居酒店',
        subTitle: 'Mercure Tokyu Stay Osaka Namba',
        referenceNo: '1677120264',
        date: '2026-01-05 ~ 2026-01-10', 
        details: {
            'Check-in': '14:00',
            'Check-out': '11:00', 
            'Phone': '+81 6-6214-0109', 
            'Nights': '5',
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
        date: '2026-01-05',
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

// --- MAP MOCK DATA ---
const MOCK_PLACES_DB = [
    { name: "Senso-ji", location: "Asakusa, Tokyo", lat: 35.7148, lng: 139.7967 },
    { name: "Daimaru Shinsaibashi", location: "Chuo Ward, Osaka", lat: 34.6712, lng: 135.5014 },
    { name: "Takashimaya Osaka", location: "Namba, Osaka", lat: 34.6631, lng: 135.5020 },
    { name: "BicCamera Namba", location: "Namba, Osaka", lat: 34.6654, lng: 135.5035 },
    { name: "Mugi x Tori", location: "Chuo Ward, Osaka", lat: 34.6738, lng: 135.4998 },
    { name: "Tables Cafe", location: "Minami-Horie, Osaka", lat: 34.6698, lng: 135.4945 },
    { name: "Kansai Airport", location: "Izumisano, Osaka", lat: 34.4320, lng: 135.2304 },
    { name: "USJ", location: "Konohana, Osaka", lat: 34.6654, lng: 135.4323 },
    { name: "Narita Airport", location: "Narita, Chiba", lat: 35.7719, lng: 140.3929 },
];

// --- SHARED UTILS ---
const TAG_COLORS: Record<HighlightColor, string> = {
    red: 'bg-red-50 text-red-600 border-red-200',
    orange: 'bg-orange-50 text-orange-600 border-orange-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    gray: 'bg-gray-50 text-gray-600 border-gray-200'
};

const NODE_STYLES: Record<HighlightColor, string> = {
    red: 'border-red-400',
    orange: 'border-orange-400',
    green: 'border-green-600',
    blue: 'border-blue-400',
    purple: 'border-purple-400',
    gray: 'border-gray-400'
};

const getSimulatedWeather = (location: string): WeatherInfo => {
    // Force Osaka weather simulation
    return { condition: 'sunny', temp: 12, locationName: '日本大阪' };
};

const DEFAULT_CATEGORY_ICONS: Record<string, string> = {
    sightseeing: 'fa-camera',
    food: 'fa-utensils',
    transport: 'fa-train-subway',
    stay: 'fa-bed',
    shopping: 'fa-bag-shopping',
    activity: 'fa-person-skiing'
};

const PRESET_CATS = ['sightseeing', 'food', 'transport', 'stay', 'shopping'];
const PRESET_COLORS: HighlightColor[] = ['red', 'orange', 'green', 'blue', 'purple', 'gray'];

// --- SCHEDULE TAB ---

export const ScheduleTab: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('2026-01-04');
  const [items, setItems] = useState(MOCK_SCHEDULE);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [weather, setWeather] = useState<WeatherInfo>({ condition: 'sunny', temp: 12, locationName: '日本大阪' });

  // Simulate dynamic weather updates
  useEffect(() => {
    // Initial set
    setWeather({ condition: 'sunny', temp: 12, locationName: '日本大阪' });

    // Periodic "live" update simulation
    const interval = setInterval(() => {
        // Randomly fluctuate temp slightly to simulate live data
        setWeather(prev => ({
            ...prev,
            temp: 12 + Math.floor(Math.random() * 2) - 1, // 11-13 degrees
            condition: Math.random() > 0.8 ? 'cloudy' : 'sunny' // Mostly sunny
        }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const toggleComplete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setItems(prev => prev.map(item => item.id === id ? { ...item, isCompleted: !item.isCompleted } : item));
  };

  const dates = Array.from(new Set(items.map(i => i.date))).sort() as string[];
  const filteredItems = items.filter(i => i.date === selectedDate);

  const handleNavigate = (item: ScheduleItem) => {
      const url = item.mapUrl || `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(item.location)}`;
      window.open(url, '_blank');
  };

  return (
    <div className="pb-20 space-y-6">
      
      {/* Date Navigation - Sticky & Smooth */}
      <div className="sticky top-20 z-20 -mx-5 bg-gradient-to-b from-zen-bg via-zen-bg to-transparent">
          <div className="flex gap-2 overflow-x-auto no-scrollbar px-5 py-4 snap-x items-center">
            {dates.map((date) => {
                const d = new Date(date);
                // Display English short weekday (e.g., THU)
                const dayName = d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
                const dayNum = d.getDate();
                const isSelected = date === selectedDate;
                return (
                    <button
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={`snap-center flex-shrink-0 flex flex-col items-center justify-center w-[52px] h-[72px] rounded-[16px] transition-all duration-300 relative ${
                            isSelected 
                            ? 'bg-[#464646] text-white shadow-xl translate-y-0 z-10' 
                            : 'bg-white text-gray-400 shadow-sm hover:bg-gray-50'
                        }`}
                    >
                        <span className={`text-[9px] font-black tracking-widest mb-1 font-sans ${isSelected ? 'text-white' : 'text-gray-400'}`}>{dayName}</span>
                        <span className={`text-[20px] font-bold font-sans leading-none ${isSelected ? 'text-white' : 'text-gray-400'}`}>{dayNum}</span>
                    </button>
                )
            })}
          </div>
      </div>

      {/* Date Header Info */}
      <div className="flex justify-between items-end px-2">
         <div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Day Plan</div>
            <h2 className="text-3xl font-mono font-bold text-zen-text">{selectedDate}</h2>
            <div className="flex items-center gap-2 mt-1 text-gray-500 text-sm">
                <i className="fa-solid fa-location-dot text-zen-primary"></i> 
                <span>{weather.locationName}</span>
            </div>
         </div>
         <div className="bg-white/60 backdrop-blur-md border border-white p-3 rounded-2xl shadow-sm flex flex-col items-center min-w-[80px]">
            <div className="text-2xl mb-1">
                {weather.condition === 'sunny' && <i className="fa-solid fa-sun text-orange-400 animate-spin-slow"></i>}
                {weather.condition === 'cloudy' && <i className="fa-solid fa-cloud text-gray-400"></i>}
                {weather.condition === 'rain' && <i className="fa-solid fa-cloud-rain text-blue-400"></i>}
                {weather.condition === 'snow' && <i className="fa-regular fa-snowflake text-blue-200"></i>}
            </div>
            <div className="text-sm font-bold font-mono">{weather.temp}°C</div>
         </div>
      </div>

      {/* Timeline */}
      <div className="relative pr-2">
        {filteredItems.map((item, index) => {
            return (
              <div key={item.id} className="relative mb-0 group flex gap-0">
                {/* 1. Time Column - Aligned Right */}
                <div className="w-14 py-4 flex flex-col items-end justify-start flex-shrink-0 pr-3">
                    <span className={`font-mono font-bold text-sm text-right leading-none ${item.isCompleted ? 'text-gray-300' : 'text-gray-500'}`}>
                        {item.displayTime?.split('\n')[0] || item.time}
                    </span>
                    {item.displayTime?.includes('\n') && (
                         <span className="text-[10px] text-gray-300 font-mono mt-1 text-right">{item.displayTime.split('\n')[1]}</span>
                    )}
                </div>

                {/* 2. Timeline Line & Node */}
                <div className="relative flex flex-col items-center px-0 flex-shrink-0 w-6">
                    {/* Continuous Line */}
                    <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1.5px] bg-stone-200"></div>
                    
                    {/* Zen Node */}
                    <div 
                        onClick={(e) => toggleComplete(item.id, e)}
                        className={`
                            relative z-10 w-2.5 h-2.5 rounded-full border-2 bg-zen-bg transition-all duration-300 mt-[1.2rem] cursor-pointer hover:scale-150
                            ${item.isCompleted 
                                ? 'border-gray-300 bg-gray-300' 
                                : NODE_STYLES[item.categoryColor || 'gray'] || 'border-gray-400'
                            }
                        `}
                    ></div>
                </div>

                {/* 3. Content Card Column */}
                <div className="flex-grow min-w-0 py-2 pb-6 pl-2">
                    <div 
                        onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                        className={`bg-white rounded-2xl p-4 shadow-zen border border-stone-50 cursor-pointer transition-all duration-300 
                            ${expandedId === item.id ? 'ring-2 ring-zen-primary/20' : 'hover:translate-y-[-2px]'}
                            ${item.isCompleted ? 'opacity-60 grayscale-[50%]' : ''}
                        `}
                    >
                        {/* Header: Title & Category Badge (Right) */}
                        <div className="flex justify-between items-start gap-2 mb-1">
                             <h3 className={`font-bold text-lg leading-tight ${item.isCompleted ? 'text-gray-500 line-through' : 'text-zen-text'}`}>{item.title}</h3>
                             <div className="flex-shrink-0">
                                <CategoryBadge type={item.category} color={item.categoryColor} />
                             </div>
                        </div>

                        {/* Description (Details like 1F SUQQU...) */}
                        {item.description && (
                            <div className="text-xs text-gray-400 font-medium whitespace-pre-line leading-relaxed mb-2">
                                {item.description}
                            </div>
                        )}

                        {/* Location */}
                        <div className="text-xs text-gray-500 flex items-center gap-1 mb-2">
                            <i className="fa-solid fa-map-pin text-[10px]"></i> <span className="truncate">{item.location}</span>
                        </div>
                        
                        {/* Business Hours Display inside Card */}
                        {item.businessHours && (
                            <div className="text-[10px] font-bold text-orange-400 bg-orange-50 px-2 py-0.5 rounded inline-block mb-1">
                                <i className="fa-regular fa-clock mr-1"></i>營業時間: {item.businessHours}
                            </div>
                        )}

                        {/* Expanded Details */}
                        {expandedId === item.id && (
                            <div className="mt-4 pt-3 border-t border-dashed border-gray-200 animate-fade-in">
                                {item.guideInfo?.story && (
                                    <p className="text-sm text-gray-600 leading-relaxed font-serif italic mb-3">"{item.guideInfo.story}"</p>
                                )}
                                
                                <div className="flex gap-2 mb-3">
                                    <Button size="sm" variant="secondary" onClick={(e) => { e.stopPropagation(); handleNavigate(item); }} className="flex-1 text-xs">
                                        <i className="fa-solid fa-location-arrow"></i> 導航
                                    </Button>
                                </div>

                                {item.guideInfo?.highlights && item.guideInfo.highlights.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5">
                                        {item.guideInfo.highlights.map(h => (
                                            <span key={h.id} className={`text-[10px] px-2 py-1 rounded border font-bold ${TAG_COLORS[h.color]}`}>{h.text}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
              </div>
            );
        })}

        {filteredItems.length === 0 && (
            <div className="text-center py-10 text-gray-400 opacity-60">
                <i className="fa-regular fa-calendar-plus text-4xl mb-2"></i>
                <p className="text-sm">No plans for this day yet.</p>
            </div>
        )}
      </div>
    </div>
  );
};

// --- BOOKINGS TAB ---

export const BookingsTab: React.FC = () => {
    const [bookings] = useState<Booking[]>(MOCK_BOOKINGS);
    const [filter, setFilter] = useState<'all' | 'flight' | 'hotel' | 'transfer' | 'activity'>('all');

    const getIcon = (type: string) => {
        switch(type) {
            case 'flight': return 'fa-plane-up';
            case 'hotel': return 'fa-hotel';
            case 'activity': return 'fa-ticket';
            case 'transfer': return 'fa-van-shuttle';
            default: return 'fa-receipt';
        }
    };

    const filteredBookings = filter === 'all' ? bookings : bookings.filter(b => b.type === filter);

    return (
        <div className="pb-20 space-y-6">
            <h2 className="text-2xl font-bold font-mono text-zen-text mb-4">Wallet</h2>
            
            {/* Filter Pills */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                {['all', 'flight', 'hotel', 'transfer', 'activity'].map(f => (
                    <button 
                        key={f}
                        onClick={() => setFilter(f as any)}
                        className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                            filter === f ? 'bg-zen-text text-white shadow-zen-sm' : 'bg-white text-gray-400 border border-stone-100'
                        }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                {filteredBookings.map(booking => (
                    <div key={booking.id} className="relative group">
                        {booking.type === 'flight' ? (
                            // Flight Ticket Style
                            <div className="bg-white rounded-2xl shadow-zen overflow-hidden relative border border-stone-50">
                                {/* Header Strip */}
                                <div className="bg-[#4A90E2] h-2"></div>
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-2">
                                            <i className="fa-solid fa-plane-up text-[#4A90E2]"></i>
                                            <span className="font-bold text-sm tracking-wide">{booking.subTitle}</span>
                                        </div>
                                        <div className="text-right">
                                            {/* Adjusted to prevent cropping: -mt-1 and leading-tight */}
                                            <div className="font-mono text-lg font-bold text-gray-800 leading-tight -mt-1">{booking.time}</div>
                                            <div className="text-xs text-gray-500 font-mono mt-1">{booking.date}</div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-between items-center mb-6 mt-20">
                                        <div className="text-center">
                                            <div className="text-3xl font-mono font-bold text-zen-text">{booking.title.split(' - ')[0]}</div>
                                        </div>
                                        <div className="flex-1 border-b-2 border-dashed border-gray-300 mx-4 relative top-1">
                                            {booking.details['飛行時間'] && (
                                                <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] font-bold text-gray-400 bg-white px-2 py-0.5 whitespace-nowrap z-10">
                                                    {booking.details['飛行時間']}
                                                </span>
                                            )}
                                            <i className="fa-solid fa-plane absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-300 bg-white px-1 text-xs z-10"></i>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-mono font-bold text-zen-text">{booking.title.split(' - ')[1]}</div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2 border-t border-dashed border-gray-200 pt-4">
                                        {Object.entries(booking.details)
                                            .filter(([key]) => key !== '飛行時間')
                                            .map(([key, val]) => (
                                            <div key={key}>
                                                <div className="text-[10px] text-gray-400 uppercase font-bold">{key}</div>
                                                <div className="font-bold text-zen-text text-sm">{val}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Perforation Circles */}
                                <div className="absolute top-[65%] -left-2 w-4 h-4 bg-zen-bg rounded-full shadow-inner"></div>
                                <div className="absolute top-[65%] -right-2 w-4 h-4 bg-zen-bg rounded-full shadow-inner"></div>
                            </div>
                        ) : booking.type === 'transfer' ? (
                            // Transfer Card Style
                            <div className="bg-white rounded-2xl shadow-zen overflow-hidden border border-stone-50">
                                <div className="bg-[#2D2D2D] p-4 text-white">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                                <i className="fa-solid fa-van-shuttle text-sm"></i>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-sm leading-tight">Airport Transfer</h3>
                                                <div className="text-[10px] text-white/60 font-mono tracking-wider">{booking.referenceNo}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xl font-mono font-bold">{booking.time}</div>
                                            <div className="text-[10px] opacity-60">{booking.date}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex-1">
                                            <div className="text-lg font-bold text-zen-text">{booking.title}</div>
                                            <div className="text-xs text-gray-500 font-medium">{booking.subTitle}</div>
                                        </div>
                                        {/* Car Visual Placeholder */}
                                        <div className="w-16 h-10 bg-gray-100 rounded-lg flex items-center justify-center border border-dashed border-gray-300">
                                            <i className="fa-solid fa-car-side text-gray-300"></i>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-stone-50 rounded-xl p-3 space-y-2 mb-3">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-400 text-xs">司機</span>
                                            <span className="font-bold text-zen-text">{booking.details['司機']}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-400 text-xs">車牌</span>
                                            <span className="font-mono font-bold bg-white border border-stone-200 px-1.5 rounded text-gray-700">{booking.details['車牌']}</span>
                                        </div>
                                         <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-400 text-xs">會面</span>
                                            <span className="font-bold text-zen-text text-right max-w-[60%] leading-tight">{booking.details['會面點']}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // General Booking Card Style (Hotel, Activity)
                            <div className="bg-white rounded-2xl shadow-zen p-4 border border-stone-50 flex gap-4 items-stretch">
                                <div className={`w-12 rounded-xl flex items-center justify-center text-white text-xl ${
                                    booking.type === 'hotel' ? 'bg-purple-400' : 'bg-orange-400'
                                }`}>
                                    <i className={`fa-solid ${getIcon(booking.type)}`}></i>
                                </div>
                                <div className="flex-1 flex flex-col justify-between py-1">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-zen-text leading-tight">{booking.title}</h3>
                                        </div>
                                        {booking.subTitle && <div className="text-xs text-gray-400 mt-0.5">{booking.subTitle}</div>}
                                    </div>
                                    <div className="mt-3 flex flex-col gap-1 text-xs font-medium text-gray-600">
                                        <div className="flex items-center gap-2"><i className="fa-regular fa-calendar w-4 text-center"></i> {booking.date}</div>
                                        {booking.details['Check-in'] && (
                                            <div className="flex items-center gap-2">
                                                <i className="fa-regular fa-clock w-4 text-center"></i> 
                                                <span>In: {booking.details['Check-in']} / Out: {booking.details['Check-out'] || '11:00'}</span>
                                            </div>
                                        )}
                                        {booking.details['Phone'] && (
                                            <div className="flex items-center gap-2"><i className="fa-solid fa-phone w-4 text-center"></i> {booking.details['Phone']}</div>
                                        )}
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
