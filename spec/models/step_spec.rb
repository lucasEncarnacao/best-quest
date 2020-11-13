require 'rails_helper'

RSpec.describe Step, type: :model do
  subject { Step.new(step_num: 1, quest_id: 1, lat: 1, lng: 1, answer: "answer", clue: "clue", hint: "hint", description: "description") }

  it { should belong_to :quest }

  it { should have_valid(:step_num).when(1, 2, 3) }
  it { should_not have_valid(:step_num).when(nil, "") }
  
  it { should have_valid(:lat).when(10, 10.111, 47.317841) }
  it { should_not have_valid(:lat).when(nil, "", "number") }

  it { should have_valid(:lng).when(10, 10.111, 47.317841) }
  it { should_not have_valid(:lng).when(nil, "", "number") }
  
  it { should have_valid(:answer).when("this is a answer") }
  it { should_not have_valid(:answer).when(nil, "") }

  it { should have_valid(:clue).when("this is a clue") }
  it { should_not have_valid(:clue).when(nil, "") }

  it { should have_valid(:hint).when("this is a hint") }
  it { should_not have_valid(:hint).when(nil, "") }

  it { should have_valid(:description).when("this is a description") }
  it { should_not have_valid(:description).when(nil, "") }

  it { should validate_uniqueness_of(:step_num).scoped_to(:quest_id) }
end
