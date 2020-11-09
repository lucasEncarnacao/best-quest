class EditTimes < ActiveRecord::Migration[5.2]
  def up
    add_column :completion_times, :start_time, :datetime, null: false
    add_column :completion_times, :end_time, :datetime
    change_column :completion_times, :sec, :integer, null: true
  end

  def down
    remove_column :completion_times, :start_time
    remove_column :completion_times, :end_time
    change_column :completion_times, :sec, :integer, null: false
  end
end
