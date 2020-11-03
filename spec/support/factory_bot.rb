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
  end

  factory :step do
    sequence(:step_num) { |n| n }
    lat { 10.11 }
    lng { 11.12 }
    clue { "this is a clue" }
    hint { "this is a hint" }
    description { "this is a description" }
  end
end
