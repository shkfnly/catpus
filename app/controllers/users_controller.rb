class UsersController < ApplicationController
  
  # before_action :require_login
  
  def show
    @user = current_user
    render :show
  end

  def new
    @user = User.new
  end

  def edit
    @user = User.find(current_user.id)
  end

  def create
    @user_attribs = current_client.user(params[:user][:login])
    render json: {} unless @user_attribs
    @user = User.find_by(username: params[:user][:login])
    unless @user
      @user = User.create({uid: @user_attribs.id,
                            name: @user_attribs.name,
                            email: @user_attribs.email,
                            username: @user_attribs.login
                            })
    end
    board = Board.find_by(repository_id: params[:user][:repository_id])
    BoardMembership.create({user_id: @user.id, board_id: board.id})
    current_client.add_collab(params[:user][:repository_name], @user.username)
    render json: @user
  end

  def update
    @user = User.find(current_user.id)
    if @user.update(user_params)
      flash[:notice] = "Successfully Updated User"
      redirect_to user_url(@user)
    else
      flash.now[:errors] = @user.errors.full_messages
      render :edit
    end
  end
  
  def destroy
    @user = User.find(current_user.id)
    @user.destroy
    redirect_to new_user_url
  end
end
