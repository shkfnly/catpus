class Api::HooksController < Api::ApiController

  skip_before_filter :verify_authenticity_token
  
  def create
    board = Board.find(params[:board_id])
    unless params[:zen]
      card = board.cards.find_by(title: params[:head_commit][:message])
      if card
        card.destroy
      end
      board.update(pushed_at: params[:head_commit][:timestamp])
      repo = Repository.find_by(github_id: board.repository_id)
      repo.update(pushed_at: params[:head_commit][:timestamp])
    end
    Pusher['boards'].trigger('webhook-push', {board: board}, request.headers["X-Pusher-Socket-ID"])
    render json: board
  end


end
