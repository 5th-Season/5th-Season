import React from "react";
import { MoreHorizontal, Archive } from "lucide-react";

export default function ProfileView() {
  return (
    <div className="bg-white min-h-screen">
      {/* Profile header section */}
      <div className="max-w-4xl mx-auto pt-8 px-4">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Profile image */}
          <div className="relative">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-blue-500 p-1">
              <img
                src="https://images.pexels.com/photos/7295645/pexels-photo-7295645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 bg-gray-100 rounded-full p-1">
              <div className="bg-white rounded-full p-0.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                  <circle cx="12" cy="13" r="4"></circle>
                </svg>
              </div>
            </div>
          </div>

          {/* Profile info */}
          <div className="flex-1 text-center md:text-left">
            {/* Name and buttons */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
              <h1 className="text-xl font-semibold">Aria Chen ✨</h1>
              <div className="flex gap-2 justify-center md:justify-start items-center ml-0 md:ml-auto">
                <button className="bg-blue-100 text-blue-600 font-medium px-4 py-1.5 rounded-md text-sm">Unfollow</button>
                <button className="bg-blue-600 text-white font-medium px-4 py-1.5 rounded-md text-sm">Message</button>
                <button className="p-1.5 rounded-md hover:bg-gray-100">
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>

            {/* Username */}
            <p className="text-gray-500 text-sm mb-2">@AriaDesigns 👗</p>

            {/* Bio */}
            <p className="text-sm mb-4 max-w-md">
              🧵 Sustainable fashion designer based in NYC. 🌱 Blending modern silhouettes with traditional techniques. 👚 Fall '25 collection coming soon! 🎨 Former @ParsonsFashion graduate. 🌍 Creating clothes that tell stories. ✂️ DM for collab inquiries.
            </p>

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

        {/* Tabs */}
        <div className="border-t mt-6">
          <div className="flex justify-center gap-8">
            <button className="flex items-center gap-1.5 py-3 border-t-2 border-black font-medium text-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
              </svg>
              Designs
            </button>
            <button className="flex items-center gap-1.5 py-3 text-gray-500 text-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="23 7 16 12 23 17 23 7"></polygon>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
              </svg>
              Runway 👠
            </button>
            <button className="flex items-center gap-1.5 py-3 text-gray-500 text-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                <line x1="7" y1="7" x2="7.01" y2="7"></line>
              </svg>
              Features 📰
            </button>
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="max-w-4xl mx-auto py-4 px-4">
        <h2 className="font-medium text-sm mb-4">Collections 👗</h2>
        <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar">
          {/* First three items with custom images */}
          <div className="flex-shrink-0 w-20">
            <div className="aspect-square rounded-md overflow-hidden mb-1">
              <img 
                src="https://images.pexels.com/photos/31982191/pexels-photo-31982191/free-photo-of-moody-portrait-of-a-woman-by-a-column.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Summer Collection" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs text-center">Summer</p>
          </div>
          <div className="flex-shrink-0 w-20">
            <div className="aspect-square rounded-md overflow-hidden mb-1">
              <img 
                src="https://images.pexels.com/photos/31977310/pexels-photo-31977310/free-photo-of-stylish-woman-in-white-shirt-outdoors.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Spring Collection" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs text-center">Spring</p>
          </div>
          <div className="flex-shrink-0 w-20">
            <div className="aspect-square rounded-md overflow-hidden mb-1">
              <img 
                src="https://images.pexels.com/photos/2010922/pexels-photo-2010922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Winter Collection" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs text-center">Winter</p>
          </div>
          {/* Additional items with gray background */}
          {[4, 5].map((item) => (
            <div key={item} className="flex-shrink-0 w-20">
              <div className="aspect-square rounded-md overflow-hidden mb-1">
                <div 
                  className="w-full h-full bg-gray-200"
                ></div>
              </div>
              <p className="text-xs text-center">Coming Soon</p>
            </div>
          ))}
        </div>
      </div>

      {/* Posts section */}
      <div className="max-w-4xl mx-auto py-4 px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-medium text-sm">Latest Designs 🧵</h2>
          <button className="flex items-center gap-1 text-sm text-gray-500">
            <Archive size={16} />
            <span>Show archived</span>
          </button>
        </div>

        {/* Grid of posts */}
        <div className="grid grid-cols-3 gap-1">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="aspect-square overflow-hidden">
              <div
                className="w-full h-full bg-gray-200"
                alt={`Post ${index + 1}`}
              ></div>
            </div>
          ))}
        </div>

        {/* Load more button */}
        <div className="text-center mt-6">
          <button className="text-sm text-gray-500">
            Load more...
          </button>
        </div>
      </div>
    </div>
  );
}
