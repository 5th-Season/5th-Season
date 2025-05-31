class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by(email: params[:email])
    
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      
      # Redirect to onboarding if user doesn't have a designer profile yet
      if user.designer.nil?
        redirect_to onboarding_start_path
      else
        # Redirect to profile URL and let React handle routing
        redirect_to "/#{user.designer.slug}"
      end
    else
      flash.now[:error] = "Invalid email or password"
      render :new
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path, notice: "You have been logged out"
  end
end
