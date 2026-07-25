import SubjectSection from '../components/SubjectSection';
import { ARTICLES_STEP_1, ARTICLES_STEP_2 } from '../data';

export default function Articles() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
      <h1 className="font-serif text-5xl text-agora-dark mb-4">Articles & Resources</h1>
      <p className="text-agora-muted mb-12 max-w-2xl">Read essays, research papers, and insightful articles from educators and thinkers worldwide.</p>
      
      <SubjectSection 
        stepNumber={1}
        title="Featured Reading"
        description="Curated selection of this week's best essays."
        articles={[...ARTICLES_STEP_1, ...ARTICLES_STEP_2].slice(0, 4)}
      />

      <SubjectSection 
        stepNumber={2}
        title="Recent Publications"
        description="The latest additions to our library."
        articles={[...ARTICLES_STEP_2, ...ARTICLES_STEP_1].slice(0, 4)}
      />
    </div>
  );
}
