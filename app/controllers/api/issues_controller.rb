class Api::IssuesController < ApplicationController

  def create
    @issue = current_list.issues.new(issue_params)

    if @issue.save
      render json: @issue
    else
      render json: @issue.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    @issue = current_list.issues.find(params[:id])
    if @issue.update_attributes(issue_params)
      render json: @issue
    else
      render json: @issue.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @issue = Issue.find(params[:id])
    @issue.destroy
    render json: {}
  end

  def show
    @issue = current_list.issues.find(params[:id])
    render :show
  end

  private
    def issue_params
      params.require(:issue).permit(:title, :list_id, :ord)
    end

    def current_list
      if params[:id]
        @issue = Issue.find(params[:id])
        @list = @issue.list
      elsif params[:issue]
        @list = List.find(params[:list][:board_id])
      end
    end
end
