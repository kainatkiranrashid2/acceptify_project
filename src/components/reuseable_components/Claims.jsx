import ScrollImageSequence from "../ScrollImageSequence/ScrollImageSequence";
import PropTypes from "prop-types";

const Claims = ({ heading, description, totalImages, imagePath }) => {
  return (
    <div>
      {/* <div className="w-[985px] text-center mx-auto ">
        <h1 className="text-[55px]/[60.5px] hidden md:block tracking-tight font-Inter font-bold text-center">
          {heading}
        </h1>
        {description && (
          <p className="text-[21px]/[34.65px] text-center hidden md:block font-normal font-Inter">
            {description}
          </p>
        )}
      </div> */}
      <ScrollImageSequence
        heading={heading}
        description={description}
        totalImages={totalImages}
        imagePath={imagePath}
      />
    </div>
  );
};

Claims.propTypes = {
  heading: PropTypes.string.isRequired,
  description: PropTypes.string,
  totalImages: PropTypes.number.isRequired,
  imagePath: PropTypes.string.isRequired,
};

export default Claims;
