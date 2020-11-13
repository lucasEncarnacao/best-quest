class QuestSerializer < ActiveModel::Serializer
  attributes :id, :name, :category, :avgRating, :avgTime

  belongs_to :owner
end
