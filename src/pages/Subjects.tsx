import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { sanityFetch } from '../sanity/client';
import { GET_SUBJECTS_QUERY } from '../sanity/queries';
import { SanitySubject } from '../sanity/types';
import { SubjectCardSkeleton } from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';
import { BookOpen } from 'lucide-react';

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
            return (
              <Link 
                key={subject._id} 
                to={`/subject/${slug}`}
                className="block h-full"
              >
                <div className="bg-[#FFFDF9] rounded-xl p-8 border border-agora-border shadow-sm hover:shadow-md transition-all cursor-pointer group h-full flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-agora-dark group-hover:text-agora-accent transition-colors mb-4">
                      {subject.title}
                    </h3>
                    <p className="text-xs text-agora-muted leading-relaxed line-clamp-4">
                      {subject.subtitle || subject.aboutText || 'Explore structured learning paths, essays, and resources.'}
                    </p>
                  </div>
                  <div className="mt-6 flex justify-between items-center pt-4 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      {subject.stats?.articles ? `${subject.stats.articles} Articles` : 'Discipline'}
                    </span>
                    <span className="text-xs font-bold text-[#B78B4A] uppercase tracking-widest border-b border-[#B78B4A] opacity-80 group-hover:opacity-100 transition-opacity">
                      Explore
                    </span>
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
