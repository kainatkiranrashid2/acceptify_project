import { useEffect, useRef, useMemo, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { debounce } from "lodash";

gsap.registerPlugin(ScrollTrigger);

const generateImagePaths = (basePath, start, end, isMobile) => {
  const paths = [];
  const extension = basePath.includes("/assets/pancake/") ? "webp" : "png";

  // For desktop, generate all frames
  if (!isMobile) {
    for (let i = start; i <= end; i++) {
      const paddedNumber = i.toString().padStart(4, "0");
      paths.push(`${basePath}${paddedNumber}.${extension}`);
    }
    return paths;
  }

  // For mobile, generate every 4th frame
  for (let i = start; i <= end; i += 4) {
    const paddedNumber = i.toString().padStart(4, "0");
    paths.push(`${basePath}${paddedNumber}.${extension}`);
  }
  return paths;
};

const ScrollImageSequence = ({
  totalImages,
  imagePath,
  description,
  heading,
}) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const preloadBufferSize = 5;

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Generate image paths with mobile optimization
  const imagePaths = useMemo(() => {
    return generateImagePaths(imagePath, 1, totalImages, isMobile);
  }, [totalImages, imagePath, isMobile]);

  // Preload images around current index
  const preloadImages = useCallback(
    debounce((currentIndex) => {
      const start = Math.max(0, currentIndex - preloadBufferSize);
      const end = Math.min(
        imagePaths.length - 1,
        currentIndex + preloadBufferSize
      );

      for (let i = start; i <= end; i++) {
        if (!loadedImages.has(i)) {
          const img = new Image();
          img.src = imagePaths[i];
          img.onload = () => {
            setLoadedImages((prev) => new Set([...prev, i]));
          };
        }
      }
    }, 150),
    [imagePaths, loadedImages]
  );

  // Scroll handling effect
  useEffect(() => {
    const container = containerRef.current;
    const imageElement = imageRef.current;

    if (!container || !imageElement || imagePaths.length === 0) return;

    setIsLoading(true);

    // Preload initial frames
    Promise.all(
      imagePaths.slice(0, 5).map((path) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = path;
          img.onload = resolve;
        });
      })
    ).then(() => setIsLoading(false));

    const scrollConfig = {
      trigger: container,
      start: "top top",
      end: isMobile ? "400% top" : "bottom top",
      scrub: isMobile ? 0.4 : 1,
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        const index = Math.min(
          Math.floor(self.progress * (imagePaths.length - 1)),
          imagePaths.length - 1
        );
        setCurrentImageIndex(index);
        preloadImages(index);
      },
    };

    const tl = gsap.timeline({
      scrollTrigger: scrollConfig,
    });

    return () => {
      preloadImages.cancel();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [imagePaths, isMobile, preloadImages]);

  // Render progress bar
  const renderProgressBar = () => (
    <div className="absolute bottom-4 left-4 right-4 h-1 bg-gray-200 rounded-full">
      <div
        className="h-full bg-blue-500 rounded-full transition-all duration-150"
        style={{
          width: `${(currentImageIndex / (imagePaths.length - 1)) * 100}%`,
        }}
      />
    </div>
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-white overflow-hidden">
      <div className="sticky top-0 h-full w-full flex items-center justify-center">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        <img
          ref={imageRef}
          src={imagePaths[currentImageIndex]}
          alt={`Sequence Image ${currentImageIndex + 1}`}
          className={`w-full h-full object-contain transition-opacity duration-150 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        />

        {heading && isMobile && (
          <h2 className="absolute top-4 left-4 text-xl font-bold text-black">
            {heading} ${currentImageIndex + 1}
          </h2>
        )}

        {description && isMobile && (
          <p className="absolute bottom-16 left-4 right-4 text-sm text-gray-800">
            {description}
          </p>
        )}

        {isMobile && renderProgressBar()}
      </div>
    </div>
  );
};

ScrollImageSequence.propTypes = {
  totalImages: PropTypes.number.isRequired,
  imagePath: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ScrollImageSequence;
