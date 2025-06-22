class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by_login(params[:username])
    
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      
      # Redirect to onboarding if user doesn't have a designer profile yet
      if user.designer.nil?
        # Force HTTPS redirect for Heroku
        onboarding_url = Rails.env.production? ? 
          "https://#{request.host}/onboarding" : 
          onboarding_start_path
        redirect_to onboarding_url
      else
        # Force HTTPS redirect for profile URLs in production
        profile_url = Rails.env.production? ? 
          "https://#{request.host}/#{user.designer.username}" : 
          "/#{user.designer.username}"
        redirect_to profile_url
      end
    else
      flash.now[:error] = "Invalid username or password"
      render :new
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path, notice: "You have been logged out"
  end
end
