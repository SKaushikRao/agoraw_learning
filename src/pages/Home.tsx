import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import { Link } from 'react-router-dom';
import { ArrowRight, Landmark, BookOpen, TrendingUp, Brain, Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, Sparkles, FileText, Play } from 'lucide-react';
import { sanityFetch } from '../sanity/client';
import { GET_HOMEPAGE_QUERY, GET_COMMUNITY_ARTICLES_QUERY } from '../sanity/queries';
import { getSanityImageUrl } from '../sanity/image';
import { SubjectCardSkeleton, CardSkeleton } from '../components/LoadingSkeleton';
import WriteArticleModal from '../components/WriteArticleModal';

function getSubjectIcon(iconType?: string) {
  switch (iconType) {
    case 'brain':
      return <Brain className="w-8 h-8 text-[#5C3B22]" />;
    case 'trending':
      return <TrendingUp className="w-8 h-8 text-[#5C3B22]" />;
    case 'book':
    case 'liberal-arts':
      return <BookOpen className="w-8 h-8 text-[#5C3B22]" />;
    case 'landmark':
    default:
      return <Landmark className="w-8 h-8 text-[#5C3B22]" />;
  }
}

export default function Home() {
  const [currentDate, setCurrentDate] = useState(() => new Date()); // Use actual current date
  const [selectedDate, setSelectedDate] = useState<number>(new Date().getDate());
  const [loading, setLoading] = useState(true);
  const [homeData, setHomeData] = useState<any>(null);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [communityArticles, setCommunityArticles] = useState<any>([]);

  useEffect(() => {
    let isMounted = true;
    sanityFetch<any>(GET_HOMEPAGE_QUERY)
      .then((data) => {
        if (isMounted) {
          setHomeData(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load homepage data from Sanity', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    sanityFetch<any>(GET_COMMUNITY_ARTICLES_QUERY)
      .then((data) => {
        if (isMounted) {
          setCommunityArticles(data || []);
        }
      })
      .catch((err) => {
        console.error('Failed to load community articles:', err);
        if (isMounted) setCommunityArticles([]);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const refreshCommunityArticles = () => {
    let isMounted = true;
    sanityFetch<any>(GET_COMMUNITY_ARTICLES_QUERY)
      .then((data) => {
        if (isMounted) setCommunityArticles(data || []);
      })
      .catch((err) => {
        console.error('Failed to refresh community articles:', err);
      });
    
    return () => {
      isMounted = false;
    };
  };

  const settings = homeData?.settings;
  const subjects =
    settings?.featuredSubjects?.length > 0
      ? settings.featuredSubjects
      : homeData?.fallbackSubjects || [];

  const articles =
    settings?.featuredArticles?.length > 0
      ? settings.featuredArticles
      : homeData?.fallbackArticles || [];

  const events =
    settings?.upcomingEvents?.length > 0
      ? settings.upcomingEvents
      : homeData?.fallbackEvents || [];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const monthLabel = `${monthNames[month]} ${year}`;

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  // Dynamic calendar grid
  const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7; // Monday = 0
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays: { date: number | null }[] = [];
  for (let i = 0; i < firstDayIndex; i++) {
    calendarDays.push({ date: null });
  }
  for (let d = 1; d <= totalDaysInMonth; d++) {
    calendarDays.push({ date: d });
  }

  const heroImageUrl = getSanityImageUrl(settings?.heroImage, { width: 800, height: 1000 });
  const aboutImageUrl =
    getSanityImageUrl(settings?.aboutSection?.image, { width: 800, height: 500 }) ||
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800';

  const aboutHeadline = settings?.aboutSection?.title || 'About Us';
  const aboutText =
    settings?.aboutSection?.content ||
    'Agora is a collaborative space for those curious about the world of arts and humanities. Bringing together students, thinkers, and learners from diverse academic backgrounds, Agora connects people with meaningful resources, ideas, and pathways to explore beyond the boundaries of a classroom. From philosophy and psychology to economics, literature, history, and the liberal arts, our platform makes learning more accessible, interdisciplinary, and engaging. Users can also share their own thoughts, insights, and perspectives through blogs, creating a space where everyone can contribute to the conversation.';

  const aboutButtonText = settings?.aboutSection?.buttonText || 'Learn More About Us';
  const aboutButtonLink = settings?.aboutSection?.buttonLink || '/about';

  const bottomBanner = settings?.bottomBanner || {
    title: 'Learn More',
    subtitle: 'Discover courses, resources, and opportunities to grow.',
    buttonText: 'Explore Now',
    buttonLink: '/subjects',
  };

  // Split articles into featured large card (left) and 4 small cards (right)
  const mainArticle = articles[0];
  const sideArticles = articles.slice(1, 5);

  return (
    <div className="bg-[#F8F4EE] min-h-screen text-agora-dark">
      <WriteArticleModal
        isOpen={isWriteModalOpen}
        onClose={() => setIsWriteModalOpen(false)}
        onSubmitSuccess={refreshCommunityArticles}
      />
      <Hero
        headline={settings?.heroHeadline || 'Explore \nArts & Humanities.'}
        subheadline={settings?.heroSubheadline || 'What would you like to learn today?'}
        heroImageUrl={heroImageUrl}
      />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 space-y-20">
        
        {/* Hello User Section */}
        <div className="space-y-8 text-center md:text-left">
          <h2 className="font-serif text-3xl font-bold text-center text-agora-dark">Hello User</h2>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <SubjectCardSkeleton />
              <SubjectCardSkeleton />
              <SubjectCardSkeleton />
              <SubjectCardSkeleton />
            </div>
          ) : subjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {subjects.map((sub: any) => {
                const subSlug = sub.slug?.current || sub._id;
                const stats = {
                  paths: sub.learningPathsCount ?? 0,
                  resources: sub.resourcesCount ?? 0,
                  articles: sub.articlesCount ?? 0,
                  videos: sub.videosCount ?? 0
                };
                const bannerImageUrl = getSanityImageUrl(sub.bannerImage, { width: 400, height: 300 });
                return (
                  <Link 
                    key={sub._id || subSlug} 
                    to={`/subject/${subSlug}`}
                    className="relative bg-[#FFFDF9] hover:bg-[#FDF9F2] rounded-2xl border border-agora-border shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between h-80 text-left overflow-hidden"
                  >
                    {/* Backdrop Image */}
                    {bannerImageUrl && (
                      <>
                        <img
                          src={bannerImageUrl}
                          alt={sub.title}
                          className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-25 transition-opacity"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFFDF9]/70 to-[#FFFDF9]"></div>
                      </>
                    )}
                    <div className="relative z-10 space-y-4">
                      <div className="p-3 bg-[#F5EFE4] w-fit rounded-xl group-hover:scale-105 transition-transform">
                        {getSubjectIcon(sub.iconType)}
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-agora-dark group-hover:text-[#5C3B22] transition-colors">
                        {sub.title || sub.name}
                      </h3>
                      <p className="text-xs text-agora-muted leading-relaxed line-clamp-2">
                        {sub.subtitle || sub.aboutText || sub.description}
                      </p>
                    </div>
                    <div className="relative z-10 space-y-2 pt-4 border-t border-agora-border bg-[#FFFDF9]/80 backdrop-blur-sm">
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div>
                          <div className="font-serif text-lg font-bold text-agora-dark">{stats.paths}</div>
                          <div className="text-[9px] uppercase tracking-wider text-agora-muted">Guided Paths</div>
                        </div>
                        <div>
                          <div className="font-serif text-lg font-bold text-agora-dark">{stats.resources}</div>
                          <div className="text-[9px] uppercase tracking-wider text-agora-muted">Resources</div>
                        </div>
                        <div>
                          <div className="font-serif text-lg font-bold text-agora-dark">{stats.articles}</div>
                          <div className="text-[9px] uppercase tracking-wider text-agora-muted">Articles</div>
                        </div>
                        <div>
                          <div className="font-serif text-lg font-bold text-agora-dark">{stats.videos}</div>
                          <div className="text-[9px] uppercase tracking-wider text-agora-muted">Videos</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="bg-[#FFFDF9] p-8 rounded-2xl border border-agora-border text-center text-agora-muted text-sm">
              No subjects have been published yet. You can add and configure subjects in the Admin Dashboard.
            </div>
          )}
        </div>

        {/* About Us Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#FFFDF9] rounded-3xl p-8 md:p-12 border border-agora-border shadow-sm">
          {/* Left University Image */}
          <div className="lg:col-span-6 relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg border border-agora-border">
            <img 
              src={aboutImageUrl} 
              alt="Agora Academic Campus" 
              className="w-full h-full object-cover hover:scale-102 transition-transform duration-700"
            />
          </div>
          
          {/* Right Text */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-agora-dark">{aboutHeadline}</h2>
            <p className="text-xs md:text-sm text-agora-muted leading-relaxed whitespace-pre-line">
              {aboutText}
            </p>
            <Link
              to={aboutButtonLink}
              className="inline-flex items-center gap-2 bg-[#3A2415] hover:bg-[#5C3B22] text-white text-xs font-semibold px-6 py-3 rounded-full transition-colors shadow-sm"
            >
              {aboutButtonText} <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Blogs & Articles Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <h2 className="font-serif text-3xl font-bold text-agora-dark">Blogs & Articles</h2>
            <Link to="/articles" className="text-xs font-semibold uppercase tracking-wider text-agora-accent hover:text-[#5C3B22] transition-colors flex items-center gap-1">
              View all articles <ArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5"><CardSkeleton /></div>
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <CardSkeleton /><CardSkeleton />
              </div>
            </div>
          ) : mainArticle ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Large Card (Left) */}
              <Link
                to={`/article/${mainArticle.slug?.current || mainArticle._id}`}
                className="lg:col-span-5 bg-[#FFFDF9] rounded-2xl border border-agora-border overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                  {mainArticle.coverImage ? (
                    <img 
                      src={getSanityImageUrl(mainArticle.coverImage, { width: 800, height: 600 })} 
                      alt={mainArticle.title} 
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#EAE3D5] flex items-center justify-center text-agora-primary font-serif font-bold text-3xl">
                      Agora
                    </div>
                  )}
                </div>
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-[#B78B4A] uppercase tracking-wider block">
                      {mainArticle.categories?.[0]?.title || mainArticle.subject?.title || 'Featured'}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-agora-dark group-hover:text-[#5C3B22] transition-colors leading-snug">
                      {mainArticle.title}
                    </h3>
                    {mainArticle.summary && (
                      <p className="text-xs text-agora-muted line-clamp-2">
                        {mainArticle.summary}
                      </p>
                    )}
                  </div>
                  <div className="pt-4 border-t border-slate-100 text-xs text-agora-muted flex justify-between items-center">
                    <span>{mainArticle.author?.name || 'Agora Faculty'}</span>
                    <span>{mainArticle.readTime || '8 min read'}</span>
                  </div>
                </div>
              </Link>

              {/* Smaller 2x2 Grid (Right) */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {sideArticles.map((art: any) => (
                  <Link
                    key={art._id}
                    to={`/article/${art.slug?.current || art._id}`}
                    className="bg-[#FFFDF9] rounded-2xl border border-agora-border overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between"
                  >
                    <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden">
                      {art.coverImage ? (
                        <img 
                          src={getSanityImageUrl(art.coverImage, { width: 500, height: 320 })} 
                          alt={art.title} 
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#EAE3D5] flex items-center justify-center text-agora-primary font-serif font-bold text-xl">
                          Agora
                        </div>
                      )}
                    </div>
                    <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold text-[#B78B4A] uppercase tracking-wider block">
                          {art.categories?.[0]?.title || art.subject?.title || 'Article'}
                        </span>
                        <h4 className="font-serif text-sm font-bold text-agora-dark group-hover:text-[#5C3B22] transition-colors line-clamp-2">
                          {art.title}
                        </h4>
                      </div>
                      <div className="pt-2 border-t border-slate-50 text-[10px] text-agora-muted flex justify-between">
                        <span>{art.author?.name || 'Agora'}</span>
                        <span>{art.readTime || '5 min'}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-[#FFFDF9] p-8 rounded-2xl border border-agora-border text-center text-agora-muted text-sm">
              No articles have been published yet
            </div>
          )}
        </div>

        {/* Community Section with Write Button */}
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="font-serif text-3xl font-bold text-agora-dark">Community</h2>
            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="bg-[#3A2415] hover:bg-[#5C3B22] text-white text-xs font-semibold px-6 py-3 rounded-full transition-colors shadow-sm flex items-center gap-2"
            >
              <FileText size={16} />
              Write an Article
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityArticles.length > 0 ? (
              communityArticles.slice(0, 3).map((article: any) => {
                const articleSlug = article.slug?.current || article._id;
                const imageUrl = getSanityImageUrl(article.coverImage, { width: 400, height: 260 });

                return (
                  <Link
                    to={`/article/${articleSlug}`}
                    key={article._id}
                    className="bg-[#FFFDF9] rounded-xl overflow-hidden border border-agora-border hover:shadow-md transition-shadow group flex flex-col"
                  >
                    <div className="relative h-36 w-full overflow-hidden bg-slate-100">
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
                      <span className="absolute top-2 left-2 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded backdrop-blur-md bg-black/60 text-white flex items-center gap-1">
                        {article.type === 'video' ? <Play size={10} className="fill-current" /> : <FileText size={10} />}
                        {article.type || 'Article'}
                      </span>
                      {article.status === 'pending' && (
                        <span className="absolute top-2 right-2 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-yellow-500/90 text-white backdrop-blur-sm">
                          Pending
                        </span>
                      )}
                      {article.readTime && (
                        <span className={`absolute bottom-2 ${article.status === 'pending' ? 'left-2' : 'right-2'} text-[9px] bg-black/70 text-white px-1.5 py-0.5 rounded font-mono`}>
                          {article.readTime}
                        </span>
                      )}
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif text-sm font-bold leading-tight text-agora-dark group-hover:text-agora-primary transition-colors line-clamp-2 mb-2">
                          {article.title}
                        </h3>
                        <p className="text-[10px] text-slate-400 line-clamp-1 mb-2">
                          By {article.submitterName || article.author?.name || 'Community Contributor'}
                        </p>
                      </div>

                      {article.tags && article.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t border-slate-100">
                          {article.tags.slice(0, 3).map((tag: string) => (
                            <span
                              key={tag}
                              className="text-[8px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-slate-50 text-slate-500"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="col-span-full bg-[#FFFDF9] p-8 rounded-2xl border border-agora-border text-center text-agora-muted text-sm">
                <p className="mb-4">No community articles yet. Be the first to share your perspective!</p>
                <button
                  onClick={() => setIsWriteModalOpen(true)}
                  className="bg-[#3A2415] hover:bg-[#5C3B22] text-white text-xs font-semibold px-6 py-3 rounded-full transition-colors shadow-sm"
                >
                  Write an Article
                </button>
              </div>
            )}
          </div>

          {communityArticles.length > 0 && (
            <div className="text-center">
              <Link
                to="/community"
                className="text-xs font-semibold uppercase tracking-wider text-agora-accent hover:text-[#5C3B22] transition-colors flex items-center justify-center gap-1"
              >
                View all community articles <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>

        {/* Bottom Section: Calendar & Upcoming Events side-by-side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Calendar Card */}
          <div className="bg-[#FFFDF9] rounded-3xl p-6 border border-agora-border shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-agora-dark">Calendar</h3>
                <p className="text-[10px] text-agora-muted">Select a date to view events</p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={prevMonth}
                  className="p-1 hover:bg-[#F5EFE4] rounded-full transition-colors cursor-pointer"
                  title="Previous month"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-xs font-semibold uppercase tracking-wider">{monthLabel}</span>
                <button 
                  onClick={nextMonth}
                  className="p-1 hover:bg-[#F5EFE4] rounded-full transition-colors cursor-pointer"
                  title="Next month"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-y-3 gap-x-1 text-center pt-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <div key={day} className="text-[10px] uppercase font-bold text-agora-muted tracking-wider">
                  {day}
                </div>
              ))}
              {calendarDays.map((cell, idx) => {
                if (!cell.date) {
                  return <div key={idx} className="h-8"></div>;
                }
                const hasEvent = events.some((e: any) => {
                  const eventDate = e.eventDate ? new Date(e.eventDate) : null;
                  const eventDay = eventDate?.getDate();
                  const eventMonth = eventDate?.getMonth();
                  return eventDay === cell.date && eventMonth === month;
                });
                const isSelected = selectedDate === cell.date;

                return (
                  <div key={idx} className="flex justify-center items-center h-8 relative">
                    <button 
                      onClick={() => setSelectedDate(cell.date!)}
                      className={`w-7 h-7 rounded-full text-xs font-semibold transition-all flex items-center justify-center relative cursor-pointer
                        ${isSelected 
                          ? 'bg-[#3A2415] text-white scale-110 shadow-sm' 
                          : 'text-agora-dark hover:bg-[#F5EFE4]'}`}
                    >
                      {cell.date}
                      {hasEvent && !isSelected && (
                        <span className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-[#B78B4A]"></span>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming Events Card */}
          <div className="bg-[#FFFDF9] rounded-3xl p-6 border border-agora-border shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100">
              <h3 className="font-serif text-xl font-bold text-agora-dark">Upcoming Events</h3>
              {selectedDate && (
                <span className="text-[10px] bg-[#F5EFE4] text-agora-primary font-semibold px-2 py-0.5 rounded-full">
                  Selected: Day {selectedDate}
                </span>
              )}
            </div>
            {events.length > 0 ? (
              <div className="relative pl-6 border-l-2 border-[#E6DDD2] space-y-6">
                {events.map((evt: any, idx: number) => {
                  const eventDate = evt.eventDate ? new Date(evt.eventDate) : null;
                  const eventDay = eventDate?.getDate();
                  const eventMonth = eventDate?.getMonth();
                  const isMatchingDate = selectedDate && eventDay === selectedDate && eventMonth === month;
                  const isSelectedMonth = eventMonth === month;

                  return (
                    <div 
                      key={evt._id || idx} 
                      className={`relative group transition-all p-2 rounded-xl ${isMatchingDate ? 'bg-[#FBF6ED] ring-1 ring-[#B78B4A]/50 -ml-2 pl-4' : !isSelectedMonth ? 'opacity-40' : ''}`}
                    >
                      {/* Timeline point */}
                      <div className={`absolute top-3 w-2.5 h-2.5 rounded-full border-2 border-white transition-transform ${isMatchingDate ? '-left-[27px] bg-[#3A2415] scale-150' : '-left-[31px] bg-[#B78B4A] group-hover:scale-125'}`}></div>
                      
                      <div className="flex gap-4">
                        <div className="text-center w-10 shrink-0">
                          <div className={`font-serif text-xl font-bold leading-none ${isMatchingDate ? 'text-[#B78B4A]' : 'text-agora-dark'}`}>{eventDay || evt.dateDay || '24'}</div>
                          <div className="text-[9px] uppercase tracking-wider text-agora-accent font-semibold">{eventMonth !== undefined ? monthNames[eventMonth] : (evt.dateMonth || 'MAY')}</div>
                        </div>
                        <div>
                          <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-500 mb-1 inline-block">
                            {evt.category || 'Lecture'}
                          </span>
                          <h4 className="font-serif text-sm font-bold text-agora-dark leading-snug group-hover:text-[#5C3B22] transition-colors">
                            {evt.title}
                          </h4>
                          <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                            <Clock size={10} /> {evt.time || eventDate?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || '11:00 AM (EST)'}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-agora-muted italic">No upcoming events scheduled at this moment.</p>
            )}
          </div>

        </div>

        {/* Learn More Banner bottom */}
        <div className="bg-gradient-to-r from-[#FFF8EE] to-[#FFF1DE] border border-agora-border rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm hidden sm:block">
              <BookOpen className="w-8 h-8 text-[#B78B4A]" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-agora-dark">{bottomBanner.title}</h3>
              <p className="text-xs text-agora-muted">{bottomBanner.subtitle}</p>
            </div>
          </div>
          <Link
            to={bottomBanner.buttonLink || '/subjects'}
            className="bg-[#3A2415] hover:bg-[#5C3B22] text-white text-xs font-bold px-6 py-3 rounded-full flex items-center gap-1.5 transition-colors shrink-0 shadow-sm"
          >
            {bottomBanner.buttonText} <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </div>
  );
}
