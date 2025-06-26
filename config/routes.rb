Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root 'page#index'
  get 'stats', to: 'welcome#stats'
  # get 'collaborate', to: 'welcome#collaborate'
  
  # Authentication routes
  get 'login', to: 'sessions#new', as: 'login'
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy', as: 'logout'
  
  get 'signup', to: 'users#new', as: 'signup'
  post 'signup', to: 'users#create'

  # API routes for React onboarding flow
  namespace :api do
    post 'onboarding/username', to: 'onboarding#username'
    post 'onboarding/product_type', to: 'onboarding#product_type'
    post 'onboarding/production_style', to: 'onboarding#production_style'
    post 'onboarding/designer_role', to: 'onboarding#designer_role'
    post 'onboarding/brand_attributes', to: 'onboarding#brand_attributes'
    post 'onboarding/brand_info', to: 'onboarding#brand_info'
    post 'onboarding/location', to: 'onboarding#location'
    post 'onboarding/collaboration', to: 'onboarding#collaboration'
    get 'onboarding/designer_profile', to: 'onboarding#designer_profile'
    get 'onboarding/current_user_info', to: 'onboarding#current_user_info'
    
    # Designer profile API endpoint
    get 'designers/:id', to: 'designers#show'
    get 'designers/check_current_user', to: 'designers#check_current_user'
    
    # Collections API
    resources :collections, only: [:show, :create, :update, :destroy]
    get 'designers/:designer_username/collections', to: 'collections#index'
    
    # Designs API
    resources :designs, only: [:show, :create, :update, :destroy]
    get 'collections/:collection_id/designs', to: 'designs#index'
    get 'designers/:designer_username/designs', to: 'designs#index'
  end

  # Catch-all route for SPA - React will handle all profile routes and onboarding
  get '/*path' => 'page#index'
end
