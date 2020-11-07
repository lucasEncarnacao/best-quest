Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'homes#index'

  get '/quests', to: 'homes#index'
  get '/quests/:id', to: 'homes#index'
  get '/quests/:id/active', to: 'homes#index'
  get '/quests/:id/complete', to: 'homes#index'

  namespace :api do 
    namespace :v1 do
      resources :quests, only: [:index, :show, :create] do
        resources :steps, only: [:index]
        resources :reviews, only: [:create]
        resources :completion_times, only: [:create]
      end

      resources :completion_times, only: [:update]
      resources :check_locs, only: [:create]
    end
  end
end
