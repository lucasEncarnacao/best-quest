class Api::V1::CheckLocsController < ApiController
  include Haversine

  def create
    quest = Quest.find(params["quest_id"])
    step = quest.steps.where(step_num: params["step_num"]).first

    lat = params["lat"]
    lng = params["lng"]
    answer_lat = step.lat
    answer_lng = step.lng

    #great circle distance between 2 points on the globe
    distance = to_ft(haversine_dist(lat, lng, answer_lat, answer_lng))
    
    if distance < 300 #300 ft radius
      render json: true
    else
      render json: false
    end
  end
end
