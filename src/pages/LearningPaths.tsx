import { useState, useEffect } from 'react';
import LearningJourney from '../components/LearningJourney';
import { sanityFetch } from '../sanity/client';
import { GET_LEARNING_PATHS_QUERY } from '../sanity/queries';
import { SanityLearningPath } from '../sanity/types';
import EmptyState from '../components/EmptyState';
import { PageLoading } from '../components/LoadingSkeleton';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LearningPaths() {
  const [paths, setPaths] = useState<SanityLearningPath[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    sanityFetch<SanityLearningPath[]>(GET_LEARNING_PATHS_QUERY)
      .then((data) => {
        if (isMounted) {
          setPaths(data || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load learning paths from Sanity:', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <PageLoading />;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
      <h1 className="font-serif text-5xl text-agora-dark mb-4">Learning Paths</h1>
      <p className="text-agora-muted mb-12 max-w-2xl">
        Structured journeys designed to guide you through complex topics step-by-step.
      </p>
      
      {paths.length > 0 ? (
        paths.map((path) => {
          const steps = (path.steps || []).map((step, idx) => ({
            id: step.stepNumber || idx + 1,
            title: step.title,
            description: step.description || '',
          }));

          const subjectSlug = path.subject?.slug?.current || path.subject?._id;

          return (
            <div key={path._id} className="mb-16 bg-[#FFFDF9] rounded-3xl p-8 border border-agora-border shadow-sm space-y-6">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-agora-dark">
                    {path.title}
                  </h3>
                  {path.description && (
                    <p className="text-xs md:text-sm text-agora-muted mt-1">
                      {path.description}
                    </p>
                  )}
                </div>
                {subjectSlug && (
                  <Link
                    to={`/subject/${subjectSlug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-agora-primary hover:text-agora-accent transition-colors shrink-0"
                  >
                    View Subject <ArrowRight size={14} />
                  </Link>
                )}
              </div>

              {steps.length > 0 ? (
                <LearningJourney steps={steps} />
              ) : (
                <p className="text-xs text-agora-muted italic">
                  This learning path is currently being structured.
                </p>
              )}
            </div>
          );
        })
      ) : (
        <EmptyState
          title="No Learning Paths Published"
          message="Structured learning paths will appear here once published from the Admin Dashboard."
          actionText="Explore Subjects"
          actionLink="/subjects"
        />
      )}
    </div>
  );
}
