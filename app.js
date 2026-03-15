// ===== お遍路ウォーカー メインロジック =====
// app.js

'use strict';

// 88ヶ所データ（緯度・経度）— 公式サイト座標に修正済み
const TEMPLES = [
  // 徳島県（発心の道場）1〜23番
  {n:1,  name:'霊山寺',   pref:'徳島', lat:34.159474, lng:134.502972},
  {n:2,  name:'極楽寺',   pref:'徳島', lat:34.155682, lng:134.490351},
  {n:3,  name:'金泉寺',   pref:'徳島', lat:34.147386, lng:134.468531},
  {n:4,  name:'大日寺',   pref:'徳島', lat:34.151348, lng:134.430899},
  {n:5,  name:'地蔵寺',   pref:'徳島', lat:34.137255, lng:134.432146},
  {n:6,  name:'安楽寺',   pref:'徳島', lat:34.118040, lng:134.388312},
  {n:7,  name:'十楽寺',   pref:'徳島', lat:34.120732, lng:134.377921},
  {n:8,  name:'熊谷寺',   pref:'徳島', lat:34.120804, lng:134.340035},
  {n:9,  name:'法輪寺',   pref:'徳島', lat:34.104372, lng:134.333768},
  {n:10, name:'切幡寺',   pref:'徳島', lat:34.107800, lng:134.304277},
  {n:11, name:'藤井寺',   pref:'徳島', lat:34.051651, lng:134.348482},
  {n:12, name:'焼山寺',   pref:'徳島', lat:33.984969, lng:134.310218},
  {n:13, name:'大日寺',   pref:'徳島', lat:34.038156, lng:134.462669},
  {n:14, name:'常楽寺',   pref:'徳島', lat:34.050311, lng:134.475680},
  {n:15, name:'国分寺',   pref:'徳島', lat:34.055609, lng:134.473601},
  {n:16, name:'観音寺',   pref:'徳島', lat:34.068479, lng:134.474342},
  {n:17, name:'井戸寺',   pref:'徳島', lat:34.085167, lng:134.485525},
  {n:18, name:'恩山寺',   pref:'徳島', lat:33.985946, lng:134.578242},
  {n:19, name:'立江寺',   pref:'徳島', lat:33.967720, lng:134.605956},
  {n:20, name:'鶴林寺',   pref:'徳島', lat:33.913843, lng:134.505634},
  {n:21, name:'太龍寺',   pref:'徳島', lat:33.882562, lng:134.521818},
  {n:22, name:'平等寺',   pref:'徳島', lat:33.851752, lng:134.582580},
  {n:23, name:'薬王寺',   pref:'徳島', lat:33.732259, lng:134.527632},
  // 高知県（修行の道場）24〜39番
  {n:24, name:'最御崎寺', pref:'高知', lat:33.249021, lng:134.175725},
  {n:25, name:'津照寺',   pref:'高知', lat:33.288265, lng:134.148404},
  {n:26, name:'金剛頂寺', pref:'高知', lat:33.307215, lng:134.122834},
  {n:27, name:'神峯寺',   pref:'高知', lat:33.467616, lng:133.974807},
  {n:28, name:'大日寺',   pref:'高知', lat:33.577577, lng:133.705410},
  {n:29, name:'国分寺',   pref:'高知', lat:33.598770, lng:133.640441},
  {n:30, name:'善楽寺',   pref:'高知', lat:33.591965, lng:133.577757},
  {n:31, name:'竹林寺',   pref:'高知', lat:33.546535, lng:133.577027},
  {n:32, name:'禅師峰寺', pref:'高知', lat:33.526647, lng:133.611364},
  {n:33, name:'雪蹊寺',   pref:'高知', lat:33.500822, lng:133.543058},
  {n:34, name:'種間寺',   pref:'高知', lat:33.491871, lng:133.487678},
  {n:35, name:'清滝寺',   pref:'高知', lat:33.512547, lng:133.409508},
  {n:36, name:'青龍寺',   pref:'高知', lat:33.426006, lng:133.450797},
  {n:37, name:'岩本寺',   pref:'高知', lat:33.207984, lng:133.134594},
  {n:38, name:'金剛福寺', pref:'高知', lat:32.725184, lng:133.017530},
  {n:39, name:'延光寺',   pref:'高知', lat:32.961328, lng:132.774322},
  // 愛媛県（菩提の道場）40〜65番
  {n:40, name:'観自在寺', pref:'愛媛', lat:32.964670, lng:132.564099},
  {n:41, name:'龍光寺',   pref:'愛媛', lat:33.295206, lng:132.598500},
  {n:42, name:'仏木寺',   pref:'愛媛', lat:33.310253, lng:132.581920},
  {n:43, name:'明石寺',   pref:'愛媛', lat:33.369233, lng:132.518945},
  {n:44, name:'大寶寺',   pref:'愛媛', lat:33.660873, lng:132.912059},
  {n:45, name:'岩屋寺',   pref:'愛媛', lat:33.658898, lng:132.981082},
  {n:46, name:'浄瑠璃寺', pref:'愛媛', lat:33.753588, lng:132.819158},
  {n:47, name:'八坂寺',   pref:'愛媛', lat:33.757965, lng:132.812852},
  {n:48, name:'西林寺',   pref:'愛媛', lat:33.793721, lng:132.814018},
  {n:49, name:'浄土寺',   pref:'愛媛', lat:33.816708, lng:132.808396},
  {n:50, name:'繁多寺',   pref:'愛媛', lat:33.828146, lng:132.804505},
  {n:51, name:'石手寺',   pref:'愛媛', lat:33.847613, lng:132.797269},
  {n:52, name:'太山寺',   pref:'愛媛', lat:33.885047, lng:132.714984},
  {n:53, name:'円明寺',   pref:'愛媛', lat:33.891497, lng:132.739981},
  {n:54, name:'延命寺',   pref:'愛媛', lat:34.066805, lng:132.964128},
  {n:55, name:'南光坊',   pref:'愛媛', lat:34.068178, lng:132.995309},
  {n:56, name:'泰山寺',   pref:'愛媛', lat:34.050234, lng:132.974743},
  {n:57, name:'栄福寺',   pref:'愛媛', lat:34.029712, lng:132.978366},
  {n:58, name:'仙遊寺',   pref:'愛媛', lat:34.013204, lng:132.977346},
  {n:59, name:'国分寺',   pref:'愛媛', lat:34.026193, lng:133.025448},
  {n:60, name:'横峰寺',   pref:'愛媛', lat:33.837807, lng:133.111134},
  {n:61, name:'香園寺',   pref:'愛媛', lat:33.893537, lng:133.103287},
  {n:62, name:'宝寿寺',   pref:'愛媛', lat:33.897235, lng:133.114929},
  {n:63, name:'吉祥寺',   pref:'愛媛', lat:33.895839, lng:133.129158},
  {n:64, name:'前神寺',   pref:'愛媛', lat:33.891592, lng:133.160156},
  {n:65, name:'三角寺',   pref:'愛媛', lat:33.967416, lng:133.586668},
  // 香川県（涅槃の道場）66〜88番
  {n:66, name:'雲辺寺',   pref:'香川', lat:34.035227, lng:133.723739},
  {n:67, name:'大興寺',   pref:'香川', lat:34.102419, lng:133.719054},
  {n:68, name:'神恵院',   pref:'香川', lat:34.133977, lng:133.647366},
  {n:69, name:'観音寺',   pref:'香川', lat:34.134471, lng:133.647615},
  {n:70, name:'本山寺',   pref:'香川', lat:34.139713, lng:133.694087},
  {n:71, name:'弥谷寺',   pref:'香川', lat:34.229759, lng:133.724269},
  {n:72, name:'曼荼羅寺', pref:'香川', lat:34.223304, lng:133.750239},
  {n:73, name:'出釈迦寺', pref:'香川', lat:34.219408, lng:133.750203},
  {n:74, name:'甲山寺',   pref:'香川', lat:34.233254, lng:133.765751},
  {n:75, name:'善通寺',   pref:'香川', lat:34.225036, lng:133.774073},
  {n:76, name:'金倉寺',   pref:'香川', lat:34.249909, lng:133.780963},
  {n:77, name:'道隆寺',   pref:'香川', lat:34.276726, lng:133.762682},
  {n:78, name:'郷照寺',   pref:'香川', lat:34.306654, lng:133.824617},
  {n:79, name:'天皇寺',   pref:'香川', lat:34.311446, lng:133.882823},
  {n:80, name:'国分寺',   pref:'香川', lat:34.303159, lng:133.944084},
  {n:81, name:'白峯寺',   pref:'香川', lat:34.333481, lng:133.926810},
  {n:82, name:'根香寺',   pref:'香川', lat:34.344444, lng:133.960676},
  {n:83, name:'一宮寺',   pref:'香川', lat:34.286632, lng:134.026625},
  {n:84, name:'屋島寺',   pref:'香川', lat:34.357944, lng:134.101258},
  {n:85, name:'八栗寺',   pref:'香川', lat:34.359827, lng:134.139466},
  {n:86, name:'志度寺',   pref:'香川', lat:34.323531, lng:134.179432},
  {n:87, name:'長尾寺',   pref:'香川', lat:34.266586, lng:134.171596},
  {n:88, name:'大窪寺',   pref:'香川', lat:34.191403, lng:134.206799},
];


