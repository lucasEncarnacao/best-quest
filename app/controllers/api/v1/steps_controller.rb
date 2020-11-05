class Api::V1::StepsController < ApiController
  def index
    quest = Quest.find(params["quest_id"])
    render json: quest.steps.order(:step_num)
  end
end
