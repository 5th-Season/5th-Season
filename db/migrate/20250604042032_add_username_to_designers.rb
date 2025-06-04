class AddUsernameToDesigners < ActiveRecord::Migration[7.0]
  def change
    # First add the column as nullable
    add_column :designers, :username, :string
    
    # Populate existing records with username based on slug or brand_name
    reversible do |dir|
      dir.up do
        Designer.reset_column_information
        Designer.find_each do |designer|
          # Use slug if available, otherwise generate from brand_name
          username = designer.slug.present? ? designer.slug : designer.brand_name.parameterize
          
          # Ensure uniqueness by adding a suffix if needed
          counter = 1
          original_username = username
          while Designer.exists?(username: username)
            username = "#{original_username}#{counter}"
            counter += 1
          end
          
          designer.update_column(:username, username)
        end
      end
    end
    
    # Now make it not null and add unique index
    change_column_null :designers, :username, false
    add_index :designers, :username, unique: true
  end
end
