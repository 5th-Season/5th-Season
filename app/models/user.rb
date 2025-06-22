class User < ApplicationRecord
  has_one :designer, dependent: :destroy
  
  has_secure_password
  
  validates :email, presence: true, uniqueness: true,
                    format: { with: URI::MailTo::EMAIL_REGEXP, message: "must be a valid email address" }
  validates :username, presence: true, uniqueness: true,
                       format: { with: /\A[a-zA-Z0-9_]+\z/, message: "can only contain letters, numbers, and underscores" },
                       length: { minimum: 3, maximum: 30 }
  validates :first_name, :last_name, presence: true
  
  def full_name
    "#{first_name} #{last_name}"
  end
  
  # Find user by username or email for authentication
  def self.find_by_login(login)
    find_by(username: login) || find_by(email: login)
  end
end
