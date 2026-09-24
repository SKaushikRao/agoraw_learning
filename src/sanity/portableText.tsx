import React from 'react';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { getSanityImageUrl } from './image';
import { Quote } from 'lucide-react';

interface PortableTextRendererProps {
  value: any;
  className?: string;
}

export const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-sm md:text-base text-agora-dark/90 leading-relaxed mb-6 font-sans">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-agora-dark mt-10 mb-4 tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-xl md:text-2xl font-bold text-agora-dark mt-8 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-serif text-lg font-bold text-agora-dark mt-6 mb-2">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="relative my-8 pl-6 border-l-4 border-agora-accent italic font-serif text-lg text-agora-dark/90 bg-agora-card/60 py-3 pr-4 rounded-r-xl">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-6 text-sm md:text-base text-agora-dark/90 pl-2">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-6 text-sm md:text-base text-agora-dark/90 pl-2 font-medium">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-agora-dark">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline decoration-agora-accent decoration-2 underline-offset-4">{children}</span>,
    code: ({ children }) => (
      <code className="bg-[#EAE3D5] text-[#3A2415] px-1.5 py-0.5 rounded text-xs font-mono">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target ? 'noopener noreferrer' : undefined}
          className="text-agora-accent font-semibold underline hover:text-agora-primary transition-colors inline-flex items-center gap-0.5"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    pteImage: ({ value }) => {
      const imageUrl = getSanityImageUrl(value?.image || value, { width: 1200 });
      if (!imageUrl) return null;

      const layout = value?.layout || 'standard';
      const containerClass =
        layout === 'wide'
          ? 'my-10 -mx-4 md:-mx-12'
          : layout === 'compact'
          ? 'my-8 max-w-lg mx-auto'
          : 'my-8 w-full';

      return (
        <figure className={containerClass}>
          <div className="rounded-2xl overflow-hidden border border-agora-border shadow-md bg-white">
            <img
              src={imageUrl}
              alt={value?.alt || 'Agora educational illustration'}
              className="w-full h-auto object-cover max-h-[500px]"
              loading="lazy"
            />
          </div>
          {value?.caption && (
            <figcaption className="text-xs text-agora-muted text-center mt-2.5 font-serif italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    quote: ({ value }) => {
      const portraitUrl = getSanityImageUrl(value?.image, { width: 120, height: 120 });
      return (
        <div className="my-10 bg-[#FFFDF9] border border-agora-border rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row gap-6 items-center">
          {portraitUrl && (
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden shrink-0 border-2 border-agora-accent shadow-sm">
              <img src={portraitUrl} alt={value?.author || 'Speaker'} className="w-full h-full object-cover" />
            </div>
          )}
          <div className="flex-1 space-y-2 text-center md:text-left">
            <p className="font-serif text-base md:text-lg italic text-agora-dark">
              "{value?.text}"
            </p>
            <div>
              <span className="text-xs font-bold text-agora-primary block">— {value?.author}</span>
              {value?.role && <span className="text-[10px] text-agora-muted uppercase tracking-wider">{value.role}</span>}
            </div>
          </div>
        </div>
      );
    },
  },
};

export default function PortableTextRenderer({ value, className = '' }: PortableTextRendererProps) {
  if (!value || !Array.isArray(value) || value.length === 0) {
    return null;
  }

  return (
    <div className={`prose-agora ${className}`}>
      <PortableText value={value} components={portableTextComponents} />
    </div>
  );
}
