class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user, :logged_in?, :current_client, :current_client_user

  Pusher.app_id = Rails.application.secrets['PUSHER_APP_ID']
  Pusher.key = Rails.application.secrets['PUSHER_APP_KEY']
  Pusher.secret = Rails.application.secrets['PUSHER_APP_SECRET']
  Pusher.url = "http://edff1e92c04899ef664d:63c5f2d44cfbca6f3269@api.pusherapp.com/apps/106133"
  
  def current_user
    return nil if session[:session_token].nil?
    @current_user ||= User.find_by_session_token(session[:session_token])
  end
  
  def current_client
    return nil unless current_user
    @current_client ||= Octokit::Client.new(:access_token => current_user.token)
  end

  def current_client_user
    @current_client_user ||= current_client.user unless current_client.nil?
  end

  def log_in!(user)
    user.reset_session_token!
    session[:session_token] = user.session_token
  end

  def logged_in?
    !!current_user
  end

  def log_out!(user)
    user.reset_session_token!
    session[:session_token] = nil
  end

  def require_login
    redirect_to root_url unless logged_in?
  end

  def cache_repositories
    current_client.repositories.each do |repository|
      repo = Repository.find_by(github_id: repository.id)
      unless repo
        Repository.create(github_id: repository.id,
                          user_id: current_user.id, 
                          name: repository.name, 
                          description: repository.description,
                          url: repository.url,
                          html_url: repository.html_url,
                          pushed_at: repository.pushed_at,
                          full_name: repository.full_name)
      end
    end
  end

  def cache_issues
    current_client.issues(nil, {:filter => "subscribed", :state => "open"}).each do |issue|
      iss = Issue.find_by(github_id: issue.id)
      unless iss 
        Issue.create(
                     github_id: issue.id,
                     url: issue.url,
                     html_url: issue.html_url,
                     number: issue.number,
                     title: issue.title,
                     body: issue.body,
                     user_id: current_user.id,
                     username: issue.user.login,
                     avatar_url: issue.user.avatar_url,
                     user_url: issue.user.html_url,
                     repository_id: issue.repository.id,
                     repository_name: issue.repository.full_name
                     )
      end
    end
  end

  def faraday_stack
    return @stack unless @stack.nil?
    store = ActiveSupport::Cache.lookup_store(:mem_cache_store, ['localhost:11211'])
    stack = Faraday::RackBuilder.new do |builder|
      builder.use Faraday::HttpCache, store: Rails.cache
      builder.use Octokit::Response::RaiseError
      builder.adapter Faraday.default_adapter
    end
    Octokit.middleware = stack
  end
end
