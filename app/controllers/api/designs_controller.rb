module Api
  class DesignsController < ApplicationController
    def index
      if params[:collection_id]
        collection = Collection.find(params[:collection_id])
        designs = collection.designs.order(created_at: :desc)
      elsif params[:designer_username]
        designer = Designer.find_by(username: params[:designer_username])
        unless designer
          render json: { error: "Designer not found" }, status: :not_found
          return
        end
        designs = Design.joins(collection: :designer)
                        .where(collections: { designer: designer })
                        .order(created_at: :desc)
      else
        render json: { error: "Missing collection_id or designer_username parameter" }, status: :bad_request
        return
      end
      
      render json: designs.map { |design|
        {
          id: design.id,
          title: design.title,
          description: design.description,
          materials: design.materials,
          dimensions: design.dimensions,
          status: design.status,
          featured: design.featured,
          image_url: design.image_url,
          collection: {
            id: design.collection.id,
            title: design.collection.title,
            season: design.collection.season,
            year: design.collection.year
          },
          created_at: design.created_at,
          updated_at: design.updated_at
        }
      }
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Collection not found" }, status: :not_found
    end
    
    def show
      design = Design.find(params[:id])
      
      render json: {
        id: design.id,
        title: design.title,
        description: design.description,
        materials: design.materials,
        dimensions: design.dimensions,
        status: design.status,
        featured: design.featured,
        image_url: design.image_url,
        collection: {
          id: design.collection.id,
          title: design.collection.title,
          season: design.collection.season,
          year: design.collection.year
        },
        designer: {
          id: design.designer.id,
          brand_name: design.designer.brand_name,
          username: design.designer.username
        },
        created_at: design.created_at,
        updated_at: design.updated_at
      }
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Design not found" }, status: :not_found
    end
    
    def create
      # Find the collection first
      collection = Collection.find(params[:design][:collection_id])
      
      # Verify the designer owns this collection (if designer_username is provided)
      if params[:designer_username]
        designer = Designer.find_by(username: params[:designer_username])
        unless designer && collection.designer == designer
          render json: { error: "Unauthorized: Collection does not belong to this designer" }, status: :forbidden
          return
        end
      end
      
      design = collection.designs.build(design_params)
      
      # Handle image upload if present
      if params[:design][:image].present?
        # For now, we'll store the image as a data URL or handle file upload
        # In a real app, you'd want to use Active Storage or similar
        design.image_url = handle_image_upload(params[:design][:image])
      end
      
      if design.save
        Rails.logger.info("Design created successfully: #{design.id}")
        render json: {
          id: design.id,
          title: design.title,
          description: design.description,
          materials: design.materials,
          dimensions: design.dimensions,
          status: design.status,
          featured: design.featured,
          image_url: design.image_url,
          collection: {
            id: design.collection.id,
            title: design.collection.title,
            season: design.collection.season,
            year: design.collection.year
          },
          created_at: design.created_at,
          updated_at: design.updated_at
        }, status: :created
      else
        Rails.logger.error("Failed to create design: #{design.errors.full_messages.join(', ')}")
        render json: { 
          error: "Failed to create design",
          details: design.errors.full_messages 
        }, status: :unprocessable_entity
      end
    rescue ActiveRecord::RecordNotFound => e
      if e.model == "Collection"
        render json: { error: "Collection not found" }, status: :not_found
      else
        render json: { error: "Designer not found" }, status: :not_found
      end
    end
    
    def update
      design = Design.find(params[:id])
      
      # Handle image upload if present
      if params[:design][:image].present?
        design.image_url = handle_image_upload(params[:design][:image])
      end
      
      if design.update(design_params)
        render json: {
          id: design.id,
          title: design.title,
          description: design.description,
          materials: design.materials,
          dimensions: design.dimensions,
          status: design.status,
          featured: design.featured,
          image_url: design.image_url,
          collection: {
            id: design.collection.id,
            title: design.collection.title,
            season: design.collection.season,
            year: design.collection.year
          },
          created_at: design.created_at,
          updated_at: design.updated_at
        }
      else
        render json: { 
          error: "Failed to update design",
          details: design.errors.full_messages 
        }, status: :unprocessable_entity
      end
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Design not found" }, status: :not_found
    end
    
    def destroy
      design = Design.find(params[:id])
      
      if design.destroy
        render json: { message: "Design deleted successfully" }
      else
        render json: { error: "Failed to delete design" }, status: :unprocessable_entity
      end
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Design not found" }, status: :not_found
    end
    
    private
    
    def design_params
      params.require(:design).permit(:title, :description, :materials, :dimensions, :status, :featured)
    end
    
    def handle_image_upload(image_file)
      # This is a simplified image handling
      # In production, you'd want to use Active Storage, Cloudinary, or similar
      
      # For now, we'll just return a placeholder or handle basic file upload
      # You might want to store files in public/uploads or use a cloud service
      
      if image_file.respond_to?(:tempfile)
        # Handle file upload - save to public/uploads directory
        filename = "#{SecureRandom.uuid}_#{image_file.original_filename}"
        filepath = Rails.root.join('public', 'uploads', filename)
        
        # Create uploads directory if it doesn't exist
        FileUtils.mkdir_p(File.dirname(filepath))
        
        # Save the file
        File.open(filepath, 'wb') do |file|
          file.write(image_file.read)
        end
        
        # Return the public URL
        "/uploads/#{filename}"
      else
        # Return placeholder or existing URL
        image_file.to_s
      end
    rescue => e
      Rails.logger.error("Error handling image upload: #{e.message}")
      nil
    end
  end
end 