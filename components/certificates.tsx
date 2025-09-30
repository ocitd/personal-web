"use client";

import React, { useState } from "react";

// UI Components (shadcn/ui)
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Icons
import { Search, ExternalLink } from "lucide-react";

// Animations
import { motion } from "framer-motion";

type Certificate = {
  id: string;
  title: string;
  provider: string;
  date: string;
  imageUrl?: string;
  link?: string;
  sensitive?: boolean;
  description?: string;
};

type Props = {
  certificates: Certificate[];
  showSensitive?: boolean;
  className?: string;
};

const CertificationsSection: React.FC<Props> = ({
  certificates,
  showSensitive = false,
  className = "",
}) => {
  const [query, setQuery] = useState("");
  const [filterProvider, setFilterProvider] = useState<string | null>(null);
  const [selected, setSelected] = useState<Certificate | null>(null);

  const providers = Array.from(new Set(certificates.map((c) => c.provider)));

  const filtered = certificates.filter((c) => {
    const q = query.trim().toLowerCase();
    if (filterProvider && c.provider !== filterProvider) return false;
    if (!q) return true;
    return (c.title + " " + c.provider + " " + (c.description || ""))
      .toLowerCase()
      .includes(q);
  });

  return (
    <section className={`w-full ${className}`} aria-labelledby="certs-heading">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 id="certs-heading" className="text-2xl font-semibold">
            Sertifikasi & Short Courses
          </h2>
          <p className="text-sm text-muted-foreground">
            Bukti belajar singkat yang relevan dengan skillmu.
          </p>
        </div>

        <div className="flex gap-2 items-center">
          {/* Search */}
          <div className="relative flex items-center border rounded-md px-2 py-1">
            <Search className="w-4 h-4 mr-2 opacity-70" />
            <Input
              placeholder="Cari sertifikat atau kursus..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border-0 p-0 bg-transparent focus:ring-0"
            />
          </div>

          {/* Filter */}
          <Select
            onValueChange={(val) =>
              setFilterProvider(val === "all" ? null : val)
            }
          >
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Filter provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua</SelectItem>
              {providers.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Cards */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
      >
        {filtered.map((cert) => (
          <Card key={cert.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex items-center gap-3 p-4">
              <Avatar>
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 text-sm font-bold">
                  {(cert.provider?.[0] || "?").toUpperCase()}
                </div>
              </Avatar>

              <div className="flex-1">
                <CardTitle className="text-sm font-semibold">
                  {cert.title}
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  {cert.provider} • {cert.date}
                </p>
              </div>

              <div className="flex flex-col items-end gap-1">
                <Badge
                  variant={cert.sensitive ? "destructive" : "secondary"}
                  className="text-xs"
                >
                  {cert.sensitive ? "Sensitive" : "Verified"}
                </Badge>

                <div className="flex gap-1">
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Buka verifikasi ${cert.title}`}
                    >
                      <Button size="sm" variant="ghost">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </a>
                  )}
                  <Button size="sm" onClick={() => setSelected(cert)}>
                    Lihat
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-4 pt-0">
              <p className="text-sm mb-2 line-clamp-3">
                {cert.description || "Tidak ada deskripsi singkat."}
              </p>

              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">{cert.date}</div>
                <div className="text-xs">{cert.provider}</div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full text-center py-8 text-sm text-muted-foreground">
            Tidak ada sertifikat yang cocok.
          </div>
        )}
      </motion.div>

      {/* Detail Modal */}
      <Dialog
        open={!!selected}
        onOpenChange={(o) => {
          if (!o) setSelected(null);
        }}
      >
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selected?.title}</DialogTitle>
            <DialogDescription>
              {selected?.provider} • {selected?.date}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Preview */}
            <div className="md:col-span-2">
              {selected?.imageUrl ? (
                <div className="rounded-md overflow-hidden border">
                  <div className="relative bg-gray-50">
                    <img
                      src={selected.imageUrl}
                      alt={selected.title}
                      className="w-full h-auto block"
                    />

                    {selected.sensitive && !showSensitive && (
                      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
                        <div className="text-center p-4">
                          <p className="font-medium">
                            Informasi sensitif disembunyikan
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Ubah <em>showSensitive</em> ke <code>true</code>{" "}
                            untuk menampilkan.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="rounded-md border p-6 flex items-center justify-center text-sm text-muted-foreground">
                  Tidak ada preview
                </div>
              )}
            </div>

            {/* Details */}
            <div className="md:col-span-1 flex flex-col gap-3">
              <div>
                <h3 className="text-sm font-semibold">Detail</h3>
                <dl className="text-sm text-muted-foreground mt-2">
                  <div className="flex justify-between">
                    <dt>Provider</dt>
                    <dd>{selected?.provider}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Tanggal</dt>
                    <dd>{selected?.date}</dd>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm">{selected?.description}</p>
                  </div>
                </dl>
              </div>

              <div className="mt-auto flex gap-2">
                {selected?.link && (
                  <a
                    href={selected.link}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full"
                  >
                    <Button className="w-full">Buka verifikasi</Button>
                  </a>
                )}

                <Button variant="secondary" onClick={() => setSelected(null)}>
                  Tutup
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CertificationsSection;

/* --- Example Data for Demo --- */
export const CERTS: Certificate[] = [
  {
    id: "c1",
    title: "Intro to React (Short Course)",
    provider: "Dicoding Academy",
    date: "Jun 2024",
    imageUrl: "/images/certs/react-short.png",
    link: "https://example.com/verify/react",
    sensitive: false,
    description:
      "Fundamental React: components, hooks, state management, dan project mini.",
  },
  {
    id: "c2",
    title: "UI/UX Basics",
    provider: "Coursera",
    date: "Feb 2023",
    imageUrl: "/images/certs/uiux.png",
    link: "https://coursera.org/verify/xxxx",
    sensitive: false,
    description: "Dasar-dasar desain antarmuka dan pengalaman pengguna.",
  },
  {
    id: "c3",
    title: "Kursus Singkat: Pembayaran Online",
    provider: "Local Bootcamp",
    date: "Jan 2025",
    imageUrl: "/images/certs/payment.png",
    sensitive: true,
    description:
      "Praktikum integrasi gateway pembayaran. (Beberapa sertifikat berisi info sensitif)",
  },
];
