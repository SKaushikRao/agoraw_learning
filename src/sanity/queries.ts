// Common fragments for clean reusable queries
export const IMAGE_FRAGMENT = `
  asset->{
    _id,
    url,
    metadata {
      lqip,
      dimensions { width, height, aspectRatio }
    }
  },
  alt,
  caption,
  hotspot,
  crop
`;

export const AUTHOR_FRAGMENT = `
  _id,
  name,
  slug,
  role,
  organization,
  bio,
  website,
  image {
    ${IMAGE_FRAGMENT}
  }
`;

export const CATEGORY_FRAGMENT = `
  _id,
  title,
  slug,
  description,
  badgeColor
`;

export const ARTICLE_CARD_FRAGMENT = `
  _id,
  _type,
  title,
  slug,
  summary,
  type,
  readTime,
  publishedAt,
  order,
  isFeatured,
  author-> {
    ${AUTHOR_FRAGMENT}
  },
  subject-> {
    _id,
    title,
    slug
  },
  categories[]-> {
    ${CATEGORY_FRAGMENT}
  },
  tags,
  coverImage {
    ${IMAGE_FRAGMENT}
  }
`;

export const RESOURCE_CARD_FRAGMENT = `
  _id,
  _type,
  title,
  slug,
  description,
  type,
  url,
  durationOrReadTime,
  order,
  isFeatured,
  author-> {
    ${AUTHOR_FRAGMENT}
  },
  subject-> {
    _id,
    title,
    slug
  },
  tags,
  coverImage {
    ${IMAGE_FRAGMENT}
  }
`;

export const EVENT_FRAGMENT = `
  _id,
  _type,
  title,
  category,
  dateDay,
  dateMonth,
  eventDate,
  time,
  locationOrPlatform,
  link,
  order,
  isFeatured
`;

// Queries

export const GET_HOMEPAGE_QUERY = `
{
  "settings": *[_type == "siteSettings"][0]{
    siteTitle,
    heroHeadline,
    heroSubheadline,
    heroImage {
      ${IMAGE_FRAGMENT}
    },
    aboutSection {
      title,
      content,
      buttonText,
      buttonLink,
      image {
        ${IMAGE_FRAGMENT}
      }
    },
    featuredSubjects[]->{
      _id,
      title,
      slug,
      subtitle,
      aboutText,
      iconType,
      colorTheme,
      bannerImage {
        ${IMAGE_FRAGMENT}
      }
    },
    featuredArticles[]->{
      ${ARTICLE_CARD_FRAGMENT}
    },
    upcomingEvents[]->{
      ${EVENT_FRAGMENT}
    },
    bottomBanner {
      title,
      subtitle,
      buttonText,
      buttonLink
    }
  },
  "fallbackSubjects": *[_type == "subject" && isVisible != false] | order(order asc)[0...4]{
    _id,
    title,
    slug,
    subtitle,
    aboutText,
    iconType,
    colorTheme,
    bannerImage {
      ${IMAGE_FRAGMENT}
    }
  },
  "fallbackArticles": *[_type == "article" && isVisible != false] | order(order asc, publishedAt desc)[0...5]{
    ${ARTICLE_CARD_FRAGMENT}
  },
  "fallbackEvents": *[_type == "event" && isVisible != false] | order(order asc)[0...5]{
    ${EVENT_FRAGMENT}
  }
}
`;

export const GET_SUBJECTS_QUERY = `
*[_type == "subject" && isVisible != false] | order(order asc) {
  _id,
  title,
  slug,
  subtitle,
  aboutText,
  iconType,
  colorTheme,
  order,
  isFeatured,
  stats,
  bannerImage {
    ${IMAGE_FRAGMENT}
  }
}
`;

export const GET_SUBJECT_BY_SLUG_QUERY = `
*[_type == "subject" && slug.current == $slug && isVisible != false][0] {
  _id,
  title,
  slug,
  subtitle,
  aboutText,
  iconType,
  colorTheme,
  stats,
  topics,
  bannerImage {
    ${IMAGE_FRAGMENT}
  },
  quote {
    text,
    author,
    role,
    image {
      ${IMAGE_FRAGMENT}
    }
  },
  learningSteps[] {
    _key,
    stepNumber,
    title,
    description,
    articles[]-> {
      ${ARTICLE_CARD_FRAGMENT}
    },
    resources[]-> {
      ${RESOURCE_CARD_FRAGMENT}
    }
  },
  recommended[]-> {
    _id,
    _type,
    title,
    slug,
    readTime,
    durationOrReadTime,
    author-> {
      ${AUTHOR_FRAGMENT}
    },
    coverImage {
      ${IMAGE_FRAGMENT}
    }
  },
  seo {
    seoTitle,
    seoDescription,
    seoImage {
      ${IMAGE_FRAGMENT}
    }
  }
}
`;

