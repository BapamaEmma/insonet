import ServicePageLayout from "../components/service/ServicePageLayout";

const deviceComponents = [
  { label: "Servers & Workstations", description: "Routine servicing, upgrades, and health checks for business-critical computers and servers" },
  { label: "Network Switches & Routers", description: "Firmware updates, port diagnostics, and performance tuning for LAN and WAN equipment" },
  { label: "CCTV Cameras & NVRs", description: "Lens cleaning, storage checks, and recorder maintenance to keep surveillance online" },
  { label: "Access Control Hardware", description: "Reader calibration, lock servicing, and controller updates for reliable entry management" },
  { label: "UPS & Power Backup", description: "Battery testing, replacement, and load checks to protect systems from power failures" },
  { label: "Cabling & Patch Panels", description: "Inspection, re-termination, and labelling to maintain clean, fault-free connectivity" },
  { label: "Preventive Maintenance SLAs", description: "Scheduled visits, response-time guarantees, and reporting to keep your systems running" },
];

export default function HardwareMaintenancePage() {
  return (
    <ServicePageLayout
      heroTaglineAccent="Proactive Support for "
      heroTaglineRest="Systems That Stay Online"
      heroTitle="Hardware Maintenance That Keeps You Running"
      heroParagraphs={[
        "Keep your security and network infrastructure healthy with scheduled maintenance, fast repairs, and SLA-backed support.",
        "We service CCTV, access control, networking, and server hardware — preventing downtime before it affects your business.",
        "INSONET provides reliable hardware maintenance across Ghana, from one-off repairs to ongoing service contracts.",
      ]}
      heroImage={{
        src: "/assets/images/services/maintenance-hero.png",
        alt: "Technician in blue gloves repairing laptop internals on a workbench",
        objectPosition: "center center",
      }}
      devicesSubtitle="Hardware Maintenance & Support Scope"
      deviceComponents={deviceComponents}
      whyTitleLines={["Ghana's Trusted Hardware", "Maintenance Partner"]}
      whyBody="INSONET Systems keeps your security and network equipment running at peak performance. We offer preventive maintenance, emergency repairs, and flexible SLA contracts — so your CCTV, access control, and infrastructure stay online when you need them most."
      whyBullets={[
        "Scheduled preventive maintenance visits",
        "Fast response for breakdowns and faults",
        "CCTV, network, and access control servicing",
        "Flexible SLA contracts for businesses and campuses",
        "Based in Spintex, Accra — fast local response",
      ]}
      aboutImage={{
        src: "/assets/images/services/maintenance-about.png",
        alt: "INSONET technician performing hardware maintenance",
        objectPosition: "center center",
      }}
    />
  );
}
