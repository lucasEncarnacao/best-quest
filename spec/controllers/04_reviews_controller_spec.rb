require "rails_helper"

RSpec.describe Api::V1::ReviewsController, type: :controller do
  let!(:test_user) { FactoryBot.create(:user) }
  let!(:test_quest) { FactoryBot.create(:quest, owner: test_user) }

  describe "POST#create" do
    let!(:post_json) { 
      {
        rating: 5,
        comment: "this is a comment"
      }
    }

    it "creates a new review" do
      sign_in test_user
      prev_count = Review.count
      post(:create, params: { review: post_json, quest_id: test_quest.id }, as: :json)
      expect(Review.count).to eq(prev_count + 1)
    end

    it "returns the json of the newly posted review" do
      sign_in test_user

      post(:create, params: { review: post_json, quest_id: test_quest.id }, as: :json)
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      expect(returned_json["review"]["rating"]).to eq 5
      expect(returned_json["review"]["comment"]).to eq "this is a comment"
      expect(returned_json["review"]["username"]).to eq test_user.username
    end
  end
end
