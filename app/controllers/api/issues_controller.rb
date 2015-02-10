class Api::IssuesController < Api::ApiController
  
  def destroy 
    current_client.close_issue(params[:repository], params[:github_id])
    render json: {}
  end
end
