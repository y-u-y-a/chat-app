Rails.application.routes.draw do
  devise_for :users
  root "groups#index"

  resources :groups,   only: [:index, :new]
  resources :messages, only: [:index]
  resources :users,    only: [:edit]

end
