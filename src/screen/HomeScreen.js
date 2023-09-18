import { React } from "react";
import HeroSection from "../components/HeroSection";
import { ScrollToTop } from "../utils/helpers";

const HomeScreen = (isLoading) => {
  return (
    <>
      <ScrollToTop />
      <HeroSection />
      <section className='section-padding'>
        <div className='container'>
          <h2>Lorem Ipsum</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            tincidunt diam dui, quis convallis felis tincidunt eget. Nulla
            auctor euismod aliquet. Cras tincidunt felis et cursus pretium.
          </p>
        </div>
      </section>
    </>
  );
};

export default HomeScreen;
