class AddUsernameToUsers < ActiveRecord::Migration[7.0]
  def change
    # First add the column as nullable
    add_column :users, :username, :string
    
    # Populate existing records with username based on email
    reversible do |dir|
      dir.up do
        User.reset_column_information
        User.find_each do |user|
          # Generate username from email (part before @)
          base_username = user.email.split('@').first.downcase
          
          # Ensure uniqueness by adding a suffix if needed
          username = base_username
          counter = 1
          while User.exists?(username: username)
            username = "#{base_username}#{counter}"
            counter += 1
          end
          
          user.update_column(:username, username)
        end
      end
    end
    
    # Now make it not null and add unique index
    change_column_null :users, :username, false
    add_index :users, :username, unique: true
  end
end
