class Quest < ApplicationRecord
  enum category: [:misc , :art, :history, :food]

  belongs_to :owner, class_name: "User", foreign_key: "user_id"
  has_many :steps
  has_many :completion_times
  has_many :conquerers, through: :completion_times, source: :user
  has_many :reviews
  has_many :reviewers, through: :reviews, source: :user

  validates :name, presence: true, uniqueness: true
  validates :category, presence: true
  validates :description, presence: true
end