const PREF_COLORS = {
  '徳島': '#3a6ea5',
  '高知': '#1D9E75',
  '愛媛': '#D85A30',
  '香川': '#BA7517',
};

// 寺間の実際の歩行距離(km) — インデックス0 = 1番→2番
const INTER_DIST = [
   1.2,  // 1→2
   2.2,  // 2→3
   8.5,  // 3→4
   4.2,  // 4→5
   7.0,  // 5→6
   1.2,  // 6→7
   3.5,  // 7→8
   3.1,  // 8→9
   7.4,  // 9→10
   9.0,  // 10→11
  12.9,  // 11→12
  20.5,  // 12→13
   1.0,  // 13→14
   1.5,  // 14→15
   2.8,  // 15→16
   4.2,  // 16→17
  18.1,  // 17→18
   3.0,  // 18→19
  13.4,  // 19→20
   7.2,  // 20→21
  19.5,  // 21→22
  28.2,  // 22→23
  75.4,  // 23→24 (室戸岬)
   7.6,  // 24→25
   6.2,  // 25→26
  40.0,  // 26→27
  17.4,  // 27→28
  13.5,  // 28→29
   3.9,  // 29→30
   5.8,  // 30→31
   8.7,  // 31→32
   6.7,  // 32→33
   8.9,  // 33→34
  13.5,  // 34→35
  22.2,  // 35→36
  61.4,  // 36→37
  87.7,  // 37→38 (足摺岬)
  57.5,  // 38→39
  37.8,  // 39→40
  55.0,  // 40→41
   4.1,  // 41→42
  10.1,  // 42→43
  65.0,  // 43→44 (久万高原)
  10.1,  // 44→45
  35.2,  // 45→46
   0.9,  // 46→47
   2.5,  // 47→48
   2.0,  // 48→49
   1.4,  // 49→50
   2.8,  // 50→51
   8.4,  // 51→52
   2.4,  // 52→53
  11.2,  // 53→54
  21.4,  // 54→55
   1.4,  // 55→56
   2.1,  // 56→57
   3.7,  // 57→58
   2.9,  // 58→59
  27.3,  // 59→60 (横峰寺)
   6.1,  // 60→61
   2.7,  // 61→62
   1.3,  // 62→63
   3.7,  // 63→64
  30.0,  // 64→65
  26.0,  // 65→66 (雲辺寺)
  15.5,  // 66→67
   8.3,  // 67→68
   0.1,  // 68→69
   7.0,  // 69→70
   9.0,  // 70→71
   6.5,  // 71→72
   0.7,  // 72→73
   1.8,  // 73→74
  11.8,  // 74→75
   3.5,  // 75→76
   4.6,  // 76→77
  11.8,  // 77→78
   4.2,  // 78→79
   4.7,  // 79→80
  12.4,  // 80→81
   5.4,  // 81→82
  14.5,  // 82→83
  17.5,  // 83→84
   6.2,  // 84→85
  11.5,  // 85→86
  12.3,  // 86→87
  22.5,  // 87→88
];

