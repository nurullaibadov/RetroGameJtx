
import { useState, useEffect, useRef } from "react";

// ─── TRANSLATIONS ────────────────────────────────────────────────────────────
const TRANSLATIONS = {
  en: {
    nav: { home: "Home", games: "Games", arcade: "Arcade", leaderboard: "Leaderboard", news: "News", store: "Store", about: "About" },
    hero: { tagline: "INSERT COIN TO PLAY", subtitle: "The ultimate retro gaming destination. Classic arcade games, epic high scores, and 8-bit nostalgia.", play: "▶ PLAY NOW", browse: "BROWSE GAMES", players: "Players Online", gamesCount: "Classic Games", scores: "High Scores" },
    featured: { title: "FEATURED GAMES", subtitle: "Today's top picks from the arcade vault" },
    genres: { title: "GAME GENRES", all: "ALL", action: "ACTION", puzzle: "PUZZLE", racing: "RACING", rpg: "RPG", sports: "SPORTS", shooter: "SHOOTER" },
    leaderboard: { title: "HALL OF FAME", subtitle: "Top players this week", rank: "RANK", player: "PLAYER", score: "SCORE", level: "LEVEL", badge: "BADGE" },
    news: { title: "ARCADE NEWS", subtitle: "Latest from the gaming world", readMore: "READ MORE →" },
    store: { title: "GAME STORE", subtitle: "Own your classics forever", buy: "BUY NOW", free: "FREE", coins: "COINS" },
    stats: { title: "ARCADE STATS", gamesPlayed: "Games Played Today", newPlayers: "New Players", tokensUsed: "Tokens Used", avgScore: "Avg Score" },
    footer: { tagline: "© 2024 RETRO ARCADE. ALL RIGHTS RESERVED.", links: "Quick Links", social: "Follow Us", newsletter: "Newsletter", subscribe: "SUBSCRIBE", emailPlaceholder: "Enter your email..." },
    theme: { dark: "DARK MODE", light: "LIGHT MODE" },
    search: "Search games...",
    playNow: "PLAY",
    addToFav: "♥ FAV",
    rating: "Rating",
    players: "Players",
  },
  tr: {
    nav: { home: "Ana Sayfa", games: "Oyunlar", arcade: "Arcade", leaderboard: "Liderlik", news: "Haberler", store: "Mağaza", about: "Hakkında" },
    hero: { tagline: "OYNAMAK İÇİN JETON AT", subtitle: "Nihai retro oyun destinasyonu. Klasik arcade oyunları, epik yüksek skorlar ve 8-bit nostaljisi.", play: "▶ ŞIMDI OYNA", browse: "OYUNLARA GÖZA AT", players: "Çevrimiçi Oyuncu", gamesCount: "Klasik Oyun", scores: "En Yüksek Skor" },
    featured: { title: "ÖNE ÇIKAN OYUNLAR", subtitle: "Arcade kasasından bugünün en iyi seçimleri" },
    genres: { title: "OYUN TÜRLERİ", all: "TÜMÜ", action: "AKSİYON", puzzle: "BULMACA", racing: "YARŞ", rpg: "RPG", sports: "SPOR", shooter: "NİŞANCI" },
    leaderboard: { title: "ŞÖHRET SALONU", subtitle: "Bu haftanın en iyi oyuncuları", rank: "SIRA", player: "OYUNCU", score: "SKOR", level: "SEVİYE", badge: "ROZET" },
    news: { title: "ARCADE HABERLERİ", subtitle: "Oyun dünyasından son haberler", readMore: "DEVAMINI OKU →" },
    store: { title: "OYUN MAĞAZASI", subtitle: "Klasiklerinize sonsuza kadar sahip olun", buy: "SATIN AL", free: "ÜCRETSİZ", coins: "PARA" },
    stats: { title: "ARCADE İSTATİSTİKLERİ", gamesPlayed: "Bugün Oynanan Oyunlar", newPlayers: "Yeni Oyuncular", tokensUsed: "Kullanılan Jeton", avgScore: "Ort. Skor" },
    footer: { tagline: "© 2024 RETRO ARCADE. TÜM HAKLARI SAKLIDIR.", links: "Hızlı Bağlantılar", social: "Bizi Takip Edin", newsletter: "Bülten", subscribe: "ABONE OL", emailPlaceholder: "E-postanızı girin..." },
    theme: { dark: "KARANLIK MOD", light: "AYDINLIK MOD" },
    search: "Oyun ara...",
    playNow: "OYNA",
    addToFav: "♥ FAVORİ",
    rating: "Puan",
    players: "Oyuncu",
  },
  ru: {
    nav: { home: "Главная", games: "Игры", arcade: "Аркада", leaderboard: "Рейтинг", news: "Новости", store: "Магазин", about: "О нас" },
    hero: { tagline: "ВСТАВЬТЕ МОНЕТУ", subtitle: "Лучшее место для ретро-игр. Классические аркады, рекорды и 8-битная ностальгия.", play: "▶ ИГРАТЬ", browse: "СМОТРЕТЬ ИГРЫ", players: "Игроков онлайн", gamesCount: "Классических игр", scores: "Рекордов" },
    featured: { title: "ИЗБРАННЫЕ ИГРЫ", subtitle: "Лучшие игры из аркадного хранилища сегодня" },
    genres: { title: "ЖАНРЫ ИГР", all: "ВСЕ", action: "ЭКШН", puzzle: "ГОЛОВОЛОМКИ", racing: "ГОНКИ", rpg: "РПГ", sports: "СПОРТ", shooter: "ШУТЕР" },
    leaderboard: { title: "ЗАЛ СЛАВЫ", subtitle: "Лучшие игроки недели", rank: "МЕСТО", player: "ИГРОК", score: "ОЧКИ", level: "УРОВЕНЬ", badge: "ЗНАЧОК" },
    news: { title: "НОВОСТИ АРКАДЫ", subtitle: "Последнее из мира игр", readMore: "ЧИТАТЬ ДАЛЕЕ →" },
    store: { title: "ИГРОВОЙ МАГАЗИН", subtitle: "Владей классикой навсегда", buy: "КУПИТЬ", free: "БЕСПЛАТНО", coins: "МОНЕТЫ" },
    stats: { title: "СТАТИСТИКА", gamesPlayed: "Игр сыграно сегодня", newPlayers: "Новых игроков", tokensUsed: "Использовано жетонов", avgScore: "Средний счёт" },
    footer: { tagline: "© 2024 RETRO ARCADE. ВСЕ ПРАВА ЗАЩИЩЕНЫ.", links: "Быстрые ссылки", social: "Следите за нами", newsletter: "Рассылка", subscribe: "ПОДПИСАТЬСЯ", emailPlaceholder: "Введите email..." },
    theme: { dark: "ТЁМНАЯ ТЕМА", light: "СВЕТЛАЯ ТЕМА" },
    search: "Поиск игр...",
    playNow: "ИГРАТЬ",
    addToFav: "♥ ИЗБ",
    rating: "Рейтинг",
    players: "Игроков",
  },
  de: {
    nav: { home: "Startseite", games: "Spiele", arcade: "Arcade", leaderboard: "Rangliste", news: "Neuigkeiten", store: "Shop", about: "Über uns" },
    hero: { tagline: "MÜNZE EINWERFEN", subtitle: "Das ultimative Retro-Gaming-Ziel. Klassische Arcade-Spiele, epische Highscores und 8-Bit-Nostalgie.", play: "▶ JETZT SPIELEN", browse: "SPIELE DURCHSUCHEN", players: "Spieler Online", gamesCount: "Klassiker", scores: "Highscores" },
    featured: { title: "AUSGEWÄHLTE SPIELE", subtitle: "Die besten Picks aus dem Arcade-Tresor heute" },
    genres: { title: "SPIELGENRES", all: "ALLE", action: "ACTION", puzzle: "PUZZLE", racing: "RENNEN", rpg: "RPG", sports: "SPORT", shooter: "SHOOTER" },
    leaderboard: { title: "RUHMESHALLE", subtitle: "Top-Spieler dieser Woche", rank: "RANG", player: "SPIELER", score: "PUNKTE", level: "LEVEL", badge: "ABZEICHEN" },
    news: { title: "ARCADE-NACHRICHTEN", subtitle: "Neuestes aus der Spielwelt", readMore: "WEITERLESEN →" },
    store: { title: "SPIELESHOP", subtitle: "Besitze deine Klassiker für immer", buy: "KAUFEN", free: "KOSTENLOS", coins: "MÜNZEN" },
    stats: { title: "ARCADE-STATISTIKEN", gamesPlayed: "Heute gespielte Spiele", newPlayers: "Neue Spieler", tokensUsed: "Verwendete Token", avgScore: "Ø Punkte" },
    footer: { tagline: "© 2024 RETRO ARCADE. ALLE RECHTE VORBEHALTEN.", links: "Schnelllinks", social: "Folgt uns", newsletter: "Newsletter", subscribe: "ABONNIEREN", emailPlaceholder: "E-Mail eingeben..." },
    theme: { dark: "DUNKELMODUS", light: "HELLMODUS" },
    search: "Spiele suchen...",
    playNow: "SPIELEN",
    addToFav: "♥ FAV",
    rating: "Wertung",
    players: "Spieler",
  },
};

