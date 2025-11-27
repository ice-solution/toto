import { ServiceItem, CourseItem, MemberTier, ProductItem, BlogPost } from './types';

// Updated Membership Tiers with new VIP tier
export const MEMBERSHIP_TIERS: MemberTier[] = [
  {
    id: 'love',
    name: '「愛心」會員',
    price: 6800,
    color: '#e5baba', 
    discount: 0.9,
    pointsMultiplier: 1,
    features: [
      '風水檢測服務 1次',
      '玄學問答會議 2次',
      '傳統祭祀儀式 1次',
      '個人儀式及課程 9折'
    ]
  },
  {
    id: 'total-care',
    name: '「全面貼心」會員',
    price: 9800,
    color: '#d4c4a8',
    discount: 0.85,
    pointsMultiplier: 1.2,
    isPopular: true,
    features: [
      '流年運程占卜 1次',
      '風水檢測服務 1次',
      '玄學問答會議 4次',
      '傳統祭祀儀式 1次',
      '個人儀式及課程 85折'
    ]
  },
  {
    id: 'supreme',
    name: '「萬事俱有滔滔」會員',
    price: 12800,
    color: '#8b5a2b', 
    discount: 0.8,
    pointsMultiplier: 1.5,
    features: [
      '流年占卜檢測 2次',
      '風水設計服務 (全套)',
      '玄學問答會議 12次',
      '傳統祭祀儀式 3次',
      '個人儀式及課程 8折'
    ]
  },
  {
    id: 'the-one',
    name: '「尊貴傳承」體驗',
    price: 38000,
    color: '#000000', 
    discount: 0.7,
    pointsMultiplier: 2.0,
    features: [
      '杜師傅一對一私人顧問 (全年)',
      '企業級風水戰略佈局',
      '私人定製高階法事無限次諮詢',
      '獲邀出席年度閉門晚宴',
      '所有靈物與課程 7折'
    ]
  }
];

