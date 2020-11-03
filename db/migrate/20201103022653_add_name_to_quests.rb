class AddNameToQuests < ActiveRecord::Migration[5.2]
  def change
    add_column :quests, :name, :string, null: false
    add_index :quests, :name, unique: true
  end
end
