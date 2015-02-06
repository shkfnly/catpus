class Api::HooksController < ApplicationController

  skip_before_filter :verify_authenticity_token
  
  def create
    board = Board.find(params[:board_id])
    board.update(pushed_at: params[:repository][:pushed_at])
    repo = Repository.find_by(github_id: board.repository_id)
    repo.update(pushed_at: params[:repository][:pushed_at])
    render json: {}
  end


end
