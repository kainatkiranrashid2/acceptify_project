import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CodeSnippet = () => {
  const containerRef = useRef(null);
  const videoContainerRef = useRef(null);
  const textContainerRef = useRef(null);
  const headlineRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const videoContainer = videoContainerRef.current;
    const textContainer = textContainerRef.current;
    const headline = headlineRef.current;

    // Calculate the point where the headline reaches the top
    const headlineOffset = headline.offsetTop;

    // First ScrollTrigger for initial pin until headline reaches top
    const pinTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: `+=${headlineOffset}`,
      pin: videoContainer,
      pinSpacing: false,
    });

    // Second ScrollTrigger for text animation
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

    // Third ScrollTrigger to handle video scroll after unpin
    ScrollTrigger.create({
      trigger: container,
      start: `top+=${headlineOffset} top`,
      end: "bottom bottom",
      onEnter: () => {
        gsap.set(videoContainer, {
          position: "relative",
          top: "auto",
        });
      },
      onLeaveBack: () => {
        gsap.set(videoContainer, {
          position: "fixed",
          top: 0,
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-[100vh]">
      <div className="h-screen">
        <div className="container mx-auto h-full">
          <div className="flex justify-between items-center h-full">
            {/* Video Section */}
            <div
              ref={videoContainerRef}
              className="xl:w-1/2 h-screen flex items-center">
              <video
                className="w-full h-auto object-cover"
                autoPlay
                loop
                muted
                playsInline>
                <source
                  src="/assets/code_snip/code_snip_v2.webm"
                  type="video/webm"
                />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Text Section */}
            <div
              ref={textContainerRef}
              className="flex flex-col justify-start items-center w-1/2">
              <div className="w-4/5 ml-auto">
                <div>
                  <h2 className="xl:text-[52px]/[60.88px] 2xl:text-[55px]/[79.2px] font-Inter tracking-tighter font-bold mb-2 dark:text-white">
                    Ultra-Secure <br /> Payments with a
                  </h2>
                </div>

                <div>
                  <div ref={headlineRef} className="flex items-center mb-4">
                    <div className="bg-[#65D008] font-Inter font-bold text-[55px]/[79.2px] tracking-tighter text-white px-3">
                      Few Lines Of Code
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-[21px]/[34.65px] font-Inter w-fit">
                    Acceptify is PABP Certified making your payment applications
                    secure and easier to certify.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodeSnippet;
