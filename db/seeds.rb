u1 = User.find_or_initialize_by(username: "quester", email: "user@fake.com")
u1.password =  ENV["USER_PASSWORD"]
u1.save!

q1 = Quest.find_or_create_by!(name: "Quest 1", category: "art", description: "description 1", owner: u1)
q2 = Quest.find_or_create_by!(name: "Quest 2", category: "food", description: "description 2", owner: u1)

s1 = Step.find_or_create_by!(
  quest: q1,
  step_num: 1,
  lat: 10,
  lng: 10,
  clue: "test clue",
  hint: "test hint",
  description: "this is a test description" 
)

s2 = Step.find_or_create_by!(
  quest: q1,
  step_num: 2,
  lat: 11,
  lng: 11,
  clue: "test clue 2",
  hint: "test hint 2",
  description: "this is a test description 2" 
)

s3 = Step.find_or_create_by!(
  quest: q1,
  step_num: 3,
  lat: 10,
  lng: 10,
  clue: "test clue 3",
  hint: "test hint 3",
  description: "this is a test description 3" 
)

s1 = Step.find_or_create_by!(
  quest: q2,
  step_num: 1,
  lat: 10,
  lng: 10,
  clue: "test clue",
  hint: "test hint",
  description: "this is a test description" 
)

s2 = Step.find_or_create_by!(
  quest: q2,
  step_num: 2,
  lat: 11,
  lng: 11,
  clue: "test clue 2",
  hint: "test hint 2",
  description: "this is a test description 2" 
)

s3 = Step.find_or_create_by!(
  quest: q2,
  step_num: 3,
  lat: 10,
  lng: 10,
  clue: "test clue 3",
  hint: "test hint 3",
  description: "this is a test description 3" 
)
