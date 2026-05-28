import ServicePageLayout from "../components/service/ServicePageLayout";

const deviceComponents = [
  { label: "Next-Gen Firewalls", description: "Hardware and software firewalls with intrusion prevention and deep packet inspection" },
  { label: "Endpoint Protection", description: "Antivirus, anti-malware, and device security for laptops, desktops, and servers" },
  { label: "Email & Web Security", description: "Filtering and threat detection to block phishing, spam, and malicious links" },
  { label: "VPN & Remote Access", description: "Secure encrypted tunnels for remote workers and branch office connectivity" },
  { label: "Security Monitoring (SIEM)", description: "Centralised logging, alerts, and threat detection across your network" },
  { label: "Security Policies & Compliance", description: "Access policies, password rules, and audit-ready security configurations" },
  { label: "Backup & Disaster Recovery", description: "Automated backups and recovery plans to protect critical business data" },
];

export default function CybersecurityPage() {
  return (
    <ServicePageLayout
      heroTaglineAccent="Proactive Protection for "
      heroTaglineRest="a Secure Digital Business"
      heroTitle="Cybersecurity Solutions That Defend Your Business"
      heroParagraphs={[
        "Protect your data, devices, and network from cyber threats with enterprise-grade security tools and policies.",
        "We deploy firewalls, endpoint protection, email security, and monitoring systems tailored to your risk profile.",
        "INSONET helps businesses across Ghana stay secure, compliant, and resilient against evolving cyber attacks.",
      ]}
      heroImage={{
        src: "/assets/images/services/serv4.png",
        alt: "Cybersecurity dashboard and network protection",
        objectPosition: "center center",
      }}
      devicesSubtitle="Cybersecurity Hardware & Software Ecosystem"
      deviceComponents={deviceComponents}
      whyTitleLines={["Ghana's Trusted Cybersecurity", "Solutions Partner"]}
      whyBody="INSONET Systems helps businesses protect their digital assets with layered security — from firewalls and endpoint protection to monitoring and backup. We assess your risks, implement the right tools, and provide ongoing support so your team can work with confidence."
      whyBullets={[
        "Firewall and endpoint protection deployment",
        "Email, web, and phishing threat filtering",
        "Security monitoring with real-time alerts",
        "Backup and disaster recovery planning",
        "Based in Spintex, Accra — fast local response",
      ]}
      aboutImage={{
        src: "/assets/images/services/cyber-about.png",
        alt: "Cybersecurity monitoring and threat protection",
        objectPosition: "center center",
      }}
    />
  );
}
