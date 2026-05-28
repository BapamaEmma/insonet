import { useEffect, useRef } from "react";

const themes = {
  dark: {
    nodeFill: "rgba(79, 163, 224, 0.85)",
    nodeGlow: "rgba(79, 163, 224, 0.35)",
    lineStroke: (alpha) => `rgba(79, 163, 224, ${alpha * 0.32})`,
    pointerGlow: ["rgba(79, 163, 224, 0.35)", "rgba(79, 163, 224, 0)"],
    gridColor: "rgba(79, 163, 224, 0.06)",
    packetColor: "rgba(125, 211, 252, 0.95)",
    pulseColor: "rgba(79, 163, 224, 0.45)",
    clear: (ctx, w, h) => ctx.clearRect(0, 0, w, h),
  },
  light: {
    nodeFill: "rgba(56, 189, 248, 0.8)",
    nodeGlow: "rgba(56, 189, 248, 0.25)",
    lineStroke: (alpha) => `rgba(59, 130, 246, ${alpha * 0.35})`,
    pointerGlow: ["rgba(56, 189, 248, 0.25)", "rgba(56, 189, 248, 0)"],
    gridColor: "rgba(59, 130, 246, 0.05)",
    packetColor: "rgba(37, 99, 235, 0.9)",
    pulseColor: "rgba(59, 130, 246, 0.35)",
    clear: (ctx, w, h) => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(255, 255, 255, 0.72)";
      ctx.fillRect(0, 0, w, h);
    },
  },
};

function drawGrid(context, width, height, gridColor, offset) {
  const spacing = 48;
  context.strokeStyle = gridColor;
  context.lineWidth = 1;

  const shift = offset % spacing;

  for (let x = -spacing + shift; x < width + spacing; x += spacing) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.stroke();
  }

  for (let y = -spacing + shift; y < height + spacing; y += spacing) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
  }

  context.fillStyle = gridColor.replace(/[\d.]+\)$/, "0.35)");
  for (let x = shift; x < width; x += spacing) {
    for (let y = shift; y < height; y += spacing) {
      context.beginPath();
      context.arc(x, y, 1, 0, Math.PI * 2);
      context.fill();
    }
  }
}

