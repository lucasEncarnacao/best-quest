class Api::V1::CompletionTimesController < ApiController
  def create
    quest = Quest.find(params["quest_id"])
    time = CompletionTime.find_or_initialize_by(quest: quest, user: current_user)
    
    time.start_time = Time.new
    
    time.save unless time.persisted?

    render json: time.id
  end

  def update
    time = CompletionTime.find(params["id"])
    
    time.end_time = Time.new if time.end_time.nil?
    
    time.sec = time.end_time - time.start_time

    time.save

    render json: time
  end
end