// Full Services List from JSON
export const SERVICES: ServiceItem[] = [
  { id: 's1', name: '和合法事', price: 6800, category: '感情修復', description: '恢復和增強男女感情姻緣，分為愛情、夫妻、六親和合。', imageUrl: 'https://picsum.photos/id/1011/400/400', tags: ['感情', '姻緣'], instagramUrl: 'https://www.instagram.com/p/C3SBLn3BECq/' },
  { id: 's2', name: '關係修復儀式', price: 6800, category: '關係修復', description: '基於六壬法術，修補情侶、夫妻、朋友、家人、職場關係。', imageUrl: 'https://picsum.photos/id/1012/400/400', tags: ['人際', '家庭'], instagramUrl: 'https://www.instagram.com/p/DAgH4pWBKk5/' },
  { id: 's3', name: '情侶和合儀式', price: 6800, category: '感情修復', description: '使用草人綁紅線，調和能量，化解矛盾，挽回感情或增進關係。', imageUrl: 'https://picsum.photos/id/1013/400/400', tags: ['感情', '挽回'], instagramUrl: 'https://www.instagram.com/p/DK_iQxfBubh/' },
  { id: 's4', name: '童子和合儀式', price: 6800, category: '感情修復', description: '藉助和合童子力量，化解感情障礙，增強吸引力，適合暗戀、冷戰。', imageUrl: 'https://picsum.photos/id/1014/400/400', tags: ['暗戀', '人緣'], instagramUrl: 'https://www.instagram.com/p/DNaq4rNBCBM/' },
  { id: 's5', name: '月老紅線儀式', price: 6800, category: '姻緣感情', description: '祈求月老牽線，尋找愛情，協助連結心儀對象的紅線。', imageUrl: 'https://picsum.photos/id/1015/400/400', tags: ['姻緣', '脫單'], instagramUrl: 'https://www.instagram.com/p/C9aAcwmBx1S/' },
  { id: 's6', name: '催婚儀式', price: 6800, category: '姻緣感情', description: '針對婚姻遲滯者，化解阻礙，促進因緣到來，加速婚姻時機成熟。', imageUrl: 'https://picsum.photos/id/1016/400/400', tags: ['婚姻', '成家'], instagramUrl: 'https://www.instagram.com/p/DHB0HisBP8R/' },
  { id: 's7', name: '五路財神開運儀式', price: 6800, category: '招財', description: '祭拜五路財神（青龍、白虎、朱雀、玄武、黃龍）的招財儀式。', imageUrl: 'https://picsum.photos/id/1018/400/400', tags: ['正財', '事業'], instagramUrl: 'https://www.instagram.com/p/C4Z-sNhBxFj/' },
  { id: 's8', name: '趙公明偏財運儀式', price: 6800, category: '招財偏財', description: '專門提升非固定收入（偏財運），祈求趙公明財神加持。', imageUrl: 'https://picsum.photos/id/1019/400/400', tags: ['偏財', '投資'], instagramUrl: 'https://www.instagram.com/p/C_iTqIhhj2T/' },
  { id: 's9', name: '金屋置富儀式', price: 8800, category: '招財風水', description: '結合法事與客製化風水陣，專為店舖、企業主提升財運、穩固財庫。', imageUrl: 'https://picsum.photos/id/1020/400/400', tags: ['商業', '置業'], instagramUrl: 'https://www.instagram.com/p/DEXFIJFBxME/' },
  { id: 's10', name: '接財神儀式', price: 3888, category: '招財', description: '農曆正月初五（破五）或指定吉日接五路財神，調整財運能量場。', imageUrl: 'https://picsum.photos/id/1021/400/400', tags: ['節慶', '接財神'], instagramUrl: 'https://www.instagram.com/p/DE6oUlGBRYM/' },
  { id: 's11', name: '金貓點睛儀式', price: 3888, category: '招財法器', description: '將招財貓敕造為持續運作的招財法器，結合風水檢測。', imageUrl: 'https://picsum.photos/id/1022/400/400', tags: ['法器', '招財貓'], instagramUrl: 'https://www.instagram.com/p/DLESpZrBpAR/' },
  { id: 's12', name: '補財富儀式', price: 6800, category: '財庫鞏固', description: '補足天庫、地庫、水庫，確保財富完整，防止流失。', imageUrl: 'https://picsum.photos/id/1023/400/400', tags: ['補財庫', '積蓄'], instagramUrl: 'https://www.instagram.com/p/C7uMuHYhINL/' },
  { id: 's13', name: '制耗財儀式', price: 6800, category: '守財防破', description: '專門「守財」和「護財」，防範意外支出、阻擋小人、穩固財庫。', imageUrl: 'https://picsum.photos/id/1024/400/400', tags: ['守財', '防小人'], instagramUrl: 'https://www.instagram.com/p/DNX6cttBZmk/' },
  { id: 's14', name: '甲辰龍年開運儀式', price: 3888, category: '流年開運', description: '龍年專屬道家開運儀式，包括開運符咒、龍年福袋、祈福能量牌仔。', imageUrl: 'https://picsum.photos/id/1025/400/400', tags: ['流年', '太歲'], instagramUrl: 'https://www.instagram.com/p/C38QhpzhGPY/' },
  { id: 's15', name: '乙巳蛇年開運儀式', price: 3888, category: '流年開運', description: '2025蛇年專屬開運儀式，化解煞氣，提升運勢，敬拜吳遂星君。', imageUrl: 'https://picsum.photos/id/1026/400/400', tags: ['流年', '蛇年'], instagramUrl: 'https://www.instagram.com/p/DDl9XW1hmDR/' },
  { id: 's16', name: '乙巳蛇年七夕情人儀式', price: 3888, category: '流年姻緣', description: '2025七夕專屬儀式，催旺桃花，和合夫妻，增添整體好運。', imageUrl: 'https://picsum.photos/id/1027/400/400', tags: ['節慶', '愛情'], instagramUrl: 'https://www.instagram.com/reel/DNue3sR5Kn4/' },
  { id: 's17', name: '乙巳年秋分儀式', price: 3888, category: '節氣財庫', description: '金氣歸庫（止漏補庫）與還受生債，校準後續一季的節奏。', imageUrl: 'https://picsum.photos/id/1028/400/400', tags: ['節氣', '還債'], instagramUrl: 'https://www.instagram.com/p/DOSPuaFkrcv/' },
  { id: 's18', name: '甲辰年驚蟄儀式', price: 3888, category: '節氣化煞', description: '驚蟄節氣儀式，重點在於「打小人」（去除邪惡能量）。', imageUrl: 'https://picsum.photos/id/1029/400/400', tags: ['驚蟄', '打小人'], instagramUrl: 'https://www.instagram.com/p/C4FbgSlhC7d/' },
  { id: 's19', name: '小型制煞儀式', price: 6800, category: '驅邪制煞', description: '制箝「煞」的負面能量場，分類詳述天煞、地煞、人煞等八種煞氣。', imageUrl: 'https://picsum.photos/id/1031/400/400', tags: ['制煞', '淨化'], instagramUrl: 'https://www.instagram.com/p/DENjGP7hs-N/' },
  { id: 's20', name: '大型制煞儀式', price: 8800, category: '驅邪制煞', description: '專業驅除天煞、地煞、魔煞等十大類煞氣，保護身心與運勢穩定。', imageUrl: 'https://picsum.photos/id/1032/400/400', tags: ['制煞', '重煞'], instagramUrl: 'https://www.instagram.com/p/DL9wZaQhFod/' },
  { id: 's21', name: '八仙儀式', price: 8800, category: '驅邪制煞', description: '借用八仙神力，化解流年煞氣、病痛、財運煞、官非等。', imageUrl: 'https://picsum.photos/id/1033/400/400', tags: ['八仙', '全能'], instagramUrl: 'https://www.instagram.com/reel/DOB3m4CkiFW/' },
  { id: 's22', name: '小生基儀式', price: 8800, category: '轉運化解', description: '營造假死現象轉運，小型生基，改善三年大運。', imageUrl: 'https://picsum.photos/id/1035/400/400', tags: ['生基', '轉運'], instagramUrl: 'https://www.instagram.com/p/DIDUZtBBnyw/' },
  { id: 's23', name: '送舊迎新儀式', price: 8800, category: '轉運淨化', description: '「送衰神，招福氣」儀式，清理負能量，轉運吉祥。', imageUrl: 'https://picsum.photos/id/1036/400/400', tags: ['淨化', '迎新'], instagramUrl: 'https://www.instagram.com/p/DBgoB7BhEW7/' },
  { id: 's24', name: '斬斷儀式', price: 8800, category: '關係淨化', description: '斬斷不健康的情感糾纏（爛桃花），驅趕小人，化解業障。', imageUrl: 'https://picsum.photos/id/1037/400/400', tags: ['斬桃花', '斷捨離'], instagramUrl: 'https://www.instagram.com/p/DCbR71UBbbB/' },
  { id: 's25', name: '觀音治病儀式', price: 8800, category: '健康調理', description: '針對業障病/邪病，隔空過功、符水調理身心靈。', imageUrl: 'https://picsum.photos/id/1038/400/400', tags: ['健康', '祝由'], instagramUrl: 'https://www.instagram.com/p/DPwETnTknvv/' },
  { id: 's26', name: '禮斗轉運儀式', price: 6800, category: '趨吉避凶', description: '敬拜北斗七星與南斗六星星君，祈求消災、延壽、增福。', imageUrl: 'https://picsum.photos/id/1039/400/400', tags: ['延壽', '祈福'], instagramUrl: 'https://www.instagram.com/p/DF4zdGbhrh9/' },
  { id: 's27', name: '個人七星燈供養', price: 3888, category: '延壽消災', description: '供奉北斗七星，消除業障、延壽、化解厄運，可個人化設計。', imageUrl: 'https://picsum.photos/id/1040/400/400', tags: ['點燈', '七星'], instagramUrl: 'https://www.instagram.com/p/DGcwLRbhxP7/' },
  { id: 's28', name: '火轉經輪供養', price: '1111', category: '祈福點燈', description: '每月持續點燈（光明燈、財神燈、藥王燈、月老燈），30天持續加持。', imageUrl: 'https://picsum.photos/id/1041/400/400', tags: ['經輪', '長期'], instagramUrl: 'https://www.instagram.com/p/DGzzYUBBa90/' },
  { id: 's29', name: '文昌儀式', price: 6800, category: '事業學業', description: '敬拜文昌帝君，提升學業、智慧、文運與考試運勢。', imageUrl: 'https://picsum.photos/id/1042/400/400', tags: ['學業', '升職'], instagramUrl: 'https://www.instagram.com/p/DGPwRtZBLTK/' },
  { id: 's30', name: '開源儀式', price: 6800, category: '業務人緣', description: '調整能量場，吸引優質客源，提升人緣運勢，極大化洽談成功率。', imageUrl: 'https://picsum.photos/id/1043/400/400', tags: ['業務', '客源'], instagramUrl: 'https://www.instagram.com/p/DJCXrb8BraG/' },
  { id: 's31', name: '職人聘請儀式', price: 6800, category: '事業人緣', description: '高級文昌科儀，助老闆精準識才，助求職者增強面試運與貴人運。', imageUrl: 'https://picsum.photos/id/1044/400/400', tags: ['招聘', '面試'], instagramUrl: 'https://www.instagram.com/p/DMYQCNYBUky/' },
  { id: 's32', name: '事業轉運儀式', price: 6800, category: '事業發展', description: '調整氣場，化解職場負能量，增加貴人運，助突破職業瓶頸。', imageUrl: 'https://picsum.photos/id/1045/400/400', tags: ['轉運', '職場'], instagramUrl: 'https://www.instagram.com/p/C_pkh-phFUU/' },
  { id: 's33', name: '官非勝訟儀式', price: 8800, category: '訴訟批核', description: '化解官非訴訟，調整氣場，吸引正面支持，適用於移民、批核、糾紛等。', imageUrl: 'https://picsum.photos/id/1047/400/400', tags: ['官非', '移民'], instagramUrl: 'https://www.instagram.com/p/DK02Uw3BpaL/' },
  { id: 's34', name: '壞帳追收儀式', price: 8800, category: '財務訴訟', description: '追收欠款，化解債務壓力，回收流失財富能量。', imageUrl: 'https://picsum.photos/id/1048/400/400', tags: ['追債', '財務'], instagramUrl: 'https://www.instagram.com/p/DHcKb9XBeLq/' },
  { id: 's35', name: '新屋入伙儀式連風水', price: 8800, category: '家宅風水', description: '專業拜四角，淨化氣場，催旺家宅財運與和諧。', imageUrl: 'https://picsum.photos/id/1049/400/400', tags: ['入伙', '拜四角'], instagramUrl: 'https://www.instagram.com/p/DLWz0LLhArN/' },
  { id: 's36', name: '魯班動土儀式', price: 8800, category: '工程平安', description: '工程動工前祭拜魯班祖師，祈求工程順利、工人安全、風水能量改善。', imageUrl: 'https://picsum.photos/id/1050/400/400', tags: ['動土', '裝修'], instagramUrl: 'https://www.instagram.com/p/DH8Mrd-BpsV/' },
  { id: 's37', name: '甲辰盂蘭節儀式', price: 3888, category: '超度化解', description: '冤親債主清送儀式，幫助亡靈解脫，平息冤屈，為生者帶來祝福。', imageUrl: 'https://picsum.photos/id/1051/400/400', tags: ['盂蘭', '超度'], instagramUrl: 'https://www.instagram.com/p/C9Ht-lDhO_n/' },
  { id: 's38', name: '超度亡魂儀式', price: 8800, category: '超度護陰', description: '消除已故靈魂業力，幫助其進入下一循環，同時安撫生者心靈。', imageUrl: 'https://picsum.photos/id/1052/400/400', tags: ['超度', '法事'], instagramUrl: 'https://www.instagram.com/p/C7JCRVBBTL8/' },
  { id: 's39', name: '冤親還債儀式', price: 1880, category: '超度化解', description: '盂蘭節期間超度，套裝制，處理累劫冤親債主。', imageUrl: 'https://picsum.photos/id/1053/400/400', tags: ['還債', '消業'], instagramUrl: '' },
  { id: 's40', name: '甲辰年下元節儀式', price: 3888, category: '節氣補財', description: '農曆十月十五祭拜水官大帝，補財庫、消災解厄，特別提醒犯太歲者。', imageUrl: 'https://picsum.photos/id/1054/400/400', tags: ['下元節', '水官'], instagramUrl: 'https://www.instagram.com/p/DCUXIZOhj4B/' },
  { id: 's41', name: '人緣儀式', price: 6800, category: '人際關係', description: '提升社交與人際關係助力，吸引好感，建立穩固感情關係或改善職場形象。', imageUrl: 'https://picsum.photos/id/1055/400/400', tags: ['人緣', '社交'], instagramUrl: 'https://www.instagram.com/p/C_MLoA4B2QW/' },
  { id: 's42', name: '乙巳年太陰寶誕祭月', price: 688, category: '姻緣美貌', description: '中秋節線上法會，太陰星君加持，提升魅力、人緣、婚姻美滿。', imageUrl: 'https://picsum.photos/id/1056/400/400', tags: ['太陰', '美容'], instagramUrl: 'https://www.instagram.com/p/DPVocx1EulR/' },
  { id: 's43', name: '新店開張儀式', price: 8800, category: '業務開市', description: '擇吉日進行，激活店鋪磁場，招財旺運，保佑平安。', imageUrl: 'https://picsum.photos/id/1057/400/400', tags: ['開張', '旺舖'], instagramUrl: 'https://www.instagram.com/p/DOgtfPlEggz/' }
];

