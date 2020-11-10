class CreateLobbies < ActiveRecord::Migration[5.2]
  def change
    create_table :lobbies do |t|
      t.belongs_to :quest, null: false

      t.string :code, null: false
      t.index :code, unique: true
      t.integer :step_num, null: false, default: 1

      t.timestamps
    end
  end
end
