class Api::IssuesController < Api::ApiController
  
  def index
    board = Board.find(params[:board_id])
    @issues = Issue.find_by(repository_id: board.repository_id)
    render json: @issues
  end
  
  def destroy 
    @issue = Issue.find(params[:id])
    current_client.close_issue(params[:repository], params[:number])
    @issue.destroy
    render json: {}
  end
end
