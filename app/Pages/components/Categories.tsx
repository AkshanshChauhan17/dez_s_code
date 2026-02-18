import { categories } from '../data/data';

export default function Categories() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-6">
      <h2 className="text-3xl font-bold mb-12 text-center">Explore Categories</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((c, i) => (
          <div
            key={i}
            className="bg-zinc-900 p-8 rounded-3xl text-center hover:bg-zinc-800 transition"
          >
            <h4 className="text-xl font-semibold mb-2">{c.title}</h4>
            <p className="text-gray-400">{c.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}