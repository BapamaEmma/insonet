import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CountUpNumber from "../components/CountUpNumber";
import Navbar from "../components/Navbar";
import TechHeroBackground from "../components/TechHeroBackground";
import { useContent } from "../context/ContentContext";

const categoryColors = {
  "CCTV Surveillance": { bg: "#dbeafe", text: "#1d4ed8", accent: "#2563eb" },
  "Network Infrastructure": { bg: "#e0e7ff", text: "#4338ca", accent: "#4f46e5" },
  "Access Control": { bg: "#d1fae5", text: "#047857", accent: "#059669" },
  Cybersecurity: { bg: "#ede9fe", text: "#6d28d9", accent: "#7c3aed" },
  "Perimeter Fencing": { bg: "#ffedd5", text: "#c2410c", accent: "#ea580c" },
  "Hardware Maintenance": { bg: "#ccfbf1", text: "#0f766e", accent: "#0d9488" },
};

function MetaChip({ icon, label }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "6px 12px",
        borderRadius: "9999px",
        backgroundColor: "#f1f5f9",
        color: "#475569",
        fontSize: "0.82rem",
        fontWeight: 500,
      }}
    >
      {icon}
      {label}
    </span>
  );
}

function CategoryFilterButton({ category, isActive, onSelect, ariaHidden = false }) {
  return (
    <button
      type="button"
      onClick={(event) => onSelect(category, event)}
      aria-hidden={ariaHidden || undefined}
      tabIndex={ariaHidden ? -1 : undefined}
      style={{
        padding: "10px 18px",
        borderRadius: "9999px",
        border: isActive ? "none" : "1px solid #cbd5e1",
        backgroundColor: isActive ? "#0d1b2e" : "#ffffff",
        color: isActive ? "#ffffff" : "#475569",
        fontSize: "0.875rem",
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.2s ease",
        boxShadow: isActive ? "0 4px 14px rgba(13,27,46,0.2)" : "none",
        whiteSpace: "nowrap",
        flexShrink: 0,
      }}
    >
      {category}
    </button>
  );
}

