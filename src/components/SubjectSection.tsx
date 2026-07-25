import { Article } from '../types';
import { Play, BookOpen, ChevronRight, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SubjectSectionProps {
  stepNumber: number;
  title: string;
  description: string;
  articles: Article[];
}

export default function SubjectSection({ stepNumber, title, description, articles }: SubjectSectionProps) {
  return (
    <div className="mb-20 relative">
      {/* Vertical connection line for the main layout */}
      <div className="absolute left-[-2rem] top-0 bottom-0 w-[1px] bg-agora-border hidden lg:block"></div>
      
      <div className="flex items-start gap-6 mb-8 relative">
        <div className="hidden lg:flex absolute left-[-3.5rem] top-1 w-12 h-12 rounded-full bg-agora-dark text-agora-bg items-center justify-center font-serif text-xl font-bold shadow-md z-10">
          {stepNumber}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-end mb-2">
            <h2 className="font-serif text-3xl md:text-4xl text-agora-dark">{title}</h2>
            <Link to="/articles" className="flex items-center gap-1 text-sm font-medium text-agora-primary hover:text-agora-accent transition-colors">
              View All (4) <ChevronRight size={16} />
            </Link>
          </div>
          <p className="text-agora-muted">{description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.map((article) => (
          <div key={article.id} className="group cursor-pointer bg-agora-card rounded-xl border border-agora-border shadow-sm p-4 hover:shadow-md transition-shadow">
            <div className="relative h-32 mb-4 overflow-hidden rounded-lg bg-agora-bg flex items-center justify-center">
              <img 
                src={article.imageUrl} 
                alt={article.title} 
                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-agora-dark/40 to-transparent"></div>
              {article.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-agora-bg/90 flex items-center justify-center text-agora-primary shadow-sm backdrop-blur-sm">
                    <Play size={16} className="ml-0.5" />
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex gap-2 mb-2 items-center justify-between">
              <span className="px-2 py-0.5 bg-agora-bg text-[9px] text-agora-accent font-bold uppercase tracking-wider rounded-full border border-agora-border">{article.type === 'video' ? 'Video' : 'Article'}</span>
              <span className="text-[9px] text-agora-muted">{article.readTime}</span>
            </div>
            
            <h4 className="font-serif text-lg leading-tight mb-2 text-agora-dark group-hover:text-agora-accent transition-colors">
              {article.title}
            </h4>
            <p className="text-[10px] text-agora-muted line-clamp-2 mb-3">
              {article.summary}
            </p>
            
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-agora-border">
              <span className="text-[10px] text-agora-muted font-serif italic">{article.author}</span>
              <button className="text-agora-muted hover:text-agora-primary transition-colors">
                <Bookmark size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
