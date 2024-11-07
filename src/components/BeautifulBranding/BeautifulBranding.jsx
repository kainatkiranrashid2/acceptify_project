const BeautifulBranding = () => {
  return (
    <div className=" m-20 ">
      <div className=" flex justify-between ">
        <div className="w-1/2 flex items-center">
          <div className=" w-fit font-Inter font-bold xl:text-[52px]/[65px] 2xl:text-[55px]/[79.2px] tracking-tighter   ">
            <span className="bg-primary text-white px-6">
              Represent your Brand{" "}
            </span>
            anywhere you take transactions.
          </div>
        </div>
        <div className="w-1/2">
          <video className="w-full h-full object-cover" autoPlay loop muted>
            <source
              src="/assets/beautiful_branding/beatiful_branding_v2.webm"
              type="video/webm"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default BeautifulBranding;
