import React from "react";
import { ArrowLeft, Heart, MessageCircle, Share2, BookmarkSimple, Grid, Filter, Calendar, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

export default function CollectionView() {
  // Mock collection data
  const collection = {
    id: 1,
    title: "Airy Essentials",
    season: "Summer",
    year: 2025,
    description: "Lightweight linen pieces for warm days",
    designer: {
      name: "Aria Chen",
      image: "https://images.pexels.com/photos/7295645/pexels-photo-7295645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      username: "@AriaDesigns"
    },
    pieceCount: 15,
    status: "Ready to Ship"
  };

  // Mock designs/posts data
  const designs = [
    {
      id: 1,
      image: "https://images.pexels.com/photos/6069552/pexels-photo-6069552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Linen Wrap Top",
      likes: 245,
      comments: 32
    },
    {
      id: 2,
      image: "https://images.pexels.com/photos/6069765/pexels-photo-6069765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Summer Palazzo Pants",
      likes: 189,
      comments: 24
    },
    {
      id: 3,
      image: "https://images.pexels.com/photos/5699516/pexels-photo-5699516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Airy Linen Dress",
      likes: 312,
      comments: 47
    },
    {
      id: 4,
      image: "https://images.pexels.com/photos/5778899/pexels-photo-5778899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Breathable Cotton Shirt",
      likes: 178,
      comments: 18
    },
    {
      id: 5,
      image: "https://images.pexels.com/photos/5699516/pexels-photo-5699516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Relaxed Summer Shorts",
      likes: 201,
      comments: 29
    },
    {
      id: 6,
      image: "https://images.pexels.com/photos/5778899/pexels-photo-5778899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Organic Cotton Vest",
      likes: 166,
      comments: 21
    },
    {
      id: 7,
      image: "https://images.pexels.com/photos/6069552/pexels-photo-6069552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Linen Beach Cover",
      likes: 227,
      comments: 34
    },
    {
      id: 8,
      image: "https://images.pexels.com/photos/6069765/pexels-photo-6069765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Summer Scarf",
      likes: 152,
      comments: 17
    }
  ];

  // Featured designs for the highlights section
  const featuredDesigns = designs.slice(0, 5);

  return (
    <div className="bg-white min-h-screen">
      {/* Top navigation */}
      <header className="border-b sticky top-0 bg-white z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/profile" className="flex items-center gap-2 text-gray-800">
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Profile</span>
          </Link>
          <h1 className="font-semibold text-lg">{collection.title}</h1>
          <div className="w-8"></div> {/* Spacer for alignment */}
        </div>
      </header>

      {/* Collection header */}
      <div className="max-w-4xl mx-auto pt-6 px-4">
        <div className="flex items-center gap-4 mb-4">
          <img 
            src={collection.designer.image} 
            alt={collection.designer.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h2 className="font-semibold">{collection.designer.name}</h2>
            <p className="text-gray-500 text-sm">{collection.designer.username}</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-xl font-bold">{collection.title}</h1>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">{collection.status}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>{collection.season} '{collection.year.toString().substring(2)}</span>
            </div>
            <span>•</span>
            <span>{collection.pieceCount} pieces</span>
          </div>
          <p className="mt-2 text-gray-700">{collection.description}</p>
        </div>

        {/* Action buttons */}
        <div className="flex border-y py-2 mb-6">
          <button className="flex-1 flex justify-center items-center gap-1 py-2 text-gray-700">
            <Heart size={20} />
            <span className="text-sm">Save</span>
          </button>
          <button className="flex-1 flex justify-center items-center gap-1 py-2 text-gray-700">
            <MessageCircle size={20} />
            <span className="text-sm">Comment</span>
          </button>
          <button className="flex-1 flex justify-center items-center gap-1 py-2 text-gray-700">
            <Share2 size={20} />
            <span className="text-sm">Share</span>
          </button>
        </div>
      </div>

      {/* Highlights section */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <h3 className="font-semibold mb-3">Highlights</h3>
        <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar">
          {featuredDesigns.map(design => (
            <div key={design.id} className="flex-none w-28 md:w-32">
              <div className="aspect-square rounded-lg overflow-hidden mb-1">
                <img 
                  src={design.image} 
                  alt={design.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs truncate">{design.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Posts/Designs section */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Designs</h3>
          <div className="flex gap-2">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Grid size={20} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Filter size={20} />
            </button>
          </div>
        </div>
        
        {/* Grid of designs */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {designs.map(design => (
            <div key={design.id} className="overflow-hidden mb-4">
              <div className="aspect-square rounded-lg overflow-hidden mb-2">
                <img 
                  src={design.image} 
                  alt={design.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium">{design.title}</p>
                <button className="text-gray-500">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <div className="flex items-center gap-3 text-gray-500 text-xs">
                <div className="flex items-center gap-1">
                  <Heart size={14} />
                  <span>{design.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle size={14} />
                  <span>{design.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load more button */}
        <div className="text-center mt-4">
          <button className="text-blue-600 font-medium text-sm py-2 px-4 rounded-md hover:bg-blue-50">
            Load more...
          </button>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
