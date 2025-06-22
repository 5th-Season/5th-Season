class Designer < ApplicationRecord
  belongs_to :user  # User association is now required
  has_many :collections, dependent: :destroy
  has_many :collaboration_preferences, dependent: :destroy
  has_many :testimonials, dependent: :destroy
  has_many :designs, through: :collections
  
  validates :brand_name, :brand_description, :location, :slug, :username, presence: true
  validates :slug, :username, uniqueness: true
  validates :average_rating, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 5.0 }
  
  before_validation :generate_slug, if: -> { slug.blank? && brand_name.present? }
  
  enum verification_status: {
    pending: 'pending',
    verified: 'verified',
    rejected: 'rejected'
  }
  
  def active_collaboration_preferences
    collaboration_preferences.active
  end
  
  def featured_designs
    designs.featured.published
  end
  
  def verified_testimonials
    testimonials.verified
  end
  
  private
  
  def generate_slug
    self.slug = brand_name.parameterize
  end
end
