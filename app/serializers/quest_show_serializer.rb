class QuestShowSerializer < ActiveModel::Serializer
  attributes :name, :category, :description, :avgRating, :avgTime, :stepCount

  belongs_to :owner
  has_many :reviews

  def stepCount
    object.steps.count
  end
end
