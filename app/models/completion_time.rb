class CompletionTime < ApplicationRecord
  belongs_to :user
  belongs_to :quest

  validates :sec, numericality: { greater_than: 0 }
end