export default function TechHeroBackground({ variant = "dark", nodeCount = 58 }) {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const theme = themes[variant] ?? themes.dark;

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const host = section.parentElement;
    if (!host) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const nodes = [];
    const pulses = [];
    const packets = [];
    const pointer = { x: 0, y: 0, active: false };
    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    let gridOffset = 0;
    let pulseTimer = 0;
    let packetTimer = 0;
    let isRunning = true;

    const createNodes = () => {
      nodes.length = 0;
      if (width <= 0 || height <= 0) return;
      for (let i = 0; i < nodeCount; i += 1) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: 1 + Math.random() * 1.8,
          pulse: Math.random() * Math.PI * 2,
        });
      }
    };

    const spawnPulse = () => {
      if (!nodes.length) return;
      const node = nodes[Math.floor(Math.random() * nodes.length)];
      pulses.push({ x: node.x, y: node.y, radius: 4, maxRadius: 42 + Math.random() * 28, alpha: 0.55 });
    };

    const spawnPacket = () => {
      if (nodes.length < 2) return;
      const fromIndex = Math.floor(Math.random() * nodes.length);
      let toIndex = Math.floor(Math.random() * nodes.length);
      if (toIndex === fromIndex) toIndex = (toIndex + 1) % nodes.length;

      const from = nodes[fromIndex];
      const to = nodes[toIndex];
      const distance = Math.hypot(from.x - to.x, from.y - to.y);
      if (distance > 140) return;

      packets.push({
        fromX: from.x,
        fromY: from.y,
        toX: to.x,
        toY: to.y,
        progress: 0,
        speed: 0.012 + Math.random() * 0.018,
      });
    };

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = host.clientWidth;
      height = host.clientHeight;
      if (width <= 0 || height <= 0) return;

      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      createNodes();
    };

    const onMouseMove = (event) => {
      const bounds = host.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.active = true;
    };

    const onMouseLeave = () => {
      pointer.active = false;
    };

    const animate = () => {
      if (!isRunning) return;

      if (width <= 0 || height <= 0) {
        animationFrameId = window.requestAnimationFrame(animate);
        return;
      }

      theme.clear(context, width, height);
      gridOffset += 0.15;
      drawGrid(context, width, height, theme.gridColor, gridOffset);

      pulseTimer += 1;
      if (pulseTimer > 90) {
        spawnPulse();
        pulseTimer = 0;
      }

      packetTimer += 1;
      if (packetTimer > 45) {
        spawnPacket();
        packetTimer = 0;
      }

      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.04;

        if (node.x <= 0 || node.x >= width) node.vx *= -1;
        if (node.y <= 0 || node.y >= height) node.vy *= -1;

        if (pointer.active) {
          const dx = pointer.x - node.x;
          const dy = pointer.y - node.y;
          const distance = Math.hypot(dx, dy);
          const influenceRadius = 130;
          if (distance < influenceRadius && distance > 0.001) {
            const force = (influenceRadius - distance) / influenceRadius;
            node.vx += (dx / distance) * force * 0.028;
            node.vy += (dy / distance) * force * 0.028;
          }
        }

        node.vx *= 0.992;
        node.vy *= 0.992;
      }

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.hypot(dx, dy);
          if (distance < 118) {
            const alpha = 1 - distance / 118;
            context.beginPath();
            context.moveTo(nodes[i].x, nodes[i].y);
            context.lineTo(nodes[j].x, nodes[j].y);
            context.strokeStyle = theme.lineStroke(alpha);
            context.lineWidth = 1;
            context.stroke();
          }
        }
      }

      for (let i = pulses.length - 1; i >= 0; i -= 1) {
        const pulse = pulses[i];
        pulse.radius += 1.2;
        pulse.alpha *= 0.965;
        context.beginPath();
        context.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
        context.strokeStyle = theme.pulseColor.replace(/[\d.]+\)$/, `${pulse.alpha})`);
        context.lineWidth = 1.5;
        context.stroke();
        if (pulse.alpha < 0.03 || pulse.radius > pulse.maxRadius) {
          pulses.splice(i, 1);
        }
      }

      for (let i = packets.length - 1; i >= 0; i -= 1) {
        const packet = packets[i];
        packet.progress += packet.speed;
        const x = packet.fromX + (packet.toX - packet.fromX) * packet.progress;
        const y = packet.fromY + (packet.toY - packet.fromY) * packet.progress;

        context.beginPath();
        context.arc(x, y, 2.2, 0, Math.PI * 2);
        context.fillStyle = theme.packetColor;
        context.shadowBlur = 8;
        context.shadowColor = theme.packetColor;
        context.fill();
        context.shadowBlur = 0;

        if (packet.progress >= 1) packets.splice(i, 1);
      }

      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        const glow = 0.55 + Math.sin(node.pulse) * 0.25;
        context.beginPath();
        context.arc(node.x, node.y, node.radius + 2, 0, Math.PI * 2);
        context.fillStyle = theme.nodeGlow.replace(/[\d.]+\)$/, `${glow * 0.35})`);
        context.fill();

        context.beginPath();
        context.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        context.fillStyle = theme.nodeFill;
        context.fill();
      }

      if (pointer.active) {
        const glow = context.createRadialGradient(
          pointer.x,
          pointer.y,
          10,
          pointer.x,
          pointer.y,
          170,
        );
        glow.addColorStop(0, theme.pointerGlow[0]);
        glow.addColorStop(1, theme.pointerGlow[1]);
        context.beginPath();
        context.arc(pointer.x, pointer.y, 170, 0, Math.PI * 2);
        context.fillStyle = glow;
        context.fill();
      }

      animationFrameId = window.requestAnimationFrame(animate);
    };

    resize();
    animate();

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(host);

    host.addEventListener("mousemove", onMouseMove);
    host.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", resize);

    return () => {
      isRunning = false;
      window.cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      host.removeEventListener("mousemove", onMouseMove);
      host.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", resize);
    };
  }, [nodeCount, variant]);

  return (
    <div ref={sectionRef} className="tech-hero-bg" aria-hidden="true">
      <canvas ref={canvasRef} className="tech-hero-bg__canvas" />
      <div className="tech-hero-bg__orb tech-hero-bg__orb--one" />
      <div className="tech-hero-bg__orb tech-hero-bg__orb--two" />
      <div className="tech-hero-bg__scanline" />
      <style>{`
        .tech-hero-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .tech-hero-bg__canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        .tech-hero-bg__orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(1px);
        }
        .tech-hero-bg__orb--one {
          top: -120px;
          right: -80px;
          width: 420px;
          height: 420px;
          background: radial-gradient(circle, rgba(79,163,224,0.22) 0%, transparent 70%);
          animation: techOrbDriftOne 14s ease-in-out infinite;
        }
        .tech-hero-bg__orb--two {
          bottom: -100px;
          left: -60px;
          width: 360px;
          height: 360px;
          background: radial-gradient(circle, rgba(26,86,219,0.18) 0%, transparent 70%);
          animation: techOrbDriftTwo 18s ease-in-out infinite;
        }
        .tech-hero-bg__scanline {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(79, 163, 224, 0.025) 2px,
            rgba(79, 163, 224, 0.025) 3px
          );
          opacity: 0.5;
          animation: techScanline 8s linear infinite;
          pointer-events: none;
        }
        @keyframes techOrbDriftOne {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-24px, 18px) scale(1.06); }
        }
        @keyframes techOrbDriftTwo {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -16px) scale(1.08); }
        }
        @keyframes techScanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
}
