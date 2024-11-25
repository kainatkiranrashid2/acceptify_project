import { useEffect, useRef, useState } from "react";
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
  const tlRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const [currentVideo, setCurrentVideo] = useState("video1");
  const [content, setContent] = useState(null);
  const previousProgressRef = useRef(0);
  const previousVideoRef = useRef("video1");

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
    video1: {
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
    },
    video2: {
      0: {
        title: "Implement Ultra-Secure Payments with a few Lines of Code",
        subtitle:
          "We've done all the heavy lifting for you. Use the Acceptify's APIs to connect to a payment device, take a payment, submit the transaction to your processor and receive the approval or declined decision – with just a few lines of code.",
        highlightedWords: ["Ultra-Secure Payments"],
      },
    },
    video3: {
      0: {
        title: "Lightning Fast Payments",
        subtitle:
          'Enterprises that need speedy payments choose Acceptify. Our payment technologies are designed around "No More Spinners." Spinners are painful when customers are waiting. Acceptify helps you succeed in high throughput payment workflows where speed matters.',
        highlightedWords: ["Lightning Fast Payments"],
      },
    },
  };

  const determineCurrentVideo = (progress) => {
    for (const [videoId, video] of Object.entries(videos)) {
      if (progress >= video.startProgress && progress <= video.endProgress) {
        return videoId;
      }
    }
    return "video1";
  };

  const updateVideoPlayback = (progress) => {
    const isScrollingBack = progress < previousProgressRef.current;
    previousProgressRef.current = progress;

    const newCurrentVideo = determineCurrentVideo(progress);
    const video = videos[newCurrentVideo];

    // Calculate normalized progress within the current video segment
    const videoProgress =
      (progress - video.startProgress) /
      (video.endProgress - video.startProgress);

    if (newCurrentVideo !== previousVideoRef.current) {
      // Handle video transition
      Object.entries(videoRefs).forEach(([videoId, ref]) => {
        const videoElement = ref.current;
        if (videoElement) {
          if (videoId === newCurrentVideo) {
            // Setup new video
            const targetTime = isScrollingBack
              ? video.duration * videoProgress
              : 0;
            videoElement.currentTime = targetTime;
            videoElement
              .play()
              .catch((err) => console.log("Video play error:", err));
          } else {
            // Pause and reset other videos
            videoElement.pause();
            videoElement.currentTime = 0;
          }
        }
      });

      setCurrentVideo(newCurrentVideo);
      previousVideoRef.current = newCurrentVideo;
    } else {
      // Update current video playback
      const videoElement = videoRefs[newCurrentVideo].current;
      if (videoElement) {
        const targetTime = Math.min(
          Math.max(0, videoProgress * video.duration),
          video.duration
        );
        if (Math.abs(videoElement.currentTime - targetTime) > 0.1) {
          videoElement.currentTime = targetTime;
        }
        videoElement
          .play()
          .catch((err) => console.log("Video play error:", err));
      }
    }
  };

  const updateContent = (progress) => {
    const currentVideoId = determineCurrentVideo(progress);
    const video = videos[currentVideoId];

    const videoProgress =
      (progress - video.startProgress) /
      (video.endProgress - video.startProgress);
    const videoTime = videoProgress * video.duration;

    const timestamps = Object.keys(timeBasedContent[currentVideoId])
      .map(Number)
      .sort((a, b) => a - b);

    const currentTimestamp = timestamps.reduce(
      (prev, curr) => (videoTime >= curr ? curr : prev),
      timestamps[0]
    );

    setContent(timeBasedContent[currentVideoId][currentTimestamp]);
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
    if (!section) return;

    setContent(timeBasedContent.video1[0]);

    // Initialize all videos
    Object.entries(videoRefs).forEach(([_, ref]) => {
      if (ref.current) {
        ref.current.load();
      }
    });

    // Create GSAP Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          updateVideoPlayback(progress);
          updateContent(progress);
        },
      },
    });

    tlRef.current = tl;
    scrollTriggerRef.current = tl.scrollTrigger;

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative min-h-screen">
      <div
        className="absolute -top-16 -left-20 inset-0 bg-contain bg-no-repeat overflow-clip"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dq5guzzge/image/upload/v1732528819/components/pancake_background.png')`,
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
