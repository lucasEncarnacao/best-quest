class Api::V1::QuestsController < ApiController
  def index
    render json: Quest.all
  end
end
