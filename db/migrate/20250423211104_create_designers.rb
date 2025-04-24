class CreateDesigners < ActiveRecord::Migration[7.0]
  def change
    create_table :designers do |t|
      t.references :user, null: false, foreign_key: true
      t.string :brand_name, null: false
      t.text :brand_description, null: false
      t.string :location, null: false
      t.string :website
      t.integer :established_year
      t.string :verification_status, default: 'pending'
      t.string :slug, null: false
      t.decimal :average_rating, precision: 3, scale: 2, default: 0

      t.timestamps
    end
    add_index :designers, :slug, unique: true
  end
end
