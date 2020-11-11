require 'rails_helper'

RSpec.describe Quest, type: :model do
  subject { Quest.new(user_id: 1, name: "Quest Name", category: "art", description: "description") }
  
  it { should belong_to :owner }
  it { should have_many :steps }
  it { should  have_many :completion_times }
  it { should have_many :conquerers }
  it { should  have_many :reviews }
  it { should have_many :reviewers }
  it { should have_many :lobbies }

  it { should have_valid(:name).when("Quest Name") }
  it { should_not have_valid(:name).when(nil, "") }
  it { should validate_uniqueness_of(:name) }

  it { should have_valid(:category).when("misc", "art", "history", "food") }
  it { should_not have_valid(:category).when(nil, "") }

  it { should have_valid(:description).when("This is a description") }
  it { should_not have_valid(:description).when(nil, "") }
end
