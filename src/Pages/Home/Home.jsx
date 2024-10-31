// import FlexCaseAnimation from "../../components/FlexcaseAnimation/FlexcaseSequence";
// import Hero from "../../components/Hero/Hero";
import OurClients from "../../components/OurClients/OurClients";
import TransactionGlobe from "../../components/GithubGlobe/TransactionGlobe";
import TransactionGlobeNew from "../../components/GithubGlobeNew/TransactionGlobeNew";
import HeroSection from "../../components/HeroSection/HeroSection";
import OurIndustries from "../../components/OurIndustries/OurIndustries";
import ParticleGlobe from "../../components/ParticleGlobe/ParticleGlobe";
import ParticleGlobeNew from "../../components/Scene/Scene";
import Scene from "../../components/Scene/Scene";
import SecurityComponent from "../../components/SecurityComponent/SecurityComponent";
import MoreFeatures from "../../MoreFeatures/MoreFeatures";
import ClaimsSection from "../../components/ClaimsSection/ClaimsSection";
import FeatureCarousel from "../../components/FeatureCarousel/FeatureCarousel";
import CodeSnippet from "../../components/CodeSnippet/CodeSnippet";
import BeautifulBranding from "../../components/BeautifulBranding/BeautifulBranding";
import claimsBackground from "/assets/claims_bg.png";
import IndustriesSection from "../../components/IndustriesSection/IndustriesSection";
import CTASection from "../../components/CTA/CTASection";
import Footer from "../../components/Footer/Footer";

// import SectionHeading from "../../components/reuseable_components/SectionHeading";
// import ScrollAnimationComponent from "../../components/ScrollAnimationComponent/ScrollAnimationComponent";
// import ScrollSequence from "../../components/ScrollSequence/ScrollSequence";
// import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";

const Home = () => {
  return (
    <>
      <HeroSection />
      <OurClients />
      <SecurityComponent />
      <div className="bg-white ">
        <div
          className="p-4 bg-cover bg-no-repeat bg-center"
          style={{
            backgroundImage: `url('/assets/claims_bg.svg')`,
          }}>
          <ClaimsSection />
          <CodeSnippet />
          <BeautifulBranding />
        </div>
        <IndustriesSection />
        <CTASection />
        <Footer />
      </div>
      {/* <FeatureCarousel /> */}
      {/* <MoreFeatures /> */}
      {/* <SecurityComponent /> */}

      {/* <TransactionGlobe /> */}
      {/* <div className="h-4"></div> */}
      {/* <TransactionGlobeNew /> */}
      {/* <ParticleGlobeNew /> */}

      {/* <ParticleGlobe /> */}
      {/* <OurIndustries /> */}
    </>
  );
};

export default Home;
