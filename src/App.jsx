import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Events from "./pages/Events";
import Blogs from "./pages/Blogs";
import BlogPost from "./pages/BlogPost";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";

import Governance from "./pages/Governance";
import CodeOfConduct from "./pages/CodeOfConduct";
import EthicsPolicy from "./pages/EthicsPolicy";
import Safeguarding from "./pages/Safeguarding";
import DataProtection from "./pages/DataProtection";

import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <ScrollToTop />
      <Header />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/events" element={<Events />} />
          <Route path="/blog" element={<Blogs />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/governance" element={<Governance />} />
          <Route path="/code-of-conduct" element={<CodeOfConduct />} />
          <Route path="/ethics" element={<EthicsPolicy />} />
          <Route path="/safeguarding" element={<Safeguarding />} />
          <Route path="/data-protection" element={<DataProtection />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;