// ─── DATA ────────────────────────────────────────────────────────────────────
const GAMES = [
  { id: 1, title: "SPACE INVADERS", genre: "shooter", year: 1978, rating: 4.9, players: "2.4M", price: 0, icon: "👾", color: "#00ff41", desc: "Defend Earth from waves of alien invaders!", featured: true, difficulty: "MEDIUM", developer: "TAITO" },
  { id: 2, title: "PAC-MAN", genre: "action", year: 1980, rating: 4.8, players: "3.1M", price: 0, icon: "🟡", color: "#ffff00", desc: "Eat dots and avoid the ghosts in the maze!", featured: true, difficulty: "EASY", developer: "NAMCO" },
  { id: 3, title: "DONKEY KONG", genre: "action", year: 1981, rating: 4.7, players: "1.8M", price: 2.99, icon: "🦍", color: "#ff6b35", desc: "Climb ladders, avoid barrels, save Pauline!", featured: true, difficulty: "HARD", developer: "NINTENDO" },
  { id: 4, title: "TETRIS", genre: "puzzle", year: 1984, rating: 4.9, players: "5.2M", price: 0, icon: "🟦", color: "#00bfff", desc: "The legendary block-stacking puzzle game!", featured: true, difficulty: "MEDIUM", developer: "ALEXEY PAJITNOV" },
  { id: 5, title: "GALAGA", genre: "shooter", year: 1981, rating: 4.6, players: "1.2M", price: 1.99, icon: "🚀", color: "#ff00ff", desc: "Battle alien formations in deep space!", featured: false, difficulty: "MEDIUM", developer: "NAMCO" },
  { id: 6, title: "STREET FIGHTER II", genre: "action", year: 1991, rating: 4.8, players: "4.5M", price: 4.99, icon: "🥊", color: "#ff4500", desc: "World warriors battle for supremacy!", featured: false, difficulty: "HARD", developer: "CAPCOM" },
  { id: 7, title: "SUPER MARIO BROS", genre: "action", year: 1985, rating: 5.0, players: "9.8M", price: 3.99, icon: "🍄", color: "#e84393", desc: "Save Princess Peach from Bowser!", featured: false, difficulty: "EASY", developer: "NINTENDO" },
  { id: 8, title: "SONIC THE HEDGEHOG", genre: "action", year: 1991, rating: 4.7, players: "6.2M", price: 2.99, icon: "💨", color: "#0044ff", desc: "Speed through zones at the speed of sound!", featured: false, difficulty: "MEDIUM", developer: "SEGA" },
  { id: 9, title: "FROGGER", genre: "action", year: 1981, rating: 4.3, players: "890K", price: 0, icon: "🐸", color: "#00ff88", desc: "Help froggy cross the road and river!", featured: false, difficulty: "EASY", developer: "KONAMI" },
  { id: 10, title: "ASTEROIDS", genre: "shooter", year: 1979, rating: 4.4, players: "720K", price: 0, icon: "☄️", color: "#aaaaff", desc: "Blast asteroids and UFOs in space!", featured: false, difficulty: "MEDIUM", developer: "ATARI" },
  { id: 11, title: "POLE POSITION", genre: "racing", year: 1982, rating: 4.2, players: "560K", price: 1.99, icon: "🏎️", color: "#ff3333", desc: "Race to the finish in this classic racer!", featured: false, difficulty: "MEDIUM", developer: "NAMCO" },
  { id: 12, title: "CENTIPEDE", genre: "shooter", year: 1980, rating: 4.5, players: "980K", price: 0, icon: "🐛", color: "#00ff99", desc: "Shoot the centipede before it reaches you!", featured: false, difficulty: "HARD", developer: "ATARI" },
];

