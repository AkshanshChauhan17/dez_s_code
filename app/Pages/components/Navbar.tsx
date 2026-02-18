"use client";

import { useState } from "react";
import { ChevronRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setOpen(false); // close menu on click
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/"><Image src="/logo.png" width={100} height={100} alt="luxury escort services at affordable price, top escort services agency,
best escorts services online, vip call girls services online, professional escort booking site
online
" className="object-contain h-30 w-40" />
</Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8 text-gray-300">
            {["home", "escorts", "locations", "contact"].map((item) => (
              <li
                key={item}
                onClick={() => scrollToSection(item)}
                className="cursor-pointer hover:text-white transition"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <button
            className="hidden md:block bg-pink-500 px-5 py-2 rounded-xl hover:bg-pink-600 transition"
            onClick={() => scrollToSection("contact")}
          >
            Book Now
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* BACKDROP */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SLIDE MENU */}
      <div
        className={`
          fixed top-0 left-0 h-full w-[75%] max-w-xs bg-zinc-950 z-50
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800">
          <h2 className="text-xl font-bold">Dezire X</h2>
          <button onClick={() => setOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Links */}
        <ul className="flex flex-col p-6 text-gray-300">
          {["home", "escorts", "locations", "contact"].map((item) => (
            <li
              key={item}
              onClick={() => scrollToSection(item)}
              className="
        flex items-center justify-between
        py-4
        text-lg
        cursor-pointer
        border-b border-zinc-800
        hover:text-pink-500
        transition
      "
            >
              <span>{item.charAt(0).toUpperCase() + item.slice(1)}</span>
              <ChevronRight size={20} className="text-gray-500" />
            </li>
          ))}
        </ul>

        {/* Mobile CTA */}
        <div className="p-6 mt-auto">
          <button
            onClick={() => scrollToSection("contact")}
            className="w-full bg-pink-500 py-3 rounded-xl font-semibold hover:bg-pink-600 transition"
          >
            Book Now
          </button>
        </div>
      </div>
    </>
  );
}
