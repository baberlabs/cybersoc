import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Events from "./pages/Events";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import ElectionNoticeModal from "./components/ElectionNoticeModal";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <ScrollToTop />
      <a
        href="#main"
        className="sr-only focus:not-sr-only fixed top-3 left-3 z-50 rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-black shadow"
      >
        Skip to content
      </a>

      <Header />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/events" element={<Events />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <ElectionNoticeModal />
      </div>

      <Footer />
    </div>
  );
};

export default App;
