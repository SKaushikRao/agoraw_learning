import { useEffect, useRef } from 'react';

export default function Community() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width;
    let height = canvas.height;

    const resize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = 400;
        width = canvas.width;
        height = canvas.height;
      }
    };
    window.addEventListener('resize', resize);
    resize();

    const nodes = Array.from({ length: 50 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 3 + 1,
    }));

    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw map-like background points
      ctx.fillStyle = 'rgba(183, 139, 74, 0.05)';
      for(let i=0; i<100; i++) {
        ctx.beginPath();
        ctx.arc(
          Math.sin(i * 123) * width / 2 + width / 2, 
          Math.cos(i * 321) * height / 2 + height / 2, 
          1, 0, Math.PI * 2
        );
        ctx.fill();
      }

      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      });

      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(92, 59, 34, ${1 - dist / 100})`;
            ctx.stroke();
          }
        }
      }

      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(183, 139, 74, 0.8)';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
      <h1 className="font-serif text-5xl text-agora-dark mb-4">Community</h1>
      <p className="text-agora-muted mb-12 max-w-2xl">Connect with a global network of thinkers, students, and educators.</p>
      
      <div className="bg-agora-card border border-agora-border rounded-2xl overflow-hidden shadow-sm relative mb-16">
        <div className="absolute top-6 left-6 z-10 bg-agora-bg/80 backdrop-blur-md p-4 rounded-xl border border-agora-border">
          <div className="text-3xl font-serif font-bold text-agora-dark">4,285</div>
          <div className="text-[10px] uppercase tracking-widest text-agora-accent font-bold">Active Thinkers Online</div>
        </div>
        <canvas ref={canvasRef} className="w-full h-[400px] bg-[#F8F4EE]" style={{ display: 'block' }}></canvas>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-agora-card p-6 rounded-xl border border-agora-border shadow-sm">
          <h3 className="font-serif text-2xl text-agora-dark mb-2">Write an Essay</h3>
          <p className="text-sm text-agora-muted mb-6">Share your perspective on arts, humanities, and society.</p>
          <button className="bg-agora-primary text-agora-bg px-6 py-2.5 rounded-full text-xs font-medium hover:bg-agora-dark transition-colors">Start Writing</button>
        </div>
        <div className="bg-agora-card p-6 rounded-xl border border-agora-border shadow-sm">
          <h3 className="font-serif text-2xl text-agora-dark mb-2">Discussion Forums</h3>
          <p className="text-sm text-agora-muted mb-6">Engage in intellectual debates and nuanced conversations.</p>
          <button className="border border-agora-primary text-agora-primary px-6 py-2.5 rounded-full text-xs font-medium hover:bg-agora-primary hover:text-agora-bg transition-colors">Join Discussions</button>
        </div>
        <div className="bg-agora-card p-6 rounded-xl border border-agora-border shadow-sm">
          <h3 className="font-serif text-2xl text-agora-dark mb-2">Upcoming Events</h3>
          <p className="text-sm text-agora-muted mb-6">Attend virtual seminars, reading clubs, and guest lectures.</p>
          <button className="border border-agora-primary text-agora-primary px-6 py-2.5 rounded-full text-xs font-medium hover:bg-agora-primary hover:text-agora-bg transition-colors">View Schedule</button>
        </div>
      </div>
    </div>
  );
}
