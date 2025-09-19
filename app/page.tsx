"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { servicesData } from "@/data/services";
import Contactform from "@/components/contactme";

export default function Homepage() {
  const [active, setActive] = useState("All");
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setCategories([
          "All",
          ...new Set(data.flatMap((p: any) => p.category) as string[]),
        ]);
      });
  }, []);

  const filtered = projects.filter(
    (p) => active === "All" || p.category.includes(active)
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    timeline: "",
    details: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClass =
    "p-3 rounded bg-neutral-700 placeholder-gray-300 w-full text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition";

  return (
    <div className="min-h-screen text-neutral-800">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-24 -right-20 w-80 h-80 rounded-full bg-gradient-to-br from-orange-300 to-pink-300 blur-3xl opacity-50 animate-pulse" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-10 lg:pt-24 lg:pb-16">
          <div className="grid lg:grid-cols-2 items-center gap-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 text-xs py-1 text-[#767676]">
                Hi I Am
              </span>
              <p className="mt-1 text-neutral-600 text-base/7">
                Rasyid Abqari.
              </p>
              <h1 className="mt-1 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                FullStack{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 animate-gradient-x">
                  Developer
                </span>
              </h1>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://wa.me/6285624571907"
                  target="_blank"
                  className="flex items-center px-5 h-11 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:opacity-90 transition shadow-lg"
                >
                  Hire Me
                </a>
                <a
                  href="/cv-rasyid-abqari.pdf"
                  download
                  className="px-5 h-11 rounded-2xl border items-center flex border-neutral-300 bg-white hover:bg-neutral-100 transition shadow-sm"
                >
                  Download CV
                </a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex max-w-md rounded-2xl overflow-hidden justify-center"
            >
              <img
                src="/uploads/rasyid-abqari.png"
                alt="Profile"
                className="rounded-2xl shadow-2xl object-cover hover:scale-105 transition-transform"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section
        id="services"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16"
      >
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Services
          </h2>
          <p className="mt-3 text-neutral-400">
            Your ideas, our code — let’s make it happen.
          </p>
        </div>

        <div className="mt-10 mb-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.slice(0, 6).map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center justify-center bg-white rounded-xl p-6 shadow hover:shadow-xl transition"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-orange-500 to-pink-500 flex items-center justify-center text-white text-2xl animate-pulse">
                  <Icon /> {/* panggil di sini */}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{service.title}</h3>
                <p className="mt-2 text-neutral-500">{service.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16"
      >
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            About Me
          </h2>
          <p className="mt-3 text-neutral-400">
            User Interface And User Experience And Also Video Editing
          </p>
        </div>
        <div className="mt-10 grid sm:grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex max-w-md rounded-2xl overflow-hidden justify-center"
          >
            <img
              src="/uploads/rasyid-abqari.png"
              alt="Rasyid Abqari"
              className="rounded-2xl shadow-lg object-cover hover:scale-105 transition-transform"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="leading-relaxed"
          >
            <p className="leading-loose">
              I’m a fullstack developer — an architect of the digital realm who
              builds both the elegant facades users see and the powerful engines
              that run beneath. I move seamlessly between frontend and backend,
              crafting interfaces that feel effortless and systems that perform
              flawlessly...
            </p>
            <a
              href="/cv-rasyid-abqari.pdf"
              className="mt-6 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 hover:opacity-90 text-white font-semibold rounded-lg flex items-center gap-2 w-fit"
              download
            >
              <span>Download CV</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section
        id="PORTFOLIO"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16"
      >
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Portfolio
          </h2>
          <p className="mt-3 text-neutral-600">
            Check out some of my latest projects.
          </p>
        </div>
        <div className="mt-10 flex flex-col items-center space-y-10">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat, i) => (
              <motion.button
                key={i}
                onClick={() => setActive(cat)}
                whileHover={{ scale: 1.1 }}
                className={`px-5 py-2 rounded-md font-medium transition-colors ${
                  active === cat
                    ? "bg-orange-500 text-white shadow-md" // aktif = solid
                    : "bg-orange-100 text-orange-600 hover:bg-orange-200" // non aktif = lebih soft
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects
              .filter((p) => active === "All" || p.category.includes(active))
              .slice(0, 6)
              .map((p, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="rounded-xl overflow-hidden shadow-lg hover:shadow-orange-400/40 transition"
                >
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="px-4 py-3 bg-white">
                    <p className="text-neutral-800 font-medium">{p.title}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {p.category.map((cat: string) => (
                        <span
                          key={cat}
                          className="bg-orange-100 text-orange-600 text-xs font-semibold px-2 py-1 rounded"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
          <motion.a
            href="/portfolio"
            whileHover={{ scale: 1.05 }}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 hover:opacity-90 text-white font-semibold rounded-lg flex items-center gap-2 w-fit"
          >
            <span>See More</span>
          </motion.a>
        </div>
      </section>

      {/* CONTACT */}
      <Contactform />
    </div>
  );
}
