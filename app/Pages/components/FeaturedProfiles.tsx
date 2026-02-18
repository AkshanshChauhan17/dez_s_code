'use client';

import { useRef, useEffect, useState } from 'react';
import { girlsData } from '../data/data';
import ProfileCard from './ProfileCard';
import { Girl } from '../data/types';

export default function FeaturedProfiles({
  onSelect,
}: {
  onSelect: (g: Girl) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;

    const scrollAmount = 350;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  /* 🔁 AUTO SLIDE */
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (!scrollRef.current) return;

      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

      // Loop back to start
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scroll('right');
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-zinc-950 relative">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-12 text-center">
        Top call girl models
      </h2>

      {/* LEFT ARROW */}
      <button
        onClick={() => scroll('left')}
        className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10
        bg-black/60 hover:bg-black text-white p-3 rounded-full"
      >
        ←
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={() => scroll('right')}
        className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10
        bg-black/60 hover:bg-black text-white p-3 rounded-full"
      >
        →
      </button>

      {/* SCROLL CONTAINER */}
      <div
        ref={scrollRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        className="
          flex gap-4 px-4
          overflow-x-auto snap-x snap-mandatory
          md:overflow-x-hidden
          scrollbar-hide
          mx-auto
        "
      >
        {girlsData
          .filter((g) => g.featured)
          .map((girl) => (
            <div
              key={girl.id}
              className="
                snap-center
                flex-shrink-0
                w-[80%] sm:w-[45%] md:w-[23%]
              "
            >
              <ProfileCard line={false} girl={girl} onSelect={onSelect} />
            </div>
          ))}
      </div>
    </section>
  );
}