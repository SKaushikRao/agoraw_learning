import { Search, Bookmark, User, Moon, LogIn } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-agora-bg/90 backdrop-blur-md border-b border-agora-border py-4 px-6 md:px-12 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-agora-primary flex items-center justify-center text-agora-bg font-serif text-xl font-bold">
          A
        </div>
        <span className="font-serif text-2xl font-bold text-agora-dark tracking-wide">Agora</span>
      </Link>

      <div className="hidden lg:flex items-center gap-6 text-sm font-medium uppercase tracking-wider text-agora-muted">
        <NavLink to="/" className={({isActive}) => isActive ? "text-agora-primary hover:text-agora-accent transition-colors" : "hover:text-agora-accent transition-colors"}>Home</NavLink>
        <NavLink to="/subjects" className={({isActive}) => isActive ? "text-agora-primary hover:text-agora-accent transition-colors" : "hover:text-agora-accent transition-colors"}>Subjects</NavLink>
        <NavLink to="/learning-paths" className={({isActive}) => isActive ? "text-agora-primary hover:text-agora-accent transition-colors" : "hover:text-agora-accent transition-colors"}>Learning Paths</NavLink>
        <NavLink to="/articles" className={({isActive}) => isActive ? "text-agora-primary hover:text-agora-accent transition-colors" : "hover:text-agora-accent transition-colors"}>Articles</NavLink>
        <NavLink to="/community" className={({isActive}) => isActive ? "text-agora-primary hover:text-agora-accent transition-colors" : "hover:text-agora-accent transition-colors"}>Community</NavLink>
        <NavLink to="/about" className={({isActive}) => isActive ? "text-agora-primary hover:text-agora-accent transition-colors" : "hover:text-agora-accent transition-colors"}>About</NavLink>
      </div>

      <div className="flex items-center gap-4 text-agora-dark">
        <button className="p-2 hover:bg-agora-border/50 rounded-full transition-colors">
          <Search size={20} />
        </button>
        <button className="hidden md:block p-2 hover:bg-agora-border/50 rounded-full transition-colors">
          <Bookmark size={20} />
        </button>
        <button className="hidden md:block p-2 hover:bg-agora-border/50 rounded-full transition-colors">
          <Moon size={20} />
        </button>
        <button className="hidden md:block p-2 hover:bg-agora-border/50 rounded-full transition-colors">
          <User size={20} />
        </button>
        <button className="flex items-center gap-2 bg-agora-primary text-agora-bg px-4 py-2 rounded-full font-medium hover:bg-agora-dark transition-colors">
          <span className="hidden sm:inline">Sign In</span>
          <LogIn size={18} className="sm:hidden" />
        </button>
      </div>
    </nav>
  );
}
