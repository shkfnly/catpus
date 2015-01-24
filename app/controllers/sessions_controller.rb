class SessionsController < ApplicationController
  def new
  end

  def create
    @user = User.find_by_credentials(params[:user][:username].downcase,
                                     params[:user][:password])
    if @user
      log_in!(@user)
      flash[:notice] = "Successfully Logged In"
      redirect_to user_url(@user)
    else
      flash.now[:errors] = ["Invalid email and/or password"]
      render :new
    end
  end

  def destroy
    log_out!(current_user)
    redirect_to new_session_url
  end
end