// Full Courses List from JSON
export const COURSES: CourseItem[] = [
  { id: 'c1', name: '六壬課程入門簡介班', price: 3888, duration: '兩天', level: '入門', description: '認識體系、十三主神明、八大神咒應用。', imageUrl: 'https://picsum.photos/id/1059/400/400', instagramUrl: 'https://www.instagram.com/p/DEjW1yTBJep/' },
  { id: 'c2', name: '六壬符籙初階課程', price: 8600, duration: '詳見介紹', level: '初階', description: '掌握基礎手印、花字、啟蒙儀式，建立基本保護能力。', imageUrl: 'https://picsum.photos/id/1060/400/400', instagramUrl: 'https://www.instagram.com/p/C1SDCGShgoE/' },
  { id: 'c3', name: '六壬符籙進階課程', price: 10800, duration: '詳見介紹', level: '進階', description: '學習聖杯占卜、符水製作，處理化太歲、拜四角等。', imageUrl: 'https://picsum.photos/id/1061/400/400', instagramUrl: 'https://www.instagram.com/p/C35ZUomhKcD/' },
  { id: 'c4', name: '六壬符籙高階課程', price: 16800, duration: '詳見介紹', level: '高階', description: '具備獨當一面師傅資格，可靈活運用大部份符咒，執行治病、驅邪等法事。', imageUrl: 'https://picsum.photos/id/1062/400/400', instagramUrl: 'https://www.instagram.com/p/C6MTXbhBW-N/' },
  { id: 'c5', name: '六壬神功課程 (總覽)', price: 0, duration: '詳見介紹', level: '總覽', description: '介紹歷史淵源、傳承（伏英舘等）、核心實踐。', imageUrl: 'https://picsum.photos/id/1063/400/400', instagramUrl: 'https://www.instagram.com/p/DLP8bFEBkSK/' },
  { id: 'c6', name: '生命之光 - 初階', price: 3800, duration: '課程', level: '初階', description: '連接能量源頭、五個初階符號、雙手療癒技巧。', imageUrl: 'https://picsum.photos/id/1064/400/400', instagramUrl: 'https://www.instagram.com/p/C5V25Ieh3lR/' },
  { id: 'c7', name: '生命之光 - 中階', price: 4800, duration: '課程', level: '中階', description: '學習六個中階符號、Sekhem遙距療癒方法。', imageUrl: 'https://picsum.photos/id/1065/400/400', instagramUrl: '' },
  { id: 'c8', name: '生命之光 - 療癒師進階', price: 5200, duration: '課程', level: '進階', description: '直接連接個案靈性中心，增強接觸能量源頭的能力。', imageUrl: 'https://picsum.photos/id/1066/400/400', instagramUrl: '' },
  { id: 'c9', name: '生命之光 - 大師階段', price: 13000, duration: '課程', level: '大師', description: '認識八個大師符號、深度冥想與修行。', imageUrl: 'https://picsum.photos/id/1067/400/400', instagramUrl: '' },
  { id: 'c10', name: '生命之光 - 導師階段', price: 12000, duration: '課程', level: '導師', description: '學習最終級別符號，可立即開課與進行能量啟動。', imageUrl: 'https://picsum.photos/id/1068/400/400', instagramUrl: '' },
  { id: 'c11', name: '生命數字課程（初階班）', price: 6000, duration: '四堂', level: '基礎', description: '掌握1-9數字特質、命盤計算、了解人生課題。', imageUrl: 'https://picsum.photos/id/1069/400/400', instagramUrl: 'https://www.instagram.com/p/C7cPIPXBjVx/' },
  { id: 'c12', name: '生命數字課程（高階班）', price: 6800, duration: '五堂', level: '進階', description: '學習合併數、靈魂等級推斷、流年數字與風水化解。', imageUrl: 'https://picsum.photos/id/1070/400/400', instagramUrl: 'https://www.instagram.com/p/C7jT73aSD6I/' },
  { id: 'c13', name: '易經塔羅課程', price: 6000, duration: '五堂', level: '中階', description: '結合易經六十四卦，掌握時間/空間卦等實戰牌陣。', imageUrl: 'https://picsum.photos/id/1071/400/400', instagramUrl: 'https://www.instagram.com/p/DMvKJWFBbu0/' },
  { id: 'c14', name: '專業塔羅班', price: 12000, duration: '十二堂', level: '專業', description: '教授「通靈塔羅」，結合卡巴拉、生命數字、風水等多元解讀與改運技巧。', imageUrl: 'https://picsum.photos/id/1072/400/400', instagramUrl: 'https://www.instagram.com/p/CfLpz9Yh6q5/' },
  { id: 'c15', name: '師徒塔羅班', price: 1280, duration: '每月四課', level: '師徒', description: '師徒制深度培養，內容持續更新（如魔法儀式、脈輪），需面試。', imageUrl: 'https://picsum.photos/id/1073/400/400', instagramUrl: 'https://www.instagram.com/p/C_SkmO-hc4W/' },
  { id: 'c16', name: '亞卡西紀錄初階-「連結」', price: 6000, duration: '五堂', level: '初階', description: '開啟個人及他人阿卡西記錄、連結多維能量、靈魂家族/業力關係解讀。', imageUrl: 'https://picsum.photos/id/1074/400/400', instagramUrl: 'https://www.instagram.com/p/C60Nw9xh7RW/' },
  { id: 'c17', name: '亞卡西紀錄高階-「療癒」', price: 6800, duration: '五堂', level: '高階', description: '赫爾墨斯七大法則應用、神聖幾何能量點化、解除靈魂契約。', imageUrl: 'https://picsum.photos/id/1075/400/400', instagramUrl: 'https://www.instagram.com/p/C61aVp5BFZm/' },
  { id: 'c18', name: '亞卡西紀錄導師-「傳承」', price: 13333, duration: '五堂', level: '導師', description: '高維揚升、星際大師能量、深層療癒技藝、導師培訓。', imageUrl: 'https://picsum.photos/id/1076/400/400', instagramUrl: 'https://www.instagram.com/p/C64Xf5NBCsD/' }
];

