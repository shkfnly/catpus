class Api::IssuesController < Api::ApiController
  
  def index
    board = Board.find(params[:board_id])
    @issues = Issue.where(repository_id: board.repository_id)
    render json: @issues
  end
  

  def create
    @issue = current_client.create_issue(params[:issue][:repository], params[:issue][:title], params[:issue][:body])
    created_issue = Issue.new({github_id: @issue.id,
                               url: @issue.url,
                               html_url: @issue.html_url,
                               number: @issue.number,
                               title: @issue.title,
                               body: @issue.body,
                               user_id: current_user.id,
                               username: @issue.user.login,
                               repository_id: params[:issue][:repository_id],
                               repository_name: params[:issue][:repository],
                               avatar_url: @issue.user.avatar_url,
                               user_url: @issue.user.html_url
                                     })
    if created_issue.save
      render json: created_issue
    else
      render json: created_issue.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy 
    @issue = Issue.find(params[:id])
    current_client.close_issue(params[:repository], params[:number])
    @issue.destroy
    render json: {}
  end
end
