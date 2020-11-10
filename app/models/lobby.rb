class Lobby < ApplicationRecord
  belongs_to :quest

  validates :code, presence: true, uniqueness: true
  validates :step_num, numericality: true
end