// 5 Series x 12 Items (Generated Concepts)
export const PRODUCTS: ProductItem[] = [
  // 1. Imperial Wealth (帝王招財)
  ...Array.from({ length: 12 }).map((_, i) => ({
    id: `p-wealth-${i}`,
    name: `帝王招財金龍聚寶盆 Type-${String.fromCharCode(65+i)}`,
    price: 3888 + (i * 100),
    series: '帝王招財系列',
    description: '採集天地靈氣，經過七七四十九天法事加持，為您的企業與家庭帶來滾滾財源。',
    imageUrl: `https://picsum.photos/id/${200+i}/400/400`
  })),
  // 2. Romance & Harmony (桃花人緣)
  ...Array.from({ length: 12 }).map((_, i) => ({
    id: `p-love-${i}`,
    name: `月老紅線粉晶陣 Type-${String.fromCharCode(65+i)}`,
    price: 1888 + (i * 50),
    series: '桃花人緣系列',
    description: '增強個人魅力磁場，修復關係裂痕，吸引正緣桃花。',
    imageUrl: `https://picsum.photos/id/${300+i}/400/400`
  })),
  // 3. Guardian Protection (鎮宅辟邪)
  ...Array.from({ length: 12 }).map((_, i) => ({
    id: `p-protect-${i}`,
    name: `黑曜石鎮宅神獸 Type-${String.fromCharCode(65+i)}`,
    price: 2888 + (i * 80),
    series: '鎮宅辟邪系列',
    description: '強力化解居家煞氣，阻擋負能量入侵，保佑家宅平安。',
    imageUrl: `https://picsum.photos/id/${400+i}/400/400`
  })),
  // 4. Wisdom & Academic (文昌智慧)
  ...Array.from({ length: 12 }).map((_, i) => ({
    id: `p-wisdom-${i}`,
    name: `九層文昌塔 - 智慧版 Type-${String.fromCharCode(65+i)}`,
    price: 1688 + (i * 60),
    series: '文昌智慧系列',
    description: '開啟智慧脈輪，提升專注力與記憶力，助學業事業步步高陞。',
    imageUrl: `https://picsum.photos/id/${500+i}/400/400`
  })),
  // 5. Holistic Healing (身心療癒)
  ...Array.from({ length: 12 }).map((_, i) => ({
    id: `p-heal-${i}`,
    name: `靈氣淨化水晶組 Type-${String.fromCharCode(65+i)}`,
    price: 2288 + (i * 70),
    series: '身心療癒系列',
    description: '平衡七輪能量，釋放壓力與焦慮，找回內在的平靜與喜悅。',
    imageUrl: `https://picsum.photos/id/${600+i}/400/400`
  })),
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: '2026 丙午馬年運程大預測：火運當頭，如何乘勢而上？',
    date: '2025-10-15',
    excerpt: '踏入九運中期的火馬年，全球經濟與個人運勢將迎來劇烈變動。杜師傅為你拆解流年吉凶，掌握先機。',
    content: '詳細內容...',
    imageUrl: 'https://picsum.photos/id/1015/800/400',
    tags: ['流年運程', '風水']
  },
  {
    id: 'b2',
    title: '為什麼你的顯化法則不靈驗？從量子力學看玄學',
    date: '2025-09-28',
    excerpt: '吸引力法則並非空想，而是能量頻率的共振。結合科學視角，教你如何正確許願。',
    content: '詳細內容...',
    imageUrl: 'https://picsum.photos/id/1016/800/400',
    tags: ['靈性科學', '心理學']
  },
  {
    id: 'b3',
    title: '辦公室風水三大禁忌：別讓座位偷走你的財運',
    date: '2025-09-10',
    excerpt: '背後無靠？橫樑壓頂？這些常見佈局正在悄悄影響你的升職加薪。',
    content: '詳細內容...',
    imageUrl: 'https://picsum.photos/id/1018/800/400',
    tags: ['風水', '職場']
  },
  {
    id: 'b4',
    title: '感情斷捨離：斬桃花儀式的心理療癒機制',
    date: '2025-08-22',
    excerpt: '儀式不僅是玄學，更是一場深層的潛意識手術，幫助你徹底放下過去。',
    content: '詳細內容...',
    imageUrl: 'https://picsum.photos/id/1019/800/400',
    tags: ['感情', '儀式']
  },
  {
    id: 'b5',
    title: '水晶能量全攻略：如何挑選適合自己的「靈性電池」',
    date: '2025-08-05',
    excerpt: '粉晶招桃花，黃晶招財？深入了解水晶頻率，別再戴錯了。',
    content: '詳細內容...',
    imageUrl: 'https://picsum.photos/id/1020/800/400',
    tags: ['靈物', '能量']
  },
  {
    id: 'b6',
    title: '財庫有漏？五個徵兆檢測你的「守財能力」',
    date: '2025-07-18',
    excerpt: '賺得多存得少？可能是你的財庫出現了漏洞。補財庫儀式原理解析。',
    content: '詳細內容...',
    imageUrl: 'https://picsum.photos/id/1021/800/400',
    tags: ['財運', '法事']
  },
  {
    id: 'b7',
    title: '現代人的焦慮解藥：靜觀與靈氣治療',
    date: '2025-07-01',
    excerpt: '在高壓都市生活中，如何透過簡單的每日練習，找回內心的寧靜綠洲。',
    content: '詳細內容...',
    imageUrl: 'https://picsum.photos/id/1022/800/400',
    tags: ['靈修', '健康']
  },
  {
    id: 'b8',
    title: '數碼時代的風水學：手機號碼與電子郵箱的能量密碼',
    date: '2025-06-15',
    excerpt: '生命數字不僅在生日，你的常用號碼也在每分每秒影響著你的磁場。',
    content: '詳細內容...',
    imageUrl: 'https://picsum.photos/id/1023/800/400',
    tags: ['生命數字', '現代玄學']
  },
  {
    id: 'b9',
    title: '和合二仙的傳說與現代愛情觀',
    date: '2025-05-30',
    excerpt: '古老的和合文化如何應用於現代複雜的伴侶關係？愛需要經營，也需要運氣。',
    content: '詳細內容...',
    imageUrl: 'https://picsum.photos/id/1024/800/400',
    tags: ['感情', '文化']
  },
  {
    id: 'b10',
    title: '茶道與禪：一杯茶中的宇宙',
    date: '2025-05-12',
    excerpt: '品茶即是修心。在茶香中體悟「一期一會」的生命哲學。',
    content: '詳細內容...',
    imageUrl: 'https://picsum.photos/id/1025/800/400',
    tags: ['生活品味', '靈性']
  }
];

