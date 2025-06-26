class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    Rails.logger.info "=== SIGNUP DEBUG START ==="
    Rails.logger.info "Request method: #{request.method}"
    Rails.logger.info "CSRF token: #{request.headers['X-CSRF-Token']}"
    Rails.logger.info "Form authenticity token: #{params[:authenticity_token]}"
    Rails.logger.info "User params: #{user_params.inspect}"
    
    @user = User.new(user_params)
    
    Rails.logger.info "User valid?: #{@user.valid?}"
    Rails.logger.info "User errors: #{@user.errors.full_messages}" unless @user.valid?
    
    if @user.save
      Rails.logger.info "User saved successfully with ID: #{@user.id}"
      session[:user_id] = @user.id
      Rails.logger.info "Session user_id set to: #{session[:user_id]}"
      Rails.logger.info "Redirecting to onboarding..."
      
      # Redirect to React onboarding flow
      redirect_to "/onboarding/username"
    else
      Rails.logger.error "User save failed: #{@user.errors.full_messages.join(', ')}"
      flash.now[:error] = "Please correct the following errors: #{@user.errors.full_messages.join(', ')}"
      render :new
    end
    
    Rails.logger.info "=== SIGNUP DEBUG END ==="
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation, :first_name, :last_name)
  end
end
