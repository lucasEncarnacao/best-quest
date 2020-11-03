class QuestSerializer < ActiveModel::Serializer
  attributes :id, :name, :category, :description, :ownerName

  def ownerName
    object.owner.username
  end
end
