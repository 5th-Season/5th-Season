import React, { useEffect, useRef } from 'react'
import { designer1, designer2, designer3, designer4, designer5, designer6 } from '../../assets'

const Home = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += 1; // Adjust the value to control the scroll speed
      }
    }, 30); // Adjust the interval time to control the smoothness of the scroll

    return () => clearInterval(scrollInterval); // Cleanup the interval on component unmount
  }, []);

  return (
    <div>
      <div className="about-fashionista">
        <div className="asc-container">
          <h2><strong>Your fashion is worth more than pennies.</strong></h2>
          <p>The new way to collaborate and support your<br /> favorite fashion icons.</p>
        </div>
      </div>

      <div className="fashionista-designers bg-white mt-8">
        <div ref={scrollRef} className="designer-lineup flex overflow-x-auto space-x-4 px-4 scrollbar-hide">
            <div className="flex-shrink-0 w-60 h-80 rounded-lg overflow-hidden shadow-md">
              <img src={designer1} alt="Designer 1" />
            </div>

            <div className="flex-shrink-0 w-60 h-80 rounded-lg overflow-hidden shadow-md">
              <img src={designer2} alt="Designer 2" />
            </div>

            <div className="flex-shrink-0 w-60 h-80 rounded-lg overflow-hidden shadow-md">
              <img src={designer3} alt="Designer 3" />
            </div>

            <div className="flex-shrink-0 w-60 h-80 rounded-lg overflow-hidden shadow-md">
              <img src={designer4} alt="Designer 4" />
            </div>

            <div className="flex-shrink-0 w-60 h-80 rounded-lg overflow-hidden shadow-md">
              <img src={designer5} alt="Designer 5" />
            </div>

            <div className="flex-shrink-0 w-60 h-80 rounded-lg overflow-hidden shadow-md">
              <img src={designer6} alt="Designer 5" />
            </div>

            <div className="flex-shrink-0 w-60 h-80 rounded-lg overflow-hidden shadow-md">
              <img src={designer3} alt="Designer 3" />
            </div>

            <div className="flex-shrink-0 w-60 h-80 rounded-lg overflow-hidden shadow-md">
              <img src={designer4} alt="Designer 4" />
            </div>

            <div className="flex-shrink-0 w-60 h-80 rounded-lg overflow-hidden shadow-md">
              <img src={designer5} alt="Designer 5" />
            </div>
        </div>
      </div>
    </div>
  )
}

export default Home;
