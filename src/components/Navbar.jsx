import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navbarScripts = ["assets/libs/lucide/umd/lucide.min.js"];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleOutside = (event) => {
      if (window.innerWidth >= 1024) return;
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener("click", handleOutside);
    return () => document.removeEventListener("click", handleOutside);
  }, []);

  useEffect(() => {
    const appendedScripts = [];

    const loadScripts = async () => {
      for (const url of navbarScripts) {
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

      if (window.lucide?.createIcons) {
        window.lucide.createIcons();
      }
    };

    loadScripts().catch(() => {
      // Keep navbar usable even if a vendor script fails.
    });

    return () => {
      appendedScripts.forEach((script) => script.remove());
    };
  }, []);

  useEffect(() => {
    if (window.lucide?.createIcons) {
      window.lucide.createIcons();
    }
  }, [isServicesOpen, isMobileMenuOpen, location.pathname]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen || window.innerWidth >= 1024) {
      document.body.style.overflow = "";
      return undefined;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  };

  const goHome = (event) => {
    event.preventDefault();
    closeMobileMenu();
    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    navigate("/");
  };

  const goToSection = (sectionId) => (event) => {
    event.preventDefault();
    closeMobileMenu();

    if (isHomePage) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    navigate("/");
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }, 120);
  };

  const goToService = (path) => (event) => {
    event.preventDefault();
    closeMobileMenu();
    navigate(path);
  };

  const serviceLinks = [
    { label: "CCTV Surveillance", path: "/services/cctv" },
    { label: "Network Infrastructure", path: "/services/network" },
    { label: "Access Control", path: "/services/access-control" },
    { label: "Cybersecurity", path: "/services/cybersecurity" },
    { label: "Perimeter Fencing", path: "/services/perimeter-fencing" },
    { label: "Hardware Maintenance", path: "/services/hardware-maintenance" },
  ];

  const navLinks = [
    { label: "Home", href: isHomePage ? "#home" : "/#home", onClick: goToSection("home") },
    { label: "Testimonials", href: isHomePage ? "#testimonial" : "/#testimonial", onClick: goToSection("testimonial") },
    { label: "Projects", href: "/projects", to: "/projects", onClick: goToService("/projects") },
    { label: "Contact", href: isHomePage ? "#contact" : "/#contact", onClick: goToSection("contact") },
  ];

  return (
    <>
      <div
        className={`mobile-menu-backdrop ${isMobileMenuOpen ? "is-visible" : ""}`}
        onClick={closeMobileMenu}
        aria-hidden={!isMobileMenuOpen}
      />

      <nav
      className={`navbar fixed top-0 start-0 end-0 z-999 transition-all duration-500 py-5 items-center shadow-md lg:shadow-none [&.is-sticky]:bg-white group [&.is-sticky]:shadow-md ${
        isHomePage ? "bg-white lg:bg-transparent" : "bg-white shadow-md"
      }`}
      id="navbar"
    >
      <div className="container">
        <div className="flex lg:flex-nowrap flex-wrap items-center">
          <a className="flex h-10 items-center" href="/" onClick={goHome}>
            <img
              src="/assets/images/insonet-logo-nav.png"
              className="h-14 w-auto shrink-0"
              alt="Insonet logo"
            />
          </a>

          <div className="lg:hidden flex items-center ms-auto px-2.5">
            <button
              className={`mobile-menu-toggle ${isMobileMenuOpen ? "is-open" : ""}`}
              type="button"
              aria-controls="navbarCollapse"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => {
                setIsMobileMenuOpen((open) => {
                  if (open) setIsServicesOpen(false);
                  return !open;
                });
              }}
            >
              <span className="mobile-menu-toggle__line" />
              <span className="mobile-menu-toggle__line" />
              <span className="mobile-menu-toggle__line" />
            </button>
          </div>

          <div
            className={`navigation mobile-menu-panel lg:basis-auto basis-full grow items-center justify-center mx-auto overflow-visible lg:mt-0 nav-light ${
              isMobileMenuOpen ? "is-open" : ""
            } lg:flex`}
            id="navbarCollapse"
          >
            <div className="mobile-menu-panel__inner">
              <div className="mobile-menu-panel__header">
                <a className="mobile-menu-panel__logo" href="/" onClick={goHome}>
                  <img
                    src="/assets/images/insonet-logo-nav.png"
                    alt="INSONET Systems"
                  />
                </a>
                <p className="mobile-menu-panel__tagline">Security &amp; Network Solutions</p>
              </div>

              <p className="mobile-menu-panel__label">Navigation</p>

              <ul
                className="navbar-nav mobile-menu-list flex-col lg:flex-row gap-y-2 flex lg:items-center justify-center"
                id="navbar-navlist"
              >
                {navLinks.slice(0, 1).map((link) => (
                  <li
                    key={link.label}
                    className="nav-item mx-1.5 transition-all text-dark lg:text-black group-[&.is-sticky]:text-dark all duration-300 hover:text-primary [&.active]:!text-primary group-[&.is-sticky]:[&.active]:text-primary"
                  >
                    <a
                      className="nav-link nav-link-animated mobile-nav-link inline-flex items-center text-sm lg:text-base font-medium py-0.5 px-2 capitalize link-fade"
                      href={link.href}
                      onClick={link.onClick}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}

                <li
                  ref={servicesRef}
                  className="nav-item mobile-nav-services relative mx-1.5 transition-all text-dark lg:text-black group-[&.is-sticky]:text-dark duration-300 hover:text-primary [&.active]:!text-primary group-[&.is-sticky]:[&.active]:text-primary"
                  onMouseEnter={() => {
                    if (window.innerWidth >= 1024) setIsServicesOpen(true);
                  }}
                  onMouseLeave={() => {
                    if (window.innerWidth >= 1024) setIsServicesOpen(false);
                  }}
                >
                  <button
                    className={`nav-link nav-link-animated mobile-nav-link mobile-nav-services__trigger inline-flex w-full items-center justify-between gap-1 text-sm lg:text-base font-medium py-0.5 px-2 capitalize link-fade ${
                      isServicesOpen ? "is-open" : ""
                    }`}
                    type="button"
                    aria-expanded={isServicesOpen}
                    aria-haspopup="true"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      if (window.innerWidth < 1024) {
                        setIsServicesOpen((prev) => !prev);
                      }
                    }}
                  >
                    Services
                    <i
                      data-lucide="chevron-down"
                      className={`mobile-nav-services__chevron h-4 w-4 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <ul
                    className={`nav-services-menu ${isServicesOpen ? "is-open" : ""}`}
                    style={{ display: isServicesOpen ? "block" : "none" }}
                  >
                    {serviceLinks.map((service) => (
                      <li key={service.path}>
                        <Link
                          className="mobile-nav-services__link block px-4 py-2 text-sm text-dark hover:bg-gray-50"
                          to={service.path}
                          onClick={closeMobileMenu}
                        >
                          {service.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>

                {navLinks.slice(1).map((link) => (
                  <li
                    key={link.label}
                    className="nav-item mx-1.5 transition-all text-dark lg:text-black group-[&.is-sticky]:text-dark duration-300 hover:text-primary [&.active]:!text-primary group-[&.is-sticky]:[&.active]:text-primary"
                  >
                    {link.to ? (
                      <Link
                        className="nav-link nav-link-animated mobile-nav-link inline-flex items-center text-sm lg:text-base font-medium py-0.5 px-2 capitalize link-fade"
                        to={link.to}
                        onClick={closeMobileMenu}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        className="nav-link nav-link-animated mobile-nav-link inline-flex items-center text-sm lg:text-base font-medium py-0.5 px-2 capitalize link-fade"
                        href={link.href}
                        onClick={link.onClick}
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}

                <li className="nav-item mobile-menu-cta mx-1.5 lg:hidden">
                  <a
                    href={isHomePage ? "#contact" : "/#contact"}
                    onClick={goToSection("contact")}
                    className="mobile-menu-cta__btn btn-motion inline-flex w-full items-center justify-center rounded-xl bg-primary px-6 py-3 text-base font-semibold text-white transition-all duration-500 hover:bg-primaryDark"
                  >
                    Get Qoute
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="ms-auto shrink hidden lg:inline-flex gap-2">
            <a
              href={isHomePage ? "#contact" : "/#contact"}
              onClick={goToSection("contact")}
              className="btn-motion py-2 px-6 inline-flex items-center rounded-md text-base text-white bg-primary hover:bg-primaryDark transition-all duration-500 font-medium"
            >
              <span className="hidden sm:block">Get Qoute</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
    </>
  );
}
