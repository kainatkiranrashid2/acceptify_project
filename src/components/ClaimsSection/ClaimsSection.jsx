import Claims from "../reuseable_components/Claims";
const claimsData = [
  {
    heading:
      "Protect your Customers and your Reputation with our P2PE Security.",
    description:
      "Acceptify enables your applications to accept worldwide, secure, certified, online/offline payments while removing all of your security concerns.",
    totalImages: 450,
    imagePath: "/assets/pancake/",
  },
  // {
  //   heading:
  //     "The Most Powerful Transaction Engine for maximizing offline revenue.​",
  //   totalImages: 720,
  //   imagePath: "/assets/second_claim/",
  // },
  // {
  //   heading:
  //     "Smart Transactions. Include any extra enterprise data alongside your transaction.​",
  //   totalImages: 300,
  //   imagePath: "/assets/online_offline/",
  // },
];

const ClaimsSection = () => {
  return (
    <div className="bg-white">
      {claimsData.map((claim, index) => (
        <Claims
          key={index}
          heading={claim.heading}
          description={claim.description}
          totalImages={claim.totalImages}
          imagePath={claim.imagePath}
        />
      ))}
    </div>
  );
};

export default ClaimsSection;
