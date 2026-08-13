import { Article, LearningStep, RecommendedItem } from './types';

export interface SubjectData {
  id: string;
  name: string;
  subtitle: string;
  aboutText: string;
  stats: {
    paths: string;
    resources: string;
    articles: string;
    videos: string;
  };
  topics: string[];
  learningSteps: (LearningStep & { articles: Article[] })[];
  recommended: RecommendedItem[];
  quote: {
    text: string;
    author: string;
    image: string;
  };
  bannerImage: string;
  illustrationImage: string;
}

export const SUBJECTS_DATA: Record<string, SubjectData> = {
  psychology: {
    id: "psychology",
    name: "Psychology",
    subtitle: "Understand the mind, behavior, and emotions. Improve well-being and build meaningful connections.",
    aboutText: "Welcome to the Psychology section. This section is designed for anyone curious about the human mind and behavior, from newcomers exploring the field to university students seeking a deeper dive. Here, we discuss the myriad branches of psychology, covering Cognitive Psychology, Developmental Psychology, Social Psychology, Clinical Psychology, Personality Psychology, Biological Psychology, Educational Psychology, Industrial-Organizational Psychology, Counseling Psychology, Cross-Cultural Psychology and Forensic Psychology. Along the way, we examine influential psychological theories, classic and contemporary research, and real-world applications. Each topic features carefully curated books, articles, videos, and additional resources to help your exploration of psychology.",
    stats: {
      paths: "10",
      resources: "100+",
      articles: "70+",
      videos: "50+"
    },
    topics: [
      "Cognitive Psychology", "Development", "Social Psychology",
      "Personality", "Abnormal Psychology", "Neuroscience",
      "Behavior Therapy", "Mental Health"
    ],
    bannerImage: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800",
    illustrationImage: "brain",
    quote: {
      text: "Knowing yourself is the beginning of all wisdom.",
      author: "Aristotle",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=200"
    },
    recommended: [
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
    ],
    learningSteps: [
      {
        id: 1,
        title: "What is Psychology?",
        description: "Explore the science of mind and behavior.",
        articles: [
          {
            id: "psy-1-1",
            title: "What is Psychology?",
            summary: "An introduction to the science of behavior and mind.",
            author: "The School of Life",
            source: "Psychology",
            readTime: "10 min read",
            type: "video",
            imageUrl: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=400",
            tags: ["Intro", "Behavior"]
          },
          {
            id: "psy-1-2",
            title: "The Human Mind",
            summary: "Understanding the complex organ that drives our actions.",
            author: "CrashCourse Psychology",
            source: "Psychology",
            readTime: "12 min read",
            type: "article",
            imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=400",
            tags: ["Mind", "Brain"]
          },
          {
            id: "psy-1-3",
            title: "Research Methods",
            summary: "How psychologists conduct empirical research.",
            author: "Simply Psychology",
            source: "Psychology",
            readTime: "10 min read",
            type: "article",
            imageUrl: "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?auto=format&fit=crop&q=80&w=400",
            tags: ["Research", "Method"]
          },
          {
            id: "psy-1-4",
            title: "Psychological Perspectives",
            summary: "Different schools of thought in modern psychology.",
            author: "Khan Academy",
            source: "Psychology",
            readTime: "13 min read",
            type: "video",
            imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400",
            tags: ["Theory", "Perspectives"]
          }
        ]
      },
      {
        id: 2,
        title: "How do We Think?",
        description: "Discover how cognition shapes our decisions.",
        articles: [
          {
            id: "psy-2-1",
            title: "Memory and Learning",
            summary: "How we encode, store, and retrieve information.",
            author: "TED-Ed",
            source: "Cognition",
            readTime: "11 min read",
            type: "article",
            imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400",
            tags: ["Memory", "Learning"]
          },
          {
            id: "psy-2-2",
            title: "Attention and Perception",
            summary: "How we process sensory information from the world.",
            author: "CrashCourse Psychology",
            source: "Cognition",
            readTime: "12 min read",
            type: "article",
            imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400",
            tags: ["Attention", "Perception"]
          },
          {
            id: "psy-2-3",
            title: "Problem Solving",
            summary: "Cognitive strategies for overcoming obstacles.",
            author: "Psychology Today",
            source: "Cognition",
            readTime: "10 min read",
            type: "article",
            imageUrl: "https://images.unsplash.com/photo-1473221326025-9183b46be8cb?auto=format&fit=crop&q=80&w=400",
            tags: ["Problem Solving", "Thinking"]
          },
          {
            id: "psy-2-4",
            title: "Thinking, Fast and Slow",
            summary: "Daniel Kahneman's insights on our two systems of thought.",
            author: "Nobel Prize",
            source: "Behavioral Economics",
            readTime: "12 min read",
            type: "article",
            imageUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&q=80&w=400",
            tags: ["Biases", "Decisions"]
          }
        ]
      },
      {
        id: 3,
        title: "Emotions and Behavior",
        description: "Understand emotions, motivation, and behavior.",
        articles: [
          {
            id: "psy-3-1",
            title: "What Are Emotions?",
            summary: "Analyzing the physiological and psychological triggers.",
            author: "Greater Good Science",
            source: "Emotions",
            readTime: "11 min read",
            type: "article",
            imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
            tags: ["Emotions", "Feelings"]
          },
          {
            id: "psy-3-2",
            title: "Motivation Explained",
            summary: "Intrinsics vs extrinsics and how it drives behavior.",
            author: "Khan Academy",
            source: "Emotions",
            readTime: "10 min read",
            type: "video",
            imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400",
            tags: ["Motivation", "Drive"]
          },
          {
            id: "psy-3-3",
            title: "Stress and Coping",
            summary: "Effective scientific methods for managing pressure.",
            author: "PsychoCentral",
            source: "Emotions",
            readTime: "11 min read",
            type: "article",
            imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400",
            tags: ["Stress", "Mental Health"]
          },
          {
            id: "psy-3-4",
            title: "Habits and Behavior",
            summary: "The loop of cue, routine, and reward.",
            author: "TED",
            source: "Emotions",
            readTime: "12 min read",
            type: "video",
            imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400",
            tags: ["Habits", "Routine"]
          }
        ]
      }
    ]
  },
  philosophy: {
    id: "philosophy",
    name: "Philosophy",
    subtitle: "Explore fundamental questions about existence, knowledge, ethics, values, and reality.",
    aboutText: "Welcome to the Philosophy section. This section aims to introduce Philosophy for general audience as well as university students. In this section, we explore the diverse domains of philosophy that includes Axiology, Teleology, Metaphysics, Epistemology, Aesthetics, Logic, and many other branches. Users will find curated reading lists, videos, and articles for each domain to support their learning journey.",
    stats: {
      paths: "12",
      resources: "120+",
      articles: "90+",
      videos: "60+"
    },
    topics: [
      "Axiology", "Teleology", "Metaphysics", "Epistemology",
      "Aesthetics", "Logic", "Ethics", "Political Philosophy"
    ],
    bannerImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
    illustrationImage: "temple",
    quote: {
      text: "The unexamined life is not worth living.",
      author: "Socrates",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=200"
    },
    recommended: [
      {
        id: "phil-r1",
        title: "Meditations",
        author: "Marcus Aurelius",
        readTime: "15 min",
        imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=200"
      },
      {
        id: "phil-r2",
        title: "Beyond Good and Evil",
        author: "Friedrich Nietzsche",
        readTime: "25 min",
        imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=200"
      }
    ],
    learningSteps: [
      {
        id: 1,
        title: "Axiology & Ethics",
        description: "Explore the nature of values and moral judgments.",
        articles: [
          {
            id: "phil-1-1",
            title: "What is Axiology?",
            summary: "A study of value, ethics, and aesthetics.",
            author: "Yale University",
            source: "Philosophy",
            readTime: "11 min read",
            type: "video",
            imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead2708?auto=format&fit=crop&q=80&w=400",
            tags: ["Values", "Ethics"]
          },
          {
            id: "phil-1-2",
            title: "The Good Life",
            summary: "Aristotelian ethics and human flourishing.",
            author: "Harvard University",
            source: "Philosophy",
            readTime: "12 min read",
            type: "article",
            imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400",
            tags: ["Virtue", "Happiness"]
          }
        ]
      }
    ]
  },
  economics: {
    id: "economics",
    name: "Economics",
    subtitle: "Understand how wealth is created, distributed, and managed across local and global scales.",
    aboutText: "Welcome to the Economics section. This section aims to introduce Economics to a general audience as well as university students. Here, we explore the diverse domains of economic study, including Microeconomics, Macroeconomics, International Economics, Political Economy, Public Economics, Game Theory, Financial Economics, the History of Economic Thought, Behavioral Economics, and Economic History. Users will find curated reading lists, videos, and articles for each domain to support their learning journey.",
    stats: {
      paths: "8",
      resources: "80+",
      articles: "60+",
      videos: "40+"
    },
    topics: [
      "Microeconomics", "Macroeconomics", "Game Theory", "Behavioral Economics",
      "Political Economy", "Financial Economics", "Economic History"
    ],
    bannerImage: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&q=80&w=800",
    illustrationImage: "chart",
    quote: {
      text: "The real price of everything is the toil and trouble of acquiring it.",
      author: "Adam Smith",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=200"
    },
    recommended: [
      {
        id: "econ-r1",
        title: "Freakonomics",
        author: "Steven Levitt",
        readTime: "12 min",
        imageUrl: "https://images.unsplash.com/photo-1473221326025-9183b46be8cb?auto=format&fit=crop&q=80&w=200"
      }
    ],
    learningSteps: [
      {
        id: 1,
        title: "Principles of Markets",
        description: "Supply, demand, and how market structures guide human choice.",
        articles: [
          {
            id: "econ-1-1",
            title: "Intro to Economics",
            summary: "Scarcity and decision making.",
            author: "CrashCourse Economics",
            source: "Economics",
            readTime: "10 min read",
            type: "video",
            imageUrl: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&q=80&w=400",
            tags: ["Scarcity", "Markets"]
          }
        ]
      }
    ]
  },
  "liberal-arts": {
    id: "liberal-arts",
    name: "Liberal Arts",
    subtitle: "Explore ideas across disciplines. Cultivate perspective, creativity, and critical thinking.",
    aboutText: "Welcome to the Liberal Arts section, a space designed for those willing to explore and delve into the world of multi-disciplinary and inter-disciplinary studies. This section shows the various disciplines which otherwise wouldn't be considered to be even remotely related to one another and how they work in harmony as Liberal Arts. The section includes resources for core disciplines of Liberal Arts such as Critical Thinking, History of Ideas, Principles of Liberal Arts, and ranges as wide as Economics, Psychology, International Relations, Performative Arts and so on. The resources are universal and available to students from various disciplines to expand their knowledge bases.",
    stats: {
      paths: "12",
      resources: "120+",
      articles: "90+",
      videos: "60+"
    },
    topics: [
      "History", "Philosophy", "Literature", "Art History",
      "Writing", "Ethics", "Culture", "Politics"
    ],
    bannerImage: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=800",
    illustrationImage: "book-art",
    quote: {
      text: "The mind is not a vessel to be filled, but a fire to be kindled.",
      author: "Plutarch",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=200"
    },
    recommended: [
      {
        id: "la-r1",
        title: "Sapiens: A Brief History of Humankind",
        author: "Yuval Noah Harari",
        readTime: "20 min",
        imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead2708?auto=format&fit=crop&q=80&w=200"
      },
      {
        id: "la-r2",
        title: "The Story of Art",
        author: "E. H. Gombrich",
        readTime: "18 min",
        imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=200"
      },
      {
        id: "la-r3",
        title: "How to Read a Book",
        author: "Mortimer J. Adler",
        readTime: "15 min",
        imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=200"
      },
      {
        id: "la-r4",
        title: "The Great Conversation",
        author: "The School of Life",
        readTime: "12 min",
        imageUrl: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=200"
      }
    ],
    learningSteps: [
      {
        id: 1,
        title: "The Big Picture",
        description: "Discover how ideas and culture shape the world.",
        articles: [
          {
            id: "la-1-1",
            title: "What is Liberal Arts?",
            summary: "A holistic approach to education.",
            author: "Yale University",
            source: "Liberal Arts",
            readTime: "11 min read",
            type: "video",
            imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=400",
            tags: ["Interdisciplinary", "Education"]
          },
          {
            id: "la-1-2",
            title: "The Value of a Liberal Arts Education",
            summary: "Why broad knowledge is critical in the modern age.",
            author: "Harvard University",
            source: "Liberal Arts",
            readTime: "12 min read",
            type: "article",
            imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=400",
            tags: ["Growth", "Value"]
          },
          {
            id: "la-1-3",
            title: "How We Think Critically",
            summary: "Logical frameworks and reasoning methods.",
            author: "The School of Life",
            source: "Liberal Arts",
            readTime: "10 min read",
            type: "video",
            imageUrl: "https://images.unsplash.com/photo-1473221326025-9183b46be8cb?auto=format&fit=crop&q=80&w=400",
            tags: ["Logic", "Mind"]
          },
          {
            id: "la-1-4",
            title: "Asking Better Questions",
            summary: "Socratic questioning techniques.",
            author: "Farnam Street",
            source: "Liberal Arts",
            readTime: "13 min read",
            type: "article",
            imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead2708?auto=format&fit=crop&q=80&w=400",
            tags: ["Socrates", "Inquiry"]
          }
        ]
      },
      {
        id: 2,
        title: "History & Civilization",
        description: "Learn from the past to understand the present.",
        articles: [
          {
            id: "la-2-1",
            title: "Histories of Ancient Civilizations",
            summary: "The origins of human societies and institutions.",
            author: "Khan Academy",
            source: "History",
            readTime: "12 min read",
            type: "video",
            imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400",
            tags: ["History", "Antiquity"]
          },
          {
            id: "la-2-2",
            title: "The Renaissance",
            summary: "How a cultural movement changed human perspective.",
            author: "The School of Life",
            source: "History",
            readTime: "11 min read",
            type: "article",
            imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400",
            tags: ["Art", "Renaissance"]
          },
          {
            id: "la-2-3",
            title: "The Age of Revolutions",
            summary: "From industrialization to democratic transitions.",
            author: "Stanford Online",
            source: "History",
            readTime: "12 min read",
            type: "video",
            imageUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&q=80&w=400",
            tags: ["Industry", "Revolution"]
          },
          {
            id: "la-2-4",
            title: "Modern World History",
            summary: "Interconnected dynamics of the 20th century.",
            author: "BBC Ideas",
            source: "History",
            readTime: "10 min read",
            type: "video",
            imageUrl: "https://images.unsplash.com/photo-1473221326025-9183b46be8cb?auto=format&fit=crop&q=80&w=400",
            tags: ["20th Century", "Global"]
          }
        ]
      },
      {
        id: 3,
        title: "Literature & Writing",
        description: "Explore stories, texts, and the art of writing.",
        articles: [
          {
            id: "la-3-1",
            title: "How to Read Literature",
            summary: "A guide to analyzing literary texts.",
            author: "The Great Courses",
            source: "Literature",
            readTime: "10 min read",
            type: "article",
            imageUrl: "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?auto=format&fit=crop&q=80&w=400",
            tags: ["Analysis", "Books"]
          },
          {
            id: "la-3-2",
            title: "Shakespeare Explained",
            summary: "The themes and language of the Bard.",
            author: "TED-Ed",
            source: "Literature",
            readTime: "11 min read",
            type: "video",
            imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400",
            tags: ["Drama", "Shakespeare"]
          },
          {
            id: "la-3-3",
            title: "Creative Writing Basics",
            summary: "Developing character, plot, and setting.",
            author: "Reedsy",
            source: "Literature",
            readTime: "9 min read",
            type: "article",
            imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400",
            tags: ["Writing", "Craft"]
          },
          {
            id: "la-3-4",
            title: "The Power of Storytelling",
            summary: "How narrative structure hooks the brain.",
            author: "RSA",
            source: "Literature",
            readTime: "12 min read",
            type: "video",
            imageUrl: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=400",
            tags: ["Narrative", "Neuroscience"]
          }
        ]
      }
    ]
  }
};

export const LEARNING_STEPS = SUBJECTS_DATA.psychology.learningSteps.map(step => ({
  id: step.id,
  title: step.title,
  description: step.description
}));

export const ARTICLES_STEP_1 = SUBJECTS_DATA.psychology.learningSteps[0].articles;
export const ARTICLES_STEP_2 = SUBJECTS_DATA.psychology.learningSteps[1].articles;
export const POPULAR_TOPICS = SUBJECTS_DATA.psychology.topics;
export const RECOMMENDED = SUBJECTS_DATA.psychology.recommended;
