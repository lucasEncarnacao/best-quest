require "rails_helper"

RSpec.describe Api::V1::QuestsController, type: :controller do
  let!(:test_user) { FactoryBot.create(:user) }

  let!(:first_quest) { 
    FactoryBot.create(
      :quest, 
      name: "Quest 1", 
      owner: test_user, 
    ) 
  }

  let!(:second_quest) { 
    FactoryBot.create(
      :quest, 
      name: "Quest 2", 
      owner: test_user, 
    ) 
  }

  describe "GET#index" do
    it "should return a list of all the quests" do
      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
    
      expect(returned_json.length).to eq 2
      
      expect(returned_json.first["name"]).to eq "Quest 1"
      expect(returned_json.second["name"]).to eq "Quest 2"
    end
  end
end
