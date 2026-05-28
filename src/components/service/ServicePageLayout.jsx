import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import FadeInUp from "../motion/FadeInUp";
import ScrollReveal from "../motion/ScrollReveal";
import { SOCIAL_LINKS } from "../../utils/assetUrl";
import { fadeUpSmall, floatLoop, scaleIn, staggerContainer, viewportOnce } from "../../utils/motion";

function CheckIcon() {
  return (
    <svg
      className="shrink-0"
      style={{ color: "#4fa3e0", width: "20px", height: "20px", marginTop: "2px" }}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function ServicePageLayout({
  heroTaglineAccent,
  heroTaglineRest,
  heroTitle,
  heroParagraphs,
  heroImage,
  devicesSubtitle,
  deviceComponents,
  whyTitleLines,
  whyBody,
  whyBullets,
  aboutImage,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const goContact = (event) => {
    event.preventDefault();
    navigate("/");
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 120);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section
        style={{
          marginTop: "88px",
          display: "flex",
          flexDirection: "column",
          minHeight: "580px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "row",
            minHeight: "580px",
          }}
          className="service-hero-layout"
        >
          <div
            style={{
              flex: "0 0 46%",
              backgroundColor: "#0d1b2e",
              display: "flex",
              alignItems: "center",
              padding: "64px 48px",
            }}
            className="service-hero-text"
          >
            <div style={{ maxWidth: "560px", width: "100%" }}>
              <FadeInUp delay={0.08}>
                <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-4">
                  <span style={{ color: "#4fa3e0" }}>{heroTaglineAccent}</span>
                  <span style={{ color: "#ffffff" }}>{heroTaglineRest}</span>
                </span>
              </FadeInUp>

              <motion.h1
                className="font-bold leading-tight mb-6"
                style={{
                  color: "#ffffff",
                  fontSize: "clamp(2.25rem, 3.8vw, 3.75rem)",
                  lineHeight: 1.15,
                }}
                variants={staggerContainer(0.2)}
                initial="hidden"
                animate="visible"
              >
                <motion.span className="block" variants={fadeUpSmall}>
                  {heroTitle}
                </motion.span>
              </motion.h1>

              <FadeInUp delay={0.35}>
                <div>
                  {heroParagraphs.map((paragraph, index) => (
                    <p
                      key={paragraph.slice(0, 32)}
                      className="text-base md:text-lg leading-relaxed"
                      style={{
                        color: "#d1d5db",
                        marginBottom: index < heroParagraphs.length - 1 ? "16px" : 0,
                      }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </FadeInUp>
            </div>
          </div>

          <div
            style={{
              flex: 1,
              position: "relative",
              minHeight: "360px",
              overflow: "hidden",
              backgroundColor: "#0d1b2e",
            }}
            className="service-hero-image"
          >
            <motion.div
              className="absolute inset-0"
              initial="hidden"
              animate="visible"
              variants={scaleIn}
            >
              <motion.img
                src={heroImage.src}
                alt={heroImage.alt}
                animate={floatLoop}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: heroImage.objectPosition ?? "center center",
                }}
              />
            </motion.div>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to right, #0d1b2e 0%, rgba(13,27,46,0.45) 18%, transparent 42%)",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 991px) {
          .service-hero-layout {
            flex-direction: column !important;
            min-height: auto !important;
          }
          .service-hero-text {
            flex: none !important;
            padding: 48px 24px !important;
          }
          .service-hero-image {
            min-height: 320px !important;
          }
        }
      `}</style>

      <section className="py-20 bg-white">
        <div className="container">
          <ScrollReveal className="text-center mb-12">
            <h2
              className="font-bold mb-3"
              style={{ color: "#0d1b2e", fontSize: "clamp(2rem, 3.5vw, 2.75rem)" }}
            >
              Devices &amp; Components We Use
            </h2>
            <p
              className="uppercase tracking-widest font-semibold"
              style={{ color: "#4fa3e0", fontSize: "0.8rem", letterSpacing: "0.12em" }}
            >
              {devicesSubtitle}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.14}>
            <div
              className="mx-auto overflow-hidden"
              style={{
                maxWidth: "920px",
                borderRadius: "20px",
                border: "2px solid #0d1b2e",
                boxShadow: "0 8px 30px rgba(13, 27, 46, 0.08)",
              }}
            >
              {deviceComponents.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.68, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    padding: "22px 28px",
                    backgroundColor: index % 2 === 0 ? "#ffffff" : "#f3f4f6",
                    borderBottom:
                      index < deviceComponents.length - 1 ? "1px solid #e5e7eb" : "none",
                  }}
                >
                  <p style={{ margin: 0, fontSize: "1rem", lineHeight: 1.6, color: "#374151" }}>
                    <strong style={{ color: "#0d1b2e", fontWeight: 700 }}>{item.label}:</strong>{" "}
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section style={{ backgroundColor: "#ffffff", padding: "80px 0" }}>
        <div className="container flex flex-col lg:flex-row items-center" style={{ gap: "56px" }}>
          <ScrollReveal className="flex-1" delay={0.14} style={{ padding: "48px 40px", maxWidth: "640px" }}>
            <span
              className="inline-block uppercase font-semibold tracking-widest"
              style={{
                color: "#4fa3e0",
                fontSize: "0.8rem",
                letterSpacing: "0.12em",
                marginBottom: "16px",
              }}
            >
              Why Choose INSONET
            </span>
            <h2
              className="font-bold"
              style={{
                color: "#0d1b2e",
                fontSize: "clamp(1.875rem, 3vw, 2.5rem)",
                lineHeight: 1.25,
                marginBottom: "24px",
                paddingBottom: "8px",
              }}
            >
              {whyTitleLines[0]}
              <br />
              {whyTitleLines[1]}
            </h2>
            <p
              style={{
                color: "#4b5563",
                fontSize: "1.05rem",
                lineHeight: 1.75,
                marginBottom: "32px",
                paddingRight: "12px",
              }}
            >
              {whyBody}
            </p>
            <ul
              style={{
                display: "grid",
                gap: "14px",
                marginBottom: "36px",
                padding: "28px 24px",
                backgroundColor: "#f8fafc",
                borderRadius: "16px",
                border: "1px solid #e5e7eb",
              }}
            >
              {whyBullets.map((item) => (
                <li
                  key={item}
                  className="flex items-start"
                  style={{
                    color: "#374151",
                    fontSize: "0.98rem",
                    lineHeight: 1.6,
                    gap: "12px",
                    padding: "4px 0",
                  }}
                >
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                paddingTop: "8px",
                borderTop: "1px solid #e5e7eb",
              }}
            >
              <a
                href="tel:+233262842077"
                className="inline-flex items-center transition-colors link-fade"
                style={{ color: "#374151", fontSize: "0.95rem", gap: "14px", padding: "6px 0" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#0d1b2e")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#374151")}
              >
                <span
                  className="inline-flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: "#1a56db",
                    width: "40px",
                    height: "40px",
                    borderRadius: "9999px",
                  }}
                >
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                +233 2628 42 077
              </a>
              <a
                href="mailto:info@insonetgh.com"
                className="inline-flex items-center transition-colors link-fade"
                style={{ color: "#374151", fontSize: "0.95rem", gap: "14px", padding: "6px 0" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#0d1b2e")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#374151")}
              >
                <span
                  className="inline-flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: "#1a56db",
                    width: "40px",
                    height: "40px",
                    borderRadius: "9999px",
                  }}
                >
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                info@insonetgh.com
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal
            className="flex-1 overflow-hidden shadow-2xl"
            delay={0.2}
            style={{
              maxWidth: "420px",
              width: "100%",
              minHeight: "480px",
              maxHeight: "560px",
              borderRadius: "20px",
              padding: "8px",
              backgroundColor: "#f8fafc",
              margin: "0 auto",
            }}
          >
            <motion.img
              src={aboutImage.src}
              alt={aboutImage.alt}
              className="w-full h-full object-cover"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={scaleIn}
              style={{
                minHeight: "464px",
                maxHeight: "544px",
                borderRadius: "14px",
                objectPosition: aboutImage.objectPosition ?? "center center",
              }}
            />
          </ScrollReveal>
        </div>
      </section>

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
                INSONET Systems delivers professional security and network solutions — CCTV, access control,
                network infrastructure, and more — to businesses across Ghana.
              </p>
              <div className="mt-6 grid space-y-3">
                <a className="inline-flex items-center gap-x-3 text-sm text-gray-300 hover:text-white transition-all duration-300 link-fade" href="mailto:info@insonetgh.com">
                  info@insonetgh.com
                </a>
                <a className="inline-flex items-center gap-x-3 text-sm text-gray-300 hover:text-white transition-all duration-300 link-fade" href="tel:+233262842077">
                  +233 2628 42 077
                </a>
                <a className="inline-flex items-center gap-x-3 text-sm text-gray-300 hover:text-white transition-all duration-300 link-fade" href="https://maps.google.com/?q=Spintex,Accra,Ghana" target="_blank" rel="noreferrer">
                  Spintex, Accra, Ghana
                </a>
              </div>
            </div>

            <div className="col-span-1">
              <h4 className="font-semibold text-gray-100 uppercase text-sm tracking-wider">Quick Links</h4>
              <div className="mt-6 grid space-y-3">
                <p><a className="inline-flex gap-x-2 text-sm text-gray-300 hover:text-white transition-all duration-300 link-fade" href="/#home">Home</a></p>
                <p><a className="inline-flex gap-x-2 text-sm text-gray-300 hover:text-white transition-all duration-300 link-fade" href="/#about">About Us</a></p>
                <p><a className="inline-flex gap-x-2 text-sm text-gray-300 hover:text-white transition-all duration-300 link-fade" href="/#services">Services</a></p>
                <p><a className="inline-flex gap-x-2 text-sm text-gray-300 hover:text-white transition-all duration-300 link-fade" href="/projects">Projects</a></p>
                <p><a className="inline-flex gap-x-2 text-sm text-gray-300 hover:text-white transition-all duration-300 link-fade" href="/#contact">Contact</a></p>
              </div>
            </div>

            <div className="col-span-1">
              <h4 className="font-semibold text-gray-100 uppercase text-sm tracking-wider">Services</h4>
              <div className="mt-6 grid space-y-3">
                <p><a className="inline-flex gap-x-2 text-sm text-gray-300 hover:text-white transition-all duration-300 link-fade" href="/services/cctv">CCTV Surveillance</a></p>
                <p><a className="inline-flex gap-x-2 text-sm text-gray-300 hover:text-white transition-all duration-300 link-fade" href="/services/network">Network Infrastructure</a></p>
                <p><a className="inline-flex gap-x-2 text-sm text-gray-300 hover:text-white transition-all duration-300 link-fade" href="/services/access-control">Access Control</a></p>
                <p><a className="inline-flex gap-x-2 text-sm text-gray-300 hover:text-white transition-all duration-300 link-fade" href="/services/cybersecurity">Cybersecurity</a></p>
                <p><a className="inline-flex gap-x-2 text-sm text-gray-300 hover:text-white transition-all duration-300 link-fade" href="/services/perimeter-fencing">Perimeter Fencing</a></p>
                <p><a className="inline-flex gap-x-2 text-sm text-gray-300 hover:text-white transition-all duration-300 link-fade" href="/services/hardware-maintenance">Hardware Maintenance</a></p>
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
                  className="btn-motion inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-300 w-fit link-fade"
                  style={{ backgroundColor: "#1a56db" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1649c0")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1a56db")}
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pb-10 border-t border-white/10 pt-10">
            <a className="h-12 w-12 inline-flex justify-center items-center rounded-md border border-transparent text-white hover:bg-primary social-icon-motion transition-all duration-300" href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
              <svg className="flex-shrink-0 h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
              </svg>
            </a>
            <a className="h-12 w-12 inline-flex justify-center items-center rounded-md border border-transparent text-white hover:bg-primary social-icon-motion transition-all duration-300" href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg className="flex-shrink-0 h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
              </svg>
            </a>
            <a className="h-12 w-12 inline-flex justify-center items-center rounded-md border border-transparent text-white hover:bg-primary social-icon-motion transition-all duration-300" href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <svg className="flex-shrink-0 h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.248-.007-.382-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="py-4 bg-[#1C2940]">
          <div className="container">
            <p className="text-sm text-white text-center">
              © {new Date().getFullYear()} INSONET Systems. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
