// On line 1 of src/App.tsx
import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import './App.css';
import packageInfo from '../package.json';
import translations from './static/translations_by_page.json';

// --- Data for Navigation (remains the same) ---
const SURAHS = [
    { "number": 1, "name": "Al-Fatihah", "page": 1 }, { "number": 2, "name": "Al-Baqarah", "page": 2 },
    { "number": 3, "name": "Aal-E-Imran", "page": 50 }, { "number": 4, "name": "An-Nisa", "page": 77 },
    { "number": 5, "name": "Al-Ma'idah", "page": 106 }, { "number": 6, "name": "Al-An'am", "page": 128 },
    { "number": 7, "name": "Al-A'raf", "page": 151 }, { "number": 8, "name": "Al-Anfal", "page": 177 },
    { "number": 9, "name": "At-Tawbah", "page": 187 }, { "number": 10, "name": "Yunus", "page": 208 },
    { "number": 11, "name": "Hud", "page": 221 }, { "number": 12, "name": "Yusuf", "page": 235 },
    { "number": 13, "name": "Ar-Ra'd", "page": 249 }, { "number": 14, "name": "Ibrahim", "page": 255 },
    { "number": 15, "name": "Al-Hijr", "page": 262 }, { "number": 16, "name": "An-Nahl", "page": 267 },
    { "number": 17, "name": "Al-Isra", "page": 282 }, { "number": 18, "name": "Al-Kahf", "page": 293 },
    { "number": 19, "name": "Maryam", "page": 305 }, { "number": 20, "name": "Taha", "page": 312 },
    { "number": 21, "name": "Al-Anbiya", "page": 322 }, { "number": 22, "name": "Al-Hajj", "page": 332 },
    { "number": 23, "name": "Al-Mu'minun", "page": 342 }, { "number": 24, "name": "An-Nur", "page": 350 },
    { "number": 25, "name": "Al-Furqan", "page": 359 }, { "number": 26, "name": "Ash-Shu'ara", "page": 367 },
    { "number": 27, "name": "An-Naml", "page": 377 }, { "number": 28, "name": "Al-Qasas", "page": 385 },
    { "number": 29, "name": "Al-Ankabut", "page": 396 }, { "number": 30, "name": "Ar-Rum", "page": 404 },
    { "number": 31, "name": "Luqman", "page": 411 }, { "number": 32, "name": "As-Sajdah", "page": 415 },
    { "number": 33, "name": "Al-Ahzab", "page": 418 }, { "number": 34, "name": "Saba", "page": 428 },
    { "number": 35, "name": "Fatir", "page": 434 }, { "number": 36, "name": "Ya-Sin", "page": 440 },
    { "number": 37, "name": "As-Saffat", "page": 446 }, { "number": 38, "name": "Sad", "page": 453 },
    { "number": 39, "name": "Az-Zumar", "page": 458 }, { "number": 40, "name": "Ghafir", "page": 467 },
    { "number": 41, "name": "Fussilat", "page": 477 }, { "number": 42, "name": "Ash-Shuraa", "page": 483 },
    { "number": 43, "name": "Az-Zukhruf", "page": 489 }, { "number": 44, "name": "Ad-Dukhan", "page": 496 },
    { "number": 45, "name": "Al-Jathiyah", "page": 499 }, { "number": 46, "name": "Al-Ahqaf", "page": 502 },
    { "number": 47, "name": "Muhammad", "page": 507 }, { "number": 48, "name": "Al-Fath", "page": 511 },
    { "number": 49, "name": "Al-Hujurat", "page": 515 }, { "number": 50, "name": "Qaf", "page": 518 },
    { "number": 51, "name": "Adh-Dhariyat", "page": 520 }, { "number": 52, "name": "At-Tur", "page": 523 },
    { "number": 53, "name": "An-Najm", "page": 526 }, { "number": 54, "name": "Al-Qamar", "page": 528 },
    { "number": 55, "name": "Ar-Rahman", "page": 531 }, { "number": 56, "name": "Al-Waqi'ah", "page": 534 },
    { "number": 57, "name": "Al-Hadid", "page": 537 }, { "number": 58, "name": "Al-Mujadila", "page": 542 },
    { "number": 59, "name": "Al-Hashr", "page": 545 }, { "number": 60, "name": "Al-Mumtahanah", "page": 549 },
    { "number": 61, "name": "As-Saf", "page": 551 }, { "number": 62, "name": "Al-Jumu'ah", "page": 553 },
    { "number": 63, "name": "Al-Munafiqun", "page": 554 }, { "number": 64, "name": "At-Taghabun", "page": 556 },
    { "number": 65, "name": "At-Talaq", "page": 558 }, { "number": 66, "name": "At-Tahrim", "page": 560 },
    { "number": 67, "name": "Al-Mulk", "page": 562 }, { "number": 68, "name": "Al-Qalam", "page": 564 },
    { "number": 69, "name": "Al-Haqqah", "page": 566 }, { "number": 70, "name": "Al-Ma'arij", "page": 568 },
    { "number": 71, "name": "Nuh", "page": 570 }, { "number": 72, "name": "Al-Jinn", "page": 572 },
    { "number": 73, "name": "Al-Muzzammil", "page": 574 }, { "number": 74, "name": "Al-Muddaththir", "page": 575 },
    { "number": 75, "name": "Al-Qiyamah", "page": 577 }, { "number": 76, "name": "Al-Insan", "page": 578 },
    { "number": 77, "name": "Al-Mursalat", "page": 580 }, { "number": 78, "name": "An-Naba", "page": 582 },
    { "number": 79, "name": "An-Nazi'at", "page": 583 }, { "number": 80, "name": "Abasa", "page": 585 },
    { "number": 81, "name": "At-Takwir", "page": 586 }, { "number": 82, "name": "Al-Infitar", "page": 587 },
    { "number": 83, "name": "Al-Mutaffifin", "page": 587 }, { "number": 84, "name": "Al-Inshiqaq", "page": 589 },
    { "number": 85, "name": "Al-Buruj", "page": 590 }, { "number": 86, "name": "At-Tariq", "page": 591 },
    { "number": 87, "name": "Al-Ala", "page": 591 }, { "number": 88, "name": "Al-Ghashiyah", "page": 592 },
    { "number": 89, "name": "Al-Fajr", "page": 593 }, { "number": 90, "name": "Al-Balad", "page": 594 },
    { "number": 91, "name": "Ash-Shams", "page": 595 }, { "number": 92, "name": "Al-Layl", "page": 595 },
    { "number": 93, "name": "Ad-Duhaa", "page": 596 }, { "number": 94, "name": "Ash-Sharh", "page": 596 },
    { "number": 95, "name": "At-Tin", "page": 597 }, { "number": 96, "name": "Al-Alaq", "page": 597 },
    { "number": 97, "name": "Al-Qadr", "page": 598 }, { "number": 98, "name": "Al-Bayyinah", "page": 598 },
    { "number": 99, "name": "Az-Zalzalah", "page": 599 }, { "number": 100, "name": "Al-Adiyat", "page": 599 },
    { "number": 101, "name": "Al-Qari'ah", "page": 600 }, { "number": 102, "name": "At-Takathur", "page": 600 },
    { "number": 103, "name": "Al-Asr", "page": 601 }, { "number": 104, "name": "Al-Humazah", "page": 601 },
    { "number": 105, "name": "Al-Fil", "page": 601 }, { "number": 106, "name": "Quraysh", "page": 602 },
    { "number": 107, "name": "Al-Ma'un", "page": 602 }, { "number": 108, "name": "Al-Kawthar", "page": 602 },
    { "number": 109, "name": "Al-Kafirun", "page": 603 }, { "number": 110, "name": "An-Nasr", "page": 603 },
    { "number": 111, "name": "Al-Masad", "page": 603 }, { "number": 112, "name": "Al-Ikhlas", "page": 604 },
    { "number": 113, "name": "Al-Falaq", "page": 604 }, { "number": 114, "name": "An-Nas", "page": 604 }
];
const JUZ_START_PAGES = [
  1, 22, 42, 62, 82, 102, 121, 142, 162, 182, 201, 222, 242, 262, 282, 302, 322,
  342, 362, 382, 402, 422, 442, 462, 482, 502, 522, 542, 562, 582,
];

