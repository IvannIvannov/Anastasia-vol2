import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import SelectedWork from "./components/SelectedWork/SelectedWork";
import About from "./components/About/About";
import Services from "./components/Services/Services";
import Clients from "./components/Clients/Clients";
import Reels from "./components/Reels/Reels";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <SelectedWork />
      <About />
      <Services />
      <Clients />
      <Reels />
    </>
  );
}

export default App;