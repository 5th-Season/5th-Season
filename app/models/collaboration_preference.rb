class CollaborationPreference < ApplicationRecord
  belongs_to :designer

  validates :preference_type, presence: true
  validates :preference_type, uniqueness: { scope: :designer_id, message: "has already been added for this designer" }
  validates :is_active, inclusion: { in: [true, false] }
  
  scope :active, -> { where(is_active: true) }
  
  # Common preference types
  COMMON_TYPES = [
    'Runway Shows',
    'Editorial Features',
    'Boutique Partnerships',
    'Showroom Representation',
    'Brand Collaborations',
    'Manufacturing',
    'Pattern Making',
    'Fabric Sourcing',
    'Sustainable Practices',
    'Mentorship'
  ]
end
