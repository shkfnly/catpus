Rails.application.config.middleware.use OmniAuth::Builder do 
  provider :github, Rails.application.secrets['GITHUB_KEY'], Rails.application.secrets['GITHUB_SECRET'], scope: "user,repo,read:org,admin:repo_hook,notifications"
end