Rails.application.config.middleware.use OmniAuth::Builder do 
  provider :github, Rails.application.secrets['GITHUB_KEY'], Rails.application.secrets['GITHUB_SECRET'], scope: "user,public_repo,repo,repo:status,read:org,admin:repo_hook"
end