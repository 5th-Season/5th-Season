import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { MoreHorizontal, Archive, MapPin, MessageCircle, UserPlus, Camera, Scissors, ExternalLink, Award, Heart, Palette, Info, Users, Briefcase, Star, Plus, LogOut } from "lucide-react";
import CollectionForm from "./CollectionForm";
import DesignForm from "./DesignForm";

export default function DynamicProfileView() {
  const { username } = useParams();
  const [designer, setDesigner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCollectionForm, setShowCollectionForm] = useState(false);
  const [showDesignForm, setShowDesignForm] = useState(false);
  
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

  // Handle logout
  const handleLogout = () => {
    // Create a form to submit DELETE request to logout
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/logout';
    
    // Add method override for DELETE
    const methodInput = document.createElement('input');
    methodInput.type = 'hidden';
    methodInput.name = '_method';
    methodInput.value = 'DELETE';
    form.appendChild(methodInput);
    
    // Add CSRF token
    const csrfToken = document.querySelector('[name="csrf-token"]')?.content;
    if (csrfToken) {
      const csrfInput = document.createElement('input');
      csrfInput.type = 'hidden';
      csrfInput.name = 'authenticity_token';
      csrfInput.value = csrfToken;
      form.appendChild(csrfInput);
    }
    
    // Submit the form
    document.body.appendChild(form);
    form.submit();
  };

  // Handle collection creation
  const handleCollectionSubmit = (newCollection) => {
    // Refresh designer data or add the new collection to the current state
    setDesigner(prev => ({
      ...prev,
      collections: [newCollection, ...(prev.collections || [])]
    }));
  };

  // Handle design creation
  const handleDesignSubmit = (newDesign) => {
    // Refresh designer data or update the collections
    console.log("New design created:", newDesign);
    // You might want to refresh the designer data here
    fetchDesignerData();
  };

  // Fetch designer data when component mounts
  const fetchDesignerData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching designer data for username:', username);
      const response = await fetch(`/api/designers/${username}`);
      console.log('API Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Designer data received:', data);
      setDesigner(data);
    } catch (err) {
      console.error("Error fetching designer data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (username) {
      fetchDesignerData();
    }
  }, [username]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-2">Loading designer profile...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="text-red-500 text-xl mb-4">⚠️ Error loading profile</div>
        <p className="mb-4">{error}</p>
        <Link to="/" className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Return to Home
        </Link>
      </div>
    );
  }
  
  // Show 404 if designer not found
  if (!designer) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="text-xl mb-4">👔 Designer Not Found</div>
        <p className="mb-4">We couldn't find a designer with that username.</p>
        <Link to="/" className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Return to Home
        </Link>
      </div>
    );
  }

  // Check if this is the current user's own profile
  const isOwnProfile = designer.user && designer.user.is_current_user;

  return (
    <div className="bg-white min-h-screen">
      {/* Collection Form Modal */}
      <CollectionForm
        isOpen={showCollectionForm}
        onClose={() => setShowCollectionForm(false)}
        onSubmit={handleCollectionSubmit}
        designerUsername={designer.username}
      />

      {/* Design Form Modal */}
      <DesignForm
        isOpen={showDesignForm}
        onClose={() => setShowDesignForm(false)}
        onSubmit={handleDesignSubmit}
        designerUsername={designer.username}
      />

      {/* Log Out button - only show for own profile */}
      {isOwnProfile && (
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={handleLogout}
            className="bg-red-600 text-white font-medium px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-red-700 transition-colors"
          >
            <LogOut size={16} />
            Log Out
          </button>
        </div>
      )}

      {/* Profile header section */}
      <div className="max-w-4xl mx-auto pt-8 px-4">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Profile image */}
          <div className="relative">
            <div className="w-32 h-40 md:w-48 md:h-64 rounded-xl border-4 border-blue-500 p-1 overflow-hidden">
              {designer.profile_image_url ? (
                <img
                  src={designer.profile_image_url}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-blue-500 flex items-center justify-center">
                  <span className="text-white text-4xl md:text-6xl font-bold">
                    {designer.brand_name 
                      ? designer.brand_name.substring(0, 2).toUpperCase()
                      : designer.user?.first_name && designer.user?.last_name
                        ? (designer.user.first_name[0] + designer.user.last_name[0]).toUpperCase()
                        : "??"
                    }
                  </span>
                </div>
              )}
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
                <h1 className="text-xl font-semibold">{designer.brand_name || "Aria Chen"} ✨</h1>
                <div className="flex items-center text-gray-600 gap-1">
                  <MapPin size={14} />
                  <span className="text-sm">{designer.location || "New York, NY"}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-2">
                {designer.collaboration_preferences && designer.collaboration_preferences.length > 0 ? 
                  designer.collaboration_preferences.map((pref, index) => (
                    <span key={index} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                      {typeof pref === 'string' ? pref : pref.preference_type || pref.name || 'Collaboration'}
                    </span>
                  )) : (
                    <>
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">Luxury Streetwear</span>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Boutique Ready</span>
                      <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">Sustainable</span>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Slow Fashion</span>
                    </>
                  )
                }
              </div>
            </div>

            {/* Username */}
            <p className="text-gray-500 text-sm mb-2">@{designer.username || username || "AriaDesigns"} 👗</p>

            {/* Bio */}
            <p className="text-sm mb-4 max-w-md">
              {designer.brand_description || "Sustainable fashion designer with a focus on modern silhouettes and traditional techniques. Former @ParsonsFashion graduate creating clothes that tell stories."}
            </p>
            
            {/* Action buttons - only show for other people's profiles */}
            {!isOwnProfile && (
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
            )}

            {/* Edit Profile button - only show for own profile */}
            {isOwnProfile && (
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                <button className="bg-gray-200 text-gray-700 font-medium px-4 py-1.5 rounded-md text-sm flex items-center gap-1">
                  Edit Profile
                </button>
                <button 
                  onClick={() => setShowDesignForm(true)}
                  className="bg-green-600 text-white font-medium px-4 py-1.5 rounded-md text-sm flex items-center gap-1"
                >
                  <Plus size={16} />
                  Add Design
                </button>
              </div>
            )}

            {/* Stats */}
            <div className="flex justify-center md:justify-start gap-8 mb-6">
              <div className="text-center">
                <p className="font-semibold">{designer.designs ? designer.designs.length : 0}</p>
                <p className="text-xs text-gray-500">Designs</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">{designer.following_count || 0}</p>
                <p className="text-xs text-gray-500">Following</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">{designer.followers_count || 0}</p>
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
            {/* Only show Testimonials nav if there are testimonials */}
            {designer.testimonials && designer.testimonials.length > 0 && (
              <button 
                onClick={() => scrollToSection('testimonials')} 
                className="flex items-center gap-1.5 py-2 px-3 hover:bg-rose-50 rounded-md text-sm transition-colors"
              >
                <Star size={16} className="text-rose-600" />
                Testimonials 💬
              </button>
            )}
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
          {!isOwnProfile && <a href="#" className="text-blue-600 text-sm">View All</a>}
          {isOwnProfile && designer.collections && designer.collections.length > 0 && (
            <button 
              onClick={() => setShowCollectionForm(true)}
              className="text-blue-600 text-sm flex items-center gap-1 hover:text-blue-700"
            >
              <Plus size={16} />
              Create Collection
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {designer.collections && designer.collections.length > 0 ? (
            designer.collections.slice(0, 3).map((collection, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden border">
                <div className="aspect-video overflow-hidden relative">
                  <img 
                    src={collection.image_url || "https://images.pexels.com/photos/31982191/pexels-photo-31982191/free-photo-of-moody-portrait-of-a-woman-by-a-column.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} 
                    alt={collection.title || "Collection"} 
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-white text-xs px-2 py-1 rounded-full font-medium">{collection.season} '{collection.year ? collection.year.toString().substring(2) : "25"}</span>
                </div>
                <div className="p-3">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-medium">{collection.title || "Collection"}</h3>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                      {collection.status === 'published' ? 'Ready to Ship' : collection.status || 'Ready to Ship'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{collection.description || "Beautiful collection pieces"}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{collection.pieces_count || "0"} pieces</span>
                    <Link to={`/collection/${collection.id || "1"}`} className="text-blue-600 text-xs">Browse Collection →</Link>
                  </div>
                </div>
              </div>
            ))
          ) : isOwnProfile ? (
            // Show create collection prompt for own profile with no collections
            <div className="col-span-3 text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Plus className="text-blue-600" size={24} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Create your first collection</h3>
              <p className="text-gray-500 mb-4">Start showcasing your designs by organizing them into collections</p>
              <button 
                onClick={() => setShowCollectionForm(true)}
                className="bg-blue-600 text-white font-medium px-6 py-2 rounded-md text-sm flex items-center gap-2 mx-auto hover:bg-blue-700"
              >
                <Plus size={16} />
                Create Collection
              </button>
            </div>
          ) : (
            // Show sample collections for other people's profiles with no collections
            <>
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
                    <Link to="/collection/1" className="text-blue-600 text-xs">Browse Collection →</Link>
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
                    <Link to="/collection/2" className="text-blue-600 text-xs">Browse Collection →</Link>
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
                    <Link to="/collection/3" className="text-blue-600 text-xs">Browse Collection →</Link>
                  </div>
                </div>
              </div>
            </>
          )}
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
        
        {designer.collaboration_preferences && designer.collaboration_preferences.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {designer.collaboration_preferences.map((pref, index) => {
              // Map collaboration types to icons, descriptions, and unique colors
              const collabInfo = {
                manufacturing: {
                  icon: <Users className="text-blue-600" size={20} />,
                  title: "Manufacturing Partnerships",
                  description: "Open to working with manufacturers for production and scaling.",
                  bgColor: "bg-blue-50",
                  borderColor: "border-blue-100"
                },
                retail: {
                  icon: <ExternalLink className="text-green-600" size={20} />,
                  title: "Retail Partnerships", 
                  description: "Seeking boutiques and concept stores interested in stocking collections.",
                  bgColor: "bg-green-50",
                  borderColor: "border-green-100"
                },
                consultation: {
                  icon: <Info className="text-purple-600" size={20} />,
                  title: "Design Consultation",
                  description: "Available for design consultation and creative direction projects.",
                  bgColor: "bg-purple-50",
                  borderColor: "border-purple-100"
                },
                custom: {
                  icon: <Scissors className="text-amber-600" size={20} />,
                  title: "Custom Design Work",
                  description: "Accepting commissions for bespoke and custom design projects.",
                  bgColor: "bg-amber-50",
                  borderColor: "border-amber-100"
                },
                mentorship: {
                  icon: <Star className="text-rose-600" size={20} />,
                  title: "Mentorship",
                  description: "Open to mentoring emerging designers and sharing industry knowledge.",
                  bgColor: "bg-rose-50",
                  borderColor: "border-rose-100"
                }
              };

              const info = collabInfo[pref.preference_type] || {
                icon: <Users className="text-gray-600" size={20} />,
                title: `${pref.preference_type.charAt(0).toUpperCase() + pref.preference_type.slice(1)} Collaborations`,
                description: "Open to partnerships and collaborations.",
                bgColor: "bg-gray-50",
                borderColor: "border-gray-100"
              };

              return (
                <div key={index} className={`${info.bgColor} p-4 rounded-lg border ${info.borderColor}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {info.icon}
                    <h3 className="font-medium">{info.title}</h3>
                  </div>
                  <p className="text-sm text-gray-700">{info.description}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <Info className="text-gray-600" size={20} />
              <h3 className="font-medium">No Collaboration Preferences Set</h3>
            </div>
            <p className="text-sm text-gray-700">This designer hasn't specified what types of collaborations they're open to yet.</p>
          </div>
        )}
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

      {/* Testimonials Section - only show if there are testimonials */}
      {designer.testimonials && designer.testimonials.length > 0 && (
        <div id="testimonials" className="max-w-4xl mx-auto py-6 px-4 border-t">
          <h2 className="font-medium mb-4">Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {designer.testimonials.slice(0, 2).map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg border">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src={testimonial.author_image_url || "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <h3 className="font-medium text-sm">{testimonial.author}</h3>
                      <span className="text-xs text-gray-500">{testimonial.role}</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">"{testimonial.content}"</p>
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
            ))}
          </div>
        </div>
      )}

      {/* Latest Designs section */}
      <div id="latest-designs" className="max-w-4xl mx-auto py-6 px-4 border-t">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-medium">Latest Designs 🧵</h2>
          {designer.designs && designer.designs.length > 0 && (
            <button className="flex items-center gap-1 text-sm text-gray-500">
              <Archive size={16} />
              <span>Show archived</span>
            </button>
          )}
        </div>

        {designer.designs && designer.designs.length > 0 ? (
          <>
            {/* Grid of actual designs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {designer.designs.slice(0, 8).map((design, index) => (
                <div key={design.id || index} className="aspect-square overflow-hidden rounded-md border bg-gray-50 relative">
                  {design.image_url ? (
                    <img
                      src={design.image_url}
                      alt={design.title || `Design ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                      <Palette className="text-blue-500" size={24} />
                    </div>
                  )}
                  {design.title && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                      <span className="text-white text-xs font-medium">{design.title}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Load more button */}
            {designer.designs.length > 8 && (
              <div className="text-center mt-6">
                <button className="text-sm text-blue-600 font-medium">
                  View All Designs ({designer.designs.length})
                </button>
              </div>
            )}
          </>
        ) : isOwnProfile ? (
          // Show create design prompt for own profile with no designs
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="mx-auto w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <Plus className="text-indigo-600" size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Upload your first design</h3>
            <p className="text-gray-500 mb-4">Start building your portfolio by showcasing your creative work</p>
            <button 
              onClick={() => setShowDesignForm(true)}
              className="bg-indigo-600 text-white font-medium px-6 py-2 rounded-md text-sm flex items-center gap-2 mx-auto hover:bg-indigo-700"
            >
              <Plus size={16} />
              Add Design
            </button>
          </div>
        ) : (
          // Show empty state for other people's profiles with no designs
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <div className="mx-auto w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <Palette className="text-gray-400" size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No designs yet</h3>
            <p className="text-gray-500">This designer hasn't uploaded any designs to showcase</p>
          </div>
        )}
      </div>
    </div>
  );
}
