import { Link } from 'react-router-dom';

export default function Subjects() {
  const subjects = [
    { name: "Philosophy", id: "philosophy", desc: "Explore fundamental questions about existence, knowledge, ethics, and reality." },
    { name: "Psychology", id: "psychology", desc: "Study the mind and behavior to understand people and human experiences." },
    { name: "Economics", id: "economics", desc: "Understand how societies produce, distribute, and use resources." },
    { name: "Liberal Arts", id: "liberal-arts", desc: "A broad education that cultivates critical thinking, creativity, and communication." },
    { name: "History", id: "history", desc: "Examine chronological events, historical records, and human developments over time." },
    { name: "Literature", id: "literature", desc: "Study novels, poetry, plays, and various forms of written creative expression." },
    { name: "Sociology", id: "sociology", desc: "Analyze human social relationships, social institutions, and society." }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
      <h1 className="font-serif text-5xl text-agora-dark mb-4">Explore Subjects</h1>
      <p className="text-agora-muted mb-12 max-w-2xl">Dive into the diverse fields of arts and humanities. Choose a discipline below to begin your journey of discovery.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map(subject => {
          const isSimulated = ['philosophy', 'psychology', 'economics', 'liberal-arts'].includes(subject.id || '');
          
          const cardContent = (
            <div className="bg-[#FFFDF9] rounded-xl p-8 border border-agora-border shadow-sm hover:shadow-md transition-all cursor-pointer group h-full flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-2xl font-bold text-agora-dark group-hover:text-agora-accent transition-colors mb-4">{subject.name}</h3>
                <p className="text-xs text-agora-muted leading-relaxed">{subject.desc}</p>
              </div>
              <div className="mt-6 flex justify-between items-center">
                {isSimulated ? (
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wider">Simulated Path</span>
                ) : (
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">General</span>
                )}
                <span className="text-xs font-bold text-[#B78B4A] uppercase tracking-widest border-b border-[#B78B4A] opacity-80 group-hover:opacity-100 transition-opacity">Explore</span>
              </div>
            </div>
          );

          if (isSimulated) {
            return (
              <Link key={subject.name} to={`/subject/${subject.id}`}>
                {cardContent}
              </Link>
            );
          }

          return (
            <div key={subject.name}>
              {cardContent}
            </div>
          );
        })}
      </div>
    </div>
  );
}
