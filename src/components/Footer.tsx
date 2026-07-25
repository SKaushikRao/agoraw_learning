import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-agora-bg text-agora-dark border-t border-agora-border py-16 px-6 md:px-12 mt-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <span className="font-serif text-2xl font-bold tracking-tight text-agora-primary">Agora</span>
          </div>
          <p className="text-agora-muted text-xs leading-relaxed mb-6">
            Question. Discover. Write. Connect. A collaborative space where disciplines meet to inspire lifelong learning.
          </p>
          <div className="flex gap-4">
            {/* Social Icons Placeholder */}
            <div className="w-8 h-8 rounded-full border border-agora-border flex items-center justify-center text-agora-muted hover:bg-agora-card hover:text-agora-primary cursor-pointer transition-colors text-xs font-bold">in</div>
            <div className="w-8 h-8 rounded-full border border-agora-border flex items-center justify-center text-agora-muted hover:bg-agora-card hover:text-agora-primary cursor-pointer transition-colors text-xs font-bold">tw</div>
            <div className="w-8 h-8 rounded-full border border-agora-border flex items-center justify-center text-agora-muted hover:bg-agora-card hover:text-agora-primary cursor-pointer transition-colors text-xs font-bold">ig</div>
          </div>
        </div>

        <div>
          <h4 className="text-[10px] uppercase tracking-widest font-bold text-agora-accent mb-6">Explore</h4>
          <ul className="space-y-3 text-agora-muted text-[11px] uppercase tracking-wider font-medium">
            <li><Link to="/" className="hover:text-agora-primary transition-colors">Home</Link></li>
            <li><Link to="/subjects" className="hover:text-agora-primary transition-colors">Subjects</Link></li>
            <li><Link to="/learning-paths" className="hover:text-agora-primary transition-colors">Learning Paths</Link></li>
            <li><Link to="/articles" className="hover:text-agora-primary transition-colors">Articles & Blogs</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] uppercase tracking-widest font-bold text-agora-accent mb-6">Community</h4>
          <ul className="space-y-3 text-agora-muted text-[11px] uppercase tracking-wider font-medium">
            <li><Link to="/community" className="hover:text-agora-primary transition-colors">Write an Essay</Link></li>
            <li><Link to="/community" className="hover:text-agora-primary transition-colors">Discussion Forums</Link></li>
            <li><Link to="/about" className="hover:text-agora-primary transition-colors">Upcoming Events</Link></li>
            <li><Link to="/about" className="hover:text-agora-primary transition-colors">Guidelines</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] uppercase tracking-widest font-bold text-agora-accent mb-6">Stay Inspired</h4>
          <p className="text-agora-muted text-[11px] mb-4">Get updates on new resources, articles, and events.</p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-agora-card border border-agora-border text-agora-dark px-4 py-2 rounded-l-md focus:outline-none focus:border-agora-accent w-full text-xs"
            />
            <button className="bg-agora-primary text-agora-bg px-4 py-2 rounded-r-md font-medium text-xs hover:bg-agora-dark transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-agora-border text-[10px] uppercase tracking-widest text-agora-muted flex flex-col md:flex-row justify-between items-center font-medium">
        <p>© 2026 Agora — Collaborative Learning Collective</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-agora-primary transition-colors">Privacy</a>
          <a href="#" className="hover:text-agora-primary transition-colors">Terms</a>
          <a href="#" className="hover:text-agora-primary transition-colors">Ethics</a>
        </div>
        <div className="hidden lg:block text-agora-accent">Built for the Arts & Humanities</div>
      </div>
    </footer>
  );
}
