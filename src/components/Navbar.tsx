import React, { useState } from 'react';
import { Search, Bookmark, Moon, X } from 'lucide-react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [navSearch, setNavSearch] = useState('');

  const isSubjectPage = path.startsWith('/subject/');
  const isArticlePage = path.startsWith('/article/');

  // Dynamic theme styling
  const navStyles = isSubjectPage 
    ? {
        navClass: 'bg-[#25344F] border-b border-[#2F4162] text-white',
        logoCircle: 'bg-white text-[#25344F]',
        logoText: 'text-white',
        links: 'text-[#C5D1E6] hover:text-white',
        activeLink: 'text-white border-b-2 border-white pb-1 font-bold',
        buttonClass: 'bg-white text-[#25344F] hover:bg-slate-100',
        iconHover: 'hover:bg-white/10 text-white'
      }
    : {
        navClass: 'bg-agora-bg/90 border-b border-agora-border text-agora-dark',
        logoCircle: 'bg-agora-primary text-agora-bg',
        logoText: 'text-agora-dark',
        links: 'text-agora-muted hover:text-agora-accent',
        activeLink: 'text-agora-primary font-bold',
        buttonClass: 'bg-agora-primary text-agora-bg hover:bg-agora-dark',
        iconHover: 'hover:bg-agora-border/50 text-agora-dark'
      };

  const handleNavSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (navSearch.trim()) {
      navigate(`/articles?q=${encodeURIComponent(navSearch.trim())}`);
      setIsSearchOpen(false);
      setNavSearch('');
    }
  };

  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-md py-4 px-6 md:px-12 flex items-center justify-between transition-colors duration-300 ${navStyles.navClass}`}>
      <Link to="/" className="flex items-center gap-2">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-serif text-xl font-bold transition-colors ${navStyles.logoCircle}`}>
          A
        </div>
        <span className={`font-serif text-2xl font-bold tracking-wide transition-colors ${navStyles.logoText}`}>Agora</span>
      </Link>

      <div className="hidden lg:flex items-center gap-6 text-sm font-medium uppercase tracking-wider">
        <NavLink 
          to="/" 
          className={({isActive}) => isActive ? navStyles.activeLink : `${navStyles.links} transition-colors`}
        >
          Home
        </NavLink>
        <NavLink 
          to="/subjects" 
          className={({isActive}) => isActive ? navStyles.activeLink : `${navStyles.links} transition-colors`}
        >
          Subjects
        </NavLink>
        <NavLink 
          to="/learning-paths" 
          className={({isActive}) => isActive ? navStyles.activeLink : `${navStyles.links} transition-colors`}
        >
          Learning Paths
        </NavLink>
        <NavLink 
          to="/articles" 
          className={({isActive}) => isActive ? navStyles.activeLink : `${navStyles.links} transition-colors`}
        >
          Articles
        </NavLink>
        <NavLink 
          to="/community" 
          className={({isActive}) => isActive ? navStyles.activeLink : `${navStyles.links} transition-colors`}
        >
          Community
        </NavLink>
        <NavLink 
          to="/about" 
          className={({isActive}) => isActive ? navStyles.activeLink : `${navStyles.links} transition-colors`}
        >
          About
        </NavLink>
      </div>

      <div className="flex items-center gap-3">
        {isSearchOpen ? (
          <form onSubmit={handleNavSearch} className="relative flex items-center">
            <input
              type="text"
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
              placeholder="Search..."
              autoFocus
              className="bg-white/10 border border-white/20 rounded-full pl-3 pr-8 py-1.5 text-xs text-inherit placeholder:opacity-60 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="absolute right-2 text-inherit opacity-70 hover:opacity-100"
            >
              <X size={14} />
            </button>
          </form>
        ) : (
          <button 
            onClick={() => setIsSearchOpen(true)} 
            className={`p-2 rounded-full transition-colors ${navStyles.iconHover}`}
            title="Search"
          >
            <Search size={20} />
          </button>
        )}

        <button 
          onClick={() => alert('Saved bookmarks feature is enabled in Agora.')}
          className={`hidden md:block p-2 rounded-full transition-colors ${navStyles.iconHover}`}
          title="Bookmarks"
        >
          <Bookmark size={20} />
        </button>
        <button 
          className={`hidden md:block p-2 rounded-full transition-colors ${navStyles.iconHover}`}
          title="Toggle Theme"
        >
          <Moon size={20} />
        </button>
      </div>
    </nav>
  );
}
