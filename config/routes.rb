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
    post 'onboarding/personal_info', to: 'onboarding#personal_info'
    post 'onboarding/brand_info', to: 'onboarding#brand_info'
    post 'onboarding/location', to: 'onboarding#location'
    post 'onboarding/collaboration', to: 'onboarding#collaboration'
    get 'onboarding/designer_profile', to: 'onboarding#designer_profile'
    get 'current_user', to: 'onboarding#current_user_info'
    
    # Designer profile API endpoint
    get 'designers/:id', to: 'designers#show'
    
    # Collections API
    resources :collections, only: [:show, :create, :update, :destroy]
    get 'designers/:designer_username/collections', to: 'collections#index'
    
    # Designs API
    resources :designs, only: [:show, :create, :update, :destroy]
    get 'collections/:collection_id/designs', to: 'designs#index'
    get 'designers/:designer_username/designs', to: 'designs#index'
  end

  # Legacy onboarding routes (can be removed once React flow is fully implemented)
  get 'onboarding', to: 'onboarding#start', as: 'onboarding_start'
  get 'onboarding/username', to: 'onboarding#username', as: 'onboarding_username'
  post 'onboarding/username', to: 'onboarding#username'
  get 'onboarding/product_type', to: 'onboarding#product_type', as: 'onboarding_product_type'
  post 'onboarding/product_type', to: 'onboarding#product_type'
  get 'onboarding/personal_info', to: 'onboarding#personal_info', as: 'onboarding_personal_info'
  post 'onboarding/personal_info', to: 'onboarding#personal_info'
  get 'onboarding/brand_info', to: 'onboarding#brand_info', as: 'onboarding_brand_info'
  post 'onboarding/brand_info', to: 'onboarding#brand_info'
  get 'onboarding/location', to: 'onboarding#location', as: 'onboarding_location'
  post 'onboarding/location', to: 'onboarding#location'
  get 'onboarding/collaboration', to: 'onboarding#collaboration', as: 'onboarding_collaboration'
  post 'onboarding/collaboration', to: 'onboarding#collaboration'
  get 'onboarding/complete', to: 'onboarding#complete', as: 'onboarding_complete'
  
  # Designer profile route - COMMENTED OUT to let React handle profile routes
  # get ':slug', to: 'designers#show', as: 'designer'

  # Catch-all route for SPA - React will handle all profile routes
  get '/*path' => 'page#index'
end
