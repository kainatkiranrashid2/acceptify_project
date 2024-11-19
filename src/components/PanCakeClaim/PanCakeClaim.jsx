import React, { useEffect, useRef, useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PanCakeClaim = () => {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const [content, setContent] = useState({
    title: "Protect your Customers and your Reputation with Acceptify",
    subtitle:
      "Acceptify is designed to meet the stringent security standards of the Payment Card Industry's Data Security Standard (PCI-DSS). Customer's data is always strongly encrypted.",
    highlightedWords: ["Protect your", "Customers"],
  });

  const cld = new Cloudinary({
    cloud: {
      cloudName: "dq5guzzge",
    },
  });

  const videoUrl = `https://res.cloudinary.com/dq5guzzge/video/upload/v1/acceptify/assets/pancake/pancake_v3`;

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

  const timestamps = Object.keys(timeBasedContent)
    .map(Number)
    .sort((a, b) => a - b);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    // Handle video time updates for autoplay content changes
    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
      const activeTimestamp = timestamps
        .slice()
        .reverse()
        .find((time) => currentTime >= time);

      if (activeTimestamp !== undefined) {
        setContent(timeBasedContent[activeTimestamp]);
      }
    };

    // Initialize video with autoplay
    video.addEventListener("canplay", () => {
      video.play().catch(console.error);
    });
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.load();

    // Set up ScrollTrigger for scroll-based control
    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${window.innerHeight * (timestamps.length - 1)}`,
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        // Only update video time if we're actually scrolling
        if (self.isActive) {
          const totalDuration = timestamps[timestamps.length - 1];
          const videoTime = self.progress * totalDuration;

          // Pause autoplay when scrolling
          video.pause();
          video.currentTime = videoTime;

          // Find and set content based on current time
          const activeTimestamp = timestamps
            .slice()
            .reverse()
            .find((time) => videoTime >= time);

          if (activeTimestamp !== undefined) {
            setContent(timeBasedContent[activeTimestamp]);
          }
        } else {
          // Resume autoplay when not scrolling
          video.play().catch(console.error);
        }
      },
      onLeave: () => {
        // Resume autoplay when leaving the section
        video.play().catch(console.error);
      },
      onEnterBack: () => {
        // Resume autoplay when entering back
        video.play().catch(console.error);
      },
    });

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      scrollTrigger.kill();
    };
  }, []);

  const highlightText = (text, highlightedWords) => {
    let result = text;
    highlightedWords.forEach((word) => {
      const regex = new RegExp(`(${word})`, "gi");
      result = result.replace(regex, '<span class="text-primary">$1</span>');
    });
    return <span dangerouslySetInnerHTML={{ __html: result }} />;
  };

  return (
    <div className="relative h-screen overflow-hidden" ref={sectionRef}>
      <div
        className="absolute -top-16 -left-20 inset-0 bg-contain bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/pancake/pancake_bg.png')`,
          backgroundPosition: "left -300px",
          transform: "rotate(-8.85deg)",
          opacity: 1,
          transformOrigin: "top left",
        }}
      />
      <div className="relative h-full">
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 lg:px-[180px]">
            <div className="flex items-center gap-36">
              <div
                className="w-1/3 transition-opacity duration-300"
                ref={contentRef}>
                <div className="text-[34px] leading-[51px] font-Inter font-semibold">
                  {highlightText(content.title, content.highlightedWords)}
                </div>
                <div className="text-[20px] leading-[33px] font-Inter font-normal mt-4">
                  {content.subtitle}
                </div>
              </div>
              <div className="w-2/3 relative">
                <video
                  ref={videoRef}
                  className="w-full h-screen object-contain"
                  playsInline
                  autoPlay
                  muted
                  loop
                  preload="auto">
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanCakeClaim;
