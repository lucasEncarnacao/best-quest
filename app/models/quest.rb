class Quest < ApplicationRecord
  enum category: [:misc , :art, :history, :food]
  after_initialize :set_default_category, :if => :new_record?

  belongs_to :owner, class_name: "User", foreign_key: "user_id"
  has_many :steps
  
  validates :category, presence: true

  def set_default_category
    category ||= :misc
  end
end
