require "rails_helper"

RSpec.describe Api::V1::UsersController, type: :controller do
  let!(:test_user) { FactoryBot.create(:user) }

  describe "POST#create" do
    let!(:post_json) { 
      {
        user: {
          username: "quester",
          password: "password",
        }
      }
    }

    it "creates a new user" do
      prev_count = User.count
      post(:create, params: post_json, as: :json)
      expect(User.count).to eq(prev_count + 1)
    end

    it "returns the json of the newly posted username and token" do  
      post(:create, params: post_json, as: :json)
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      expect(returned_json["username"]).to eq "quester"
      expect(returned_json["jwt_token"]).to be_kind_of(String)
    end

    it "returns errors if the input is not valid" do
      bad_post_json = {
        user: {
          username: "",
          password: "",
        }
      }
  
      post(:create, params: bad_post_json, as: :json)
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      expect(returned_json["errors"]).to eq "Password can't be blank and Username can't be blank"
    end
  end

  describe "POST#sign_in" do
    let!(:post_json) { 
      {
        user: {
          username: "quester",
          password: "password",
        }
      }
    }

    it "returns the json of the verified user and token" do  
      post(:create, params: post_json, as: :json)
      post(:sign_in, params: post_json, as: :json)
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      expect(returned_json["username"]).to eq "quester"
      expect(returned_json["jwt_token"]).to be_kind_of(String)
    end

    it "returns errors if the input is not valid" do
      bad_post_json = {
        user: {
          username: "",
          password: "",
        }
      }
  
      post(:sign_in, params: bad_post_json, as: :json)
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      expect(returned_json["error"]).to eq "Log in failed! Username or password invalid!"
    end
  end

  describe "GET#auto_sign_in" do
    it "returns the signed in user" do
      request.headers['Authorization'] = "Bearer " + JWT.encode({user_id: test_user.id}, ENV["ENCODER_KEY"])
      get :auto_sign_in
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      expect(returned_json["user"]["username"]).to eq test_user.username
    end
  end
end
