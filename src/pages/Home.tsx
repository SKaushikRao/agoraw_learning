import Hero from '../components/Hero';
import LearningJourney from '../components/LearningJourney';
import SubjectSection from '../components/SubjectSection';
import Sidebar from '../components/Sidebar';

import { LEARNING_STEPS, ARTICLES_STEP_1, ARTICLES_STEP_2 } from '../data';

export default function Home() {
  return (
    <>
      <Hero />
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 lg:gap-16">
          {/* Main Content Area (Left side) */}
          <div className="xl:col-span-8 2xl:col-span-9 flex flex-col">
            <LearningJourney steps={LEARNING_STEPS} />
            
            <div className="mt-12">
              <SubjectSection 
                stepNumber={1}
                title="What is Psychology?"
                description="Explore the science of mind and behavior."
                articles={ARTICLES_STEP_1}
              />
              
              <SubjectSection 
                stepNumber={2}
                title="How do We Think?"
                description="Discover how cognition shapes our decisions."
                articles={ARTICLES_STEP_2}
              />
            </div>
          </div>
          
          {/* Sidebar Area (Right side) */}
          <div className="xl:col-span-4 2xl:col-span-3">
            <div className="sticky top-24">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
