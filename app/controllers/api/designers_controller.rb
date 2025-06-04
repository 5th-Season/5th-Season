module Api
  class DesignersController < ApplicationController
    def show
      # Find designer by username from the URL
      designer = Designer.find_by(username: params[:id])
      
      # If not found, return 404
      unless designer
        render json: { error: "Designer not found" }, status: :not_found
        return
      end
      
      # Add a flag to indicate if the current user is viewing their own profile
      # Since user association is optional, handle cases where there's no user
      is_current_user = current_user && designer.user && current_user.id == designer.user_id
      
      # Prepare user data for the response - handle optional user association
      user_data = if designer.user
        {
          first_name: designer.user.first_name,
          last_name: designer.user.last_name,
          email: designer.user.email,
          is_current_user: is_current_user
        }
      else
        # For designers created without user accounts, create minimal user data
        {
          first_name: nil,
          last_name: nil,
          email: nil,
          is_current_user: false
        }
      end
      
      # Prepare collaboration preferences
      collaboration_preferences = designer.collaboration_preferences.map do |pref|
        {
          id: pref.id,
          preference_type: pref.preference_type,
          is_active: pref.is_active
        }
      end
      
      # Prepare collections data
      collections = designer.collections.map do |collection|
        {
          id: collection.id,
          title: collection.title,
          description: collection.description,
          season: collection.season,
          year: collection.year,
          status: collection.status,
          pieces_count: collection.designs.count,
          created_at: collection.created_at,
          updated_at: collection.updated_at
        }
      end
      
      # Build the response object
      response = {
        id: designer.id,
        brand_name: designer.brand_name,
        brand_description: designer.brand_description,
        location: designer.location,
        verification_status: designer.verification_status,
        average_rating: designer.average_rating,
        slug: designer.slug,
        username: designer.username,  # Include username in response
        user: user_data,
        collaboration_preferences: collaboration_preferences,
        collections: collections,
        created_at: designer.created_at,
        updated_at: designer.updated_at
      }
      
      render json: response
    end
  end
end
