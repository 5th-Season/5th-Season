class CreateCollections < ActiveRecord::Migration[7.0]
  def change
    create_table :collections do |t|
      t.references :designer, null: false, foreign_key: true
      t.string :title, null: false
      t.string :season, null: false
      t.integer :year, null: false
      t.text :description
      t.integer :status, default: 0

      t.timestamps
    end
  end
end