// 累計距離テーブル（実際の道のり）
const CUM_DIST = [0];
for (let i = 0; i < INTER_DIST.length; i++) {
  CUM_DIST.push(CUM_DIST[i] + INTER_DIST[i]);
}
const TOTAL_KM = CUM_DIST[87]; // 約1,181km

// --- 現在位置計算（km → lat/lng） ---
function getPosition(km) {
  if (km <= 0) {
    const p = routeLatLng(0, TEMPLES[0].lat, TEMPLES[0].lng);
    return { lat: p[0], lng: p[1], si: 0, ni: 1 };
  }
  if (km >= TOTAL_KM) {
    const p = routeLatLng(1, TEMPLES[87].lat, TEMPLES[87].lng);
    return { lat: p[0], lng: p[1], si: 87, ni: null };
  }
  for (let i = 1; i < CUM_DIST.length; i++) {
    if (km < CUM_DIST[i]) {
      const t = (km - CUM_DIST[i-1]) / (CUM_DIST[i] - CUM_DIST[i-1]);
      const fLat = TEMPLES[i-1].lat + t * (TEMPLES[i].lat - TEMPLES[i-1].lat);
      const fLng = TEMPLES[i-1].lng + t * (TEMPLES[i].lng - TEMPLES[i-1].lng);
      const p = routeLatLng(km / TOTAL_KM, fLat, fLng);
      return { lat: p[0], lng: p[1], si: i-1, ni: i };
    }
  }
  return { lat: TEMPLES[87].lat, lng: TEMPLES[87].lng, si: 87, ni: null };
}

