class DesignersController < ApplicationController
  def show
    @designer = Designer.find_by(slug: params[:slug])
    
    if @designer.nil?
      flash[:error] = "Designer not found"
      redirect_to root_path
    end
  end
end
