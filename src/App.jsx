import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Events from "./pages/Events";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";

import Governance from "./pages/Governance";
import CodeOfConduct from "./pages/CodeOfConduct";
import EthicsPolicy from "./pages/EthicsPolicy";
import Safeguarding from "./pages/Safeguarding";
import DataProtection from "./pages/DataProtection";

import Badge from "./pages/Badge";
import HowToAddBadgeToLinkedInProfile from "./pages/HowToAddBadgeToLinkedInProfile";
import NotFound from "./pages/NotFound";

import ScrollToTop from "./components/ScrollToTop";
import ClosureBanner from "./components/ClosureBanner";

const App = () => {
  const location = useLocation();

  return (
    <div className="relative flex min-h-screen flex-col text-white">
      <ErrorBoundary>
        <ScrollToTop />
        <ClosureBanner />
        <Header />

        <div
          key={location.pathname}
          className="route-shell relative z-10 flex-1"
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/events" element={<Events />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/governance" element={<Governance />} />
            <Route path="/code-of-conduct" element={<CodeOfConduct />} />
            <Route path="/ethics" element={<EthicsPolicy />} />
            <Route path="/safeguarding" element={<Safeguarding />} />
            <Route path="/data-protection" element={<DataProtection />} />

            <Route path="/badges/:awardId" element={<Badge />} />
            <Route
              path="/guide/add-badge-to-linkedin-profile"
              element={<HowToAddBadgeToLinkedInProfile />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        <Footer />
      </ErrorBoundary>
    </div>
  );
};

export default App;
