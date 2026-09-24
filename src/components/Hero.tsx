import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import statueImg from '../assets/images/agora_sculpture_head_1784977969717.jpg';
import { Search } from 'lucide-react';

interface HeroProps {
  headline?: string;
  subheadline?: string;
  heroImageUrl?: string;
  heroImageAlt?: string;
}

export default function Hero({
  headline = 'Explore \nArts & Humanities.',
  subheadline = 'What would you like to learn today?',
  heroImageUrl,
  heroImageAlt = 'Christ Academic Institute Greek Sculpture',
}: HeroProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/articles?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const imageSrc = heroImageUrl || statueImg;

  return (
    <div className="relative overflow-hidden border-b border-agora-border bg-[#F8F4EE]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Content Side */}
        <div className="lg:col-span-7 space-y-6 z-10">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-agora-dark tracking-tight leading-[1.1] font-bold whitespace-pre-line">
            {headline}
          </h1>
          <p className="text-xl md:text-2xl text-agora-dark/80 font-serif italic">
            {subheadline}
          </p>
          
          {/* Search bar */}
          <form onSubmit={handleSearch} className="relative max-w-xl flex items-center bg-white rounded-lg shadow-md border border-agora-border overflow-hidden p-1.5 mt-8">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search subjects, topics, articles, or resources..." 
              className="w-full pl-4 pr-12 py-3 bg-transparent text-sm focus:outline-none text-agora-dark placeholder-slate-400"
            />
            <button 
              type="submit"
              className="bg-[#3A2415] hover:bg-[#5C3B22] text-white p-3 rounded-md transition-colors flex items-center justify-center cursor-pointer"
            >
              <Search size={18} />
            </button>
          </form>
        </div>
        
        {/* Right Sculpture Side */}
        <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#EAE3D5]">
            <img 
              src={imageSrc} 
              alt={heroImageAlt} 
              className="w-full h-full object-cover grayscale-[15%] sepia-[15%] contrast-[105%] hover:scale-105 transition-transform duration-700"
            />
            {/* Soft shadow vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
          </div>
          
          {/* Decorative subtle leaves backdrop */}
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-gradient-to-tr from-agora-accent/10 to-transparent rounded-full blur-2xl -z-10"></div>
        </div>

      </div>
    </div>
  );
}