interface MushafImage { name: string; url: string; }
interface TranslationChunk { verse: string; text: string; }
interface TranslationEntry {
  mushafPage: number;
  translationChunks: TranslationChunk[];
}
const MUSHAF_WIDTH = 1171;
const MUSHAF_HEIGHT = 1680;
function importAll(r: __WebpackModuleApi.RequireContext): MushafImage[] {
  return r.keys().sort().map((key: string) => ({ name: key.substring(2), url: r(key) }));
}
const allImageFiles = importAll(require.context('./static/mushaf', false, /\.png$/));
const PAGE_OFFSET = 4;
const TOTAL_PAGES = 604;
const GRID_CELL_SIZE = 80;
const TRANSITION_DURATION = 400;

type GroupedTranslations = { [surahNumber: string]: TranslationChunk[] };
type TranslationMode = 'off' | 'side-by-side' | 'overlay' | 'window';
type Theme = 'dark' | 'sepia' | 'midnight';

// The TranslationPanel component is now simpler
const TranslationPanel: React.FC<{
  translationEntry: TranslationEntry | undefined;
  groupedTranslations: GroupedTranslations;
  currentPage: number;
  currentJuzName: string;
}> = ({ translationEntry, groupedTranslations, currentPage, currentJuzName }) => {
  return (
    <>
      <div className="panel-body">
        {translationEntry ? (
          Object.keys(groupedTranslations).map(surahNum => {
            const surahInfo = SURAHS.find(s => s.number === parseInt(surahNum));
            return (
              <div key={surahNum} className="surah-group">
                <h4 className="surah-title">{surahInfo?.name || `Surah ${surahNum}`}</h4>
                {groupedTranslations[surahNum].map(chunk => (
                  <div key={chunk.verse} className="verse-chunk">
                    <strong>{chunk.verse.split(':')[1]}</strong>
                    <p>{chunk.text}</p>
                  </div>
                ))}
              </div>
            );
          })
        ) : (
          <p>No translation for this page.</p>
        )}
      </div>
      <div className="panel-footer">
        <span>{currentJuzName}</span>
        <span>Page {translationEntry?.mushafPage || currentPage}</span>
      </div>
    </>
  );
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState(String(currentPage));
  const [outgoingPage, setOutgoingPage] = useState<number | null>(null);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [showGrid, setShowGrid] = useState(true);
  const [isZooming, setIsZooming] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [isSurahOpen, setIsSurahOpen] = useState(false);
  const [isJuzOpen, setIsJuzOpen] = useState(false);
  const [translationMode, setTranslationMode] = useState<TranslationMode>('off');
  const [theme, setTheme] = useState<Theme>('dark');

  const dragInfo = useRef({ isDragging: false, startX: 0, startY: 0, startPan: { x: 0, y: 0 } });
  const viewportRef = useRef<HTMLDivElement>(null);
  const zoomTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const surahDropdownRef = useRef<HTMLDivElement>(null);
  const juzDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.className = '';
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  useEffect(() => { setPageInput(String(currentPage)); }, [currentPage]);

  const currentSurahName = useMemo(() => {
    let current = "Go to Surah";
    for (let i = SURAHS.length - 1; i >= 0; i--) {
      if (SURAHS[i].page <= currentPage) {
        current = `${SURAHS[i].number}. ${SURAHS[i].name}`;
        break;
      }
    }
    return current;
  }, [currentPage]);
  
  const currentJuzName = useMemo(() => {
    let current = "Go to Juz";
    for (let i = JUZ_START_PAGES.length - 1; i >= 0; i--) {
        if (JUZ_START_PAGES[i] <= currentPage) {
            current = `Juz ${i + 1}`;
            break;
        }
    }
    return current;
  }, [currentPage]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (surahDropdownRef.current && !surahDropdownRef.current.contains(event.target as Node)) setIsSurahOpen(false);
      if (juzDropdownRef.current && !juzDropdownRef.current.contains(event.target as Node)) setIsJuzOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getImageForPage = (page: number): MushafImage | undefined => {
    const pageNumber = page + PAGE_OFFSET;
    const pageString = String(pageNumber).padStart(3, '0');
    const fileName = `page${pageString}.png`;
    return allImageFiles.find(img => img.name === fileName);
  };
  const changePage = useCallback((newPage: number) => {
    if (newPage === currentPage) return;
    setOutgoingPage(currentPage);
    setCurrentPage(newPage);
    setTimeout(() => setOutgoingPage(null), TRANSITION_DURATION);
  }, [currentPage]);
  const jumpToPage = (page: number) => {
    const pageNumber = Math.max(1, Math.min(page, TOTAL_PAGES));
    changePage(pageNumber);
  };
  const handlePageInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const pageNum = parseInt(pageInput);
      if (!isNaN(pageNum)) {
        jumpToPage(pageNum);
        e.currentTarget.blur();
      }
    }
  };
  const goToNextPage = useCallback(() => {
    if (currentPage < TOTAL_PAGES) changePage(currentPage + 1);
  }, [currentPage, changePage]);
  const goToPrevPage = useCallback(() => {
    if (currentPage > 1) changePage(currentPage - 1);
  }, [currentPage, changePage]);
  
  const resetView = useCallback(() => {
    const newScale = (window.innerHeight / MUSHAF_HEIGHT) * 0.8;
    setScale(newScale);
    setPan({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    resetView();
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    resetView();
  }, [windowSize, resetView]);

  const handleWheel = useCallback((e: WheelEvent) => {
    const targetNode = e.target as Node;
    if ((e.target as HTMLElement).closest('.translation-panel')) return;
    const isOverSurahDropdown = surahDropdownRef.current?.contains(targetNode);
    const isOverJuzDropdown = juzDropdownRef.current?.contains(targetNode);
    if (isOverSurahDropdown || isOverJuzDropdown) {
      return;
    }
    e.preventDefault();
    setIsZooming(true);
    if (zoomTimeoutRef.current) clearTimeout(zoomTimeoutRef.current);
    const zoomFactor = 1.1;
    const newScale = e.deltaY < 0 ? scale * zoomFactor : scale / zoomFactor;
    setScale(Math.max(0.1, Math.min(newScale, 5)));
    zoomTimeoutRef.current = setTimeout(() => setIsZooming(false), 150);
  }, [scale]);
  useEffect(() => {
    const viewport = viewportRef.current;
    if (viewport) {
      viewport.addEventListener('wheel', handleWheel, { passive: false });
      return () => viewport.removeEventListener('wheel', handleWheel);
    }
  }, [handleWheel]);
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.mushaf-nav-bar')) return;
    setIsZooming(false);
    if (zoomTimeoutRef.current) clearTimeout(zoomTimeoutRef.current);
    dragInfo.current = { isDragging: true, startX: e.clientX, startY: e.clientY, startPan: { ...pan } };
  }, [pan]);
  const handleMouseUp = useCallback(() => { dragInfo.current.isDragging = false; }, []);
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (dragInfo.current.isDragging) {
      const dx = e.clientX - dragInfo.current.startX;
      const dy = e.clientY - dragInfo.current.startY;
      setPan({ x: dragInfo.current.startPan.x + dx, y: dragInfo.current.startPan.y + dy });
    }
  }, []);

  const currentImage = getImageForPage(currentPage);
  const outgoingImage = outgoingPage ? getImageForPage(outgoingPage) : null;
  const viewportStyle = useMemo(() => {
    if (!showGrid) return {};
    const centerX = windowSize.width / 2;
    const centerY = windowSize.height / 2;
    return {
      backgroundSize: `${GRID_CELL_SIZE * scale}px ${GRID_CELL_SIZE * scale}px`,
      backgroundPosition: `${centerX + pan.x}px ${centerY + pan.y}px`,
    };
  }, [scale, pan, showGrid, windowSize]);

  const translationEntry = useMemo((): TranslationEntry | undefined => {
    const pageNumber = currentPage + PAGE_OFFSET;
    const pageString = String(pageNumber).padStart(3, '0');
    const fileName = `page${pageString}.png`;
    return (translations as Record<string, TranslationEntry>)[fileName];
  }, [currentPage]);

  const groupedTranslations = useMemo((): GroupedTranslations => {
    if (!translationEntry) return {};
    return translationEntry.translationChunks.reduce((acc, chunk) => {
      const surahNum = chunk.verse.split(':')[0];
      if (!acc[surahNum]) acc[surahNum] = [];
      acc[surahNum].push(chunk);
      return acc;
    }, {} as GroupedTranslations);
  }, [translationEntry]);

  return (
    <div className="app-container">
      <div className="top-bar">
        <h1>Mudhakkir-App</h1>
        <div>
          <select className="theme-select" value={theme} onChange={(e) => setTheme(e.target.value as Theme)}>
            <option value="dark">Default Dark</option>
            <option value="sepia">Sepia</option>
            <option value="midnight">Midnight</option>
          </select>
          <button onClick={resetView}>Reset View</button>
          <select 
            className="translation-mode-select" 
            value={translationMode} 
            onChange={(e) => setTranslationMode(e.target.value as TranslationMode)}
          >
            <option value="off">Translation Off</option>
            <option value="side-by-side">Book View</option>
            <option value="overlay">Overlay</option>
            <option value="window">Sidebar</option>
          </select>
          <button onClick={() => setShowGrid(!showGrid)}>
            {showGrid ? 'Hide Grid' : 'Show Grid'}
          </button>
        </div>
      </div>
      
      <div className="main-content">
        <div 
          ref={viewportRef}
          className={`viewport ${!showGrid ? 'grid-hidden' : ''}`}
          style={viewportStyle}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseUp}
        >
          <div className="pannable-container" style={{ transform: `translate(-50%, -50%) translate(${pan.x}px, ${pan.y}px) scale(${scale})`, transition: isZooming ? 'transform 150ms ease-out' : 'none' }}>
            <div className={`book-spread`}>
              <div className="mushaf-page-container">
                <div className="mushaf-nav-bar">
                  <div className="nav-section page-controls">
                    <button onClick={goToPrevPage}>◀</button>
                    <input type="text" value={pageInput} onChange={(e) => setPageInput(e.target.value)} onKeyDown={handlePageInputKeyDown} className="page-input" />
                    <button onClick={goToNextPage}>▶</button>
                  </div>
                  <div className="nav-section surah-select" ref={surahDropdownRef}>
                    <div className="custom-dropdown">
                      <button className="dropdown-trigger" onClick={() => { setIsSurahOpen(!isSurahOpen); setIsJuzOpen(false); }}>
                        {currentSurahName}
                        <span className="dropdown-arrow">{isSurahOpen ? '▲' : '▼'}</span>
                      </button>
                      {isSurahOpen && ( <div className="dropdown-options"> {SURAHS.map(surah => (<div key={surah.number} className="dropdown-option" onClick={() => { jumpToPage(surah.page); setIsSurahOpen(false); }}>{surah.number}. {surah.name}</div>))} </div> )}
                    </div>
                  </div>
                  <div className="nav-section juz-select" ref={juzDropdownRef}>
                    <div className="custom-dropdown">
                      <button className="dropdown-trigger" onClick={() => { setIsJuzOpen(!isJuzOpen); setIsSurahOpen(false); }}>
                        {currentJuzName}
                        <span className="dropdown-arrow">{isJuzOpen ? '▲' : '▼'}</span>
                      </button>
                      {isJuzOpen && ( <div className="dropdown-options"> {JUZ_START_PAGES.map((page, index) => ( <div key={index + 1} className="dropdown-option" onClick={() => { jumpToPage(page); setIsJuzOpen(false); }}>Juz {index + 1}</div> ))} </div> )}
                    </div>
                  </div>
                </div>
                {currentImage && (<img src={currentImage.url} alt={`Mushaf Page ${currentPage}`} className="mushaf-image fade-in" draggable={false} />)}
                {outgoingImage && (<img src={outgoingImage.url} alt={`Mushaf Page ${outgoingPage}`} className="mushaf-image fade-out" draggable={false} />)}
              </div>
              
              {translationMode === 'side-by-side' && (
                <div className="translation-page-container">
                  <TranslationPanel translationEntry={translationEntry} groupedTranslations={groupedTranslations} currentPage={currentPage} currentJuzName={currentJuzName} />
                </div>
              )}
            </div>

            {translationMode === 'overlay' && (
              <div className="translation-panel overlay">
                <TranslationPanel translationEntry={translationEntry} groupedTranslations={groupedTranslations} currentPage={currentPage} currentJuzName={currentJuzName} />
              </div>
            )}
          </div>
        </div>
        
        {translationMode === 'window' && 
          <div className="translation-panel window">
            {/* The window/sidebar does not need a special footer */}
            <div className="panel-header">
              <h3>Translation</h3>
              <span>Page {translationEntry?.mushafPage || currentPage}</span>
            </div>
            <div className="panel-body">
              {translationEntry ? (
                Object.keys(groupedTranslations).map(surahNum => {
                  const surahInfo = SURAHS.find(s => s.number === parseInt(surahNum));
                  return (
                    <div key={surahNum} className="surah-group">
                      <h4 className="surah-title">{surahInfo?.name || `Surah ${surahNum}`}</h4>
                      {groupedTranslations[surahNum].map(chunk => (
                        <div key={chunk.verse} className="verse-chunk">
                          <strong>{chunk.verse.split(':')[1]}</strong>
                          <p>{chunk.text}</p>
                        </div>
                      ))}
                    </div>
                  );
                })
              ) : (
                <p>No translation for this page.</p>
              )}
            </div>
          </div>
        }
      </div>
      
      <div className="footer">
        <span/>
        <span>Page {currentPage} / {TOTAL_PAGES}</span>
        <span className="version-info">v{packageInfo.version}</span>
      </div>
    </div>
  );
};

export default App;