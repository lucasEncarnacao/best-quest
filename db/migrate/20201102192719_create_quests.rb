class CreateQuests < ActiveRecord::Migration[5.2]
  def change
    create_table :quests do |t|
      t.belongs_to :user, null: false
      
      t.integer :category, null: false

      t.timestamps
    end
  end
end
