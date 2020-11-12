class Step < ApplicationRecord
  mount_uploader :photo, StepPhotoUploader
  
  belongs_to :quest

  validates :step_num, presence: true
  validates :step_num, uniqueness: { scope: :quest_id }
  validates :lat, numericality: true
  validates :lng, numericality: true
  validates :clue, presence: true
  validates :hint, presence: true
  validates :description, presence: true
end
