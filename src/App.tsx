import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import SelectedWork from "./components/SelectedWork/SelectedWork";
import About from "./components/About/About";
import Services from "./components/Services/Services";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <SelectedWork />
      <About />
      <Services />
    </>
  );
}

export default App;