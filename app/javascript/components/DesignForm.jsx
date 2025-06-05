import React, { useState, useEffect } from "react";
import { X, Upload, Image, FileText, Tag, Palette } from "lucide-react";

export default function DesignForm({ isOpen, onClose, onSubmit, designerUsername, selectedCollectionId = null }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    collection_id: selectedCollectionId || "",
    materials: "",
    dimensions: "",
    status: "draft",
    featured: false
  });
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCollections, setIsLoadingCollections] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  // Load collections when form opens
  useEffect(() => {
    if (isOpen && designerUsername) {
      loadCollections();
    }
  }, [isOpen, designerUsername]);

  const loadCollections = async () => {
    setIsLoadingCollections(true);
    try {
      const response = await fetch(`/api/designers/${designerUsername}/collections`);
      if (response.ok) {
        const data = await response.json();
        setCollections(data);
      }
    } catch (error) {
      console.error("Error loading collections:", error);
    } finally {
      setIsLoadingCollections(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const formDataToSend = new FormData();
      
      // Add form fields
      Object.keys(formData).forEach(key => {
        formDataToSend.append(`design[${key}]`, formData[key]);
      });
      
      // Add image if selected
      if (imageFile) {
        formDataToSend.append('design[image]', imageFile);
      }
      
      formDataToSend.append('designer_username', designerUsername);

      const response = await fetch("/api/designs", {
        method: "POST",
        headers: {
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
        },
        body: formDataToSend
      });

      const result = await response.json();

      if (response.ok) {
        onSubmit(result);
        handleClose();
      } else {
        setError(result.error || "Failed to create design");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Error creating design:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      collection_id: selectedCollectionId || "",
      materials: "",
      dimensions: "",
      status: "draft",
      featured: false
    });
    setError("");
    setImagePreview(null);
    setImageFile(null);
    onClose();
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
          <h2 className="text-xl font-semibold">Add New Design</h2>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Image size={16} className="inline mr-1" />
              Design Image
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setImageFile(null);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer block text-center">
                  <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Click to upload design image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Design Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText size={16} className="inline mr-1" />
              Design Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="e.g., Midnight Blazer"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Collection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Tag size={16} className="inline mr-1" />
              Collection
            </label>
            {isLoadingCollections ? (
              <div className="text-sm text-gray-500">Loading collections...</div>
            ) : (
              <select
                value={formData.collection_id}
                onChange={(e) => handleChange("collection_id", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Collection</option>
                {collections.map(collection => (
                  <option key={collection.id} value={collection.id}>
                    {collection.title} ({collection.season} {collection.year})
                  </option>
                ))}
              </select>
            )}
            {collections.length === 0 && !isLoadingCollections && (
              <p className="text-sm text-gray-500 mt-1">
                No collections found. Create a collection first.
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Describe the design, inspiration, or details..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Materials and Dimensions */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Palette size={16} className="inline mr-1" />
                Materials
              </label>
              <input
                type="text"
                value={formData.materials}
                onChange={(e) => handleChange("materials", e.target.value)}
                placeholder="e.g., Wool, Cotton, Silk"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dimensions/Size
              </label>
              <input
                type="text"
                value={formData.dimensions}
                onChange={(e) => handleChange("dimensions", e.target.value)}
                placeholder="e.g., S, M, L or Custom"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Status and Featured */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleChange("status", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div className="flex items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => handleChange("featured", e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Featured Design</span>
              </label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !formData.title || !formData.collection_id}
              className={`flex-1 px-4 py-2 rounded-lg text-white font-medium ${
                isLoading || !formData.title || !formData.collection_id
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isLoading ? "Adding..." : "Add Design"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 