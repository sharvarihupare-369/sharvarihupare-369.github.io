"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import confetti from "canvas-confetti";
import {
  Gamepad2,
  Trophy,
  Volume2,
  VolumeX,
  RotateCcw,
  X,
  Zap,
  Sparkles,
  Shield,
  Heart,
  Play,
  Flame,
} from "lucide-react";

// Web Audio API Sound Synthesizer (Zero external dependencies)
class SoundSynth {
  private ctx: AudioContext | null = null;
  public muted: boolean = false;

  init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playLaser() {
    if (this.muted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(
        220,
        this.ctx.currentTime + 0.1
      );
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch {
      // Audio not permitted or suspended
    }
  }

  playExplosion(isBoss = false) {
    if (this.muted || !this.ctx) return;
    try {
      const duration = isBoss ? 0.35 : 0.18;
      const bufferSize = Math.floor(this.ctx.sampleRate * duration);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(isBoss ? 500 : 900, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(
        40,
        this.ctx.currentTime + duration
      );

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(isBoss ? 0.35 : 0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.01,
        this.ctx.currentTime + duration
      );

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      whiteNoise.start();
    } catch {
      // Audio not permitted or suspended
    }
  }

  playPowerup() {
    if (this.muted || !this.ctx) return;
    try {
      const notes = [440, 554, 659, 880];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.05);
        gain.gain.setValueAtTime(0.12, this.ctx.currentTime + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(
          0.01,
          this.ctx.currentTime + idx * 0.05 + 0.07
        );
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.05);
        osc.stop(this.ctx.currentTime + idx * 0.05 + 0.07);
      });
    } catch {
      // Audio not permitted or suspended
    }
  }

  playGameOver() {
    if (this.muted || !this.ctx) return;
    try {
      const notes = [440, 392, 349, 246];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.12);
        gain.gain.setValueAtTime(0.2, this.ctx.currentTime + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(
          0.01,
          this.ctx.currentTime + idx * 0.12 + 0.15
        );
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.12);
        osc.stop(this.ctx.currentTime + idx * 0.12 + 0.15);
      });
    } catch {
      // Audio not permitted or suspended
    }
  }
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface Laser {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
}

interface Enemy {
  id: number;
  type: "bug" | "404" | "memory" | "boss";
  x: number;
  y: number;
  width: number;
  height: number;
  vx: number;
  vy: number;
  hp: number;
  maxHp: number;
  scoreVal: number;
  color: string;
}

interface PowerUp {
  type: "triple" | "shield" | "coffee";
  x: number;
  y: number;
  vy: number;
  radius: number;
}

