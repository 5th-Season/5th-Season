class CreateCollaborationPreferences < ActiveRecord::Migration[7.0]
  def change
    create_table :collaboration_preferences do |t|
      t.references :designer, null: false, foreign_key: true
      t.string :preference_type, null: false
      t.text :description
      t.boolean :is_active, default: true, null: false

      t.timestamps
    end
    add_index :collaboration_preferences, [:designer_id, :preference_type], unique: true, name: 'idx_collab_prefs_on_designer_and_type'
  end
end
