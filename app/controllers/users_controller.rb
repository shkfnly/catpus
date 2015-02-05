class UsersController < ApplicationController
  
  before_action :require_login
  
  def show
    @user = current_user
    render :show
  end

  def new
    @user = User.new
  end
  
  # def create
  #   params[:user][:name]= params[:user][:name].downcase
  #   @user = User.new(user_params)
  #   if @user.save
  #     flash[:notice] = "Successfully Created User"
  #     log_in!(@user)
  #     redirect_to user_url(@user)
  #   else
  #     flash.now[:errors] = @user.errors.full_messages
  #     render :new
  #   end
  # end

  def edit
    @user = User.find(current_user.id)
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
  
  private
    def user_params
      params.require(:user).permit(:name, :email, :password)
    end
end
