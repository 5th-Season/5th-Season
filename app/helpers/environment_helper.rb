module EnvironmentHelper
  def environment_variables
    env_vars = {
      NODE_ENV: Rails.env,
      MIXPANEL_TOKEN: ENV['MIXPANEL_TOKEN']
    }

    # You can add more environment variables here that you want to expose to the front-end
    # Be careful not to expose sensitive information like API secrets
    
    raw "window.__ENV__ = #{env_vars.to_json};"
  end
end
