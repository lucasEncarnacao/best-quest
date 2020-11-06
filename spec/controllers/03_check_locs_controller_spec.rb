require "rails_helper"

RSpec.describe Api::V1::CheckLocsController, type: :controller do
  let!(:test_user) { FactoryBot.create(:user) }
  let!(:test_quest) { FactoryBot.create(:quest, owner: test_user) }

  let!(:first_step) { 
    FactoryBot.create(
      :step,
      step_num: 1,
      lat: 0,
      lng: 0, 
      quest: test_quest, 
    ) 
  }

  describe "POST#create" do
    it "returns true if the location to check is within 300 ft of the correct location" do
      good_loc_json = {
        quest_id: test_quest.id,
        step_num: 1,
        lat: 0,
        lng: 0.00082,
      }
      
      post(:create, params: good_loc_json, as: :json)
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json).to eq true
    end

    it "returns false if the location to check is not within 300 ft of the correct location" do
      bad_loc_json = {
        quest_id: test_quest.id,
        step_num: 1,
        lat: 0,
        lng: 0.00083,
      }
      
      post(:create, params: bad_loc_json, as: :json)
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json).to eq false
    end
  end
end
