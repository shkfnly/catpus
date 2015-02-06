class Api::HooksController < ApplicationController

  skip_before_filter :verify_authenticity_token
  
  def create
    board = Board.find(params[:board_id])
    unless params[:zen]
      board.update(pushed_at: params[:head_commit][:timestamp])
      repo = Repository.find_by(github_id: board.repository_id)
      repo.update(pushed_at: params[:head_commit][:timestamp])
    end
    render json: {}
  end


end