export function ArcadeModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const soundRef = useRef<SoundSynth>(new SoundSynth());

  const [gameState, setGameState] = useState<
    "ready" | "playing" | "gameover"
  >("ready");
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [wave, setWave] = useState<number>(1);
  const [activePowerUp, setActivePowerUp] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // High score persistence
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("portfolio_arcade_highscore");
      if (saved) {
        setHighScore(parseInt(saved, 10) || 0);
      }
    }
  }, []);

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundRef.current.muted = next;
  };

  // Game loop references
  const gameLoopRef = useRef<number | null>(null);
  const keysRef = useRef<{ [key: string]: boolean }>({});
  const touchStateRef = useRef<{ left: boolean; right: boolean; fire: boolean }>({
    left: false,
    right: false,
    fire: false,
  });

  // Player state
  const playerRef = useRef({
    x: 270,
    y: 580,
    width: 38,
    height: 44,
    speed: 7,
    shield: false,
    tripleShotUntil: 0,
    fireRateBoostUntil: 0,
    lastFired: 0,
  });

  const lasersRef = useRef<Laser[]>([]);
  const enemiesRef = useRef<Enemy[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const powerUpsRef = useRef<PowerUp[]>([]);
  const shakeRef = useRef<number>(0);
  const nextEnemyId = useRef<number>(1);
  const lastSpawnRef = useRef<number>(0);

  const startGame = useCallback(() => {
    soundRef.current.init();
    setScore(0);
    setLives(3);
    setWave(1);
    setActivePowerUp(null);
    setGameState("playing");

    playerRef.current = {
      x: 270,
      y: 580,
      width: 38,
      height: 44,
      speed: 7,
      shield: false,
      tripleShotUntil: 0,
      fireRateBoostUntil: 0,
      lastFired: 0,
    };

    lasersRef.current = [];
    enemiesRef.current = [];
    particlesRef.current = [];
    powerUpsRef.current = [];
    shakeRef.current = 0;
    lastSpawnRef.current = Date.now();
  }, []);

  // Keyboard controls
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", " ", "KeyA", "KeyD", "KeyW"].includes(
          e.code
        )
      ) {
        e.preventDefault();
      }
      keysRef.current[e.code] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.code] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isOpen]);

  // Main Canvas Game Loop
  useEffect(() => {
    if (!isOpen || gameState !== "playing") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isRunning = true;

    const fireLaser = () => {
      const now = Date.now();
      const fireInterval =
        playerRef.current.fireRateBoostUntil > now ? 120 : 200;
      if (now - playerRef.current.lastFired < fireInterval) return;

      playerRef.current.lastFired = now;
      soundRef.current.playLaser();

      const p = playerRef.current;
      const hasTriple = p.tripleShotUntil > now;

      if (hasTriple) {
        lasersRef.current.push({
          x: p.x,
          y: p.y - 12,
          vx: 0,
          vy: -11,
          color: "#f5ab79",
        });
        lasersRef.current.push({
          x: p.x - 14,
          y: p.y - 6,
          vx: -2.5,
          vy: -10,
          color: "#e76735",
        });
        lasersRef.current.push({
          x: p.x + 14,
          y: p.y - 6,
          vx: 2.5,
          vy: -10,
          color: "#e76735",
        });
      } else {
        lasersRef.current.push({
          x: p.x - 7,
          y: p.y - 10,
          vx: 0,
          vy: -11,
          color: "#f5ab79",
        });
        lasersRef.current.push({
          x: p.x + 7,
          y: p.y - 10,
          vx: 0,
          vy: -11,
          color: "#f5ab79",
        });
      }
    };

    const spawnEnemy = (now: number) => {
      const spawnInterval = Math.max(700, 1900 - wave * 180);
      if (now - lastSpawnRef.current > spawnInterval) {
        lastSpawnRef.current = now;

        const rand = Math.random();
        const id = nextEnemyId.current++;
        const spawnX = Math.random() * (canvas.width - 60) + 30;

        if (rand < 0.6) {
          // Bug (Fast, small)
          enemiesRef.current.push({
            id,
            type: "bug",
            x: spawnX,
            y: -30,
            width: 32,
            height: 28,
            vx: (Math.random() - 0.5) * 1.5,
            vy: 2.5 + Math.random() * 1.5,
            hp: 1,
            maxHp: 1,
            scoreVal: 15,
            color: "#e76735",
          });
        } else if (rand < 0.88) {
          // 404 Glitch Block (Medium)
          enemiesRef.current.push({
            id,
            type: "404",
            x: spawnX,
            y: -35,
            width: 44,
            height: 32,
            vx: (Math.random() - 0.5) * 1,
            vy: 2.0,
            hp: 2,
            maxHp: 2,
            scoreVal: 35,
            color: "#d85827",
          });
        } else {
          // Memory Leak Hexagon (Heavy)
          enemiesRef.current.push({
            id,
            type: "memory",
            x: spawnX,
            y: -40,
            width: 48,
            height: 48,
            vx: (Math.random() - 0.5) * 0.8,
            vy: 1.6,
            hp: 4,
            maxHp: 4,
            scoreVal: 75,
            color: "#c67d1f",
          });
        }
      }
    };

    const addExplosion = (x: number, y: number, color: string, count = 18) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 1.5;
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          maxLife: Math.random() * 20 + 20,
          color,
          size: Math.random() * 3 + 1.5,
        });
      }
    };

    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      if (!isRunning) return;

      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;
      const now = Date.now();

      // Screen Shake update
      if (shakeRef.current > 0) {
        shakeRef.current -= dt * 25;
        if (shakeRef.current < 0) shakeRef.current = 0;
      }

      // Input update
      const p = playerRef.current;
      const leftPressed =
        keysRef.current["ArrowLeft"] ||
        keysRef.current["KeyA"] ||
        touchStateRef.current.left;
      const rightPressed =
        keysRef.current["ArrowRight"] ||
        keysRef.current["KeyD"] ||
        touchStateRef.current.right;
      const firePressed =
        keysRef.current["Space"] ||
        keysRef.current["ArrowUp"] ||
        keysRef.current["KeyW"] ||
        touchStateRef.current.fire;

      if (leftPressed) p.x -= p.speed;
      if (rightPressed) p.x += p.speed;

      // Constrain player inside canvas
      p.x = Math.max(p.width / 2 + 10, Math.min(canvas.width - p.width / 2 - 10, p.x));

      if (firePressed) {
        fireLaser();
      }

      // Spawn enemies
      spawnEnemy(now);

      // Move Lasers
      lasersRef.current.forEach((l) => {
        l.x += l.vx;
        l.y += l.vy;
      });
      lasersRef.current = lasersRef.current.filter((l) => l.y > -20);

      // Move Enemies & Collisions
      enemiesRef.current.forEach((enemy) => {
        enemy.x += enemy.vx;
        enemy.y += enemy.vy;

        // Bounce walls
        if (enemy.x < enemy.width / 2 || enemy.x > canvas.width - enemy.width / 2) {
          enemy.vx = -enemy.vx;
        }

        // Check collision with lasers
        lasersRef.current.forEach((laser, lIdx) => {
          const dx = Math.abs(laser.x - enemy.x);
          const dy = Math.abs(laser.y - enemy.y);
          if (dx < enemy.width / 2 + 4 && dy < enemy.height / 2 + 6) {
            // Hit!
            enemy.hp -= 1;
            lasersRef.current.splice(lIdx, 1);
            addExplosion(laser.x, laser.y, laser.color, 6);

            if (enemy.hp <= 0) {
              // Destroyed!
              soundRef.current.playExplosion(enemy.type === "boss");
              addExplosion(enemy.x, enemy.y, enemy.color, 22);
              shakeRef.current = 6;

              setScore((prev) => {
                const nextScore = prev + enemy.scoreVal;
                // Wave progression
                if (Math.floor(nextScore / 250) > Math.floor(prev / 250)) {
                  setWave((w) => w + 1);
                }
                return nextScore;
              });

              // Chance to drop power-up
              if (Math.random() < 0.16) {
                const types: ("triple" | "shield" | "coffee")[] = [
                  "triple",
                  "shield",
                  "coffee",
                ];
                const dropType =
                  types[Math.floor(Math.random() * types.length)];
                powerUpsRef.current.push({
                  type: dropType,
                  x: enemy.x,
                  y: enemy.y,
                  vy: 2.0,
                  radius: 12,
                });
              }
            }
          }
        });

        // Check collision with Player
        const pDistX = Math.abs(enemy.x - p.x);
        const pDistY = Math.abs(enemy.y - p.y);
        if (pDistX < (enemy.width + p.width) / 2 - 6 && pDistY < (enemy.height + p.height) / 2 - 6) {
          enemy.hp = 0; // kill enemy on impact
          addExplosion(enemy.x, enemy.y, enemy.color, 25);

          if (p.shield) {
            p.shield = false;
            setActivePowerUp(null);
            soundRef.current.playExplosion();
            shakeRef.current = 8;
          } else {
            soundRef.current.playExplosion(true);
            shakeRef.current = 14;
            setLives((l) => {
              const remaining = l - 1;
              if (remaining <= 0) {
                soundRef.current.playGameOver();
                setGameState("gameover");
                // Check high score
                setScore((finalScore) => {
                  setHighScore((prevHigh) => {
                    if (finalScore > prevHigh) {
                      localStorage.setItem(
                        "portfolio_arcade_highscore",
                        finalScore.toString()
                      );
                      try {
                        confetti({
                          particleCount: 120,
                          spread: 80,
                          origin: { y: 0.5 },
                          colors: ["#d85827", "#e76735", "#c67d1f", "#fdfbf7"],
                        });
                      } catch { }
                      return finalScore;
                    }
                    return prevHigh;
                  });
                  return finalScore;
                });
              }
              return remaining;
            });
          }
        }
      });

      // Filter dead/off-screen enemies
      enemiesRef.current = enemiesRef.current.filter(
        (e) => e.hp > 0 && e.y < canvas.height + 40
      );

      // Move PowerUps
      powerUpsRef.current.forEach((pu) => {
        pu.y += pu.vy;
        const dx = Math.abs(pu.x - p.x);
        const dy = Math.abs(pu.y - p.y);
        if (dx < pu.radius + p.width / 2 && dy < pu.radius + p.height / 2) {
          // Collected!
          soundRef.current.playPowerup();
          addExplosion(pu.x, pu.y, "#f5c07b", 16);

          if (pu.type === "triple") {
            p.tripleShotUntil = Date.now() + 9000;
            setActivePowerUp("⚡ TRIPLE PHOTON");
          } else if (pu.type === "shield") {
            p.shield = true;
            setActivePowerUp("🛡️ FORCE SHIELD");
          } else if (pu.type === "coffee") {
            p.fireRateBoostUntil = Date.now() + 8000;
            setActivePowerUp("☕ TURBO COMPILE");
          }
          pu.y = 9999;
        }
      });
      powerUpsRef.current = powerUpsRef.current.filter(
        (pu) => pu.y < canvas.height + 20
      );

      // Update Particles
      particlesRef.current.forEach((pt) => {
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.life += 1;
      });
      particlesRef.current = particlesRef.current.filter(
        (pt) => pt.life < pt.maxLife
      );

      // ================= DRAWING =================
      ctx.save();

      // Screen shake translation
      if (shakeRef.current > 0) {
        const shakeAngle = Math.random() * Math.PI * 2;
        const offset = shakeRef.current;
        ctx.translate(
          Math.cos(shakeAngle) * offset,
          Math.sin(shakeAngle) * offset
        );
      }

      // Background: Warm dark espresso deep void
      ctx.fillStyle = "#140a06";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Retro subtle grid lines
      ctx.strokeStyle = "rgba(216, 88, 39, 0.05)";
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 35) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 35) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw Particles
      particlesRef.current.forEach((pt) => {
        const alpha = Math.max(0, 1 - pt.life / pt.maxLife);
        ctx.fillStyle = pt.color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // Draw Lasers
      lasersRef.current.forEach((l) => {
        ctx.fillStyle = l.color;
        ctx.shadowColor = l.color;
        ctx.shadowBlur = 8;
        ctx.fillRect(l.x - 2.5, l.y - 12, 5, 14);
        ctx.shadowBlur = 0;
      });

      // Draw PowerUps
      powerUpsRef.current.forEach((pu) => {
        ctx.save();
        ctx.translate(pu.x, pu.y);
        ctx.shadowColor = "#f5c07b";
        ctx.shadowBlur = 10;
        ctx.fillStyle = "#c67d1f";
        ctx.beginPath();
        ctx.arc(0, 0, pu.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 11px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const label =
          pu.type === "triple" ? "3x" : pu.type === "shield" ? "S" : "⚡";
        ctx.fillText(label, 0, 1);
        ctx.restore();
      });

      // Draw Enemies
      enemiesRef.current.forEach((e) => {
        ctx.save();
        ctx.translate(e.x, e.y);

        if (e.type === "bug") {
          // Creeping Bug
          ctx.fillStyle = e.color;
          ctx.shadowColor = e.color;
          ctx.shadowBlur = 8;
          // Body
          ctx.beginPath();
          ctx.ellipse(0, 0, 12, 10, 0, 0, Math.PI * 2);
          ctx.fill();
          // Legs
          ctx.strokeStyle = "#f5ab79";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(-12, -4);
          ctx.lineTo(-18, -8);
          ctx.moveTo(-12, 4);
          ctx.lineTo(-18, 8);
          ctx.moveTo(12, -4);
          ctx.lineTo(18, -8);
          ctx.moveTo(12, 4);
          ctx.lineTo(18, 8);
          ctx.stroke();
          // Eyes
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(-4, -4, 2, 0, Math.PI * 2);
          ctx.arc(4, -4, 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (e.type === "404") {
          // 404 Glitch box
          ctx.fillStyle = e.color;
          ctx.strokeStyle = "#f5ab79";
          ctx.lineWidth = 1.5;
          ctx.shadowColor = e.color;
          ctx.shadowBlur = 10;
          ctx.fillRect(-e.width / 2, -e.height / 2, e.width, e.height);
          ctx.strokeRect(-e.width / 2, -e.height / 2, e.width, e.height);
          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 11px monospace";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("404", 0, 0);
        } else {
          // Memory Leak Hexagon
          ctx.fillStyle = e.color;
          ctx.shadowColor = e.color;
          ctx.shadowBlur = 12;
          ctx.beginPath();
          const rad = e.width / 2;
          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3;
            const hx = Math.cos(angle) * rad;
            const hy = Math.sin(angle) * rad;
            if (i === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
          }
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 10px monospace";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("LEAK", 0, 0);
        }
        ctx.restore();
      });

      // Draw Player Ship
      ctx.save();
      ctx.translate(p.x, p.y);

      // Shield Aura if active
      if (p.shield) {
        ctx.strokeStyle = "#f5c07b";
        ctx.lineWidth = 2.5;
        ctx.shadowColor = "#f5c07b";
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(0, 0, 30, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Thruster Flame particles
      ctx.fillStyle = "#f5ab79";
      ctx.shadowColor = "#d85827";
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(-6, p.height / 2);
      ctx.lineTo(0, p.height / 2 + Math.random() * 12 + 6);
      ctx.lineTo(6, p.height / 2);
      ctx.closePath();
      ctx.fill();

      // Ship Hull (Sleek aerodynamic fighter)
      ctx.fillStyle = "#e76735";
      ctx.strokeStyle = "#fdfbf7";
      ctx.lineWidth = 1.5;
      ctx.shadowColor = "#e76735";
      ctx.shadowBlur = 10;

      ctx.beginPath();
      ctx.moveTo(0, -p.height / 2); // Nose
      ctx.lineTo(p.width / 2, p.height / 2); // Right wing
      ctx.lineTo(p.width / 4, p.height / 3);
      ctx.lineTo(0, p.height / 2.5); // Center rear
      ctx.lineTo(-p.width / 4, p.height / 3);
      ctx.lineTo(-p.width / 2, p.height / 2); // Left wing
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Cockpit Glow
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.ellipse(0, -p.height / 8, 4, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      ctx.restore();

      gameLoopRef.current = requestAnimationFrame(loop);
    };

    gameLoopRef.current = requestAnimationFrame(loop);

    return () => {
      isRunning = false;
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [isOpen, gameState, wave]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-label="Arcade Mini-Game"
    >
      <div className="relative w-full max-w-[540px] bg-[#1a0e08] rounded-3xl border border-[#d85827]/40 shadow-2xl shadow-black/90 overflow-hidden flex flex-col max-h-[95vh]">
        {/* Arcade Cabinet Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#24130c] border-b border-white/10 select-none">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#d85827]/20 border border-[#d85827]/40 flex items-center justify-center text-[#f0834c]">
              <Gamepad2 className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold tracking-tight text-white font-mono">
                  BUG HUNTER ARCADE
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#c67d1f]/20 text-[#f5c07b] border border-[#c67d1f]/30">
                  v1.0
                </span>
              </div>
              <div className="text-[11px] font-mono text-stone-400">
                Sharvari&apos;s Interactive Dev Sandbox
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer"
              title={isMuted ? "Unmute Audio" : "Mute Audio"}
              aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-stone-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-[#f5ab79]" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-rose-900/30 text-stone-300 hover:text-white transition-colors cursor-pointer"
              title="Close Arcade"
              aria-label="Close Arcade"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live In-Game HUD Bar */}
        <div className="flex items-center justify-between px-5 py-2.5 bg-[#140a06] border-b border-white/10 text-xs font-mono select-none">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-stone-400 text-[10px] uppercase block">
                Score
              </span>
              <span className="text-sm font-bold text-[#f5ab79]">
                {score.toString().padStart(5, "0")}
              </span>
            </div>

            <div className="border-l border-white/10 pl-4">
              <span className="text-stone-400 text-[10px] uppercase block">
                High
              </span>
              <span className="text-sm font-bold text-white flex items-center gap-1">
                <Trophy className="w-3 h-3 text-[#c67d1f]" />
                {highScore.toString().padStart(5, "0")}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-stone-400 text-[10px] uppercase block">
                Wave
              </span>
              <span className="text-sm font-bold text-[#f5c07b]">
                #{wave}
              </span>
            </div>

            <div className="border-l border-white/10 pl-4 text-right">
              <span className="text-stone-400 text-[10px] uppercase block">
                Lives
              </span>
              <div className="flex items-center gap-1">
                {[1, 2, 3].map((heartIndex) => (
                  <Heart
                    key={heartIndex}
                    className={`w-3.5 h-3.5 ${heartIndex <= lives
                        ? "text-rose-500 fill-rose-500"
                        : "text-stone-600"
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Active Power-up alert banner if collected */}
        {activePowerUp && gameState === "playing" && (
          <div className="bg-[#c67d1f]/20 border-b border-[#c67d1f]/30 px-4 py-1 text-center font-mono text-[11px] text-[#f5c07b] flex items-center justify-center gap-1.5 animate-pulse">
            <Zap className="w-3.5 h-3.5" />
            <span>ACTIVE: {activePowerUp}</span>
          </div>
        )}

        {/* Arcade Screen Canvas Area */}
        <div className="relative flex-1 bg-[#140a06] flex items-center justify-center overflow-hidden">
          <canvas
            ref={canvasRef}
            width={540}
            height={620}
            className="w-full h-auto max-h-[58vh] sm:max-h-[62vh] object-contain block"
          />

          {/* CRT scanline overlay effect */}
          <div
            className="pointer-events-none absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(0,0,0,0.4) 0px, rgba(0,0,0,0.4) 1px, transparent 1px, transparent 2px)",
            }}
          />

          {/* READY / START SCREEN OVERLAY */}
          {gameState === "ready" && (
            <div className="absolute inset-0 bg-[#140a06]/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-10">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#d85827] to-[#e76735] flex items-center justify-center text-white shadow-xl shadow-[#d85827]/40 mb-4 animate-bounce">
                <Gamepad2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 font-mono">
                BUG HUNTER 3000
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 max-w-sm mb-6 leading-relaxed">
                Shoot bugs, patch 404 errors, and eliminate memory leaks before they crash production!
              </p>

              <button
                onClick={startGame}
                className="flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#d85827] to-[#e76735] hover:from-[#c24b1d] hover:to-[#d85827] text-white font-bold text-sm shadow-xl shadow-[#d85827]/40 transition-all hover:scale-105 active:scale-95 cursor-pointer font-mono"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>START MISSION</span>
              </button>

              <div className="mt-8 grid grid-cols-2 gap-3 text-left max-w-xs w-full text-[11px] font-mono text-stone-400 bg-white/5 p-3.5 rounded-2xl border border-white/10">
                <div>
                  <span className="text-[#f5ab79] font-bold block">
                    [← / →] or [A / D]
                  </span>
                  Move Fighter
                </div>
                <div>
                  <span className="text-[#f5ab79] font-bold block">
                    [SPACE] or [TAP]
                  </span>
                  Fire Lasers
                </div>
              </div>
            </div>
          )}

          {/* GAME OVER SCREEN OVERLAY */}
          {gameState === "gameover" && (
            <div className="absolute inset-0 bg-[#140a06]/92 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-10 animate-in fade-in duration-200">
              <div className="w-14 h-14 rounded-2xl bg-rose-950/60 border border-rose-500/50 flex items-center justify-center text-rose-400 mb-3">
                <Flame className="w-7 h-7" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1 font-mono">
                GAME OVER
              </h3>
              <p className="text-xs text-stone-400 mb-5 font-mono">
                Production service went down!
              </p>

              <div className="bg-[#24130c] border border-white/10 rounded-2xl p-4 w-full max-w-xs mb-6 text-center">
                <div className="text-xs font-mono text-stone-400 uppercase mb-1">
                  Final Score
                </div>
                <div className="text-3xl font-black text-[#f5ab79] font-mono tracking-wider">
                  {score}
                </div>
                {score >= highScore && score > 0 && (
                  <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    NEW RECORD HIGH SCORE!
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={startGame}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#d85827] to-[#e76735] hover:from-[#c24b1d] hover:to-[#d85827] text-white font-bold text-sm shadow-xl shadow-[#d85827]/40 transition-all hover:scale-105 active:scale-95 cursor-pointer font-mono"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>PLAY AGAIN</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-mono transition-colors cursor-pointer"
                >
                  EXIT
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile On-Screen Virtual Controller (Shown on touch / small screens) */}
        <div className="sm:hidden px-4 py-3 bg-[#24130c] border-t border-white/10 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <button
              onTouchStart={() => (touchStateRef.current.left = true)}
              onTouchEnd={() => (touchStateRef.current.left = false)}
              onMouseDown={() => (touchStateRef.current.left = true)}
              onMouseUp={() => (touchStateRef.current.left = false)}
              className="w-14 h-12 rounded-2xl bg-white/10 active:bg-[#d85827] border border-white/15 text-white font-bold text-lg flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Move Left"
            >
              ◀
            </button>
            <button
              onTouchStart={() => (touchStateRef.current.right = true)}
              onTouchEnd={() => (touchStateRef.current.right = false)}
              onMouseDown={() => (touchStateRef.current.right = true)}
              onMouseUp={() => (touchStateRef.current.right = false)}
              className="w-14 h-12 rounded-2xl bg-white/10 active:bg-[#d85827] border border-white/15 text-white font-bold text-lg flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Move Right"
            >
              ▶
            </button>
          </div>

          <button
            onTouchStart={() => (touchStateRef.current.fire = true)}
            onTouchEnd={() => (touchStateRef.current.fire = false)}
            onMouseDown={() => (touchStateRef.current.fire = true)}
            onMouseUp={() => (touchStateRef.current.fire = false)}
            className="px-7 h-12 rounded-2xl bg-gradient-to-r from-[#d85827] to-[#e76735] active:from-[#c24b1d] text-white font-bold text-sm tracking-wider font-mono shadow-lg shadow-[#d85827]/40 flex items-center gap-1.5 cursor-pointer"
            aria-label="Fire Weapons"
          >
            <Zap className="w-4 h-4" />
            <span>FIRE</span>
          </button>
        </div>

        {/* Footer controls hint for desktop */}
        <div className="hidden sm:flex items-center justify-between px-5 py-2.5 bg-[#24130c] border-t border-white/10 text-[11px] font-mono text-stone-400 select-none">
          <div className="flex items-center gap-2">
            <span>[← / →] Move</span>
            <span>•</span>
            <span>[SPACE] Fire Laser</span>
          </div>
          <div className="text-stone-400">
            Collect ⚡ / 🛡️ / ☕ for power-ups
          </div>
        </div>
      </div>
    </div>
  );
}
