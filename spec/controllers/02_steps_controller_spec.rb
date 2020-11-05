require "rails_helper"

RSpec.describe Api::V1::StepsController, type: :controller do
  let!(:test_user) { FactoryBot.create(:user) }

  let!(:test_quest) { 
    FactoryBot.create(
      :quest, 
      owner: test_user, 
    ) 
  }

  let!(:first_step) { 
    FactoryBot.create(
      :step, 
      quest: test_quest, 
    ) 
  }

  let!(:second_step) { 
    FactoryBot.create(
      :step, 
      quest: test_quest, 
    ) 
  }

  describe "GET#index" do
    it "should return a list of all the steps" do
      get :index, params: { quest_id: test_quest.id }
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
    
      expect(returned_json["steps"].length).to eq 2
      
      expect(returned_json["steps"].first["clue"]).to eq "clue 1"
      expect(returned_json["steps"].first["hint"]).to eq "hint 1"
      expect(returned_json["steps"].first["description"]).to eq "description 1"

      expect(returned_json["steps"].second["clue"]).to eq "clue 2"
      expect(returned_json["steps"].second["hint"]).to eq "hint 2"
      expect(returned_json["steps"].second["description"]).to eq "description 2"
    end
  end
end
