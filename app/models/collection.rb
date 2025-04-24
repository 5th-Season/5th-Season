class Collection < ApplicationRecord
  belongs_to :designer
  
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
  
  scope :published, -> { where(status: :published) }
  scope :by_year, ->(year) { where(year: year) if year.present? }
  scope :by_season, ->(season) { where(season: season) if season.present? }
end
