require 'rails_helper'

RSpec.describe Review, type: :model do
  it { should belong_to :user }
  it { should belong_to :quest }
  
  it { should have_valid(:rating).when(1) }
  it { should_not have_valid(:rating).when(nil, "", 0, 6) }
end
