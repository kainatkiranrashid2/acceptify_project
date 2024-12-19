import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PanCakeClaim = () => {
  const videoRefs = {
    video1: useRef(null),
    video2: useRef(null),
    video3: useRef(null),
  };
  const sectionRef = useRef(null);
  const textContainerRef = useRef(null);
  const textStackRef = useRef([]);
  const tlRef = useRef(null);
  const scrollTriggerRef = useRef(null);

  const [currentVideo, setCurrentVideo] = useState("video1");
  const [textStack, setTextStack] = useState([]);

  const currentTimeRef = useRef({
    video1: 0,
    video2: 0,
    video3: 0,
  });

  const videos = {
    video1: {
      url: "https://res.cloudinary.com/dq5guzzge/video/upload/c_fill,w_1920,h_1080,g_auto,f_auto/v1732528240/components/pancake.webm",
      duration: 18,
      startProgress: 0,
      endProgress: 0.6,
    },
    video2: {
      url: "https://res.cloudinary.com/dq5guzzge/video/upload/v1732532264/components/code_snippet.webm",
      duration: 6,
      startProgress: 0.6,
      endProgress: 0.8,
    },
    video3: {
      url: "https://res.cloudinary.com/dq5guzzge/video/upload/v1732531637/components/lightning_fast.webm",
      duration: 8,
      startProgress: 0.8,
      endProgress: 1,
    },
  };

  const timeBasedContent = {
    video1: [
      {
        title: "Protect your Customers and your Reputation with Acceptify",
        subtitle:
          "Acceptify is designed to meet the stringent security standards of the Payment Card Industry's Data Security Standard (PCI-DSS). Customer's data is always strongly encrypted.",
        highlightedWords: ["Protect your", "Customers"],
        startTime: 0,
        endTime: 6,
      },
      {
        title: "Protect your Operation and Reputation",
        subtitle:
          "Acceptify protects against harmful security breaches that negatively impact your brand, disrupts your operations, increases your liabilities and decreases your revenue.",
        highlightedWords: ["Operation", "and", "Reputation"],
        startTime: 6,
        endTime: 10,
      },
      {
        title:
          "Acceptify is PCI-P2PE Certified ensuring Compliance to the industry's highest standard.",
        subtitle:
          "Acceptify's PCI P2PE (Point-to-Point Encryption) certification ensures compliance to PCI-DSC's (Payment Card Industry Security Standards Council) highest security standards.",
        highlightedWords: ["PCI-P2PE Certified"],
        startTime: 10,
        endTime: 14,
      },
      {
        title:
          "Acceptify Simplifying PCI Security Compliance for Online and Offline Payments.",
        subtitle:
          "Acceptify's encryption of cardholder data removes it from scope for many PCI DSS requirements, as a result your PCI audit effort is greatly reduced.",
        highlightedWords: ["Simplifying", "PCI Security Compliance"],
        startTime: 14,
        endTime: 18,
      },
    ],
    video2: [
      {
        title: "Implement Ultra-Secure Payments with a few Lines of Code",
        subtitle:
          "We've done all the heavy lifting for you. Use the Acceptify's APIs to connect to a payment device, take a payment, submit the transaction to your processor and receive the approval or declined decision – with just a few lines of code.",
        highlightedWords: ["Ultra-Secure Payments"],
        startTime: 0,
        endTime: 6,
      },
    ],
    video3: [
      {
        title: "Lightning Fast Payments",
        subtitle:
          'Enterprises that need speedy payments choose Acceptify. Our payment technologies are designed around "No More Spinners." Spinners are painful when customers are waiting.',
        highlightedWords: ["Lightning Fast Payments"],
        startTime: 2,
        endTime: 8,
      },
    ],
  };

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
    const section = sectionRef.current;
    const textContainer = textContainerRef.current;
    if (!section || !textContainer) return;

    // Initialize all videos
    Object.entries(videoRefs).forEach(([_, ref]) => {
      if (ref.current) {
        ref.current.load();
      }
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        pin: true,
        pinSpacing: true,
        scrub: 3,
        onUpdate: (self) => {
          const progress = self.progress;

          // Determine current video
          const currentVideoData = Object.entries(videos).find(
            ([_, video]) =>
              progress >= video.startProgress && progress <= video.endProgress
          );

          if (!currentVideoData) return;

          const [currentVideoId, video] = currentVideoData;

          // Calculate video time within current segment with smooth interpolation
          const videoProgress =
            (progress - video.startProgress) /
            (video.endProgress - video.startProgress);
          const targetVideoTime = videoProgress * video.duration;

          // Smooth timestamp update
          Object.entries(videoRefs).forEach(([videoId, ref]) => {
            const videoElement = ref.current;
            if (!videoElement) return;

            if (videoId === currentVideoId) {
              // Gradually move towards the target time
              const currentTime = currentTimeRef.current[videoId];
              const newTime = gsap.utils.interpolate(
                currentTime,
                targetVideoTime,
                0.2 // Adjust this value to control smoothness (0-1)
              );

              // Update current time ref
              currentTimeRef.current[videoId] = newTime;

              // Set video time
              videoElement.currentTime = newTime;
            } else {
              // Reset other videos
              videoElement.currentTime = 0;
              currentTimeRef.current[videoId] = 0;
            }
          });

          // Determine and update content
          const videoContent = timeBasedContent[currentVideoId];
          const newContent = videoContent.find(
            (content) =>
              currentTimeRef.current[currentVideoId] >= content.startTime &&
              currentTimeRef.current[currentVideoId] < content.endTime
          );

          if (newContent) {
            setTextStack((prevStack) => {
              // Prevent duplicate content
              const isNewContent =
                prevStack.findIndex(
                  (item) => JSON.stringify(item) === JSON.stringify(newContent)
                ) === -1;

              if (isNewContent) {
                // Keep only the last 2 items
                const updatedStack = [...prevStack, newContent].slice(-2);
                textStackRef.current = updatedStack;
                return updatedStack;
              }
              return prevStack;
            });
          }

          setCurrentVideo(currentVideoId);
        },
      },
    });

    const animateSmoothTextScroll = () => {
      const textContainer = textContainerRef.current;

      // Create a GSAP timeline specifically for text scrolling
      const textScrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 3, // Smooth scrubbing
        },
      });

      // Animate text stack with smooth transitions
      textStack.forEach((content, index) => {
        // Enter animation
        textScrollTimeline
          .fromTo(
            `.text-content-${index}`,
            {
              y: "100%", // Start below the visible area
              opacity: 0,
              scale: 0.9,
            },
            {
              y: "0%", // Move to the center
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: "power2.inOut",
            }
          )
          .to(
            `.text-content-${index}`,
            {
              y: "-100%", // Move out above the visible area
              opacity: 0,
              scale: 0.9,
              duration: 1,
              ease: "power3.in",
            },
            "+=0.5" // Slight delay between text transitions
          );
      });
    };

    // Rerun text animation when textStack changes
    if (textStack.length > 0) {
      animateSmoothTextScroll();
    }

    tlRef.current = tl;
    scrollTriggerRef.current = tl.scrollTrigger;

    tlRef.current = tl;
    scrollTriggerRef.current = tl.scrollTrigger;

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative min-h-screen">
      <div className="relative">
        <div className="py-10 px-[180px]">
          <div className="w-full flex justify-center items-start h-screen gap-36">
            <div
              ref={textContainerRef}
              className="w-1/3  relative overflow-hidden flex justify-center items-center h-screen">
              <div className="w-full space-y-[30vh]">
                {textStack.map((content, index) => (
                  <div
                    key={index}
                    className={`text-content relative w-full text-center bottom-40 
                      ${
                        index === textStack.length - 1
                          ? "opacity-100"
                          : "opacity-50 scale-90"
                      }`}>
                    <div className="3xl:text-[34px]/[51px] font-Inter font-semibold leading-tighter">
                      {highlightText(content.title, content.highlightedWords)}
                    </div>
                    <div className="3xl:text-[20px]/[33px] font-Inter font-normal mt-4 leading-tighter">
                      {content.subtitle}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative w-2/3 h-full">
              {Object.entries(videos).map(([videoId, video]) => (
                <div
                  key={videoId}
                  className={`absolute top-0 left-0 w-full h-full transition-opacity duration-300 ${
                    currentVideo === videoId
                      ? "opacity-100 z-10"
                      : "opacity-0 z-0"
                  }`}>
                  <video
                    ref={videoRefs[videoId]}
                    className="w-full h-full object-contain"
                    playsInline
                    muted
                    controlsList="nodownload" // Prevents download option in controls
                    disablePictureInPicture // Disables picture-in-picture mode
                    onContextMenu={(e) => e.preventDefault()} // Prevents right-click menu
                    preload="auto"
                    style={{
                      backgroundColor: "transparent",
                      background: "transparent",
                    }}>
                    <source src={video.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanCakeClaim;