export const TESTIMONIALS = [
  {
    name: '陳先生',
    role: '金融業高管',
    content: '成為「全面貼心」會員後，我的事業和人際關係都有明顯改善。杜師傅的季度諮詢幫助我及時調整生活方向，讓我避開了許多潛在問題。',
    rating: 5
  },
  {
    name: '李小姐',
    role: '科技創業家',
    content: '加入「萬事俱有滔滔」會員計劃是我對公司做過最好的投資。風水佈局調整後，團隊士氣大增，業績增長超過30%。',
    rating: 5
  },
  {
    name: '張太太',
    role: '家庭主婦',
    content: '透過和合儀式，我和丈夫的關係得到了修復。師傅不僅是玄學家，更像是非常有智慧的心理諮詢師。',
    rating: 5
  }
];

export const PROFILE_STATS = [
  { label: '道教祈福儀式', value: '10,000+', suffix: '宗' },
  { label: '中小企顧問', value: '100+', suffix: '間' },
  { label: '滿意度', value: '99', suffix: '%' },
  { label: '行業經驗', value: '15+', suffix: '年' }
];

export const CERTIFICATIONS = [
  'NGH, APH 國際認證催眠師',
  'HWP 美國哈佛大學正向心理學導師',
  'TQUK 英國心理咨詢師資格',
  'IMMA 澳洲靜觀協會認證導師',
  '江西龍虎山第六十八代法術弟子',
  '楊公風水派第二十四代傳人'
];

// Helper to calculate points
export const calculatePoints = (price: number | string) => {
  if (typeof price === 'string') return 0;
  // 1 HKD = 1 Point (Standard)
  return Math.floor(price); 
};