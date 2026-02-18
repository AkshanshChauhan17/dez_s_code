"use client";

import Image from "next/image";
import Link from "next/link";
import { Girl } from "../data/types";
import { Crown, Globe } from "lucide-react";
import { FaPhoneAlt, FaTelegram, FaWhatsapp } from "react-icons/fa";
import { useEffect, useState } from "react";

interface ProfileCardProps {
  girl: Girl;
  onSelect?: (g: Girl) => void;
  viewMode?: "grid" | "list";
  line: boolean;
}

function GetWidth() {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    setWidth(window.innerWidth);

    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

export default function ProfileCard({
  girl,
  viewMode = "grid",
  line = false,
}: ProfileCardProps) {
  const profileHref = `/profiles/${girl.id}/`;

  /* ================= VIP CARD ================= */
  if (girl.vip) {
    return (
      <div className="relative bg-amber-100 rounded-2xl sm:rounded-3xl h-full overflow-hidden transition-transform">
        {/* VIP Badge */}
        <div className="absolute top-2 left-2 z-10 flex items-center gap-1 bg-amber-500 text-black text-xs font-semibold px-3 py-1 rounded-full">
          VIP <Crown size={14} strokeWidth={2.5} />
        </div>

        {/* Image */}
        <Image
          src={"/girls" + girl.image}
          placeholder="blur"
          blurDataURL={"/girls" + girl.image}
          className="h-72 sm:h-72 w-full object-cover object-top"
          width={800}
          height={800}
          alt="luxury escort services at affordable price, top escort services agency,
best escorts services online, vip call girls services online, professional escort booking site
online
"
        />

        {/* Content */}
        <div className="p-4 sm:p-6">
          <h3 className="text-lg sm:text-2xl font-semibold text-amber-700 mb-1">
            {girl.name}
          </h3>

          <p className="text-sm sm:text-base text-amber-600 flex flex-wrap items-center gap-2 mb-3">
            {girl.age} yrs • {girl.city}
            {girl.itnl && (
              <span className="flex items-center gap-1 bg-amber-200 text-amber-700 px-2 py-0.5 rounded-full text-xs">
                International <Globe size={12} strokeWidth={2.5} />
              </span>
            )}
          </p>

          {/* CTA */}
          <div
            className="flex gap-4 sm:gap-2 mt-10"
            style={
              line && GetWidth() < 500
                ? { flexWrap: "nowrap" }
                : { flexWrap: "nowrap" }
            }
          >
            <Link
              href={profileHref}
              target="_blank"
              className="w-full flex items-center justify-center bg-pink-200/10 outline-amber-500 outline-1 font-semibold py-2.5 sm:py-3 rounded-xl hover:bg-amber-900 transition text-amber-500"
            >
              <FaPhoneAlt size={18} />
            </Link>

            <Link
              href={profileHref}
              target="_blank"
              className="w-full flex items-center justify-center bg-pink-200/10 outline-amber-500 outline-1 font-semibold py-2.5 sm:py-3 rounded-xl hover:bg-amber-900 transition text-amber-500"
            >
              <FaWhatsapp size={24} />
            </Link>

            <Link
              href={profileHref}
              target="_blank"
              className="w-full flex items-center justify-center bg-pink-200/10 outline-amber-500 outline-1 font-semibold py-2.5 sm:py-3 rounded-xl hover:bg-amber-900 transition text-amber-500"
            >
              <FaTelegram size={24} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ================= NORMAL CARD ================= */
  return (
    <div className="bg-zinc-900 rounded-2xl sm:rounded-3xl h-full overflow-hidden transition-transform">
      {/* Image */}
      <Image
        src={"/girls" + girl.image}
        placeholder="blur"
        blurDataURL={"/girls" + girl.image}
        className="h-72 sm:h-80 w-full object-cover object-top"
        width={600}
        height={600}
        alt="luxury escort services at affordable price, top escort services agency,
best escorts services online, vip call girls services online, professional escort booking site
online
"
      />

      {/* Content */}
      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-2xl font-semibold mb-1">
          {girl.name}
        </h3>

        <p className="text-sm sm:text-base text-gray-400 mb-3">
          {girl.age} yrs • {girl.city}
        </p>

        {/* CTA */}
        <div
          className="flex gap-4 sm:gap-2 mt-10"
          style={
            line && GetWidth() < 500
              ? { flexWrap: "nowrap" }
              : { flexWrap: "nowrap" }
          }
        >
          <Link
            href={profileHref}
            className="w-full flex items-center justify-center bg-pink-200/10 outline-pink-300 outline-1 font-semibold py-2.5 sm:py-3 rounded-xl hover:bg-pink-500 transition text-pink-300"
          >
            <FaPhoneAlt size={18} />
          </Link>

          <Link
            href={profileHref}
            target="_blank"
            className="w-full flex items-center justify-center bg-pink-200/10 outline-pink-300 outline-1 font-semibold py-2.5 sm:py-3 rounded-xl hover:bg-pink-500 transition text-pink-300"
          >
            <FaWhatsapp size={24} />
          </Link>

          <Link
            href={profileHref}
            target="_blank"
            className="w-full flex items-center justify-center bg-pink-200/10 outline-pink-300 outline-1 font-semibold py-2.5 sm:py-3 rounded-xl hover:bg-pink-500 transition text-pink-300"
          >
            <FaTelegram size={24} />
          </Link>
        </div>
      </div>
    </div>
  );
}