import { LearningStep } from '../types';
import { ArrowRight } from 'lucide-react';

interface LearningJourneyProps {
  steps: LearningStep[];
}

export default function LearningJourney({ steps }: LearningJourneyProps) {
  return (
    <div className="bg-agora-card rounded-2xl border border-agora-border p-6 shadow-sm mb-16">
      <div className="flex items-center gap-6">
        <span className="text-xs uppercase tracking-widest font-bold text-agora-accent whitespace-nowrap hidden md:block">Journey Map</span>
        <div className="flex-1 flex justify-between items-start md:items-center relative px-4 overflow-x-auto pb-4 md:pb-0 hide-scrollbar gap-8 md:gap-0">
          <div className="absolute h-[1px] bg-agora-border left-4 right-4 top-4 md:top-1/2 -z-0 hidden md:block"></div>
          {steps.map((step, index) => (
            <div key={step.id} className="relative z-10 flex flex-col items-center gap-2 cursor-pointer group min-w-[80px]">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${index === 0 ? 'bg-agora-primary text-agora-bg shadow-sm' : 'bg-agora-bg border border-agora-border text-agora-muted group-hover:border-agora-primary group-hover:text-agora-primary shadow-sm'}`}>
                {step.id}
              </div>
              <span className={`text-[10px] font-medium text-center leading-tight uppercase tracking-wider ${index === 0 ? 'text-agora-primary font-bold' : 'text-agora-muted group-hover:text-agora-primary'}`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
