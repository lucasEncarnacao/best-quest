require 'rails_helper'

RSpec.describe Quest, type: :model do
  it { should belong_to :owner }
  it { should have_many :steps }

  it { should have_valid(:category).when("misc", "art", "history", "food") }
  it { should_not have_valid(:category).when(nil, "") }
end
