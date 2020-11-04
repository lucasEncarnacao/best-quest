class Quest < ApplicationRecord
  enum category: [:misc , :art, :history, :food]

  belongs_to :owner, class_name: "User", foreign_key: "user_id"
  has_many :steps

  validates :name, presence: true, uniqueness: true
  validates :category, presence: true
  validates :description, presence: true
end
