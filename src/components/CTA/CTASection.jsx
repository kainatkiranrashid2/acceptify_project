const CTASection = () => {
  return (
    <div className="p-20">
      <div className="flex bg-gradient-to-br from-[#6E3BFB] to-[#3479FD] overflow-hidden rounded-xl">
        <div className="w-1/2 flex items-center  px-20 rounded-xl ">
          <div>
            <h2 className="xl:text-[32px]/[32px] font-bold text-white">
              Ready to get Started?
            </h2>
            <p className="text-[18px]/[27px] mt-3 text-white">
              Experience the ease of automation, the power of analytics, and the
              impact of seamless integration. Your journey begins now!
            </p>
            <button className="text-[18px]/[18px] mt-5 bg-primary rounded-lg py-[15px] px-[30px] text-white ">
              Get Started
            </button>
          </div>
        </div>
        <div className="w-1/2">
          <video className="w-full h-full object-cover " autoPlay loop muted>
            <source src="/assets/CTA/half_vid_v2.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
