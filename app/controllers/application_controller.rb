class ApplicationController < ActionController::Base
  # Handle CSRF for Heroku SSL termination
  protect_from_forgery with: :exception, prepend: true
  
  helper_method :current_user, :logged_in?
  
  private
  
  def current_user
    @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
  end
  
  def logged_in?
    !!current_user
  end
  
  def require_login
    unless logged_in?
      flash[:error] = "You must be logged in to access this page"
      redirect_to login_path
    end
  end
end
