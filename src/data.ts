import { Article, LearningStep, RecommendedItem } from './types';

export const LEARNING_STEPS: LearningStep[] = [
  { id: 1, title: "What is Psychology?", description: "Explore the science of mind and behavior." },
  { id: 2, title: "How do We Think?", description: "Discover how cognition shapes our decisions." },
  { id: 3, title: "Emotions and Behavior", description: "Understand emotions, motivation, and behavior." },
  { id: 4, title: "Mental Health", description: "Learn about psychological well-being." },
  { id: 5, title: "Applied Psychology", description: "See how psychology is used in the real world." },
];

export const ARTICLES_STEP_1: Article[] = [
  {
    id: "1",
    title: "What is Psychology?",
    summary: "An introduction to the science of behavior and mind.",
    author: "The School of Life",
    source: "Philosophy",
    readTime: "10 min read",
    type: "video",
    imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=600",
    tags: ["Psychology", "Intro"]
  },
  {
    id: "2",
    title: "The Human Mind",
    summary: "Understanding the complex organ that drives our actions.",
    author: "CrashCourse Psychology",
    source: "Psychology",
    readTime: "12 min read",
    type: "article",
    imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=600",
    tags: ["Mind", "Brain"]
  },
  {
    id: "3",
    title: "Research Methods",
    summary: "How psychologists conduct empirical research.",
    author: "Simply Psychology",
    source: "Psychology",
    readTime: "10 min read",
    type: "article",
    imageUrl: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=600",
    tags: ["Research", "Methods"]
  },
  {
    id: "4",
    title: "Psychological Perspectives",
    summary: "Different schools of thought in modern psychology.",
    author: "Khan Academy",
    source: "Psychology",
    readTime: "13 min read",
    type: "video",
    imageUrl: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=600",
    tags: ["Perspectives", "Theory"]
  }
];

export const ARTICLES_STEP_2: Article[] = [
  {
    id: "5",
    title: "Memory and Learning",
    summary: "How we encode, store, and retrieve information.",
    author: "TED-Ed",
    source: "Cognition",
    readTime: "11 min read",
    type: "article",
    imageUrl: "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?auto=format&fit=crop&q=80&w=600",
    tags: ["Memory", "Learning"]
  },
  {
    id: "6",
    title: "Attention and Perception",
    summary: "How we process sensory information from the world.",
    author: "CrashCourse Psychology",
    source: "Cognition",
    readTime: "12 min read",
    type: "article",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600",
    tags: ["Attention", "Perception"]
  },
  {
    id: "7",
    title: "Problem Solving",
    summary: "Cognitive strategies for overcoming obstacles.",
    author: "Psychology Today",
    source: "Cognition",
    readTime: "10 min read",
    type: "article",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600",
    tags: ["Problem Solving", "Thinking"]
  },
  {
    id: "8",
    title: "Thinking, Fast and Slow",
    summary: "Daniel Kahneman's insights on our two systems of thought.",
    author: "Nobel Prize",
    source: "Behavioral Economics",
    readTime: "12 min read",
    type: "article",
    imageUrl: "https://images.unsplash.com/photo-1473221326025-9183b46be8cb?auto=format&fit=crop&q=80&w=600",
    tags: ["Thinking", "Biases"]
  }
];


export const POPULAR_TOPICS = [
  "Cognitive Psychology", "Development", "Social Psychology", 
  "Personality", "Abnormal Psychology", "Neuroscience", 
  "Behavior Therapy", "Mental Health"
];

export const RECOMMENDED: RecommendedItem[] = [
  {
    id: "r1",
    title: "Thinking Clearly",
    author: "Farnam Street",
    readTime: "8 min",
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead2708?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "r2",
    title: "Emotional Intelligence",
    author: "Daniel Goleman",
    readTime: "20 min",
    imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "r3",
    title: "The Power of Habit",
    author: "Charles Duhigg",
    readTime: "15 min",
    imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "r4",
    title: "Mindset",
    author: "Carol S. Dweck",
    readTime: "10 min",
    imageUrl: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=200"
  }
];
