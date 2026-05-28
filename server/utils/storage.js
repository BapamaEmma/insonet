import fs from "fs/promises";
import path from "path";
import { services as defaultServices } from "../../src/data/services.js";
import { CONTENT_FILE, DATA_DIR } from "../config.js";

const defaultContent = {
  projectCategories: [
    "All",
    "CCTV Surveillance",
    "Network Infrastructure",
    "Access Control",
    "Cybersecurity",
    "Perimeter Fencing",
    "Hardware Maintenance",
  ],
  projectStats: [
    { target: 50, suffix: "+", label: "Projects Delivered" },
    { target: 6, suffix: "", label: "Service Sectors" },
    { target: 100, suffix: "%", label: "Ghana-Based Support" },
  ],
  projects: [],
  testimonials: [
    {
      id: "t1",
      quote:
        "INSONET deployed a full CCTV and access control system across our 3 branches in record time. Professional, clean, and exactly what we needed.",
      name: "Kwame Asante",
      role: "Operations Manager, Asante Group",
    },
    {
      id: "t2",
      quote:
        "Their network infrastructure team is top-notch. Our internet connectivity issues are completely gone and the setup is very organized.",
      name: "Ama Boateng",
      role: "IT Director, Boateng Enterprises",
    },
    {
      id: "t3",
      quote:
        "We contracted INSONET for electric fencing and perimeter security. The team was fast, reliable, and very knowledgeable.",
      name: "Michael Ofori",
      role: "Facility Manager, Ofori Logistics",
    },
  ],
  settings: {
    siteName: "INSONET Systems",
    email: "info@insonetgh.com",
    phone: "+233 2628 42 077",
    address: "Spintex, Accra, Ghana",
    mapUrl: "https://maps.google.com/?q=Spintex,Accra,Ghana",
    hero: {
      typingText: "INTELLIGENCE SOLUTIONS NETWORK SYSTEMS",
      highlightedText: "NETWORK SYSTEMS",
      headlineLine1: "Secure, Connected &",
      headlineLine2: "Intelligent Infrastructure for Modern Businesses",
      subtext:
        "INSONET Systems designs and deploys CCTV, access control, and network solutions that keep your people, data, and spaces protected.",
      image: "assets/images/hero-operations-team.png",
    },
    about: {
      image: "assets/images/about-team.png",
      yearsStat: "10+",
      yearsLabel: "Years of Experience",
      heading: "Engineered for Reliability, Designed for Security",
      body: "INSONET Systems is a trusted partner delivering end-to-end security and network infrastructure solutions for businesses across all sectors.",
    },
    footer: {
      tagline:
        "INSONET Systems delivers professional security and network solutions — CCTV, access control, network infrastructure, and more — to businesses across Ghana.",
    },
    social: {
      facebook: "https://www.facebook.com/Admininso",
      instagram: "https://www.instagram.com/insonetgh/",
      whatsapp: "https://wa.me/233262842077",
      twitter: "#",
      linkedin: "#",
    },
  },
  services: defaultServices,
  contactSubmissions: [],
};

export async function ensureDataFiles() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(CONTENT_FILE);
  } catch {
    await fs.writeFile(CONTENT_FILE, JSON.stringify(defaultContent, null, 2));
  }
}

export async function readContent() {
  await ensureDataFiles();
  const raw = await fs.readFile(CONTENT_FILE, "utf-8");
  return JSON.parse(raw);
}

export async function writeContent(content) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(CONTENT_FILE, JSON.stringify(content, null, 2));
}

export async function listMediaFiles(uploadsDir) {
  try {
    const files = await fs.readdir(uploadsDir);
    const items = await Promise.all(
      files.map(async (filename) => {
        const filePath = path.join(uploadsDir, filename);
        const stat = await fs.stat(filePath);
        if (!stat.isFile()) return null;
        return {
          filename,
          url: `/uploads/${filename}`,
          size: stat.size,
          createdAt: stat.birthtime.toISOString(),
        };
      }),
    );
    return items.filter(Boolean).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch {
    return [];
  }
}
