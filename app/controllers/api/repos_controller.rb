class Api::ReposController < ApplicationController
  def new
    render :new
  end


  def create
    @repo = current_user.repos.new(repo_params)

    if @repo.save
      render json: @repo
    else
      render json: @repo.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @repo = current_user.repos.find(params[:id])
    @repo.destroy
    render json: {}
  end

  def index
    @repos = current_user.repos
    render json: @repos
  end

  def show
    @repo = repo.includes(:members, lists: :issues).find(params[:id])

    if @repo.is_member?(current_user)
      render :show
    else
      render json: ["You aren't a member of this repo"], status: 403
    end
  end
private
  def repo_params
    params.require(:repo).permit(:user_id, :title, :repository_url, :repository_id)
  end
end
