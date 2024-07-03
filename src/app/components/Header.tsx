'use client'
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Assuming you have an AuthContext
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth(); // Use isLoggedIn and logout function from AuthContext
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function which handles clearing token and state
      toast.success("Logout Successful");
      toggleMenu();
      router.push('/'); // Redirect to home page using Next.js router
    } catch (error) {
      console.error('Logout error:', error);
      toast.error("Logout Failed");
    }
  };

  return (
    <nav className="bg-white sticky top-0 shadow-custom z-50">
      <div className="max-w-6xl mx-auto px-[15px]">
        <div className="flex justify-between h-[68px]">
          <div className="flex items-center text-[#000000]">
            <a href="/" className="flex font-[400] text-[16px] leading-[16px]">
              www.<span className="text-[#E31F1F] font-[700]">missing</span>
              activists.org
            </a>
          </div>

          {/* Mobile Button */}
          <div className="flex items-center">
            <button onClick={toggleMenu} className="mobile-menu-button">
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu absolute top-[68px] left-0 right-0 h-screen overflow-y-auto bg-white ${isMenuOpen ? '' : 'hidden'}`}
        style={{ minHeight: '100vh', zIndex: 999 }}
      >
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col gap-6 items-center justify-center w-auto text-[16px] font-[700] leading-[19.2px] text-[#181818]">
            <Link href="/" className="block rounded-md hover:underline" onClick={toggleMenu}>
              Home
            </Link>
            {isLoggedIn && (
              <>
                <Link href="/addperson" className="block rounded-md hover:underline" onClick={toggleMenu}>
                  Add Person
                </Link>
                <Link href="/editperson" className="block rounded-md hover:underline" onClick={toggleMenu}>
                  Edit Person
                </Link>
              </>
            )}
            <Link href="/" className="block rounded-md hover:underline" onClick={toggleMenu}>
              Report
            </Link>
            <Link href="/aboutus" className="block rounded-md hover:underline" onClick={toggleMenu}>
              About Us
            </Link>
            <Link href="/" className="block rounded-md hover:underline" onClick={toggleMenu}>
              Contact
            </Link>
            {isLoggedIn && (
              <button
                className="bg-[#E31F1F] text-[#ffffff] text-[14px] font-[700] leading-[19.6px] px-4 py-2 rounded-[5px] transition ease-out duration-300 hover:opacity-[0.8]"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>

          <div className="flex pt-[132px] items-center justify-center pt-4 gap-4">
            <a href="/" className="w-[24px] h-[24px]">
              <img src="/assets/x.svg" className="w-full h-full" alt="x" />
            </a>
            <a href="/" className="w-[24px] h-[24px]">
              <img src="/assets/instagram.svg" className="w-full h-full" alt="instagram" />
            </a>
            <a href="/" className="w-[24px] h-[24px]">
              <img src="/assets/tiktok.svg" className="w-full h-full" alt="tiktok" />
            </a>
            <a href="/" className="w-[32px] h-[24px]">
              <img src="/assets/youtube.svg" className="w-full h-full" alt="youtube" />
            </a>
            <a href="/" className="w-[24px] h-[24px]">
              <img src="/assets/linkedin.svg" className="w-full h-full" alt="linkedin" />
            </a>
          </div>
          <p className="text-center pt-[100px] text-[#181818] text-[16px] font-[700] leading-[16px]">
          www.<span className="text-[#E31F1F]">missing</span>activists.org
        </p>
        </div>
      </div>
    </nav>
  );
};

export default Header;
