import { Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Services from "./components/Services/Services";
import Clients from "./components/Clients/Clients";
import Reels from "./components/Reels/Reels";
import YouTube from "./components/YouTube/YouTube";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

import NotFound from "./pages/NotFound/NotFound";

const Home = () => {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <About />
        <Services />
        <Clients />
        <Reels />
        <YouTube />
        <Contact />
      </main>

      <Footer />
    </>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/home" element={<Navigate to="/" replace />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
