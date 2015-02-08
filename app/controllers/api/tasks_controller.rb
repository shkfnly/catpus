class Api::TasksController < ApplicationController
  def create
    @tasks = task.new(task_params)

    if @tasks.save
      render json: @tasks
    else
      render json: @tasks.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    @task = task.find(params[:id])

    if @task.update(task_params)
      render json: @task
    else
      render json: @task.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @task = task.find(params[:id])
    @task.destroy
    render json: {}
  end

  private

  def task_params
    params.require(:task).permit(:done, :title, :card_id)
  end
end
