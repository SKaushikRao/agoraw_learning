import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import { Link } from 'react-router-dom';
import { ArrowRight, Landmark, BookOpen, TrendingUp, Brain, Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { sanityFetch } from '../sanity/client';
import { GET_HOMEPAGE_QUERY } from '../sanity/queries';
import { getSanityImageUrl } from '../sanity/image';
import { SubjectCardSkeleton, CardSkeleton } from '../components/LoadingSkeleton';

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
  const [selectedDate, setSelectedDate] = useState<number>(11);
  const [loading, setLoading] = useState(true);
  const [homeData, setHomeData] = useState<any>(null);

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

  const calendarDays = [
    { date: null, label: '' }, { date: null, label: '' }, { date: null, label: '' }, { date: 1, label: 'Wed' }, { date: 2, label: 'Thu' }, { date: 3, label: 'Fri' }, { date: 4, label: 'Sat' },
    { date: 5, label: 'Sun' }, { date: 6, label: 'Mon' }, { date: 7, label: 'Tue' }, { date: 8, label: 'Wed' }, { date: 9, label: 'Thu' }, { date: 10, label: 'Fri' }, { date: 11, label: 'Sat' },
    { date: 12, label: 'Sun' }, { date: 13, label: 'Mon' }, { date: 14, label: 'Tue' }, { date: 15, label: 'Wed' }, { date: 16, label: 'Thu' }, { date: 17, label: 'Fri' }, { date: 18, label: 'Sat' },
    { date: 19, label: 'Sun' }, { date: 20, label: 'Mon' }, { date: 21, label: 'Tue' }, { date: 22, label: 'Wed' }, { date: 23, label: 'Thu' }, { date: 24, label: 'Fri' }, { date: 25, label: 'Sat' },
    { date: 26, label: 'Sun' }, { date: 27, label: 'Mon' }, { date: 28, label: 'Tue' }, { date: 29, label: 'Wed' }, { date: 30, label: 'Thu' }, { date: 31, label: 'Fri' }
  ];

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
                return (
                  <Link 
                    key={sub._id || subSlug} 
                    to={`/subject/${subSlug}`}
                    className="bg-[#FFFDF9] hover:bg-[#FDF9F2] p-8 rounded-2xl border border-agora-border shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between h-64 text-left"
                  >
                    <div className="space-y-4">
                      <div className="p-3 bg-[#F5EFE4] w-fit rounded-xl group-hover:scale-105 transition-transform">
                        {getSubjectIcon(sub.iconType)}
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-agora-dark group-hover:text-[#5C3B22] transition-colors">
                        {sub.title || sub.name}
                      </h3>
                      <p className="text-xs text-agora-muted leading-relaxed line-clamp-3">
                        {sub.subtitle || sub.aboutText || sub.description}
                      </p>
                    </div>
                    <div className="flex justify-end pt-4">
                      <ArrowRight size={18} className="text-agora-accent group-hover:translate-x-1.5 transition-transform" />
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
              No articles have been published yet. Articles created and published in Sanity Studio will appear here.
            </div>
          )}
        </div>

        {/* Bottom Section: Calendar & Upcoming Events side-by-side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Calendar Card */}
          <div className="bg-[#FFFDF9] rounded-3xl p-6 border border-agora-border shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold text-agora-dark">Calendar</h3>
              <div className="flex items-center gap-2">
                <button className="p-1 hover:bg-[#F5EFE4] rounded-full transition-colors"><ChevronLeft size={16} /></button>
                <span className="text-xs font-semibold uppercase tracking-wider">May 2026</span>
                <button className="p-1 hover:bg-[#F5EFE4] rounded-full transition-colors"><ChevronRight size={16} /></button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-y-3 gap-x-1 text-center pt-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <div key={day} className="text-[10px] uppercase font-bold text-agora-muted tracking-wider">
                  {day}
                </div>
              ))}
              {calendarDays.map((cell, idx) => (
                <div key={idx} className="flex justify-center items-center h-8">
                  {cell.date ? (
                    <button 
                      onClick={() => setSelectedDate(cell.date!)}
                      className={`w-7 h-7 rounded-full text-xs font-semibold transition-all flex items-center justify-center 
                        ${selectedDate === cell.date 
                          ? 'bg-[#3A2415] text-white scale-110 shadow-sm' 
                          : 'text-agora-dark hover:bg-[#F5EFE4]'}`}
                    >
                      {cell.date}
                    </button>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events Card */}
          <div className="bg-[#FFFDF9] rounded-3xl p-6 border border-agora-border shadow-sm space-y-6">
            <h3 className="font-serif text-xl font-bold text-agora-dark border-b pb-3 border-slate-100">Upcoming Events</h3>
            {events.length > 0 ? (
              <div className="relative pl-6 border-l-2 border-[#E6DDD2] space-y-6">
                {events.map((evt: any, idx: number) => (
                  <div key={evt._id || idx} className="relative group">
                    {/* Timeline point */}
                    <div className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-[#B78B4A] border-2 border-white group-hover:scale-125 transition-transform"></div>
                    
                    <div className="flex gap-4">
                      <div className="text-center w-10 shrink-0">
                        <div className="font-serif text-xl font-bold text-agora-dark leading-none">{evt.dateDay || '24'}</div>
                        <div className="text-[9px] uppercase tracking-wider text-agora-accent font-semibold">{evt.dateMonth || 'MAY'}</div>
                      </div>
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-500 mb-1 inline-block">
                          {evt.category || 'Lecture'}
                        </span>
                        <h4 className="font-serif text-sm font-bold text-agora-dark leading-snug group-hover:text-[#5C3B22] transition-colors">
                          {evt.title}
                        </h4>
                        <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                          <Clock size={10} /> {evt.time || '11:00 AM (EST)'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
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
