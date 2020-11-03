class Api::V1::QuestsController < ApiController
  def index
    render json: Quest.all
  end

  def show
    quest = Quest.find(params[:id])
    render json: quest
  end
end
