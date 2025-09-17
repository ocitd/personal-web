"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/features", label: "Features" },
    { href: "/contact", label: "Contact" },
    { href: "/portfolio", label: "Portfolio" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg  border-b border-neutral-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="font-bold text-lg tracking-tight bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent hover:from-orange-600 hover:to-pink-600 transition"
          >
            Rasyid Abqari
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-neutral-600 hover:text-neutral-900 transition-colors duration-200
                after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 
                after:h-[2px] after:bg-neutral-900 hover:after:w-full after:transition-all after:duration-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-neutral-700 text-2xl"
        >
          {isOpen ? "✕" : "☰"}
        </button>

        {/* CTA Button (desktop only) */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://wa.me/6285624571907"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 h-9 flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md hover:shadow-lg transition-all duration-300 text-sm"
          >
            Hire Me
          </a>
        </div>
      </div>
      
      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} // posisi awal
            animate={{ opacity: 1, y: 0 }} // animasi masuk
            exit={{ opacity: 0, y: -20 }} // animasi keluar
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-t border-neutral-200 shadow-sm w-fit"
          >
            <div className="flex flex-col items-center gap-4 py-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-neutral-700 hover:text-orange-500 text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="https://wa.me/6285624571907"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 h-9 flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md hover:shadow-lg transition-all duration-300 text-sm"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
