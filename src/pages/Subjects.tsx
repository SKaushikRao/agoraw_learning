import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { sanityFetch } from '../sanity/client';
import { GET_SUBJECTS_QUERY } from '../sanity/queries';
import { SanitySubject } from '../sanity/types';
import { SubjectCardSkeleton } from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';
import { BookOpen } from 'lucide-react';
import { getSanityImageUrl } from '../sanity/image';

export default function Subjects() {
  const [subjects, setSubjects] = useState<SanitySubject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    sanityFetch<SanitySubject[]>(GET_SUBJECTS_QUERY)
      .then((data) => {
        if (isMounted) {
          setSubjects(data || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch subjects from Sanity:', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
      <h1 className="font-serif text-5xl text-agora-dark mb-4">Explore Subjects</h1>
      <p className="text-agora-muted mb-12 max-w-2xl">
        Dive into the diverse fields of arts and humanities. Choose a discipline below to begin your journey of discovery.
      </p>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SubjectCardSkeleton />
          <SubjectCardSkeleton />
          <SubjectCardSkeleton />
          <SubjectCardSkeleton />
          <SubjectCardSkeleton />
          <SubjectCardSkeleton />
        </div>
      ) : subjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => {
            const slug = subject.slug?.current || subject._id;
            const bannerImageUrl = getSanityImageUrl(subject.bannerImage, { width: 500, height: 400 });
            const stats = {
              paths: subject.learningPathsCount ?? 0,
              resources: subject.resourcesCount ?? 0,
              articles: subject.articlesCount ?? 0,
              videos: subject.videosCount ?? 0
            };
            return (
              <Link 
                key={subject._id} 
                to={`/subject/${slug}`}
                className="block h-full"
              >
                <div className="relative bg-[#FFFDF9] rounded-xl border border-agora-border shadow-sm hover:shadow-md transition-all cursor-pointer group h-full flex flex-col justify-between overflow-hidden">
                  {/* Backdrop Image */}
                  {bannerImageUrl && (
                    <>
                      <img
                        src={bannerImageUrl}
                        alt={subject.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-15 group-hover:opacity-20 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFFDF9]/80 to-[#FFFDF9]"></div>
                    </>
                  )}
                  <div className="relative z-10 p-8">
                    <h3 className="font-serif text-2xl font-bold text-agora-dark group-hover:text-agora-accent transition-colors mb-4">
                      {subject.title}
                    </h3>
                    <p className="text-xs text-agora-muted leading-relaxed line-clamp-3">
                      {subject.subtitle || subject.aboutText || 'Explore structured learning paths, essays, and resources.'}
                    </p>
                  </div>
                  <div className="relative z-10 mt-auto p-8 pt-0">
                    <div className="grid grid-cols-2 gap-3 mb-4 pt-4 border-t border-slate-100">
                      <div className="text-center">
                        <div className="font-serif text-lg font-bold text-agora-dark">{stats.paths}</div>
                        <div className="text-[9px] uppercase tracking-wider text-agora-muted">Paths</div>
                      </div>
                      <div className="text-center">
                        <div className="font-serif text-lg font-bold text-agora-dark">{stats.resources}</div>
                        <div className="text-[9px] uppercase tracking-wider text-agora-muted">Resources</div>
                      </div>
                      <div className="text-center">
                        <div className="font-serif text-lg font-bold text-agora-dark">{stats.articles}</div>
                        <div className="text-[9px] uppercase tracking-wider text-agora-muted">Articles</div>
                      </div>
                      <div className="text-center">
                        <div className="font-serif text-lg font-bold text-agora-dark">{stats.videos}</div>
                        <div className="text-[9px] uppercase tracking-wider text-agora-muted">Videos</div>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <span className="text-xs font-bold text-[#B78B4A] uppercase tracking-widest border-b border-[#B78B4A] opacity-80 group-hover:opacity-100 transition-opacity">
                        Explore
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={<BookOpen className="w-8 h-8 text-[#5C3B22]" />}
          title="No Subjects Published"
          message="There are no published subjects currently in Sanity. An administrator can create subjects in the Sanity Studio."
          actionText="Go to Homepage"
          actionLink="/"
        />
      )}
    </div>
  );
}
