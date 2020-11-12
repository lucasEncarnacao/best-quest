class QuestShowSerializer < ActiveModel::Serializer
  attributes :id, :name, :category, :description

  belongs_to :owner
  has_many :reviews
end
