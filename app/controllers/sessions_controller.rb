class SessionsController < ApplicationController
  def new
  end

  def create
    auth = request.env["omniauth.auth"]
    if auth
      user = User.find_by_provider_and_uid(auth["provider"], auth["uid"]) || User.create_with_omniauth(auth)
      session[:user_id] = user.id
      log_in!(user)
      redirect_to user_url(user), :notice => "Signed in!"
    else
      @user = User.find_by_credentials(params[:user][:name].downcase,
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
  end



  def destroy
    log_out!(current_user)
    redirect_to root_url, :notice => "Signed out!"
  end
end
