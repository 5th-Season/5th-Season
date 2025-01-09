import React, { useEffect, useRef } from 'react'
import { designer1, designer2, designer3, designer4, designer5, designer6 } from '../../assets'

const Home = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += 1; // Adjust the value to control the scroll speed
      }
    }, 60); // Adjust the interval time to control the smoothness of the scroll

    return () => clearInterval(scrollInterval); // Cleanup the interval on component unmount
  }, []);

  return (
    <div>
      <div className="about-fashionista">
        <div className="asc-container">
          <h2><strong>The Future of Fashion Starts Here</strong></h2>
          <p>Welcome to the season where<br /> designers shine, new trends begin, and <br />all will discover their place in fashion.</p>
        </div>
      </div>

      <div className="fashionista-designers bg-white mt-8">
        <div ref={scrollRef} className="designer-lineup flex overflow-x-auto space-x-4 px-4 scrollbar-hide">
            <div className="flex-shrink-0 w-60 h-80 rounded-lg overflow-hidden shadow-md">
              <img src="https://images.pexels.com/photos/29811587/pexels-photo-29811587/free-photo-of-elegant-woman-with-curly-hair-posing-indoors.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Designer 1" />
            </div>

            <div className="flex-shrink-0 w-60 h-80 rounded-lg overflow-hidden shadow-md">
              <img src={`https://www.essence.com/wp-content/uploads/2022/07/GettyImages-1205845584-scaled.jpg`} alt="Designer 2" />
            </div>

            <div className="flex-shrink-0 w-60 h-80 rounded-lg overflow-hidden shadow-md">
              <img src={`https://www.essence.com/wp-content/uploads/2022/07/hEk5Kvec-8.png`} alt="Designer 3" />
            </div>

            <div className="flex-shrink-0 w-60 h-80 rounded-lg overflow-hidden shadow-md">
              <img src={`https://images.pexels.com/photos/3205989/pexels-photo-3205989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`} alt="Designer 4" />
            </div>

            <div className="flex-shrink-0 w-60 h-80 rounded-lg overflow-hidden shadow-md">
              <img src={`https://images.pexels.com/photos/8715778/pexels-photo-8715778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`} alt="Designer 5" />
            </div>

            <div className="flex-shrink-0 w-60 h-80 rounded-lg overflow-hidden shadow-md">
              <img src={`https://images.pexels.com/photos/26221665/pexels-photo-26221665/free-photo-of-portrait-of-man-wearing-suit.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`} alt="Designer 5" />
            </div>

            <div className="flex-shrink-0 w-60 h-80 rounded-lg overflow-hidden shadow-md">
              <img src={`https://images.pexels.com/photos/28579193/pexels-photo-28579193/free-photo-of-stylish-man-in-urban-setting-with-sunglasses.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`} alt="Designer 3" />
            </div>

            <div className="flex-shrink-0 w-60 h-80 rounded-lg overflow-hidden shadow-md">
              <img src={`https://images.pexels.com/photos/18192898/pexels-photo-18192898/free-photo-of-a-boy-s-portrait-in-white-attire.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`} alt="Designer 4" />
            </div>

            <div className="flex-shrink-0 w-60 h-80 rounded-lg overflow-hidden shadow-md">
              <img src={`https://images.unsplash.com/photo-1545291730-faff8ca1d4b0`} alt="Designer 5" />
            </div>
        </div>
      </div>

      <section class="flex flex-col items-center text-center py-12 px-4 max-w-5xl mx-auto">
        <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Empowering Designers, Defining the Future of Fashion</h1>
        <p class="text-lg text-gray-600 mb-8">
        Our mission is to transform how designers launch, grow, and thrive in the fashion industry.
        </p>

        <div class="w-full">
          <img src="https://images.pexels.com/photos/9850074/pexels-photo-9850074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" class="rounded-lg shadow-lg max-w-full h-auto" />
        </div>
      </section>

      <div className="fashionista-feature bg-white mt-8">
        <section class="flex flex-col lg:flex-row items-center lg:items-start bg-white p-6 lg:p-12 rounded-md shadow-lg max-w-7xl mx-auto mt-10">
          <div class="lg:w-1/2 p-4">
            <h2 class="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">What is Fifth Season?</h2>
            <p class="text-gray-700 leading-relaxed">
            Fashion has always been defined by four seasons—spring, summer, fall, and winter—but we’re here to introduce something new. Fifth Season is a fashion tech platform designed exclusively for designers ready to break the mold. Whether you're launching your first collection or growing an established brand, we’re here to help you showcase your work, grow your presence, and turn your vision into the next big trend.
            </p>
          </div>

          <div class="lg:w-1/2 p-4 flex justify-center">
            <img src="https://images.pexels.com/photos/1478477/pexels-photo-1478477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Diverse team meeting" class="rounded-md shadow-lg max-w-full h-auto" />
          </div>
        </section>
      </div>

      <div className="fashionista-feature bg-white mt-8">
        <section class="flex flex-col lg:flex-row items-center lg:items-start bg-white p-6 lg:p-12 rounded-md shadow-lg max-w-7xl mx-auto mt-10">
          <div class="lg:w-1/2 p-4 flex justify-center">
            <img src="https://images.pexels.com/photos/965324/pexels-photo-965324.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Diverse team meeting" class="rounded-md shadow-lg max-w-1/2 h-auto feature-image" />
          </div>
          <div class="lg:w-1/2 p-4">
            <h2 class="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">Connect, Collaborate, and Elevate</h2>
            <p class="text-gray-700 leading-relaxed">
            Success in fashion isn’t just about the designs—it’s about the connections. Our platform is the ultimate hub for collaboration, where designers, brands, and industry experts come together to innovate and inspire. Share ideas, co-create collections, and network with top talent in the industry. From partnerships to professional growth, we’re here to help you thrive in the fast-paced world of fashion. Together, we can shape the future of style.
            </p>
          </div>
        </section>
      </div>

      <div className="fashionista-feature bg-white mt-8">
        <section class="flex flex-col lg:flex-row items-center lg:items-start bg-white p-6 lg:p-12 rounded-md shadow-lg max-w-7xl mx-auto mt-10">
          <div class="lg:w-1/3 p-4 flex justify-center">
            <img src="/Create.png" />
          </div>
          <div class="lg:w-1/3 p-4 flex justify-center">
            <img src="/Launch.png" />
          </div>
          <div class="lg:w-1/3 p-4 flex justify-center">
            <img src="/Collab.png" />
          </div>
       </section>
      </div>
    </div>
    
  )
}

export default Home;
