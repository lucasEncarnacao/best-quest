require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "user#{n}@example.com" }
    password { 'password' }
    password_confirmation { 'password' }
    sequence(:username) { |n| "username_#{n}" }
  end

  factory :quest do
    sequence(:name) { |n| "Quest #{n}" }
    category { 'art' }
    description { 'this is a description' }
  end

  factory :step do
    sequence(:step_num) { |n| n }
    lat { 10.11 }
    lng { 11.12 }
    sequence(:clue) { |n| "clue #{n}" }
    sequence(:hint) { |n| "hint #{n}" }
    sequence(:description) { |n| "description #{n}" }
  end

  factory :review do
    rating { 5 }
    comment { 'this is a comment' }
  end

  factory :completion_time do
    start_time { Time.now }
  end
end
