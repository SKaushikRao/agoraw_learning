import LearningJourney from '../components/LearningJourney';
import { LEARNING_STEPS } from '../data';

export default function LearningPaths() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
      <h1 className="font-serif text-5xl text-agora-dark mb-4">Learning Paths</h1>
      <p className="text-agora-muted mb-12 max-w-2xl">Structured journeys designed to guide you through complex topics step-by-step.</p>
      
      <div className="mb-16">
        <h3 className="font-serif text-3xl text-agora-dark mb-8">Psychology Fundamentals</h3>
        <LearningJourney steps={LEARNING_STEPS} />
      </div>

      <div className="mb-16">
        <h3 className="font-serif text-3xl text-agora-dark mb-8">Introduction to Philosophy</h3>
        <LearningJourney steps={[
          { id: 1, title: "What is Philosophy?", description: "The study of general and fundamental questions." },
          { id: 2, title: "Ancient Greek Philosophy", description: "Socrates, Plato, and Aristotle." },
          { id: 3, title: "Ethics and Morality", description: "How should we live?" },
          { id: 4, title: "Existentialism", description: "Meaning and personal responsibility." }
        ]} />
      </div>
    </div>
  );
}
