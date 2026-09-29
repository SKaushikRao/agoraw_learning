import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, FileText, ArrowRight, Brain, Landmark, BookOpen, TrendingUp, HelpCircle } from 'lucide-react';
import { sanityFetch } from '../sanity/client';
import { GET_SUBJECT_BY_SLUG_QUERY, GET_ARTICLES_BY_SUBJECT_QUERY } from '../sanity/queries';
import { SanitySubject, SanityArticle } from '../sanity/types';
import { getSanityImageUrl } from '../sanity/image';
import EmptyState from '../components/EmptyState';
import { PageLoading } from '../components/LoadingSkeleton';

function getThemeStyles(colorTheme?: string) {
  if (colorTheme === 'warm-brown') {
    return {
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
  }

  // Default: Space Cadet theme
  return {
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
  };
}

function renderSubjectHeroIcon(iconType?: string) {
  switch (iconType) {
    case 'brain':
      return (
        <div className="text-center space-y-2">
          <Brain className="w-24 h-24 text-white/80 animate-pulse" />
          <span className="text-[10px] uppercase tracking-widest text-white/50 block font-semibold">Mind & Brain</span>
        </div>
      );
    case 'trending':
      return (
        <div className="text-center space-y-2">
          <TrendingUp className="w-24 h-24 text-white/80" />
          <span className="text-[10px] uppercase tracking-widest text-white/50 block font-semibold">Markets & Wealth</span>
        </div>
      );
    case 'book':
      return (
        <div className="text-center space-y-2">
          <BookOpen className="w-24 h-24 text-white/80" />
          <span className="text-[10px] uppercase tracking-widest text-white/50 block font-semibold">Humanities</span>
        </div>
      );
    case 'landmark':
    default:
      return (
        <div className="text-center space-y-2">
          <Landmark className="w-24 h-24 text-white/80" />
          <span className="text-[10px] uppercase tracking-widest text-white/50 block font-semibold">Discipline</span>
        </div>
      );
  }
}

export default function SubjectDetail() {
  const { id = '' } = useParams<{ id: string }>();
  const [subject, setSubject] = useState<SanitySubject | null>(null);
  const [articles, setArticles] = useState<SanityArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState<number>(1);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    Promise.all([
      sanityFetch<SanitySubject>(GET_SUBJECT_BY_SLUG_QUERY, { slug: id }),
      sanityFetch<SanityArticle[]>(GET_ARTICLES_BY_SUBJECT_QUERY, { slug: id })
    ])
      .then(([subjectData, articlesData]) => {
        if (isMounted) {
          setSubject(subjectData);
          setArticles(articlesData || []);
          if (subjectData?.learningSteps && subjectData.learningSteps.length > 0) {
            setActiveStep(subjectData.learningSteps[0].stepNumber || 1);
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load subject from Sanity:', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return <PageLoading />;
  }

  if (!subject) {
    return (
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <EmptyState
          icon={<HelpCircle className="w-8 h-8 text-[#5C3B22]" />}
          title="Subject Not Found"
          message={`We could not find a published subject matching "${id}". It may have been unpublished or renamed in the Admin Dashboard.`}
          actionText="View All Subjects"
          actionLink="/subjects"
        />
      </div>
    );
  }

  const themeClass = getThemeStyles(subject.colorTheme);
  const steps = subject.learningSteps || [];
  const recommendedItems = subject.recommended || [];
  const topics = subject.topics || [];

  return (
    <div className={`min-h-screen ${themeClass.bg} transition-colors duration-300`}>
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Main Content (8 Columns) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Header Banner Card */}
            <div className={`relative overflow-hidden rounded-3xl p-8 md:p-12 shadow-lg text-white flex flex-col md:flex-row justify-between items-center gap-6`}>
              {/* Background Image or Gradient Fallback */}
              {subject.bannerImage ? (
                <>
                  <img
                    src={getSanityImageUrl(subject.bannerImage, { width: 1200, height: 600 })}
                    alt={subject.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
                </>
              ) : (
                <div className={`absolute inset-0 ${themeClass.heroBg}`}></div>
              )}
              
              <div className="space-y-4 max-w-lg z-10">
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  {subject.title}
                </h1>
                {subject.subtitle && (
                  <p className={`text-sm md:text-base leading-relaxed ${themeClass.heroMuted}`}>
                    {subject.subtitle}
                  </p>
                )}
                
                {/* Stats Panel */}
                {subject.stats && (
                  <div className="grid grid-cols-4 gap-4 pt-6 border-t border-white/10 mt-6">
                    <div>
                      <div className="text-xl md:text-2xl font-serif font-bold">{subject.stats.paths || `${steps.length}`}</div>
                      <div className="text-[9px] uppercase tracking-widest text-white/70">Guided Paths</div>
                    </div>
                    <div>
                      <div className="text-xl md:text-2xl font-serif font-bold">{subject.stats.resources || '10+'}</div>
                      <div className="text-[9px] uppercase tracking-widest text-white/70">Resources</div>
                    </div>
                    <div>
                      <div className="text-xl md:text-2xl font-serif font-bold">{subject.stats.articles || '10+'}</div>
                      <div className="text-[9px] uppercase tracking-widest text-white/70">Articles</div>
                    </div>
                    <div>
                      <div className="text-xl md:text-2xl font-serif font-bold">{subject.stats.videos || '5+'}</div>
                      <div className="text-[9px] uppercase tracking-widest text-white/70">Videos</div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Illustration Placeholder/Image - only show if no banner image */}
              {!subject.bannerImage && (
                <div className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center bg-white/5 backdrop-blur-sm rounded-full border border-white/10 z-10 shrink-0">
                  {renderSubjectHeroIcon(subject.iconType)}
                </div>
              )}
              
              {/* background graphic shapes - only show if no banner image */}
              {!subject.bannerImage && (
                <div className="absolute right-0 top-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -z-0"></div>
              )}
            </div>

            {/* Guided Learning Path Steps Horizontal Bar */}
            {steps.length > 0 && (
              <div className={`${themeClass.cardBg} rounded-2xl p-6 border ${themeClass.border} shadow-sm`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className={`font-serif text-lg font-bold ${themeClass.textDark}`}>Your Guided Learning Path</h3>
                    <p className={`text-xs ${themeClass.textMuted}`}>Start from the basics and build your understanding step by step.</p>
                  </div>
                  <Link
                    to="/learning-paths"
                    className={`text-xs font-semibold uppercase tracking-wider ${themeClass.primaryText} hover:underline flex items-center gap-1`}
                  >
                    View Full Path <ArrowRight size={14} />
                  </Link>
                </div>

                {/* Steps timeline horizontal representation */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-100">
                  {steps.map((step, idx) => {
                    const stepNum = step.stepNumber || idx + 1;
                    return (
                      <div 
                        key={step._key || stepNum} 
                        onClick={() => setActiveStep(stepNum)}
                        className="flex-1 w-full"
                      >
                        <div className="flex items-center gap-3 cursor-pointer group">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 
                            ${activeStep === stepNum 
                              ? `${themeClass.primary} text-white scale-110 shadow-sm` 
                              : `bg-slate-100 text-slate-500 group-hover:bg-slate-200`
                            }`}
                          >
                            {stepNum}
                          </div>
                          <div className="flex-1 text-left">
                            <div className={`text-xs font-bold leading-none ${activeStep === stepNum ? themeClass.primaryText : 'text-slate-600'}`}>
                              {step.title}
                            </div>
                            {step.description && (
                              <span className="text-[10px] text-slate-400 font-medium block mt-1 line-clamp-1">{step.description}</span>
                            )}
                          </div>
                          {idx < steps.length - 1 && (
                            <div className="hidden md:block w-4 h-0.5 bg-slate-200 mx-2"></div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Content Sections (Row of Cards per Step) */}
            {steps.length > 0 ? (
              <div className="space-y-8">
                {steps.map((step, idx) => {
                  const stepNum = step.stepNumber || idx + 1;
                  const stepArticles = step.articles || [];

                  return (
                    <div 
                      key={step._key || stepNum} 
                      className={`transition-all duration-300 ${activeStep === stepNum ? 'opacity-100 scale-100' : 'opacity-75'}`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full ${themeClass.primary} text-white flex items-center justify-center text-xs font-bold font-serif`}>
                            {stepNum}
                          </div>
                          <div>
                            <h4 className={`font-serif text-lg font-bold ${themeClass.textDark}`}>{step.title}</h4>
                            {step.description && (
                              <p className={`text-xs ${themeClass.textMuted}`}>{step.description}</p>
                            )}
                          </div>
                        </div>
                        <span className={`text-xs font-semibold ${themeClass.textMuted}`}>
                          {stepArticles.length} item{stepArticles.length === 1 ? '' : 's'}
                        </span>
                      </div>

                      {/* Horizontal row/grid of cards */}
                      {stepArticles.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          {stepArticles.map((article: any) => {
                            const articleSlug = article.slug?.current || article._id;
                            const imageUrl = getSanityImageUrl(article.coverImage, { width: 400, height: 260 });

                            return (
                              <Link
                                to={`/article/${articleSlug}`}
                                key={article._id}
                                className={`${themeClass.cardBg} rounded-xl overflow-hidden border ${themeClass.border} hover:shadow-md transition-shadow group flex flex-col`}
                              >
                                {/* Image banner */}
                                <div className="relative h-32 w-full overflow-hidden bg-slate-100">
                                  {imageUrl ? (
                                    <img 
                                      src={imageUrl} 
                                      alt={article.title}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                    />
                                  ) : (
                                    <div className="w-full h-full bg-[#EAE3D5] flex items-center justify-center text-agora-primary font-serif font-bold text-xl">
                                      Agora
                                    </div>
                                  )}
                                  <span className={`absolute top-2 left-2 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded backdrop-blur-md bg-black/60 text-white flex items-center gap-1`}>
                                    {article.type === 'video' ? <Play size={10} className="fill-current" /> : <FileText size={10} />}
                                    {article.type || 'Article'}
                                  </span>
                                  {article.readTime && (
                                    <span className="absolute bottom-2 right-2 text-[9px] bg-black/70 text-white px-1.5 py-0.5 rounded font-mono">
                                      {article.readTime}
                                    </span>
                                  )}
                                </div>

                                {/* Details */}
                                <div className="p-3 flex-1 flex flex-col justify-between">
                                  <div>
                                    <h5 className={`font-serif text-xs font-bold leading-tight ${themeClass.textDark} group-hover:${themeClass.primaryText} transition-colors line-clamp-2 mb-1`}>
                                      {article.title}
                                    </h5>
                                    <p className="text-[10px] text-slate-400 line-clamp-1 mb-2">
                                      By {article.author?.name || 'Agora Faculty'}
                                    </p>
                                  </div>
                                  
                                  {article.tags && article.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t border-slate-100">
                                      {article.tags.slice(0, 2).map((tag: string) => (
                                        <span key={tag} className={`text-[8px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-slate-50 text-slate-500`}>
                                          {tag}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="p-6 bg-[#FFFDF9] border border-dashed border-slate-200 rounded-xl text-center text-xs text-agora-muted">
                          Articles for this step can be added in the Admin Dashboard.
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-[#FFFDF9] p-8 rounded-2xl border border-agora-border text-center text-agora-muted text-sm">
                No learning path steps configured for this subject yet.
              </div>
            )}

            {/* All Articles in this Subject */}
            {articles.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className={`font-serif text-xl font-bold ${themeClass.textDark}`}>
                    All Articles in {subject.title}
                  </h3>
                  <Link
                    to={`/articles?subject=${encodeURIComponent(subject.slug?.current || '')}`}
                    className={`text-sm font-semibold ${themeClass.primaryText} hover:underline flex items-center gap-1`}
                  >
                    View All <ArrowRight size={14} />
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.map((article) => {
                    const articleSlug = article.slug?.current || article._id;
                    const imageUrl = getSanityImageUrl(article.coverImage, { width: 400, height: 260 });

                    return (
                      <Link
                        to={`/article/${articleSlug}`}
                        key={article._id}
                        className={`${themeClass.cardBg} rounded-xl overflow-hidden border ${themeClass.border} hover:shadow-md transition-shadow group flex flex-col`}
                      >
                        <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                          {imageUrl ? (
                            <img 
                              src={imageUrl} 
                              alt={article.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                            />
                          ) : (
                            <div className="w-full h-full bg-[#EAE3D5] flex items-center justify-center text-agora-primary font-serif font-bold text-xl">
                              Agora
                            </div>
                          )}
                          <span className={`absolute top-2 left-2 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded backdrop-blur-md bg-black/60 text-white flex items-center gap-1`}>
                            {article.type === 'video' ? <Play size={10} className="fill-current" /> : <FileText size={10} />}
                            {article.type || 'Article'}
                          </span>
                          {article.readTime && (
                            <span className="absolute bottom-2 right-2 text-[9px] bg-black/70 text-white px-1.5 py-0.5 rounded font-mono">
                              {article.readTime}
                            </span>
                          )}
                        </div>

                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className={`font-serif text-sm font-bold leading-tight ${themeClass.textDark} group-hover:${themeClass.primaryText} transition-colors line-clamp-2 mb-2`}>
                              {article.title}
                            </h4>
                            <p className="text-[10px] text-slate-400 line-clamp-1 mb-2">
                              By {article.author?.name || 'Agora Faculty'}
                            </p>
                          </div>
                          
                          {article.tags && article.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t border-slate-100">
                              {article.tags.slice(0, 3).map((tag: string) => (
                                <span key={tag} className={`text-[8px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-slate-50 text-slate-500`}>
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

          {/* RIGHT: Sidebar (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* About Subject Card */}
            {subject.aboutText && (
              <div className={`${themeClass.cardBg} rounded-2xl p-6 border ${themeClass.border} shadow-sm space-y-4`}>
                <div className="flex items-center justify-between border-b pb-3 border-slate-100">
                  <h3 className={`font-serif text-base font-bold ${themeClass.textDark}`}>About {subject.title}</h3>
                  <Landmark className={`w-6 h-6 ${themeClass.primaryText}`} />
                </div>
                <p className={`text-xs leading-relaxed text-slate-600`}>
                  {subject.aboutText}
                </p>
              </div>
            )}

            {/* Popular Topics Card */}
            {topics.length > 0 && (
              <div className={`${themeClass.cardBg} rounded-2xl p-6 border ${themeClass.border} shadow-sm space-y-4`}>
                <h3 className={`font-serif text-base font-bold ${themeClass.textDark} border-b pb-3 border-slate-100`}>Popular Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {topics.map((topic) => (
                    <Link
                      key={topic}
                      to={`/articles?tag=${encodeURIComponent(topic)}`}
                      className={`text-xs px-3 py-1.5 rounded-full border border-slate-200 ${themeClass.cardBg} ${themeClass.textDark} hover:border-slate-400 transition-all font-medium`}
                    >
                      {topic}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Recommended For You Card */}
            {recommendedItems.length > 0 && (
              <div className={`${themeClass.cardBg} rounded-2xl p-6 border ${themeClass.border} shadow-sm space-y-4`}>
                <h3 className={`font-serif text-base font-bold ${themeClass.textDark} border-b pb-3 border-slate-100`}>Recommended For You</h3>
                <div className="space-y-3">
                  {recommendedItems.map((item: any) => {
                    const itemSlug = item.slug?.current || item._id;
                    const imageUrl = getSanityImageUrl(item.coverImage, { width: 120, height: 120 });

                    return (
                      <Link 
                        key={item._id} 
                        to={`/article/${itemSlug}`} 
                        className="flex gap-3 items-center group cursor-pointer"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-100 border border-slate-100">
                          {imageUrl ? (
                            <img src={imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                          ) : (
                            <div className="w-full h-full bg-[#EAE3D5] flex items-center justify-center text-[10px] font-serif font-bold text-agora-primary">
                              Agora
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-serif text-xs font-bold leading-tight ${themeClass.textDark} group-hover:${themeClass.primaryText} transition-colors line-clamp-1`}>
                            {item.title}
                          </h4>
                          <div className="flex items-center justify-between mt-1 text-[10px] text-slate-400">
                            <span>{item.author?.name || 'Agora'}</span>
                            <span>{item.readTime || item.durationOrReadTime || '8 min'}</span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quote Card */}
            {subject.quote?.text && (
              <div className={`rounded-2xl p-6 border ${themeClass.border} shadow-sm flex flex-col justify-between min-h-48 relative overflow-hidden bg-gradient-to-tr from-[#FFFDF9] to-[#FFF8EE]`}>
                <div className="absolute right-2 bottom-0 opacity-15">
                  <Landmark className="w-32 h-32" />
                </div>
                <div className="z-10 mb-4">
                  <span className="text-3xl font-serif text-slate-300 block -mb-2">“</span>
                  <p className={`font-serif text-sm italic leading-relaxed text-slate-700`}>
                    {subject.quote.text}
                  </p>
                </div>
                <div className="flex items-center gap-3 z-10">
                  {subject.quote.image && (
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 bg-slate-100">
                      <img 
                        src={getSanityImageUrl(subject.quote.image, { width: 80, height: 80 })} 
                        alt={subject.quote.author} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  )}
                  <div>
                    <span className={`text-xs font-bold block ${themeClass.textDark}`}>— {subject.quote.author}</span>
                    <span className="text-[9px] uppercase tracking-wider text-slate-400">{subject.quote.role || 'Scholar'}</span>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
