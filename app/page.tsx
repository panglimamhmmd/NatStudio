import Faq from "./components/Faq";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Location from "./components/Location";
import Pricing from "./components/Pricing";
import Process from "./components/Process";
import Sprocket from "./components/Sprocket";
import Testimonials from "./components/Testimonials";
import Why from "./components/Why";
import Work from "./components/Work";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        {/* <Work /> */}
        {/* <Sprocket /> */}
        <Why />
        <Process />
        <Pricing />
        <Testimonials />
        <Sprocket />
        <Location />
        <Sprocket />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
