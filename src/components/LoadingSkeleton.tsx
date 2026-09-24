import React from 'react';

export function CardSkeleton() {
  return (
    <div className="bg-[#FFFDF9] rounded-2xl border border-agora-border overflow-hidden p-4 space-y-4 animate-pulse">
      <div className="bg-[#EAE3D5] rounded-xl h-36 w-full"></div>
      <div className="space-y-2">
        <div className="bg-[#EAE3D5] h-3 w-1/4 rounded"></div>
        <div className="bg-[#EAE3D5] h-5 w-3/4 rounded"></div>
        <div className="bg-[#EAE3D5] h-3 w-full rounded"></div>
      </div>
      <div className="pt-2 border-t border-slate-100 flex justify-between">
        <div className="bg-[#EAE3D5] h-3 w-1/3 rounded"></div>
        <div className="bg-[#EAE3D5] h-3 w-1/4 rounded"></div>
      </div>
    </div>
  );
}

export function SubjectCardSkeleton() {
  return (
    <div className="bg-[#FFFDF9] p-8 rounded-2xl border border-agora-border shadow-sm flex flex-col justify-between h-64 animate-pulse">
      <div className="space-y-4">
        <div className="w-12 h-12 rounded-xl bg-[#EAE3D5]"></div>
        <div className="h-6 bg-[#EAE3D5] rounded w-2/3"></div>
        <div className="space-y-1.5">
          <div className="h-3 bg-[#EAE3D5] rounded w-full"></div>
          <div className="h-3 bg-[#EAE3D5] rounded w-4/5"></div>
        </div>
      </div>
      <div className="h-3 bg-[#EAE3D5] rounded w-1/4 self-end"></div>
    </div>
  );
}

export function PageLoading() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 space-y-8 animate-pulse">
      <div className="h-10 bg-[#EAE3D5] rounded w-1/3"></div>
      <div className="h-4 bg-[#EAE3D5] rounded w-1/2"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  );
}
