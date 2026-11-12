"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { FaJsSquare, FaPhp, FaPython } from "react-icons/fa";
import { useState, type CSSProperties } from "react";

const connections = [
  [91, 83, 112, 111],
  [112, 111, 130, 91],
  [130, 91, 145, 130],
  [91, 83, 74, 122],
  [74, 122, 88, 151],
  [88, 151, 119, 166],
  [119, 166, 145, 130],
  [119, 166, 110, 204],
  [110, 204, 91, 235],
];

const nodes = [
  { x: 91, y: 83, label: "Dakar" },
  { x: 112, y: 111, label: "Lagos" },
  { x: 130, y: 91, label: "Nairobi" },
  { x: 145, y: 130, label: "Addis" },
  { x: 74, y: 122, label: "Accra" },
  { x: 88, y: 151, label: "Kinshasa" },
  { x: 119, y: 166, label: "Kigali" },
  { x: 110, y: 204, label: "Maputo" },
];

const particles = [
  { cx: 48, cy: 48, delay: 0 },
  { cx: 185, cy: 62, delay: 1.1 },
  { cx: 44, cy: 178, delay: 2.2 },
  { cx: 178, cy: 220, delay: 0.8 },
  { cx: 153, cy: 35, delay: 1.7 },
  { cx: 68, cy: 250, delay: 2.8 },
];

const floatingCards = [
  { className: "hero-code-card hero-code-card-top", label: "npm / tlc-africa", code: "import { community }" },
  { className: "hero-code-card hero-code-card-bottom", label: "API / OPEN SOURCE", code: "connect({ future: true })" },
];

