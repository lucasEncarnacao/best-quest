require 'rails_helper'

RSpec.describe Lobby, type: :model do
  it { should belong_to :quest }
  
  it { should have_valid(:code).when("AHGE") }
  it { should_not have_valid(:code).when(nil, "") }

  it { should have_valid(:step_num).when(1) }
  it { should_not have_valid(:step_num).when(nil, "") }
end
