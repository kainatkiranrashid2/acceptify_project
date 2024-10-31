import { BiPhone } from "react-icons/bi";
import { FaTelegram } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="bg-white">
      <div
        className="p-4 bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url('/assets/footer/footer_bg.svg')`,
        }}>
        <div className="bg-white m-10 pt-16 pb-6">
          <div className="max-w-7xl mx-8 my-4 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Logo */}
              <div className="md:col-span-4">
                <img
                  src="/assets/footer/acceptify_icon.png"
                  alt="Logo"
                  className="h-14 w-14"
                />
              </div>

              {/* Information Section */}
              <div className="md:col-span-2">
                <h3 className="text-[12.47px]/[17.45px] font-Inter font-medium text-[#1B1819]  mb-4">
                  INFORMATION
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-[#1B1819] hover:text-gray-900">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-[#1B1819] hover:text-gray-900">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-[#1B1819] hover:text-gray-900">
                      Shipping and payment
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-[#1B1819] hover:text-gray-900">
                      Partners
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-[#1B1819] hover:text-gray-900">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-[#1B1819] hover:text-gray-900">
                      Contacts
                    </a>
                  </li>
                </ul>
              </div>

              {/* Menu Section */}
              <div className="md:col-span-2">
                <h3 className="text-sm text-gray-500 font-medium mb-4">
                  Devices
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-[#1B1819] hover:text-gray-900">
                      Device
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-[#1B1819] hover:text-gray-900">
                      Industries
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-[#1B1819] hover:text-gray-900">
                      POS Solution
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-[#1B1819] hover:text-gray-900">
                      Developer
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact Section */}
              <div className="md:col-span-4 flex flex-col items-start md:items-end">
                <button className="bg-purple-600 text-white px-6 py-2 rounded-lg mb-4 hover:bg-purple-700 transition-colors">
                  Get in touch
                </button>
                <div className="flex items-center gap-2 mb-2">
                  <BiPhone className="h-5 w-5 text-[#1B1819]" />
                  <a
                    href="tel:+19999999999"
                    className="text-[#1B1819] hover:text-gray-900">
                    +1 (999) 999-99-99
                  </a>
                </div>
                <a
                  href="mailto:info@example.com"
                  className="text-[#1B1819] hover:text-gray-900 text-sm">
                  info@example.com
                </a>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mt-16 pt-8 ">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="w-8 h-8 overflow-hidden rounded-full bg-[#1B1819] flex items-center justify-center hover:bg-gray-800 transition-colors cursor-pointer">
                  <FaWhatsapp className="w-5 h-5 text-white" />
                </div>

                <div className="w-8 h-8  rounded-full">
                  <FaTelegram className="w-full h-full" />
                </div>
              </div>
              <div className="flex items-center">
                {/* <span className="text-gray-600 text-sm">18+</span> */}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="m-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                If you didn find the products you are interested in or have
                questions?
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-white/80 text-sm">
                Just send us your contact email and we will contact you.
              </p>
              <div className="relative">
                <input
                  type="email"
                  placeholder="YOUR EMAIL"
                  className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Footer;
