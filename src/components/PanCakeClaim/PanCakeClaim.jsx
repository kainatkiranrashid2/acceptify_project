import React, { useEffect, useRef, useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PanCakeClaim = () => {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const tlRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const [content, setContent] = useState(null);

  const timeBasedContent = {
    0: {
      title: "Protect your Customers and your Reputation with Acceptify",
      subtitle:
        "Acceptify is designed to meet the stringent security standards of the Payment Card Industry's Data Security Standard (PCI-DSS). Customer's data is always strongly encrypted.",
      highlightedWords: ["Protect your", "Customers"],
    },
    6: {
      title: "Protect your Operation and Reputation",
      subtitle:
        "Acceptify protects against harmful security breaches that negatively impact your brand, disrupts your operations, increases your liabilities and decreases your revenue.",
      highlightedWords: ["Operation", "and", "Reputation"],
    },
    10: {
      title:
        "Acceptify is PCI-P2PE Certified ensuring Compliance to the industry's highest standard.",
      subtitle:
        "Acceptify's PCI P2PE (Point-to-Point Encryption) certification ensures compliance to PCI-DSC's (Payment Card Industry Security Standards Council) highest security standards. Merchants face fewer PCI-DSS requirements because sensitive card data in their processes is often processed by Acceptify's PCI-DSS compliant platform.",
      highlightedWords: ["PCI-P2PE Certified"],
    },
    14: {
      title:
        "Acceptify Simplifying PCI Security Compliance for Online and Offline Payments.",
      subtitle:
        "Acceptify's encryption of cardholder data removes it from scope for many PCI DSS requirements, as a result your PCI audit effort is greatly reduced making compliance audits simpler and less costly.",
      highlightedWords: ["Simplifying", "PCI Security Compliance"],
    },
  };

  // Update content based on timestamp
  const updateContent = (time) => {
    const timestamps = [0, 6, 10, 14];
    const currentTimestamp = timestamps.reduce(
      (prev, curr) => (time >= curr ? curr : prev),
      0
    );

    setContent(timeBasedContent[currentTimestamp]);
  };

  // Highlight text function
  const highlightText = (text, highlightedWords) => {
    if (!text || !highlightedWords) return null;

    let result = text;
    highlightedWords.forEach((word) => {
      const regex = new RegExp(`(${word})`, "gi");
      result = result.replace(regex, '<span class="text-primary">$1</span>');
    });
    return <span dangerouslySetInnerHTML={{ __html: result }} />;
  };

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;

    if (!video || !section) return;

    // Reset content to initial state
    setContent(timeBasedContent[0]);

    // Create GSAP Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        pin: true,
        pinSpacing: true,
        scrub: 1,
        markers: true,
        onUpdate: (self) => {
          // Calculate video time based on scroll progress
          const progress = self.progress;
          const videoDuration = video.duration;
          const currentTime = progress * videoDuration;

          // Update video time and content
          video.currentTime = Math.min(currentTime, videoDuration);
          updateContent(video.currentTime);
          video.play();
        },
      },
    });

    // Optional: Add timeline animations if needed
    tl.to(video, {
      duration: 1,
      onComplete: () => {
        // Optional video-related animations
      },
    });

    // Store references
    tlRef.current = tl;
    scrollTriggerRef.current = tl.scrollTrigger;

    // Cleanup
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative min-h-screen">
      <div
        className="absolute -top-16 -left-20 inset-0 bg-contain bg-no-repeat overflow-clip"
        style={{
          backgroundImage: `url('/assets/pancake/pancake_bg.png')`,
          backgroundPosition: "left -300px",
          transform: "rotate(-8.85deg)",
          opacity: 1,
          transformOrigin: "top left",
        }}
      />
      <div className="relative">
        <div className="py-20 px-[180px]">
          <div className="w-full flex justify-center items-center h-screen gap-36">
            <div className="w-1/3">
              {content && (
                <>
                  <div className="3xl:text-[34px]/[51px] font-Inter font-semibold leading-tighter">
                    {highlightText(content.title, content.highlightedWords)}
                  </div>
                  <div className="3xl:text-[20px]/[33px] font-Inter font-normal mt-4 leading-tighter">
                    {content.subtitle}
                  </div>
                </>
              )}
            </div>
            <div className="relative w-2/3 h-full">
              <video
                ref={videoRef}
                className="absolute top-0 left-0 w-full h-full object-contain"
                playsInline
                muted
                autoPlay
                style={{
                  backgroundColor: "transparent",
                  background: "transparent",
                }}
                preload="auto">
                <source
                  src="https://res.cloudinary.com/dq5guzzge/video/upload/c_fill,w_1920,h_1080,g_auto,f_auto/v1/acceptify/assets/pancake/pancake_v3.webm"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanCakeClaim;
