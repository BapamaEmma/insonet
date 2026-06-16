import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../api/client";
import { projectCategories, projects, projectStats } from "../data/projects";
import { services as defaultServices } from "../data/services";

const defaultTestimonials = [
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
];

const defaultSettings = {
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
};

function mergeSettings(cmsSettings = {}) {
  return {
    ...defaultSettings,
    ...cmsSettings,
    hero: { ...defaultSettings.hero, ...(cmsSettings.hero ?? {}) },
    about: { ...defaultSettings.about, ...(cmsSettings.about ?? {}) },
    footer: { ...defaultSettings.footer, ...(cmsSettings.footer ?? {}) },
    social: { ...defaultSettings.social, ...(cmsSettings.social ?? {}) },
  };
}

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    const staticHosting = import.meta.env.VITE_STATIC_HOSTING === "true";

    const loadContent = staticHosting
      ? fetch("/content.json")
          .then((response) => {
            if (!response.ok) throw new Error("Could not load content.json");
            return response.json();
          })
      : api.getContent();

    loadContent
      .then((data) => {
        if (active) setContent(data);
      })
      .catch((err) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const value = useMemo(() => {
    const cms = content ?? {};
    const cmsProjects = cms.projects?.length ? cms.projects : projects;
    const cmsCategories = cms.projectCategories?.length ? cms.projectCategories : projectCategories;
    const cmsStats = cms.projectStats?.length ? cms.projectStats : projectStats;
    const cmsTestimonials = cms.testimonials?.length ? cms.testimonials : defaultTestimonials;
    const cmsServices = cms.services?.length ? cms.services : defaultServices;
    const cmsSettings = mergeSettings(cms.settings);

    const projectCards = cmsProjects.map((project) => ({
      title: project.title,
      description: project.summary,
      image: project.image.replace(/^\//, ""),
      alt: project.alt,
      objectPosition: project.objectPosition,
    }));

    return {
      loading,
      error,
      content: cms,
      projects: cmsProjects,
      projectCategories: cmsCategories,
      projectStats: cmsStats,
      projectCards,
      services: cmsServices,
      testimonials: cmsTestimonials,
      settings: cmsSettings,
      contactSubmissions: cms.contactSubmissions ?? [],
      refresh: async () => {
        const data = await api.getContent();
        setContent(data);
        return data;
      },
    };
  }, [content, loading, error]);

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within ContentProvider");
  return ctx;
}
