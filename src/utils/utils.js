import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const generateImagePaths = (basePath, start, end, isMobile) => {
  const paths = [];
  const extension = basePath.includes("/assets/pancake/") ? "webp" : "png";
  const increment = isMobile ? 4 : 2;

  for (let i = start; i <= end; i += increment) {
    const paddedNumber = i.toString().padStart(4, "0");
    paths.push(`${basePath}${paddedNumber}.${extension}`);
  }
  return paths;
};