const LEADERBOARD = [
  { rank: 1, name: "MEGA_PLAYER_1", score: 9999999, level: 99, badge: "👑", country: "🇺🇸" },
  { rank: 2, name: "PIXEL_MASTER", score: 8547230, level: 87, badge: "🥈", country: "🇯🇵" },
  { rank: 3, name: "RETRO_KING", score: 7234567, level: 76, badge: "🥉", country: "🇩🇪" },
  { rank: 4, name: "ARCADE_WIZARD", score: 6543210, level: 65, badge: "⚡", country: "🇬🇧" },
  { rank: 5, name: "JOYSTICK_PRO", score: 5432100, level: 54, badge: "🎮", country: "🇫🇷" },
  { rank: 6, name: "HIGH_SCORE_X", score: 4321000, level: 43, badge: "🔥", country: "🇰🇷" },
  { rank: 7, name: "COIN_CRUSHER", score: 3210000, level: 32, badge: "⭐", country: "🇧🇷" },
  { rank: 8, name: "NEON_WARRIOR", score: 2109000, level: 21, badge: "💎", country: "🇦🇺" },
];

const NEWS = [
  { id: 1, title: "NEW TOURNAMENT: GALACTIC CHAMPIONSHIP 2024", date: "DEC 15, 2024", category: "TOURNAMENT", excerpt: "Join 10,000 players in the biggest retro gaming tournament of the year. $50,000 prize pool!", img: "🏆" },
  { id: 2, title: "CLASSIC ARCADE CABINET NOW AVAILABLE", date: "DEC 12, 2024", category: "STORE", excerpt: "We're bringing back the original arcade cabinet experience. Pre-order your home cabinet today!", img: "🕹️" },
  { id: 3, title: "PAC-MAN HIGH SCORE BROKEN AFTER 40 YEARS", date: "DEC 10, 2024", category: "RECORD", excerpt: "A new player has broken the legendary Pac-Man perfect score record that stood for over four decades!", img: "🎯" },
];

const ACHIEVEMENTS = [
  { id: 1, icon: "🏆", title: "FIRST BLOOD", desc: "Win your first game", unlocked: true },
  { id: 2, icon: "💯", title: "PERFECT SCORE", desc: "Score 100% in any game", unlocked: true },
  { id: 3, icon: "🔥", title: "ON FIRE", desc: "Win 10 games in a row", unlocked: false },
  { id: 4, icon: "👾", title: "ALIEN SLAYER", desc: "Defeat 1000 aliens", unlocked: false },
  { id: 5, icon: "⚡", title: "SPEED DEMON", desc: "Complete a level in under 60s", unlocked: true },
  { id: 6, icon: "🌟", title: "LEGEND", desc: "Reach rank #1", unlocked: false },
];

