export interface SanityImageReference {
  _type?: 'image';
  asset?: {
    _ref?: string;
    _id?: string;
    url?: string;
    metadata?: {
      lqip?: string;
      dimensions?: {
        width: number;
        height: number;
        aspectRatio: number;
      };
    };
  };
  alt?: string;
  caption?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export interface SanityAuthor {
  _id: string;
  _type: 'author';
  name: string;
  slug?: { current: string };
  role?: string;
  organization?: string;
  image?: SanityImageReference;
  bio?: string;
  website?: string;
}

export interface SanityCategory {
  _id: string;
  _type: 'category';
  title: string;
  slug?: { current: string };
  description?: string;
  badgeColor?: string;
}

export interface SanityTag {
  _id: string;
  _type: 'tag';
  title: string;
  slug?: { current: string };
}

export interface SanityArticle {
  _id: string;
  _type: 'article';
  title: string;
  slug?: { current: string };
  summary?: string;
  type?: 'article' | 'video' | 'book' | 'paper';
  videoUrl?: string;
  author?: SanityAuthor;
  subject?: {
    _id: string;
    title: string;
    slug?: { current: string };
  };
  categories?: SanityCategory[];
  tags?: string[];
  coverImage?: SanityImageReference;
  readTime?: string;
  publishedAt?: string;
  order?: number;
  isFeatured?: boolean;
  isVisible?: boolean;
  submissionType?: 'editorial' | 'community';
  submitterName?: string;
  submitterEmail?: string;
  body?: any[];
  seo?: {
    seoTitle?: string;
    seoDescription?: string;
    seoImage?: SanityImageReference;
  };
}

export interface SanityResource {
  _id: string;
  _type: 'resource';
  title: string;
  slug?: { current: string };
  description?: string;
  type?: 'article' | 'video' | 'book' | 'paper' | 'course' | 'podcast' | 'website' | 'pdf';
  url?: string;
  coverImage?: SanityImageReference;
  author?: SanityAuthor;
  subject?: {
    _id: string;
    title: string;
    slug?: { current: string };
  };
  durationOrReadTime?: string;
  tags?: string[];
  order?: number;
  isFeatured?: boolean;
  isVisible?: boolean;
}

export interface SanityLearningStep {
  _key?: string;
  stepNumber: number;
  title: string;
  description?: string;
  articles?: SanityArticle[];
  resources?: SanityResource[];
}

export interface SanitySubject {
  _id: string;
  _type: 'subject';
  title: string;
  slug?: { current: string };
  subtitle?: string;
  aboutText?: string;
  iconType?: string;
  colorTheme?: 'space-cadet' | 'warm-brown' | 'golden-ochre';
  bannerImage?: SanityImageReference;
  stats?: {
    paths?: string;
    resources?: string;
    articles?: string;
    videos?: string;
  };
  topics?: string[];
  learningSteps?: SanityLearningStep[];
  recommended?: (SanityArticle | SanityResource)[];
  quote?: {
    text: string;
    author: string;
    role?: string;
    image?: SanityImageReference;
  };
  order?: number;
  isFeatured?: boolean;
  isVisible?: boolean;
}

export interface SanityLearningPath {
  _id: string;
  _type: 'learningPath';
  title: string;
  slug?: { current: string };
  description?: string;
  subject?: SanitySubject;
  coverImage?: SanityImageReference;
  estimatedDuration?: string;
  steps?: SanityLearningStep[];
  order?: number;
  isFeatured?: boolean;
  isVisible?: boolean;
}

export interface SanityEvent {
  _id: string;
  _type: 'event';
  title: string;
  category?: string;
  dateDay?: string;
  dateMonth?: string;
  eventDate?: string;
  time?: string;
  locationOrPlatform?: string;
  link?: string;
  order?: number;
  isFeatured?: boolean;
  isVisible?: boolean;
}

export interface SanitySiteSettings {
  _id: string;
  _type: 'siteSettings';
  siteTitle?: string;
  heroHeadline?: string;
  heroSubheadline?: string;
  heroImage?: SanityImageReference;
  featuredSubjects?: SanitySubject[];
  aboutSection?: {
    title?: string;
    content?: string;
    image?: SanityImageReference;
    buttonText?: string;
    buttonLink?: string;
  };
  featuredArticles?: SanityArticle[];
  upcomingEvents?: SanityEvent[];
  bottomBanner?: {
    title?: string;
    subtitle?: string;
    buttonText?: string;
    buttonLink?: string;
  };
}
