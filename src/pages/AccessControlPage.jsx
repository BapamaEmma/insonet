import ServicePageLayout from "../components/service/ServicePageLayout";

const deviceComponents = [
  { label: "Card & PIN Readers", description: "RFID, proximity, and keypad readers for doors, gates, and turnstiles" },
  { label: "Biometric Scanners", description: "Fingerprint and facial recognition devices for high-security entry points" },
  { label: "Electronic Door Locks", description: "Magnetic locks, electric strikes, and smart locks for controlled access" },
  { label: "Turnstiles & Barriers", description: "Physical access barriers for offices, factories, and high-traffic entrances" },
  { label: "Access Control Panels", description: "Central controllers that manage users, schedules, and door permissions" },
  { label: "Intercom & Video Entry", description: "Door stations with two-way audio and video for visitor verification" },
  { label: "Management Software", description: "Cloud and on-premise platforms for user management, logs, and reporting" },
];

export default function AccessControlPage() {
  return (
    <ServicePageLayout
      heroTaglineAccent="Secure Entry Management for "
      heroTaglineRest="a Protected Facility"
      heroTitle="Access Control Systems That Keep Your Premises Safe"
      heroParagraphs={[
        "Control who enters your building with card, PIN, and biometric access systems tailored to your security needs.",
        "We install and configure door readers, electric locks, turnstiles, and central management platforms.",
        "From single-door setups to multi-site access control — INSONET secures every entry point across your facility.",
      ]}
      heroImage={{
        src: "/assets/images/services/access-hero.png",
        alt: "Access control card reader at secure entry point",
        objectPosition: "center center",
      }}
      devicesSubtitle="Access Control Hardware Ecosystem"
      deviceComponents={deviceComponents}
      whyTitleLines={["Ghana's Trusted Access Control", "Systems Partner"]}
      whyBody="INSONET Systems designs and installs access control solutions that give you full visibility over who enters your premises. We work with leading brands to deliver reliable card, biometric, and mobile access — configured to your security policies and easy to manage day to day."
      whyBullets={[
        "Card, PIN, and biometric access options",
        "Integration with CCTV and alarm systems",
        "User management with time-based access rules",
        "Solutions for offices, warehouses, and campuses",
        "Based in Spintex, Accra — fast local response",
      ]}
      aboutImage={{
        src: "/assets/images/services/access-about.png",
        alt: "INSONET technician configuring access control system",
        objectPosition: "center center",
      }}
    />
  );
}
