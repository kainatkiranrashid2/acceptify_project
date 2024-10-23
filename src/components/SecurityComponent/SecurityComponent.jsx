const SecurityComponent = () => {
  const WhyLsaPayValues = [
    {
      id: 0,
      icon: {
        src: "/assets/why_choose_us/pci.png",
        alt: "pci",
      },
      heading: "Simplify Your PCI",
      details:
        "Whether you have iOS, Android, or Windows devices (Mobile or Tablet).",
    },
    {
      id: 1,
      icon: {
        src: "/assets/why_choose_us/offline.png",
        alt: "no_wifi_svg",
      },
      heading: "Online / Offline",
      details:
        "Whether you have iOS, Android, or Windows devices (Mobile or Tablet) ",
    },
    {
      id: 2,
      icon: {
        src: "/assets/why_choose_us/devices.png",
        alt: "online_svg",
      },
      heading: "iOS, Android or Windows",
      details:
        "Whether you have iOS, Android, or Windows devices (Mobile or Tablet), ",
    },
    {
      id: 3,
      icon: {
        src: "/assets/why_choose_us/accept_wristbands.png",
        alt: "Accept Wristbands",
      },
      heading: "Accept Wristbands",
      details:
        "Go Cardless. Issue RFID wristbands to your customers, and automatically assign a payment card improving revenue, checkout speed, customer loyalty and customer experience.",
    },

    {
      id: 4,
      icon: {
        src: "/assets/why_choose_us/accept_cards.png",
        alt: "Accept Cards/Wallets",
      },
      heading: "Accept Cards/Wallets",
      details:
        "Swipe, tap or insert. acceptify safely accepts electronic payments whether your customers choose credit cards or e-wallets to run transactions.  ",
    },
    {
      id: 5,
      icon: {
        src: "/assets/why_choose_us/configurable_data.png",
        alt: "guarantee_svg",
      },
      heading: "Configurable Data",
      details:
        "Add relevant, searchable data to each transaction. An order number, parking lot ID, flight number, event name – whatever is important to you and your customer.",
    },

    {
      id: 6,
      icon: {
        src: "/assets/why_choose_us/global_payments.png",
        alt: "database_svg",
      },
      heading: "Global Payments",
      details:
        "We are a true enterprise payment solution. We enable you to take local payments in nearly all worldwide currencies. Bring your own processors or we can help you select one.",
    },
    {
      id: 7,
      icon: {
        src: "/assets/why_choose_us/beautiful_branding.png",
        alt: "Beautiful Branding",
      },
      heading: "Beautiful Branding",
      details:
        "Represent your brand anywhere you take transactions. Brandable cases. Your Colors, Your logo.",
    },
    {
      id: 8,
      icon: {
        src: "/assets/why_choose_us/recapture_engine.png",
        alt: "Recapture Engine  ",
      },
      heading: "Recapture Engine",
      details:
        "We help you increase lost revenue from declined offline transactions. Our powerful recapture engine resubmits declined transactions until they are approved or expire.",
    },
  ];
  return (
    <div className="px-16 bg-white">
      <div className="w-[985px] p-4 rounded-lg mb-4 mx-auto">
        <h2 className="font-Inter font-bold text-center mb-2 mt-[246px] text-[55px]/[60.5px]">
          Protect your Customers and your Reputation with our P2PE Security.
        </h2>
        <p className="text-[21px]/[34.65px] font-Inter text-center">
          Acceptify enables your applications to accept worldwide,
          secure,certified, online/offline payments while removing all of your
          security concerns.
        </p>
      </div>
      <div className="w-[932px] mx-auto">
        <img
          src="/assets/security.png"
          alt="P2PE Security illustration"
          className="w-full h-auto rounded-lg"
        />
      </div>
    </div>
  );
};

export default SecurityComponent;
