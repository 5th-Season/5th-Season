class CreateTestimonials < ActiveRecord::Migration[7.0]
  def change
    create_table :testimonials do |t|
      t.references :designer, null: false, foreign_key: true
      t.string :reviewer_name, null: false
      t.string :reviewer_title
      t.text :content, null: false
      t.decimal :rating, precision: 3, scale: 2, null: false
      t.boolean :verified, default: false

      t.timestamps
    end
  end
end
