import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Services from "./components/Services/Services";
import Clients from "./components/Clients/Clients";
import Reels from "./components/Reels/Reels";
import YouTube from "./components/YouTube/YouTube";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Clients />
      <Reels />
      <YouTube />
      <Contact />
      <Footer />
    </>
  );
}

export default App;