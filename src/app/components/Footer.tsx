import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-[#181818] border-t border-[#00000033] flex flex-col gap-[33px] pb-[35px]">
      <div className="container overflow-hidden flex flex-col gap-[24px]">
        <div className="flex items-center justify-center pt-[24px] gap-[24px]">
          <a href="/" className="w-[24px] h-[24px]">
            <img
              src="/assets/x.svg"
              className="w-full h-full"
              alt="x"
            />
          </a>
          <a href="/" className="w-[24px] h-[24px]">
            <img
              src="/assets/instagram.svg"
              className="w-full h-full"
              alt="instagram"
            />
          </a>
          <a href="/" className="w-[24px] h-[24px]">
            <img
              src="/assets/tiktok.svg"
              className="w-full h-full"
              alt="tiktok"
            />
          </a>
          <a href="/" className="w-[32px] h-[24px]">
            <img
              src="/assets/youtube.svg"
              className="w-full h-full"
              alt="youtube"
            />
          </a>
          <a href="/" className="w-[24px] h-[24px]">
            <img
              src="/assets/linkedin.svg"
              className="w-full h-full"
              alt="linkedin"
            />
          </a>
        </div>
        <div className="w-full flex text-sm">
          <ul className="text-[#181818] text-[16px] leading-[19.2px] list-none font-[400] flex flex-col justify-center items-center gap-[32px] text-center w-full">
            <li>
              <a
                href="#"
                className="inline-block hover:underline no-underline"
              >
                Report
              </a>
            </li>
            <li>
              <a
                href="#"
                className="inline-block hover:underline no-underline"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="inline-block hover:underline no-underline"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="#"
                className="inline-block hover:underline no-underline"
              >
                Admin
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="px-[15px] py-[24px] text-[#000000] text-[12px] leading-[16.8px] border-y border-[#00000033] text-center">
        <p>The primary goal of <span className="font-[700]">www.<span className="text-[#E31F1F]">missing</span>activists.org</span> is to raise awareness about
        the abductions of activists who speak out. These abductions are a
        blatant violation of the basic human right to free speech, a universally
        recognized concept. We invite you to join us in fighting for a better
        future and safeguarding the rights of activists worldwide. Together, we
        can create awareness and enhance the safety of activists across the
        globe. Please join our cause.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
