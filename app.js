// ===== お遍路ウォーカー メインロジック =====
// app.js

'use strict';

// 88ヶ所データ（緯度・経度）
const TEMPLES = [
  {n:1, name:'霊山寺',   pref:'徳島', lat:34.070, lng:134.456},
  {n:2, name:'極楽寺',   pref:'徳島', lat:34.076, lng:134.453},
  {n:3, name:'金泉寺',   pref:'徳島', lat:34.083, lng:134.438},
  {n:4, name:'大日寺',   pref:'徳島', lat:34.098, lng:134.389},
  {n:5, name:'地蔵寺',   pref:'徳島', lat:34.106, lng:134.366},
  {n:6, name:'安楽寺',   pref:'徳島', lat:34.133, lng:134.334},
  {n:7, name:'十楽寺',   pref:'徳島', lat:34.140, lng:134.322},
  {n:8, name:'熊谷寺',   pref:'徳島', lat:34.151, lng:134.292},
  {n:9, name:'法輪寺',   pref:'徳島', lat:34.158, lng:134.270},
  {n:10,name:'切幡寺',   pref:'徳島', lat:34.160, lng:134.240},
  {n:11,name:'藤井寺',   pref:'徳島', lat:34.098, lng:134.218},
  {n:12,name:'焼山寺',   pref:'徳島', lat:33.980, lng:134.222},
  {n:13,name:'大日寺',   pref:'徳島', lat:34.060, lng:134.376},
  {n:14,name:'常楽寺',   pref:'徳島', lat:34.062, lng:134.361},
  {n:15,name:'国分寺',   pref:'徳島', lat:34.066, lng:134.345},
  {n:16,name:'観音寺',   pref:'徳島', lat:34.068, lng:134.328},
  {n:17,name:'井戸寺',   pref:'徳島', lat:34.063, lng:134.302},
  {n:18,name:'恩山寺',   pref:'徳島', lat:34.005, lng:134.531},
  {n:19,name:'立江寺',   pref:'徳島', lat:34.001, lng:134.557},
  {n:20,name:'鶴林寺',   pref:'徳島', lat:33.924, lng:134.541},
  {n:21,name:'太龍寺',   pref:'徳島', lat:33.875, lng:134.556},
  {n:22,name:'平等寺',   pref:'徳島', lat:33.838, lng:134.600},
  {n:23,name:'薬王寺',   pref:'徳島', lat:33.7297, lng:134.5297},
  {n:24,name:'最御崎寺', pref:'高知', lat:33.565, lng:134.215},
  {n:25,name:'津照寺',   pref:'高知', lat:33.567, lng:134.159},
  {n:26,name:'金剛頂寺', pref:'高知', lat:33.581, lng:134.128},
  {n:27,name:'神峯寺',   pref:'高知', lat:33.574, lng:133.815},
  {n:28,name:'大日寺',   pref:'高知', lat:33.552, lng:133.684},
  {n:29,name:'国分寺',   pref:'高知', lat:33.549, lng:133.575},
  {n:30,name:'善楽寺',   pref:'高知', lat:33.541, lng:133.543},
  {n:31,name:'竹林寺',   pref:'高知', lat:33.515, lng:133.574},
  {n:32,name:'禅師峰寺', pref:'高知', lat:33.493, lng:133.589},
  {n:33,name:'雪蹊寺',   pref:'高知', lat:33.515, lng:133.551},
  {n:34,name:'種間寺',   pref:'高知', lat:33.504, lng:133.501},
  {n:35,name:'清瀧寺',   pref:'高知', lat:33.525, lng:133.401},
  {n:36,name:'青龍寺',   pref:'高知', lat:33.454, lng:133.371},
  {n:37,name:'岩本寺',   pref:'高知', lat:33.175, lng:133.034},
  {n:38,name:'金剛福寺', pref:'高知', lat:32.725, lng:132.975},
  {n:39,name:'延光寺',   pref:'高知', lat:32.915, lng:132.881},
  {n:40,name:'観自在寺', pref:'愛媛', lat:32.985, lng:132.595},
  {n:41,name:'龍光寺',   pref:'愛媛', lat:33.315, lng:132.455},
  {n:42,name:'仏木寺',   pref:'愛媛', lat:33.335, lng:132.415},
  {n:43,name:'明石寺',   pref:'愛媛', lat:33.395, lng:132.405},
  {n:44,name:'大寶寺',   pref:'愛媛', lat:33.465, lng:132.715},
  {n:45,name:'岩屋寺',   pref:'愛媛', lat:33.495, lng:132.875},
  {n:46,name:'浄瑠璃寺', pref:'愛媛', lat:33.785, lng:132.815},
  {n:47,name:'八坂寺',   pref:'愛媛', lat:33.795, lng:132.805},
  {n:48,name:'西林寺',   pref:'愛媛', lat:33.815, lng:132.785},
  {n:49,name:'浄土寺',   pref:'愛媛', lat:33.825, lng:132.765},
  {n:50,name:'繁多寺',   pref:'愛媛', lat:33.835, lng:132.775},
  {n:51,name:'石手寺',   pref:'愛媛', lat:33.845, lng:132.805},
  {n:52,name:'太山寺',   pref:'愛媛', lat:33.825, lng:132.745},
  {n:53,name:'円明寺',   pref:'愛媛', lat:33.835, lng:132.725},
  {n:54,name:'延命寺',   pref:'愛媛', lat:33.905, lng:132.695},
  {n:55,name:'南光坊',   pref:'愛媛', lat:34.065, lng:132.965},
  {n:56,name:'泰山寺',   pref:'愛媛', lat:34.075, lng:132.975},
  {n:57,name:'栄福寺',   pref:'愛媛', lat:34.085, lng:132.985},
  {n:58,name:'仙遊寺',   pref:'愛媛', lat:34.105, lng:133.005},
  {n:59,name:'国分寺',   pref:'愛媛', lat:34.095, lng:133.015},
  {n:60,name:'横峰寺',   pref:'愛媛', lat:33.915, lng:133.105},
  {n:61,name:'香園寺',   pref:'愛媛', lat:33.905, lng:133.155},
  {n:62,name:'宝寿寺',   pref:'愛媛', lat:33.915, lng:133.175},
  {n:63,name:'吉祥寺',   pref:'愛媛', lat:33.925, lng:133.195},
  {n:64,name:'前神寺',   pref:'愛媛', lat:33.905, lng:133.225},
  {n:65,name:'三角寺',   pref:'愛媛', lat:34.015, lng:133.415},
  {n:66,name:'雲辺寺',   pref:'香川', lat:34.045, lng:133.555},
  {n:67,name:'大興寺',   pref:'香川', lat:34.135, lng:133.705},
  {n:68,name:'神恵院',   pref:'香川', lat:34.165, lng:133.765},
  {n:69,name:'観音寺',   pref:'香川', lat:34.175, lng:133.775},
  {n:70,name:'本山寺',   pref:'香川', lat:34.205, lng:133.815},
  {n:71,name:'弥谷寺',   pref:'香川', lat:34.245, lng:133.845},
  {n:72,name:'曼荼羅寺', pref:'香川', lat:34.275, lng:133.875},
  {n:73,name:'出釈迦寺', pref:'香川', lat:34.285, lng:133.885},
  {n:74,name:'甲山寺',   pref:'香川', lat:34.295, lng:133.905},
  {n:75,name:'善通寺',   pref:'香川', lat:34.225, lng:133.775},
  {n:76,name:'金倉寺',   pref:'香川', lat:34.235, lng:133.795},
  {n:77,name:'道隆寺',   pref:'香川', lat:34.255, lng:133.815},
  {n:78,name:'郷照寺',   pref:'香川', lat:34.295, lng:133.955},
  {n:79,name:'天皇寺',   pref:'香川', lat:34.305, lng:133.985},
  {n:80,name:'国分寺',   pref:'香川', lat:34.285, lng:134.025},
  {n:81,name:'白峯寺',   pref:'香川', lat:34.325, lng:133.905},
  {n:82,name:'根香寺',   pref:'香川', lat:34.345, lng:133.945},
  {n:83,name:'一宮寺',   pref:'香川', lat:34.335, lng:134.045},
  {n:84,name:'屋島寺',   pref:'香川', lat:34.375, lng:134.155},
  {n:85,name:'八栗寺',   pref:'香川', lat:34.405, lng:134.195},
  {n:86,name:'志度寺',   pref:'香川', lat:34.335, lng:134.175},
  {n:87,name:'長尾寺',   pref:'香川', lat:34.245, lng:134.165},
  {n:88,name:'大窪寺',   pref:'香川', lat:34.135, lng:134.275},
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
  if (km <= 0) return { lat: TEMPLES[0].lat, lng: TEMPLES[0].lng, si: 0, ni: 1 };
  if (km >= TOTAL_KM) return { lat: TEMPLES[87].lat, lng: TEMPLES[87].lng, si: 87, ni: null };
  for (let i = 1; i < CUM_DIST.length; i++) {
    if (km < CUM_DIST[i]) {
      const t = (km - CUM_DIST[i-1]) / (CUM_DIST[i] - CUM_DIST[i-1]);
      return {
        lat: TEMPLES[i-1].lat + t * (TEMPLES[i].lat - TEMPLES[i-1].lat),
        lng: TEMPLES[i-1].lng + t * (TEMPLES[i].lng - TEMPLES[i-1].lng),
        si: i-1, ni: i,
      };
    }
  }
  return { lat: TEMPLES[87].lat, lng: TEMPLES[87].lng, si: 87, ni: null };
}

