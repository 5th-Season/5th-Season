module Api
  class CollectionsController < ApplicationController
    def index
      designer = Designer.find_by(username: params[:designer_username])
      
      unless designer
        render json: { error: "Designer not found" }, status: :not_found
        return
      end
      
      collections = designer.collections.order(year: :desc, created_at: :desc)
      
      render json: collections.map { |collection|
        {
          id: collection.id,
          title: collection.title,
          season: collection.season,
          year: collection.year,
          description: collection.description,
          status: collection.status,
          pieces_count: collection.designs.count,
          created_at: collection.created_at,
          updated_at: collection.updated_at
        }
      }
    end
    
    def show
      collection = Collection.find(params[:id])
      
      render json: {
        id: collection.id,
        title: collection.title,
        season: collection.season,
        year: collection.year,
        description: collection.description,
        status: collection.status,
        pieces_count: collection.designs.count,
        designs: collection.designs.map { |design|
          {
            id: design.id,
            title: design.title,
            description: design.description,
            materials: design.materials,
            dimensions: design.dimensions,
            status: design.status,
            featured: design.featured,
            image_url: design.image_url,
            created_at: design.created_at
          }
        },
        created_at: collection.created_at,
        updated_at: collection.updated_at
      }
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Collection not found" }, status: :not_found
    end
    
    def create
      designer = Designer.find_by(username: params[:designer_username])
      
      unless designer
        render json: { error: "Designer not found" }, status: :not_found
        return
      end
      
      collection = designer.collections.build(collection_params)
      
      if collection.save
        Rails.logger.info("Collection created successfully: #{collection.id}")
        render json: {
          id: collection.id,
          title: collection.title,
          season: collection.season,
          year: collection.year,
          description: collection.description,
          status: collection.status,
          pieces_count: 0,
          created_at: collection.created_at,
          updated_at: collection.updated_at
        }, status: :created
      else
        Rails.logger.error("Failed to create collection: #{collection.errors.full_messages.join(', ')}")
        render json: { 
          error: "Failed to create collection",
          details: collection.errors.full_messages 
        }, status: :unprocessable_entity
      end
    end
    
    def update
      collection = Collection.find(params[:id])
      
      if collection.update(collection_params)
        render json: {
          id: collection.id,
          title: collection.title,
          season: collection.season,
          year: collection.year,
          description: collection.description,
          status: collection.status,
          pieces_count: collection.designs.count,
          created_at: collection.created_at,
          updated_at: collection.updated_at
        }
      else
        render json: { 
          error: "Failed to update collection",
          details: collection.errors.full_messages 
        }, status: :unprocessable_entity
      end
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Collection not found" }, status: :not_found
    end
    
    def destroy
      collection = Collection.find(params[:id])
      
      if collection.destroy
        render json: { message: "Collection deleted successfully" }
      else
        render json: { error: "Failed to delete collection" }, status: :unprocessable_entity
      end
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Collection not found" }, status: :not_found
    end
    
    private
    
    def collection_params
      params.require(:collection).permit(:title, :season, :year, :description, :status)
    end
  end
end 