import React from "react";
import { assets } from "../../assets/icons/assets";
import { footer_data } from "../../assets/icons/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-50 px-6 md:px-16 py-12 text-gray-700">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        
        <div className="max-w-md">
          <img src={assets.logo} alt="logo" className="w-32 sm:w-44" />
          <p className="max-w-[410px] mt-6 text-sm text-gray-600">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, nam aperiam cupiditate facilis molestias eveniet temporibus accusamus nesciunt porro ad.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-between w-full md:w-[55%] gap-8">
          {footer_data.map((section, index) => (
            <div key={index} className="min-w-[130px]">
              <h3 className="font-semibold text-base text-gray-900 mb-3">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="hover:underline transition-all text-gray-600"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 border-t pt-6 text-xs text-center text-gray-400">
        © 2025 YourBrand. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
