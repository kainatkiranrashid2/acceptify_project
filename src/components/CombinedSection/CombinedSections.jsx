import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CombinedSections = () => {
  const containerRef = useRef(null);
  const videoContainerRef = useRef(null);
  const textContainerRef = useRef(null);
  const headlineRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const videoContainer = videoContainerRef.current;
    const textContainer = textContainerRef.current;
    const headline = headlineRef.current;

    const headlineOffset = headline?.offsetTop || 0;

    const pinTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: `+=${headlineOffset}`,
      pin: videoContainer,
      pinSpacing: false,
    });

    gsap.to(textContainer, {
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: `+=${headlineOffset}`,
        scrub: 1,
      },
      y: `-${headlineOffset}px`,
      ease: "none",
    });

    ScrollTrigger.create({
      trigger: container,
      start: `top+=${headlineOffset} top`,
      end: "bottom bottom",
      onEnter: () => {
        gsap.set(videoContainer, { position: "relative", top: "auto" });
      },
      onLeaveBack: () => {
        gsap.set(videoContainer, { position: "fixed", top: 0 });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const sections = [
    {
      video: "/assets/beautiful_branding/beatiful_branding_v2.webm",
      title: (
        <div className="w-fit font-Inter font-bold xl:text-[52px]/[65px] 2xl:text-[55px]/[79.2px] tracking-tighter">
          <span className="bg-primary text-white px-6">
            Represent your Brand
          </span>
          <span> anywhere you take transactions.</span>
        </div>
      ),
    },
    {
      video: "/assets/code_snip/code_snip_v2.webm",
      title: (
        <div className="space-y-4">
          <h2 className="xl:text-[52px]/[60.88px] 2xl:text-[55px]/[79.2px] font-Inter tracking-tighter font-bold dark:text-white">
            Ultra-Secure <br /> Payments with a
          </h2>
          <div className="flex items-center mb-4">
            <div className="bg-[#65D008] font-Inter font-bold text-[55px]/[79.2px] tracking-tighter text-white px-3">
              Few Lines Of Code
            </div>
          </div>
          <p className="text-[21px]/[34.65px] font-Inter w-fit">
            Acceptify is PABP Certified making your payment applications secure
            and easier to certify.
          </p>
        </div>
      ),
    },
    {
      video: "/assets/lighteningfast/lightening_fast.webm",
      title: (
        <p className="text-[55px]/[79.2px] font-bold font-Inter w-full">
          <span className="bg-primary text-white px-6">Lightning Fast</span>{" "}
          online and offline processing with background mode
        </p>
      ),
    },
  ];

  return (
    <div className="space-y-20">
      {sections.map((section, index) => (
        <div key={index} className="flex justify-between items-center m-20">
          <div className="w-1/2">
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline>
              <source src={section.video} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="w-1/2 p-10">{section.title}</div>
        </div>
      ))}
    </div>
  );
};

export default CombinedSections;
