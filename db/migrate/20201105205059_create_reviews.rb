class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.belongs_to :user, null: false
      t.belongs_to :quest, null: false
      
      t.integer :rating, null: false
      t.text :comment

      t.timestamps
    end
  end
end
