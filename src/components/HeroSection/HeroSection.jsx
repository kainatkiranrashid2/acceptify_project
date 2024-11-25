import { AdvancedVideo } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

// Import required actions and qualifiers.
import { fill } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { Gravity } from "@cloudinary/url-gen/qualifiers";
import { AutoFocus } from "@cloudinary/url-gen/qualifiers/autoFocus";

const HeroSection = () => {
  // dq5guzzge

  const cld = new Cloudinary({
    cloud: {
      cloudName: "dq5guzzge",
    },
  });

  const heroVideo = cld.video("acceptify/assets/herosection/header_v12");

  heroVideo.resize(
    fill()
      .width(1920)
      .height(1080)
      .gravity(
        Gravity.autoGravity().autoFocus(AutoFocus.focusOn(FocusOn.faces()))
      )
  );
  return (
    <div className="relative w-full h-[calc(100vh-70px)] aspect-video">
      {/* Video background */}
      {/* <video
        className="absolute top-0 left-0 w-full h-full object-cover "
         >
        <source src="/assets/herosection/header_v12.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video> */}
      <AdvancedVideo
        className="absolute top-0 left-0 w-full h-full object-cover "
        autoPlay
        loop
        muted
        cldVid={heroVideo}
        controls={false}
      />

      {/* Text overlay */}
      <div className="ml-[140px] relative z-10 h-full flex items-center">
        <div className="max-w-[400px] 2xl:max-w-[677px]">
          <h1 className="3xl:text-[60px]/[66px] font-Inter text-white font-semibold tracking-tighter">
            Lighting Fast Mobile Enterprise Payments Anywhere
          </h1>
          <p className="text-white 3xl:text-[24px]/[39.6px] font-normal font-Inter my-[12px]">
            Acceptify enables your applications to accept worldwide, secure,
            certified, online/offline payments while removing all of your
            security concerns.
          </p>

          <button className="bg-primary  text-white 3xl:text-[15px]/[24px] font-semibold font-Inter px-3 py-[6px] leading-[0.2px] rounded-2xl">
            Start now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
