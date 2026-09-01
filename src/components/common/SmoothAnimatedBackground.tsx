import React, { useEffect, useRef } from 'react';

interface SmoothAnimatedBackgroundProps {
  particleCount?: number;
}

export const SmoothAnimatedBackground: React.FC<SmoothAnimatedBackgroundProps> = ({
  particleCount = 28
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes
    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseAlpha: number;
      alpha: number;
      color: string;
      pulseSpeed: number;
      phase: number;
    }

    const colors = [
      'rgba(147, 51, 234,',   // Purple
      'rgba(168, 85, 247,',   // Violet
      'rgba(192, 132, 252,',  // Lavender
      'rgba(217, 70, 239,',   // Fuchsia
      'rgba(99, 102, 241,'    // Indigo
    ];

    const nodes: Node[] = [];
    for (let i = 0; i < particleCount; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2.2 + 1.0,
        baseAlpha: Math.random() * 0.35 + 0.15,
        alpha: 0.2,
        color,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI * 2
      });
    }

    let tick = 0;
    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle connecting constellation lines between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const lineAlpha = (1 - dist / 140) * 0.08;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        // Screen wrap
        if (node.x < -10) node.x = width + 10;
        if (node.x > width + 10) node.x = -10;
        if (node.y < -10) node.y = height + 10;
        if (node.y > height + 10) node.y = -10;

        node.phase += node.pulseSpeed;
        node.alpha = node.baseAlpha + Math.sin(node.phase) * 0.15;
        node.alpha = Math.max(0.05, Math.min(0.6, node.alpha));

        // Glow gradient
        const grad = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          node.radius * 3.5
        );
        grad.addColorStop(0, `${node.color} ${node.alpha})`);
        grad.addColorStop(1, `${node.color} 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Core solid particle
        ctx.fillStyle = `${node.color} ${Math.min(1, node.alpha + 0.3)})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleCount]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* 1. Base Subtle Ambient Mesh Gradients */}
      <div 
        className="absolute top-[-10%] left-[-5%] w-[55vw] h-[55vw] rounded-full bg-purple-300/25 blur-[120px] animate-pulse-glow"
        style={{ animationDuration: '8s' }}
      />
      <div 
        className="absolute top-[35%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-violet-300/20 blur-[130px] animate-pulse-glow"
        style={{ animationDuration: '10s', animationDelay: '2s' }}
      />
      <div 
        className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[50vw] rounded-full bg-fuchsia-300/18 blur-[140px] animate-pulse-glow"
        style={{ animationDuration: '12s', animationDelay: '4s' }}
      />
      <div 
        className="absolute top-[60%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-indigo-200/18 blur-[110px] animate-pulse-glow"
        style={{ animationDuration: '9s', animationDelay: '1s' }}
      />

      {/* 2. Floating Geometric Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #7e22ce 1px, transparent 1px),
            linear-gradient(to bottom, #7e22ce 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px'
        }}
      />

      {/* 3. Interactive Floating Particle Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
};
