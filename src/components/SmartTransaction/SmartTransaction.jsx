import React from "react";

const SmartTransaction = () => {
  return (
    <div className="flex flex-col justify-start items-start mx-[80px] my-[100px]">
      <div className="w-[70%]">
        <p className="text-[55px]/[79.2px] w-full font-bold tracking-tighter font-Inter">
          <span className="bg-primary text-white px-6">Smart Transactions</span>{" "}
          seamlessly attach any enterprise data to your transactions.
        </p>
      </div>
      <div className="">
        <video className="w-full h-full object-cover" autoPlay loop muted>
          <source
            src="/assets/smart_transaction/smart_transaction.webm"
            type="video/webm"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default SmartTransaction;
