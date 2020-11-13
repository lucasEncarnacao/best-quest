# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_11_13_201050) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "completion_times", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "quest_id", null: false
    t.integer "sec"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "start_time", null: false
    t.datetime "end_time"
    t.index ["quest_id"], name: "index_completion_times_on_quest_id"
    t.index ["user_id"], name: "index_completion_times_on_user_id"
  end

  create_table "lobbies", force: :cascade do |t|
    t.bigint "quest_id", null: false
    t.string "code", null: false
    t.integer "step_num", default: 1, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["code"], name: "index_lobbies_on_code", unique: true
    t.index ["quest_id"], name: "index_lobbies_on_quest_id"
  end

  create_table "quests", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.integer "category", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name", null: false
    t.text "description", null: false
    t.index ["name"], name: "index_quests_on_name", unique: true
    t.index ["user_id"], name: "index_quests_on_user_id"
  end

  create_table "reviews", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "quest_id", null: false
    t.integer "rating", null: false
    t.text "comment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["quest_id"], name: "index_reviews_on_quest_id"
    t.index ["user_id"], name: "index_reviews_on_user_id"
  end

  create_table "steps", force: :cascade do |t|
    t.bigint "quest_id", null: false
    t.integer "step_num", null: false
    t.decimal "lat", null: false
    t.decimal "lng", null: false
    t.text "clue", null: false
    t.text "hint", null: false
    t.text "description", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "photo"
    t.string "answer", null: false
    t.index ["quest_id", "step_num"], name: "index_steps_on_quest_id_and_step_num", unique: true
    t.index ["quest_id"], name: "index_steps_on_quest_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "password_digest", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["username"], name: "index_users_on_username", unique: true
  end

end
