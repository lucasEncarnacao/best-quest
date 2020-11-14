class StepSerializer < ActiveModel::Serializer
  attributes :clue, :hint, :description, :photo, :lat, :lng

  def lat
    object.lat.to_f
  end

  def lng
    object.lng.to_f
  end
end
