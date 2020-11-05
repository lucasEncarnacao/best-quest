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

  describe "POST#create" do
    let!(:post_json) { 
      {
        quest: {
          name: "Quest Name",
          category: "art",
          description: "This quest is so cool",
        },
        steps: [
          {
            lat: 10.123,
            lng: 10.321,
            clue: "This is the clue",
            hint: "Here's a hint",
            description: "This is a cool spot",
          },
          {
            lat: 20.123,
            lng: 30.321,
            clue: "This is the second clue",
            hint: "Here's a second hint",
            description: "This is another cool spot",
          },
        ]
      }
    }

    it "creates a new quest with all steps" do
      sign_in test_user
      prev_count = Quest.count
      post(:create, params: post_json, format: :json)
      expect(Quest.count).to eq(prev_count + 1)
    end

    it "returns the json of the newly posted quest" do
      sign_in test_user
  
      post(:create, params: post_json, format: :json)
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
          quest: {
            name: "",
            category: "",
            description: "",
          },
          steps: [
            {
              lat: "",
              lng: "",
              clue: "",
              hint: "",
              description: "",
            },
          ]
        }

        sign_in test_user
    
        post(:create, params: bad_post_json, format: :json)
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
          quest: {
            name: "Name",
            category: "art",
            description: "description",
          },
          steps: [
            {
              lat: "",
              lng: "",
              clue: "",
              hint: "",
              description: "",
            },
          ]
        }

        sign_in test_user
    
        post(:create, params: bad_post_json, format: :json)
        returned_json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(response.content_type).to eq("application/json")
        
        expect(returned_json).to be_kind_of(Hash)
        expect(returned_json).to_not be_kind_of(Array)
        expect(returned_json["errors"]).to eq "Lat is not a number, Lng is not a number, Clue can't be blank, Hint can't be blank, and Description can't be blank"
      end
    end
  end
end
