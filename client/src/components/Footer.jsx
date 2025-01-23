import React from "react";
import { assets } from "../assets/assets";
function Footer() {
  return (
    <div className="border-t-2 container px-4 2xl:px-30 mx-auto flex items-center justify-between gap-4 py-3 mt-20">
      <img width={160} src={assets.logo} alt="Main logo" />
      <p className="flex-1 border-1 border-gray-500 pl-4 text-sm text-gray-500 max-sm:hidden">
        Copyright |{" "}
        {
          <a href="https://github.com/n1shan1" target="_blank">
            @github.com/n1shan1
          </a>
        }{" "}
        | MIT License
      </p>
      <div className="flex gap-2.5 ">
        <img width={38} src={assets.facebook_icon} alt="logo" />
        <img width={38} src={assets.instagram_icon} alt="logo" />
        <img width={38} src={assets.twitter_icon} alt="logo" />
      </div>
    </div>
  );
}

export default Footer;
