"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    timeline: "",
    details: "",
  });

  const inputClass =
    "p-3 rounded bg-neutral-700 placeholder-gray-300 w-full text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 lg:py-16">
      <section className="max-w-3xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Contact Me</h1>
          <p className="mt-3 text-neutral-500">
            Have an idea or project? Send me a message using the form below.
          </p>
        </div>

        <motion.form
          action="https://wa.me/6285624571907"
          target="_blank"
          className="mt-10 space-y-6 bg-neutral-900 p-8 rounded-2xl shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <label className="block text-sm font-medium text-neutral-200">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-200">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
              placeholder="Your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-200">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={inputClass}
              placeholder="Your phone number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-200">Service</label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="" disabled>
                Select a service
              </option>
              <option value="Web Development">Web Development</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="API Integration">API Integration</option>
              <option value="Hosting">Hosting & Server Setup</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-200">Timeline</label>
            <input
              type="text"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              className={inputClass}
              placeholder="Ex: 1 month, 2 weeks, etc."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-200">Description</label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              className={inputClass}
              placeholder="Detail your project"
              rows={5}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 hover:opacity-90 text-white font-semibold rounded-lg shadow"
            >
              Submit
            </button>
          </div>
        </motion.form>
      </section>
    </main>
  );
}