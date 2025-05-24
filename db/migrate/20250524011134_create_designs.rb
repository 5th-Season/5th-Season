class CreateDesigns < ActiveRecord::Migration[7.0]
  def change
    create_table :designs do |t|
      t.references :collection, null: false, foreign_key: true
      t.string :title, null: false
      t.text :description
      t.integer :status, default: 0, null: false
      t.string :image_url
      t.boolean :featured, default: false
      t.string :materials
      t.string :dimensions

      t.timestamps
    end
  end
end
