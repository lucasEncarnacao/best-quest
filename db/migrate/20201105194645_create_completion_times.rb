class CreateCompletionTimes < ActiveRecord::Migration[5.2]
  def change
    create_table :completion_times do |t|
      t.belongs_to :user, null: false
      t.belongs_to :quest, null: false
      
      t.integer :sec, null: false

      t.timestamps
    end
  end
end
