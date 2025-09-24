import NavBar from "./NavBar";
const stories = [
  { id: 1, title: 'Earth Tales', excerpt: 'Short stories inspired by our blue planet.' },
  { id: 2, title: 'Mars Chronicles', excerpt: 'Adventures and discoveries on the red world.' },
  { id: 3, title: 'Giant Echoes', excerpt: 'Tales around the largest worlds.' },
  { id: 4, title: 'Ringed Dreams', excerpt: 'Stories of rings, moons and distant orbits.' }
];

export default function StoryCards() {
  return (
    <>
    <NavBar></NavBar>
    <section className="bg-transparent absolute left-1/5 top-50 cards-section max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl text-white font-semibold mb-8 text-center">Space Stories</h2>
      <div className="cards-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stories.map((s, i) => (
          <article key={s.id} className="story-card bg-white/6 backdrop-blur-md border border-white/8 rounded-2xl p-6 hover:scale-105 transition-transform duration-300 relative overflow-hidden">
            <div className="card-visual">
              <div className="orbit" style={{ ['--i']: i }}>
                <div className="planet" />
              </div>
            </div>

            <div className="card-body mt-4">
              <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
              <p className="text-sm text-white/75">{s.excerpt}</p>
            </div>

            <a className="card-cta absolute inset-0" href={`/stories/${s.id}`} aria-hidden />
          </article>
        ))}
      </div>
    </section>
    </>
  );
}
