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

  const myVideo = cld.video("acceptify/assets/herosection/header_v12");

  myVideo.resize(
    fill()
      .width(1920)
      .height(1080)
      .gravity(
        Gravity.autoGravity().autoFocus(AutoFocus.focusOn(FocusOn.faces()))
      )
  );
  return (
    <div className="relative w-full h-[calc(100vh-70px)]">
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
        cldVid={myVideo}
        controls={false}
      />

      {/* Text overlay */}
      <div className="ml-16 relative z-10 h-full flex items-center">
        <div className="xl:max-w-[677px]">
          <h1 className="lg:text-[59px]/[64.9px] xl:text-[69px]/[75px] font-Inter text-white font-bold tracking-tighter">
            Lighting Fast Enterprise Payments Anywhere
          </h1>
          <p className="text-white text-[21px]/[34.65px] font-normal font-Inter mt-[27px]">
            Acceptify enables your applications to accept worldwide, secure,
            certified, online/offline payments while removing all of your
            security concerns.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
