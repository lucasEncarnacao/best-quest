class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :rating, :comment, :username

  def username
    object.user.username
  end
end
