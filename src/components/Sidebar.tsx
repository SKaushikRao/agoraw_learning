import { POPULAR_TOPICS, RECOMMENDED } from '../data';
import sculptureHead from '../assets/images/agora_sculpture_head_1784977969717.jpg';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="space-y-8 lg:pl-8">
      {/* About Widget */}
      <div className="bg-agora-card rounded-xl p-5 border border-agora-border shadow-sm">
        <h4 className="text-[10px] uppercase tracking-widest font-bold text-agora-accent mb-4">About Psychology</h4>
        <p className="text-agora-muted text-[11px] leading-relaxed mb-4">
          Psychology is the scientific study of mind and behavior. It helps us understand ourselves and others, improve mental well-being, and create healthier relationships and communities.
        </p>
        <Link to="/about" className="text-[9px] font-bold text-agora-accent border-b border-agora-accent hover:text-agora-primary hover:border-agora-primary transition-colors inline-block">
          Explore More
        </Link>
      </div>

      {/* Popular Topics */}
      <div className="bg-agora-card rounded-xl p-5 border border-agora-border shadow-sm flex flex-col">
        <h4 className="text-[10px] uppercase tracking-widest font-bold text-agora-accent mb-3">Popular Topics</h4>
        <div className="flex flex-wrap gap-2">
          {POPULAR_TOPICS.map((topic) => (
            <span key={topic} className="px-3 py-1 bg-agora-card border border-agora-border rounded-full text-[10px] text-agora-primary hover:bg-agora-bg cursor-pointer transition-colors">
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Recommended For You */}
      <div className="bg-agora-card rounded-xl p-5 border border-agora-border shadow-sm">
        <h4 className="text-[10px] uppercase tracking-widest font-bold text-agora-accent mb-4">Recommended For You</h4>
        <div className="space-y-4">
          {RECOMMENDED.map((item) => (
            <div key={item.id} className="flex gap-3 group cursor-pointer">
              <div className="w-12 h-16 rounded-md overflow-hidden shrink-0 shadow-sm border border-agora-border bg-agora-bg">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h5 className="font-serif font-bold text-xs leading-tight group-hover:text-agora-accent transition-colors">
                  {item.title}
                </h5>
                <p className="text-[10px] text-agora-muted mt-1 italic">{item.author}</p>
                <div className="flex items-center gap-1 text-[9px] text-agora-muted mt-1">
                  <span className="w-1 h-1 rounded-full bg-agora-border"></span>
                  <span>{item.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quote Widget */}
      <div className="relative rounded-xl overflow-hidden border border-agora-border shadow-sm bg-agora-card">
        <div className="absolute inset-0 bg-agora-primary/5"></div>
        <img 
          src={sculptureHead} 
          alt="Classical philosopher bust" 
          className="absolute right-[-20px] bottom-[-20px] w-24 object-contain opacity-40 mix-blend-multiply"
        />
        <div className="relative p-5 z-10">
          <h4 className="text-[10px] uppercase tracking-widest font-bold text-agora-accent mb-2">Daily Insight</h4>
          <p className="font-serif text-sm italic text-agora-dark relative z-10 leading-relaxed mt-2 mb-3">
            "Knowing yourself is the beginning of all wisdom."
          </p>
          <p className="text-[9px] text-agora-muted font-bold tracking-wider uppercase">— Aristotle</p>
        </div>
      </div>
      
      {/* Newsletter */}
      <div className="p-5 bg-agora-primary rounded-xl text-agora-bg shadow-sm">
        <p className="text-[10px] uppercase tracking-widest opacity-60 mb-2">Newsletter</p>
        <p className="text-xs mb-4 font-serif italic">Join 4,000+ thinkers in our weekly digest.</p>
        <div className="flex">
          <input type="email" placeholder="Your email" className="bg-white/10 border-none rounded-l-lg p-2 text-xs w-full focus:outline-none placeholder:text-white/40" />
          <button className="bg-agora-accent px-4 rounded-r-lg hover:bg-white/20 transition-colors">→</button>
        </div>
      </div>
    </aside>
  );
}
