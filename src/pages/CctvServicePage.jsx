import ServicePageLayout from "../components/service/ServicePageLayout";

const deviceComponents = [
  { label: "IP Cameras", description: "Dome, Bullet, Turret, and Panoramic variants (4K/8MP)" },
  { label: "PTZ Cameras", description: "Pan-Tilt-Zoom with long-range optical zoom" },
  { label: "Storage", description: "Network Video Recorders (NVRs) with RAID support" },
  { label: "Displays", description: "Dedicated security monitors and video wall controllers" },
  { label: "Power", description: "PoE switches, UPS backups, and centralized power supplies" },
  { label: "Cabling", description: "Cat6/Cat7 shielded cabling for interference-free signals" },
  { label: "Software", description: "Video Management Software (VMS) with remote viewing client" },
];

export default function CctvServicePage() {
  return (
    <ServicePageLayout
      heroTaglineAccent="Advanced Surveillance for "
      heroTaglineRest="a Safer Business Environment"
      heroTitle="Intelligent CCTV Monitoring That Never Sleeps"
      heroParagraphs={[
        "Protect your assets with high-definition, AI-powered surveillance systems.",
        "We provide end-to-end installation, remote access setup, and smart alert integration.",
        "Our solutions ensure 24/7 visibility for commercial, industrial, and residential properties.",
      ]}
      heroImage={{
        src: "/assets/images/services/cctv-hero.png",
        alt: "Smart CCTV surveillance camera with connected monitoring",
        objectPosition: "55% center",
      }}
      devicesSubtitle="Surveillance Hardware Ecosystem"
      deviceComponents={deviceComponents}
      whyTitleLines={["Ghana's Trusted Security", "Systems Partner"]}
      whyBody="INSONET Systems is based in Spintex, Accra, and has been delivering professional security and network solutions to businesses of all sizes across Ghana. Our certified engineers carry out thorough site surveys, install equipment properly, and remain available for support long after the job is done."
      whyBullets={[
        "Certified, experienced installation engineers",
        "Top brands: Hikvision, Dahua, Axis & more",
        "Ongoing maintenance contracts available",
        "Solutions for every budget — SME to enterprise",
        "Based in Spintex, Accra — fast local response",
      ]}
      aboutImage={{
        src: "/assets/images/services/cctv-about.png",
        alt: "INSONET engineer installing CCTV camera",
        objectPosition: "center 30%",
      }}
    />
  );
}
