class CompletionTime < ApplicationRecord
  belongs_to :user
  belongs_to :quest

  validates :start_time, presence: true
  validates :sec, numericality: { greater_than: 0 }, allow_nil: true

  def formatted_str
    total_sec = sec
    hours = total_sec / 3600
    minutes = (total_sec / 60) % 60 
    secs = total_sec % 60
    sprintf("%02d:%02d:%02d", hours, minutes, secs)
  end
end
