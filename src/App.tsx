import { lazy, Suspense } from "react";

import { Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";

const About = lazy(() => import("./components/About/About"));

const Services = lazy(() => import("./components/Services/Services"));

const Clients = lazy(() => import("./components/Clients/Clients"));

const Reels = lazy(() => import("./components/Reels/Reels"));

const YouTube = lazy(() => import("./components/YouTube/YouTube"));

const Contact = lazy(() => import("./components/Contact/Contact"));

const Footer = lazy(() => import("./components/Footer/Footer"));

const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

const Home = () => {
  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <Suspense fallback={null}>
          <About />
          <Services />
          <Clients />
          <Reels />
          <YouTube />
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
};

const App = () => {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/home" element={<Navigate to="/" replace />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;
