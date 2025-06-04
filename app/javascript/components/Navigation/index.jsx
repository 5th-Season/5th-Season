import React, { useEffect, useRef, useState } from 'react'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);

  useEffect(() => {
    // Get the header height on mount
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Show sticky header when scrolled past the header height
      setIsScrolled(scrollY > headerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Call once on mount to set initial state
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headerHeight]);

  return (
    <>
      {/* Original Header - not sticky */}
      <header 
        ref={headerRef}
        className="flex items-center justify-between p-4 bg-white border-b"
      >
        <div className="flex items-center space-x-2">
            {/* <span className="font-bold text-lg">5th SEASON</span> */}
        </div>
        <nav className="flex space-x-4">
          <span className="font-bold text-lg">5th SEASON</span>
        </nav>

        <nav className="flex space-x-4">
        </nav>
      </header>

      {/* Sticky Header - shows when scrolled */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 bg-white border-b shadow-md ${
          isScrolled ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-lg">5th SEASON</span>
          </div>

          <div className="flex space-x-4">
            {/* Hidden login/signup buttons since we're using direct designer profile creation */}
            {/* 
            <a 
              href="/login" 
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
            >
              Log In
            </a>
            <a 
              href="/signup" 
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </a>
            */}
          </div>
        </div>
      </header>
    </>
  )
}

export default Navigation;