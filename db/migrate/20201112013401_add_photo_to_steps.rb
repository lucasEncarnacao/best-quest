class AddPhotoToSteps < ActiveRecord::Migration[5.2]
  def change
    add_column :steps, :photo, :string
  end
end
