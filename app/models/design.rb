class Design < ApplicationRecord
  belongs_to :collection
  
  validates :title, presence: true
  validates :status, presence: true
  
  enum status: {
    draft: 0,
    published: 1,
    archived: 2
  }
  
  scope :published, -> { where(status: :published) }
  scope :featured, -> { where(featured: true) }
  scope :latest, -> { order(created_at: :desc) }
  
  def designer
    collection.designer
  end
end
