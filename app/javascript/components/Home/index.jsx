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

      <section class="flex flex-col items-center text-center py-12 px-4 max-w-5xl mx-auto">
        <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Empowering Designers, Defining the Future of Fashion</h1>
        <p class="text-lg text-gray-600 mb-8">
        Our mission is to transform how designers launch, grow, and thrive in the fashion industry.
        </p>

        <div class="w-full">
          <img src="/path/to/your/image.png" alt="" class="rounded-lg shadow-lg max-w-full h-auto" />
        </div>
      </section>

      <div className="fashionista-feature bg-white mt-8">
        <section class="flex flex-col lg:flex-row items-center lg:items-start bg-white p-6 lg:p-12 rounded-md shadow-lg max-w-7xl mx-auto mt-10">
          <div class="lg:w-1/2 p-4">
            <h2 class="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">Turn Your Vision Into Reality</h2>
            <p class="text-gray-700 leading-relaxed">
              Unleash your creative potential with our fashion tech platform designed exclusively for fashion designers. Whether you're launching your first collection or an established brand, we provide the tools to create, showcase, and grow your fashion empire. Simplify the process, from ideation to launch, and bring your designs to life with our intuitive tools and industry-leading resources. It’s time to transform your vision into the next big trend.
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
    </div>
  )
}

export default Home;
