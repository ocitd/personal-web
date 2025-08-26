"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div>
            <h3 className="text-lg font-semibold">Rasyid Abqari</h3>
            <p className="text-sm mt-1">
              FullStack Developer — building fast & beautiful web apps.
            </p>
          </div>
          <div className="flex gap-4 text-xl">
            <motion.a
              href="https://github.com/ocitd"
              whileHover={{ scale: 1.2 }}
              className="hover:text-white transition"
            >
              <FaGithub />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/rasyid-abqari-hasibuan"
              whileHover={{ scale: 1.2 }}
              className="hover:text-white transition"
            >
              <FaLinkedin />
            </motion.a>
            <motion.a
              href="https://instagram.com/siocits"
              whileHover={{ scale: 1.2 }}
              className="hover:text-white transition"
            >
              <FaInstagram />
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-6 text-sm text-neutral-500"
        >
          &copy; {new Date().getFullYear()} Rasyid Abqari. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
}