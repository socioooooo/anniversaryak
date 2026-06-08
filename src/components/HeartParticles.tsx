import { useEffect, useRef } from 'react';

interface Heart {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  opacity: number;
  life: number;
  maxLife: number;
}

function drawHeart(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.beginPath();
  const topCurveHeight = size * 0.3;
  ctx.moveTo(x, y + topCurveHeight);
  ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
  ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 1.2, x, y + size);
  ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 1.2, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
  ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
  ctx.closePath();
}

export default function HeartParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heartsRef = useRef<Heart[]>([]);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const spawn = () => {
      if (heartsRef.current.length > 30) return;
      heartsRef.current.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 20,
        size: Math.random() * 12 + 6,
        speed: Math.random() * 0.8 + 0.3,
        drift: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.4 + 0.2,
        life: 0,
        maxLife: Math.random() * 400 + 200,
      });
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (Math.random() < 0.05) spawn();

      heartsRef.current = heartsRef.current.filter((h) => {
        h.life++;
        h.y -= h.speed;
        h.x += Math.sin(h.life * 0.02) * h.drift;
        const fade = h.life > h.maxLife * 0.7 ? 1 - (h.life - h.maxLife * 0.7) / (h.maxLife * 0.3) : 1;
        const alpha = h.opacity * fade;

        ctx.save();
        ctx.fillStyle = `rgba(244, 63, 94, ${alpha})`;
        drawHeart(ctx, h.x, h.y, h.size);
        ctx.fill();
        ctx.restore();

        return h.life < h.maxLife;
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[1]" />;
}