export default function HeroEcosystem() {
  const [isMotionSafe] = useState(() => typeof window === "undefined" || !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 80, damping: 20, mass: 0.6 });
  const springY = useSpring(pointerY, { stiffness: 80, damping: 20, mass: 0.6 });
  const mapX = useTransform(springX, [-1, 1], [-8, 8]);
  const mapY = useTransform(springY, [-1, 1], [-6, 6]);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!isMotionSafe) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width * 2 - 1);
    pointerY.set((event.clientY - bounds.top) / bounds.height * 2 - 1);
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <motion.div
      className="hero-ecosystem relative mx-auto w-full max-w-sm lg:max-w-md"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      initial={{ opacity: 0, scale: 0.96, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="hero-ecosystem-glow" />
      <motion.div className="hero-ecosystem-panel" style={{ x: mapX, y: mapY }}>
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#67e8f9]/75">Africa / Open Source</p>
            <p className="mt-2 text-base font-semibold text-white">Écosystème connecté</p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-[#67e8f9]/25 bg-[#67e8f9]/10 px-2.5 py-1 text-[11px] font-semibold text-[#a5f3fc]">
            <span className="h-2 w-2 rounded-full bg-[#67e8f9] shadow-[0_0_12px_#67e8f9]" />
            Live
          </div>
        </div>

        <div className="hero-map-stage mt-5">
          <div className="hero-map-grid" />
          <div className="hero-map-rings" />
          <motion.div className="hero-map-image" initial={{ opacity: 0, scale: 0.86 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.4, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}>
            <Image src="/Réseau néon de l’Afrique futuriste.png" alt="Réseau néon futuriste reliant des villes africaines" fill priority sizes="(max-width: 1024px) 90vw, 420px" />
          </motion.div>
          <motion.svg className="hidden hero-map-svg" viewBox="0 0 220 285" role="img" aria-label="Carte lumineuse de l'Afrique reliée par un réseau de développeurs">
            <defs>
              <linearGradient id="africa-fill" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stopColor="#1d4ed8" stopOpacity="0.9" />
                <stop offset="0.55" stopColor="#7c3aed" stopOpacity="0.76" />
                <stop offset="1" stopColor="#f97316" stopOpacity="0.72" />
              </linearGradient>
              <filter id="africa-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <clipPath id="africa-clip">
                <path d="M109 10C94 14 86 29 84 43 77 56 62 69 57 85 51 101 55 114 47 130 39 146 43 163 53 177 63 191 66 208 78 220 90 233 96 249 102 264L111 282 121 263C132 249 141 237 153 223 165 208 176 196 181 181 187 168 179 157 183 146 188 133 178 121 174 109 169 96 174 87 165 75 157 65 157 55 148 47 138 38 134 26 130 17 124 9 115 6 109 10Z" />
              </clipPath>
            </defs>
            <motion.path
              d="M109 10C94 14 86 29 84 43 77 56 62 69 57 85 51 101 55 114 47 130 39 146 43 163 53 177 63 191 66 208 78 220 90 233 96 249 102 264L111 282 121 263C132 249 141 237 153 223 165 208 176 196 181 181 187 168 179 157 183 146 188 133 178 121 174 109 169 96 174 87 165 75 157 65 157 55 148 47 138 38 134 26 130 17 124 9 115 6 109 10Z"
              fill="url(#africa-fill)"
              filter="url(#africa-glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.92 }}
              transition={{ pathLength: { duration: 2, ease: "easeInOut" }, opacity: { duration: 0.5 } }}
            />
            <path d="M109 10C94 14 86 29 84 43 77 56 62 69 57 85 51 101 55 114 47 130 39 146 43 163 53 177 63 191 66 208 78 220 90 233 96 249 102 264L111 282 121 263C132 249 141 237 153 223 165 208 176 196 181 181 187 168 179 157 183 146 188 133 178 121 174 109 169 96 174 87 165 75 157 65 157 55 148 47 138 38 134 26 130 17 124 9 115 6 109 10Z" fill="none" stroke="#a5f3fc" strokeOpacity="0.78" strokeWidth="1.2" strokeDasharray="3 4" />
            <g clipPath="url(#africa-clip)">
              {connections.map(([x1, y1, x2, y2], index) => (
                <motion.line key={`${x1}-${y1}-${x2}-${y2}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={index % 2 ? "#c4b5fd" : "#67e8f9"} strokeOpacity="0.82" strokeWidth="1" strokeDasharray="4 4" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.82 }} transition={{ delay: 0.45 + index * 0.08, duration: 0.7 }} />
              ))}
              {nodes.map((node, index) => (
                <motion.g key={node.label} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 + index * 0.08, type: "spring", stiffness: 180 }}>
                  <circle cx={node.x} cy={node.y} r="5" fill="#07162f" stroke="#fed7aa" strokeWidth="1.2" />
                  <circle className="hero-map-node-pulse" cx={node.x} cy={node.y} r="3" fill="#fb923c" />
                </motion.g>
              ))}
            </g>
            {particles.map((particle) => (
              <circle key={`${particle.cx}-${particle.cy}`} className="hero-map-particle" cx={particle.cx} cy={particle.cy} r="1.5" style={{ "--particle-delay": `${particle.delay}s` } as CSSProperties} />
            ))}
          </motion.svg>

          <div className="hero-map-label hero-map-label-python" title="Python"><FaPython aria-hidden="true" /><span className="sr-only">Python</span></div>
          <div className="hero-map-label hero-map-label-js" title="JavaScript"><FaJsSquare aria-hidden="true" /><span className="sr-only">JavaScript</span></div>
          <div className="hero-map-label hero-map-label-php" title="PHP"><FaPhp aria-hidden="true" /><span className="sr-only">PHP</span></div>
        </div>

        {floatingCards.map((card) => (
          <motion.div key={card.label} className={card.className} animate={isMotionSafe ? { y: [0, -7, 0] } : undefined} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
            <span>{card.label}</span>
            <code>{card.code}</code>
          </motion.div>
        ))}

        <div className="mt-4 border-b border-white/15 bg-white/5 p-3.5 text-sm text-slate-200">
          Des bibliothèques africaines pour créer des solutions adaptées à nos vécus.
        </div>
      </motion.div>
    </motion.div>
  );
}

