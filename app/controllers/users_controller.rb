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
    @user = User.find_by(username: params[:user][:login])
    unless @user || !@user_attribs
      @new_user = User.new({uid: @user_attribs.id,
                            name: @user_attribs.name,
                            email: @user_attribs.email,
                            username: @user_attribs.login
                            })
      if @new_user.save
        board.find_by(repository_id: params[:user][:repository_id])
      end
    end
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
