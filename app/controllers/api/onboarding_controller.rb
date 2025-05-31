class Api::OnboardingController < ApplicationController
  before_action :require_login
  before_action :check_existing_designer, except: [:complete, :designer_profile, :current_user_info]
  
  def product_type
    # Initialize session data as a completely fresh hash with string keys
    session[:onboarding_data] = {}
    session[:onboarding_data]['product_type'] = params[:product_type]
    
    # Log for debugging
    Rails.logger.info("[API] Starting fresh onboarding session with product_type='#{params[:product_type]}'")
    Rails.logger.info("[API] Session data: #{session[:onboarding_data].inspect}")
    
    render json: { success: true }
  end
  
  def personal_info
    if update_user_name
      render json: { success: true }
    else
      render json: { error: "Please provide your first and last name" }, status: :unprocessable_entity
    end
  end
  
  def brand_info
    # Initialize onboarding_data with explicit string keys
    session[:onboarding_data] ||= {}
    
    # Store data with string keys
    session[:onboarding_data] = session[:onboarding_data].to_h
    session[:onboarding_data]['brand_name'] = params[:brand_name]
    session[:onboarding_data]['brand_description'] = params[:brand_description]
    
    # Log session data for debugging
    Rails.logger.info("[API] Brand info saved to session with STRING KEYS")
    Rails.logger.info("[API] Brand name: '#{session[:onboarding_data]['brand_name']}'")
    Rails.logger.info("[API] Brand description: '#{session[:onboarding_data]['brand_description']}'")
    Rails.logger.info("[API] Full session data: #{session.to_h}")
    
    render json: { success: true }
  end
  
  def location
    # Initialize onboarding_data with explicit string keys
    session[:onboarding_data] ||= {}
    
    # Store data with string keys - IMPORTANT: convert existing data to hash first
    data = session[:onboarding_data].to_h
    
    # Explicitly handle string conversions for all keys
    string_data = {}
    data.each do |k, v|
      string_data[k.to_s] = v
    end
    
    # Add the location with a string key
    string_data['location'] = params[:location]
    
    # Store the data back in the session
    session[:onboarding_data] = string_data
    
    # Log session data for debugging
    Rails.logger.info("[API] Location saved to session with STRING KEYS")
    Rails.logger.info("[API] Location: '#{session[:onboarding_data]['location']}'")
    Rails.logger.info("[API] Full session now contains: #{session[:onboarding_data].inspect}")
    
    render json: { success: true }
  end
  
  def collaboration
    Rails.logger.info("==== [API] COLLABORATION STEP START ====")
    Rails.logger.info("Session ID: #{request.session_options[:id]}")
    Rails.logger.info("Current user: #{current_user.inspect}")
    
    session[:onboarding_data] ||= {}
    previous_data = session[:onboarding_data].deep_dup # Store previous data for comparison
    
    # Log incoming parameters
    Rails.logger.info("[API] Received collaboration params: #{params.inspect}")
    
    # CRITICAL FIX: Store collaboration preferences with a STRING key, not a symbol
    # This matches how the other data is stored
    session[:onboarding_data]['collaboration_preferences'] = params[:collaboration_preferences] || []
    
    # CRITICAL FIX: Convert all symbol keys to string keys for consistency
    # This ensures we can check all values consistently
    string_keyed_data = {}
    session[:onboarding_data].each do |key, value|
      string_keyed_data[key.to_s] = value
    end
    session[:onboarding_data] = string_keyed_data
    
    # Super detailed session logging
    Rails.logger.info("[API] FULL SESSION DATA: #{session.to_h.inspect}")
    Rails.logger.info("[API] Session onboarding_data: #{session[:onboarding_data].inspect}")
    Rails.logger.info("[API] Session changed? #{previous_data != session[:onboarding_data]}")
    
    # Explicitly log each required field
    Rails.logger.info("[API] Brand name: '#{session[:onboarding_data]['brand_name']}'")
    Rails.logger.info("[API] Brand description: '#{session[:onboarding_data]['brand_description']}'")
    Rails.logger.info("[API] Location: '#{session[:onboarding_data]['location']}'")
    Rails.logger.info("[API] Collaboration preferences: #{session[:onboarding_data]['collaboration_preferences'].inspect}")
    
    # Check if we have all required data - using string keys for consistency
    missing_fields = []
    missing_fields << "brand_name" if session[:onboarding_data]['brand_name'].blank?
    missing_fields << "brand_description" if session[:onboarding_data]['brand_description'].blank?
    missing_fields << "location" if session[:onboarding_data]['location'].blank?
    
    if missing_fields.any?
      Rails.logger.error("[API] Missing required fields: #{missing_fields.join(', ')}")
      render json: { error: "Missing required information: #{missing_fields.join(', ')}." }, status: :unprocessable_entity
      return
    end
    
    Rails.logger.info("[API] All required fields present, attempting to create designer profile")
    
    if create_designer_profile
      Rails.logger.info("[API] Designer profile created successfully")
      render json: { success: true }
    else
      Rails.logger.error("[API] Failed to create designer profile - see logs for details")
      render json: { error: "Failed to create designer profile" }, status: :unprocessable_entity
    end
    
    Rails.logger.info("==== [API] COLLABORATION STEP END ====")
  end
  
  def current_user_info
    render json: { 
      first_name: current_user.first_name,
      last_name: current_user.last_name,
      email: current_user.email
    }
  end
  
  def designer_profile
    designer = current_user.designer
    
    if designer
      render json: {
        brand_name: designer.brand_name,
        brand_description: designer.brand_description,
        location: designer.location,
        slug: designer.slug
      }
    else
      render json: { error: "Designer profile not found" }, status: :not_found
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
    # Start with very detailed logging
    Rails.logger.info("==== [API] CREATE DESIGNER PROFILE START ====")
    Rails.logger.info("[API] Current user: #{current_user.inspect}")
    Rails.logger.info("[API] Session data: #{session[:onboarding_data].inspect}")
    
    begin
      # Make sure the user doesn't already have a designer profile
      if current_user.designer.present?
        Rails.logger.error("[API] User already has a designer profile: #{current_user.designer.inspect}")
        return false
      end
      
      # Create a deep copy of the session data
      profile_data = session[:onboarding_data].deep_dup
      Rails.logger.info("[API] Working with copied profile data: #{profile_data.inspect}")
      
      # Validate each required field with detailed logging - using string keys
      if profile_data['brand_name'].blank?
        Rails.logger.error("[API] VALIDATION FAILED: Brand name is blank")
        return false
      else
        Rails.logger.info("[API] VALIDATION PASSED: Brand name is '#{profile_data['brand_name']}'")
      end
      
      if profile_data['brand_description'].blank?
        Rails.logger.error("[API] VALIDATION FAILED: Brand description is blank")
        return false
      else
        Rails.logger.info("[API] VALIDATION PASSED: Brand description is '#{profile_data['brand_description']}'")
      end
      
      if profile_data['location'].blank?
        Rails.logger.error("[API] VALIDATION FAILED: Location is blank")
        return false
      else
        Rails.logger.info("[API] VALIDATION PASSED: Location is '#{profile_data['location']}'")
      end
      
      # Generate a guaranteed unique slug
      timestamp = Time.now.to_i
      random_suffix = SecureRandom.hex(4)
      slug = "#{profile_data['brand_name'].parameterize}-#{timestamp}-#{random_suffix}"
      Rails.logger.info("[API] Generated unique slug: '#{slug}'")      
      # Create the designer object
      designer = Designer.new(
        user: current_user,
        brand_name: profile_data['brand_name'],
        brand_description: profile_data['brand_description'],
        location: profile_data['location'],
        verification_status: :pending,
        average_rating: 0.0,
        slug: slug
      )
      
      Rails.logger.info("[API] Designer object created: #{designer.attributes}")
      
      # Try to save with extensive validation logging
      valid = designer.valid?
      if !valid
        Rails.logger.error("[API] Designer validation failed: #{designer.errors.full_messages.join(', ')}")
        Rails.logger.error("[API] Designer object that failed validation: #{designer.attributes}")
        return false
      end
      
      Rails.logger.info("[API] Designer passed validation, attempting to save")
      if designer.save
        Rails.logger.info("[API] SUCCESS: Designer saved with ID: #{designer.id}")
        
        # Create collaboration preferences
        if profile_data['collaboration_preferences'].present?
          Rails.logger.info("[API] Creating collaboration preferences: #{profile_data['collaboration_preferences'].inspect}")
          profile_data['collaboration_preferences'].each do |pref_type|
            collab_pref = designer.collaboration_preferences.create(
              preference_type: pref_type,
              is_active: true
            )
            if collab_pref.persisted?
              Rails.logger.info("[API] Created collaboration preference: #{pref_type}")
            else
              Rails.logger.warn("[API] Failed to create collaboration preference: #{pref_type}, errors: #{collab_pref.errors.full_messages.join(', ')}")
            end
          end
        else
          Rails.logger.info("[API] No collaboration preferences to create")
        end
        
        # Clear the session data only after successful creation
        Rails.logger.info("[API] Clearing onboarding data from session")
        session.delete(:onboarding_data)
        
        Rails.logger.info("==== [API] CREATE DESIGNER PROFILE END: SUCCESS ====")
        return true
      else
        Rails.logger.error("[API] FAILED to save designer: #{designer.errors.full_messages.join(', ')}")
        Rails.logger.error("[API] Designer object that failed to save: #{designer.attributes}")
        Rails.logger.error("==== [API] CREATE DESIGNER PROFILE END: FAILED ====")
        return false
      end
    rescue => e
      Rails.logger.error("[API] EXCEPTION during profile creation: #{e.message}")
      Rails.logger.error(e.backtrace.join("\n"))
      Rails.logger.error("==== [API] CREATE DESIGNER PROFILE END: EXCEPTION ====")
      return false
    end
  end
  
  def check_existing_designer
    if current_user.designer.present?
      render json: { error: "You already have a designer profile" }, status: :unprocessable_entity
    end
  end
end
