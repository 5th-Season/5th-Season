class OnboardingController < ApplicationController
  before_action :require_login
  before_action :check_existing_designer, except: [:complete]
  
  def start
    session[:onboarding_data] = {}
    render :product_type
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
      
      # Store first and last name in session for debugging
      session[:onboarding_data][:first_name] = params[:first_name]
      session[:onboarding_data][:last_name] = params[:last_name]
      
      if update_user_name
        # Log for debugging
        Rails.logger.debug("Personal info updated for user: #{current_user.inspect}")
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
      
      # Log for debugging
      Rails.logger.debug("Brand info saved to session: #{session[:onboarding_data].inspect}")
      
      redirect_to onboarding_location_path
    end
  end
  
  def location
    if request.post?
      session[:onboarding_data] ||= {}
      session[:onboarding_data][:location] = params[:location]
      
      # Log for debugging
      Rails.logger.debug("Location saved to session: #{session[:onboarding_data].inspect}")
      
      redirect_to onboarding_collaboration_path
    end
  end
  
  def collaboration
    if request.post?
      # Initialize or get the onboarding data
      session[:onboarding_data] ||= {}
      
      # Create a clean hash to store all data with string keys
      clean_data = {}
      
      # Copy all existing data to the clean hash, ensuring string keys
      session[:onboarding_data].each do |k, v|
        clean_data[k.to_s] = v
      end
      
      # Add the collaboration preferences with a string key
      clean_data['collaboration_preferences'] = params[:collaboration_preferences] || []
      
      # Replace the session data with our clean version
      session[:onboarding_data] = clean_data
      
      # Super detailed debugging
      Rails.logger.info("==== [RAILS] COLLABORATION STEP DEBUG ====")
      Rails.logger.info("Raw session data: #{session.to_h}")
      Rails.logger.info("Cleaned onboarding data: #{session[:onboarding_data].inspect}")
      Rails.logger.info("Data class: #{session[:onboarding_data].class}")
      Rails.logger.info("Keys in data: #{session[:onboarding_data].keys}")
      
      # Explicitly log and check each required field with string keys
      brand_name = session[:onboarding_data]['brand_name']
      brand_description = session[:onboarding_data]['brand_description']
      location = session[:onboarding_data]['location']
      
      Rails.logger.info("[RAILS] Brand name: '#{brand_name}', Present? #{brand_name.present?}")
      Rails.logger.info("[RAILS] Brand description: '#{brand_description}', Present? #{brand_description.present?}")
      Rails.logger.info("[RAILS] Location: '#{location}', Present? #{location.present?}")
      
      # Check for missing required data
      missing_fields = []
      missing_fields << "Brand name" if brand_name.blank?
      missing_fields << "Brand description" if brand_description.blank?
      missing_fields << "Location" if location.blank?
      
      if missing_fields.any?
        # Show error with specific missing fields
        error_message = "Missing required information: #{missing_fields.join(', ')}."
        Rails.logger.error("[RAILS] #{error_message}")
        flash[:error] = "There was an issue creating your designer profile. #{error_message}"
        redirect_to onboarding_product_type_path
        return
      end
      
      Rails.logger.info("[RAILS] All required data verified present, attempting to create profile")
      
      # OVERRIDE the missing_required_data? method by creating the profile directly
      designer = Designer.new(
        user: current_user,
        brand_name: brand_name,
        brand_description: brand_description,
        location: location,
        verification_status: :pending,
        average_rating: 0.0,
        slug: "#{brand_name.parameterize}-#{Time.now.to_i}-#{SecureRandom.hex(4)}"
      )
      
      Rails.logger.info("[RAILS] Designer object created: #{designer.attributes}")
      
      if designer.save
        Rails.logger.info("[RAILS] SUCCESS! Designer profile saved with ID: #{designer.id}")
        
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
        
        redirect_to onboarding_complete_path
      else
        # Log validation errors
        Rails.logger.error("[RAILS] Failed to save designer: #{designer.errors.full_messages.join(', ')}")
        flash[:error] = "There was an issue creating your designer profile: #{designer.errors.full_messages.join(', ')}"
        redirect_to onboarding_product_type_path
      end
    end
  end
  
  def complete
    @designer = current_user.designer
    
    if @designer.nil?
      # If the designer wasn't created properly, redirect back to the start
      flash[:error] = "There was an issue creating your designer profile. Please try again."
      redirect_to onboarding_start_path
    elsif !request.xhr? # Only redirect for regular requests, not AJAX
      # Redirect to profile URL and let React handle routing
      redirect_to "/#{@designer.slug}"
    end
  end
  
  private
  
  def update_user_name
    return false if params[:first_name].blank? || params[:last_name].blank?
    
    current_user.update(
      first_name: params[:first_name],
      last_name: params[:last_name]
    )
  end
  
  def create_designer_profile
    # Log session data for debugging
    Rails.logger.info("==== CREATE DESIGNER PROFILE DEBUG ====")
    Rails.logger.info("Session ID: #{session.id}")
    Rails.logger.info("Full session data: #{session.to_h}")
    Rails.logger.info("Onboarding data: #{session[:onboarding_data].inspect}")
    
    begin
      # Create a local copy of the data to ensure we don't lose it
      brand_name = session[:onboarding_data][:brand_name]
      brand_description = session[:onboarding_data][:brand_description]
      location = session[:onboarding_data][:location]
      collaboration_preferences = session[:onboarding_data][:collaboration_preferences] || []
      
      # Validate the data before attempting to create the designer
      if brand_name.blank?
        Rails.logger.error("CRITICAL: Brand name is blank")
        return false
      end
      
      if brand_description.blank?
        Rails.logger.error("CRITICAL: Brand description is blank")
        return false
      end
      
      if location.blank?
        Rails.logger.error("CRITICAL: Location is blank")
        return false
      end
      
      # Log what we're about to create
      Rails.logger.info("Creating designer with: Brand name='#{brand_name}', Description='#{brand_description}', Location='#{location}'")
      
      # Explicitly generate a unique slug to ensure it's present
      # Add a timestamp to ensure uniqueness
      timestamp = Time.now.to_i
      slug = "#{brand_name.parameterize}-#{timestamp}"
      Rails.logger.info("Generated unique slug: #{slug}")
      
      designer = Designer.new(
        user: current_user,
        brand_name: brand_name,
        brand_description: brand_description,
        location: location,
        verification_status: :pending,
        average_rating: 0.0,
        slug: slug
      )
      
      Rails.logger.info("Designer object created: #{designer.attributes}")
      
      # Try to save the designer
      success = designer.save
      
      if success
        Rails.logger.info("Designer profile saved successfully with ID: #{designer.id}")
        
        # Create collaboration preferences
        if collaboration_preferences.present?
          collaboration_preferences.each do |pref_type|
            collab = designer.collaboration_preferences.create(
              preference_type: pref_type,
              is_active: true
            )
            Rails.logger.info("Created collaboration preference: #{pref_type}, saved: #{collab.persisted?}")
          end
        end
        
        # Clear the session data only on success
        session.delete(:onboarding_data)
        # Rails sessions are automatically persisted at the end of the request
        return true
      else
        # Log validation errors
        Rails.logger.error("Failed to create designer profile: #{designer.errors.full_messages.join(', ')}")
        Rails.logger.error("Designer attributes: #{designer.attributes}")
        return false
      end
    rescue => e
      # Log any unexpected errors
      Rails.logger.error("Exception creating designer profile: #{e.message}\n#{e.backtrace.join("\n")}")
      return false
    end
  end
  
  def check_existing_designer
    # Redirect to profile URL and let React handle routing
    redirect_to "/#{current_user.designer.slug}" if current_user.designer.present?
  end
  
  def missing_required_data?
    return true unless session[:onboarding_data].present?
    
    # Log for debugging
    Rails.logger.debug("Checking required data: #{session[:onboarding_data].inspect}")
    
    # Check if any required fields are missing
    if session[:onboarding_data][:brand_name].blank?
      Rails.logger.warn("Missing brand_name in session data")
      return true
    end
    
    if session[:onboarding_data][:brand_description].blank?
      Rails.logger.warn("Missing brand_description in session data")
      return true
    end
    
    if session[:onboarding_data][:location].blank?
      Rails.logger.warn("Missing location in session data")
      return true
    end
    
    # All required fields are present
    return false
  end
  
  def require_login
    unless current_user
      flash[:error] = "You must be logged in to access this section"
      redirect_to login_path
    end
  end
end
