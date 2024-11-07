import React, { useEffect, useRef, useState } from "react";

const PanCakeClaim = () => {
  const videoRef = useRef(null);
  const [headerText, setHeaderText] = useState("Protect your customer's data");

  useEffect(() => {
    const video = videoRef.current;

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;

      if (currentTime >= 14) {
        setHeaderText(
          "Acceptify Protects your customer's data and enterprise reputation while saving you time and money"
        );
      } else if (currentTime >= 10) {
        setHeaderText(
          "Utilizing Acceptify's P2PE certified payment framework, which complies with the most rigorous security standards set forth by the Payment Card Industry (PCI)"
        );
      } else if (currentTime >= 6) {
        setHeaderText("Protect Your Reputation");
      } else {
        setHeaderText("Protect Your Customers");
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  return (
    <div className="p-20">
      <div className="text-black text-[32px] leading-[46px] font-bold tracking-tighter mb-6">
        {headerText}
      </div>
      <div className="relative w-full h-[calc(100vh-100px)]">
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-contain "
          autoPlay
          loop
          muted>
          <source src="/assets/pancake/pancake_v2.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default PanCakeClaim;
