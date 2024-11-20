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
  const scrollDirectionRef = useRef(null); // 'up' or 'down'

  const scrollCountRef = useRef(0);

  const cld = new Cloudinary({
    cloud: {
      cloudName: "dq5guzzge",
    },
  });

  const videoUrl = `https://res.cloudinary.com/dq5guzzge/video/upload/c_fill,w_1920,h_1080,g_auto,f_auto/v1/acceptify/assets/pancake/pancake_v3.webm`;

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
    // Manage body scroll based on timestamp
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

  // Prevent default scroll function
  const preventScroll = (e) => {
    if (isScrolling) {
      e.preventDefault();
    }
  };

  // Disable body scrolling when pinned
  const disableBodyScroll = () => {
    document.body.style.overflow = "hidden";
    document.addEventListener("wheel", preventScroll, { passive: false });
  };

  // Enable body scrolling when unpinned
  const enableBodyScroll = () => {
    document.body.style.overflow = "auto";
    document.removeEventListener("wheel", preventScroll, { passive: false });
  };

  // Handle scroll navigation
  // Navigate to timestamp logic

  const handleUnpin = () => {
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill(true);
      setIsScrolling(false);
      // videoRef.current?.pause();
      scrollCountRef.current = 0;
      enableBodyScroll();
    }
  };

  const handlePin = () => {
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill(true);
      setIsScrolling(false);
      // videoRef.current?.pause();
      scrollCountRef.current = 0;
      enableBodyScroll();
    }
  };

  const navigateToTimestamp = (direction) => {
    const video = videoRef.current;
    if (!video) return;

    const currentTime = video.currentTime;

    // Handling scroll down
    if (direction > 0) {
      scrollDirectionRef.current = "down";

      // If we're at or past 14 seconds
      if (currentTime >= 14) {
        scrollCountRef.current += 1;
        if (scrollCountRef.current >= 2) {
          handleUnpin();
          return;
        }
      } else {
        // Normal timestamp progression
        let newTime;
        if (currentTime < 6) newTime = 6;
        else if (currentTime < 10) newTime = 10;
        else if (currentTime < 14) newTime = 14;
        else newTime = 14;

        // video.pause();
        video.currentTime = newTime;
        updateContent(newTime);
      }
    }
    // Handling scroll up
    else {
      scrollDirectionRef.current = "up";

      // If we're at or below 6 seconds
      if (currentTime <= 6) {
        scrollCountRef.current += 1;
        if (scrollCountRef.current >= 2) {
          handleUnpin();
          return;
        }
      } else {
        // Normal timestamp regression
        let newTime;
        if (currentTime > 14) newTime = 14;
        else if (currentTime > 10) newTime = 10;
        else if (currentTime > 6) newTime = 6;
        else newTime = 0;

        // video.pause();
        video.currentTime = newTime;
        updateContent(newTime);
      }
    }

    // Only play the video if we haven't unpinned
    setTimeout(() => {
      if (isScrolling) {
        forceVideoPlay(video);
      }
    }, 50);
  };
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let lastScrollTime = Date.now();
    let scrollTimeout;

    const handleWheel = (e) => {
      const now = Date.now();
      if (now - lastScrollTime < 1000) return;
      lastScrollTime = now;

      clearTimeout(scrollTimeout);

      const video = videoRef.current;
      if (!video) return;

      scrollTimeout = setTimeout(() => {
        navigateToTimestamp(e.deltaY > 0 ? 1 : -1);
      }, 250);
    };

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: section,
      // Pin when top hits top when scrolling down
      start: "top top",
      // Pin when bottom hits bottom when scrolling up
      endTrigger: section,
      end: "bottom bottom",
      pin: true,
      scrub: 1,
      markers: true,
      pinSpacing: true,

      anticipatePin: 1,

      onEnter: () => {
        setIsScrolling(true);
        disableBodyScroll();
        section.addEventListener("wheel", handleWheel);
        scrollDirectionRef.current = "down";
        scrollCountRef.current = 0;

        // Start from beginning when entering from top
        const video = videoRef.current;
        if (video) {
          video.currentTime = 0;
          updateContent(0);
          forceVideoPlay(video);
        }
      },
      onEnterBack: () => {
        setIsScrolling(true);
        disableBodyScroll();
        section.addEventListener("wheel", handleWheel);
        scrollDirectionRef.current = "up";
        scrollCountRef.current = 0;

        // Start from end when entering from bottom
        const video = videoRef.current;
        if (video) {
          video.currentTime = 14;
          updateContent(14);
          forceVideoPlay(video);
        }
      },
      onLeave: () => {
        handleUnpin();
      },
      onLeaveBack: () => {
        handleUnpin();
      },
    });

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
      section.removeEventListener("wheel", handleWheel);
      clearTimeout(scrollTimeout);
      enableBodyScroll();
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
              <div className="3xl:text-[34px]/[51px] font-Inter font-semibold leading-tighter">
                {highlightText(content.title, content.highlightedWords)}
              </div>
              <div className="3xl:text-[20px]/[33px] font-Inter font-normal mt-4 leading-tighter">
                {content.subtitle}
              </div>
            </div>
            <div className="relative w-2/3 h-full">
              <video
                ref={videoRef}
                className="absolute top-0 left-0 w-full h-full object-contain"
                playsInline
                autoPlay
                muted
                loop
                style={{
                  backgroundColor: "transparent",
                  background: "transparent",
                }}
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
