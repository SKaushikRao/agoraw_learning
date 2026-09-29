import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Calendar, Bookmark, Share2, ArrowLeft, User, BookOpen, Tag } from 'lucide-react';
import { sanityFetch } from '../sanity/client';
import { GET_ARTICLE_BY_SLUG_QUERY, GET_ARTICLES_QUERY } from '../sanity/queries';
import { SanityArticle } from '../sanity/types';
import { getSanityImageUrl } from '../sanity/image';
import PortableTextRenderer from '../sanity/portableText';
import EmptyState from '../components/EmptyState';
import { PageLoading } from '../components/LoadingSkeleton';

export default function ArticleDetail() {
  const { slug = '' } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<SanityArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<SanityArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    sanityFetch<SanityArticle>(GET_ARTICLE_BY_SLUG_QUERY, { slug })
      .then((data) => {
        if (isMounted) {
          setArticle(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load article from Sanity:', err);
        if (isMounted) setLoading(false);
      });

    // Fetch related articles
    sanityFetch<SanityArticle[]>(GET_ARTICLES_QUERY).then((allArticles) => {
      if (isMounted && allArticles) {
        setRelatedArticles(allArticles.filter((a) => a.slug?.current !== slug).slice(0, 3));
      }
    });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return <PageLoading />;
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        <EmptyState
          title="Article Not Found"
          message={`The article "${slug}" could not be found or has not been published yet.`}
          actionText="Back to Articles"
          actionLink="/articles"
        />
      </div>
    );
  }

  const coverImageUrl = getSanityImageUrl(article.coverImage, { width: 1200, height: 600 });
  const authorAvatar = getSanityImageUrl(article.author?.image, { width: 100, height: 100 });
  const publishedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  // Handle community submissions vs editorial articles
  const isCommunitySubmission = article.submissionType === 'community';
  const displayName = isCommunitySubmission ? article.submitterName : article.author?.name;
  const displayRole = isCommunitySubmission ? 'Community Contributor' : article.author?.role;
  const displayOrganization = isCommunitySubmission ? null : article.author?.organization;

  return (
    <article className="min-h-screen bg-[#F8F4EE] text-agora-dark py-12">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-xs font-semibold text-agora-primary hover:text-agora-accent transition-colors"
          >
            <ArrowLeft size={16} /> Back to all articles
          </Link>
        </div>

        {/* Article Header */}
        <header className="space-y-6 mb-10">
          <div className="flex flex-wrap items-center gap-2">
            {article.subject && (
              <Link
                to={`/subject/${article.subject.slug?.current || article.subject._id}`}
                className="px-3 py-1 bg-[#EAE3D5] text-agora-primary font-bold text-[10px] uppercase tracking-wider rounded-full hover:bg-agora-primary hover:text-white transition-colors"
              >
                {article.subject.title}
              </Link>
            )}
            {article.categories?.map((cat) => (
              <span
                key={cat._id}
                className="px-3 py-1 bg-white border border-agora-border text-agora-accent font-bold text-[10px] uppercase tracking-wider rounded-full"
              >
                {cat.title}
              </span>
            ))}
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-agora-dark tracking-tight leading-[1.15]">
            {article.title}
          </h1>

          {article.summary && (
            <p className="font-serif text-lg md:text-xl text-agora-dark/80 italic leading-relaxed">
              {article.summary}
            </p>
          )}

          {/* Author & Meta Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-b border-agora-border py-4">
            <div className="flex items-center gap-3">
              {!isCommunitySubmission && authorAvatar ? (
                <div className="w-12 h-12 rounded-full overflow-hidden border border-agora-border bg-white shrink-0">
                  <img src={authorAvatar} alt={displayName || 'Author'} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#EAE3D5] text-agora-primary flex items-center justify-center font-serif font-bold text-lg shrink-0">
                  {displayName?.[0] || 'A'}
                </div>
              )}
              <div>
                <h4 className="text-sm font-bold text-agora-dark">
                  {displayName || 'Agora Contributor'}
                </h4>
                <p className="text-[11px] text-agora-muted">
                  {[displayRole, displayOrganization].filter(Boolean).join(' • ') || 'Academic Scholar'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-agora-muted">
              {publishedDate && (
                <span className="flex items-center gap-1">
                  <Calendar size={14} /> {publishedDate}
                </span>
              )}
              {article.readTime && (
                <span className="flex items-center gap-1">
                  <Clock size={14} /> {article.readTime}
                </span>
              )}
              <button 
                onClick={() => alert('Article bookmarked to your reading list!')}
                className="p-2 hover:bg-white rounded-full transition-colors text-agora-dark"
                title="Bookmark"
              >
                <Bookmark size={16} />
              </button>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {coverImageUrl && (
          <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-md border border-agora-border mb-12 bg-white">
            <img
              src={coverImageUrl}
              alt={article.coverImage?.alt || article.title}
              className="w-full h-full object-cover"
            />
            {article.coverImage?.caption && (
              <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-xs px-4 py-2 text-center backdrop-blur-sm">
                {article.coverImage.caption}
              </div>
            )}
          </div>
        )}

        {/* Video Player if video article */}
        {article.type === 'video' && article.videoUrl && (
          <div className="mb-12 aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-lg border border-agora-border bg-black">
            <iframe
              src={article.videoUrl.replace('watch?v=', 'embed/')}
              title={article.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {/* Article Body (Rich Text Portable Text) */}
        <div className="bg-[#FFFDF9] rounded-3xl p-8 md:p-14 border border-agora-border shadow-sm mb-12">
          {article.body && article.body.length > 0 ? (
            <PortableTextRenderer value={article.body} />
          ) : (
            <p className="text-agora-muted italic text-sm">
              This essay is currently undergoing editorial review. Content will appear here once finalized.
            </p>
          )}

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-agora-muted flex items-center gap-1 mr-2">
                <Tag size={14} /> Tags:
              </span>
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/articles?tag=${encodeURIComponent(tag)}`}
                  className="text-xs font-semibold px-3 py-1 bg-[#F5EFE4] text-agora-primary rounded-full hover:bg-agora-primary hover:text-white transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Author Bio Card - only for editorial articles with author bio */}
        {!isCommunitySubmission && article.author?.bio && (
          <div className="bg-[#FFFDF9] rounded-2xl p-8 border border-agora-border shadow-sm mb-16 flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
            {authorAvatar ? (
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-agora-accent shrink-0">
                <img src={authorAvatar} alt={displayName} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full bg-[#EAE3D5] text-agora-primary flex items-center justify-center font-serif font-bold text-2xl shrink-0">
                {displayName?.[0] || 'A'}
              </div>
            )}
            <div className="space-y-2">
              <h3 className="font-serif text-xl font-bold text-agora-dark">About {displayName}</h3>
              <p className="text-xs md:text-sm text-agora-muted leading-relaxed">{article.author.bio}</p>
              {article.author.website && (
                <a
                  href={article.author.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-agora-accent hover:underline inline-block pt-1"
                >
                  Visit Author Website →
                </a>
              )}
            </div>
          </div>
        )}

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="space-y-6">
            <h3 className="font-serif text-3xl font-bold text-agora-dark">More to Explore</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => {
                const relSlug = rel.slug?.current || rel._id;
                const relImg = getSanityImageUrl(rel.coverImage, { width: 400, height: 260 });
                return (
                  <Link
                    key={rel._id}
                    to={`/article/${relSlug}`}
                    className="bg-[#FFFDF9] rounded-2xl border border-agora-border overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between"
                  >
                    <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden">
                      {relImg ? (
                        <img src={relImg} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full bg-[#EAE3D5] flex items-center justify-center font-serif text-agora-primary font-bold">Agora</div>
                      )}
                    </div>
                    <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                      <h4 className="font-serif text-sm font-bold text-agora-dark group-hover:text-[#5C3B22] transition-colors line-clamp-2">
                        {rel.title}
                      </h4>
                      <div className="pt-2 border-t border-slate-50 text-[10px] text-agora-muted flex justify-between">
                        <span>{rel.author?.name || 'Agora'}</span>
                        <span>{rel.readTime || '5 min'}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </article>
  );
}
