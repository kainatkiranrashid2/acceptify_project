import React, { useEffect, useRef, useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PanCakeClaim = () => {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const currentIndex = useRef(0);
  const autoplayAttempts = useRef(0);

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
  const [content, setContent] = useState(timeBasedContent[0]);

  const updateContent = (time) => {
    const currentTimestamp =
      timestamps
        .slice()
        .reverse()
        .find((timestamp) => time >= timestamp) ?? 0;

    setContent(timeBasedContent[currentTimestamp]);
    currentIndex.current = timestamps.indexOf(currentTimestamp);
  };

  // Force video to play
  const forceVideoPlay = async (video) => {
    try {
      if (video.paused) {
        await video.play();
        console.log("Video started playing");
      }
    } catch (error) {
      console.error("Playback failed:", error);
      // Retry if still within attempts limit
      if (autoplayAttempts.current < 5) {
        autoplayAttempts.current++;
        setTimeout(() => forceVideoPlay(video), 1000);
      }
    }
  };

  // Initialize video and autoplay
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Reset video state
    video.currentTime = 0;
    autoplayAttempts.current = 0;

    // Force load the video
    video.load();

    const startVideo = () => {
      if (!isScrolling) {
        forceVideoPlay(video);
      }
    };

    // Intersection Observer to detect when video is in view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isScrolling) {
          startVideo();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    // Event listeners for video
    const events = [
      ["loadedmetadata", startVideo],
      ["canplay", startVideo],
      ["playing", () => console.log("Video is playing")],
      ["pause", () => console.log("Video paused")],
      [
        "ended",
        () => {
          video.currentTime = 0;
          startVideo();
        },
      ],
      [
        "timeupdate",
        () => {
          if (!isScrolling) {
            updateContent(video.currentTime);
          }
        },
      ],
    ];

    // Add all event listeners
    events.forEach(([event, handler]) => {
      video.addEventListener(event, handler);
    });

    // Initial play attempt
    startVideo();

    // Cleanup
    return () => {
      observer.disconnect();
      events.forEach(([event, handler]) => {
        video.removeEventListener(event, handler);
      });
    };
  }, [isScrolling]);

  // Handle scroll navigation
  const navigateToTimestamp = (direction) => {
    const video = videoRef.current;
    if (!video) return;

    let nextIndex = currentIndex.current + direction;

    if (nextIndex < 0) {
      nextIndex = 0;
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
      return;
    }
    if (nextIndex >= timestamps.length) {
      nextIndex = timestamps.length - 1;
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
      return;
    }

    currentIndex.current = nextIndex;
    const newTime = timestamps[nextIndex];
    video.currentTime = newTime;
    updateContent(newTime);
    forceVideoPlay(videoRef.current);
  };

  // Set up ScrollTrigger
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let lastScrollTime = Date.now();

    const handleWheel = (e) => {
      const now = Date.now();
      if (now - lastScrollTime < 150) return;
      lastScrollTime = now;

      const video = videoRef.current;
      if (!video) return;

      video.pause();

      if (e.deltaY > 0) {
        navigateToTimestamp(1);
      } else {
        navigateToTimestamp(-1);
      }
    };
    const scrollDistance = window.innerHeight * 2; // Adjust this multiplier as needed

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${scrollDistance}px`,

      pin: true,
      scrub: 1,

      onEnter: () => {
        setIsScrolling(true);
        section.addEventListener("wheel", handleWheel);
      },
      onLeave: () => {
        setIsScrolling(false);
        section.removeEventListener("wheel", handleWheel);
      },
      onEnterBack: () => {
        setIsScrolling(true);
        section.addEventListener("wheel", handleWheel);
      },
      onLeaveBack: () => {
        setIsScrolling(false);
        section.removeEventListener("wheel", handleWheel);
      },
    });

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
      section.removeEventListener("wheel", handleWheel);
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
    <div ref={sectionRef} className="relative">
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
          <div className="w-full grid grid-cols-12 items-center h-screen gap-36">
            <div className="col-span-4">
              <div className="3xl:text-[34px]/[51px] font-Inter font-semibold leading-tighter">
                {highlightText(content.title, content.highlightedWords)}
              </div>
              <div className="3xl:text-[20px]/[33px] font-Inter font-normal mt-4 leading-tighter">
                {content.subtitle}
              </div>
            </div>
            <div className="relative col-span-8 h-full">
              <video
                ref={videoRef}
                className="absolute top-0 left-0 w-full h-full object-contain"
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
  );
};

export default PanCakeClaim;
