require "rails_helper"

RSpec.describe Api::V1::QuestsController, type: :controller do
  let!(:test_user) { FactoryBot.create(:user) }

  let!(:first_quest) { 
    FactoryBot.create(
      :quest, 
      name: "Quest 1",
      category: "art",
      description: "Description 1", 
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
    
      expect(returned_json["quests"].length).to eq 2
      
      expect(returned_json["quests"].first["name"]).to eq "Quest 1"
      expect(returned_json["quests"].second["name"]).to eq "Quest 2"
    end
  end

  describe "GET#show" do
    it "should return an individual quest with its name and description" do
      get :show, params: {id: first_quest.id}
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["quest"].length).to eq 5
      expect(returned_json["quest"]["id"]).to eq first_quest.id
      expect(returned_json["quest"]["name"]).to eq "Quest 1"
      expect(returned_json["quest"]["category"]).to eq "art"
      expect(returned_json["quest"]["description"]).to eq "Description 1"
      expect(returned_json["quest"]["ownerName"]).to eq test_user.username
    end
  end
end
