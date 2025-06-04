class Api::OnboardingController < ApplicationController
  # Remove authentication requirement for simplified flow
  # before_action :require_login
  # before_action :check_existing_designer, except: [:complete, :designer_profile, :current_user_info]
  
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
  
  def personal_info
    session[:onboarding_data] ||= {}
    session[:onboarding_data]['first_name'] = params[:first_name]
    session[:onboarding_data]['last_name'] = params[:last_name]
    
    if params[:first_name].present? && params[:last_name].present?
      render json: { success: true }
    else
      render json: { error: "Please provide your first and last name" }, status: :unprocessable_entity
    end
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
    
    # Create designer directly without user association
    designer = Designer.new(
      username: session[:onboarding_data]['username'],
      brand_name: session[:onboarding_data]['brand_name'],
      brand_description: session[:onboarding_data]['brand_description'],
      location: session[:onboarding_data]['location'],
      verification_status: :pending,
      average_rating: 0.0
    )
    
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
    # Return empty data since we're not using user accounts
    render json: { 
      first_name: nil,
      last_name: nil,
      email: nil
    }
  end
  
  def designer_profile
    # This endpoint may not be needed in the simplified flow
    render json: { error: "Not implemented in simplified flow" }, status: :not_found
  end

  private
  
  # Remove authentication methods since we're not using them
  # def check_existing_designer
  #   if current_user.designer.present?
  #     render json: { error: "You already have a designer profile" }, status: :unprocessable_entity
  #   end
  # end
end
