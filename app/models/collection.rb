class Collection < ApplicationRecord
  belongs_to :designer
  has_many :designs, dependent: :destroy
  
  validates :title, :season, :year, presence: true
  validates :year, numericality: { only_integer: true, greater_than_or_equal_to: 1900 }
  
  enum status: {
    draft: 0,
    published: 1,
    archived: 2
  }
  
  def season_year
    "#{season} #{year}"
  end
  
  def published_designs
    designs.published
  end
  
  def featured_designs
    designs.featured.published
  end
  
  scope :published, -> { where(status: :published) }
  scope :by_year, ->(year) { where(year: year) if year.present? }
  scope :by_season, ->(season) { where(season: season) if season.present? }
  scope :recent, -> { order(year: :desc, created_at: :desc) }
end