// ─── PIXEL FONT STYLE ────────────────────────────────────────────────────────
const pixelStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323:wght@400&display=swap');
  * { box-sizing: border-box; }
  body { margin: 0; font-family: 'VT323', monospace; }
  .pixel-font { font-family: 'Press Start 2P', monospace; }
  .vt-font { font-family: 'VT323', monospace; }
  
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes scanline { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
  @keyframes flicker { 0%,100%{opacity:1} 92%{opacity:0.95} 94%{opacity:0.85} 96%{opacity:0.95} }
  @keyframes glitch {
    0%{transform:translate(0)} 20%{transform:translate(-2px,2px)} 40%{transform:translate(2px,-1px)}
    60%{transform:translate(-1px,1px)} 80%{transform:translate(1px,-2px)} 100%{transform:translate(0)}
  }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes pulse-green { 0%,100%{box-shadow:0 0 5px #00ff41,0 0 10px #00ff41} 50%{box-shadow:0 0 20px #00ff41,0 0 40px #00ff41} }
  @keyframes marquee { 0%{transform:translateX(100%)} 100%{transform:translateX(-100%)} }
  @keyframes rgb-shift { 0%{filter:hue-rotate(0deg)} 100%{filter:hue-rotate(360deg)} }
  @keyframes fadeInUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes coin-spin { 0%{transform:rotateY(0)} 50%{transform:rotateY(90deg)} 100%{transform:rotateY(180deg)} }

  .blink { animation: blink 1s step-end infinite; }
  .float { animation: float 3s ease-in-out infinite; }
  .pulse-green { animation: pulse-green 2s ease-in-out infinite; }
  .rgb-shift { animation: rgb-shift 4s linear infinite; }
  .fade-in-up { animation: fadeInUp 0.5s ease forwards; }
  .glitch:hover { animation: glitch 0.3s steps(2) infinite; }
  .marquee { animation: marquee 20s linear infinite; white-space:nowrap; display:inline-block; }

  .crt-overlay {
    position:fixed; top:0;left:0;width:100%;height:100%;
    pointer-events:none; z-index:9999;
    background: repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.03) 2px,rgba(0,0,0,0.03) 4px);
  }

  .game-card:hover { transform: translateY(-4px) scale(1.02); transition: all 0.2s; }
  .game-card { transition: all 0.2s; }
  
  .neon-border { border: 2px solid #00ff41; box-shadow: 0 0 10px #00ff41, inset 0 0 10px rgba(0,255,65,0.05); }
  .neon-pink { border: 2px solid #ff00ff; box-shadow: 0 0 10px #ff00ff, inset 0 0 10px rgba(255,0,255,0.05); }
  .neon-cyan { border: 2px solid #00ffff; box-shadow: 0 0 10px #00ffff, inset 0 0 10px rgba(0,255,255,0.05); }

  .star-bg {
    background-image: radial-gradient(1px 1px at 20% 30%, white 0%, transparent 100%),
      radial-gradient(1px 1px at 80% 10%, white 0%, transparent 100%),
      radial-gradient(1px 1px at 50% 70%, white 0%, transparent 100%),
      radial-gradient(1px 1px at 10% 60%, rgba(255,255,255,0.7) 0%, transparent 100%),
      radial-gradient(1px 1px at 90% 80%, rgba(255,255,255,0.5) 0%, transparent 100%);
  }

  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: #000; }
  ::-webkit-scrollbar-thumb { background: #00ff41; border-radius: 0; }

  .dark-mode { background: #050508; color: #e0e0e0; }
  .light-mode { background: #f0f0f0; color: #111; }
  
  .rating-stars { color: #ffff00; letter-spacing: 2px; }
  
  .progress-bar {
    height: 6px; background: rgba(0,255,65,0.2); border-radius: 0;
    overflow: hidden; border: 1px solid rgba(0,255,65,0.4);
  }
  .progress-fill { height: 100%; background: #00ff41; transition: width 1s ease; }
`;

// ─── COMPONENTS ──────────────────────────────────────────────────────────────
function StarRating({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="rating-stars text-sm">
      {"★".repeat(full)}{half ? "½" : ""}{"☆".repeat(5 - full - (half ? 1 : 0))}
    </span>
  );
}

function PixelButton({ children, onClick, variant = "green", className = "", size = "md" }) {
  const colors = {
    green: "border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black shadow-[0_0_10px_#00ff41]",
    pink: "border-[#ff00ff] text-[#ff00ff] hover:bg-[#ff00ff] hover:text-black shadow-[0_0_10px_#ff00ff]",
    cyan: "border-[#00ffff] text-[#00ffff] hover:bg-[#00ffff] hover:text-black shadow-[0_0_10px_#00ffff]",
    yellow: "border-[#ffff00] text-[#ffff00] hover:bg-[#ffff00] hover:text-black shadow-[0_0_10px_#ffff00]",
    red: "border-[#ff0000] text-[#ff0000] hover:bg-[#ff0000] hover:text-white shadow-[0_0_10px_#ff0000]",
  };
  const sizes = { sm: "px-3 py-1 text-xs", md: "px-4 py-2 text-sm", lg: "px-6 py-3 text-base" };
  return (
    <button
      onClick={onClick}
      className={`pixel-font border-2 bg-transparent transition-all duration-150 cursor-pointer active:scale-95 ${colors[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}

function GameCard({ game, t, isDark, onPlay, onFav, favorites }) {
  const isFav = favorites.includes(game.id);
  const diffColor = { EASY: "#00ff41", MEDIUM: "#ffff00", HARD: "#ff4500" };
  return (
    <div className={`game-card neon-border relative overflow-hidden cursor-pointer ${isDark ? "bg-[#0a0a12]" : "bg-white"}`}>
      <div className="absolute top-0 left-0 w-full h-1" style={{ background: game.color }} />
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="text-4xl float">{game.icon}</div>
          <div className="flex flex-col items-end gap-1">
            <span className="pixel-font text-[8px] px-2 py-1" style={{ color: diffColor[game.difficulty], border: `1px solid ${diffColor[game.difficulty]}` }}>
              {game.difficulty}
            </span>
            {game.price === 0
              ? <span className="pixel-font text-[8px] px-2 py-1 border border-[#00ff41] text-[#00ff41]">FREE</span>
              : <span className="pixel-font text-[8px] px-2 py-1 border border-[#ffff00] text-[#ffff00]">${game.price}</span>}
          </div>
        </div>
        <h3 className="pixel-font text-xs mb-1" style={{ color: game.color }}>{game.title}</h3>
        <p className={`vt-font text-sm mb-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>{game.developer} · {game.year}</p>
        <p className={`vt-font text-sm mb-3 line-clamp-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>{game.desc}</p>
        <div className="flex justify-between items-center mb-3">
          <StarRating rating={game.rating} />
          <span className={`vt-font text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>👤 {game.players}</span>
        </div>
        <div className="flex gap-2">
          <PixelButton onClick={() => onPlay(game)} variant="green" size="sm" className="flex-1">{t.playNow}</PixelButton>
          <PixelButton onClick={() => onFav(game.id)} variant={isFav ? "pink" : "cyan"} size="sm">{isFav ? "♥" : "♡"}</PixelButton>
        </div>
      </div>
    </div>
  );
}

function Notification({ msg, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className="fixed top-20 right-4 z-50 neon-border bg-black text-[#00ff41] pixel-font text-xs p-3 max-w-xs fade-in-up">
      <div className="flex justify-between items-start gap-2">
        <span>{msg}</span>
        <button onClick={onClose} className="text-[#ff00ff] ml-2">✕</button>
      </div>
    </div>
  );
}

// ─── MINI SNAKE GAME ─────────────────────────────────────────────────────────
function SnakeGame() {
  const SIZE = 15;
  const [snake, setSnake] = useState([[7,7],[6,7],[5,7]]);
  const [food, setFood] = useState([10,5]);
  const [dir, setDir] = useState([1,0]);
  const [score, setScore] = useState(0);
  const [running, setRunning] = useState(false);
  const [dead, setDead] = useState(false);
  const dirRef = useRef([1,0]);

  const newFood = (s) => {
    let f;
    do { f = [Math.floor(Math.random()*SIZE), Math.floor(Math.random()*SIZE)]; }
    while (s.some(c => c[0]===f[0] && c[1]===f[1]));
    return f;
  };

  useEffect(() => {
    if (!running) return;
    const iv = setInterval(() => {
      setSnake(prev => {
        const d = dirRef.current;
        const head = [prev[0][0]+d[0], prev[0][1]+d[1]];
        if (head[0]<0||head[0]>=SIZE||head[1]<0||head[1]>=SIZE||prev.some(c=>c[0]===head[0]&&c[1]===head[1])) {
          setRunning(false); setDead(true); return prev;
        }
        const ateFood = head[0]===food[0]&&head[1]===food[1];
        const next = ateFood ? [head,...prev] : [head,...prev.slice(0,-1)];
        if (ateFood) { setScore(s=>s+10); setFood(newFood(next)); }
        return next;
      });
    }, 150);
    return () => clearInterval(iv);
  }, [running, food]);

  useEffect(() => {
    const k = (e) => {
      const map = { ArrowUp:[0,-1], ArrowDown:[0,1], ArrowLeft:[-1,0], ArrowRight:[1,0], w:[0,-1], s:[0,1], a:[-1,0], d:[1,0] };
      if (map[e.key]) {
        const nd = map[e.key];
        if (nd[0]+dirRef.current[0]!==0||nd[1]+dirRef.current[1]!==0) dirRef.current = nd;
      }
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  const reset = () => { setSnake([[7,7],[6,7],[5,7]]); setFood([10,5]); dirRef.current=[1,0]; setDir([1,0]); setScore(0); setDead(false); setRunning(true); };

  const cell = (x,y) => {
    if (snake[0][0]===x&&snake[0][1]===y) return "#00ff41";
    if (snake.some((c,i)=>i>0&&c[0]===x&&c[1]===y)) return "#005522";
    if (food[0]===x&&food[1]===y) return "#ff0044";
    return "transparent";
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="pixel-font text-[#00ff41] text-xs">SCORE: {score}</div>
      <div style={{ display:"grid", gridTemplateColumns:`repeat(${SIZE},1fr)`, width:225, height:225, border:"2px solid #00ff41", boxShadow:"0 0 10px #00ff41" }}>
        {Array.from({length:SIZE},(_, y)=>Array.from({length:SIZE},(_, x)=>(
          <div key={`${x}-${y}`} style={{ background: cell(x,y), border:"0.5px solid rgba(0,255,65,0.1)", transition: "background 0.1s" }} />
        )))}
      </div>
      {!running && (
        <div className="flex flex-col items-center gap-2">
          {dead && <div className="pixel-font text-[#ff0044] text-xs blink">GAME OVER!</div>}
          <PixelButton onClick={reset} variant="green" size="sm">{dead ? "RETRY" : "START"}</PixelButton>
        </div>
      )}
      <div className="flex gap-2">
        {[[0,-1,"▲"],[−1,0,"◄"],[0,1,"▼"],[1,0,"►"]].map(([dx,dy,lbl])=>(
          <button key={lbl} onPointerDown={()=>{if(dx+dirRef.current[0]!==0||dy+dirRef.current[1]!==0)dirRef.current=[dx,dy];}}
            className="pixel-font text-[#00ff41] text-xs p-2 border border-[#00ff41] bg-black hover:bg-[#00ff41] hover:text-black w-8 h-8 flex items-center justify-center">
            {lbl}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function RetroArcade() {
  const [isDark, setIsDark] = useState(true);
  const [lang, setLang] = useState("en");
  const [activeSection, setActiveSection] = useState("home");
  const [activeGenre, setActiveGenre] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([1, 4]);
  const [notification, setNotification] = useState(null);
  const [playingGame, setPlayingGame] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [counter, setCounter] = useState({ players: 42891, games: 500, scores: 12847203 });
  const [showAchievements, setShowAchievements] = useState(false);
  const t = TRANSLATIONS[lang];

  // Live counter animation
  useEffect(() => {
    const iv = setInterval(() => {
      setCounter(c => ({ ...c, players: c.players + Math.floor(Math.random()*3), scores: c.scores + Math.floor(Math.random()*100) }));
    }, 2000);
    return () => clearInterval(iv);
  }, []);

  const notify = (msg) => setNotification(msg);

  const handleFav = (id) => {
    setFavorites(prev => {
      const isFav = prev.includes(id);
      notify(isFav ? "REMOVED FROM FAVORITES!" : "ADDED TO FAVORITES! ♥");
      return isFav ? prev.filter(f => f !== id) : [...prev, id];
    });
  };

  const handlePlay = (game) => {
    setPlayingGame(game);
    notify(`LOADING ${game.title}...`);
  };

  const filteredGames = GAMES.filter(g => {
    const matchGenre = activeGenre === "all" || g.genre === activeGenre;
    const matchSearch = g.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchTab = activeTab === "all" || (activeTab === "free" && g.price === 0) || (activeTab === "fav" && favorites.includes(g.id));
    return matchGenre && matchSearch && matchTab;
  });

  const bg = isDark ? "#050508" : "#f0f0f0";
  const cardBg = isDark ? "#0a0a12" : "#ffffff";
  const text = isDark ? "#e0e0e0" : "#111111";
  const textMuted = isDark ? "#888888" : "#555555";
  const borderCol = isDark ? "#1a1a2e" : "#dddddd";

  const sectionStyle = { minHeight: "100vh", background: bg, color: text };

  const langs = [
    { code: "en", flag: "🇬🇧", label: "EN" },
    { code: "tr", flag: "🇹🇷", label: "TR" },
    { code: "ru", flag: "🇷🇺", label: "RU" },
    { code: "de", flag: "🇩🇪", label: "DE" },
  ];

  const navItems = Object.entries(t.nav).map(([k, v]) => ({ key: k, label: v }));

  return (
    <div style={{ fontFamily: "'VT323', monospace", background: bg, color: text, minHeight: "100vh" }}>
      <style>{pixelStyle}</style>
      <div className="crt-overlay" />

      {notification && <Notification msg={notification} onClose={() => setNotification(null)} />}

      {/* PLAY MODAL */}
      {playingGame && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setPlayingGame(null)}>
          <div className="neon-border bg-black p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="pixel-font text-xs" style={{ color: playingGame.color }}>{playingGame.title}</h2>
              <button onClick={() => setPlayingGame(null)} className="text-[#ff00ff] pixel-font text-xs">✕ CLOSE</button>
            </div>
            <div className="text-center text-6xl mb-4 float">{playingGame.icon}</div>
            <SnakeGame />
            <p className="vt-font text-center text-gray-500 text-sm mt-2">Arrow keys or WASD · Playing Snake Demo</p>
          </div>
        </div>
      )}

      {/* TICKER */}
      <div style={{ background: "#00ff41", color: "#000", padding: "4px 0", overflow: "hidden" }}>
        <div className="marquee pixel-font text-xs">
          🎮 WELCOME TO RETRO ARCADE &nbsp;&nbsp;•&nbsp;&nbsp; 🏆 NEW HIGH SCORE: MEGA_PLAYER_1 - 9,999,999 PTS &nbsp;&nbsp;•&nbsp;&nbsp; 👾 TOURNAMENT STARTS DEC 25 &nbsp;&nbsp;•&nbsp;&nbsp; 🕹️ 500+ CLASSIC GAMES &nbsp;&nbsp;•&nbsp;&nbsp; INSERT COIN TO CONTINUE... &nbsp;&nbsp;•&nbsp;&nbsp; 🎯 PAC-MAN RECORD BROKEN! &nbsp;&nbsp;•&nbsp;&nbsp; ⚡ DOUBLE XP WEEKEND! &nbsp;&nbsp;&nbsp;&nbsp;
        </div>
      </div>

      {/* NAV */}
      <nav style={{ background: isDark ? "#0a0a12" : "#1a1a2e", borderBottom: "2px solid #00ff41", boxShadow: "0 2px 20px rgba(0,255,65,0.2)", position: "sticky", top: 0, zIndex: 40 }}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveSection("home")}>
            <div className="text-2xl float">🕹️</div>
            <div>
              <div className="pixel-font text-[#00ff41] text-xs glitch">RETRO ARCADE</div>
              <div className="pixel-font text-[8px] text-[#ff00ff] blink">INSERT COIN</div>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ key, label }) => (
              <button key={key} onClick={() => setActiveSection(key)}
                className={`pixel-font text-[9px] px-3 py-2 transition-all cursor-pointer ${activeSection === key ? "text-black bg-[#00ff41]" : "text-[#00ff41] hover:bg-[#00ff41] hover:text-black"}`}>
                {label}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Language */}
            <div className="flex items-center gap-1">
              {langs.map(l => (
                <button key={l.code} onClick={() => setLang(l.code)}
                  className={`text-xs px-1 py-0.5 border transition-all cursor-pointer ${lang === l.code ? "border-[#00ff41] text-[#00ff41] bg-[#00ff41]/10" : "border-transparent text-gray-500 hover:border-gray-500"}`}>
                  {l.flag}
                </button>
              ))}
            </div>

            {/* Theme */}
            <button onClick={() => setIsDark(!isDark)}
              className="pixel-font text-[8px] px-2 py-1 border border-[#ffff00] text-[#ffff00] hover:bg-[#ffff00] hover:text-black transition-all cursor-pointer">
              {isDark ? "☀" : "🌙"}
            </button>

            {/* Achievements */}
            <button onClick={() => setShowAchievements(!showAchievements)}
              className="pixel-font text-[8px] px-2 py-1 border border-[#ff00ff] text-[#ff00ff] hover:bg-[#ff00ff] hover:text-black transition-all cursor-pointer">
              🏆
            </button>

            {/* Mobile menu */}
            <button className="md:hidden text-[#00ff41] text-xl" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>≡</button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div style={{ background: "#0a0a12", borderTop: "1px solid #00ff41" }} className="md:hidden px-4 py-3 grid grid-cols-2 gap-2">
            {navItems.map(({ key, label }) => (
              <button key={key} onClick={() => { setActiveSection(key); setMobileMenuOpen(false); }}
                className={`pixel-font text-[9px] px-3 py-2 text-left cursor-pointer ${activeSection === key ? "text-black bg-[#00ff41]" : "text-[#00ff41] border border-[#00ff41]/30"}`}>
                {label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ACHIEVEMENTS SIDEBAR */}
      {showAchievements && (
        <div className="fixed right-0 top-0 h-full z-40 w-64" style={{ background: isDark ? "#0a0a12" : "#111", borderLeft: "2px solid #ff00ff", boxShadow: "-5px 0 20px rgba(255,0,255,0.2)", overflowY: "auto" }}>
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="pixel-font text-[#ff00ff] text-xs">ACHIEVEMENTS</h3>
              <button onClick={() => setShowAchievements(false)} className="text-[#ff00ff] cursor-pointer">✕</button>
            </div>
            <div className="space-y-3">
              {ACHIEVEMENTS.map(a => (
                <div key={a.id} className={`p-3 border ${a.unlocked ? "border-[#ff00ff]" : "border-gray-700"} ${a.unlocked ? "" : "opacity-40"}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{a.icon}</span>
                    <span className="pixel-font text-[8px]" style={{ color: a.unlocked ? "#ff00ff" : "#666" }}>{a.title}</span>
                  </div>
                  <p className="vt-font text-xs text-gray-400">{a.desc}</p>
                  {a.unlocked && <div className="mt-1 vt-font text-xs text-[#00ff41]">✓ UNLOCKED</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── HERO ── */}
      {(activeSection === "home" || activeSection === "arcade") && (
        <section style={{ background: isDark ? "#050508" : "#0d0d1a", minHeight: "85vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
          {/* Starfield */}
          <div className="absolute inset-0 star-bg" style={{ opacity: 0.6 }} />
          {/* Grid lines */}
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(0,255,65,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

          <div className="max-w-7xl mx-auto px-4 py-16 relative z-10 text-center w-full">
            {/* Floating game icons */}
            <div className="absolute top-10 left-10 text-4xl float" style={{ animationDelay: "0s" }}>👾</div>
            <div className="absolute top-20 right-16 text-3xl float" style={{ animationDelay: "0.5s" }}>🚀</div>
            <div className="absolute bottom-20 left-20 text-3xl float" style={{ animationDelay: "1s" }}>🍄</div>
            <div className="absolute bottom-10 right-10 text-4xl float" style={{ animationDelay: "1.5s" }}>🎮</div>

            <div className="pixel-font text-[#ff00ff] text-xs mb-4 tracking-widest blink">— {t.hero.tagline} —</div>
            <h1 className="pixel-font text-[#00ff41] text-2xl md:text-4xl mb-2 glitch" style={{ textShadow: "0 0 20px #00ff41, 0 0 40px #00ff41" }}>
              RETRO ARCADE
            </h1>
            <h2 className="pixel-font text-[#ffff00] text-sm md:text-xl mb-6" style={{ textShadow: "0 0 10px #ffff00" }}>
              HALL OF LEGENDS
            </h2>
            <p className="vt-font text-gray-300 text-xl md:text-2xl max-w-2xl mx-auto mb-8">{t.hero.subtitle}</p>

            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <PixelButton onClick={() => { setActiveSection("games"); notify("WELCOME TO THE ARCADE!"); }} variant="green" size="lg">{t.hero.play}</PixelButton>
              <PixelButton onClick={() => setActiveSection("games")} variant="pink" size="lg">{t.hero.browse}</PixelButton>
            </div>

            {/* Live Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
              {[
                { val: counter.players.toLocaleString(), label: t.hero.players, color: "#00ff41" },
                { val: counter.games, label: t.hero.gamesCount, color: "#ff00ff" },
                { val: counter.scores.toLocaleString(), label: t.hero.scores, color: "#ffff00" },
              ].map(s => (
                <div key={s.label} className="neon-border p-3 text-center" style={{ background: "rgba(0,0,0,0.6)" }}>
                  <div className="pixel-font text-xs" style={{ color: s.color }}>{s.val}</div>
                  <div className="vt-font text-xs text-gray-400 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── GAMES SECTION ── */}
      {(activeSection === "home" || activeSection === "games") && (
        <section style={sectionStyle} className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="pixel-font text-[#00ff41] text-sm md:text-xl mb-2">{t.featured.title}</h2>
              <p className="vt-font text-gray-400 text-lg">{t.featured.subtitle}</p>
            </div>

            {/* Search */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <input
                value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                placeholder={t.search}
                className="flex-1 bg-transparent border-2 border-[#00ff41] px-4 py-2 vt-font text-xl outline-none focus:shadow-[0_0_10px_#00ff41] transition-all"
                style={{ color: text }}
              />
              <div className="flex gap-2">
                {["all","free","fav"].map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`pixel-font text-[9px] px-3 py-2 border transition-all cursor-pointer ${activeTab === tab ? "bg-[#00ff41] text-black border-[#00ff41]" : "border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41]/20"}`}>
                    {tab.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Genre Filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              {Object.entries(t.genres).filter(([k]) => k !== "title").map(([key, label]) => (
                <button key={key} onClick={() => setActiveGenre(key === "all" ? "all" : key)}
                  className={`pixel-font text-[9px] px-3 py-2 border transition-all cursor-pointer ${activeGenre === (key === "all" ? "all" : key) ? "bg-[#ff00ff] text-black border-[#ff00ff]" : "border-[#ff00ff] text-[#ff00ff] hover:bg-[#ff00ff]/20"}`}>
                  {label}
                </button>
              ))}
            </div>

            {/* Game Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredGames.map((game, i) => (
                <div key={game.id} className="fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                  <GameCard game={game} t={t} isDark={isDark} onPlay={handlePlay} onFav={handleFav} favorites={favorites} />
                </div>
              ))}
            </div>

            {filteredGames.length === 0 && (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">👾</div>
                <div className="pixel-font text-[#ff0000] text-xs">NO GAMES FOUND</div>
                <div className="vt-font text-gray-400 text-lg mt-2">Try a different search or genre</div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── LEADERBOARD ── */}
      {(activeSection === "home" || activeSection === "leaderboard") && (
        <section style={{ ...sectionStyle, background: isDark ? "#080812" : "#f8f8f8" }} className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="pixel-font text-[#ffff00] text-sm md:text-xl mb-2">{t.leaderboard.title}</h2>
              <p className="vt-font text-gray-400 text-lg">{t.leaderboard.subtitle}</p>
            </div>

            <div className="neon-border overflow-hidden" style={{ background: isDark ? "#0a0a12" : "white" }}>
              <div className="grid grid-cols-5 pixel-font text-[9px] px-4 py-3" style={{ background: "#00ff41", color: "#000" }}>
                <span>{t.leaderboard.rank}</span>
                <span className="col-span-2">{t.leaderboard.player}</span>
                <span>{t.leaderboard.score}</span>
                <span>{t.leaderboard.badge}</span>
              </div>
              {LEADERBOARD.map((p, i) => (
                <div key={p.rank} className="grid grid-cols-5 items-center px-4 py-3 border-b"
                  style={{ borderColor: isDark ? "#1a1a2e" : "#eee", background: i === 0 ? "rgba(0,255,65,0.05)" : "transparent", animation: i < 3 ? "fadeInUp 0.5s ease forwards" : "none", animationDelay: `${i*0.1}s` }}>
                  <span className="pixel-font text-xs" style={{ color: i === 0 ? "#ffff00" : i === 1 ? "#aaaaaa" : i === 2 ? "#ff6600" : textMuted }}>#{p.rank}</span>
                  <span className="col-span-2 vt-font text-lg flex items-center gap-2">
                    {p.country} <span style={{ color: i < 3 ? "#00ff41" : text }}>{p.name}</span>
                  </span>
                  <span className="pixel-font text-xs" style={{ color: "#ff00ff" }}>{p.score.toLocaleString()}</span>
                  <span className="text-xl">{p.badge}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── NEWS ── */}
      {(activeSection === "home" || activeSection === "news") && (
        <section style={sectionStyle} className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="pixel-font text-[#00ffff] text-sm md:text-xl mb-2">{t.news.title}</h2>
              <p className="vt-font text-gray-400 text-lg">{t.news.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {NEWS.map(n => (
                <div key={n.id} className="neon-cyan game-card" style={{ background: cardBg }}>
                  <div className="text-5xl text-center py-6" style={{ borderBottom: `2px solid #00ffff` }}>{n.img}</div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="pixel-font text-[8px] px-2 py-1 border border-[#00ffff] text-[#00ffff]">{n.category}</span>
                      <span className="vt-font text-sm text-gray-500">{n.date}</span>
                    </div>
                    <h3 className="pixel-font text-[9px] text-[#00ffff] mb-2 leading-5">{n.title}</h3>
                    <p className="vt-font text-base text-gray-400 mb-3">{n.excerpt}</p>
                    <PixelButton variant="cyan" size="sm">{t.news.readMore}</PixelButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── STORE ── */}
      {(activeSection === "store") && (
        <section style={sectionStyle} className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="pixel-font text-[#ffff00] text-sm md:text-xl mb-2">{t.store.title}</h2>
              <p className="vt-font text-gray-400 text-lg">{t.store.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {GAMES.filter(g => g.price > 0).map(g => (
                <div key={g.id} className="game-card" style={{ background: cardBg, border: `2px solid ${g.color}`, boxShadow: `0 0 10px ${g.color}40` }}>
                  <div className="p-5">
                    <div className="text-4xl text-center mb-3 float">{g.icon}</div>
                    <h3 className="pixel-font text-xs text-center mb-1" style={{ color: g.color }}>{g.title}</h3>
                    <p className="vt-font text-sm text-gray-400 text-center mb-1">{g.developer}</p>
                    <p className="vt-font text-sm text-gray-500 text-center mb-4">{g.desc}</p>
                    <div className="flex justify-between items-center mb-3">
                      <StarRating rating={g.rating} />
                      <span className="pixel-font text-sm" style={{ color: "#ffff00" }}>${g.price}</span>
                    </div>
                    <PixelButton onClick={() => notify(`PURCHASED ${g.title}!`)} variant="yellow" size="sm" className="w-full">{t.store.buy}</PixelButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── ABOUT ── */}
      {(activeSection === "about") && (
        <section style={sectionStyle} className="py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-6xl mb-6 float">🕹️</div>
            <h2 className="pixel-font text-[#00ff41] text-sm md:text-lg mb-4">ABOUT RETRO ARCADE</h2>
            <div className="neon-border p-6 mb-6" style={{ background: cardBg }}>
              <p className="vt-font text-xl text-gray-300 leading-8 mb-4">
                Founded in 2024, Retro Arcade is the ultimate destination for classic gaming enthusiasts. 
                We believe the golden age of gaming never ended — it just needed the right platform.
              </p>
              <p className="vt-font text-xl text-gray-400 leading-8">
                Our mission: Preserve and celebrate the art of arcade gaming, bringing 8-bit legends to a new generation of players worldwide.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[["500+","Games"],["10M+","Players"],["50+","Countries"],["24/7","Uptime"]].map(([n,l]) => (
                <div key={l} className="neon-border p-4" style={{ background: cardBg }}>
                  <div className="pixel-font text-[#00ff41] text-sm mb-1">{n}</div>
                  <div className="vt-font text-gray-400 text-lg">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── ARCADE (mini games hub) ── */}
      {activeSection === "arcade" && (
        <section style={sectionStyle} className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="pixel-font text-[#ff00ff] text-sm md:text-xl mb-2">ARCADE ZONE</h2>
              <p className="vt-font text-gray-400 text-lg">Play directly in your browser!</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="neon-pink p-6" style={{ background: cardBg }}>
                <h3 className="pixel-font text-[#ff00ff] text-xs mb-4 text-center">🐍 SNAKE CLASSIC</h3>
                <SnakeGame />
              </div>
              <div className="flex flex-col gap-4">
                <div className="neon-border p-4" style={{ background: cardBg }}>
                  <h3 className="pixel-font text-[#00ff41] text-xs mb-3">🎮 QUICK LAUNCH</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {GAMES.slice(0,6).map(g => (
                      <PixelButton key={g.id} onClick={() => handlePlay(g)} variant="green" size="sm" className="text-left">
                        {g.icon} {g.title.slice(0,10)}
                      </PixelButton>
                    ))}
                  </div>
                </div>
                <div className="neon-border p-4" style={{ background: cardBg }}>
                  <h3 className="pixel-font text-[#ffff00] text-xs mb-3">📊 YOUR STATS</h3>
                  <div className="space-y-2">
                    {[["Games Played","42"],["Total Score","128,400"],["Favorites",`${favorites.length}`],["Rank","#1,337"]].map(([l,v]) => (
                      <div key={l} className="flex justify-between vt-font text-lg">
                        <span className="text-gray-400">{l}</span>
                        <span className="text-[#00ff41]">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── FOOTER ── */}
      <footer style={{ background: "#0a0a12", borderTop: "2px solid #00ff41", color: text }}>
        {/* Newsletter */}
        <div style={{ background: "rgba(0,255,65,0.05)", borderBottom: "1px solid #00ff41" }} className="py-8 px-4">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="pixel-font text-[#00ff41] text-xs mb-2">{t.footer.newsletter}</h3>
            <p className="vt-font text-gray-400 text-lg mb-4">Get the latest arcade news and exclusive offers!</p>
            {subscribed ? (
              <div className="pixel-font text-[#00ff41] text-xs blink">✓ SUBSCRIBED! GAME ON!</div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto">
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder={t.footer.emailPlaceholder}
                  className="flex-1 bg-transparent border-2 border-[#00ff41] px-3 py-2 vt-font text-lg outline-none text-white" />
                <PixelButton onClick={() => { if (email) { setSubscribed(true); notify("SUBSCRIBED! GAME ON!"); }}} variant="green">{t.footer.subscribe}</PixelButton>
              </div>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🕹️</span>
              <span className="pixel-font text-[#00ff41] text-xs">RETRO ARCADE</span>
            </div>
            <p className="vt-font text-gray-400 text-lg leading-7">The ultimate retro gaming destination since 2024.</p>
          </div>
          <div>
            <h4 className="pixel-font text-[#ff00ff] text-xs mb-3">{t.footer.links}</h4>
            <ul className="space-y-2">
              {Object.entries(t.nav).map(([k,v]) => (
                <li key={k}><button onClick={() => setActiveSection(k)} className="vt-font text-gray-400 hover:text-[#00ff41] text-lg transition-colors cursor-pointer">{v}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="pixel-font text-[#00ffff] text-xs mb-3">{t.footer.social}</h4>
            <div className="flex flex-wrap gap-2">
              {[["🐦","Twitter"],["📘","Facebook"],["📸","Instagram"],["🎮","Discord"],["▶","YouTube"]].map(([icon,name]) => (
                <button key={name} onClick={() => notify(`OPENING ${name.toUpperCase()}...`)}
                  className="vt-font text-base px-3 py-1 border border-[#00ffff] text-[#00ffff] hover:bg-[#00ffff] hover:text-black transition-all cursor-pointer">
                  {icon} {name}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="pixel-font text-[#ffff00] text-xs mb-3">LANGUAGE</h4>
            <div className="grid grid-cols-2 gap-2">
              {langs.map(l => (
                <button key={l.code} onClick={() => setLang(l.code)}
                  className={`vt-font text-lg px-3 py-2 border transition-all cursor-pointer ${lang === l.code ? "bg-[#ffff00] text-black border-[#ffff00]" : "border-[#ffff00] text-[#ffff00] hover:bg-[#ffff00]/10"}`}>
                  {l.flag} {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #1a1a2e" }} className="py-4 text-center">
          <div className="pixel-font text-[8px] text-gray-600">{t.footer.tagline}</div>
          <div className="vt-font text-gray-600 text-sm mt-1">🎮 PRESS START TO CONTINUE 🎮</div>
        </div>
      </footer>
    </div>
  );
}
