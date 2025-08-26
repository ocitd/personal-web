"use client";

import { categories } from "@/data/categories";
import { projects } from "@/data/projects";
import { motion } from "framer-motion";
import React, { useState } from "react";

export default function PortfolioPage() {
  const [active, setActive] = useState("All");

  return (
    <main className="min-h-screen text-neutral-800">
      <section
        id="PORTFOLIO"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16"
      >
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Portfolio
          </h1>
          <p className="mt-3 text-neutral-600">
            Check out some of my latest projects. (soon insyaallah)
          </p>
        </div>
        <div className="mt-10 space-y-10">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat, i) => (
              <motion.button
                key={i}
                onClick={() => setActive(cat)}
                whileHover={{ scale: 1.1 }}
                className={`px-5 py-2 rounded-md font-medium transition-colors ${
                  active === cat
                    ? "bg-orange-500 text-white"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects
              .filter((p) => active === "All" || p.category === active)
              .map((p, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="bg-neutral-900 rounded-xl overflow-hidden shadow-lg hover:shadow-orange-400/40 transition"
                >
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="flex justify-between items-center px-4 py-3 bg-white">
                    <p className="text-neutral-800 font-medium">{p.title}</p>
                    <span className="text-orange-500 font-semibold">
                      {p.category}
                    </span>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