// ルート上の位置を返す（ルート未ロード時は直線フォールバック）
function routeLatLng(ratio, fallLat, fallLng) {
  if (!routePoints || !routeCumDist || routeTotalKm === 0) return [fallLat, fallLng];
  const roadKm = ratio * routeTotalKm;
  if (roadKm <= 0) return [routePoints[0][0], routePoints[0][1]];
  if (roadKm >= routeTotalKm) return [routePoints[routePoints.length-1][0], routePoints[routePoints.length-1][1]];
  // 二分探索
  let lo = 0, hi = routePoints.length - 1;
  while (lo + 1 < hi) {
    const mid = (lo + hi) >> 1;
    if (routeCumDist[mid] <= roadKm) lo = mid; else hi = mid;
  }
  const t = (roadKm - routeCumDist[lo]) / (routeCumDist[hi] - routeCumDist[lo]);
  return [
    routePoints[lo][0] + t * (routePoints[hi][0] - routePoints[lo][0]),
    routePoints[lo][1] + t * (routePoints[hi][1] - routePoints[lo][1]),
  ];
}

let map, currentMarker, routeLine;
// 道路ルート索引（ロード後にセット）
let routePoints = null;   // [[lat, lng], ...]
let routeCumDist = null;  // 各点までの累計距離(km)
let routeTotalKm = 0;

