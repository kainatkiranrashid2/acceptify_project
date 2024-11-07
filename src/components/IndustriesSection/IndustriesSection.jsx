import React from "react";

const IndustriesSection = () => {
  return (
    <div className="h-[866px] bg-gradient-to-r from-[#692AFB] to-[#3578FD] relative overflow-hidden">
      {/* Background Image Layer */}
      <div
        className="absolute inset-x-0 bottom-[34px] h-[567px] bg-cover bg-repeat bg-bottom z-0"
        style={{
          backgroundImage: `url('/assets/industries/industries_bg.png')`,
        }}></div>

      {/* Content Layer */}
      <div className="relative flex justify-between items-center px-20 pt-20 z-10">
        <div className="w-1/2">
          <h1 className="text-[52px]/[52px] mb-6 font-bold text-white">
            Industries
          </h1>
          <p className="text-[18px]/[27px] mb-6 text-white font-Inter">
            We mean it! Enterprise Mobile Payments Anywhere, Anytime, even
            Offline. Acceptify processes worldwide transactions for the most
            complex industries. Here are just a few industries we work with.
          </p>
          <button className="bg-primary text-white px-[26px] rounded-md py-[14px] text-[16px]/[27px]">
            Explore Industries
          </button>
        </div>
        <div className="w-1/2">
          <video className="w-full h-full object-cover" autoPlay loop muted>
            <source
              src="/assets/industries/industries_v2.webm"
              type="video/webm"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default IndustriesSection;
