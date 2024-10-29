const BeautifulBranding = () => {
  return (
    <div className=" pt-[100px]">
      <div className=" flex justify-between mx-20">
        <div className="mt-[84px] w-[49%]">
          <div className="bg-[#65D008] w-fit font-Inter font-bold xl:text-[52px]/[52px] 2xl:text-[55px]/[55px] tracking-tighter text-white  p-[20px]  ">
            Beautiful Branding
          </div>
        </div>
        <div className="w-[45%]">
          <video className="w-full h-full object-cover" autoPlay loop muted>
            <source
              src="/assets/beautiful_branding/beautiful_branding.webm"
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
