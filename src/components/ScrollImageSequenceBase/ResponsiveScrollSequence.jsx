import { useMediaQuery } from "@/hooks/use-media-query";
import { MobileScrollSequence } from "./MobileScrollSequence";
import { DesktopScrollSequence } from "./DesktopScrollSequence";
import PropTypes from "prop-types";

const ResponsiveScrollSequence = (props) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return isMobile ? (
    <MobileScrollSequence {...props} />
  ) : (
    <DesktopScrollSequence {...props} />
  );
};

ResponsiveScrollSequence.propTypes = {
  totalImages: PropTypes.number.isRequired,
  imagePath: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ResponsiveScrollSequence;
