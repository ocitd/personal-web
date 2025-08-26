"use client";

import { motion } from "framer-motion";
import { servicesData } from "@/data/services";

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Services</h2>
        <p className="mt-3 text-neutral-400">Your ideas, our code — let’s make it happen.</p>
      </div>

      <div className="mt-10 mb-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesData.map((service, idx) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center justify-center bg-white rounded-xl p-6 shadow hover:shadow-xl transition"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-orange-500 to-pink-500 flex items-center justify-center text-white text-2xl animate-pulse">
                <Icon />   {/* panggil di sini */}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{service.title}</h3>
              <p className="mt-2 text-neutral-500">{service.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}