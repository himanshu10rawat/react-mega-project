import { Link } from "react-router-dom";
import Logo from "../Logo";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden py-8 md:py-12 gradient-accent">
      <div className="relative z-10 mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div className="col-span-1">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo width="80px" className="md:w-24" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-white/80">
                  &copy; Copyright 2025. All Rights Reserved by DevUI.
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="h-full">
              <h3 className="tracking-px mb-4 md:mb-9 text-xs font-bold uppercase text-white/90">
                Company
              </h3>
              <ul className="space-y-2 md:space-y-4">
                <li>
                  <Link
                    className="text-xs md:text-base font-medium text-white/80 hover:text-white transition-colors duration-200"
                    to="/"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-xs md:text-base font-medium text-white/80 hover:text-white transition-colors duration-200"
                    to="/"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-xs md:text-base font-medium text-white/80 hover:text-white transition-colors duration-200"
                    to="/"
                  >
                    Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-xs md:text-base font-medium text-white/80 hover:text-white transition-colors duration-200"
                    to="/"
                  >
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-span-1">
            <div className="h-full">
              <h3 className="tracking-px mb-4 md:mb-9 text-xs font-bold uppercase text-white/90">
                Support
              </h3>
              <ul className="space-y-2 md:space-y-4">
                <li>
                  <Link
                    className="text-xs md:text-base font-medium text-white/80 hover:text-white transition-colors duration-200"
                    to="/"
                  >
                    Account
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-xs md:text-base font-medium text-white/80 hover:text-white transition-colors duration-200"
                    to="/"
                  >
                    Help
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-xs md:text-base font-medium text-white/80 hover:text-white transition-colors duration-200"
                    to="/"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-xs md:text-base font-medium text-white/80 hover:text-white transition-colors duration-200"
                    to="/"
                  >
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-span-1">
            <div className="h-full">
              <h3 className="tracking-px mb-4 md:mb-9 text-xs font-bold uppercase text-white/90">
                Legals
              </h3>
              <ul className="space-y-2 md:space-y-4">
                <li>
                  <Link
                    className="text-xs md:text-base font-medium text-white/80 hover:text-white transition-colors duration-200"
                    to="/"
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-xs md:text-base font-medium text-white/80 hover:text-white transition-colors duration-200"
                    to="/"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-xs md:text-base font-medium text-white/80 hover:text-white transition-colors duration-200"
                    to="/"
                  >
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
