"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function PortfolioPage() {
  type Certificate = {
    id: string;
    title: string;
    certificate: string;
    provider: string;
    createdAt: string;
  };

  const [certificates, setCertificates] = useState<Certificate[]>([]);

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
            <Dialog key={cert.id ?? i}>
              <DialogTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="rounded-xl overflow-hidden shadow-lg hover:shadow-orange-400/40 transition cursor-pointer"
                >
                  {/* Thumbnail */}
                  {cert.certificate?.toLowerCase().endsWith(".pdf") ? (
                    <div className="w-full h-[200px] bg-neutral-100 flex items-center justify-center text-sm text-neutral-500">
                      <span className="text-orange-500 font-semibold">
                        PDF File
                      </span>
                    </div>
                  ) : (
                    <img
                      src={cert.certificate}
                      alt={cert.title}
                      className="w-full h-[200px] object-cover"
                    />
                  )}

                  <div className="px-4 py-3 bg-white">
                    <p className="text-neutral-800 font-semibold text-lg truncate">
                      {cert.title}
                    </p>
                    <p className="text-sm text-neutral-600 mt-1">
                      {cert.provider}
                    </p>
                  </div>
                </motion.div>
              </DialogTrigger>

              {/* Dialog detail */}
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>{cert.title}</DialogTitle>
                  <p className="text-sm text-neutral-600">{cert.provider}</p>
                </DialogHeader>

                <div className="mt-4">
                  {cert.certificate?.toLowerCase().endsWith(".pdf") ? (
                    <div className="w-full h-[80vh] bg-neutral-100 flex items-center justify-center">
                      <object
                        data={cert.certificate}
                        type="application/pdf"
                        width="100%"
                        height="100%"
                        aria-label={cert.title}
                      >
                        <p className="text-sm text-neutral-500">
                          PDF preview unavailable.{" "}
                          <a
                            href={cert.certificate}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-500 underline"
                          >
                            Open PDF
                          </a>
                        </p>
                      </object>
                    </div>
                  ) : (
                    <img
                      src={cert.certificate}
                      alt={cert.title}
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  )}
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </section>
    </main>
  );
}