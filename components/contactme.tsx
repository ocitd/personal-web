"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    timeline: "",
    details: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | string>(null);

  const inputClass =
    "w-full mt-1 px-4 py-2 rounded-lg bg-neutral-800 text-neutral-200 placeholder-neutral-500 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-orange-500";

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          timeline: "",
          details: "",
        });
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Contact Me
        </h2>
        <p className="mt-3 text-neutral-500">
          Have an idea or project? Send me a message using the form below.
        </p>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        className="mt-10 max-w-3xl mx-auto space-y-6 bg-neutral-900 p-8 rounded-2xl shadow-md"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-neutral-200">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={inputClass}
            placeholder="Your name"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-neutral-200">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
            placeholder="Your email"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-neutral-200">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={inputClass}
            placeholder="Your phone number"
          />
        </div>

        {/* Service */}
        <div>
          <label className="block text-sm font-medium text-neutral-200">
            Service
          </label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className={inputClass}
            required
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

        {/* Timeline */}
        <div>
          <label className="block text-sm font-medium text-neutral-200">
            Timeline
          </label>
          <input
            type="text"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            className={inputClass}
            placeholder="Ex: 1 month, 2 weeks, etc."
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-neutral-200">
            Description
          </label>
          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            className={inputClass}
            placeholder="Detail your project"
            rows={5}
            required
          />
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 hover:opacity-90 text-white font-semibold rounded-lg shadow disabled:opacity-50"
          >
            {loading ? "Sending..." : "Submit"}
          </button>
          {status === "success" && (
            <p className="mt-3 text-green-500 text-sm">
              ✅ Message sent successfully!
            </p>
          )}
          {status === "error" && (
            <p className="mt-3 text-red-500 text-sm">
              ❌ Failed to send message. Try again.
            </p>
          )}
        </div>
      </motion.form>
    </section>
  );
}