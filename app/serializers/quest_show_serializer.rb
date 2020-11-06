class QuestShowSerializer < ActiveModel::Serializer
  attributes :id, :name, :category, :description, :ownerName

  has_many :reviews

  def ownerName
    object.owner.username
  end
end
