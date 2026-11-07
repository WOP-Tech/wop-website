"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { clamp, easeOutCubic, isInViewport, pinnedProgress, usePrefersReducedMotion, useScrollFrame } from "@/lib/motion";
import { woperWords } from "./data";

type Dot = { sx: number; sy: number; tx: number; ty: number; startScale: number; delay: number; color: RGB };
type RGB = [number, number, number];

const INK: RGB = [255, 246, 234]; // crème
const GRADIENT: RGB[] = [
  [231, 107, 112], // rose corail
  [244, 122, 99], // corail lumineux
  [246, 181, 74], // doré
  [255, 246, 234], // crème
];

// Générateur pseudo-aléatoire déterministe : le nuage est identique à chaque chargement.
function createRandom(seed = 7) {
  return () => (seed = (seed * 16807) % 2147483647) / 2147483647;
}

function gradientAt(f: number): RGB {
  const t = clamp(f) * (GRADIENT.length - 1);
  const i = Math.min(GRADIENT.length - 2, Math.floor(t));
  const u = t - i;
  const [a, b] = [GRADIENT[i], GRADIENT[i + 1]];
  return [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u, a[2] + (b[2] - a[2]) * u];
}

function shuffle<T>(list: T[], random: () => number) {
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

function displayFontFamily() {
  return getComputedStyle(document.documentElement).getPropertyValue("--font-league-spartan").trim() || "sans-serif";
}

/** Points échantillonnés sur les lettres « WOP » (repère 900 × 300). */
function sampleLogoPoints() {
  const canvas = document.createElement("canvas");
  canvas.width = 900;
  canvas.height = 300;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.font = `700 300px ${displayFontFamily()}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("WOP", 450, 165);
  const data = ctx.getImageData(0, 0, 900, 300).data;
  const points: [number, number][] = [];
  for (let y = 20, row = 0; y < 290; y += 6, row++) {
    for (let x = (row % 2) * 3; x < 900; x += 6) {
      if (data[(y * 900 + x) * 4 + 3] > 128) points.push([x, y]);
    }
  }
  return points;
}

/** Points échantillonnés sur la forme réelle d'un mot affiché, en coordonnées de la scène. */
function sampleWordPoints(span: HTMLElement, origin: DOMRect) {
  const rect = span.getBoundingClientRect();
  const style = getComputedStyle(span);
  const fontSize = parseFloat(style.fontSize);
  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(rect.width) + 4;
  canvas.height = Math.ceil(rect.height) + 4;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.font = `${style.fontWeight} ${fontSize}px ${style.fontFamily}`;
  if ("letterSpacing" in ctx) ctx.letterSpacing = style.letterSpacing;
  ctx.textBaseline = "middle";
  ctx.fillText((span.textContent ?? "").toUpperCase(), 2, canvas.height / 2 + fontSize * 0.04);
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  const step = Math.max(2.4, fontSize * 0.13);
  const points: [number, number][] = [];
  for (let y = 0; y < canvas.height; y += step) {
    for (let x = 0; x < canvas.width; x += step) {
      if (data[(Math.floor(y) * canvas.width + Math.floor(x)) * 4 + 3] > 120) {
        points.push([rect.left - origin.left + x - 2, rect.top - origin.top + y]);
      }
    }
  }
  return { points, step };
}

/** Direction de chaque mot sur le cercle ; le rayon est fixé en CSS (plus large sur mobile). */
function wordDirection(i: number) {
  const angle = ((-90 + 15 + (i * 360) / woperWords.length) * Math.PI) / 180;
  return { "--cos": Math.cos(angle).toFixed(4), "--sin": Math.sin(angle).toFixed(4) } as CSSProperties;
}

/** « Ce que les Woper pensent de WOP » : douze mots en cercle qui se dissolvent en points pour former « WOP ». */
export function HomeWords() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLParagraphElement>(null);
  const wordRefs = useRef<(HTMLLIElement | null)[]>([]);
  const scene = useRef<{ dots: Dot[]; size: number; logo: [number, number][] }>({ dots: [], size: 2, logo: [] });

  const draw = () => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (reducedMotion || !section || !canvas || !isInViewport(section)) return;

    const progress = pinnedProgress(section);
    const wordsIn = clamp(progress / 0.34);
    const dotsVisible = clamp((progress - 0.46) / 0.012);
    const morph = clamp((progress - 0.5) / 0.28);

    wordRefs.current.forEach((li, i) => {
      if (li) li.style.opacity = (clamp((wordsIn - i * 0.075) / 0.08) * (1 - dotsVisible)).toFixed(3);
    });
    if (headRef.current) headRef.current.style.opacity = (1 - clamp((progress - 0.46) / 0.06)).toFixed(3);
    if (endRef.current) endRef.current.style.opacity = clamp((morph - 0.9) / 0.1).toFixed(3);

    const ctx = canvas.getContext("2d")!;
    const dpr = canvas.width / canvas.clientWidth || 1;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    if (dotsVisible <= 0) return;

    ctx.globalAlpha = dotsVisible;
    const { dots, size } = scene.current;
    for (const dot of dots) {
      const e = easeOutCubic(clamp(morph * 1.35 - dot.delay));
      const k = easeOutCubic(clamp(e * 1.6));
      const radius = ((dot.startScale + (1 - dot.startScale) * e) * size) / 2;
      const r = Math.round(INK[0] + (dot.color[0] - INK[0]) * k);
      const g = Math.round(INK[1] + (dot.color[1] - INK[1]) * k);
      const b = Math.round(INK[2] + (dot.color[2] - INK[2]) * k);
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.beginPath();
      ctx.arc(dot.sx + (dot.tx - dot.sx) * e, dot.sy + (dot.ty - dot.sy) * e, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  useScrollFrame(draw);

  useEffect(() => {
    if (reducedMotion) return;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;

    const layout = () => {
      const random = createRandom();
      const width = stage.clientWidth;
      const height = stage.clientHeight;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      const origin = stage.getBoundingClientRect();
      let sources: [number, number][] = [];
      let step = 3;
      wordRefs.current.forEach((li) => {
        const span = li?.querySelector("span");
        if (!span) return;
        const sampled = sampleWordPoints(span, origin);
        step = sampled.step;
        sources = sources.concat(sampled.points);
      });
      const logo = scene.current.logo;
      if (!sources.length || !logo.length) return;

      // Autant de points de départ que de points d'arrivée, triés de gauche à droite pour un mouvement fluide.
      shuffle(sources, random);
      const targets = shuffle(logo.slice(), random).sort((a, b) => a[0] - b[0]);
      const starts = targets
        .map((_, q) => {
          const [x, y] = sources[q % sources.length];
          const jitter = q >= sources.length ? step : 0;
          return [x + (random() - 0.5) * jitter, y + (random() - 0.5) * jitter] as [number, number];
        })
        .sort((a, b) => a[0] - b[0]);

      const xs = logo.map((p) => p[0]);
      const ys = logo.map((p) => p[1]);
      const [minX, maxX, minY, maxY] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
      const scale = Math.min((width * 0.62) / (maxX - minX + 6), (height * 0.46) / (maxY - minY + 6));
      const [cx, cy] = [(minX + maxX) / 2, (minY + maxY) / 2];
      const size = Math.max(2, 6 * scale * 0.55);
      const startScale = clamp((step * 0.8) / size, 0.2, 1.2);

      scene.current.size = size;
      scene.current.dots = targets.map(([tx, ty], i) => ({
        sx: starts[i][0],
        sy: starts[i][1],
        tx: width / 2 + (tx - cx) * scale,
        ty: height * 0.46 + (ty - cy) * scale,
        startScale,
        delay: random() * 0.3,
        color: gradientAt(tx / 900),
      }));
      draw();
    };

    let cancelled = false;
    // Le dessin dépend de la police : on attend League Spartan avant d'échantillonner.
    document.fonts.ready.then(() => {
      if (cancelled) return;
      scene.current.logo = sampleLogoPoints();
      layout();
    });
    const observer = new ResizeObserver(() => scene.current.logo.length && layout());
    observer.observe(stage);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `draw` lit l'état courant via des refs
  }, [reducedMotion]);

  return (
    <section
      id="mots"
      ref={sectionRef}
      className="relative h-[440vh] bg-brown text-cream motion-reduce:h-auto"
    >
      <p className="sr-only">
        Ce que les Woper (Woman of Power / Women of Power) pensent de WOP, en douze mots : {woperWords.join(", ")}.
      </p>
      <div
        ref={stageRef}
        aria-hidden="true"
        className="sticky top-0 h-svh overflow-hidden motion-reduce:relative motion-reduce:h-screen motion-reduce:min-h-[620px]"
      >
        <div
          ref={headRef}
          className="absolute top-1/2 left-1/2 z-[2] w-[min(56vw,420px)] -translate-1/2 text-center min-[760px]:w-[min(62vw,680px)]"
        >
          <p className="eyebrow mb-3.5 tracking-[0.22em] opacity-85">En douze mots</p>
          <h2 className="font-display text-[clamp(1.7rem,8vw,2.4rem)] leading-[0.98] font-semibold tracking-[-0.045em] text-balance min-[760px]:text-[clamp(2.1rem,4.6vw,4.4rem)]">
            Ce que les Woper
            <sup className="relative top-[0.05em] ml-[0.06em] align-top text-[0.5em] text-sun">*</sup> pensent de{" "}
            <em className="mt-[0.04em] block font-script text-[1.35em] leading-[0.9] font-normal tracking-normal text-sun not-italic">
              WOP.
            </em>
          </h2>
          <p className="mt-[18px] text-[max(0.82rem,13px)] tracking-[0.04em] opacity-85">
            * Woper : Woman of Power / Women of Power
          </p>
        </div>

        <ul className="absolute inset-0">
          {woperWords.map((word, i) => (
            <li
              key={word}
              ref={(el) => {
                wordRefs.current[i] = el;
              }}
              style={wordDirection(i)}
              className="absolute top-[calc(50%+var(--sin)*38%)] left-[calc(50%+var(--cos)*40%)] flex -translate-1/2 flex-col items-center gap-2 min-[760px]:top-[calc(50%+var(--sin)*35%)] min-[760px]:left-[calc(50%+var(--cos)*37%)] min-[760px]:gap-2.5 text-center font-display text-[clamp(0.74rem,1.5vw,1.2rem)] leading-none font-medium tracking-[0.1em] whitespace-nowrap uppercase min-[760px]:tracking-[0.14em] before:size-[9px] before:flex-none before:rounded-full before:bg-[linear-gradient(135deg,var(--color-coral),var(--color-sun))] anim:opacity-0"
            >
              <span className="block min-w-0">{word}</span>
            </li>
          ))}
        </ul>

        <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 size-full motion-reduce:hidden" />

        <p
          ref={endRef}
          className="absolute bottom-[calc(11%+env(safe-area-inset-bottom,0px))] left-1/2 -translate-x-1/2 font-display text-[clamp(0.8rem,1.4vw,1.05rem)] leading-none font-medium tracking-[0.3em] whitespace-nowrap uppercase opacity-0"
        >
          Woman of Power
        </p>
      </div>
    </section>
  );
}
