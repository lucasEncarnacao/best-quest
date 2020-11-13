class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :rating, :comment, :ownerName

  def ownerName
    object.user.username
  end
end
