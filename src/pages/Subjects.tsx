export default function Subjects() {
  const subjects = [
    "Psychology", "Philosophy", "Economics", "History", "Literature", 
    "Political Science", "Anthropology", "Sociology", "Liberal Arts", 
    "Religious Studies", "Ethics", "Culture", "Communication"
  ];
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
      <h1 className="font-serif text-5xl text-agora-dark mb-4">Explore Subjects</h1>
      <p className="text-agora-muted mb-12 max-w-2xl">Dive into the diverse fields of arts and humanities. Choose a discipline below to begin your journey of discovery.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map(subject => (
          <div key={subject} className="bg-agora-card rounded-xl p-8 border border-agora-border shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            <h3 className="font-serif text-2xl font-bold text-agora-dark group-hover:text-agora-accent transition-colors mb-4">{subject}</h3>
            <p className="text-sm text-agora-muted line-clamp-2">Explore fundamental concepts, historical perspectives, and contemporary issues within {subject.toLowerCase()}.</p>
            <div className="mt-6 flex justify-end">
              <span className="text-xs font-bold text-agora-accent uppercase tracking-widest border-b border-agora-accent opacity-0 group-hover:opacity-100 transition-opacity">Explore</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
