class Api::BoardsController < ApplicationController
  
  def new
    render :new
  end

  def create
    @board = current_user.boards.new(board_params)
    if @board.save
      repo = Repository.find_by(github_id: @board.repository_id)
      repo.update(board_id: @board.id)
      current_client.create_hook("#{repo.full_name}/", 'web', {
          :url => "https://catpus.herokuapp.com/api/boards/#{@board.id}/hooks",
          :content_type => 'json'
        },
        {
          :events => ['push', 'pull_request', 'create', 'issues'],
          :active => true
        }
      )
      render json: @board
    else
      render json: @board.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @board = current_user.boards.find(params[:id])
    @board.destroy
    render json: {}
  end

  def index
    @boards = current_user.boards
    render json: @boards
  end

  def show
    @board = Board.includes(:members, lists: :issues).find(params[:id])

    if @board.is_member?(current_user)
      render :show
    else
      render json: ["You aren't a contributer to this repository"], status: 403
    end
  end
private
  def board_params
    params.require(:board).permit(:user_id, :title, :repository_url, :repository_id, :repository_name, :pushed_at)
  end
end