export const GET_LEARNING_PATHS_QUERY = `
*[_type == "learningPath" && isVisible != false] | order(order asc) {
  _id,
  title,
  slug,
  description,
  estimatedDuration,
  order,
  isFeatured,
  subject-> {
    _id,
    title,
    slug
  },
  coverImage {
    ${IMAGE_FRAGMENT}
  },
  steps[] {
    _key,
    stepNumber,
    title,
    description,
    articles[]-> {
      ${ARTICLE_CARD_FRAGMENT}
    }
  }
}
`;

export const GET_LEARNING_PATH_BY_SLUG_QUERY = `
*[_type == "learningPath" && slug.current == $slug && isVisible != false][0] {
  _id,
  title,
  slug,
  description,
  estimatedDuration,
  subject-> {
    _id,
    title,
    slug
  },
  coverImage {
    ${IMAGE_FRAGMENT}
  },
  steps[] {
    _key,
    stepNumber,
    title,
    description,
    articles[]-> {
      ${ARTICLE_CARD_FRAGMENT}
    },
    resources[]-> {
      ${RESOURCE_CARD_FRAGMENT}
    }
  }
}
`;

export const GET_ARTICLES_QUERY = `
*[_type == "article" && isVisible != false] | order(order asc, publishedAt desc) {
  ${ARTICLE_CARD_FRAGMENT}
}
`;

export const GET_COMMUNITY_ARTICLES_QUERY = `
*[_type == "article" && isVisible != false && submissionType == "community"] | order(publishedAt desc) {
  ${ARTICLE_CARD_FRAGMENT}
}
`;

export const GET_ARTICLE_BY_SLUG_QUERY = `
*[_type == "article" && slug.current == $slug && isVisible != false][0] {
  _id,
  title,
  slug,
  summary,
  type,
  videoUrl,
  readTime,
  publishedAt,
  author-> {
    ${AUTHOR_FRAGMENT}
  },
  subject-> {
    _id,
    title,
    slug
  },
  categories[]-> {
    ${CATEGORY_FRAGMENT}
  },
  tags,
  coverImage {
    ${IMAGE_FRAGMENT}
  },
  body[] {
    ...,
    _type == "pteImage" => {
      ...,
      image {
        ${IMAGE_FRAGMENT}
      }
    },
    _type == "quote" => {
      ...,
      image {
        ${IMAGE_FRAGMENT}
      }
    }
  },
  seo {
    seoTitle,
    seoDescription,
    seoImage {
      ${IMAGE_FRAGMENT}
    }
  }
}
`;

export const GET_RESOURCES_QUERY = `
*[_type == "resource" && isVisible != false] | order(order asc) {
  ${RESOURCE_CARD_FRAGMENT}
}
`;

export const GET_EVENTS_QUERY = `
*[_type == "event" && isVisible != false] | order(order asc) {
  ${EVENT_FRAGMENT}
}
`;

export const GET_ARTICLES_BY_SUBJECT_QUERY = `
*[_type == "article" && isVisible != false && subject->slug.current == $slug] | order(order asc, publishedAt desc) {
  ${ARTICLE_CARD_FRAGMENT}
}
`;

export const GET_SEARCH_QUERY = `
{
  "articles": *[_type == "article" && isVisible != false && (title match $query || summary match $query || tags[] match $query)][0...10] {
    ${ARTICLE_CARD_FRAGMENT}
  },
  "subjects": *[_type == "subject" && isVisible != false && (title match $query || subtitle match $query || aboutText match $query)][0...5] {
    _id,
    title,
    slug,
    subtitle,
    iconType,
    bannerImage {
      ${IMAGE_FRAGMENT}
    }
  },
  "resources": *[_type == "resource" && isVisible != false && (title match $query || description match $query || tags[] match $query)][0...5] {
    ${RESOURCE_CARD_FRAGMENT}
  }
}
`;
