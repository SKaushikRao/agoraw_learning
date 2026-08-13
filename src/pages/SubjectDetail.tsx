import { useParams, Link } from 'react-router-dom';
import { SUBJECTS_DATA } from '../data';
import { Play, FileText, BookOpen, Search, Bookmark, Moon, User, ArrowRight, Brain, Milestone, Landmark } from 'lucide-react';
import { useState } from 'react';

export default function SubjectDetail() {
  const { id = 'psychology' } = useParams<{ id: string }>();
  const subject = SUBJECTS_DATA[id] || SUBJECTS_DATA.psychology;
  const [activeStep, setActiveStep] = useState<number>(1);

  const isPsychology = id === 'psychology';
  const isPhilosophy = id === 'philosophy';
  const useSpaceCadet = isPsychology || isPhilosophy;
  
  // Custom dynamic theme styles based on space cadet hex: 25344F
  const themeClass = useSpaceCadet 
    ? {
        bg: 'bg-[#F2F5FA]',
        cardBg: 'bg-white',
        border: 'border-[#D9E1EC]',
        textDark: 'text-[#1E293B]',
        textMuted: 'text-[#64748B]',
        primary: 'bg-[#25344F]',
        primaryText: 'text-[#25344F]',
        primaryBorder: 'border-[#25344F]',
        accent: 'text-[#3B82F6]',
        accentBg: 'bg-[#3B82F6]/10',
        heroBg: 'bg-gradient-to-r from-[#25344F] via-[#2F4162] to-[#25344F]',
        heroText: 'text-white',
        heroMuted: 'text-[#C5D1E6]',
        badgeBg: 'bg-[#E2E8F0]',
        badgeText: 'text-[#334155]',
        hoverBg: 'hover:bg-[#25344F]/5',
        buttonHover: 'hover:bg-[#1C283F]',
      }
    : {
        bg: 'bg-[#F8F4EE]',
        cardBg: 'bg-[#FFFDF9]',
        border: 'border-[#E6DDD2]',
        textDark: 'text-[#3A2415]',
        textMuted: 'text-[#6E6A65]',
        primary: 'bg-[#5C3B22]',
        primaryText: 'text-[#5C3B22]',
        primaryBorder: 'border-[#5C3B22]',
        accent: 'text-[#B78B4A]',
        accentBg: 'bg-[#B78B4A]/10',
        heroBg: 'bg-gradient-to-r from-[#5C3B22] via-[#754E31] to-[#5C3B22]',
        heroText: 'text-white',
        heroMuted: 'text-[#DFD0C0]',
        badgeBg: 'bg-[#E6DDD2]/50',
        badgeText: 'text-[#5C3B22]',
        hoverBg: 'hover:bg-[#5C3B22]/5',
        buttonHover: 'hover:bg-[#3A2415]',
      };

  return (
    <div className={`min-h-screen ${themeClass.bg} transition-colors duration-300`}>
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Main Content (8 Columns) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Header Banner Card */}
            <div className={`relative overflow-hidden rounded-3xl ${themeClass.heroBg} p-8 md:p-12 shadow-lg text-white flex flex-col md:flex-row justify-between items-center gap-6`}>
              <div className="space-y-4 max-w-lg z-10">
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  {subject.name}
                </h1>
                <p className={`text-sm md:text-base leading-relaxed ${themeClass.heroMuted}`}>
                  {subject.subtitle}
                </p>
                
                {/* Stats Panel */}
                <div className="grid grid-cols-4 gap-4 pt-6 border-t border-white/10 mt-6">
                  <div>
                    <div className="text-xl md:text-2xl font-serif font-bold">{subject.stats.paths}</div>
                    <div className="text-[9px] uppercase tracking-widest text-white/70">Guided Paths</div>
                  </div>
                  <div>
                    <div className="text-xl md:text-2xl font-serif font-bold">{subject.stats.resources}</div>
                    <div className="text-[9px] uppercase tracking-widest text-white/70">Resources</div>
                  </div>
                  <div>
                    <div className="text-xl md:text-2xl font-serif font-bold">{subject.stats.articles}</div>
                    <div className="text-[9px] uppercase tracking-widest text-white/70">Articles</div>
                  </div>
                  <div>
                    <div className="text-xl md:text-2xl font-serif font-bold">{subject.stats.videos}</div>
                    <div className="text-[9px] uppercase tracking-widest text-white/70">Videos</div>
                  </div>
                </div>
              </div>
              
              {/* Illustration Placeholder/Image */}
              <div className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center bg-white/5 backdrop-blur-sm rounded-full border border-white/10 z-10 shrink-0">
                {isPsychology ? (
                  <div className="text-center space-y-2">
                    <Brain className="w-24 h-24 text-white/80 animate-pulse" />
                    <span className="text-[10px] uppercase tracking-widest text-white/50 block font-semibold">Mind & Brain</span>
                  </div>
                ) : (
                  <div className="text-center space-y-2">
                    <Landmark className="w-24 h-24 text-white/80" />
                    <span className="text-[10px] uppercase tracking-widest text-white/50 block font-semibold">Humanities</span>
                  </div>
                )}
              </div>
              
              {/* background graphic shapes */}
              <div className="absolute right-0 top-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -z-0"></div>
            </div>

            {/* Guided Learning Path Steps Horizontal Bar */}
            <div className={`${themeClass.cardBg} rounded-2xl p-6 border ${themeClass.border} shadow-sm`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className={`font-serif text-lg font-bold ${themeClass.textDark}`}>Your Guided Learning Path</h3>
                  <p className={`text-xs ${themeClass.textMuted}`}>Start from the basics and build your understanding step by step.</p>
                </div>
                <button className={`text-xs font-semibold uppercase tracking-wider ${themeClass.primaryText} hover:underline flex items-center gap-1`}>
                  View Full Path <ArrowRight size={14} />
                </button>
              </div>

              {/* Steps timeline horizontal representation */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-100">
                {subject.learningSteps.map((step, idx) => (
                  <div 
                    key={step.id} 
                    onClick={() => setActiveStep(step.id)}
                    className="flex-1 w-full"
                  >
                    <div className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 
                        ${activeStep === step.id 
                          ? `${themeClass.primary} text-white scale-110 shadow-sm` 
                          : `bg-slate-100 text-slate-500 group-hover:bg-slate-200`
                        }`}
                      >
                        {step.id}
                      </div>
                      <div className="flex-1 text-left">
                        <div className={`text-xs font-bold leading-none ${activeStep === step.id ? themeClass.primaryText : 'text-slate-600'}`}>
                          {step.title}
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium block mt-1 line-clamp-1">{step.description}</span>
                      </div>
                      {idx < subject.learningSteps.length - 1 && (
                        <div className="hidden md:block w-4 h-0.5 bg-slate-200 mx-2"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Sections (Row of Cards per Step) */}
            <div className="space-y-8">
              {subject.learningSteps.map((step) => (
                <div 
                  key={step.id} 
                  className={`transition-all duration-300 ${activeStep === step.id ? 'opacity-100 scale-100' : 'opacity-70'}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${themeClass.primary} text-white flex items-center justify-center text-xs font-bold font-serif`}>
                        {step.id}
                      </div>
                      <div>
                        <h4 className={`font-serif text-lg font-bold ${themeClass.textDark}`}>{step.title}</h4>
                        <p className={`text-xs ${themeClass.textMuted}`}>{step.description}</p>
                      </div>
                    </div>
                    <button className={`text-xs font-semibold ${themeClass.textMuted} hover:text-black flex items-center gap-1`}>
                      View All ({step.articles.length}) <ArrowRight size={14} />
                    </button>
                  </div>

                  {/* Horizontal row/grid of 4 cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {step.articles.map((article) => (
                      <div 
                        key={article.id}
                        className={`${themeClass.cardBg} rounded-xl overflow-hidden border ${themeClass.border} hover:shadow-md transition-shadow group flex flex-col`}
                      >
                        {/* Image banner */}
                        <div className="relative h-32 w-full overflow-hidden bg-slate-100">
                          <img 
                            src={article.imageUrl} 
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          />
                          <span className={`absolute top-2 left-2 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded backdrop-blur-md bg-black/60 text-white flex items-center gap-1`}>
                            {article.type === 'video' ? <Play size={10} className="fill-current" /> : <FileText size={10} />}
                            {article.type}
                          </span>
                          <span className="absolute bottom-2 right-2 text-[9px] bg-black/70 text-white px-1.5 py-0.5 rounded font-mono">
                            {article.readTime}
                          </span>
                        </div>

                        {/* Details */}
                        <div className="p-3 flex-1 flex flex-col justify-between">
                          <div>
                            <h5 className={`font-serif text-xs font-bold leading-tight ${themeClass.textDark} group-hover:${themeClass.primaryText} transition-colors line-clamp-2 mb-1`}>
                              {article.title}
                            </h5>
                            <p className="text-[10px] text-slate-400 line-clamp-1 mb-2">By {article.author}</p>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t border-slate-100">
                            {article.tags.map(tag => (
                              <span key={tag} className={`text-[8px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-slate-50 text-slate-500`}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT: Sidebar (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* About Subject Card */}
            <div className={`${themeClass.cardBg} rounded-2xl p-6 border ${themeClass.border} shadow-sm space-y-4`}>
              <div className="flex items-center justify-between border-b pb-3 border-slate-100">
                <h3 className={`font-serif text-base font-bold ${themeClass.textDark}`}>About {subject.name}</h3>
                {isPsychology ? (
                  <Brain className={`w-6 h-6 ${themeClass.primaryText}`} />
                ) : (
                  <Landmark className={`w-6 h-6 ${themeClass.primaryText}`} />
                )}
              </div>
              <p className={`text-xs leading-relaxed text-slate-600`}>
                {subject.aboutText}
              </p>
              <button className={`w-full py-2.5 rounded-xl text-xs font-semibold text-white ${themeClass.primary} ${themeClass.buttonHover} transition-colors shadow-sm`}>
                Explore More
              </button>
            </div>

            {/* Popular Topics Card */}
            <div className={`${themeClass.cardBg} rounded-2xl p-6 border ${themeClass.border} shadow-sm space-y-4`}>
              <h3 className={`font-serif text-base font-bold ${themeClass.textDark} border-b pb-3 border-slate-100`}>Popular Topics</h3>
              <div className="flex flex-wrap gap-2">
                {subject.topics.map(topic => (
                  <button 
                    key={topic}
                    className={`text-xs px-3 py-1.5 rounded-full border border-slate-200 ${themeClass.cardBg} ${themeClass.textDark} hover:border-slate-400 transition-all font-medium`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Recommended For You Card */}
            <div className={`${themeClass.cardBg} rounded-2xl p-6 border ${themeClass.border} shadow-sm space-y-4`}>
              <h3 className={`font-serif text-base font-bold ${themeClass.textDark} border-b pb-3 border-slate-100`}>Recommended For You</h3>
              <div className="space-y-3">
                {subject.recommended.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center group cursor-pointer">
                    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-100 border border-slate-100">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-serif text-xs font-bold leading-tight ${themeClass.textDark} group-hover:${themeClass.primaryText} transition-colors`}>{item.title}</h4>
                      <div className="flex items-center justify-between mt-1 text-[10px] text-slate-400">
                        <span>{item.author}</span>
                        <span>{item.readTime}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote Card */}
            <div className={`rounded-2xl p-6 border ${themeClass.border} shadow-sm flex flex-col justify-between h-48 relative overflow-hidden bg-gradient-to-tr from-[#FFFDF9] to-[#FFF8EE]`}>
              <div className="absolute right-2 bottom-0 opacity-15">
                <Landmark className="w-32 h-32" />
              </div>
              <div className="z-10">
                <span className="text-3xl font-serif text-slate-300 block -mb-2">“</span>
                <p className={`font-serif text-sm italic leading-relaxed text-slate-700`}>
                  {subject.quote.text}
                </p>
              </div>
              <div className="flex items-center gap-3 z-10">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 bg-slate-100">
                  <img src={subject.quote.image} alt={subject.quote.author} className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className={`text-xs font-bold block ${themeClass.textDark}`}>— {subject.quote.author}</span>
                  <span className="text-[9px] uppercase tracking-wider text-slate-400">Philosopher</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
