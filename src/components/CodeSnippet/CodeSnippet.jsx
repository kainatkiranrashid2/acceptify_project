import React from "react";

const CodeSnippet = () => {
  return (
    <div className="container ">
      <div className="flex justify-between items-center  ">
        <div className="xl:w-[49%]">
          <video className="w-full h-full object-cover" autoPlay loop muted>
            <source src="/assets/code_snip/code_snip.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="flex flex-col justify-start items-center w-[42%]">
          <div className="w-fit">
            <h2 className="xl:text-[52px]/[60.88px]   2xl:text-[55px]/[79.2px]   font-Inter tracking-tighter font-bold mb-2">
              Ultra-Secure <br /> Payments with a
            </h2>
            <div className="flex items-center mb-4 ">
              <div className="bg-[#65D008] font-Inter font-bold text-[55px]/[79.2px] tracking-tighter text-white  px-3 ">
                Few Lines Of Code
              </div>
            </div>
            <div>
              <p className=" text-[21px]/[34.65px] font-Inter w-fit">
                Acceptify is PABP Certified making your payment applications
                secure and easier to certify.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeSnippet;
