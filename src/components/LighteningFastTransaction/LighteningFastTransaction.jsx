import React from "react";

const LighteningFastTransaction = () => {
  return (
    <div className="mt-20 my-20">
      <div className="flex justify-center">
        <div className="w-1/2">
          <video className="w-full h-full object-cover" autoPlay loop muted>
            <source
              src="/assets/lighteningfast/lightening_fast.webm"
              type="video/webm"
            />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="w-1/2 p-10">
          <p className="text-[55px]/[79.2px] font-bold font-Inter w-full">
            <span className="bg-primary text-white px-6">Lightning Fast</span>{" "}
            online and instant processing with background mode.​
          </p>
        </div>
      </div>
    </div>
  );
};

export default LighteningFastTransaction;
