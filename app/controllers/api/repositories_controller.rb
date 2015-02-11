class Api::RepositoriesController < Api::ApiController
  
  def index
    @repo = Board.find(params[:board_id]).repositories.first
    @repository = current_client.repository("#{current_user.username}/#{@repo.name}")
    render :show
  end

  def show
    repo = Board.find(params[:board_id]).repository
    @repository = current_client.repository("#{current_user.username}/#{repo.name}")
    render :show
  end
end
