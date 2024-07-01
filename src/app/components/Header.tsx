'use client'
import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white sticky top-0 shadow-custom z-10">
      <div className="max-w-6xl mx-auto px-[15px]">
        <div className="flex justify-between h-[68px]">
          <div className="flex items-center">
              <a href="/" className="flex font-[400] text-[16px] leading-[16px]">
                www.<span className="text-[#E31F1F] font-[700]">missing</span>activists.org
              </a>
          </div>

          {/* Mobile Button */}
          <div className="flex items-center">
            <button onClick={toggleMenu} className="mobile-menu-button">
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu absolute flex flex-col gap-[132px] items-center justify-center h-screen w-full bg-white ${isMenuOpen ? '' : 'hidden'}`}>
        <div className='flex flex-col gap-[40px] items-center justify-center w-auto text-[16px] font-[700] leading-[19.2px] text-[#181818]'>
          <Link href="/" className="block rounded-md hover:underline" onClick={toggleMenu}>Home</Link>
          <Link href="/" className="block rounded-md hover:underline" onClick={toggleMenu}>Report</Link>
          <Link href="/aboutus" className="block rounded-md hover:underline" onClick={toggleMenu}>About Us</Link>
          <Link href="/" className="block rounded-md hover:underline" onClick={toggleMenu}>Contact</Link>
        </div>

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

        <p className="text-[#181818] text-[16px] font-[700] leading-[16px]">www.<span className="text-[#E31F1F]">missing</span>activists.org</p>
        
      </div>
    </nav>
  );
};

export default Header;
