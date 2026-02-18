'use client';

import { useEffect, useRef, useState } from 'react';
import { Girl } from '../data/types';
import { girlsData } from '../data/data'; // full list

interface Props {
  onSelect: (girl: Girl) => void;
}

const ITEMS_PER_LOAD = 12;

export default function AllProfiles({ onSelect }: Props) {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const visibleGirls = girlsData.slice(0, visibleCount);
  const hasMore = visibleCount < girlsData.length;

  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setVisibleCount((prev) => prev + ITEMS_PER_LOAD);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [hasMore]);

  return (
    <section className="px-4 sm:px-10 lg:px-20">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {visibleGirls.map((girl) => (
          <div
            key={girl.id}
            onClick={() => onSelect(girl)}
            className="cursor-pointer bg-zinc-900 rounded-xl overflow-hidden hover:scale-[1.02] transition"
          >
            <img
              src={girl.image}
              alt={girl.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-3">
              <h2 className="font-semibold">{girl.name}</h2>
              <p className="text-sm text-gray-400">{girl.city}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Loader */}
      {hasMore && (
        <div
          ref={loaderRef}
          className="h-20 flex items-center justify-center text-gray-400"
        >
          Loading more profiles...
        </div>
      )}
    </section>
  );
}