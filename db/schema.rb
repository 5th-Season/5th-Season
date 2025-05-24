# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2025_05_24_011134) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "collaboration_preferences", force: :cascade do |t|
    t.bigint "designer_id", null: false
    t.string "preference_type", null: false
    t.text "description"
    t.boolean "is_active", default: true, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["designer_id", "preference_type"], name: "idx_collab_prefs_on_designer_and_type", unique: true
    t.index ["designer_id"], name: "index_collaboration_preferences_on_designer_id"
  end

  create_table "collections", force: :cascade do |t|
    t.bigint "designer_id", null: false
    t.string "title", null: false
    t.string "season", null: false
    t.integer "year", null: false
    t.text "description"
    t.integer "status", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["designer_id"], name: "index_collections_on_designer_id"
  end

  create_table "designers", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "brand_name", null: false
    t.text "brand_description", null: false
    t.string "location", null: false
    t.string "website"
    t.integer "established_year"
    t.string "verification_status", default: "pending"
    t.string "slug", null: false
    t.decimal "average_rating", precision: 3, scale: 2, default: "0.0"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["slug"], name: "index_designers_on_slug", unique: true
    t.index ["user_id"], name: "index_designers_on_user_id"
  end

  create_table "designs", force: :cascade do |t|
    t.bigint "collection_id", null: false
    t.string "title", null: false
    t.text "description"
    t.integer "status", default: 0, null: false
    t.string "image_url"
    t.boolean "featured", default: false
    t.string "materials"
    t.string "dimensions"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["collection_id"], name: "index_designs_on_collection_id"
  end

  create_table "testimonials", force: :cascade do |t|
    t.bigint "designer_id", null: false
    t.string "reviewer_name", null: false
    t.string "reviewer_title"
    t.text "content", null: false
    t.decimal "rating", precision: 3, scale: 2, null: false
    t.boolean "verified", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["designer_id"], name: "index_testimonials_on_designer_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.boolean "is_admin", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "collaboration_preferences", "designers"
  add_foreign_key "collections", "designers"
  add_foreign_key "designers", "users"
  add_foreign_key "designs", "collections"
  add_foreign_key "testimonials", "designers"
end
