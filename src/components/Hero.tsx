import heroImg from '../assets/images/agora_hero_illustration_1784977953584.jpg';
import { Play, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="relative overflow-hidden border-b border-agora-border bg-agora-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="z-10">
          <h2 className="text-xs uppercase tracking-[0.3em] font-semibold text-agora-accent mb-2">Question. Discover. Write. Connect.</h2>
          <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl text-agora-dark leading-none mb-4">
            Psychology
          </h1>
          <p className="text-lg md:text-xl text-agora-muted mb-10 max-w-lg leading-relaxed">
            Understand the mind, behavior, and emotions. Improve well-being and build meaningful connections.
          </p>
          
          <div className="flex flex-wrap items-center gap-8 mb-12">
            <Link to="/learning-paths" className="bg-agora-primary text-agora-bg px-6 py-2.5 rounded-full text-sm font-medium hover:bg-agora-dark transition-colors inline-block">Explore Learning</Link>
            <Link to="/community" className="border border-agora-primary text-agora-primary px-6 py-2.5 rounded-full text-sm font-medium hover:bg-agora-primary hover:text-agora-bg transition-colors inline-block">Join Community</Link>
          </div>
        </div>
        
        <div className="relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl group">
          <img 
            src={heroImg} 
            alt="Agora Philosophy Illustration" 
            className="w-full h-full object-cover mix-blend-multiply opacity-90 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-agora-primary/20 to-transparent mix-blend-overlay"></div>
          
          {/* Overlay Stats Box */}
          <div className="absolute bottom-4 right-4 grid grid-cols-2 gap-4 bg-agora-card/90 backdrop-blur-md p-4 rounded-xl shadow-sm border border-agora-border">
            <div className="text-center"><div className="text-xl font-serif font-bold text-agora-dark">18+</div><div className="text-[10px] uppercase text-agora-muted tracking-widest">Paths</div></div>
            <div className="text-center"><div className="text-xl font-serif font-bold text-agora-dark">850+</div><div className="text-[10px] uppercase text-agora-muted tracking-widest">Articles</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
