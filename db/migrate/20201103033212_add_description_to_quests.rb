class AddDescriptionToQuests < ActiveRecord::Migration[5.2]
  def change
    add_column :quests, :description, :text, null: false
  end
end
