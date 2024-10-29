import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { debounce } from "lodash";
import { ScrollImageSequenceBase } from "./ScrollImageSequenceBase";
import { generateImagePaths } from "./utils";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const DesktopScrollSequence = ({
  totalImages,
  imagePath,
  description,
  heading,
}) => {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(() => new Set());
  const [currentText, setCurrentText] = useState("");
  const scrollTriggerRef = useRef(null);
  const lastProgressRef = useRef(0);

  const headingTexts = useMemo(
    () => [
      "Protect your customer's data",
      "Protect your enterprise reputation",
      "utilizing Acceptify's P2PE certified payment framework",
      "Acceptify Protects your customer's data",
    ],
    []
  );

  const imagePaths = useMemo(() => {
    return generateImagePaths(imagePath, 1, totalImages, false);
  }, [totalImages, imagePath]);

  // Desktop-specific preload logic with larger buffer
  const preloadImages = useCallback(
    (currentIndex, direction = 1) => {
      const priorityLoad = async (index) => {
        if (!loadedImages.has(index) && imagePaths[index]) {
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
        // Load 5 images ahead and behind for desktop
        [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5].forEach((offset) => {
          const index = currentIndex + offset * direction;
          if (index >= 0 && index < imagePaths.length) {
            priorityLoad(index);
          }
        });
      };

      loadSequence();
    },
    [imagePaths, loadedImages]
  );

  const debouncedPreload = useMemo(
    () => debounce((index, direction) => preloadImages(index, direction), 100),
    [preloadImages]
  );

  useEffect(() => {
    const container = containerRef.current;
    const headingElement = headingRef.current;
    if (!container || imagePaths.length === 0) return;

    const preloadInitialFrames = async () => {
      setIsLoading(true);
      await Promise.all(
        imagePaths.slice(0, 5).map(
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

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "300%",
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = Math.max(0, Math.min(self.progress, 1));
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
  }, [imagePaths, debouncedPreload, headingTexts]);

  const progressBarWidth = useMemo(
    () => `${(currentImageIndex / (imagePaths.length - 1)) * 100}%`,
    [currentImageIndex, imagePaths.length]
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden">
      <div className="sticky top-0 h-full flex items-center justify-center">
        <ScrollImageSequenceBase
          currentImageIndex={currentImageIndex}
          imagePaths={imagePaths}
          isLoading={isLoading}
          heading={heading}
          currentText={currentText}
          description={description}
        />

        <h2
          ref={headingRef}
          className="absolute top-20 left-4 right-4 text-2xl font-bold text-black max-w-2xl mx-auto text-center transition-opacity duration-300">
          {currentText}
        </h2>
      </div>
    </div>
  );
};

DesktopScrollSequence.propTypes = {
  totalImages: PropTypes.number.isRequired,
  imagePath: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
