import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

export const ScrollImageSequenceBase = ({
  currentImageIndex,
  imagePaths,
  isLoading,
  heading,
  currentText,
  description,
  progressBarWidth,
}) => {
  const imageRef = useRef(null);

  return (
    <div className="relative w-full h-full">
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

      <div className="absolute bottom-4 left-4 right-4 h-1 bg-gray-200 rounded-full">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-150"
          style={{ width: progressBarWidth }}
        />
      </div>
    </div>
  );
};

ScrollImageSequenceBase.propTypes = {
  currentImageIndex: PropTypes.number.isRequired,
  imagePaths: PropTypes.arrayOf(PropTypes.string).isRequired,
  isLoading: PropTypes.bool.isRequired,
  heading: PropTypes.string,
  currentText: PropTypes.string,
  description: PropTypes.string,
  progressBarWidth: PropTypes.string,
};
