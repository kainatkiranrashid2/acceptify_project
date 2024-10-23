import FeatureCarousel from "../components/FeatureCarousel/FeatureCarousel";

const MoreFeatures = () => {
  return (
    <div className="bg-black px-[80px] pt-[100px]">
      <div className="text-[55px]/[66px] w-[430px] text-white font-Inter font-bold">
        Loaded with more features
      </div>
      <div>
        <FeatureCarousel />
      </div>
    </div>
  );
};

export default MoreFeatures;
