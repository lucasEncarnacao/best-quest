require 'rails_helper'

RSpec.describe CompletionTime, type: :model do
  it { should belong_to :user }
  it { should belong_to :quest }
  
  it { should have_valid(:sec).when(3000) }
  it { should_not have_valid(:sec).when(-1) }

  describe "#formatted_str" do
    let!(:test_user) { FactoryBot.create(:user) }
    let!(:test_quest) { FactoryBot.create(:quest, owner: test_user) }
    let!(:test_time) { 
      FactoryBot.create(
        :completion_time, 
        user: test_user, 
        quest: test_quest,
        sec: 9743
      ) 
    }
    
    it "should return the completion time in the format of HH:MM:SS" do
      expect(test_time.formatted_str).to eq("02:42:23")
    end
  end
end
