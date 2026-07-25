export interface Article {
  id: string;
  title: string;
  summary: string;
  author: string;
  source: string;
  readTime: string;
  type: 'article' | 'video' | 'book';
  imageUrl: string;
  tags: string[];
}

export interface LearningStep {
  id: number;
  title: string;
  description: string;
}

export interface RecommendedItem {
  id: string;
  title: string;
  author: string;
  readTime: string;
  imageUrl: string;
}
