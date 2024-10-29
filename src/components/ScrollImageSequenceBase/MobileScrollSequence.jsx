import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import { debounce } from "lodash";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { ScrollImageSequenceBase } from "./ScrollImageSequenceBase";
import { generateImagePaths } from "./utils";

const MobileScrollSequence = ({
  totalImages,
  imagePath,
  description,
  heading,
}) => {
  const containerRef = useRef(null);
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
    return generateImagePaths(imagePath, 1, totalImages, true);
  }, [totalImages, imagePath]);

  // Mobile-specific preload logic with smaller buffer
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
        // Load just 2 images ahead and behind for mobile
        [-2, -1, 1, 2].forEach((offset) => {
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

  useEffect(() => {
    const container = containerRef.current;
    if (!container || imagePaths.length === 0) return;

    const preloadInitialFrames = async () => {
      setIsLoading(true);
      await Promise.all(
        imagePaths.slice(0, 3).map(
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
      end: "200%",
      scrub: 1,
      pin: true,
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
        preloadImages(imageIndex, direction);
      },
    });

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
    };
  }, [imagePaths, preloadImages, headingTexts]);

  const progressBarWidth = useMemo(
    () => `${(currentImageIndex / (imagePaths.length - 1)) * 100}%`,
    [currentImageIndex, imagePaths.length]
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden">
      <div className="sticky top-0 h-full flex items-center justify-center">
        <p className="absolute top-4 left-4 right-4 text-xl text-black">
          {heading}
        </p>

        <ScrollImageSequenceBase
          currentImageIndex={currentImageIndex}
          imagePaths={imagePaths}
          isLoading={isLoading}
          heading={heading}
          currentText={currentText}
          description={description}
          progressBarWidth={progressBarWidth}
        />

        <p className="absolute bottom-16 left-4 right-4 text-sm text-black">
          {description}
        </p>
      </div>
    </div>
  );
};

MobileScrollSequence.propTypes = {
  totalImages: PropTypes.number.isRequired,
  imagePath: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
