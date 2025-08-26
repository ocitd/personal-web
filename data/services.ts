import { IconType } from "react-icons";
import {
  FaLaptopCode,
  FaPaintBrush,
  FaPlug,
  FaServer,
  FaReact,
  FaRocket,
} from "react-icons/fa";

export interface ServiceItem {
  title: string;
  desc: string;
  icon: IconType; // simpan referensi komponen, bukan elemen
}

export const servicesData: ServiceItem[] = [
  {
    title: "Web Development",
    desc: "Build fast, responsive, and SEO-friendly websites.",
    icon: FaLaptopCode,
  },
  {
    title: "UI/UX Design",
    desc: "Design intuitive and visually appealing interfaces.",
    icon: FaPaintBrush,
  },
  {
    title: "API Integration",
    desc: "Seamlessly integrate third-party services.",
    icon: FaPlug,
  },
  {
    title: "Hosting & Server Setup",
    desc: "Get your website online from scratch.",
    icon: FaServer,
  },
  {
    title: "Next.js Development",
    desc: "Modern web apps built with React and Next.js.",
    icon: FaReact,
  },
  {
    title: "Performance Optimization",
    desc: "Make your website blazing fast.",
    icon: FaRocket,
  },
];
