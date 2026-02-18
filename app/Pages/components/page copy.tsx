import { girlsData } from "../data/data";
import ProfileCard from "./ProfileCard";
import { Girl } from "../data/types";

interface Props {
  params: Promise<{ city: string }>;
  searchParams: Promise<{ 
    sort?: string; 
    minAge?: string; 
    maxAge?: string;
    search?: string;
    view?: "grid" | "list";
  }>;
}

export default async function LocationPage({ params, searchParams }: Props) {
  const { city } = await params;
  const { sort = 'default', minAge, maxAge, search, view = 'grid' } = await searchParams;

  const decodedCity = decodeURIComponent(city);

  const filteredGirls = girlsData.filter((girl: Girl) => {
    const matchesCity = girl.city.toLowerCase() === decodedCity.toLowerCase();

    const matchesAge = (!minAge || girl.age >= parseInt(minAge)) && 
                       (!maxAge || girl.age <= parseInt(maxAge));
    
    const matchesSearch = !search || 
      girl.name.toLowerCase().includes(search.toLowerCase()) ||
      girl.description?.toLowerCase().includes(search.toLowerCase()) ||
      girl.services?.some(s => s.toLowerCase().includes(search.toLowerCase()));
    
    return matchesCity && matchesAge && matchesSearch;
  });

  if (sort === 'age-asc') {
    filteredGirls.sort((a, b) => a.age - b.age);
  } else if (sort === 'age-desc') {
    filteredGirls.sort((a, b) => b.age - a.age);
  } else if (sort === 'name') {
    filteredGirls.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === 'price-asc') {
    filteredGirls.sort((a, b) => (Number(a.price || 0)) - (Number(b.price || 0)));
  } else if (sort === 'price-desc') {
    filteredGirls.sort((a, b) => (Number(b.price || 0)) - (Number(a.price || 0)));
  }

  const stats = {
    total: filteredGirls.length,
    avgAge: filteredGirls.length > 0 
      ? Math.round(filteredGirls.reduce((sum, g) => sum + g.age, 0) / filteredGirls.length)
      : 0,
    ageRange: filteredGirls.length > 0
      ? {
          min: Math.min(...filteredGirls.map(g => g.age)),
          max: Math.max(...filteredGirls.map(g => g.age))
        }
      : { min: 0, max: 0 },
  };

  return (
    <section className="py-20 max-w-7xl mx-auto px-6">

      <h1 className="text-4xl font-bold mb-4 text-center">
        {decodedCity} Escorts
      </h1>

      {filteredGirls.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-pink-500">{stats.total}</div>
            <div className="text-sm text-gray-400">Total Profiles</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-500">Yes</div>
            <div className="text-sm text-gray-400">Available</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-pink-500">{stats.avgAge}</div>
            <div className="text-sm text-gray-400">Average Age</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-pink-500">
              {stats.ageRange.min}-{stats.ageRange.max}
            </div>
            <div className="text-sm text-gray-400">Age Range</div>
          </div>
        </div>
      )}

      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <form method="get" className="grid md:grid-cols-5 gap-4">

          <div>
            <label className="block text-sm text-gray-400 mb-2">Search</label>
            <input
              type="text"
              name="search"
              defaultValue={search}
              placeholder="Name, services..."
              className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Min Age</label>
            <input
              type="number"
              name="minAge"
              defaultValue={minAge}
              min="18"
              placeholder="18"
              className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Max Age</label>
            <input
              type="number"
              name="maxAge"
              defaultValue={maxAge}
              placeholder="99"
              className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Sort By</label>
            <select
              name="sort"
              defaultValue={sort}
              className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="default">Default</option>
              <option value="name">Name (A-Z)</option>
              <option value="age-asc">Age (Low to High)</option>
              <option value="age-desc">Age (High to Low)</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full px-6 py-2 bg-pink-600 hover:bg-pink-700 rounded-lg font-semibold transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </form>

        <div className="flex gap-2 mt-4 justify-end">
          <a
            href={`?${new URLSearchParams({ ...Object.fromEntries(Object.entries({ sort, minAge, maxAge, search }).filter(([_, v]) => v)), view: 'grid' }).toString()}`}
            className={`px-4 py-2 rounded-lg ${view === 'grid' ? 'bg-pink-600' : 'bg-gray-700'}`}
          >
            Grid View
          </a>
          <a
            href={`?${new URLSearchParams({ ...Object.fromEntries(Object.entries({ sort, minAge, maxAge, search }).filter(([_, v]) => v)), view: 'list' }).toString()}`}
            className={`px-4 py-2 rounded-lg ${view === 'list' ? 'bg-pink-600' : 'bg-gray-700'}`}
          >
            List View
          </a>
        </div>
      </div>

      {filteredGirls.length > 0 ? (
        <div className={
          view === 'list' 
            ? "flex flex-col gap-6" 
            : "grid sm:grid-cols-2 lg:grid-cols-3 gap-10"
        }>
          {filteredGirls.map((girl) => (
            <ProfileCard
              line={false}
              key={girl.id}
              girl={girl}
              viewMode={view as 'grid' | 'list'}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg mb-4">
            No profiles found matching your criteria in {decodedCity}.
          </p>
          <a
            href={`/locations/${city}`}
            className="inline-block px-6 py-2 bg-pink-600 hover:bg-pink-700 rounded-lg transition-colors"
          >
            Clear All Filters
          </a>
        </div>
      )}
    </section>
  );
}