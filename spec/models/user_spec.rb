require 'rails_helper'

RSpec.describe User, type: :model do
  it { should have_many :quests }

  it { should have_valid(:username).when("Username") }
  it { should_not have_valid(:username).when(nil, "") }

  it { should have_valid(:email).when("email@fake.com") }
  it { should_not have_valid(:email).when(nil, "", "email.com") }
end
