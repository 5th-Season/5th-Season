class Testimonial < ApplicationRecord
  belongs_to :designer

  validates :reviewer_name, :content, presence: true
  validates :rating, presence: true, 
                    numericality: { 
                      greater_than_or_equal_to: 0.0,
                      less_than_or_equal_to: 5.0
                    }
  
  scope :verified, -> { where(verified: true) }
  scope :top_rated, -> { where('rating >= ?', 4.0) }
  scope :recent, -> { order(created_at: :desc) }
  
  after_save :update_designer_rating
  
  private
  
  def update_designer_rating
    # Calculate average rating for the designer
    avg = designer.testimonials.average(:rating)
    designer.update_column(:average_rating, avg)
  end
end
