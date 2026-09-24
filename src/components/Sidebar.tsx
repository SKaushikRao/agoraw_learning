import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RecommendedItem } from '../types';
import sculptureHead from '../assets/images/agora_sculpture_head_1784977969717.jpg';
import { sanityFetch } from '../sanity/client';
import { GET_ARTICLES_QUERY } from '../sanity/queries';
import { getSanityImageUrl } from '../sanity/image';

interface SidebarProps {
  aboutTitle?: string;
  aboutText?: string;
  aboutLink?: string;
  topics?: string[];
  recommended?: RecommendedItem[];
  quote?: {
    text: string;
    author: string;
    role?: string;
    image?: string;
  };
}

export default function Sidebar({
  aboutTitle,
  aboutText,
  aboutLink = '/about',
  topics,
  recommended: initialRecommended,
  quote,
}: SidebarProps) {
  const [recommended, setRecommended] = useState<RecommendedItem[]>(initialRecommended || []);

  useEffect(() => {
    if (initialRecommended && initialRecommended.length > 0) {
      setRecommended(initialRecommended);
      return;
    }

    // Fallback: fetch recent published articles from Sanity for global sidebar
    let isMounted = true;
    sanityFetch<any[]>(GET_ARTICLES_QUERY).then((articles) => {
      if (!isMounted || !articles || articles.length === 0) return;
      const mapped: RecommendedItem[] = articles.slice(0, 4).map((a) => ({
        id: a._id,
        slug: a.slug?.current,
        title: a.title,
        author: a.author?.name || 'Agora Contributor',
        readTime: a.readTime || '8 min read',
        imageUrl: getSanityImageUrl(a.coverImage, { width: 200, height: 260 }) || '',
      }));
      setRecommended(mapped);
    });

    return () => {
      isMounted = false;
    };
  }, [initialRecommended]);

  const displayTopics = topics || [
    'Cognitive Psychology',
    'Axiology',
    'Ethics',
    'Behavioral Economics',
    'Metaphysics',
    'Critical Thinking',
  ];

  const displayQuote = quote || {
    text: 'Knowing yourself is the beginning of all wisdom.',
    author: 'Aristotle',
    role: 'Philosopher',
  };

  return (
    <aside className="space-y-8 lg:pl-8">
      {/* About Widget */}
      {aboutText && (
        <div className="bg-agora-card rounded-xl p-5 border border-agora-border shadow-sm">
          <h4 className="text-[10px] uppercase tracking-widest font-bold text-agora-accent mb-4">
            {aboutTitle || 'About Subject'}
          </h4>
          <p className="text-agora-muted text-[11px] leading-relaxed mb-4">
            {aboutText}
          </p>
          <Link
            to={aboutLink}
            className="text-[9px] font-bold text-agora-accent border-b border-agora-accent hover:text-agora-primary hover:border-agora-primary transition-colors inline-block"
          >
            Explore More
          </Link>
        </div>
      )}

      {/* Popular Topics */}
      {displayTopics.length > 0 && (
        <div className="bg-agora-card rounded-xl p-5 border border-agora-border shadow-sm flex flex-col">
          <h4 className="text-[10px] uppercase tracking-widest font-bold text-agora-accent mb-3">Popular Topics</h4>
          <div className="flex flex-wrap gap-2">
            {displayTopics.map((topic) => (
              <Link
                key={topic}
                to={`/articles?tag=${encodeURIComponent(topic)}`}
                className="px-3 py-1 bg-agora-card border border-agora-border rounded-full text-[10px] text-agora-primary hover:bg-agora-bg cursor-pointer transition-colors"
              >
                {topic}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Recommended For You */}
      {recommended.length > 0 && (
        <div className="bg-agora-card rounded-xl p-5 border border-agora-border shadow-sm">
          <h4 className="text-[10px] uppercase tracking-widest font-bold text-agora-accent mb-4">Recommended For You</h4>
          <div className="space-y-4">
            {recommended.map((item) => (
              <Link
                key={item.id}
                to={item.slug ? `/article/${item.slug}` : `/articles`}
                className="flex gap-3 group cursor-pointer"
              >
                <div className="w-12 h-16 rounded-md overflow-hidden shrink-0 shadow-sm border border-agora-border bg-agora-bg">
                  {item.imageUrl ? (
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#EAE3D5] flex items-center justify-center text-[10px] font-serif font-bold text-agora-primary">
                      Agora
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <h5 className="font-serif font-bold text-xs leading-tight group-hover:text-agora-accent transition-colors line-clamp-2">
                    {item.title}
                  </h5>
                  <p className="text-[10px] text-agora-muted mt-1 italic">{item.author}</p>
                  <div className="flex items-center gap-1 text-[9px] text-agora-muted mt-1">
                    <span className="w-1 h-1 rounded-full bg-agora-border"></span>
                    <span>{item.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Quote Widget */}
      {displayQuote?.text && (
        <div className="relative rounded-xl overflow-hidden border border-agora-border shadow-sm bg-agora-card">
          <div className="absolute inset-0 bg-agora-primary/5"></div>
          <img 
            src={displayQuote.image || sculptureHead} 
            alt="Classical philosopher bust" 
            className="absolute right-[-20px] bottom-[-20px] w-24 object-contain opacity-40 mix-blend-multiply"
          />
          <div className="relative p-5 z-10">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-agora-accent mb-2">Daily Insight</h4>
            <p className="font-serif text-sm italic text-agora-dark relative z-10 leading-relaxed mt-2 mb-3">
              "{displayQuote.text}"
            </p>
            <p className="text-[9px] text-agora-muted font-bold tracking-wider uppercase">— {displayQuote.author}</p>
          </div>
        </div>
      )}
      
      {/* Newsletter */}
      <div className="p-5 bg-agora-primary rounded-xl text-agora-bg shadow-sm">
        <p className="text-[10px] uppercase tracking-widest opacity-60 mb-2">Newsletter</p>
        <p className="text-xs mb-4 font-serif italic">Join our thinkers community in our weekly digest.</p>
        <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to Agora!'); }} className="flex">
          <input type="email" placeholder="Your email" required className="bg-white/10 border-none rounded-l-lg p-2 text-xs w-full focus:outline-none placeholder:text-white/40 text-white" />
          <button type="submit" className="bg-agora-accent px-4 rounded-r-lg hover:bg-white/20 transition-colors text-white font-bold">→</button>
        </form>
      </div>
    </aside>
  );
}
