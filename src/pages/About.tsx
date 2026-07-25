export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 md:px-12 py-16">
      <h1 className="font-serif text-5xl text-agora-dark mb-8 text-center">About Agora</h1>
      
      <div className="bg-agora-card p-10 rounded-2xl border border-agora-border shadow-sm mb-12">
        <h2 className="text-[10px] uppercase tracking-widest font-bold text-agora-accent mb-4">Our Mission</h2>
        <p className="font-serif text-2xl text-agora-dark leading-relaxed mb-6">
          To build a collaborative space for those curious about the world of arts and humanities, breaking down the silos between disciplines.
        </p>
        <div className="space-y-6 text-sm text-agora-muted leading-relaxed">
          <p>
            Agora is a collaborative space for those curious about the world of arts and humanities. Bringing together students, thinkers, and learners from diverse academic backgrounds.
          </p>
          <p>
            Agora connects people with meaningful resources, ideas, and pathways to explore beyond the boundaries of a classroom. From philosophy and psychology to economics, literature, history, and the liberal arts, our platform makes learning more accessible, interdisciplinary, and engaging.
          </p>
          <p>
            Users can also share their own thoughts, insights, and perspectives through blogs, creating a space where everyone can contribute to the conversation. Whether you are here to learn, explore, or express, Agora invites you to question, discover, write, and connect.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-agora-bg border border-agora-border p-8 rounded-xl shadow-sm">
          <h3 className="font-serif text-xl text-agora-dark mb-3">Interdisciplinary Approach</h3>
          <p className="text-sm text-agora-muted">We believe that the most profound insights happen at the intersection of disciplines. Our learning paths connect seemingly disparate fields to reveal the unified tapestry of human knowledge.</p>
        </div>
        <div className="bg-agora-bg border border-agora-border p-8 rounded-xl shadow-sm">
          <h3 className="font-serif text-xl text-agora-dark mb-3">Community-Driven</h3>
          <p className="text-sm text-agora-muted">Learning is not a solitary endeavor. Agora thrives on the diverse perspectives of its members, from seasoned academics to enthusiastic beginners.</p>
        </div>
      </div>
      
      <div className="text-center">
        <h2 className="font-serif text-3xl text-agora-dark mb-6">Join the Conversation</h2>
        <button className="bg-agora-primary text-agora-bg px-8 py-3 rounded-full text-sm font-medium hover:bg-agora-dark transition-colors">Register Today</button>
      </div>
    </div>
  );
}
