class Api::OnboardingController < ApplicationController
  before_action :require_login
  before_action :check_existing_designer, except: [:complete, :designer_profile, :current_user_info]
  
  def username
    session[:onboarding_data] = {}
    session[:onboarding_data]['username'] = params[:username]
    
    # Check if username is already taken
    if Designer.exists?(username: params[:username])
      render json: { error: "Username is already taken. Please choose another one." }, status: :unprocessable_entity
      return
    end
    
    Rails.logger.info("[API] Starting onboarding with username='#{params[:username]}'")
    render json: { success: true }
  end
  
  def product_type
    session[:onboarding_data] ||= {}
    session[:onboarding_data]['product_type'] = params[:product_type]
    
    Rails.logger.info("[API] Product type saved: '#{params[:product_type]}'")
    render json: { success: true }
  end
  
  def production_style
    session[:onboarding_data] ||= {}
    session[:onboarding_data]['production_styles'] = params[:production_styles] || []
    
    Rails.logger.info("[API] Production styles saved: #{params[:production_styles]}")
    render json: { success: true }
  end
  
  def designer_role
    session[:onboarding_data] ||= {}
    session[:onboarding_data]['designer_role'] = params[:designer_role]
    
    Rails.logger.info("[API] Designer role saved: '#{params[:designer_role]}'")
    render json: { success: true }
  end
  
  def brand_attributes
    session[:onboarding_data] ||= {}
    session[:onboarding_data]['brand_attributes'] = params[:brand_attributes] || []
    
    Rails.logger.info("[API] Brand attributes saved: #{params[:brand_attributes]}")
    render json: { success: true }
  end
  
  def brand_info
    session[:onboarding_data] ||= {}
    session[:onboarding_data]['brand_name'] = params[:brand_name]
    session[:onboarding_data]['brand_description'] = params[:brand_description]
    
    Rails.logger.info("[API] Brand info saved")
    render json: { success: true }
  end
  
  def location
    session[:onboarding_data] ||= {}
    session[:onboarding_data]['location'] = params[:location]
    
    Rails.logger.info("[API] Location saved")
    render json: { success: true }
  end
  
  def collaboration
    Rails.logger.info("[API] Starting collaboration step")
    session[:onboarding_data] ||= {}
    session[:onboarding_data]['collaboration_preferences'] = params[:collaboration_preferences] || []
    
    Rails.logger.info("Creating designer with data: #{session[:onboarding_data].inspect}")
    
    # Create designer associated with current user
    designer = current_user.build_designer(
      username: session[:onboarding_data]['username'],
      brand_name: session[:onboarding_data]['brand_name'],
      brand_description: session[:onboarding_data]['brand_description'],
      location: session[:onboarding_data]['location'],
      verification_status: :pending,
      average_rating: 0.0
    )
    
    # Add new fields if we need to store them directly on designer
    # For now, we'll store them as JSON in additional fields or create separate models
    
    if designer.save
      Rails.logger.info("Designer profile saved successfully with ID: #{designer.id}")
      
      # Create collaboration preferences
      if session[:onboarding_data]['collaboration_preferences'].present?
        session[:onboarding_data]['collaboration_preferences'].each do |pref_type|
          designer.collaboration_preferences.create(
            preference_type: pref_type,
            is_active: true
          )
        end
      end
      
      # Store additional onboarding data in the session for now
      # In a production app, you might want to create additional models or fields
      Rails.logger.info("Additional data collected:")
      Rails.logger.info("- Product type: #{session[:onboarding_data]['product_type']}")
      Rails.logger.info("- Production styles: #{session[:onboarding_data]['production_styles']}")
      Rails.logger.info("- Designer role: #{session[:onboarding_data]['designer_role']}")
      Rails.logger.info("- Brand attributes: #{session[:onboarding_data]['brand_attributes']}")
      
      # Clear session data
      session.delete(:onboarding_data)
      
      render json: { 
        success: true, 
        designer_id: designer.id,
        username: designer.username 
      }
    else
      Rails.logger.error("Failed to save designer: #{designer.errors.full_messages.join(', ')}")
      render json: { 
        error: "There was an issue creating your designer profile: #{designer.errors.full_messages.join(', ')}" 
      }, status: :unprocessable_entity
    end
  end
  
  def current_user_info
    # Return current user data if logged in
    if current_user
      render json: { 
        first_name: current_user.first_name,
        last_name: current_user.last_name,
        email: current_user.email,
        username: current_user.username
      }
    else
      render json: { 
        first_name: nil,
        last_name: nil,
        email: nil,
        username: nil
      }
    end
  end
  
  def designer_profile
    # This endpoint may not be needed in the simplified flow
    render json: { error: "Not implemented in simplified flow" }, status: :not_found
  end

  private
  
  def require_login
    unless current_user
      render json: { error: "You must be logged in to access this section" }, status: :unauthorized
    end
  end
  
  def check_existing_designer
    if current_user&.designer.present?
      render json: { error: "You already have a designer profile" }, status: :unprocessable_entity
    end
  end
end
