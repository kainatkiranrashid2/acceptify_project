import { useEffect, useRef, useMemo, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { debounce } from "lodash";

gsap.registerPlugin(ScrollTrigger);

const generateImagePaths = (basePath, start, end, isMobile) => {
  const paths = [];
  const extension = basePath.includes("/assets/pancake/") ? "webp" : "png";
  // Using larger increments for mobile to reduce load while maintaining smooth playback
  const increment = isMobile ? 4 : 2;

  for (let i = start; i <= end; i += increment) {
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
  const headingRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [loadedImages, setLoadedImages] = useState(() => new Set());
  const [currentText, setCurrentText] = useState("");
  const preloadBufferSize = isMobile ? 3 : 5;
  const scrollTriggerRef = useRef(null);
  const lastProgressRef = useRef(0);

  const headingTexts = useMemo(
    () => [
      "Protect your customer's data",
      "Protect your enterprise reputation",
      "utilizing Acceptify's P2PE certified payment framework, which complies with the most rigorous security standards set forth by the Payment Card Industry (PCI).",
      "Acceptify Protects your customer's data and enterprise reputation while saving you time and money",
    ],
    []
  );

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => window.innerWidth <= 768;
    setIsMobile(checkMobile());

    const debouncedCheckMobile = debounce(() => {
      setIsMobile(checkMobile());
    }, 250);

    window.addEventListener("resize", debouncedCheckMobile);
    return () => {
      window.removeEventListener("resize", debouncedCheckMobile);
      debouncedCheckMobile.cancel();
    };
  }, []);

  // Generate image paths
  const imagePaths = useMemo(() => {
    return generateImagePaths(imagePath, 1, totalImages, isMobile);
  }, [totalImages, imagePath, isMobile]);

  // Preload images with priority queue
  const preloadImages = useCallback(
    (currentIndex, direction = 1) => {
      const priorityLoad = async (index) => {
        if (
          !loadedImages.has(index) &&
          imagePaths[index] &&
          index >= 0 &&
          index < imagePaths.length
        ) {
          const img = new Image();
          img.src = imagePaths[index];
          await new Promise((resolve) => {
            img.onload = resolve;
          });
          setLoadedImages((prev) => new Set([...prev, index]));
        }
      };

      const loadSequence = async () => {
        await priorityLoad(currentIndex);

        // Load both forward and backward images for smooth bidirectional scrolling
        const nearbyIndexes = [];
        for (let i = 1; i <= preloadBufferSize; i++) {
          nearbyIndexes.push(currentIndex + i * direction); // Forward/backward based on direction
          nearbyIndexes.push(currentIndex - i * direction); // Also load in opposite direction
        }

        nearbyIndexes
          .filter((i) => i >= 0 && i < imagePaths.length)
          .forEach(priorityLoad);
      };

      loadSequence();
    },
    [imagePaths, loadedImages, preloadBufferSize]
  );

  const debouncedPreload = useMemo(
    () => debounce((index, direction) => preloadImages(index, direction), 100),
    [preloadImages]
  );

  // Scroll handling effect
  useEffect(() => {
    const container = containerRef.current;
    const imageElement = imageRef.current;
    const headingElement = headingRef.current;

    if (!container || !imageElement || imagePaths.length === 0) return;

    // Initial frame loading
    const preloadInitialFrames = async () => {
      setIsLoading(true);
      const initialLoadCount = isMobile ? 3 : 5;

      await Promise.all(
        imagePaths.slice(0, initialLoadCount).map(
          (path) =>
            new Promise((resolve) => {
              const img = new Image();
              img.src = path;
              img.onload = resolve;
            })
        )
      );
      setIsLoading(false);
    };

    preloadInitialFrames();

    // Calculate scroll distance based on viewport height
    const viewportHeight = window.innerHeight;
    const scrollDistance = `${viewportHeight * 2}px`;

    // Kill existing ScrollTrigger instance if it exists
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill();
    }

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: scrollDistance,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = Math.max(0, Math.min(self.progress, 1)); // Clamp between 0 and 1
        const direction = progress > lastProgressRef.current ? 1 : -1;
        lastProgressRef.current = progress;

        const imageIndex = Math.min(
          Math.floor(progress * (imagePaths.length - 1)),
          imagePaths.length - 1
        );

        const textIndex = Math.min(
          Math.floor(progress * headingTexts.length),
          headingTexts.length - 1
        );

        setCurrentImageIndex(imageIndex);
        setCurrentText(headingTexts[textIndex]);
        debouncedPreload(imageIndex, direction);

        const textProgress = (progress * headingTexts.length) % 1;
        const opacity =
          textProgress > 0.8
            ? 5 * (1 - textProgress)
            : textProgress < 0.2
            ? 5 * textProgress
            : 1;

        gsap.to(headingElement, {
          opacity,
          duration: 0.1,
          overwrite: true,
        });
      },
    });

    return () => {
      debouncedPreload.cancel();
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
    };
  }, [imagePaths, isMobile, debouncedPreload, totalImages, headingTexts]);

  const progressBarWidth = useMemo(
    () => `${(currentImageIndex / (imagePaths.length - 1)) * 100}%`,
    [currentImageIndex, imagePaths.length]
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden">
      <div className="sticky top-0 h-full w-full flex items-center justify-center">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {heading && isMobile && (
          <p className="absolute bottom-16 left-4 right-4 text-sm text-black">
            {heading}
          </p>
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
          <p className="absolute top-4 left-4 right-4 text-xl text-black">
            {heading}
          </p>
        )}
        <h2
          ref={headingRef}
          className="absolute top-20 left-4 right-4 text-xl font-bold text-black max-w-2xl transition-opacity duration-300">
          {currentText} {currentImageIndex + 1}
        </h2>

        {description && isMobile && (
          <p className="absolute bottom-16 left-4 right-4 text-sm text-black">
            {description}
          </p>
        )}

        <div className="absolute bottom-4 left-4 right-4 h-1 bg-gray-200 rounded-full">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-150"
            style={{ width: progressBarWidth }}
          />
        </div>
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
