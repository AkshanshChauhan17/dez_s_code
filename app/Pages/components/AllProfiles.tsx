"use client";

import { useState, useMemo } from "react";
import { girlsData, locations } from "../data/data";
import ProfileCard from "./ProfileCard";
import { Girl } from "../data/types";
import { motion, Variants } from "framer-motion";

export default function AllProfiles({
  onSelect,
}: {
  onSelect: (g: Girl) => void;
}) {
  // Filters
  const [search, setSearch] = useState("");
  const [minAge, setMinAge] = useState<number | "">("");
  const [maxAge, setMaxAge] = useState<number | "">("");
  const [location, setLocation] = useState("");
  const [vipOnly, setVipOnly] = useState(false);
  const [internationalOnly, setInternationalOnly] = useState(false);

  // Show more state
  const [visibleCount, setVisibleCount] = useState(8);

  // Reset visible count when filters change
  const resetVisible = () => setVisibleCount(8);

  // Apply filters
  const filteredGirls = useMemo(() => {
    return girlsData.filter((girl) => {
      const matchesSearch =
        girl.name.toLowerCase().includes(search.toLowerCase());

      const matchesMinAge =
        minAge === "" || girl.age >= minAge;

      const matchesMaxAge =
        maxAge === "" || girl.age <= maxAge;

      const matchesLocation =
        location === "" || girl.city === location;

      const matchesVip =
        !vipOnly || girl.vip;

      const matchesInternational =
        !internationalOnly || girl.itnl;

      return (
        matchesSearch &&
        matchesMinAge &&
        matchesMaxAge &&
        matchesLocation &&
        matchesVip &&
        matchesInternational
      );
    });
  }, [
    search,
    minAge,
    maxAge,
    location,
    vipOnly,
    internationalOnly,
  ]);

  const visibleGirls = filteredGirls.slice(0, visibleCount);

  // Motion variants
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        type: "spring",
        stiffness: 120,
      },
    }),
  };

  return (
    <section id="escorts" className="py-20 mx-auto px-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        All Escorts
      </h2>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-4 justify-center mb-12">
        <input
          type="text"
          placeholder="Search by name"
          className="p-3 rounded-xl bg-zinc-900 text-white"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            resetVisible();
          }}
        />

        <input
          type="number"
          placeholder="Min Age"
          className="p-3 rounded-xl bg-zinc-900 text-white w-24"
          value={minAge}
          onChange={(e) => {
            setMinAge(e.target.value ? Number(e.target.value) : "");
            resetVisible();
          }}
        />

        <input
          type="number"
          placeholder="Max Age"
          className="p-3 rounded-xl bg-zinc-900 text-white w-24"
          value={maxAge}
          onChange={(e) => {
            setMaxAge(e.target.value ? Number(e.target.value) : "");
            resetVisible();
          }}
        />

        <select
          className="p-3 rounded-xl bg-zinc-900 text-white"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            resetVisible();
          }}
        >
          <option value="">All Locations</option>
          {locations.map((loc) => (
            <option key={loc.slug} value={loc.city}>
              {loc.city}
            </option>
          ))}
        </select>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={vipOnly}
            onChange={(e) => {
              setVipOnly(e.target.checked);
              resetVisible();
            }}
          />
          VIP Only
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={internationalOnly}
            onChange={(e) => {
              setInternationalOnly(e.target.checked);
              resetVisible();
            }}
          />
          International Only
        </label>
      </div>

      {/* GRID */}
      <div className="grid w-full grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {visibleGirls.length > 0 ? (
          visibleGirls.map((girl, i) => (
            <motion.div
              key={`${girl.id}-${girl.city}`}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <ProfileCard line={true} girl={girl} onSelect={onSelect} />
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-400 col-span-full">
            No profiles found.
          </p>
        )}
      </div>

      {/* SHOW MORE BUTTON */}
      {visibleCount < filteredGirls.length && (
        <div className="mt-14 flex justify-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + 9)}
            className="
              px-10 py-4
              rounded-2xl
              bg-pink-500 hover:bg-pink-600
              text-lg font-semibold
              transition
            "
          >
            Show More Profiles
          </button>
        </div>
      )}
    </section>
  );
}