let map, currentMarker, routeLine;

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

  // 現在地マーカー（パルスアニメーション付き）
  const icon = L.divIcon({
    className: 'henro-current',
    html: '<div class="ring"></div><div class="dot"></div>',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
  currentMarker = L.marker([TEMPLES[0].lat, TEMPLES[0].lng], { icon, zIndexOffset: 1000 }).addTo(map);

  // 道路に沿ったルートを非同期で読み込み
  loadRoadRoute();
}

// --- 道路ルート取得（OSRM / キャッシュ対応） ---
const ROUTE_CACHE_KEY = 'henro_route_v3';

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

function saveHistoryEntry(steps, label) {
  const now = new Date();
  const date = `${now.getFullYear()}/${String(now.getMonth()+1).padStart(2,'0')}/${String(now.getDate()).padStart(2,'0')}`;
  stepHistory.unshift({ date, steps, label });
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
  if (val > 0) {
    totalSteps += val;
    document.getElementById('inp').value = '';
    saveHistoryEntry(val, '手動入力');
    updateUI();
  }
}

// --- ヘルスケア同期（デモ：本番では HealthKit / Health Connect API を呼ぶ） ---
async function syncSteps() {
  const btn = document.getElementById('sync-btn');
  btn.disabled = true;
  btn.textContent = '取得中...';

  // ↓ デモ: ランダムな歩数（3,000〜12,000歩）
  await new Promise(r => setTimeout(r, 600));
  const todaySteps = Math.floor(Math.random() * 9000) + 3000;
  totalSteps += todaySteps;
  saveHistoryEntry(todaySteps, 'ヘルスケア同期');
  updateUI();

  btn.textContent = `+${todaySteps.toLocaleString()}歩 完了！`;
  setTimeout(() => {
    btn.textContent = 'ヘルスケア同期';
    btn.disabled = false;
  }, 2500);
}

function resetAll() {
  if (!confirm('歩数と入力履歴をすべてリセットしますか？\nこの操作は元に戻せません。')) return;
  totalSteps = 0;
  stepHistory = [];
  localStorage.removeItem('henro_steps');
  localStorage.removeItem(HISTORY_KEY);
  renderHistory();
  updateUI();
}

// --- 初期化 ---
let totalSteps = parseInt(localStorage.getItem('henro_steps') || '0');
loadHistory();

initMap();
updateUI();
renderHistory();

// Service Worker 登録
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(console.error);
}
