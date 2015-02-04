class Api::ListsController < ApplicationController
  before_action :require_contributer!
  def create
    @list = current_repo.lists.new(list_params)
    
    if @list.save
      render json: @list
    else
      render json: @list.errors.full_messages, status: :unprocessable_entity
    end
  end


  def update
    @list = current_repo.lists.find(params[:id])
    if @list.update_attributes(list_params)
      render json: @list
    else
      render json: @list.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @list = List.find(params[:id])
    @list.destroy
    render json: {}
  end

  
  private
    def list_params
      params.require(:list).permit(:repo_id, :title, :ord)
    end

    def current_repo
      if params[:id]
        @list = List.find(params[:id])
        @repo = @list.repo
      elsif params[:list]
        @repo = Repo.find(params[:list][:repo_id])
      end
    end
end
