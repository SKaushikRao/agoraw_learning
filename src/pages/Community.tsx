import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, FileText } from 'lucide-react';
import { sanityFetch } from '../sanity/client';
import { GET_COMMUNITY_ARTICLES_QUERY } from '../sanity/queries';
import { SanityArticle } from '../sanity/types';
import { getSanityImageUrl } from '../sanity/image';
import WriteArticleModal from '../components/WriteArticleModal';

export default function Community() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [articles, setArticles] = useState<SanityArticle[]>([]);
  const [articlesLoading, setArticlesLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchArticles = async () => {
      setArticlesLoading(true);
      try {
        const data = await sanityFetch<SanityArticle[]>(GET_COMMUNITY_ARTICLES_QUERY);
        if (isMounted) {
          setArticles(data || []);
        }
      } catch (err) {
        console.error('Failed to fetch community articles:', err);
        if (isMounted) setArticles([]);
      } finally {
        if (isMounted) setArticlesLoading(false);
      }
    };

    fetchArticles();

    return () => {
      isMounted = false;
    };
  }, []);

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
        height = 400;
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

  const refreshArticles = () => {
    let isMounted = true;
    sanityFetch<SanityArticle[]>(GET_COMMUNITY_ARTICLES_QUERY)
      .then((data) => {
        if (isMounted) setArticles(data || []);
      })
      .catch((err) => {
        console.error('Failed to fetch community articles:', err);
      });
    
    return () => {
      isMounted = false;
    };
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
      <WriteArticleModal
        isOpen={isWriteModalOpen}
        onClose={() => setIsWriteModalOpen(false)}
        onSubmitSuccess={refreshArticles}
      />

      <h1 className="font-serif text-5xl text-agora-dark mb-4">Community</h1>
      <p className="text-agora-muted mb-12 max-w-2xl">Connect with a global network of thinkers, students, and educators.</p>
      
      <div className="bg-agora-card border border-agora-border rounded-2xl overflow-hidden shadow-sm relative mb-16">
        <div className="absolute top-6 left-6 z-10 bg-agora-bg/80 backdrop-blur-md p-4 rounded-xl border border-agora-border">
          <div className="text-3xl font-serif font-bold text-agora-dark">4,285</div>
          <div className="text-[10px] uppercase tracking-widest text-agora-accent font-bold">Active Thinkers Online</div>
        </div>
        <canvas ref={canvasRef} className="w-full h-[400px] bg-[#F8F4EE]" style={{ display: 'block' }}></canvas>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div className="bg-agora-card p-6 rounded-xl border border-agora-border shadow-sm">
          <h3 className="font-serif text-2xl text-agora-dark mb-2">Write an Essay</h3>
          <p className="text-sm text-agora-muted mb-6">Share your perspective on arts, humanities, and society.</p>
          <button
            onClick={() => setIsWriteModalOpen(true)}
            className="bg-agora-primary text-agora-bg px-6 py-2.5 rounded-full text-xs font-medium hover:bg-agora-dark transition-colors"
          >
            Start Writing
          </button>
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

      {/* Community Articles Section */}
      <div className="mt-12">
        <h2 className="font-serif text-3xl text-agora-dark mb-8">From the Community</h2>

        {articlesLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="bg-slate-200 animate-pulse rounded-xl h-64"></div>
            ))}
          </div>
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => {
              const articleSlug = article.slug?.current || article._id;
              const imageUrl = getSanityImageUrl(article.coverImage, { width: 400, height: 260 });

              return (
                <Link
                  to={`/article/${articleSlug}`}
                  key={article._id}
                  className="bg-white rounded-xl overflow-hidden border border-agora-border hover:shadow-md transition-shadow group flex flex-col"
                >
                  <div className="relative h-36 w-full overflow-hidden bg-slate-100">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#EAE3D5] flex items-center justify-center text-agora-primary font-serif font-bold text-xl">
                        Agora
                      </div>
                    )}
                    <span className="absolute top-2 left-2 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded backdrop-blur-md bg-black/60 text-white flex items-center gap-1">
                      {article.type === 'video' ? <Play size={10} className="fill-current" /> : <FileText size={10} />}
                      {article.type || 'Article'}
                    </span>
                    {article.readTime && (
                      <span className="absolute bottom-2 right-2 text-[9px] bg-black/70 text-white px-1.5 py-0.5 rounded font-mono">
                        {article.readTime}
                      </span>
                    )}
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-sm font-bold leading-tight text-agora-dark group-hover:text-agora-primary transition-colors line-clamp-2 mb-2">
                        {article.title}
                      </h3>
                      <p className="text-[10px] text-slate-400 line-clamp-1 mb-2">
                        By {article.submitterName || article.author?.name || 'Community Contributor'}
                      </p>
                    </div>

                    {article.tags && article.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t border-slate-100">
                        {article.tags.slice(0, 3).map((tag: string) => (
                          <span
                            key={tag}
                            className="text-[8px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-slate-50 text-slate-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-agora-border rounded-2xl">
            <p className="text-agora-muted">No community essays yet. Be the first to share your perspective!</p>
            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="mt-4 bg-agora-primary text-agora-bg px-6 py-2.5 rounded-full text-xs font-medium hover:bg-agora-dark transition-colors"
            >
              Start Writing
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
