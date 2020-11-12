require 'rails_helper'

RSpec.describe User, type: :model do
  it { should have_many :quests }
  it { should have_many :completion_times }
  it { should have_many :completed_quests }
  it { should have_many :reviews}
  it { should have_many :reviewed_quests }
  
  it { should have_valid(:username).when("Username") }
  it { should_not have_valid(:username).when(nil, "") }
end