// --- 地図初期化（Leaflet） ---
function initMap() {
  map = L.map('map', {
    center: [33.7, 133.5],
    zoom: 8,
    zoomControl: true,
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(map);

  // 仮ルート（直線・ロード取得中のプレースホルダー）
  routeLine = L.polyline(TEMPLES.map(t => [t.lat, t.lng]), {
    color: '#bbb', weight: 1.5, dashArray: '4 6', opacity: 0.6,
  }).addTo(map);

  // 各札所マーカー
  TEMPLES.forEach(t => {
    L.circleMarker([t.lat, t.lng], {
      radius: 5,
      fillColor: PREF_COLORS[t.pref] || '#888',
      color: 'white', weight: 1.5, fillOpacity: 0.9,
    }).addTo(map).bindTooltip(`第${t.n}番 ${t.name}（${t.pref}）`, { sticky: true });
  });

  // 現在地マーカー（朱印スタンプ風お遍路さん）
  const pilgrimSVG = `<svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
    <!-- 背景円 -->
    <circle cx="19" cy="19" r="18" fill="#c0392b" opacity="0.12"/>
    <circle cx="19" cy="19" r="16" fill="none" stroke="#c0392b" stroke-width="1.5" stroke-dasharray="3 2"/>
    <!-- 金剛杖 -->
    <line x1="28" y1="9" x2="30" y2="36" stroke="#c0392b" stroke-width="2" stroke-linecap="round"/>
    <!-- 菅笠 -->
    <polygon points="19,3 6,13 32,13" fill="#c0392b" opacity="0.85"/>
    <ellipse cx="19" cy="13" rx="13" ry="1.8" fill="#c0392b"/>
    <!-- 頭 -->
    <circle cx="18" cy="18" r="4" fill="#c0392b" opacity="0.9"/>
    <!-- 白衣 -->
    <path d="M13,22 L11,36 L25,36 L23,22 Z" fill="#c0392b" opacity="0.8"/>
    <!-- 右腕 -->
    <line x1="23" y1="26" x2="28" y2="23" stroke="#c0392b" stroke-width="2" stroke-linecap="round"/>
  </svg>`;
  const icon = L.divIcon({
    className: 'henro-current',
    html: pilgrimSVG,
    iconSize: [38, 38],
    iconAnchor: [19, 36],
  });
  currentMarker = L.marker([TEMPLES[0].lat, TEMPLES[0].lng], { icon, zIndexOffset: 1000 }).addTo(map);

  // 道路に沿ったルートを非同期で読み込み
  loadRoadRoute();
}

// --- 道路ルート取得（OSRM / キャッシュ対応） ---
const ROUTE_CACHE_KEY = 'henro_route_v4';

async function loadRoadRoute() {
  // localStorage キャッシュ確認
  const cached = localStorage.getItem(ROUTE_CACHE_KEY);
  if (cached) {
    try {
      updateRouteDisplay(JSON.parse(cached));
      return;
    } catch(e) {
      localStorage.removeItem(ROUTE_CACHE_KEY);
    }
  }

  // OSRM で全88寺を1リクエストで取得
  const waypoints = TEMPLES.map(t => `${t.lng.toFixed(5)},${t.lat.toFixed(5)}`).join(';');
  const url = `https://router.project-osrm.org/route/v1/foot/${waypoints}?overview=full&geometries=geojson`;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000);
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    const data = await res.json();
    if (data.code === 'Ok' && data.routes?.[0]) {
      // GeoJSON は [lng, lat] → Leaflet は [lat, lng] に変換
      const coords = data.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
      localStorage.setItem(ROUTE_CACHE_KEY, JSON.stringify(coords));
      updateRouteDisplay(coords);
    }
  } catch(e) {
    console.warn('道路ルート取得失敗（直線のまま表示）:', e.message);
  }
}

function updateRouteDisplay(coords) {
  if (routeLine) map.removeLayer(routeLine);
  routeLine = L.polyline(coords, {
    color: '#e07840', weight: 2.5, opacity: 0.8,
  }).addTo(map);
  buildRouteIndex(coords);
  // ルートロード後にマーカーを正確な位置へ移動
  const pos = getPosition(totalSteps * 0.00075);
  currentMarker.setLatLng([pos.lat, pos.lng]);
}

function buildRouteIndex(coords) {
  routePoints = coords;
  const cum = [0];
  for (let i = 1; i < coords.length; i++) {
    const [lat1, lng1] = coords[i-1];
    const [lat2, lng2] = coords[i];
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLng/2)**2;
    cum.push(cum[i-1] + 2 * R * Math.asin(Math.sqrt(a)));
  }
  routeCumDist = cum;
  routeTotalKm = cum[cum.length - 1];
}

