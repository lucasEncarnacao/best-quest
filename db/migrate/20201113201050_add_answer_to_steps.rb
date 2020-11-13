class AddAnswerToSteps < ActiveRecord::Migration[5.2]
  def change
    add_column :steps, :answer, :string, null: false
  end
end
