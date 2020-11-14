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

      expect(returned_json["quest"].length).to eq 8
      expect(returned_json["quest"]["name"]).to eq "Quest 1"
      expect(returned_json["quest"]["category"]).to eq "art"
      expect(returned_json["quest"]["description"]).to eq "Description 1"
      expect(returned_json["quest"]["owner"]["username"]).to eq test_user.username
      expect(returned_json["quest"]["reviews"]).to be_kind_of(Array)
    end
  end

  describe "POST#create" do
    let!(:post_json) { 
      {
        name: "Quest Name",
        category: "art",
        description: "This quest is so cool",
        lat_0: 10.123,
        lng_0: 10.321,
        answer_0: "This is the answer",
        clue_0: "This is the clue",
        hint_0: "Here's a hint",
        description_0: "This is a cool spot",
        lat_1: 20.123,
        lng_1: 30.321,
        answer_1: "This is the second answer",
        clue_1: "This is the second clue",
        hint_1: "Here's a second hint",
        description_1: "This is another cool spot",
      }
    }

    it "creates a new quest with all steps" do
      request.headers['Authorization'] = "Bearer " + JWT.encode({ user_id: test_user.id }, ENV["ENCODER_KEY"])
      prev_count = Quest.count
      post(:create, params: post_json, as: :json)
      expect(Quest.count).to eq(prev_count + 1)
    end

    it "returns the json of the newly posted quest" do
      request.headers['Authorization'] = "Bearer " + JWT.encode({ user_id: test_user.id} , ENV["ENCODER_KEY"])  
      post(:create, params: post_json, as: :json)
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      expect(returned_json["quest"]["name"]).to eq "Quest Name"
      expect(returned_json["quest"]["category"]).to eq "art"
      expect(returned_json["quest"]["description"]).to eq "This quest is so cool"
    end

    context "User doesn't input quest info" do
      it "returns errors if the input is not valid" do
        bad_post_json = {
          name: "",
          category: "",
          description: "",
          lat_0: "",
          lng_0: "",
          answer_0: "",
          clue_0: "",
          hint_0: "",
          description_0: "",
        }

        request.headers['Authorization'] = "Bearer " + JWT.encode({user_id: test_user.id}, ENV["ENCODER_KEY"])
        post(:create, params: bad_post_json, as: :json)
        returned_json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(response.content_type).to eq("application/json")
        
        expect(returned_json).to be_kind_of(Hash)
        expect(returned_json).to_not be_kind_of(Array)
        expect(returned_json["errors"]).to eq "Name can't be blank, Category can't be blank, and Description can't be blank"
      end
    end

    context "User doesn't input steps info" do
      it "returns errors if the input is not valid" do
        bad_post_json = {
          name: "Name",
          category: "art",
          description: "description",
          lat_0: "",
          lng_0: "",
          clue_0: "",
          hint_0: "",
          description_0: "",
        }

        request.headers['Authorization'] = "Bearer " + JWT.encode({user_id: test_user.id}, ENV["ENCODER_KEY"])
        post(:create, params: bad_post_json, as: :json)
        returned_json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(response.content_type).to eq("application/json")
        
        expect(returned_json).to be_kind_of(Hash)
        expect(returned_json).to_not be_kind_of(Array)
        expect(returned_json["errors"]).to eq "Lat is not a number, Lng is not a number, Answer can't be blank, Clue can't be blank, Hint can't be blank, and Description can't be blank"
      end
    end
  end
end
