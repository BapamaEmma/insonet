import ServicePageLayout from "../components/service/ServicePageLayout";

const deviceComponents = [
  { label: "Structured Cabling", description: "Cat6, Cat6A, and Cat7 cabling for high-speed, interference-free data transmission" },
  { label: "Network Switches", description: "Managed and unmanaged switches for LAN distribution and VLAN segmentation" },
  { label: "Routers & Firewalls", description: "Enterprise routers and firewall appliances for secure internet connectivity" },
  { label: "Wireless Access Points", description: "Indoor and outdoor Wi-Fi coverage for offices, warehouses, and campuses" },
  { label: "Server Racks & Patch Panels", description: "Organised rack layouts with labelled patch panels for easy maintenance" },
  { label: "Fiber Optic Systems", description: "Single-mode and multi-mode fiber for long-distance, high-bandwidth links" },
  { label: "Network Monitoring", description: "Tools and dashboards for uptime tracking, alerts, and performance management" },
];

export default function NetworkInfrastructurePage() {
  return (
    <ServicePageLayout
      heroTaglineAccent="Reliable Connectivity for "
      heroTaglineRest="a Connected Business"
      heroTitle="Network Infrastructure Built for Performance & Scale"
      heroParagraphs={[
        "We design and deploy structured cabling, routing, and switching systems that keep your business connected.",
        "From LAN and Wi-Fi to fiber links and server racks — INSONET delivers end-to-end network solutions.",
        "Our infrastructure is built for speed, reliability, and growth across commercial and industrial sites in Ghana.",
      ]}
      heroImage={{
        src: "/assets/images/services/network-hero.png",
        alt: "Network switches and structured cabling in a data center",
        objectPosition: "left center",
      }}
      devicesSubtitle="Network Hardware Ecosystem"
      deviceComponents={deviceComponents}
      whyTitleLines={["Ghana's Trusted Network", "Infrastructure Partner"]}
      whyBody="INSONET Systems is based in Spintex, Accra, and delivers enterprise-grade network infrastructure for businesses that depend on fast, stable connectivity. From small office LANs to multi-site deployments, our engineers deliver clean cabling, proper rack organisation, and systems that scale with your growth."
      whyBullets={[
        "Certified structured cabling and fiber installation",
        "Enterprise switches, routers, and wireless APs",
        "Clean rack layouts with labelled patch panels",
        "Scalable LAN/WAN design for growing businesses",
        "Based in Spintex, Accra — fast local response",
      ]}
      aboutImage={{
        src: "/assets/images/services/network-about.png",
        alt: "INSONET engineer working on network rack",
        objectPosition: "center center",
      }}
    />
  );
}
