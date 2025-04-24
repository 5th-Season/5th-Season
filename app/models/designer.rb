class Designer < ApplicationRecord
  belongs_to :user
  has_many :collections, dependent: :destroy
  
  validates :brand_name, :brand_description, :location, :slug, presence: true
  validates :slug, uniqueness: true
  validates :average_rating, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 5.0 }
  
  before_validation :generate_slug, if: -> { slug.blank? && brand_name.present? }
  
  enum verification_status: {
    pending: 'pending',
    verified: 'verified',
    rejected: 'rejected'
  }
  
  private
  
  def generate_slug
    self.slug = brand_name.parameterize
  end
end
