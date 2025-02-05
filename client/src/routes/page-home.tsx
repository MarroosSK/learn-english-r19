import { useEffect } from "react";

import {
  HomeHero,
  HomeAccountBenefits,
  HomeLearning,
  HomeTestimonials,
} from "../components/sections";
import HomeFaq from "@/components/sections/home/home-faq";

function PageHome() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section>
      <HomeHero />
      <HomeLearning />
      <HomeAccountBenefits />
      <HomeTestimonials />
      <HomeFaq />
    </section>
  );
}

export default PageHome;
