class OnboardingController < ApplicationController
  before_action :require_login
  before_action :check_existing_designer, except: [:complete]
  
  def start
    session[:onboarding_data] = {}
    render :username  # Start with username instead of product_type
  end
  
  def username
    if request.post?
      session[:onboarding_data] ||= {}
      session[:onboarding_data][:username] = params[:username]
      
      # Check if username is already taken
      if Designer.exists?(username: params[:username])
        flash.now[:error] = "Username is already taken. Please choose another one."
        render :username
        return
      end
      
      redirect_to onboarding_product_type_path
    end
  end
  
  def product_type
    if request.post?
      session[:onboarding_data] ||= {}
      session[:onboarding_data][:product_type] = params[:product_type]
      redirect_to onboarding_personal_info_path
    end
  end
  
  def personal_info
    if request.post?
      session[:onboarding_data] ||= {}
      
      # Store first and last name in session
      session[:onboarding_data][:first_name] = params[:first_name]
      session[:onboarding_data][:last_name] = params[:last_name]
      
      if params[:first_name].present? && params[:last_name].present?
        redirect_to onboarding_brand_info_path
      else
        flash.now[:error] = "Please provide your first and last name"
        render :personal_info
      end
    end
  end
  
  def brand_info
    if request.post?
      session[:onboarding_data] ||= {}
      session[:onboarding_data][:brand_name] = params[:brand_name]
      session[:onboarding_data][:brand_description] = params[:brand_description]
      
      redirect_to onboarding_location_path
    end
  end
  
  def location
    if request.post?
      session[:onboarding_data] ||= {}
      session[:onboarding_data][:location] = params[:location]
      
      redirect_to onboarding_collaboration_path
    end
  end
  
  def collaboration
    if request.post?
      session[:onboarding_data] ||= {}
      session[:onboarding_data]['collaboration_preferences'] = params[:collaboration_preferences] || []
      
      Rails.logger.info("Creating designer with data: #{session[:onboarding_data].inspect}")
      
      # Create designer associated with current user
      designer = current_user.build_designer(
        username: session[:onboarding_data][:username],
        brand_name: session[:onboarding_data][:brand_name],
        brand_description: session[:onboarding_data][:brand_description],
        location: session[:onboarding_data][:location],
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
        
        redirect_to onboarding_complete_path(designer_id: designer.id)
      else
        Rails.logger.error("Failed to save designer: #{designer.errors.full_messages.join(', ')}")
        flash[:error] = "There was an issue creating your designer profile: #{designer.errors.full_messages.join(', ')}"
        redirect_to onboarding_start_path
      end
    end
  end
  
  def complete
    @designer = Designer.find_by(id: params[:designer_id])
    
    if @designer.nil?
      flash[:error] = "Designer profile not found. Please try again."
      redirect_to onboarding_start_path
    elsif !request.xhr?
      # Redirect to profile URL using username
      redirect_to "/#{@designer.username}"
    end
  end

  private
  
  def require_login
    unless current_user
      flash[:error] = "You must be logged in to access this section"
      redirect_to login_path
    end
  end
  
  def check_existing_designer
    redirect_to "/#{current_user.designer.username}" if current_user.designer.present?
  end
end
