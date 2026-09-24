import React from 'react';
import { BookOpen, FolderSearch } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionText?: string;
  actionLink?: string;
  icon?: React.ReactNode;
}

export default function EmptyState({
  title = 'No Content Found',
  message = 'No published content is available in this section yet. Check back soon.',
  actionText,
  actionLink,
  icon,
}: EmptyStateProps) {
  return (
    <div className="bg-[#FFFDF9] border border-agora-border rounded-2xl p-10 md:p-14 text-center my-8 shadow-sm flex flex-col items-center justify-center max-w-xl mx-auto space-y-4">
      <div className="p-4 bg-[#F5EFE4] text-agora-primary rounded-2xl w-fit mb-2">
        {icon || <FolderSearch className="w-8 h-8 text-[#5C3B22]" />}
      </div>
      <h3 className="font-serif text-2xl font-bold text-agora-dark">
        {title}
      </h3>
      <p className="text-xs md:text-sm text-agora-muted leading-relaxed max-w-md">
        {message}
      </p>
      {actionText && actionLink && (
        <div className="pt-2">
          <Link
            to={actionLink}
            className="inline-flex items-center gap-2 bg-[#3A2415] hover:bg-[#5C3B22] text-white text-xs font-semibold px-6 py-2.5 rounded-full transition-colors shadow-sm"
          >
            {actionText}
          </Link>
        </div>
      )}
    </div>
  );
}