// --- UI更新 ---
function updateUI() {
  const km = totalSteps * 0.00075; // 1歩 ≒ 0.75m
  const pct = Math.min(100, km / TOTAL_KM * 100);
  const pos = getPosition(km);

  document.getElementById('s-steps').textContent   = totalSteps.toLocaleString() + ' 歩';
  document.getElementById('s-km').textContent      = km.toFixed(1) + ' km';
  document.getElementById('s-pct').textContent     = pct.toFixed(1) + '%';
  document.getElementById('s-pctlabel').textContent = pct.toFixed(1) + '%';
  document.getElementById('sbar').style.width      = pct.toFixed(2) + '%';

  // マーカー移動
  currentMarker.setLatLng([pos.lat, pos.lng]);

  if (pos.ni !== null) {
    const cur = TEMPLES[pos.si];
    const nxt = TEMPLES[pos.ni];
    document.getElementById('s-loc').textContent  = `第${cur.n}→${nxt.n}番`;
    document.getElementById('s-next').textContent = `第${nxt.n}番 ${nxt.name}（${nxt.pref}）`;
    document.getElementById('s-dist').textContent = `あと ${(CUM_DIST[pos.ni] - km).toFixed(1)} km`;
  } else {
    document.getElementById('s-loc').textContent  = '結願！';
    document.getElementById('s-next').textContent = '四国八十八ヶ所を完歩！おめでとうございます 🎉';
    document.getElementById('s-dist').textContent = '';
  }

  // localStorageに保存
  localStorage.setItem('henro_steps', String(totalSteps));

  // 到着チェック（複数寺を一度に通過した場合はキューに積む）
  if (!arrivalInitialized) {
    lastShownTempleIdx = pos.si;
    arrivalInitialized = true;
  } else if (pos.si > lastShownTempleIdx) {
    for (let i = lastShownTempleIdx + 1; i <= pos.si; i++) {
      arrivalQueue.push(TEMPLES[i]);
    }
    lastShownTempleIdx = pos.si;
    // モーダルが出ていなければ先頭から表示
    if (!document.getElementById('arrival-overlay').classList.contains('show')) {
      showNextArrival();
    }
  }
}

// === 到着モーダル ===
let lastShownTempleIdx = 0;
let arrivalInitialized  = false;
let arrivalQueue        = [];

// 同名の寺院が複数あり曖昧さ回避が必要なものを直接指定
const WIKI_OVERRIDES = {
  1:  '霊山寺_(鳴門市)',
  2:  '極楽寺_(鳴門市)',
  3:  '金泉寺_(板野町)',
  4:  '大日寺_(板野町)',
  5:  '地蔵寺_(板野町)',
  6:  '安楽寺_(上板町)',
  9:  '法輪寺_(阿波市)',
  13: '大日寺_(徳島市)',
  14: '常楽寺_(徳島市)',
  15: '国分寺_(徳島市)',
  16: '観音寺_(徳島市)',
  20: '鶴林寺_(勝浦町)',
  22: '平等寺_(阿南市)',
  28: '大日寺_(香南市)',
  29: '国分寺_(南国市)',
  31: '竹林寺_(高知市)',
  35: '清滝寺_(土佐市)',
  36: '青龍寺_(土佐市)',
  41: '龍光寺_(宇和島市)',
  45: '岩屋寺_(久万高原町)',
  46: '浄瑠璃寺_(松山市)',
  47: '八坂寺_(松山市)',
  48: '西林寺_(松山市)',
  49: '浄土寺_(松山市)',
  52: '太山寺_(松山市)',
  53: '円明寺_(松山市)',
  54: '延命寺_(今治市)',
  56: '泰山寺_(今治市)',
  59: '国分寺_(今治市)',
  63: '吉祥寺_(西条市)',
  67: '大興寺_(三豊市)',
  69: '観音寺_(観音寺市)',
  70: '本山寺_(三豊市)',
  72: '曼荼羅寺_(善通寺市)',
  79: '天皇寺_(香川県)',
  80: '国分寺_(高松市)',
  87: '長尾寺_(さぬき市)',
};

// キャッシュキーにv2プレフィックスを付けて旧キャッシュと分離
const IMG_CACHE_PREFIX = 'henro_img2_';

