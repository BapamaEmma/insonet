import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContentProvider } from "./context/ContentContext";
import AdminApp from "./admin/AdminApp";
import InsonetPage from "./InsonetPage";
import ProjectsPage from "./pages/ProjectsPage";
import CctvServicePage from "./pages/CctvServicePage";
import HardwareMaintenancePage from "./pages/HardwareMaintenancePage";
import PerimeterFencingPage from "./pages/PerimeterFencingPage";
import CybersecurityPage from "./pages/CybersecurityPage";
import AccessControlPage from "./pages/AccessControlPage";
import NetworkInfrastructurePage from "./pages/NetworkInfrastructurePage";

function App() {
  return (
    <BrowserRouter>
      <ContentProvider>
        <Routes>
          <Route path="/admin/*" element={<AdminApp />} />
          <Route path="/" element={<InsonetPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/services/cctv" element={<CctvServicePage />} />
        <Route path="/services/network" element={<NetworkInfrastructurePage />} />
        <Route path="/services/access-control" element={<AccessControlPage />} />
        <Route path="/services/cybersecurity" element={<CybersecurityPage />} />
        <Route path="/services/perimeter-fencing" element={<PerimeterFencingPage />} />
        <Route path="/services/hardware-maintenance" element={<HardwareMaintenancePage />} />
        </Routes>
      </ContentProvider>
    </BrowserRouter>
  );
}

export default App;
