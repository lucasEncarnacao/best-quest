Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'homes#index'

  get '/quests', to: 'homes#index'

  namespace :api do 
    namespace :v1 do
      resources :quests, only: [:index]
    end
  end
end
