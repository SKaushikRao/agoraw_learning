import { Search, Bookmark, User, Moon, LogIn } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const path = location.pathname;

  const isSpaceCadet = path === '/subject/psychology' || path === '/subject/philosophy';
  const isWarmBrown = path === '/subject/liberal-arts' || path === '/subject/economics';

  // Dynamic theme styling
  const navStyles = isSpaceCadet 
    ? {
        navClass: 'bg-[#25344F] border-b border-[#2F4162] text-white',
        logoCircle: 'bg-white text-[#25344F]',
        logoText: 'text-white',
        links: 'text-[#C5D1E6] hover:text-white',
        activeLink: 'text-white border-b-2 border-white pb-1 font-bold',
        buttonClass: 'bg-white text-[#25344F] hover:bg-slate-100',
        iconHover: 'hover:bg-white/10'
      }
    : isWarmBrown
    ? {
        navClass: 'bg-[#5C3B22] border-b border-[#754E31] text-white',
        logoCircle: 'bg-[#FFFDF9] text-[#5C3B22]',
        logoText: 'text-white',
        links: 'text-[#DFD0C0] hover:text-white',
        activeLink: 'text-white border-b-2 border-white pb-1 font-bold',
        buttonClass: 'bg-[#FFFDF9] text-[#5C3B22] hover:bg-slate-100',
        iconHover: 'hover:bg-white/10'
      }
    : {
        navClass: 'bg-agora-bg/90 border-b border-agora-border text-agora-dark',
        logoCircle: 'bg-agora-primary text-agora-bg',
        logoText: 'text-agora-dark',
        links: 'text-agora-muted hover:text-agora-accent',
        activeLink: 'text-agora-primary font-bold',
        buttonClass: 'bg-agora-primary text-agora-bg hover:bg-agora-dark',
        iconHover: 'hover:bg-agora-border/50'
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

      <div className="flex items-center gap-4">
        <button className={`p-2 rounded-full transition-colors ${navStyles.iconHover}`}>
          <Search size={20} />
        </button>
        <button className={`hidden md:block p-2 rounded-full transition-colors ${navStyles.iconHover}`}>
          <Bookmark size={20} />
        </button>
        <button className={`hidden md:block p-2 rounded-full transition-colors ${navStyles.iconHover}`}>
          <Moon size={20} />
        </button>
        <button className={`hidden md:block p-2 rounded-full transition-colors ${navStyles.iconHover}`}>
          <User size={20} />
        </button>
        <button className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors ${navStyles.buttonClass}`}>
          <span className="hidden sm:inline">Sign In</span>
          <LogIn size={18} className="sm:hidden" />
        </button>
      </div>
    </nav>
  );
}
