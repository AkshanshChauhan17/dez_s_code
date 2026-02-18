"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { locations, girlsData } from "../data/data";

const TOP_CITIES = [
  "Bengaluru",
  "Chennai",
  "Jaipur",
  "Delhi",
  "Pune",
  "Kolkata",
  "Noida",
  "Gurgaon",
  "Chandigarh",
  "Agra",
];

export default function PopularLocations() {
  // helper: count profiles per city
  const getProfileCount = (city: string) =>
    girlsData.filter((g) => g.city === city).length;

  // reorder locations: top cities first
  const sortedLocations = [
    ...locations.filter((l) => TOP_CITIES.includes(l.city)),
    ...locations.filter((l) => !TOP_CITIES.includes(l.city)),
  ];

  return (
    <section className="py-10 pb-20 px-4 sm:px-10 lg:px-20 bg-zinc-950">
      <motion.div
        className="flex flex-wrap justify-center gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } },
        }}
      >
        {sortedLocations.map((loc) => {
          const count = getProfileCount(loc.city);
          if (count === 0) return null;

          const isTopCity = TOP_CITIES.includes(loc.city);

          return (
            <Link key={loc.slug} href={`/locations/${loc.slug}`}>
              <motion.span
                className={`
                  flex items-center gap-2
                  px-6 sm:px-8
                  py-3 sm:py-4
                  rounded-full
                  cursor-pointer
                  font-semibold
                  shadow-lg
                  transition
                  ${
                    isTopCity
                      ? "bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white ring-2 ring-pink-400"
                      : "bg-zinc-900 text-white hover:bg-pink-500"
                  }
                `}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* City Name */}
                <span>{loc.city}</span>

                {/* Count Badge */}
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    isTopCity
                      ? "bg-white/20"
                      : "bg-black/40"
                  }`}
                >
                  {count}
                </span>
              </motion.span>
            </Link>
          );
        })}
      </motion.div>
    </section>
  );
}