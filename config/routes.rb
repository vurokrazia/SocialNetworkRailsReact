Rails.application.routes.draw do
  resources :posts
  devise_for :users, controllers: {
  	sessions: "authentication/sessions",
  	registrations: "authentication/registrations"
  }
  get 'main/home'
  authenticated :user do
	  root 'main#dashboard', as: :authenticated_root
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'main#home'
end