async function fetchTemplePhoto(temple) {
  const cacheKey = IMG_CACHE_PREFIX + temple.n;
  const stored = localStorage.getItem(cacheKey);
  if (stored !== null) return stored === '__none__' ? null : stored;

  const ctrl  = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 8000);
  try {
    let wikiTitle = WIKI_OVERRIDES[temple.n] || null;

    if (!wikiTitle) {
      // openSearch でタイトル候補を取得（タイトル一致検索）
      const sUrl  = `https://ja.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(temple.name)}&limit=8&format=json&origin=*`;
      const sRes  = await fetch(sUrl, { signal: ctrl.signal });
      const sTitles = (await sRes.json())[1] || [];

      const skipWords    = ['一覧', '曖昧さ', '四国八十八', 'お遍路'];
      const shikokuHints = ['徳島', '高知', '愛媛', '香川', '鳴門', '板野', '阿波', '吉野川',
        '南国', '土佐', '宇和島', '松山', '今治', '西条', '三豊', '善通寺',
        '観音寺市', '高松', 'さぬき', temple.pref];

      for (const t of sTitles) {
        if (!t.includes(temple.name)) continue;
        if (skipWords.some(w => t.includes(w))) continue;
        if (!wikiTitle) wikiTitle = t;
        if (shikokuHints.some(h => t.includes(h))) { wikiTitle = t; break; }
      }
    }

    if (!wikiTitle) {
      clearTimeout(timer);
      localStorage.setItem(cacheKey, '__none__');
      return null;
    }

    // 決定したタイトルのサムネイルを取得
    const iUrl  = `https://ja.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(wikiTitle)}&prop=pageimages&format=json&pithumbsize=600&origin=*`;
    const iRes  = await fetch(iUrl, { signal: ctrl.signal });
    const iData = await iRes.json();
    clearTimeout(timer);

    const page = Object.values(iData.query.pages)[0];
    if (page?.thumbnail?.source) {
      localStorage.setItem(cacheKey, page.thumbnail.source);
      return page.thumbnail.source;
    }
    localStorage.setItem(cacheKey, '__none__');
    return null;
  } catch (e) {
    clearTimeout(timer);
    if (e.name !== 'AbortError') console.warn(`写真取得失敗 第${temple.n}番:`, e.message);
    return null;
  }
}

function showNextArrival() {
  if (arrivalQueue.length === 0) return;
  showArrivalModal(arrivalQueue.shift());
}

function showArrivalModal(temple) {
  const overlay   = document.getElementById('arrival-overlay');
  const prefColor = PREF_COLORS[temple.pref] || '#c0392b';

  // バッジ：キューに残りがあれば件数を表示
  const badge = document.getElementById('arrival-badge');
  badge.textContent = arrivalQueue.length > 0
    ? `到着！🎉  あと ${arrivalQueue.length} ヶ所`
    : '到着！🎉';

  const numEl = document.getElementById('arrival-num');
  numEl.textContent = `第${temple.n}番`;
  numEl.style.color = prefColor;
  document.getElementById('arrival-name').textContent = temple.name;
  document.getElementById('arrival-sub').textContent  = `${temple.pref}県`;

  const img      = document.getElementById('arrival-photo-img');
  const stateEl  = document.getElementById('arrival-photo-state');
  const wikiEl   = document.getElementById('arrival-wiki');
  img.style.display     = 'none';
  img.src               = '';
  stateEl.innerHTML     = '写真を読み込み中...';
  stateEl.style.display = '';
  wikiEl.style.display  = 'none';

  overlay.classList.add('show');
  document.getElementById('arrival-close-btn').onclick = closeArrivalModal;
  overlay.onclick = (e) => { if (e.target === overlay) closeArrivalModal(); };

  fetchTemplePhoto(temple).then(src => {
    stateEl.style.display = 'none';
    if (src) {
      img.src    = src;
      img.onload = () => {
        img.style.display    = 'block';
        wikiEl.style.display = '';
        const wikiLink = document.getElementById('arrival-wiki-link');
        wikiLink.href = `https://ja.wikipedia.org/w/index.php?search=${encodeURIComponent('第'+temple.n+'番 '+temple.name)}`;
      };
      img.onerror = () => {
        stateEl.innerHTML     = '<span style="font-size:40px;opacity:0.2">⛩</span>';
        stateEl.style.display = '';
      };
    } else {
      stateEl.innerHTML     = '<span style="font-size:40px;opacity:0.2">⛩</span>';
      stateEl.style.display = '';
    }
  });
}

function closeArrivalModal() {
  document.getElementById('arrival-overlay').classList.remove('show');
  // キューに次のお寺があればアニメーション後に表示
  if (arrivalQueue.length > 0) {
    setTimeout(showNextArrival, 380);
  }
}

// --- スタート画面 ---
function startHenro() {
  localStorage.setItem('henro_started', '1');
  const startEl = document.getElementById('start-overlay');
  startEl.classList.add('hide');
  // フェードアウト後に第1番 霊山寺の到着モーダルを表示
  setTimeout(() => {
    startEl.style.display = 'none';
    showArrivalModal(TEMPLES[0]);
  }, 420);
}

