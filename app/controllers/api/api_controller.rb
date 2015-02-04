class Api::ApiController < ApplicationController
  before_action :require_login

  def require_contributer!
    redirect_to new_session_url unless current_repo.is_member?(current_user)
  end
end
