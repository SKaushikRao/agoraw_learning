import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import SubjectSection from '../components/SubjectSection';
import { sanityFetch } from '../sanity/client';
import { GET_ARTICLES_QUERY, GET_SUBJECTS_QUERY } from '../sanity/queries';
import { SanityArticle, Article, SanitySubject } from '../types';
import { getSanityImageUrl } from '../sanity/image';
import EmptyState from '../components/EmptyState';
import { PageLoading } from '../components/LoadingSkeleton';
import { Search, Tag as TagIcon, X, BookOpen, ArrowRight } from 'lucide-react';

function mapSanityArticleToArticle(a: SanityArticle): Article {
  return {
    id: a._id,
    slug: a.slug?.current || a._id,
    title: a.title,
    summary: a.summary || '',
    author: a.author?.name || 'Agora Contributor',
    source: a.subject?.title || 'Arts & Humanities',
    readTime: a.readTime || '8 min read',
    type: (a.type as any) || 'article',
    imageUrl: getSanityImageUrl(a.coverImage, { width: 500, height: 350 }) || '',
    tags: a.tags || [],
  };
}

export default function Articles() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const tagParam = searchParams.get('tag') || '';
  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [articles, setArticles] = useState<Article[]>([]);
  const [subjects, setSubjects] = useState<SanitySubject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    Promise.all([
      sanityFetch<SanityArticle[]>(GET_ARTICLES_QUERY),
      sanityFetch<SanitySubject[]>(GET_SUBJECTS_QUERY),
    ])
      .then(([articlesData, subjectsData]) => {
        if (isMounted) {
          const mapped = (articlesData || []).map(mapSanityArticleToArticle);
          setArticles(mapped);
          setSubjects(subjectsData || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load articles from Sanity:', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setSearchTerm(queryParam);
  }, [queryParam]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (searchTerm.trim()) {
      newParams.set('q', searchTerm.trim());
    } else {
      newParams.delete('q');
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSearchParams({});
  };

  // Filter articles based on search query or tag
  const filteredArticles = articles.filter((article) => {
    if (queryParam) {
      const q = queryParam.toLowerCase();
      const matchTitle = article.title.toLowerCase().includes(q);
      const matchSummary = article.summary.toLowerCase().includes(q);
      const matchAuthor = article.author.toLowerCase().includes(q);
      const matchTags = article.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchSummary && !matchAuthor && !matchTags) return false;
    }

    if (tagParam) {
      const t = tagParam.toLowerCase();
      const hasTag = article.tags.some((tag) => tag.toLowerCase() === t);
      if (!hasTag) return false;
    }

    return true;
  });

  // Filter subjects based on search query
  const matchingSubjects = queryParam
    ? subjects.filter((s) => {
      const q = queryParam.toLowerCase();
      const matchTitle = (s.title || '').toLowerCase().includes(q);
      const matchSub = (s.subtitle || '').toLowerCase().includes(q);
      const matchAbout = (s.aboutText || '').toLowerCase().includes(q);
      const matchTopics = (s.topics || []).some((top: string) => top.toLowerCase().includes(q));
      return matchTitle || matchSub || matchAbout || matchTopics;
    })
    : [];

  if (loading) {
    return <PageLoading />;
  }

  const isFiltering = Boolean(queryParam || tagParam);

  const featuredList = filteredArticles.slice(0, 4);
  const recentList = filteredArticles.slice(4, 12);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-8">
        <div>
          <h1 className="font-serif text-5xl text-agora-dark mb-4">Articles & Resources</h1>
          <p className="text-agora-muted max-w-2xl">
            Read essays, research papers, and insightful articles from educators and thinkers worldwide.
          </p>
        </div>

        {/* Filter / Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter articles..."
            className="w-full bg-[#FFFDF9] border border-agora-border rounded-full pl-4 pr-10 py-2.5 text-xs text-agora-dark focus:outline-none focus:border-agora-primary shadow-sm"
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-agora-muted hover:text-agora-primary">
            <Search size={16} />
          </button>
        </form>
      </div>

      {/* Active filter badges */}
      {isFiltering && (
        <div className="flex items-center gap-2 mb-8 bg-[#F5EFE4] p-3 rounded-xl border border-agora-border w-fit text-xs">
          <span className="font-semibold text-agora-dark">Filtering by:</span>
          {queryParam && <span className="bg-white px-2 py-0.5 rounded shadow-sm text-agora-primary font-mono">"{queryParam}"</span>}
          {tagParam && <span className="bg-white px-2 py-0.5 rounded shadow-sm text-agora-primary flex items-center gap-1"><TagIcon size={12} /> {tagParam}</span>}
          <button onClick={clearFilters} className="ml-2 text-agora-muted hover:text-agora-dark font-semibold flex items-center gap-0.5">
            <X size={14} /> Clear
          </button>
        </div>
      )}

      {/* Matching Subjects Section if searched query matches subjects */}
      {queryParam && matchingSubjects.length > 0 && (
        <div className="mb-12 bg-gradient-to-r from-[#FFF8EE] to-[#FFFDF9] p-6 md:p-8 rounded-2xl border border-agora-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-agora-primary" />
              <h2 className="font-serif text-xl md:text-2xl font-bold text-agora-dark">
                Matching Subject{matchingSubjects.length > 1 ? 's' : ''}
              </h2>
            </div>
            <Link to="/subjects" className="text-xs font-semibold uppercase tracking-wider text-agora-primary hover:underline flex items-center gap-1">
              View All Subjects <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {matchingSubjects.map((sub: any) => {
              const subSlug = sub.slug?.current || sub._id;
              return (
                <Link
                  key={sub._id}
                  to={`/subject/${subSlug}`}
                  className="bg-white hover:bg-[#FDFBF7] p-5 rounded-xl border border-agora-border shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[9px] uppercase tracking-wider font-bold text-agora-accent mb-1 block">
                      Discipline / Subject
                    </span>
                    <h3 className="font-serif text-xl font-bold text-agora-dark group-hover:text-agora-primary transition-colors">
                      {sub.title}
                    </h3>
                    <p className="text-xs text-agora-muted line-clamp-2 mt-2 leading-relaxed">
                      {sub.subtitle || sub.aboutText || 'Explore structured learning paths and resources.'}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#B78B4A]">
                    <span>Explore Discipline</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {filteredArticles.length > 0 ? (
        <>
          <SubjectSection
            stepNumber={1}
            title={isFiltering ? `Search Results (${filteredArticles.length})` : 'Featured Reading'}
            description={isFiltering ? 'Articles matching your criteria.' : "Curated selection of our best essays and materials."}
            articles={isFiltering ? filteredArticles : featuredList}
          />

          {!isFiltering && recentList.length > 0 && (
            <SubjectSection
              stepNumber={2}
              title="Recent Publications"
              description="The latest additions to our educational catalogue."
              articles={recentList}
            />
          )}
        </>
      ) : (
        <EmptyState
          title={isFiltering ? "No Matching Articles" : "No Articles Published"}
          message={isFiltering ? `No articles matched your search query "${queryParam || tagParam}". Try clearing your filters or searching another keyword.` : "No articles are currently published yet."}
          actionText={isFiltering ? "Clear Filters" : "Go to Homepage"}
          actionLink={isFiltering ? "/articles" : "/"}
        />
      )}
    </div>
  );
}
