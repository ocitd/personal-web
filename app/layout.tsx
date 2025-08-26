import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rasyid Abqari Hasibuan | Official Website",
  description: "Website resmi Rasyid Abqari Hasibuan, profil, karya, dan informasi terbaru.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* NAVBAR */}
        <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/70 border-b border-neutral-200 shadow-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Link href="/" className="font-bold text-lg tracking-tight hover:text-neutral-900 transition-colors">
                Rasyid Abqari
              </Link>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              {[
                { href: "/", label: "Home" },
                { href: "/features", label: "Features" },
                { href: "/contact", label: "Contact" },
                { href: "/portfolio", label: "Portfolio" },
              ].map((item) => (
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

            {/* CTA Button */}
            <div className="flex items-center gap-3">
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
        </header>
        {children}
        <Footer />
      </body>
    </html>
  );
}
