class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :quests
  has_many :completion_times
  has_many :completed_quests, through: :completion_times, source: :quest
  has_many :reviews
  has_many :reviewed_quests, through: :reviews, source: :quest

  validates :email, presence: true, uniqueness: true 
  validates :username, presence: true, uniqueness: true
  validates :password, presence: true
end