export default function ProjectsPage() {
  const navigate = useNavigate();
  const { projects, projectCategories, projectStats } = useContent();
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredId, setHoveredId] = useState(null);
  const [marqueePaused, setMarqueePaused] = useState(false);
  const marqueeResumeRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    return () => {
      if (marqueeResumeRef.current) {
        clearTimeout(marqueeResumeRef.current);
      }
    };
  }, []);

  const handleCategorySelect = (category, event) => {
    setActiveCategory(category);
    event?.currentTarget?.blur();

    setMarqueePaused(true);
    if (marqueeResumeRef.current) {
      clearTimeout(marqueeResumeRef.current);
    }
    marqueeResumeRef.current = setTimeout(() => {
      setMarqueePaused(false);
    }, 700);
  };

  const goContact = (e) => {
    e.preventDefault();
    navigate("/");
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 120);
  };

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const mobileProjectCategories = projectCategories.filter(
    (category) => category !== "All",
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section
        style={{
          marginTop: "88px",
          background: "linear-gradient(135deg, #0d1b2e 0%, #1a365d 45%, #0d1b2e 100%)",
          position: "relative",
          overflow: "hidden",
          padding: "88px 0 72px",
        }}
      >
        <TechHeroBackground variant="dark" />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "720px" }}>
            <span
              style={{
                display: "inline-block",
                color: "#4fa3e0",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              Our Work
            </span>
            <h1
              style={{
                color: "#ffffff",
                fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
                fontWeight: 700,
                lineHeight: 1.12,
                marginBottom: "20px",
              }}
            >
              Projects That Power<br />Secure Businesses
            </h1>
            <p
              style={{
                color: "#cbd5e1",
                fontSize: "1.125rem",
                lineHeight: 1.75,
                maxWidth: "580px",
              }}
            >
              From CCTV rollouts and network refreshes to perimeter fencing and
              long-term maintenance — explore how INSONET delivers end-to-end
              security and infrastructure solutions across Ghana.
            </p>
          </div>

          <div
            className="projects-hero-stats"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
              marginTop: "48px",
              maxWidth: "900px",
            }}
          >
            {projectStats.map((stat) => (
              <div
                key={stat.label}
                className="projects-hero-stat"
                style={{
                  padding: "28px 32px",
                  borderRadius: "16px",
                  backgroundColor: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <CountUpNumber
                  target={stat.target}
                  suffix={stat.suffix}
                  style={{
                    color: "#4fa3e0",
                    fontSize: "clamp(3.25rem, 7vw, 5rem)",
                    fontWeight: 800,
                    margin: 0,
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                />
                <p
                  className="projects-hero-stat-label"
                  style={{
                    color: "#94a3b8",
                    fontSize: "0.875rem",
                    margin: "6px 0 0",
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter */}
      <section
        className="projects-filter-section"
        style={{
          padding: "32px 0",
          backgroundColor: "#f8fafc",
          borderBottom: "1px solid #e2e8f0",
          position: "sticky",
          top: "88px",
          zIndex: 40,
        }}
      >
        <div className="container projects-filter-desktop">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            {projectCategories.map((category) => (
              <CategoryFilterButton
                key={category}
                category={category}
                isActive={activeCategory === category}
                onSelect={handleCategorySelect}
              />
            ))}
          </div>
        </div>

        <div className="projects-filter-marquee" aria-label="Project categories">
          <div
            className={`projects-filter-marquee__track${marqueePaused ? " is-paused" : ""}`}
          >
            {[...mobileProjectCategories, ...mobileProjectCategories].map((category, index) => (
              <CategoryFilterButton
                key={`${category}-${index}`}
                category={category}
                isActive={activeCategory === category}
                onSelect={handleCategorySelect}
                ariaHidden={index >= mobileProjectCategories.length}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Project cards grid preview */}
      <section style={{ padding: "64px 0 32px", backgroundColor: "#ffffff" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {filteredProjects.map((project) => {
              const colors = categoryColors[project.category] || categoryColors["CCTV Surveillance"];
              const isHovered = hoveredId === project.id;

              return (
                <article
                  key={project.id}
                  id={project.id}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    boxShadow: isHovered
                      ? "0 20px 40px rgba(13,27,46,0.12)"
                      : "0 4px 20px rgba(13,27,46,0.06)",
                    transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
                    <img
                      src={project.image}
                      alt={project.alt}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: project.objectPosition,
                        transform: isHovered ? "scale(1.05)" : "scale(1)",
                        transition: "transform 0.4s ease",
                      }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        top: "14px",
                        left: "14px",
                        padding: "6px 12px",
                        borderRadius: "9999px",
                        backgroundColor: colors.bg,
                        color: colors.text,
                        fontSize: "0.75rem",
                        fontWeight: 600,
                      }}
                    >
                      {project.category}
                    </span>
                  </div>
                  <div style={{ padding: "22px 24px 26px" }}>
                    <h3
                      style={{
                        color: "#0d1b2e",
                        fontSize: "1.125rem",
                        fontWeight: 700,
                        margin: "0 0 8px",
                        lineHeight: 1.35,
                      }}
                    >
                      {project.title}
                    </h3>
                    <p
                      style={{
                        color: "#64748b",
                        fontSize: "0.9rem",
                        lineHeight: 1.6,
                        margin: "0 0 16px",
                      }}
                    >
                      {project.summary}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      <MetaChip
                        label={project.location.split(",")[0]}
                        icon={
                          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        }
                      />
                      <MetaChip
                        label={project.duration}
                        icon={
                          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        }
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed case studies */}
      <section style={{ padding: "32px 0 80px", backgroundColor: "#f8fafc" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <span
              style={{
                color: "#4fa3e0",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Case Studies
            </span>
            <h2
              style={{
                color: "#0d1b2e",
                fontSize: "clamp(1.875rem, 3.5vw, 2.5rem)",
                fontWeight: 700,
                marginTop: "12px",
                marginBottom: "12px",
              }}
            >
              Full Project Breakdown
            </h2>
            <p style={{ color: "#64748b", fontSize: "1.05rem", maxWidth: "560px", margin: "0 auto" }}>
              Detailed scope, deliverables, and outcomes for every engagement.
            </p>
          </div>

          <div style={{ display: "grid", gap: "48px" }}>
            {filteredProjects.map((project, index) => {
              const colors = categoryColors[project.category] || categoryColors["CCTV Surveillance"];
              const imageFirst = index % 2 === 0;

              return (
                <article
                  key={`detail-${project.id}`}
                  style={{
                    display: "grid",
                    gridTemplateColumns: imageFirst ? "1fr 1.1fr" : "1.1fr 1fr",
                    gap: "0",
                    borderRadius: "24px",
                    overflow: "hidden",
                    backgroundColor: "#ffffff",
                    boxShadow: "0 8px 30px rgba(13,27,46,0.08)",
                    border: "1px solid #e2e8f0",
                  }}
                  className="project-detail-layout"
                >
                  <div
                    style={{
                      order: imageFirst ? 1 : 2,
                      position: "relative",
                      minHeight: "360px",
                      overflow: "hidden",
                    }}
                    className="project-detail-image"
                  >
                    <img
                      src={project.image}
                      alt={project.alt}
                      style={{
                        width: "100%",
                        height: "100%",
                        minHeight: "360px",
                        objectFit: "cover",
                        objectPosition: project.objectPosition,
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to top, rgba(13,27,46,0.5) 0%, transparent 50%)",
                      }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        bottom: "20px",
                        left: "20px",
                        padding: "8px 14px",
                        borderRadius: "9999px",
                        backgroundColor: colors.bg,
                        color: colors.text,
                        fontSize: "0.8rem",
                        fontWeight: 600,
                      }}
                    >
                      {project.category}
                    </span>
                  </div>

                  <div
                    style={{
                      order: imageFirst ? 2 : 1,
                      padding: "40px 36px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                    className="project-detail-content"
                  >
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
                      <MetaChip label={project.client} icon={<span style={{ fontSize: "12px" }}>🏢</span>} />
                      <MetaChip label={project.location} icon={<span style={{ fontSize: "12px" }}>📍</span>} />
                      <MetaChip label={project.duration} icon={<span style={{ fontSize: "12px" }}>⏱</span>} />
                      <MetaChip label={project.year} icon={<span style={{ fontSize: "12px" }}>📅</span>} />
                    </div>

                    <h3
                      style={{
                        color: "#0d1b2e",
                        fontSize: "clamp(1.5rem, 2.5vw, 1.875rem)",
                        fontWeight: 700,
                        margin: "0 0 14px",
                        lineHeight: 1.25,
                      }}
                    >
                      {project.title}
                    </h3>

                    <p
                      style={{
                        color: "#475569",
                        fontSize: "1rem",
                        lineHeight: 1.75,
                        margin: "0 0 24px",
                      }}
                    >
                      {project.description}
                    </p>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "20px",
                        marginBottom: "24px",
                      }}
                    >
                      <div>
                        <h4
                          style={{
                            color: colors.accent,
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            margin: "0 0 10px",
                          }}
                        >
                          Scope
                        </h4>
                        <ul style={{ margin: 0, padding: "0 0 0 18px", color: "#475569", fontSize: "0.9rem", lineHeight: 1.7 }}>
                          {project.scope.map((item) => (
                            <li key={item} style={{ marginBottom: "4px" }}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4
                          style={{
                            color: colors.accent,
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            margin: "0 0 10px",
                          }}
                        >
                          Deliverables
                        </h4>
                        <ul style={{ margin: 0, padding: "0 0 0 18px", color: "#475569", fontSize: "0.9rem", lineHeight: 1.7 }}>
                          {project.deliverables.map((item) => (
                            <li key={item} style={{ marginBottom: "4px" }}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div
                      style={{
                        padding: "16px 18px",
                        borderRadius: "14px",
                        backgroundColor: "#f0fdf4",
                        border: "1px solid #bbf7d0",
                        marginBottom: "20px",
                      }}
                    >
                      <h4
                        style={{
                          color: "#15803d",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          margin: "0 0 8px",
                        }}
                      >
                        Key Outcomes
                      </h4>
                      <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                        {project.outcomes.map((item) => (
                          <li
                            key={item}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "8px",
                              color: "#166534",
                              fontSize: "0.9rem",
                              lineHeight: 1.6,
                              marginBottom: "4px",
                            }}
                          >
                            <svg style={{ flexShrink: 0, marginTop: "3px" }} width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#16a34a">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      to={project.serviceLink}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        color: colors.accent,
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        textDecoration: "none",
                      }}
                    >
                      Explore {project.category} service
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "72px 0",
          background: "linear-gradient(135deg, #0d1b2e 0%, #1a365d 100%)",
        }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <h2
            style={{
              color: "#ffffff",
              fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
              fontWeight: 700,
              marginBottom: "14px",
            }}
          >
            Ready to Start Your Next Project?
          </h2>
          <p
            style={{
              color: "#94a3b8",
              fontSize: "1.05rem",
              maxWidth: "520px",
              margin: "0 auto 28px",
              lineHeight: 1.7,
            }}
          >
            Tell us about your site and security needs — our team will respond
            with a tailored proposal and site assessment.
          </p>
          <a
            href="/#contact"
            onClick={goContact}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 28px",
              borderRadius: "12px",
              backgroundColor: "#1a56db",
              color: "#ffffff",
              fontSize: "1rem",
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 8px 24px rgba(26,86,219,0.35)",
            }}
          >
            Get a Free Quote
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      <style>{`
        .projects-filter-marquee {
          display: none;
        }

        @keyframes projects-filter-marquee-ltr {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }

        @media (max-width: 767px) {
          .projects-filter-section {
            padding: 20px 0 !important;
          }

          .projects-filter-desktop {
            display: none;
          }

          .projects-filter-marquee {
            display: block;
            overflow: hidden;
            width: 100%;
            -webkit-mask-image: linear-gradient(
              to right,
              transparent,
              #000 6%,
              #000 94%,
              transparent
            );
            mask-image: linear-gradient(
              to right,
              transparent,
              #000 6%,
              #000 94%,
              transparent
            );
          }

          .projects-filter-marquee__track {
            display: flex;
            gap: 10px;
            width: max-content;
            padding: 0 16px;
            animation: projects-filter-marquee-ltr 40s linear infinite;
          }

          .projects-filter-marquee__track.is-paused {
            animation-play-state: paused;
          }

          @media (hover: hover) and (pointer: fine) {
            .projects-filter-marquee__track:hover:not(.is-paused) {
              animation-play-state: paused;
            }
          }

          .projects-hero-stats {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 10px !important;
            max-width: 100% !important;
          }
          .projects-hero-stat {
            padding: 16px 8px !important;
            text-align: center;
          }
          .projects-hero-stat > p:first-child {
            font-size: clamp(1.5rem, 7vw, 2.25rem) !important;
          }
          .projects-hero-stat-label {
            font-size: 0.625rem !important;
            line-height: 1.35 !important;
            margin-top: 4px !important;
          }
        }

        @media (min-width: 768px) {
          .projects-filter-marquee {
            display: none;
          }
        }

        @media (max-width: 991px) {
          .project-detail-layout {
            grid-template-columns: 1fr !important;
          }
          .project-detail-image {
            min-height: 260px !important;
          }
          .project-detail-image img {
            min-height: 260px !important;
          }
          .project-detail-content {
            padding: 28px 24px !important;
          }
        }
      `}</style>

      <footer className="bg-[#17243A]">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 pb-16 pt-16">
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
                INSONET Systems delivers professional security and network
                solutions — CCTV, access control, network infrastructure, and
                more — to businesses across Ghana.
              </p>
              <div className="mt-6 grid space-y-3">
                <a className="inline-flex items-center gap-x-3 text-sm text-gray-300 hover:text-white transition-all duration-300" href="mailto:info@insonetgh.com">info@insonetgh.com</a>
                <a className="inline-flex items-center gap-x-3 text-sm text-gray-300 hover:text-white transition-all duration-300" href="tel:+233262842077">+233 2628 42 077</a>
                <a className="inline-flex items-center gap-x-3 text-sm text-gray-300 hover:text-white transition-all duration-300" href="https://maps.google.com/?q=Spintex,Accra,Ghana" target="_blank" rel="noreferrer">Spintex, Accra, Ghana</a>
              </div>
            </div>
            <div className="col-span-1">
              <h4 className="font-semibold text-gray-100 uppercase text-sm tracking-wider">Quick Links</h4>
              <div className="mt-6 grid space-y-3">
                <p><a className="inline-flex gap-x-2 text-sm text-gray-300 hover:text-white transition-all duration-300" href="/#home">Home</a></p>
                <p><a className="inline-flex gap-x-2 text-sm text-gray-300 hover:text-white transition-all duration-300" href="/#about">About Us</a></p>
                <p><a className="inline-flex gap-x-2 text-sm text-gray-300 hover:text-white transition-all duration-300" href="/#services">Services</a></p>
                <p><Link className="inline-flex gap-x-2 text-sm text-gray-300 hover:text-white transition-all duration-300" to="/projects">Projects</Link></p>
                <p><a className="inline-flex gap-x-2 text-sm text-gray-300 hover:text-white transition-all duration-300" href="/#contact">Contact</a></p>
              </div>
            </div>
            <div className="col-span-1">
              <h4 className="font-semibold text-gray-100 uppercase text-sm tracking-wider">Services</h4>
              <div className="mt-6 grid space-y-3">
                <p><Link className="inline-flex gap-x-2 text-sm text-gray-300 hover:text-white transition-all duration-300" to="/services/cctv">CCTV Surveillance</Link></p>
                <p><Link className="inline-flex gap-x-2 text-sm text-gray-300 hover:text-white transition-all duration-300" to="/services/network">Network Infrastructure</Link></p>
                <p><Link className="inline-flex gap-x-2 text-sm text-gray-300 hover:text-white transition-all duration-300" to="/services/access-control">Access Control</Link></p>
                <p><Link className="inline-flex gap-x-2 text-sm text-gray-300 hover:text-white transition-all duration-300" to="/services/cybersecurity">Cybersecurity</Link></p>
                <p><Link className="inline-flex gap-x-2 text-sm text-gray-300 hover:text-white transition-all duration-300" to="/services/perimeter-fencing">Perimeter Fencing</Link></p>
                <p><Link className="inline-flex gap-x-2 text-sm text-gray-300 hover:text-white transition-all duration-300" to="/services/hardware-maintenance">Hardware Maintenance</Link></p>
              </div>
            </div>
            <div className="col-span-1">
              <h4 className="font-semibold text-gray-100 uppercase text-sm tracking-wider">Get In Touch</h4>
              <div className="mt-6 grid space-y-3">
                <p className="text-sm text-white leading-relaxed">
                  Need a quote or a site assessment? Reach out to our team — we respond fast.
                </p>
                <a
                  href="/#contact"
                  onClick={goContact}
                  className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-300 w-fit"
                  style={{ backgroundColor: "#1a56db" }}
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="py-4 bg-[#1C2940]">
          <div className="container">
            <p className="text-sm text-white">
              © {new Date().getFullYear()} INSONET Systems. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
