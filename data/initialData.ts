import { ZenTripData } from '../types';

export const INITIAL_TRIP_DATA: ZenTripData = {
  tripName: '日本大阪7天6夜',
  lastUpdated: Date.now(),
  schedule: [
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
        id: 'd1-3', date: '2026-01-04', time: '13:00', displayTime: '', title: 'Dior 心斎橋', 
        location: '大阪 (心斎橋)', category: '購物', categoryColor: 'orange',
        businessHours: '11:00 - 20:00', isCompleted: false,
        mapUrl: 'https://maps.app.goo.gl/n9RXpreTK4BmtSKX7',
        checkList: [
          { id: 'd1-3-c1', text: '日本限定色｜女用卡夾/短夾 X1', isCompleted: false },
          { id: 'd1-3-c2', text: '女用雙面皮帶', isCompleted: false },
          { id: 'd1-3-c3', text: '男用皮帶', isCompleted: false }
        ]
    },
    { 
        id: 'd1-4', date: '2026-01-04', time: '13:00', displayTime: '', title: '大阪高島屋店', 
        location: '大阪 (難波)', category: '購物', categoryColor: 'orange',
        description: '1F 美妝 | 2F Dior | 3F ANAYI (essence)、POLO',
        businessHours: '10:00 - 20:00', isCompleted: false,
        mapUrl: 'https://maps.app.goo.gl/jv8vH9DvuRvfqx1U8',
        checkList: [
          { id: 'd1-4-anayi', text: '[ANAYI] 印花摺襉抓皺傘狀裙', isCompleted: false },
          { id: 'd1-4-c7', text: '[DIOR美妝] 經典五色眼影 #429法式印花 X1', isCompleted: false },
          { id: 'd1-4-dior-lip', text: '[DIOR美妝] 粉漾水光潤唇釉 #046 覆盆莓', isCompleted: false }
        ]
    },
    { 
        id: 'd1-5', date: '2026-01-04', time: '13:00', displayTime: '', title: '大丸心齋橋店 本館', 
        location: '大阪 (心斎橋)', category: '購物', categoryColor: 'orange',
        description: '1F 美妝 | 4F ANAYI | 9F pokemon center',
        businessHours: '10:00 - 20:00', isCompleted: false,
        mapUrl: 'https://maps.app.goo.gl/BCqeSZqrh5uiRvoy9',
        checkList: [
          { id: 'd1-5-anayi', text: '[ANAYI] 印花摺襉抓皺傘狀裙', isCompleted: false },
          { id: 'd1-5-c7', text: '[DIOR美妝] 經典五色眼影 #429法式印花 X1', isCompleted: false },
          { id: 'd1-5-dior-lip', text: '[DIOR美妝] 粉漾水光潤唇釉 #046 覆盆莓', isCompleted: false }
        ]
    },
    { 
        id: 'd1-6', date: '2026-01-04', time: '13:00', displayTime: '', title: 'Loewe 大丸梅田店', 
        location: '大阪 (梅田)', category: '購物', categoryColor: 'orange',
        description: '3F LOEWE男子',
        businessHours: '10:00 - 20:00', isCompleted: false,
        mapUrl: 'https://maps.app.goo.gl/fQjzaNz4cygtSEmSA',
        checkList: [
          { id: 'd1-6-c1', text: '男用卡夾/黑 X1', isCompleted: false }
        ]
    },
    { 
        id: 'd1-7', date: '2026-01-04', time: '13:00', displayTime: '', title: 'Loewe 阪急男士大阪店', 
        location: '大阪 (梅田)', category: '購物', categoryColor: 'orange',
        description: '2F LOEWE男子',
        businessHours: '10:00 - 20:00', isCompleted: false,
        mapUrl: 'https://maps.app.goo.gl/oNoJb8b498ZQfhGbA',
        checkList: [
          { id: 'd1-7-c1', text: '男用卡夾/黑 X1', isCompleted: false }
        ]
    },
    { 
        id: 'd1-anayi-hankyu', date: '2026-01-04', time: '13:00', displayTime: '',
        title: 'ANAYI 阪急本店', location: '大阪 (梅田)', category: '購物', categoryColor: 'orange',
        description: '(4F)',
        businessHours: '10:00 - 20:00', isCompleted: false,
        mapUrl: 'https://maps.app.goo.gl/Vw3b9hsDHoJXX8h26',
        checkList: [
          { id: 'd1-anayi-hankyu-c1', text: '[ANAYI] 印花摺襉抓皺傘狀裙', isCompleted: false }
        ]
    },
    { 
        id: 'd1-8', date: '2026-01-04', time: '13:00', displayTime: '', title: 'Tables Cafe', 
        location: '大阪 (堀江)', category: '下午茶', categoryColor: 'blue',
        description: '草莓蛋糕',
        businessHours: '11:00 - 20:00', isCompleted: false,
        mapUrl: 'https://maps.app.goo.gl/xvZvhNF7KLUSNVAz7'
    },
    { 
        id: 'd1-9', date: '2026-01-04', time: '13:00', displayTime: '', title: 'BicCamera 難波店', 
        location: '大阪 (難波)', category: '購物', categoryColor: 'orange',
        description: 'Sony 相機鏡頭',
        businessHours: '10:00 - 21:00', isCompleted: false,
        mapUrl: 'https://maps.app.goo.gl/2QzAfgJhk68BKUBt7',
        checkList: [
          { id: 'd1-9-c1', text: 'KOIZUMI KHR-6430 無線瀏海整髮梳二代', isCompleted: false },
          { id: 'd1-9-c2', text: 'KOIZUMI 無線離子夾 KHS-8660/白 X2', isCompleted: false }
        ]
    },
    { 
        id: 'd1-10', date: '2026-01-04', time: '15:00', displayTime: '15:00',
        title: 'Check In', location: '大阪難波東急STAY美居酒店', category: 'Check In', categoryColor: 'red',
        isCompleted: false,
        mapUrl: 'https://maps.app.goo.gl/N7ytR6Au52tiZJJ49'
    },
    { 
        id: 'd1-adidas', date: '2026-01-04', time: '15:30', displayTime: '', title: 'Adidas 心齋橋大阪店', 
        location: '大阪 (心斎橋)', category: '購物', categoryColor: 'orange',
        description: '(外套、裙子、拖鞋)',
        businessHours: '11:00 - 21:00', isCompleted: false,
        mapUrl: 'https://maps.app.goo.gl/2ow8dYyDiHvFk8o17',
        checkList: [
          { id: 'd1-adidas-c1', text: '白色針織外套/S', isCompleted: false },
          { id: 'd1-adidas-c2', text: '蓬蓬長裙/黑 or 白', isCompleted: false },
          { id: 'd1-adidas-c3', text: '立領白色外套', isCompleted: false },
          { id: 'd1-adidas-c4', text: '黑色包頭拖鞋', isCompleted: false }
        ]
    },
    { 
        id: 'd1-11', date: '2026-01-04', time: '16:00', displayTime: '', title: '逛街', 
        location: '心斎橋', category: '逛街', categoryColor: 'purple',
        isCompleted: false,
        mapUrl: 'https://maps.app.goo.gl/Etpv8i3X6dN1ArEe8'
    },
    { 
        id: 'd1-12', date: '2026-01-04', time: '18:00', displayTime: '', title: '麥×鷄', 
        location: '大阪 (心斎橋)', category: '晚餐', categoryColor: 'green',
        description: '雞白湯拉麵',
        businessHours: '18:00 - 22:00', isCompleted: false,
        mapUrl: 'https://maps.app.goo.gl/3x5qTHVEmY1XCb4f9'
    },
    { 
        id: 'd2-1', date: '2026-01-05', time: '09:00', displayTime: '', title: 'COLONY by EQI', 
        location: '大阪 (西心斎橋)', category: '早午餐', categoryColor: 'green',
        description: '鬆餅',
        businessHours: '11:00 - 23:00',
        isCompleted: false,
        mapUrl: 'https://maps.app.goo.gl/Lfg2wRUuyf1fDih46'
    },
    { 
        id: 'd2-2', date: '2026-01-05', time: '09:30', displayTime: '', title: 'MAZE CAFE', 
        location: '大阪 (西心斎橋)', category: '早午餐', categoryColor: 'green',
        businessHours: '08:00 - 16:00',
        isCompleted: false,
        mapUrl: 'https://maps.app.goo.gl/MQyHYzPZ8BCgt4PK7'
    },
    { 
        id: 'd2-3', date: '2026-01-05', time: '10:30', displayTime: '', title: '3COINS+plus', 
        location: '大阪 (心斎橋)', category: '購物', categoryColor: 'orange',
        businessHours: '11:00 - 21:00',
        isCompleted: false,
        mapUrl: 'https://maps.app.goo.gl/fR5yQ1eUrYacsSmc6',
        checkList: [
          { id: 'd2-3-c1', text: '硬幣收納包/灰 X1', isCompleted: false },
          { id: 'd2-3-c2', text: '可拆式美髮梳 X1', isCompleted: false },
          { id: 'd2-3-c3', text: '腰間防盜小包/灰 X1', isCompleted: false },
          { id: 'd2-3-c4', text: '外套掛帶/白 X2｜黑 X1', isCompleted: false },
          { id: 'd2-3-c5', text: 'LED隨身鏡 X2', isCompleted: false },
          { id: 'd2-3-c6', text: 'LED桌上立鏡 X1', isCompleted: false }
        ]
    },
    { 
        id: 'd2-4', date: '2026-01-05', time: '11:00', displayTime: '', title: '3COINS', 
        location: '大阪 (難波/心斎橋)', category: '購物', categoryColor: 'orange',
        businessHours: '11:00 - 21:00',
        isCompleted: false,
        mapUrl: 'https://maps.app.goo.gl/xr7GvpuohiGVhw7K8',
        checkList: [
          { id: 'd2-4-c1', text: '硬幣收納包/灰 X1', isCompleted: false },
          { id: 'd2-4-c2', text: '可拆式美髮梳 X1', isCompleted: false },
          { id: 'd2-3-c3', text: '腰間防盜小包/灰 X1', isCompleted: false },
          { id: 'd2-4-c4', text: '外套掛帶/白 X2｜黑 X1', isCompleted: false },
          { id: 'd2-4-c5', text: 'LED隨身鏡 X2', isCompleted: false },
          { id: 'd2-4-c6', text: 'LED桌上立鏡 X1', isCompleted: false }
        ]
    },
    { 
        id: 'd2-5', date: '2026-01-05', time: '11:30', displayTime: '', title: '靴下屋', 
        location: '大阪', category: '購物', categoryColor: 'orange',
        businessHours: '11:00 - 21:00',
        isCompleted: false,
        mapUrl: 'https://www.google.com/maps'
    },
    { 
        id: 'd2-6', date: '2026-01-05', time: '12:30', displayTime: '', title: 'Uniqlo', 
        location: '大阪', category: '購物', categoryColor: 'orange',
        description: '防寒衣物、花花發熱長袖',
        isCompleted: false,
        mapUrl: 'https://www.google.com/maps',
        checkList: [
          { id: 'd2-6-c1', text: '[妹代購] 花邊發熱衣/M/白黑淺灰 X1（或者一般黑 X3）', isCompleted: false },
          { id: 'd2-6-c2', text: '[ISA] 花邊發熱衣/M/白黑 X1', isCompleted: false }
        ]
    },
    { 
        id: 'd2-orange', date: '2026-01-05', time: '13:00', displayTime: '', 
        title: 'Orangeなんばパークス店', 
        location: '大阪 (難波 Parks)', category: '購物', categoryColor: 'orange',
        description: '(HORINISHI 調味料的品牌旗艦店)',
        businessHours: '11:00 - 21:00',
        isCompleted: false,
        mapUrl: 'https://maps.app.goo.gl/489Kzru8PtD8ySou8'
    },
    { 
        id: 'd2-7', date: '2026-01-05', time: '14:00', displayTime: '', title: '淺草茶屋たばねのし', 
        location: '大阪 (難波)', category: '下午茶', categoryColor: 'blue',
        description: '可麗餅、抹茶拿鐵',
        businessHours: '11:30 - 21:00',
        isCompleted: false,
        mapUrl: 'https://maps.app.goo.gl/1Rx3JmBJCNg7nvrz5'
    },
    { 
        id: 'd2-8', date: '2026-01-05', time: '16:00', displayTime: '',
        title: '阿倍野 Harukas', 
        location: '大阪 (阿倍野)', category: '購物', categoryColor: 'orange',
        description: '(3F ANAYI)',
        businessHours: '10:00 - 20:30',
        isCompleted: false,
        mapUrl: 'https://maps.app.goo.gl/DX9Pnu4FkMAwf55t8',
        checkList: [
          { id: 'd2-8-anayi', text: '[ANAYI] 印花摺襉抓皺傘狀裙', isCompleted: false }
        ]
    },
    { 
        id: 'd2-9', date: '2026-01-05', time: '18:00', displayTime: '18:00',
        title: '牛舌的檸檬 大阪本店', 
        location: '大阪 (心斎橋)', category: '晚餐', categoryColor: 'red',
        isCompleted: false, isGoogle: true,
        mapUrl: 'https://maps.app.goo.gl/XyLM17JrCuZr45mt8'
    },
    { 
        id: 'd2-10', date: '2026-01-05', time: '20:00', displayTime: '', title: '唐吉軻德', 
        location: '大阪 (心斎橋)', category: '購物', categoryColor: 'orange',
        businessHours: '24H',
        isCompleted: false,
        mapUrl: 'https://www.google.com/maps',
        checkList: [
          { id: 'd2-10-c1', text: '鼻炎過敏藥 X2', isCompleted: false },
          { id: 'd2-10-c2', text: 'Pro感冒藥 X3-4', isCompleted: false },
          { id: 'd2-10-c3', text: '結膜炎眼藥水 X3', isCompleted: false },
          { id: 'd2-10-c4', text: 'KUMARGIC EYE 黑眼圈專用眼霜 X1', isCompleted: false }
        ]
    },
    { 
        id: 'd2-11', date: '2026-01-05', time: '21:00', displayTime: '', title: '藥妝店', 
        location: '大阪', category: '購物', categoryColor: 'orange',
        description: '量車藥、感冒藥、過敏藥補貨',
        isCompleted: false,
        mapUrl: 'https://www.google.com/maps',
        checkList: [
          { id: 'd2-11-c1', text: '鼻炎過敏藥 X2', isCompleted: false },
          { id: 'd2-11-c2', text: 'Pro感冒藥 X3-4', isCompleted: false },
          { id: 'd2-11-c3', text: '結膜炎眼藥水 X3', isCompleted: false },
          { id: 'd2-11-c4', text: 'KUMARGIC EYE 黑眼圈專用眼霜 X1', isCompleted: false }
        ]
    },
    { 
        id: 'd3-1', date: '2026-01-06', time: '11:00', displayTime: '', 
        title: 'Tart Square', location: '大阪 (堀江)', category: '早午餐', categoryColor: 'green',
        description: '和牛鹹塔/甜食塔',
        businessHours: '11:00 - 19:00', isCompleted: false,
        mapUrl: 'https://maps.app.goo.gl/iKP9MLJs7AbywHKQ8'
    },
    { 
        id: 'd3-2', date: '2026-01-06', time: '11:30', displayTime: '', title: 'LiLo Coffee Roasters', 
        location: '大阪 (心斎橋)', category: '外帶咖啡', categoryColor: 'blue',
        description: '咖啡廳 | 現金Only',
        isCompleted: false,
        mapUrl: 'https://maps.app.goo.gl/kr7uR73TsLyrguqRA'
    },
    { 
        id: 'd3-3', date: '2026-01-06', time: '12:00', displayTime: '', 
        title: 'エモジ', location: '大阪 (松屋町)', category: '購物', categoryColor: 'orange',
        description: '御朱印帳、集章冊',
        businessHours: '12:00 - 18:00', isCompleted: false,
        mapUrl: 'https://maps.app.goo.gl/MHT3xD2ZRB9dz8E46',
        checkList: [
          { id: 'd3-3-c1', text: '御朱印帳 X1-2', isCompleted: false },
          { id: 'd3-3-c2', text: '集章冊 X2-3', isCompleted: false }
        ]
    },
    { 
        id: 'd3-4', date: '2026-01-06', time: '13:00', displayTime: '', title: '難波八阪神社', 
        location: '大阪 (難波)', category: '景點', categoryColor: 'purple',
        businessHours: '06:30 - 17:00',
        isCompleted: false,
        mapUrl: 'https://maps.app.goo.gl/ZgiFUDhiTbZUhQvk8'
    },
    { 
        id: 'd3-5', date: '2026-01-06', time: '14:30', displayTime: '', title: 'COLONY by EQI', 
        location: '心斎橋アメ村店', category: '下午茶', categoryColor: 'blue',
        description: '舒芙蕾',
        businessHours: '11:00 - 23:00',
        isCompleted: false,
        mapUrl: 'https://maps.app.goo.gl/eZc5Hi3E5zW9A4sX6'
    },
    { 
        id: 'd3-6', date: '2026-01-06', time: '16:00', displayTime: '', title: '道頓堀大觀覽車', 
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
        id: 'd3-8', date: '2026-01-06', time: '20:00', displayTime: '', title: '超商購買明日早餐', 
        location: '大阪', category: '一般', categoryColor: 'gray',
        isCompleted: false,
        mapUrl: 'https://www.google.com/maps'
    },
    { 
        id: 'd4-1', date: '2026-01-07', time: '08:00', displayTime: '', title: '超商早餐', 
        location: '環球影城', category: '早餐', categoryColor: 'green',
        isCompleted: false, isKlook: false,
        mapUrl: 'https://www.google.com/maps'
    },
    { 
        id: 'd4-2', date: '2026-01-07', time: '09:00', displayTime: '', title: '好萊塢美夢·乘車遊~逆轉世界~', 
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
        id: 'd4-5', date: '2026-01-07', time: '15:00', displayTime: '15:30\n16:00',
        title: '咚奇剛的瘋狂礦車™', location: 'USJ', category: 'Express', categoryColor: 'red',
        isCompleted: false, isKlook: true,
        mapUrl: 'https://maps.app.goo.gl/m6eZWZhHxoUsrnha8'
    },
    { 
        id: 'd4-6', date: '2026-01-07', time: '18:00', displayTime: '',
        title: '燃えよ麺助', location: '大阪 (福島)', category: '晚餐', categoryColor: 'green',
        description: '蔥鴨拉麵、金色貝拉麵',
        businessHours: '18:00 - 21:00', isCompleted: false,
        mapUrl: 'https://maps.app.goo.gl/qKVRK9EiqsuWwL5k7'
    },
    { 
        id: 'd5-1', date: '2026-01-08', time: '12:00', displayTime: '', 
        title: 'ろじうさぎ (Roji Usagi)', location: '京都 (宮川町)', category: '早午餐', categoryColor: 'green',
        description: '日式料理',
        businessHours: '12:00 - 15:30', isCompleted: false,
        mapUrl: 'https://maps.app.goo.gl/uJkpfNgAksJ5cWeM7'
    },
    { 
        id: 'd5-2', date: '2026-01-08', time: '13:30', displayTime: '', title: '湯葉チーズ本舗', 
        location: '京都 (嵐山)', category: '點心', categoryColor: 'blue',
        description: '炸豆皮起司',
        businessHours: '11:00 - 17:30',
        isCompleted: false,
        mapUrl: 'https://maps.app.goo.gl/Mgt5YJiAe2frMuYo6'
    },
    { 
        id: 'd5-3', date: '2026-01-08', time: '14:30', displayTime: '', title: '天龍寺', 
        location: '京都 (嵐山)', category: '景點', categoryColor: 'purple',
        businessHours: '08:30 - 17:00',
        isCompleted: false,
        mapUrl: 'https://maps.app.goo.gl/AkXiyUDh8qDgMTGj8'
    },
    { 
        id: 'd5-4', date: '2026-01-08', time: '15:30', displayTime: '', title: '嵯峨野竹林小徑', 
        location: '京都 (嵐山)', category: '景點', categoryColor: 'purple',
        isCompleted: false,
        mapUrl: 'https://maps.app.goo.gl/x83m24TFXFNjCe8y5'
    },
    { 
        id: 'd5-5', date: '2026-01-08', time: '15:30', displayTime: '', title: '野宮神社', 
        location: '京都 (嵐山)', category: '景點', categoryColor: 'purple',
        isCompleted: false,
        mapUrl: 'https://maps.app.goo.gl/q7fRDitmuVnYtKbu8'
    },
    { 
        id: 'd5-6', date: '2026-01-08', time: '16:30', displayTime: '', title: '常寂光寺', 
        location: '京都 (嵐山)', category: '景點', categoryColor: 'purple',
        isCompleted: false,
        mapUrl: 'https://maps.app.goo.gl/xiiuvrhTuuvVWmAD9'
    },
    { 
        id: 'd5-isetan', date: '2026-01-08', time: '17:30', displayTime: '',
        title: 'JR 京都伊勢丹', location: '京都 (下京區)', category: '購物', categoryColor: 'orange',
        description: '(4F ANAYI)',
        businessHours: '10:00 - 20:00', isCompleted: false,
        mapUrl: 'https://maps.app.goo.gl/U2Nc7Up9AAjWjBGU7',
        checkList: [
          { id: 'd5-isetan-anayi', text: '[ANAYI] 印花摺襉抓皺傘狀裙', isCompleted: false }
        ]
    },
    { 
        id: 'd5-7', date: '2026-01-08', time: '19:00', displayTime: '19:00',
        title: '京都力山 京都站前店', location: '京都 (下京區)', category: '晚餐', categoryColor: 'red',
        description: '很貴的和牛壽喜燒',
        isCompleted: false, isGoogle: true,
        mapUrl: 'https://maps.app.goo.gl/KzHuQyJdRQKDNHF7'
    },
    { 
        id: 'd6-1', date: '2026-01-09', time: '10:00', displayTime: '', title: '今宮戎神社', 
        location: '大阪 (浪速區)', category: '景點', categoryColor: 'purple',
        description: '中午前會有獻鯛儀式',
        businessHours: '09:00 - 17:00',
        isCompleted: false,
        mapUrl: 'https://maps.app.goo.gl/Sww1UwU92RM9SPvQ7'
    },
    { 
        id: 'd6-3', date: '2026-01-09', time: '11:00', displayTime: '', 
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
    { 
        id: 'd7-1', date: '2026-01-10', time: '10:30', displayTime: '', 
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
        id: 'd7-dutyfree', date: '2026-01-10', time: '06:30', displayTime: '',
        title: '關西國際機場直營免稅店', 
        location: '關西機場', category: '提貨', categoryColor: 'red',
        description: '(KIX DUTY FREE)\n＊具體位置： 過了證照查驗（移民官）後，您會先看到一整區很大的免稅店。請尋找掛有 **"WEB ORDER PICK UP"** (網路訂購取貨) 招牌的專屬櫃檯。\n＊通常是在您搭乘「接駁電車 (Wing Shuttle)」前往登機門**之前**的區域。請務必先領貨再搭車去登機口！',
        businessHours: '06:30 - 00:25', isCompleted: false,
        mapUrl: 'https://www.kixdutyfree.jp/tw/store-info.html',
        checkList: [
          { id: 'd7-df-c1', text: '[DIOR] 粉漾緹花頰彩棒 #012 玫瑰粉 X1', isCompleted: false },
          { id: 'd7-df-c2', text: '[DIOR] 豐漾俏唇蜜 #012 玫瑰木 X1', isCompleted: false },
          { id: 'd7-df-c3', text: '[DIOR] 癮誘粉漾潤唇膏 #012 玫瑰木 X1', isCompleted: false },
          { id: 'd7-df-c4', text: '[CLARINS] 彈潤植萃美唇油 #01 Honey X4', isCompleted: false },
          { id: 'd7-df-c5', text: '[Jo Malone London] 英國梨與小蒼蘭護手霜 30ml X2', isCompleted: false }
        ]
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
  ],
  bookings: [
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
  ]
};