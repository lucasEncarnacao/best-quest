class User < ApplicationRecord
  has_secure_password

  has_many :quests
  has_many :completion_times
  has_many :completed_quests, through: :completion_times, source: :quest
  has_many :reviews
  has_many :reviewed_quests, through: :reviews, source: :quest

  validates :username, presence: true, uniqueness: true
  validates :password, presence: true
end
