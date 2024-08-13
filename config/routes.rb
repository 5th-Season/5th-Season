Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root 'page#index'
  get 'stats', to: 'welcome#stats'
  # get 'collaborate', to: 'welcome#collaborate'

  get '/*path' => 'page#index'
end
