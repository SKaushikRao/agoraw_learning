export type {
  SanityArticle,
  SanityResource,
  SanitySubject,
  SanityLearningPath,
  SanityLearningStep,
  SanityAuthor,
  SanityCategory,
  SanityTag,
  SanityEvent,
  SanitySiteSettings,
  SanityImageReference,
} from './sanity/types';

export interface Article {
  id: string;
  slug?: string;
  title: string;
  summary: string;
  author: string;
  source: string;
  readTime: string;
  type: 'article' | 'video' | 'book' | 'paper';
  imageUrl: string;
  tags: string[];
}

export interface LearningStep {
  id: number;
  title: string;
  description: string;
  articles?: Article[];
}

export interface RecommendedItem {
  id: string;
  slug?: string;
  title: string;
  author: string;
  readTime: string;
  imageUrl: string;
}

export interface SubjectItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon?: any;
  colorTheme?: string;
  bannerImage?: string;
}
