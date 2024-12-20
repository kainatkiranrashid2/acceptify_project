import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
const useResponsiveVisibleLogos = () => {
  const [visibleLogos, setVisibleLogos] = useState(6);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1280) setVisibleLogos(6); // xl
      else if (width >= 1024) setVisibleLogos(6); // lg
      else if (width >= 768) setVisibleLogos(3); // md
      else if (width >= 640) setVisibleLogos(2); // sm
      else setVisibleLogos(1); // xs
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return visibleLogos;
};

const OurClients = ({ classText }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  const visibleLogos = useResponsiveVisibleLogos();

  const logos = [
    "/assets/hero/1.png",
    "/assets/hero/2.png",
    "/assets/hero/3.png",
    " /assets/hero/4.png",
    " /assets/hero/5.png",
    " /assets/hero/6.png",
    " /assets/hero/7.png",
    " /assets/hero/8.png",
    " /assets/hero/9.png",
    " /assets/hero/10.png",
    " /assets/hero/11.png",
    " /assets/hero/12.png",
    " /assets/hero/13.png",
    " /assets/hero/14.png",
    " /assets/hero/15.png",
    " /assets/hero/16.png",
    " /assets/hero/17.png",
    " /assets/hero/18.png",
    " /assets/hero/19.png",
    " /assets/hero/20.png",
    " /assets/hero/21.png",
    " /assets/hero/22.png",
    " /assets/hero/23.png",
    " /assets/hero/24.png",
    " /assets/hero/25.png",
    " /assets/hero/26.png",
    " /assets/hero/27.png",
  ];

  const handleVisibilityChange = useCallback(() => {
    if (document.hidden) {
      setIsPaused(true);
    } else {
      setIsPaused(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [handleVisibilityChange]);

  const nextSlide = useCallback(() => {
    if (!isPaused) {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % logos.length);
    }
  }, [logos.length, isPaused]);

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + logos.length) % logos.length
    );
    setIsPaused(true);

    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set a new timer to unpause after 2 seconds
    timerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 2000);
  };

  useEffect(() => {
    const autoPlayTimer = setInterval(nextSlide, 2000);
    return () => {
      clearInterval(autoPlayTimer);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [nextSlide]);

  const getVisibleLogos = () => {
    const visibleLogosArray = [];
    for (let i = 0; i < visibleLogos; i++) {
      const index = (currentIndex + i + logos.length) % logos.length;
      visibleLogosArray.push(logos[index]);
    }
    return visibleLogosArray;
  };

  return (
    <div className="relative isolate   !h-[59px] lg:!h-[80px] xl:!h-[100px]  bg-white  dark:bg-black py-5 lg:py-10 w-full  overflow-hidden">
      <AnimatePresence initial={false} className="!h-[52px]">
        <motion.div
          key={currentIndex}
          className="absolute  inset-0 flex justify-center sm:justify-evenly items-center"
          custom={direction}
          variants={{
            enter: (direction) => ({
              x:
                direction > 0
                  ? `${100 / visibleLogos}%`
                  : `-${100 / visibleLogos}%`,
            }),
            center: { x: 0 },
            exit: (direction) => ({
              x:
                direction > 0
                  ? `-${100 / visibleLogos}%`
                  : `${100 / visibleLogos}%`,
            }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: "easeOut" }}>
          {getVisibleLogos().map((logo, index) => (
            <motion.div
              key={index}
              className=" flex  justify-center items-center "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}>
              <img
                src={logo}
                alt={`Client logo ${index + 1}`}
                className={`h-[16px] sm:h-[31px] lg:h-full object-contain ${classText}`}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      <div className="absolute dark:bg-black left-0 top-0 lg:top-1/2 h-full w-10 sm:w-12 md:w-14 lg:w-16 ">
        <button
          onClick={prevSlide}
          className=" transform lg:-translate-y-1/2 flex bg-white  dark:bg-black justify-center h-full items-center p-2 sm:p-3 md:p-4 lg:p-5 z-10">
          <FaArrowLeft size={24} className="text-[#707070]  md:hidden" />
          <FaArrowLeft
            size={28}
            className="text-[#707070]  hidden md:block lg:hidden"
          />
          <FaArrowLeft size={44} className="text-[#707070] hidden lg:block" />
        </button>
      </div>
      <div className="absolute right-4  top-0 lg:top-1/2 h-full w-10 sm:w-12 md:w-14 lg:w-16 ">
        <button
          onClick={nextSlide}
          className="transform lg:-translate-y-1/2   bg-white dark:bg-black  flex justify-center  items-center h-full p-2 sm:p-3 md:p-4  lg:p-5 z-10">
          <FaArrowRight size={24} className="text-[#707070] md:hidden" />
          <FaArrowRight
            size={28}
            className="text-[#707070] hidden md:block lg:hidden"
          />
          <FaArrowRight size={44} className="text-[#707070] hidden lg:block" />
        </button>
      </div>
    </div>
  );
};

export default OurClients;
OurClients.propTypes = {
  classText: PropTypes.string,
};
