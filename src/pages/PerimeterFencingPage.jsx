import ServicePageLayout from "../components/service/ServicePageLayout";

const deviceComponents = [
  { label: "Electric Fence Energizers", description: "High-voltage controllers that power perimeter lines and deliver non-lethal deterrent shocks" },
  { label: "High-Tensile Wire & Insulators", description: "Durable fencing wire, corner posts, and insulators built for Ghana's climate and terrain" },
  { label: "Warning Signs & Compliance Markers", description: "Visible signage and markers to meet safety standards and alert intruders" },
  { label: "Intrusion Detection Sensors", description: "Vibration and cut-detection sensors that trigger alarms when the fence is tampered with" },
  { label: "Siren & Strobe Alarm Systems", description: "Audible and visual alerts that activate instantly on breach or fence failure" },
  { label: "Fence Monitoring Panels", description: "Central control units for zone monitoring, voltage checks, and remote status alerts" },
  { label: "CCTV & Access Integration", description: "Linked surveillance and gate control so perimeter events are recorded and responded to fast" },
];

export default function PerimeterFencingPage() {
  return (
    <ServicePageLayout
      heroTaglineAccent="Perimeter Protection for "
      heroTaglineRest="a Secure Boundary"
      heroTitle="Electric Fencing That Keeps Intruders Out"
      heroParagraphs={[
        "Secure your site perimeter with electric fencing and intrusion detection designed for warehouses, estates, and industrial facilities.",
        "We supply and install energizers, high-tensile wire, sensors, and alarm systems — fully integrated with your CCTV and access control.",
        "INSONET delivers reliable perimeter security across Ghana, from design and installation to ongoing maintenance and support.",
      ]}
      heroImage={{
        src: "/assets/images/services/perimeter-hero.png",
        alt: "Electric perimeter fence with warning signage and cloudy sky",
        objectPosition: "center center",
      }}
      devicesSubtitle="Perimeter Fencing Hardware Ecosystem"
      deviceComponents={deviceComponents}
      whyTitleLines={["Ghana's Trusted Perimeter", "Fencing Solutions Partner"]}
      whyBody="INSONET Systems installs electric fencing and perimeter security for sites that need a strong first line of defence. We assess your boundary, recommend the right energizer and sensor setup, and integrate alarms with your existing security systems for complete coverage."
      whyBullets={[
        "Custom perimeter design for any site layout",
        "Electric fence energizers and intrusion sensors",
        "Siren, strobe, and remote monitoring options",
        "Integration with CCTV and access control",
        "Based in Spintex, Accra — fast local response",
      ]}
      aboutImage={{
        src: "/assets/images/services/perimeter-about.png",
        alt: "Electric perimeter fence installation",
        objectPosition: "center center",
      }}
    />
  );
}