// --- 履歴管理 ---
const HISTORY_KEY = 'henro_history';
let stepHistory = [];

function loadHistory() {
  try {
    stepHistory = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  } catch(e) {
    stepHistory = [];
  }
}

function todayStr() {
  const now = new Date();
  return `${now.getFullYear()}/${String(now.getMonth()+1).padStart(2,'0')}/${String(now.getDate()).padStart(2,'0')}`;
}

function saveHistoryEntry(steps, label, date) {
  const d = date || todayStr();
  stepHistory.unshift({ date: d, steps, label });
  // 日付の新しい順に並べ替え（同日は入力順を保持）
  stepHistory.sort((a, b) => b.date.localeCompare(a.date));
  if (stepHistory.length > 200) stepHistory = stepHistory.slice(0, 200);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(stepHistory));
  renderHistory();
}

function renderHistory() {
  const list = document.getElementById('history-list');
  if (!list) return;
  if (stepHistory.length === 0) {
    list.innerHTML = '<div class="history-empty">まだ記録がありません</div>';
    return;
  }
  list.innerHTML = stepHistory.map(item => `
    <div class="history-item">
      <span class="history-date">${item.date}</span>
      <span class="history-label">${item.label}</span>
      <span class="history-steps">+${item.steps.toLocaleString()} 歩</span>
    </div>
  `).join('');
}

// --- 入力ハンドラ ---
function addManual() {
  const val = parseInt(document.getElementById('inp').value) || 0;
  if (val <= 0) return;

  const dateRaw = document.getElementById('inp-date').value;
  const date = dateRaw ? dateRaw.replace(/-/g, '/') : todayStr();

  // 同一日付の既存エントリを検索
  const existingIdx = stepHistory.findIndex(item => item.date === date);

  if (existingIdx !== -1) {
    // 修正扱い：古い歩数を引いて新しい歩数に置き換え
    const oldSteps = stepHistory[existingIdx].steps;
    totalSteps = totalSteps - oldSteps + val;
    stepHistory[existingIdx].steps = val;
    stepHistory[existingIdx].label = '修正';
    stepHistory.sort((a, b) => b.date.localeCompare(a.date));
    localStorage.setItem(HISTORY_KEY, JSON.stringify(stepHistory));
    localStorage.setItem('henro_steps', String(totalSteps));
    renderHistory();
  } else {
    // 新規追加
    totalSteps += val;
    saveHistoryEntry(val, '手動入力', date);
  }

  document.getElementById('inp').value = '';
  updateUI();
}


function resetAll() {
  if (!confirm('歩数と入力履歴をすべてリセットしますか？\nこの操作は元に戻せません。')) return;
  totalSteps = 0;
  stepHistory = [];
  arrivalInitialized = false;
  lastShownTempleIdx  = 0;
  arrivalQueue        = [];
  closeArrivalModal();
  localStorage.removeItem('henro_steps');
  localStorage.removeItem(HISTORY_KEY);
  localStorage.removeItem('henro_started');
  renderHistory();
  updateUI();
  // スタート画面を再表示
  const startEl = document.getElementById('start-overlay');
  startEl.classList.remove('hide');
  startEl.classList.add('show');
  document.getElementById('start-btn').onclick = startHenro;
}

// --- 初期化 ---
let totalSteps = parseInt(localStorage.getItem('henro_steps') || '0');
loadHistory();

initMap();
updateUI();
renderHistory();

// 日付入力のデフォルトを今日に設定
const _now = new Date();
document.getElementById('inp-date').value =
  `${_now.getFullYear()}-${String(_now.getMonth()+1).padStart(2,'0')}-${String(_now.getDate()).padStart(2,'0')}`;

// スタート画面の制御
const _started = localStorage.getItem('henro_started');
if (!_started && totalSteps === 0 && stepHistory.length === 0) {
  // 初回起動 → スタート画面を表示
  const startEl = document.getElementById('start-overlay');
  startEl.classList.add('show');
  document.getElementById('start-btn').addEventListener('click', startHenro);
} else {
  // 既に開始済み（またはデータあり）→ フラグだけ立てて画面は出さない
  if (!_started) localStorage.setItem('henro_started', '1');
}

// Service Worker 登録
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(console.error);
}
