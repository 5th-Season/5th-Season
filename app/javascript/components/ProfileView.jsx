import React, { useRef } from "react";
import { MoreHorizontal, Archive, MapPin, MessageCircle, UserPlus, Camera, Scissors, ExternalLink, Award, Heart, Palette, Info, Users, Briefcase, Star } from "lucide-react";

export default function ProfileView() {
  // Add smooth scrolling behavior to the document
  React.useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);
  
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView();
    }
  };
  return (
    <div className="bg-white min-h-screen">
      {/* Profile header section */}
      <div className="max-w-4xl mx-auto pt-8 px-4">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Profile image */}
          <div className="relative">
            <div className="w-32 h-40 md:w-48 md:h-64 rounded-xl border-4 border-blue-500 p-1 overflow-hidden">
              <img
                src="https://images.pexels.com/photos/7295645/pexels-photo-7295645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-3 right-3 bg-gray-100 rounded-full p-1.5 shadow-md">
              <div className="bg-white rounded-full p-0.5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                  <circle cx="12" cy="13" r="4"></circle>
                </svg>
              </div>
            </div>
          </div>

          {/* Profile info */}
          <div className="flex-1 text-center md:text-left">
            {/* Name, location and brand tags */}
            <div className="mb-3">
              <div className="flex flex-col md:flex-row md:items-center gap-1 mb-1">
                <h1 className="text-xl font-semibold">Aria Chen ✨</h1>
                <div className="flex items-center text-gray-600 gap-1">
                  <MapPin size={14} />
                  <span className="text-sm">New York, NY</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-2">
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">Luxury Streetwear</span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Boutique Ready</span>
                <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">Sustainable</span>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Slow Fashion</span>
              </div>
            </div>

            {/* Username */}
            <p className="text-gray-500 text-sm mb-2">@AriaDesigns 👗</p>

            {/* Bio */}
            <p className="text-sm mb-4 max-w-md">
              Sustainable fashion designer with a focus on modern silhouettes and traditional techniques. Former @ParsonsFashion graduate creating clothes that tell stories.
            </p>
            
            {/* Action buttons */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
              <button className="bg-blue-600 text-white font-medium px-4 py-1.5 rounded-md text-sm flex items-center gap-1">
                <MessageCircle size={16} />
                Message
              </button>
              <button className="bg-purple-600 text-white font-medium px-4 py-1.5 rounded-md text-sm flex items-center gap-1">
                <UserPlus size={16} />
                Collaborate
              </button>
              <button className="bg-gray-200 text-gray-700 font-medium px-4 py-1.5 rounded-md text-sm flex items-center gap-1">
                Follow
              </button>
              <button className="p-1.5 rounded-md hover:bg-gray-100">
                <MoreHorizontal size={20} />
              </button>
            </div>

            {/* Stats */}
            <div className="flex justify-center md:justify-start gap-8 mb-6">
              <div className="text-center">
                <p className="font-semibold">162</p>
                <p className="text-xs text-gray-500">Designs</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">892</p>
                <p className="text-xs text-gray-500">Following</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">12,467</p>
                <p className="text-xs text-gray-500">Followers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section Navigation */}
        <div className="border-t mt-6">
          <div className="flex justify-center flex-wrap gap-6 py-2 px-2">
            <button 
              onClick={() => scrollToSection('collections')} 
              className="flex items-center gap-1.5 py-2 px-3 hover:bg-blue-50 rounded-md text-sm transition-colors"
            >
              <Briefcase size={16} className="text-blue-600" />
              Collections 👗
            </button>
            <button 
              onClick={() => scrollToSection('behind-the-brand')} 
              className="flex items-center gap-1.5 py-2 px-3 hover:bg-purple-50 rounded-md text-sm transition-colors"
            >
              <Info size={16} className="text-purple-600" />
              Behind the Brand ✨
            </button>
            <button 
              onClick={() => scrollToSection('open-to')} 
              className="flex items-center gap-1.5 py-2 px-3 hover:bg-green-50 rounded-md text-sm transition-colors"
            >
              <Scissors size={16} className="text-green-600" />
              Open To 🤝
            </button>
            <button 
              onClick={() => scrollToSection('featured-by')} 
              className="flex items-center gap-1.5 py-2 px-3 hover:bg-amber-50 rounded-md text-sm transition-colors"
            >
              <Award size={16} className="text-amber-600" />
              Featured By 🏆
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')} 
              className="flex items-center gap-1.5 py-2 px-3 hover:bg-rose-50 rounded-md text-sm transition-colors"
            >
              <Star size={16} className="text-rose-600" />
              Testimonials 💬
            </button>
            <button 
              onClick={() => scrollToSection('latest-designs')} 
              className="flex items-center gap-1.5 py-2 px-3 hover:bg-indigo-50 rounded-md text-sm transition-colors"
            >
              <Palette size={16} className="text-indigo-600" />
              Designs 🧵
            </button>
          </div>
        </div>
      </div>

      {/* Collections Section - Business-first format */}
      <div id="collections" className="max-w-4xl mx-auto py-6 px-4 border-t">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-medium">Collections</h2>
          <a href="#" className="text-blue-600 text-sm">View All</a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Summer Collection */}
          <div className="bg-white rounded-lg overflow-hidden border">
            <div className="aspect-video overflow-hidden relative">
              <img 
                src="https://images.pexels.com/photos/31982191/pexels-photo-31982191/free-photo-of-moody-portrait-of-a-woman-by-a-column.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Summer Collection" 
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 left-2 bg-white text-xs px-2 py-1 rounded-full font-medium">Summer '25</span>
            </div>
            <div className="p-3">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">Airy Essentials</h3>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">Ready to Ship</span>
              </div>
              <p className="text-xs text-gray-600 mb-2">Lightweight linen pieces for warm days</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">15 pieces</span>
                <a href="#" className="text-blue-600 text-xs">Browse Collection →</a>
              </div>
            </div>
          </div>
          
          {/* Spring Collection */}
          <div className="bg-white rounded-lg overflow-hidden border">
            <div className="aspect-video overflow-hidden relative">
              <img 
                src="https://images.pexels.com/photos/31977310/pexels-photo-31977310/free-photo-of-stylish-woman-in-white-shirt-outdoors.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Spring Collection" 
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 left-2 bg-white text-xs px-2 py-1 rounded-full font-medium">Spring '25</span>
            </div>
            <div className="p-3">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">Urban Bloom</h3>
                <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full">Wholesale - In Production</span>
              </div>
              <p className="text-xs text-gray-600 mb-2">Street styles with floral accents</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">12 pieces</span>
                <a href="#" className="text-blue-600 text-xs">Browse Collection →</a>
              </div>
            </div>
          </div>
          
          {/* Winter Collection */}
          <div className="bg-white rounded-lg overflow-hidden border">
            <div className="aspect-video overflow-hidden relative">
              <img 
                src="https://images.pexels.com/photos/2010922/pexels-photo-2010922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Winter Collection" 
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 left-2 bg-white text-xs px-2 py-1 rounded-full font-medium">Winter '24</span>
            </div>
            <div className="p-3">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">Cozy Structures</h3>
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">Boutique - Pre-Order</span>
              </div>
              <p className="text-xs text-gray-600 mb-2">Architectural inspired wool garments</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">8 pieces</span>
                <a href="#" className="text-blue-600 text-xs">Browse Collection →</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Behind the Brand Section */}
      <div id="behind-the-brand" className="max-w-4xl mx-auto py-6 px-4 border-t">
        <h2 className="font-medium mb-4">Behind the Brand</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="relative overflow-hidden rounded-lg aspect-square">
            <img
              src="https://images.pexels.com/photos/6069552/pexels-photo-6069552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Design Process"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
              <span className="text-white text-xs font-medium">Design Process</span>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg aspect-square">
            <img
              src="https://images.pexels.com/photos/6069765/pexels-photo-6069765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Fabric Selection"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
              <span className="text-white text-xs font-medium">Fabric Selection</span>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg aspect-square">
            <img
              src="https://images.pexels.com/photos/5699516/pexels-photo-5699516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Stylist Collaborations"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
              <span className="text-white text-xs font-medium">Stylist Collaborations</span>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg aspect-square">
            <img
              src="https://images.pexels.com/photos/5778899/pexels-photo-5778899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Pop-Up Events"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
              <span className="text-white text-xs font-medium">Pop-Up Events</span>
            </div>
          </div>
        </div>
      </div>

      {/* Open To Section */}
      <div id="open-to" className="max-w-4xl mx-auto py-6 px-4 border-t">
        <h2 className="font-medium mb-4">Open To</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <Camera className="text-blue-600" size={20} />
              <h3 className="font-medium">Photographer Partnerships</h3>
            </div>
            <p className="text-sm text-gray-700">Looking for editorial and lookbook photographers with experience in fashion storytelling.</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <div className="flex items-center gap-2 mb-2">
              <Scissors className="text-purple-600" size={20} />
              <h3 className="font-medium">Stylist Collaborations</h3>
            </div>
            <p className="text-sm text-gray-700">Interested in working with stylists for editorial features and special campaigns.</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="flex items-center gap-2 mb-2">
              <ExternalLink className="text-green-600" size={20} />
              <h3 className="font-medium">Retail Partnerships</h3>
            </div>
            <p className="text-sm text-gray-700">Seeking boutiques and concept stores interested in stocking our latest collections.</p>
          </div>
        </div>
      </div>

      {/* Featured By Section */}
      <div id="featured-by" className="max-w-4xl mx-auto py-6 px-4 border-t">
        <h2 className="font-medium mb-4">Featured By</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col items-center p-3 border rounded-lg">
            <Award className="text-amber-500 mb-2" size={24} />
            <h3 className="font-medium text-sm mb-1">Vogue.com</h3>
            <p className="text-xs text-gray-500 text-center">"Emerging Designers to Watch"</p>
          </div>
          <div className="flex flex-col items-center p-3 border rounded-lg">
            <Award className="text-amber-500 mb-2" size={24} />
            <h3 className="font-medium text-sm mb-1">Metropolitan Fashion Week</h3>
            <p className="text-xs text-gray-500 text-center">"Rising Star Award 2024"</p>
          </div>
          <div className="flex flex-col items-center p-3 border rounded-lg">
            <Award className="text-amber-500 mb-2" size={24} />
            <h3 className="font-medium text-sm mb-1">Elle Magazine</h3>
            <p className="text-xs text-gray-500 text-center">"Sustainable Fashion Feature"</p>
          </div>
          <div className="flex flex-col items-center p-3 border rounded-lg">
            <Award className="text-amber-500 mb-2" size={24} />
            <h3 className="font-medium text-sm mb-1">New York Fashion Council</h3>
            <p className="text-xs text-gray-500 text-center">"Grant Recipient 2023"</p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div id="testimonials" className="max-w-4xl mx-auto py-6 px-4 border-t">
        <h2 className="font-medium mb-4">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <img 
                  src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Elena Ross"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <h3 className="font-medium text-sm">Elena Ross</h3>
                  <span className="text-xs text-gray-500">Stylist</span>
                </div>
                <p className="text-sm text-gray-700 mb-2">"Aria's pieces are truly unique - they photograph beautifully and always draw attention on set. The quality and attention to detail make them perfect for editorial work."</p>
                <div className="flex text-amber-500">
                  <Heart size={14} fill="currentColor" />
                  <Heart size={14} fill="currentColor" />
                  <Heart size={14} fill="currentColor" />
                  <Heart size={14} fill="currentColor" />
                  <Heart size={14} fill="currentColor" />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <img 
                  src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Marcus Chen"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <h3 className="font-medium text-sm">Marcus Chen</h3>
                  <span className="text-xs text-gray-500">Boutique Owner</span>
                </div>
                <p className="text-sm text-gray-700 mb-2">"Our customers love Aria's sustainable approach and distinctive aesthetic. Her collections consistently sell out within weeks of arriving at our store."</p>
                <div className="flex text-amber-500">
                  <Heart size={14} fill="currentColor" />
                  <Heart size={14} fill="currentColor" />
                  <Heart size={14} fill="currentColor" />
                  <Heart size={14} fill="currentColor" />
                  <Heart size={14} fill="currentColor" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Designs section */}
      <div id="latest-designs" className="max-w-4xl mx-auto py-6 px-4 border-t">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-medium">Latest Designs 🧵</h2>
          <button className="flex items-center gap-1 text-sm text-gray-500">
            <Archive size={16} />
            <span>Show archived</span>
          </button>
        </div>

        {/* Grid of posts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="aspect-square overflow-hidden rounded-md border">
              <div
                className="w-full h-full bg-gray-200"
                alt={`Design ${index + 1}`}
              ></div>
            </div>
          ))}
        </div>

        {/* Load more button */}
        <div className="text-center mt-6">
          <button className="text-sm text-blue-600 font-medium">
            View All Designs
          </button>
        </div>
      </div>
    </div>
  );
}
