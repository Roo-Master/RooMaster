"use client";

import { useEffect, useRef } from "react";

// Page-wide "neural network" backdrop: drifting nodes, faint links, and
// signals that fire along the links. Canvas 2D only, capped pixel ratio,
// paused while the tab is hidden, and a single still frame when the visitor
// prefers reduced motion.
type Node = { x: number; y: number; vx: number; vy: number };
type Pulse = { a: number; b: number; t: number };

export default function NeuralBackground() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, link = 140, raf = 0, last = 0, nextPulse = 0;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    const mouse = { x: -999, y: -999 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      link = w < 700 ? 110 : 150;
      const count = Math.round(Math.min(70, Math.max(26, (w * h) / 24000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }));
      pulses = [];
      draw(0);
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h);
      const edges: [number, number, number][] = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < link) edges.push([i, j, d]);
        }
      }
      ctx.lineWidth = 1;
      for (const [i, j, d] of edges) {
        ctx.strokeStyle = `rgba(56,189,248,${(1 - d / link) * 0.22})`;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      }
      for (const n of nodes) {
        const near = Math.hypot(n.x - mouse.x, n.y - mouse.y) < 160;
        ctx.fillStyle = near ? "rgba(125,211,252,0.95)" : "rgba(56,189,248,0.5)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, near ? 2.6 : 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
      if (reduce) return;

      if (now > nextPulse && edges.length && pulses.length < 6) {
        const [a, b] = edges[Math.floor(Math.random() * edges.length)];
        pulses.push({ a, b, t: 0 });
        nextPulse = now + 500 + Math.random() * 700;
      }
      pulses = pulses.filter((p) => {
        p.t += 0.018;
        const A = nodes[p.a], B = nodes[p.b];
        if (p.t >= 1) {
          // the signal can hop on to a neighbouring node, like a firing neuron
          if (Math.random() < 0.6) {
            const next = edges.filter((e) => e[0] === p.b || e[1] === p.b).map((e) => (e[0] === p.b ? e[1] : e[0]));
            if (next.length && pulses.length < 6) pulses.push({ a: p.b, b: next[Math.floor(Math.random() * next.length)], t: 0 });
          }
          return false;
        }
        ctx.fillStyle = "rgba(186,230,253,0.95)";
        ctx.shadowColor = "#38bdf8";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(A.x + (B.x - A.x) * p.t, A.y + (B.y - A.y) * p.t, 2.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        return true;
      });
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (now - last < 33) return; // ~30fps is plenty for a backdrop
      last = now;
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
      draw(now);
    };

    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduce) raf = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };

    resize();
    if (!reduce) raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} className="neural-bg" aria-hidden="true" />;
}
