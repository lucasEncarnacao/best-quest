require "rails_helper"

RSpec.describe Api::V1::CompletionTimesController, type: :controller do
  let!(:test_user) { FactoryBot.create(:user) }
  let!(:test_quest) { FactoryBot.create(:quest, owner: test_user) }

  describe "POST#create" do
    it "creates a completion time record" do
      sign_in test_user
      prev_count = CompletionTime.count
      post(:create, params: { quest_id: test_quest.id }, as: :json)
      expect(CompletionTime.count).to eq(prev_count + 1)
    end

    it "sets the start_time to the current time" do
      sign_in test_user

      post(:create, params: { quest_id: test_quest.id }, as: :json)
      expect(CompletionTime.last.start_time).to_not eq(nil)
      expect(CompletionTime.last.end_time).to eq(nil)
      expect(CompletionTime.last.sec).to eq(nil)
    end

    it "returns the id of the created record" do
      sign_in test_user

      post(:create, params: { quest_id: test_quest.id }, as: :json)
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      
      expect(returned_json).to be_kind_of(Integer)
      expect(returned_json).to_not be_kind_of(Array)
      expect(returned_json).to eq(CompletionTime.last.id)
    end

    it "does not create a duplicate record if one already exists" do
      sign_in test_user

      prev_count = CompletionTime.count
      post(:create, params: { quest_id: test_quest.id }, as: :json)
      expect(CompletionTime.count).to eq(prev_count + 1)
      post(:create, params: { quest_id: test_quest.id }, as: :json)
      expect(CompletionTime.count).to eq(prev_count + 1)
    end

    it "does not overwrite the start_time of the duplicate record" do
      sign_in test_user

      post(:create, params: { quest_id: test_quest.id }, as: :json)
      old_time = CompletionTime.last.start_time
      sleep(1)
      post(:create, params: { quest_id: test_quest.id }, as: :json)
      expect(CompletionTime.last.start_time).to eq(old_time)
    end
  end

  describe "PATCH#update" do
    let!(:test_time) { FactoryBot.create(:completion_time, user: test_user, quest: test_quest) } 

    it "should add end_time and sec to the current record" do
      prev_count = CompletionTime.count
      patch(:update, params: { id: test_time.id }, as: :json)
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      expect(CompletionTime.count).to eq(prev_count)
      expect(CompletionTime.last.end_time).to_not eq(nil)
      expect(CompletionTime.last.sec).to_not eq(nil)
    end

    it "should return the formatted string for completion time" do
      patch(:update, params: { id: test_time.id }, as: :json)
      returned_json = JSON.parse(response.body)

      expect(returned_json["completion_time"]["formatted_str"]).to eq("00:00:00")
    end
  end
end
