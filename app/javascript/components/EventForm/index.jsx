import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
// import './EventForm.css'; // Custom styles for enhanced design
import { fashionTags } from './tags'; // Importing fashion tags

export default function EventForm() {
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    eventDescription: "",
    eventImages: Array(5).fill(null),
    fashionTags: [] // New field for selected tags
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const sliderRef = useRef(null); // To control the slider

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleTagChange = (tagLabel) => {
    let updatedTags = [...formData.fashionTags];
    if (updatedTags.includes(tagLabel)) {
      updatedTags = updatedTags.filter((t) => t !== tagLabel); // Remove if already selected
    } else {
      updatedTags.push(tagLabel); // Add tag if not selected
    }
    setFormData({
      ...formData,
      fashionTags: updatedTags
    });
  };

  const handleImageChange = (e, index) => {
    const files = Array.from(e.target.files);
    const newImages = [...formData.eventImages];
    if (files[0]) {
      newImages[index] = files[0];
      setFormData({ ...formData, eventImages: newImages });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Handling Submit....");
    setIsSubmitted(true);
    sliderRef.current.slickNext();
    // Submit form data to Rails backend
  };

  const settings = {
    dots: false, 
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => setCurrentSlide(next), 
  };

  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="event-form-container max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="progress-indicator flex justify-between items-center mb-6">
        {['Launch Name', 'Launch Date', 'Launch Description', 'Fashion Tags', 'Upload Images', 'Review'].map((label, index) => (
          <div key={index} className={`step ${currentSlide >= index ? 'active' : ''}`}>
            <div className="step-indicator"></div>
            <p className="text-xs text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      <Slider {...settings} ref={sliderRef}>
        {/* Slide 1: Launch Name */}
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">Launch Name</h3>
          <p className="text-sm text-gray-500 mb-4">
            Get creative! Think of a name that stands out and captures the vibe of your launch.
          </p>
          <input
            type="text"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded"
            placeholder="Enter event name"
          />
          {/* Add Next Button */}
          <button 
            className="mt-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-4 rounded hover:opacity-90 transition-opacity duration-200"
            onClick={() => sliderRef.current.slickNext()}
          >
            Next
          </button>
        </div>

        {/* Slide 2: Launch Date */}
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">Launch Date</h3>
          <p className="text-sm text-gray-500 mb-4">
            Pick a date that aligns with the stars (or your perfect launch day).
          </p>
          <input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded"
          />
          {/* Add Next Button */}
          <button 
            className="mt-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-4 rounded hover:opacity-90 transition-opacity duration-200"
            onClick={() => sliderRef.current.slickNext()}
          >
            Next
          </button>
        </div>

        {/* Slide 3: Launch Description */}
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">Launch Description</h3>
          <p className="text-sm text-gray-500 mb-4">
            Let’s get descriptive! Share the magic behind your designs. Keep it fun and fabulous.
          </p>
          <textarea
            name="eventDescription"
            value={formData.eventDescription}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded"
            placeholder="Tell us about your event"
          />
          {/* Add Next Button */}
          <button 
            className="mt-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-4 rounded hover:opacity-90 transition-opacity duration-200"
            onClick={() => sliderRef.current.slickNext()}
          >
            Next
          </button>
        </div>

         {/* Slide 4: Select Fashion Tags */}
         <div className="p-4">
          <h3 className="text-xl font-bold mb-2">Select Fashion Tags</h3>
          <p className="text-sm text-gray-500 mb-4">
            Choose tags that best describe your designs. You can select multiple tags.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {fashionTags.map((tag) => (
              <button
                key={tag.label}
                onClick={() => handleTagChange(tag.label)}
                className={`border border-gray-300 p-2 rounded flex items-center justify-center ${
                  formData.fashionTags.includes(tag.label) ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                }`}
              >
                <span className="mr-2">{tag.emoji}</span>
                {tag.label}
              </button>
            ))}
          </div>
          <button 
            className="mt-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-4 rounded hover:opacity-90 transition-opacity duration-200"
            onClick={() => sliderRef.current.slickNext()}
          >
            Next
          </button>
        </div>

        {/* Slide 5: Upload Images */}
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">Upload Your Designs</h3>
          <p className="text-sm text-gray-500 mb-4">
            Show off your work! You can upload up to 5 images of your designs. Make them shine!
          </p>
          {/* Image Upload Grid */}
          <div className="image-upload-grid grid grid-cols-3 gap-4">
            {formData.eventImages.map((image, index) => (
              <div key={index} className="image-upload-box relative border-2 border-dashed border-gray-300 rounded-lg h-24 w-24 flex items-center justify-center cursor-pointer">
                <input
                  type="file"
                  onChange={(e) => handleImageChange(e, index)}
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Uploaded ${index + 1}`}
                    className="object-cover w-full h-full rounded-lg"
                  />
                ) : (
                  <span className="text-2xl text-gray-400">+</span>
                )}
              </div>
            ))}
          </div>
          {/* Add Next Button */}
          <button 
            className="mt-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-4 rounded hover:opacity-90 transition-opacity duration-200"
            onClick={() => sliderRef.current.slickNext()}
          >
            Next
          </button>
        </div>

        {/* Slide 6: Review and Submit */}
        <div className="p-4 flex flex-col items-center text-center">
          <div className="celebration-icon text-5xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold mb-4">You're Ready to Submit!</h3>
          <p className="text-sm text-gray-500 mb-4">
            Review the details of your launch and make sure everything is correct.
          </p>
          
          <div className="review-details text-left mb-6">
            <p><strong>Name:</strong> {formData.eventName}</p>
            <p><strong>Date:</strong> {formData.eventDate}</p>
            <p><strong>Description:</strong> {formData.eventDescription}</p>
            <p><strong>Tags:</strong> {formData.fashionTags.join(", ")}</p>
          </div>

          {formData.eventImages.length > 0 && (
            <div className="image-preview grid grid-cols-3 gap-2 mb-6">
              {formData.eventImages.filter(img => img).map((image, index) => (
                <div key={index} className="image-thumbnail">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-auto object-cover rounded"
                  />
                </div>
              ))}
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="mt-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-4 rounded hover:opacity-90 transition-opacity duration-200"
          >
            Submit
          </button>
        </div>

        {/* New Slide 7: Success Message */}
        {isSubmitted && (
          <div className="p-4 flex flex-col items-center text-center">
            <div className="celebration-icon text-5xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold mb-4">Your Event Has Launched!</h3>
            <p className="text-sm text-gray-500 mb-4">
              Congratulations! Your fashion launch event has been successfully created.
            </p>
            <button
              className="mt-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-4 rounded hover:opacity-90 transition-opacity duration-200"
              onClick={() => window.location.reload()} // Refresh page or redirect after submission
            >
              Back to Dashboard
            </button>
          </div>
        )}
      </Slider>
    </div>
  );
}
