import { useEffect, useRef, useState, useCallback } from 'react';
import { LEVELS } from './levels';
import type { Level, Collectible } from './levels';
import { createSkater, stepPhysics, createPhysicsState } from './physics';
import type { Skater, PhysicsState } from './physics';
import './SkateboardSimulation.css';

const CANVAS_W = 900;
const CANVAS_H = 500;

type GameState = 'menu' | 'playing' | 'paused' | 'dead' | 'levelcomplete' | 'gameover' | 'win';

interface GameData {
  skater: Skater;
  phys: PhysicsState;
  collectibles: Collectible[];
  score: number;
  totalScore: number;
  cameraX: number;
  lives: number;
  stars: number[];
}

// Drawing helpers
function drawSegment(
  ctx: CanvasRenderingContext2D,
  seg: typeof LEVELS[0]['segments'][0],
  camX: number,
  color: string
) {
  ctx.beginPath();
  ctx.moveTo(seg.x1 - camX, seg.y1);
  ctx.lineTo(seg.x2 - camX, seg.y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = seg.type === 'rail' ? 4 : 8;
  ctx.lineCap = 'round';
  ctx.stroke();

  if (seg.type === 'rail') {
    // Draw rail supports
    ctx.strokeStyle = '#8b5e3c';
    ctx.lineWidth = 2;
    for (let t = 0.15; t < 1; t += 0.25) {
      const rx = seg.x1 + (seg.x2 - seg.x1) * t - camX;
      const ry = seg.y1 + (seg.y2 - seg.y1) * t;
      ctx.beginPath();
      ctx.moveTo(rx, ry);
      ctx.lineTo(rx, ry + 20);
      ctx.stroke();
    }
  }
}

function drawSkater(
  ctx: CanvasRenderingContext2D,
  sk: Skater,
  camX: number,
  trickTimer: number
) {
  const sx = sk.x - camX;
  const sy = sk.y;
  const dir = sk.facingRight ? 1 : -1;

  ctx.save();
  ctx.translate(sx, sy);

  // Trick rotation animation
  if (trickTimer > 0) {
    const spin = (1 - trickTimer / 1.2) * Math.PI * 2 * dir;
    ctx.rotate(spin);
  }

  // Board
  ctx.fillStyle = '#1a1a2e';
  ctx.beginPath();
  ctx.roundRect(-18 * dir, 10, 36, 7, 3);
  ctx.fill();

  // Wheels
  ctx.fillStyle = '#e0e0e0';
  ctx.beginPath();
  ctx.arc(-12 * dir, 17, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(12 * dir, 17, 5, 0, Math.PI * 2);
  ctx.fill();

  // Body
  ctx.fillStyle = '#4a90e2';
  ctx.fillRect(-8, -18, 16, 26);

  // Head
  ctx.fillStyle = '#f4c48f';
  ctx.beginPath();
  ctx.arc(0, -24, 10, 0, Math.PI * 2);
  ctx.fill();

  // Helmet
  ctx.fillStyle = '#e74c3c';
  ctx.beginPath();
  ctx.arc(0, -30, 10, Math.PI, 0);
  ctx.fill();

  // Eyes
  ctx.fillStyle = '#333';
  ctx.fillRect(3 * dir, -27, 3, 3);

  ctx.restore();
}

function drawBackground(ctx: CanvasRenderingContext2D, camX: number, level: Level) {
  // Sky gradient
  const grad = ctx.createLinearGradient(0, 0, 0, CANVAS_H);
  grad.addColorStop(0, level.id <= 2 ? '#87ceeb' : level.id === 3 ? '#b8d4e8' : '#1a1a2e');
  grad.addColorStop(1, level.id <= 2 ? '#e0f4ff' : level.id === 3 ? '#d0e8f0' : '#2d2d4e');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  // Parallax clouds/stars
  const parallax = camX * 0.3;
  if (level.id <= 3) {
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    const cloudPositions = [100, 300, 550, 780, 1050, 1300];
    cloudPositions.forEach(cx => {
      const px = ((cx - parallax) % (level.width * 0.8) + level.width * 0.8) % (level.width * 0.8);
      if (px < CANVAS_W + 100) {
        ctx.beginPath();
        ctx.arc(px, 60, 30, 0, Math.PI * 2);
        ctx.arc(px + 35, 55, 22, 0, Math.PI * 2);
        ctx.arc(px + 65, 60, 28, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  } else {
    // Stars for night levels
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    for (let i = 0; i < 50; i++) {
      const starX = (i * 137.5 - parallax * 0.1) % CANVAS_W;
      const starY = (i * 73.1) % 200;
      ctx.fillRect(Math.abs(starX), starY, 2, 2);
    }
  }

  // Ground fill
  ctx.fillStyle = level.id <= 2 ? '#8bc34a' : level.id === 3 ? '#90a4ae' : '#263238';
  ctx.fillRect(0, CANVAS_H - 60, CANVAS_W, 60);
}

function drawCollectibles(
  ctx: CanvasRenderingContext2D,
  collectibles: Collectible[],
  camX: number,
  time: number
) {
  collectibles.forEach(c => {
    if (c.collected) return;
    const cx = c.x - camX;
    if (cx < -30 || cx > CANVAS_W + 30) return;
    const bob = Math.sin(time * 3 + c.x * 0.01) * 4;

    // Glow
    const grd = ctx.createRadialGradient(cx, c.y + bob, 0, cx, c.y + bob, c.radius * 2);
    grd.addColorStop(0, 'rgba(255,215,0,0.4)');
    grd.addColorStop(1, 'rgba(255,215,0,0)');
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(cx, c.y + bob, c.radius * 2, 0, Math.PI * 2);
    ctx.fill();

    // Coin
    ctx.fillStyle = '#ffd700';
    ctx.strokeStyle = '#b8860b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, c.y + bob, c.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Star inside
    ctx.fillStyle = '#b8860b';
    ctx.font = `${c.radius}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('★', cx, c.y + bob);
  });
}

function drawGoal(ctx: CanvasRenderingContext2D, goalX: number, camX: number) {
  const gx = goalX - camX;
  if (gx < -50 || gx > CANVAS_W + 50) return;

  // Flag pole
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(gx, 150);
  ctx.lineTo(gx, 500);
  ctx.stroke();

  // Flag
  ctx.fillStyle = '#2ecc71';
  ctx.beginPath();
  ctx.moveTo(gx, 150);
  ctx.lineTo(gx + 40, 175);
  ctx.lineTo(gx, 200);
  ctx.fill();

  ctx.fillStyle = 'white';
  ctx.font = '14px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('FINISH', gx, 220);
}

function drawHUD(
  ctx: CanvasRenderingContext2D,
  score: number,
  lives: number,
  level: Level,
  sk: Skater
) {
  // Score
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.roundRect(10, 10, 200, 40, 8);
  ctx.fill();
  ctx.fillStyle = '#ffd700';
  ctx.font = 'bold 18px monospace';
  ctx.textAlign = 'left';
  ctx.fillText(`★ ${score}`, 20, 36);

  // Lives
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.beginPath();
  ctx.roundRect(CANVAS_W - 120, 10, 110, 40, 8);
  ctx.fill();
  ctx.fillStyle = '#e74c3c';
  ctx.font = '16px monospace';
  ctx.textAlign = 'right';
  ctx.fillText('❤️'.repeat(lives), CANVAS_W - 15, 36);

  // Level name
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.beginPath();
  ctx.roundRect(CANVAS_W / 2 - 100, 10, 200, 40, 8);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 14px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(level.nameHe, CANVAS_W / 2, 36);

  // Trick display
  if (sk.trickTimer > 0 && sk.currentTrick) {
    const alpha = Math.min(1, sk.trickTimer / 0.5);
    ctx.fillStyle = `rgba(255, 220, 0, ${alpha})`;
    ctx.font = 'bold 28px sans-serif';
    ctx.textAlign = 'center';
    ctx.shadowColor = '#ff6600';
    ctx.shadowBlur = 10;
    ctx.fillText(sk.currentTrick + '!', CANVAS_W / 2, 120);
    ctx.shadowBlur = 0;
  }
}

function drawSegmentLabels(
  ctx: CanvasRenderingContext2D,
  level: Level,
  camX: number
) {
  level.segments.forEach(seg => {
    if (seg.type === 'rail') {
      const mx = (seg.x1 + seg.x2) / 2 - camX;
      const my = (seg.y1 + seg.y2) / 2 - 20;
      if (mx > 0 && mx < CANVAS_W) {
        ctx.fillStyle = 'rgba(255,165,0,0.9)';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('RAIL', mx, my);
      }
    }
    if (seg.friction !== undefined && seg.friction < 0.1) {
      const mx = (seg.x1 + seg.x2) / 2 - camX;
      const my = (seg.y1 + seg.y2) / 2 - 15;
      if (mx > 0 && mx < CANVAS_W) {
        ctx.fillStyle = 'rgba(100,200,255,0.9)';
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('ICE ❄️', mx, my);
      }
    }
  });
}

// ============================================================
// Main component
// ============================================================

export function SkateboardSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keysRef = useRef<Record<string, boolean>>({});
  const gameRef = useRef<GameData | null>(null);
  const animRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  const [gameState, setGameState] = useState<GameState>('menu');
  const [currentLevel, setCurrentLevel] = useState(0);
  const [phys, setPhys] = useState<PhysicsState>(createPhysicsState());
  const [displayScore, setDisplayScore] = useState(0);
  const [displayLives, setDisplayLives] = useState(3);
  const [showTips, setShowTips] = useState(true);
  const [energyHistory, setEnergyHistory] = useState<{ ke: number; pe: number; total: number }[]>([]);

  const initGame = useCallback((levelIdx: number, lives: number, totalScore: number) => {
    const level = LEVELS[levelIdx];
    const skater = createSkater(level.spawnX, level.spawnY);
    gameRef.current = {
      skater,
      phys: createPhysicsState(),
      collectibles: level.collectibles.map(c => ({ ...c, collected: false })),
      score: 0,
      totalScore,
      cameraX: 0,
      lives,
      stars: [],
    };
    setDisplayLives(lives);
    setDisplayScore(totalScore);
    setEnergyHistory([]);
  }, []);

  const startLevel = useCallback((levelIdx: number, lives = 3, totalScore = 0) => {
    setCurrentLevel(levelIdx);
    initGame(levelIdx, lives, totalScore);
    setGameState('playing');
    setShowTips(true);
    setTimeout(() => setShowTips(false), 4000);
  }, [initGame]);

  // Key handlers
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key] = true;
      e.preventDefault();
    };
    const onKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key] = false;
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') {
      cancelAnimationFrame(animRef.current);
      return;
    }

    const level = LEVELS[currentLevel];

    const loop = (timestamp: number) => {
      const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.03);
      lastTimeRef.current = timestamp;
      timeRef.current += dt;

      const gd = gameRef.current;
      if (!gd) return;

      // Physics step
      const { skater: newSkater, phys: newPhys } = stepPhysics(
        gd.skater, keysRef.current, level, dt, { ...gd.phys }
      );
      gd.skater = newSkater;
      gd.phys = newPhys;

      // Camera
      const targetCamX = gd.skater.x - CANVAS_W * 0.35;
      gd.cameraX += (targetCamX - gd.cameraX) * 0.1;
      gd.cameraX = Math.max(0, Math.min(gd.cameraX, level.width - CANVAS_W));

      // Collectible pickup
      gd.collectibles.forEach(c => {
        if (c.collected) return;
        const dx = gd.skater.x - c.x;
        const dy = gd.skater.y - c.y;
        if (Math.sqrt(dx * dx + dy * dy) < c.radius + 20) {
          c.collected = true;
          gd.score += c.points;
          gd.totalScore += c.points;
        }
      });

      // Level complete check
      if (gd.skater.x >= level.goalX) {
        const bonus = gd.phys.maxSpeed > 5 ? 100 : 50;
        gd.totalScore += gd.score + bonus;
        setDisplayScore(gd.totalScore);
        setGameState('levelcomplete');
        return;
      }

      // Death
      if (gd.skater.dead) {
        const newLives = gd.lives - 1;
        setDisplayLives(newLives);
        if (newLives <= 0) {
          setGameState('gameover');
        } else {
          setGameState('dead');
        }
        return;
      }

      // Update displays
      setPhys({ ...newPhys });
      setDisplayScore(gd.totalScore + gd.score);
      setDisplayLives(gd.lives);

      // Energy history
      setEnergyHistory(prev => {
        const next = [...prev, { ke: newPhys.kineticEnergy, pe: newPhys.potentialEnergy, total: newPhys.totalEnergy }];
        return next.slice(-80);
      });

      // Draw
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

      drawBackground(ctx, gd.cameraX, level);
      drawGoal(ctx, level.goalX, gd.cameraX);

      // Draw terrain
      level.segments.forEach(seg => {
        const isIce = seg.friction !== undefined && seg.friction < 0.1;
        const color = seg.type === 'rail' ? '#c0c0c0' : isIce ? '#a8d8ff' : '#5d4037';
        drawSegment(ctx, seg, gd.cameraX, color);
        // terrain fill under ground
        if (seg.type === 'ground' || seg.type === 'ramp') {
          ctx.beginPath();
          ctx.moveTo(seg.x1 - gd.cameraX, seg.y1);
          ctx.lineTo(seg.x2 - gd.cameraX, seg.y2);
          ctx.lineTo(seg.x2 - gd.cameraX, CANVAS_H);
          ctx.lineTo(seg.x1 - gd.cameraX, CANVAS_H);
          ctx.closePath();
          ctx.fillStyle = isIce ? 'rgba(168,216,255,0.3)' : 'rgba(93,64,55,0.4)';
          ctx.fill();
        }
      });

      drawSegmentLabels(ctx, level, gd.cameraX);
      drawCollectibles(ctx, gd.collectibles, gd.cameraX, timeRef.current);
      drawSkater(ctx, gd.skater, gd.cameraX, gd.skater.trickTimer);
      drawHUD(ctx, gd.totalScore + gd.score, gd.lives, level, gd.skater);

      // Speed indicator bar
      const speedFrac = Math.min(1, newPhys.speed / 8);
      ctx.fillStyle = 'rgba(0,0,0,0.4)';
      ctx.roundRect(10, CANVAS_H - 30, 200, 16, 6);
      ctx.fill();
      const speedColor = speedFrac > 0.8 ? '#e74c3c' : speedFrac > 0.5 ? '#f39c12' : '#2ecc71';
      ctx.fillStyle = speedColor;
      ctx.roundRect(10, CANVAS_H - 30, 200 * speedFrac, 16, 6);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = '11px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`${newPhys.speed.toFixed(1)} m/s`, 15, CANVAS_H - 18);

      animRef.current = requestAnimationFrame(loop);
    };

    lastTimeRef.current = performance.now();
    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [gameState, currentLevel]);

  const gd = gameRef.current;

  return (
    <div className="skate-sim" dir="rtl">
      <div className="skate-main">
        <div className="canvas-container">
          <canvas ref={canvasRef} width={CANVAS_W} height={CANVAS_H} className="game-canvas" />

          {/* Overlays */}
          {gameState === 'menu' && (
            <div className="overlay menu-overlay">
              <div className="menu-card">
                <div className="menu-logo">🛹</div>
                <h1>סימולטור סקייטבורד</h1>
                <p>פיזיקה אמיתית • 5 שלבים • ציוד אנרגיה</p>
                <div className="level-select">
                  {LEVELS.map((lv, i) => (
                    <button key={lv.id} className="level-btn" onClick={() => startLevel(i)}>
                      <span className="lv-num">שלב {lv.id}</span>
                      <span className="lv-name">{lv.nameHe}</span>
                      <span className="lv-desc">{lv.description}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {gameState === 'dead' && (
            <div className="overlay dead-overlay">
              <div className="overlay-card">
                <div className="overlay-icon">💀</div>
                <h2>נפלת!</h2>
                <p>חיים שנותרו: {'❤️'.repeat(displayLives)}</p>
                <button className="btn-primary" onClick={() => {
                  initGame(currentLevel, displayLives, gd?.totalScore ?? 0);
                  setGameState('playing');
                }}>נסה שוב</button>
                <button className="btn-secondary" onClick={() => setGameState('menu')}>תפריט</button>
              </div>
            </div>
          )}

          {gameState === 'gameover' && (
            <div className="overlay dead-overlay">
              <div className="overlay-card">
                <div className="overlay-icon">💥</div>
                <h2>משחק נגמר</h2>
                <p>ניקוד סופי: {displayScore} ★</p>
                <button className="btn-primary" onClick={() => startLevel(0)}>שחק שוב</button>
                <button className="btn-secondary" onClick={() => setGameState('menu')}>תפריט</button>
              </div>
            </div>
          )}

          {gameState === 'levelcomplete' && (
            <div className="overlay win-overlay">
              <div className="overlay-card">
                <div className="overlay-icon">🏆</div>
                <h2>שלב הושלם!</h2>
                <p>ניקוד: {displayScore} ★</p>
                <p className="stat-line">מהירות מקס: {phys.maxSpeed.toFixed(1)} m/s</p>
                <p className="stat-line">גובה מקס: {phys.maxHeight.toFixed(1)} m</p>
                {currentLevel < LEVELS.length - 1 ? (
                  <button className="btn-primary" onClick={() => startLevel(currentLevel + 1, displayLives, displayScore)}>
                    שלב הבא →
                  </button>
                ) : (
                  <button className="btn-primary" onClick={() => setGameState('win')}>סיום! 🎉</button>
                )}
                <button className="btn-secondary" onClick={() => setGameState('menu')}>תפריט</button>
              </div>
            </div>
          )}

          {gameState === 'win' && (
            <div className="overlay win-overlay">
              <div className="overlay-card">
                <div className="overlay-icon">🎉🛹🎉</div>
                <h2>ניצחת!</h2>
                <p>השלמת את כל 5 השלבים!</p>
                <p className="big-score">★ {displayScore}</p>
                <button className="btn-primary" onClick={() => startLevel(0)}>שחק שוב מהתחלה</button>
                <button className="btn-secondary" onClick={() => setGameState('menu')}>תפריט</button>
              </div>
            </div>
          )}

          {gameState === 'playing' && showTips && (
            <div className="tips-banner">
              {LEVELS[currentLevel].tips.map((t, i) => (
                <span key={i} className="tip">{t}</span>
              ))}
            </div>
          )}
        </div>

        {/* Controls hint */}
        {gameState === 'playing' && (
          <div className="controls-hint">
            <span>← → הזזה</span>
            <span>Space / ↑ קפיצה</span>
            <span>P השהה</span>
          </div>
        )}
      </div>

      {/* Physics Panel */}
      <div className="phys-panel">
        <h3 className="panel-title">📊 פיזיקה בזמן אמת</h3>

        <div className="var-grid">
          <PhysVar label="מהירות" value={phys.speed.toFixed(2)} unit="m/s" color="#2ecc71" max={8} val={phys.speed} />
          <PhysVar label="גובה" value={phys.height.toFixed(2)} unit="m" color="#3498db" max={5} val={phys.height} />
          <PhysVar label="מומנטום" value={phys.momentum.toFixed(2)} unit="kg·m/s" color="#9b59b6" max={8} val={phys.momentum} />
          <PhysVar label="זווית מדרון" value={phys.slopeAngle.toFixed(1)} unit="°" color="#e67e22" max={45} val={Math.abs(phys.slopeAngle)} />
        </div>

        <div className="energy-section">
          <h4>אנרגיה (ג'ול מנורמל)</h4>
          <div className="energy-bars">
            <EnergyBar label="KE" value={phys.kineticEnergy} max={30} color="#e74c3c" />
            <EnergyBar label="PE" value={phys.potentialEnergy} max={30} color="#3498db" />
            <EnergyBar label="סה״כ" value={phys.totalEnergy} max={30} color="#f39c12" />
          </div>
        </div>

        <div className="energy-graph">
          <h4>גרף אנרגיה</h4>
          <EnergyGraph history={energyHistory} />
        </div>

        <div className="extra-vars">
          <div className="extra-var">
            <span className="ev-label">כוח חיכוך</span>
            <span className="ev-value">{phys.frictionForce.toFixed(1)} N</span>
          </div>
          <div className="extra-var">
            <span className="ev-label">התנגדות אוויר</span>
            <span className="ev-value">{phys.airResistance.toFixed(3)} N</span>
          </div>
          <div className="extra-var">
            <span className="ev-label">מהירות מקסימלית</span>
            <span className="ev-value">{phys.maxSpeed.toFixed(2)} m/s</span>
          </div>
          <div className="extra-var">
            <span className="ev-label">גובה מקסימלי</span>
            <span className="ev-value">{phys.maxHeight.toFixed(2)} m</span>
          </div>
          <div className="extra-var">
            <span className="ev-label">זמן אוויר</span>
            <span className="ev-value">{phys.airTime.toFixed(1)} s</span>
          </div>
          <div className="extra-var">
            <span className="ev-label">מרחק</span>
            <span className="ev-value">{phys.distanceTraveled.toFixed(0)} m</span>
          </div>
        </div>

        <div className="formula-section">
          <h4>נוסחאות פיזיקה</h4>
          <div className="formula">KE = ½mv² = {phys.kineticEnergy.toFixed(2)} J</div>
          <div className="formula">PE = mgh = {phys.potentialEnergy.toFixed(2)} J</div>
          <div className="formula">p = mv = {phys.momentum.toFixed(2)} kg·m/s</div>
        </div>
      </div>
    </div>
  );
}

// Sub-components

function PhysVar({ label, value, unit, color, max, val }: {
  label: string; value: string; unit: string; color: string; max: number; val: number;
}) {
  const pct = Math.min(1, Math.abs(val) / max);
  return (
    <div className="phys-var">
      <div className="pv-header">
        <span className="pv-label">{label}</span>
        <span className="pv-value" style={{ color }}>{value} <span className="pv-unit">{unit}</span></span>
      </div>
      <div className="pv-bar-bg">
        <div className="pv-bar-fill" style={{ width: `${pct * 100}%`, background: color }} />
      </div>
    </div>
  );
}

function EnergyBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = Math.min(1, value / max);
  return (
    <div className="energy-bar-row">
      <span className="eb-label">{label}</span>
      <div className="eb-track">
        <div className="eb-fill" style={{ width: `${pct * 100}%`, background: color }} />
      </div>
      <span className="eb-val">{value.toFixed(1)}</span>
    </div>
  );
}

function EnergyGraph({ history }: { history: { ke: number; pe: number; total: number }[] }) {
  const W = 260, H = 80;
  const maxVal = 30;
  if (history.length < 2) return <div className="eg-empty">מתחיל...</div>;

  const points = (data: number[]) =>
    data.map((v, i) => `${(i / (history.length - 1)) * W},${H - (v / maxVal) * H}`).join(' ');

  const kePoints = points(history.map(h => h.ke));
  const pePoints = points(history.map(h => h.pe));
  const totPoints = points(history.map(h => h.total));

  return (
    <svg width={W} height={H} className="energy-graph-svg">
      <rect width={W} height={H} fill="#1a1a2e" rx="4" />
      <polyline points={pePoints} fill="none" stroke="#3498db" strokeWidth="1.5" />
      <polyline points={kePoints} fill="none" stroke="#e74c3c" strokeWidth="1.5" />
      <polyline points={totPoints} fill="none" stroke="#f39c12" strokeWidth="1.5" strokeDasharray="3,2" />
      <text x="4" y="12" fill="#e74c3c" fontSize="9">KE</text>
      <text x="24" y="12" fill="#3498db" fontSize="9">PE</text>
      <text x="44" y="12" fill="#f39c12" fontSize="9">Total</text>
    </svg>
  );
}
