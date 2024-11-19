import React, { useEffect, useRef, useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";

const PanCakeClaim = () => {
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);

  const cld = new Cloudinary({
    cloud: {
      cloudName: "dq5guzzge",
    },
  });

  // Generate Cloudinary URL directly
  const videoUrl = `https://res.cloudinary.com/dq5guzzge/video/upload/v1/acceptify/assets/pancake/pancake_v3`;

  const [content, setContent] = useState({
    title: "Protect your Customers and your Reputation with Acceptify",
    subtitle:
      "Acceptify is designed to meet the stringent security standards of the Payment Card Industry's Data Security Standard (PCI-DSS). Customer's data is always strongly encrypted.",
    highlightedWords: ["Customers"],
  });

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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;

      const timestamps = Object.keys(timeBasedContent)
        .map(Number)
        .sort((a, b) => b - a);

      const activeTimestamp = timestamps.find((time) => currentTime >= time);

      if (activeTimestamp !== undefined) {
        setContent(timeBasedContent[activeTimestamp]);
      }
    };

    // Handle video loading
    const handleCanPlay = () => {
      video.play().catch((error) => {
        console.error("Video playback failed:", error);
      });
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("timeupdate", handleTimeUpdate);

    // Load the video
    video.load();

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("timeupdate", handleTimeUpdate);
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
    <div className="relative">
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
