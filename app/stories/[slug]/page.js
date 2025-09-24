import Link from 'next/link';
import StoryCards from '@/components/StoryCards';

export default function StoryDetail({ params }){
  const { slug } = params;
  const titleMap = {
    earth: 'Blue World — Earth',
    mars: 'Red Journey — Mars',
    jupiter: 'Giant Echoes — Jupiter',
    saturn: 'Ringed Dreams — Saturn'
  };

  const title = titleMap[slug] || `Story — ${slug}`;

  return (
    <main className="story-detail container mx-auto px-6 py-12">
      <div className="detail-grid grid grid-cols-1 lg:grid-cols-3 gap-8">
        <article className="col-span-2 bg-white/6 glass p-8 rounded-2xl">
          <header>
            <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>
            <p className="text-sm text-white/60 mb-6">By Stellar Minds • Aug 2025 • {slug}</p>
          </header>

          <section className="prose text-white/90 max-w-none">
            <p>This is a detail layout for the story. Replace this with rich content: images, sections, embedded mini-3D scenes, pull quotes, and more.</p>
            <h3>Abstract</h3>
            <p>Capture the gist of the story here — a short, compelling summary that invites the reader to continue.</p>
            <h3>Chapter 1</h3>
            <p>Start the narrative. Use semantic headings and include images or inline media where helpful.</p>
            <blockquote className="bg-white/4 p-4 rounded-lg mt-4">“Space is not empty; it is full of stories.”</blockquote>
            <p>Finish the article with a short conclusion and further reading links.</p>
          </section>
        </article>

        <aside className="col-span-1">
          <div className="sticky top-20 space-y-6">
            <div className="bg-white/6 glass p-4 rounded-xl text-white">
              <div className="mini-visual h-40 flex items-center justify-center">
                {/* Placeholder for mini 3D/visual or image */}
                <div className="mini-planet w-24 h-24 rounded-full bg-gradient-to-br from-sky-400 to-blue-700 shadow-lg" />
              </div>
              <div className="mt-4 text-sm text-white/80">Quick facts and summary. Click below to explore related stories.</div>
            </div>

           

            <div className="bg-white/6 glass p-4 rounded-xl text-white">
              <h5 className="mb-2">Share</h5>
              <div className="flex gap-2">
                <a className="px-3 py-2 rounded-md bg-blue-600 hover:bg-blue-700" href="#">Twitter</a>
                <a className="px-3 py-2 rounded-md bg-gray-800 hover:bg-gray-900" href="#">Copy Link</a>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
