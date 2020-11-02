class CreateSteps < ActiveRecord::Migration[5.2]
  def change
    create_table :steps do |t|
      t.belongs_to :quest, null: false

      t.integer :step_num, null: false
      t.decimal :lat, null: false
      t.decimal :lng, null: false
      t.text :clue, null: false
      t.text :hint, null: false
      t.text :description, null: false

      t.index [:quest_id, :step_num], unique: true

      t.timestamps
    end
  end
end
