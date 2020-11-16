class StepSerializer < ActiveModel::Serializer
  attributes :clue, :hint, :answer, :description, :photo, :lat, :lng

  def lat
    object.lat.to_f
  end

  def lng
    object.lng.to_f
  end
end
