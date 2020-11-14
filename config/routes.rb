Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'homes#index'

  get '/how-to-play', to: 'homes#index'
  get '/quests', to: 'homes#index'
  get '/quests/:id', to: 'homes#index'
  get '/quests/:id/active', to: 'homes#index'
  get '/quests/:id/complete', to: 'homes#index'
  get '/users/sign_up', to: 'homes#index'
  get '/users/sign_in', to: 'homes#index'

  namespace :api do 
    namespace :v1 do      
      resources :completion_times, only: [:update]
      resources :check_locs, only: [:create]
      resources :lobbies, only: [:show]
      
      resource :users, only: [:create] do
        get 'auto_sign_in'
        post 'sign_in'
      end
      
      resources :quests, only: [:index, :show, :create] do
        resources :steps, only: [:index]
        resources :reviews, only: [:create]
        resources :completion_times, only: [:create]
        resources :lobbies, only: [:create]
      end
    end
  end
end
