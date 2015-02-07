class Api::ApiController < ApplicationController
  before_action :require_login

  def require_board_member!
    redirect_to '/#dashboard' unless current_board.is_member?(current_user)
  end
end
