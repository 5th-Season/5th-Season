class PageController < ApplicationController
  def index
    respond_to do |format|
      format.html # Render the React SPA
      format.json { render json: { error: "Not found" }, status: :not_found }
    end
  end
end
