require 'rails_helper'

RSpec.describe CompletionTime, type: :model do
  it { should belong_to :user }
  it { should belong_to :quest }
  
  it { should have_valid(:sec).when(3000) }
  it { should_not have_valid(:sec).when(nil, "", -1) }
end
