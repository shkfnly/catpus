class Api::Boards::HooksController < ApplicationController

  def update
    board = Board.find(params[:board_id])
    board.update(pushed_at: params[:head_commit][:timestamp])
    repo = Repository.find_by(github_id: board.repository_id)
    repo.update(pushed_at: params[:head_commit][:timestamp])
    render json: {}
  end


end
