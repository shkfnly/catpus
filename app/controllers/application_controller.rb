class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user, :logged_in?, :current_client, :current_client_user

  def current_user
    return nil if session[:session_token].nil?
    User.find_by_session_token(session[:session_token])
  end
  
  def current_client
    return nil unless current_user
    curr_client ||= Octokit::Client.new(:access_token => current_user.token)
  end

  def current_client_user
    user ||= current_client.user unless current_client.nil?
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
    redirect_to root_url unless current_user
  end
end
