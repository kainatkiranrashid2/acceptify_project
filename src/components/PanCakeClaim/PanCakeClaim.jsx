import React, { useEffect, useRef, useState } from "react";

const PanCakeClaim = () => {
  const videoRef = useRef(null);
  const [headerText, setHeaderText] = useState("Protect your customer's data");
  const [headerTextNew, setHeaderTextNew] = useState(
    "Protect your customer's data"
  );
  const [subText, setSubText] = useState("Protect your customer's data");

  useEffect(() => {
    const video = videoRef.current;

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;

      if (currentTime >= 14) {
        setHeaderText(
          "Acceptify Protects your customer's data and enterprise reputation while saving you time and money"
        );
        setHeaderTextNew();
        setSubText(
          "Acceptify is designed to meet the stringent security standards of the Payment Card Industry's Data Security Standard (PCI-DSS). Customer's data is always strongly encrypted."
        );
      } else if (currentTime >= 10) {
        setHeaderText(
          "Utilizing Acceptify's P2PE certified payment framework, which complies with the most rigorous security standards set forth by the Payment Card Industry (PCI)"
        );
      } else if (currentTime >= 6) {
        setHeaderText("Protect Your Reputation");
      } else {
        setHeaderText(
          "Protect your Customers and your Reputation with Acceptify"
        );
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  return (
    <div
      className="bg-contain bg-no-repeat bg-left  "
      style={{
        backgroundImage: `url('/assets/pancake/pancake_bg.png')`,
      }}>
      <div className="py-20 px-[140px] ">
        <div className="w-full grid grid-cols-12 items-center h-screen">
          <div className="col-span-4">
            <div className="3xl:text-[34px]/[51px] font-Inter font-semibold leading-tighter">
              {headerText}
            </div>
            <div className="3xl:text-[20px]/[33px] font-Inter font-normal mt-4 leading-tighter">
              Acceptify is designed to meet the stringent security standards of
              the Payment Card Industry&apos; Data Security Standard (PCI-DSS).
              Customer&apos; data is always strongly encrypted.
            </div>
          </div>
          <div className="relative col-span-8 h-full">
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
      </div>
    </div>
  );
};

export default PanCakeClaim;
