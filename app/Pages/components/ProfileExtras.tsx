"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

interface Comment {
  name: string;
  rating: number;
  message: string;
}

const comments: Comment[] = [
  {
    name: "Rahul Sharma",
    rating: 5,
    message: "Absolutely amazing experience. Very classy and professional.",
  },
  {
    name: "Amit Verma",
    rating: 4,
    message: "Beautiful, polite and worth every penny.",
  },
  {
    name: "Kunal Singh",
    rating: 5,
    message: "One of the best experiences I’ve had. Highly recommended.",
  },
];

export default function ProfileExtras({
  description,
  rating = 4.8,
  totalReviews = 128,
}: {
  description: string;
  rating?: number;
  totalReviews?: number;
}) {
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("/girls" + description)
      .then((res) => res.text())
      .then((r) => setText(r));
  }, []);

  return (
    <section className="mt-24 space-y-20">
      {/* ⭐ RATING SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-zinc-900 rounded-3xl p-10 text-center"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-6xl font-bold text-yellow-400"
        >
          {rating.toFixed(1)}
        </motion.div>

        <div className="flex justify-center gap-1 mt-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={26}
              className={`${
                i < Math.round(rating) ? "text-yellow-400" : "text-zinc-600"
              }`}
              fill="currentColor"
            />
          ))}
        </div>

        <p className="text-gray-400 mt-3">
          Based on {totalReviews}+ verified reviews
        </p>
      </motion.div>

      {/* ✨ DESCRIPTION */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-zinc-900 rounded-3xl p-10"
      >
        <h2 className="text-3xl font-semibold mb-6">About Her</h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-300 leading-relaxed text-lg"
        >
          <div dangerouslySetInnerHTML={{ __html: text }} />
        </motion.p>
      </motion.div>

      {/* 💬 COMMENTS */}
      <div>
        <h2 className="text-3xl font-semibold mb-10 text-center">
          Client Reviews
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {comments.map((c, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="bg-zinc-900 rounded-2xl p-6"
            >
              <div className="flex gap-1 mb-3">
                {Array.from({ length: c.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="text-yellow-400"
                    fill="currentColor"
                  />
                ))}
              </div>

              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                “{c.message}”
              </p>

              <span className="text-pink-400 text-sm font-medium">
                — {c.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
