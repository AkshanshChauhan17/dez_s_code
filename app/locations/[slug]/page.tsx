import { girlsData, locations } from "../../Pages/data/data";
import ProfileCard from "../../Pages/components/ProfileCard";
import { Girl } from "../../Pages/data/types";
import PopularLocations from "@/app/Pages/components/PopularLocations";

import type { Metadata } from "next";
import DualContentSection from "@/app/Pages/components/LeftRightText";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {

  const { slug } = await params;

  const location = locations.find((l) => l.slug === slug);

  if (!location) {
    return {
      title: "Location Not Found",
    };
  }

  return {
    title: location.metaTitle,
    description: location.metaDescription,

    alternates: {
      canonical: location.canonical,
    },

    openGraph: {
      title: location.metaTitle,
      description: location.metaDescription,
      url: location.canonical,
      type: "website",
    },
  };
}

export function generateStaticParams() {
  return locations.map((loc) => ({
    slug: loc.slug,
  }));
}

interface Props {
  params: Promise<{ slug: string }>; // ✅ FIX
  searchParams: {
    sort?: string;
    minAge?: string;
    maxAge?: string;
    search?: string;
    view?: "grid" | "list";
  };
}

export default async function LocationPage({ params, searchParams }: Props) {
  // ✅ UNWRAP params
  const { slug } = await params;

  const location = locations.find((l) => l.slug === slug);

  if (!location) {
    return (
      <section className="py-20 text-center">
        <h1 className="text-3xl font-bold">Location not found</h1>
      </section>
    );
  }

  const city = location.city;

  const {
    sort = "default",
    minAge,
    maxAge,
    search,
    view = "grid",
  } = searchParams;

  /* ================= FILTER ================= */
  const filteredGirls = girlsData.filter((girl: Girl) => {
    const matchesCity = girl.city === city;

    const matchesAge =
      (!minAge || girl.age >= Number(minAge)) &&
      (!maxAge || girl.age <= Number(maxAge));

    const matchesSearch =
      !search ||
      girl.name.toLowerCase().includes(search.toLowerCase()) ||
      girl.description.toLowerCase().includes(search.toLowerCase()) ||
      girl.services.some((s) =>
        s.toLowerCase().includes(search.toLowerCase())
      );

    return matchesCity && matchesAge && matchesSearch;
  });

  /* ================= SORT ================= */
  if (sort === "age-asc") filteredGirls.sort((a, b) => a.age - b.age);
  if (sort === "age-desc") filteredGirls.sort((a, b) => b.age - a.age);
  if (sort === "name") filteredGirls.sort((a, b) => a.name.localeCompare(b.name));
  if (sort === "price-asc")
    filteredGirls.sort(
      (a, b) =>
        Number(a.price.replace(/\D/g, "")) -
        Number(b.price.replace(/\D/g, ""))
    );
  if (sort === "price-desc")
    filteredGirls.sort(
      (a, b) =>
        Number(b.price.replace(/\D/g, "")) -
        Number(a.price.replace(/\D/g, ""))
    );

  /* ================= STATS ================= */
  const stats = {
    total: filteredGirls.length,
    avgAge:
      filteredGirls.length > 0
        ? Math.round(
            filteredGirls.reduce((sum, g) => sum + g.age, 0) /
              filteredGirls.length
          )
        : 0,
    ageRange:
      filteredGirls.length > 0
        ? {
            min: Math.min(...filteredGirls.map((g) => g.age)),
            max: Math.max(...filteredGirls.map((g) => g.age)),
          }
        : { min: 0, max: 0 },
  };

  return (
    <section className="py-20 max-w-7xl mx-auto px-6">
      <h1 className="text-4xl font-bold mb-4 text-center">
        {location.h1}
      </h1>

      <p className="text-center text-gray-400 mb-8">{location.body[0]}</p>

      <DualContentSection leftText={location.body[1]} rightText={location.body[2]} leftTitle={location.h2[0]} rightTitle={location.h2[1]} />

      {/* STATS */}
      {filteredGirls.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
          <Stat label="Total Profiles" value={stats.total} />
          <Stat label="Available" value="Yes" />
          <Stat label="Average Age" value={stats.avgAge} />
          <Stat
            label="Age Range"
            value={`${stats.ageRange.min}-${stats.ageRange.max}`}
          />
        </div>
      )}

      {/* FILTER FORM */}
      {/* <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <form method="get" className="grid md:grid-cols-5 gap-4">
          <Input label="Search" name="search" defaultValue={search} />
          <Input label="Min Age" name="minAge" type="number" defaultValue={minAge} />
          <Input label="Max Age" name="maxAge" type="number" defaultValue={maxAge} />
          <Select label="Sort By" name="sort" defaultValue={sort} />
          <button className="bg-pink-600 hover:bg-pink-700 rounded-lg font-semibold">
            Apply Filters
          </button>
        </form>
      </div> */}

      {/* LISTING */}
      {filteredGirls.length > 0 ? (
        <div
          className={
            view === "list"
              ? "flex flex-col gap-6"
              : "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 sm:gap-8 gap-1"
          }
        >
          {filteredGirls.map((girl) => (
            <ProfileCard line={false} key={girl.id} girl={girl} viewMode={view} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg mb-4">
            No profiles found in {city}.
          </p>
          <a
            href={`/locations/${slug}`}
            className="inline-block px-6 py-2 bg-pink-600 hover:bg-pink-700 rounded-lg"
          >
            Clear All Filters
          </a>
        </div>
      )}

      <PopularLocations />

      <h1 className="text-4xl font-bold mb-4 text-center">
        {location.h2[2]}
      </h1>

      <p className="text-center text-gray-400 mb-8">{location.body[3]}</p>
    </section>
  );
}

/* ================= SMALL COMPONENTS ================= */

function Stat({ label, value }: { label: string; value: any }) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 text-center">
      <div className="text-2xl font-bold text-pink-500">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  );
}

function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-2">{label}</label>
      <input
        {...props}
        className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-pink-500"
      />
    </div>
  );
}

function Select({ label, ...props }: any) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-2">{label}</label>
      <select
        {...props}
        className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-pink-500"
      >
        <option value="default">Default</option>
        <option value="name">Name (A-Z)</option>
        <option value="age-asc">Age (Low to High)</option>
        <option value="age-desc">Age (High to Low)</option>
        <option value="price-asc">Price (Low to High)</option>
        <option value="price-desc">Price (High to Low)</option>
      </select>
    </div>
  );
}
