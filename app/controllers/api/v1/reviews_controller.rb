class Api::V1::ReviewsController < ApiController
  def create
    quest = Quest.find(params["quest_id"])
    review = Review.new(review_params)
    review.quest = quest
    review.user = current_user

    review.save
    render json: review
  end

  private

  def review_params
    params.require(:review).permit(:rating, :comment)
  end
end
