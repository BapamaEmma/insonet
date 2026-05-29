import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import BackToTopButton from "./components/BackToTopButton";
import ContactForm from "./components/ContactForm";
import Navbar from "./components/Navbar";
import FadeInUp from "./components/motion/FadeInUp";
import FloatingImage from "./components/motion/FloatingImage";
import ScrollReveal from "./components/motion/ScrollReveal";
import TechHeroBackground from "./components/TechHeroBackground";
import { useContent } from "./context/ContentContext";
import { assetUrl, phoneHref, SOCIAL_LINKS } from "./utils/assetUrl";
import { fadeUpSmall, staggerContainer } from "./utils/motion";

const scriptUrls = [
  "assets/libs/preline/preline.js",
  "assets/libs/lucide/umd/lucide.min.js",
  "assets/libs/gumshoejs/gumshoe.polyfills.min.js",
  "assets/js/app.js",
];

export default function InsonetPage() {
  const { projectCards, settings, testimonials, services } = useContent();
  const navigate = useNavigate();
  const hero = settings.hero;
  const about = settings.about;
  const typingText = hero.typingText;
  const highlightedText = hero.highlightedText;
  const highlightStartIndex = typingText.indexOf(highlightedText);
  const totalTypingChars = typingText.length;
  const aboutHeadingParts = about.heading.split(/,\s*/);
  const testimonialsRef = useRef(null);
  const [typedCount, setTypedCount] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [projectSlide, setProjectSlide] = useState(0);
  const [projectsPerView, setProjectsPerView] = useState(() => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  });
  const maxProjectSlide = Math.max(0, projectCards.length - projectsPerView);
  const slideStep = 100 / projectsPerView;

  useEffect(() => {
    const cursorIntervalId = window.setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => window.clearInterval(cursorIntervalId);
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setTypedCount((prev) => {
        if (prev >= totalTypingChars) return 0;
        return prev + 1;
      });
    }, typedCount >= totalTypingChars ? 2200 : 85);

    return () => window.clearTimeout(timeoutId);
  }, [typedCount, totalTypingChars]);

  useEffect(() => {
    const onResize = () => {
      const width = window.innerWidth;
      const nextPerView = width >= 1024 ? 3 : width >= 768 ? 2 : 1;
      setProjectsPerView(nextPerView);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setProjectSlide((prev) => Math.min(prev, maxProjectSlide));
  }, [maxProjectSlide]);

  useEffect(() => {
    if (projectsPerView !== 1 || projectCards.length <= 1) return undefined;

    const intervalId = window.setInterval(() => {
      setProjectSlide((prev) => (prev >= maxProjectSlide ? 0 : prev + 1));
    }, 4500);

    return () => window.clearInterval(intervalId);
  }, [projectsPerView, maxProjectSlide, projectCards.length]);

  useEffect(() => {
    const appendedScripts = [];

    const loadScripts = async () => {
      for (const url of scriptUrls) {
        await new Promise((resolve, reject) => {
          const existing = document.querySelector(`script[data-insonet-script="${url}"]`);
          if (existing) {
            resolve();
            return;
          }

          const script = document.createElement("script");
          script.src = url;
          script.async = false;
          script.dataset.insonetScript = url;
          script.onload = () => resolve();
          script.onerror = reject;
          document.body.appendChild(script);
          appendedScripts.push(script);
        });
      }
    };

    loadScripts().catch(() => {
      // Keep rendering even if one vendor script fails.
    });

    return () => {
      appendedScripts.forEach((script) => script.remove());
    };
  }, []);

  const handleBackToTop = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (sectionId) => (event) => {
    event.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const goToProjects = (event) => {
    event.preventDefault();
    navigate("/projects");
  };

  const visibleTypingText = typingText.slice(0, typedCount);
  const visibleNormalText = visibleTypingText.slice(0, Math.max(highlightStartIndex, 0));
  const visibleHighlightedText =
    highlightStartIndex >= 0 ? visibleTypingText.slice(highlightStartIndex) : "";

  return (
    <>
      <Navbar />

    
    <section
        className="relative isolate overflow-x-hidden bg-white pt-32 pb-32"
        id="home"
      >
        <TechHeroBackground variant="light" nodeCount={45} />
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-white/10 via-white/35 to-white/70" />
        <div className="container relative z-[2]">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 items-center">
                <div className="hero-intro-col relative z-10 text-sm py-20 px-10">
                    <FadeInUp delay={0.08}>
                    <div
                      className="hero-badge-pill max-w-full"
                      style={{
                        border: "0.5px solid rgba(26, 86, 219, 0.45)",
                        borderRadius: "9999px",
                        backgroundColor: "#ffffff",
                      }}
                    >
                      <span className="hero-badge-text font-light uppercase leading-snug" style={{ color: "#94a3b8" }}>
                        {visibleNormalText}
                        <span style={{ color: "#7ba3ff", fontWeight: 400 }}>{visibleHighlightedText}</span>
                        {showCursor ? <span className="ml-0.5">|</span> : null}
                      </span>
                    </div>
                    </FadeInUp>
                    <motion.h1
                      className="text-5xl md:text-[42px] text-dark tracking-tight leading-tight font-bold mb-4 mt-6"
                      variants={staggerContainer(0.2)}
                      initial="hidden"
                      animate="visible"
                    >
                        <motion.span className="block whitespace-nowrap" variants={fadeUpSmall}>
                          {hero.headlineLine1}
                        </motion.span>
                        <motion.span className="block whitespace-nowrap" variants={fadeUpSmall}>
                          {hero.headlineLine2}
                        </motion.span>
                    </motion.h1>
                    <FadeInUp delay={0.35}>
                    <p className="text-base font-medium text-muted leading-7 mt-5">{hero.subtext}</p>
                    </FadeInUp>
                    <motion.div
                      className="flex flex-wrap items-center justify-center gap-3 lg:justify-normal mt-9"
                      variants={staggerContainer(0.14)}
                      initial="hidden"
                      animate="visible"
                    >
                        <motion.a
                          href="#services"
                          onClick={scrollToSection("services")}
                          variants={fadeUpSmall}
                          className="btn-motion relative z-10 cursor-pointer py-2 px-6 rounded-md text-white text-base bg-primary hover:bg-primaryDark border border-primary hover:border-primaryDark transition-all duration-500 font-medium"
                        >
                          Explore Services
                        </motion.a>
                        <motion.a
                          href="/projects"
                          onClick={goToProjects}
                          variants={fadeUpSmall}
                          className="btn-motion relative z-10 cursor-pointer py-2 px-6 rounded-md border border-primary text-base text-primary hover:bg-primary hover:text-white transition-all duration-500 font-medium"
                        >
                          View Projects
                        </motion.a>
                    </motion.div>
                </div>

                <div className="mt-4 pt-2 sm:mt-0 sm:pt-0 relative w-full max-w-[680px] mx-auto lg:mx-0 lg:ms-auto">
                    <FloatingImage
                      src={assetUrl(hero.image)}
                      alt="Security team at monitoring station"
                      className="w-full h-[560px] md:h-[650px] object-cover object-center shadow-2xl ring-1 ring-black/10"
                    />

                    <div className="absolute bottom-8 left-6 hidden xl:block">
                        <div className="flex items-center gap-2 p-2 pe-6 rounded-full bg-white shadow-2xl">
                            <div className="rounded-full bg-primary h-9 w-9 items-center justify-center flex">
                                <i data-lucide="headset" className="h-6 w-6 text-white"></i>
                            </div>
                            <div className="">
                                <h6 className="text-base font-medium text-default-900">24x7 Customer Support</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>

    
    <section id="services" className="py-20 bg-slate-50">
        <div className="container">
            <ScrollReveal className="max-w-3xl mx-auto text-center">
                <span className="text-sm text-primary uppercase font-semibold tracking-wider text-default-950">Services</span>
                <h2 className="text-3xl md:text-4xl/tight font-semibold text-black mt-4">Security services designed for reliability and rapid response</h2>
                <p className="text-base font-medium mt-4 text-muted">From camera monitoring to perimeter defense, our solutions are engineered to protect your operations 24/7.</p>
            </ScrollReveal>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mt-12">
                {services.map((service, index) => (
                  <ScrollReveal
                    key={service.id ?? service.title}
                    delay={index * 0.11}
                    className={`relative overflow-hidden p-6 shadow-sm ${service.cardTone}`}
                    style={{ borderRadius: "18px", border: "1px solid #e5e7eb" }}
                  >
                    <div className="flex h-full flex-col">
                      <h3 className="text-3xl md:text-[34px] leading-[1.12] font-semibold text-slate-900 break-words" style={{ minHeight: "92px" }}>
                        {service.title}
                      </h3>
                      <p className="mt-4 text-base md:text-lg leading-8 text-slate-600 overflow-hidden" style={{ height: "100px" }}>
                        {service.description}
                      </p>
                      <div className="mt-8">
                        <img
                          src={assetUrl(service.image)}
                          alt={service.title}
                          className="block w-full"
                          style={{ height: "190px", width: "100%", objectFit: "cover", objectPosition: service.objectPosition, borderRadius: "14px" }}
                        />
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
            </div>
        </div>
    </section>
    

    
    

    <section id="about" className="pt-24 pb-16 bg-white overflow-hidden">
        <div className="container">
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 items-center">
                <ScrollReveal className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ height: "540px" }}>
                    <img
                        src={assetUrl(about.image)}
                        alt="INSONET Systems team"
                        className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute bottom-5 right-5 bg-primary text-white rounded-xl px-5 py-3 shadow-xl">
                        <p className="text-2xl font-bold">{about.yearsStat}</p>
                        <p className="text-sm font-medium mt-0.5">{about.yearsLabel}</p>
                    </div>
                </ScrollReveal>
                <ScrollReveal className="py-4 lg:pl-6" delay={0.14}>
                    <span className="text-sm text-primary uppercase font-semibold tracking-widest">About Us</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-black mt-3 leading-tight">
                      {aboutHeadingParts[0]}
                      {aboutHeadingParts[1] ? (
                        <>
                          <br />
                          {aboutHeadingParts.slice(1).join(", ")}
                        </>
                      ) : null}
                    </h2>
                    <p className="text-base text-gray-500 mt-4 leading-7">{about.body}</p>
                    <div className="mt-8 flex flex-col gap-5">
                        <div className="flex items-start gap-4">
                            <div className="h-9 w-9 rounded-xl border border-primary/30 bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <i data-lucide="check" className="h-4 w-4 text-primary"></i>
                            </div>
                            <div>
                                <h4 className="text-base font-semibold text-black">End-to-End Expertise</h4>
                                <p className="text-sm text-gray-500 mt-1 leading-6">From design to deployment, a single partner for your security and network stack.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="h-9 w-9 rounded-xl border border-primary/30 bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <i data-lucide="check" className="h-4 w-4 text-primary"></i>
                            </div>
                            <div>
                                <h4 className="text-base font-semibold text-black">Enterprise-grade Standards</h4>
                                <p className="text-sm text-gray-500 mt-1 leading-6">Solutions aligned with industry best practices and compliance requirements.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="h-9 w-9 rounded-xl border border-primary/30 bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <i data-lucide="check" className="h-4 w-4 text-primary"></i>
                            </div>
                            <div>
                                <h4 className="text-base font-semibold text-black">Scalable Architecture</h4>
                                <p className="text-sm text-gray-500 mt-1 leading-6">Infrastructure that grows with your locations, users, and data needs.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="h-9 w-9 rounded-xl border border-primary/30 bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <i data-lucide="check" className="h-4 w-4 text-primary"></i>
                            </div>
                            <div>
                                <h4 className="text-base font-semibold text-black">Dedicated Support</h4>
                                <p className="text-sm text-gray-500 mt-1 leading-6">Local, responsive support teams that understand your environment.</p>
                            </div>
                        </div>
                    </div>
                    <a
                        href="#contact"
                        className="btn-motion inline-flex items-center justify-center gap-2 mt-8 py-3 rounded-xl text-white bg-primary hover:bg-primaryDark transition-all duration-300 font-medium text-base"
                        style={{ minWidth: "240px", paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                    >
                        Get In Touch
                        <i data-lucide="arrow-right" className="h-4 w-4"></i>
                    </a>
                </ScrollReveal>
            </div>
        </div>
    </section>

    <section id="projects" className="pt-20 pb-24 bg-white">
        <div className="container">
            <ScrollReveal className="max-w-3xl mx-auto text-center">
                <span className="text-sm text-primary uppercase font-semibold tracking-widest">Project Highlights</span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">Recent Implementations</h2>
            </ScrollReveal>

            <div className="mt-14 overflow-hidden projects-carousel">
                <div
                    className="flex projects-carousel__track"
                    style={{ transform: `translateX(-${projectSlide * slideStep}%)` }}
                >
                    {projectCards.map((project) => (
                        <div
                            key={project.title}
                            className="projects-carousel__slide flex-shrink-0 px-3"
                            style={{ width: `${slideStep}%` }}
                        >
                            <article className="rounded-2xl overflow-hidden bg-slate-900 shadow-xl h-full">
                                <div className="overflow-hidden" style={{ height: "220px", borderRadius: "16px 16px 0 0" }}>
                                    <img
                                        src={project.image}
                                        alt={project.alt}
                                        className="w-full h-full object-cover"
                                        style={{ objectPosition: project.objectPosition, borderRadius: "16px 16px 0 0" }}
                                    />
                                </div>
                                <div className="px-6 py-5">
                                    <h3 className="text-lg font-semibold text-slate-200">{project.title}</h3>
                                    <p className="text-sm text-slate-400 mt-2 leading-6">{project.description}</p>
                                </div>
                            </article>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-8">
                <button
                    type="button"
                    onClick={() => setProjectSlide((prev) => Math.max(prev - 1, 0))}
                    disabled={projectSlide === 0}
                    className="h-11 w-11 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-100 transition-all duration-300 font-bold flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    ←
                </button>
                <span className="text-sm text-slate-500">{projectSlide + 1} / {maxProjectSlide + 1}</span>
                <button
                    type="button"
                    onClick={() => setProjectSlide((prev) => Math.min(prev + 1, maxProjectSlide))}
                    disabled={projectSlide === maxProjectSlide}
                    className="h-11 w-11 rounded-full border border-primary bg-primary text-white hover:bg-primaryDark transition-all duration-300 font-bold flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    →
                </button>
            </div>
        </div>
    </section>

    

    
    <section id="testimonial" className="pb-24 bg-slate-50" style={{ paddingTop: "100px" }} ref={testimonialsRef}>
        <div className="container">
            <ScrollReveal className="text-center max-w-2xl mx-auto">
                <span className="text-sm text-primary uppercase font-semibold tracking-widest">Our Clients</span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">What Our Customers Say</h2>
                <p className="text-base text-slate-500 mt-4 leading-7">Real feedback from businesses we've partnered with across security, networking, and infrastructure.</p>
            </ScrollReveal>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-14">
                {testimonials.map((t, i) => (
                    <ScrollReveal
                      key={t.id ?? t.name}
                      delay={i * 0.14}
                      className="bg-white shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow duration-300"
                      style={{ padding: "32px 28px", borderRadius: "20px" }}
                    >
                        <div className="flex gap-1 justify-center mb-5">
                            {[...Array(5)].map((_, starIndex) => (
                                <svg key={starIndex} className="h-5 w-5" viewBox="0 0 20 20" style={{ fill: "#F59E0B", color: "#F59E0B" }}><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                            ))}
                        </div>
                        <p className="text-slate-600 text-sm leading-7 flex-1 text-center px-2">"{t.quote}"</p>
                        <div className="flex items-center gap-3 mt-6 pt-5 border-t border-slate-100">
                            <img
                                src={`https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(t.name)}&backgroundColor=1a56db&fontFamily=Arial&fontSize=38`}
                                alt={t.name}
                                className="h-12 w-12 rounded-full flex-shrink-0 border-2 border-slate-100"
                                style={{ backgroundColor: "#f1f5f9" }}
                            />
                            <div>
                                <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                                <p className="text-xs text-slate-500 mt-1">{t.role}</p>
                            </div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </div>
    </section>
    

    
    <section className="py-20 bg-gray-50">
        <div className="container relative">
            <div className="">
                <div className="text-center max-w-2xl mx-auto">
                    <span className="text-sm text-primary uppercase font-semibold tracking-widest">Our Clients</span>
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">Trusted by Leading Companies</h3>
                    <p className="text-base text-slate-500 mt-4 leading-7">We partner with businesses of all sizes to deliver secure, connected, and intelligent infrastructure.</p>
                </div>
            </div>

        </div>
    </section>

    <section id="contact" className="py-20 bg-gray-50">
        <div className="container">
            <div className="grid lg:grid-cols-3 gap-6 items-center">
                <ScrollReveal>
                    <div>
                        <span
                            className="text-sm text-primary uppercase font-semibold tracking-wider text-default-950 mb-6">Contact
                            Us</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl/tight font-semibold mt-4">We're open to talk to Our clients</h2>


                    <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-start mt-10">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <i data-lucide="map-pin" className="text-2xl text-primary"></i>
                        </div>
                        <div>
                            <h5 className="text-base text-muted font-medium mb-1">{settings.address}</h5>
                            <a href={settings.mapUrl} target="_blank" rel="noreferrer" className="text-xs text-primary font-bold uppercase">See on map</a>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-start mt-10">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <i data-lucide="mail" className="text-2xl text-primary"></i>
                        </div>
                        <div>
                            <h5 className="text-base text-muted font-medium mb-1">{settings.email}</h5>
                            <a href={`mailto:${settings.email}`} className="text-xs text-primary font-bold uppercase">Say hello</a>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-start mt-10">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <div>
                            <h5 className="text-base text-muted font-medium mb-1">{settings.phone}</h5>
                            <a href={phoneHref(settings.phone)} className="text-xs text-primary font-bold uppercase">Call now</a>
                        </div>
                    </div>

                </ScrollReveal>

                <div className="lg:col-span-2 lg:ms-24">
                    <ScrollReveal delay={0.16}>
                        <ContactForm />
                    </ScrollReveal>
                </div>
            </div>
        </div>
    </section>
    

    
    <footer className="bg-[#17243A]">
        <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 pb-16 pt-16">

                {/* Brand column */}
                <div className="col-span-full lg:col-span-2">
                    <div className="flex items-center">
                        <a href="/" className="inline-flex items-center me-5">
                            <img
                              src="/assets/images/insonet-logo-nav.png"
                              className="h-14 w-auto shrink-0"
                              alt="INSONET Systems logo"
                            />
                        </a>
                    </div>
                    <p className="text-white max-w-xs mt-6 text-sm leading-relaxed">
                        {settings.footer?.tagline}
                    </p>

                    <div className="mt-6 grid space-y-3">
                        <a className="inline-flex items-center gap-x-3 text-sm text-gray-300 hover:text-white transition-all duration-300" href={`mailto:${settings.email}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                            {settings.email}
                        </a>
                        <a className="inline-flex items-center gap-x-3 text-sm text-gray-300 hover:text-white transition-all duration-300" href={phoneHref(settings.phone)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                            {settings.phone}
                        </a>
                        <a className="inline-flex items-center gap-x-3 text-sm text-gray-300 hover:text-white transition-all duration-300" href={settings.mapUrl} target="_blank" rel="noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                            {settings.address}
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="col-span-1">
                    <h4 className="font-semibold text-gray-100 uppercase text-sm tracking-wider">Quick Links</h4>
                    <div className="mt-6 grid space-y-3">
                        <p><a className="inline-flex gap-x-2 text-sm text-gray-300 hover:text-white transition-all duration-300" href="#home">Home</a></p>
                        <p><a className="inline-flex gap-x-2 text-sm text-gray-300 hover:text-white transition-all duration-300" href="#about">About Us</a></p>
                        <p><a className="inline-flex gap-x-2 text-sm text-gray-300 hover:text-white transition-all duration-300" href="#services">Services</a></p>
                        <p><a className="inline-flex gap-x-2 text-sm text-gray-300 hover:text-white transition-all duration-300" href="/projects">Projects</a></p>
                        <p><a className="inline-flex gap-x-2 text-sm text-gray-300 hover:text-white transition-all duration-300" href="#contact">Contact</a></p>
                    </div>
                </div>

                {/* Services */}
                <div className="col-span-1">
                    <h4 className="font-semibold text-gray-100 uppercase text-sm tracking-wider">Services</h4>
                    <div className="mt-6 grid space-y-3">
                        {services.map((service) => (
                        <p key={service.id ?? service.title}><a className="inline-flex gap-x-2 text-sm text-gray-300 hover:text-white transition-all duration-300" href={service.link}>{service.title}</a></p>
                        ))}
                    </div>
                </div>

                {/* Contact CTA */}
                <div className="col-span-1">
                    <h4 className="font-semibold text-gray-100 uppercase text-sm tracking-wider">Get In Touch</h4>
                    <div className="mt-6 grid space-y-3">
                        <p className="text-sm text-white leading-relaxed">
                            Need a quote or a site assessment? Reach out to our team — we respond fast.
                        </p>
                        <a
                            href="#contact"
                            className="btn-motion inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-300 w-fit link-fade"
                            style={{ backgroundColor: "#1a56db" }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1649c0")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1a56db")}
                        >
                            Contact Us
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>
                </div>

            </div>

            <div className="flex items-center justify-center gap-3 pb-10 border-t border-white/10 pt-10">
                <a className="h-12 w-12 inline-flex justify-center items-center rounded-md border border-transparent text-white hover:bg-primary social-icon-motion transition-all duration-300" href={settings.social?.facebook || SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
                    <svg className="flex-shrink-0 h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                    </svg>
                </a>
                <a className="h-12 w-12 inline-flex justify-center items-center rounded-md border border-transparent text-white hover:bg-primary social-icon-motion transition-all duration-300" href={settings.social?.instagram || SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                    <svg className="flex-shrink-0 h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                    </svg>
                </a>
                <a className="h-12 w-12 inline-flex justify-center items-center rounded-md border border-transparent text-white hover:bg-primary social-icon-motion transition-all duration-300" href={settings.social?.whatsapp || SOCIAL_LINKS.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp">
                    <svg className="flex-shrink-0 h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.248-.007-.382-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                    </svg>
                </a>
            </div>
        </div>

        <div className="py-4 bg-[#1C2940]">
            <div className="container">
                <p className="text-sm text-white text-center">© {new Date().getFullYear()} INSONET Systems. All rights reserved.</p>
            </div>
        </div>
    
    </footer>
    
    
      <BackToTopButton onClick={handleBackToTop} />
    </>
  );
}
