"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

export default function PortfolioPage() {
  type Certificate = {
    id: string;
    title: string;
    certificate: string; // URL gambar sertifikat
    provider: string;
    createdAt: string;
  };

  const [certificates, setCertificates] = useState<Certificate[]>([]);

  // ambil data dari server
  useEffect(() => {
    fetch("/api/certificates")
      .then((res) => res.json())
      .then((data) => setCertificates(data))
      .catch((err) => console.error("Failed to fetch certificates:", err));
  }, []);

  return (
    <main className="min-h-screen text-neutral-800">
      <section
        id="CERTIFICATES"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16"
      >
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Certificates
          </h1>
          <p className="mt-3 text-neutral-600">
            Some of my official certificates and professional achievements.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.id ?? i}
              whileHover={{ scale: 1.05 }}
              className="rounded-xl overflow-hidden shadow-lg hover:shadow-orange-400/40 transition"
            >
              <img
                src={cert.certificate}
                alt={cert.title}
                className="w-full h-[400px] object-cover"
              />
              <div className="px-4 py-3 bg-white">
                <p className="text-neutral-800 font-semibold text-lg">
                  {cert.title}
                </p>
                <p className="text-sm text-neutral-600 mt-1">
                  {cert.provider}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
