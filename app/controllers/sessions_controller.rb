class SessionsController < ApplicationController
  def new
  end

  def create
    auth = request.env["omniauth.auth"]
    user = User.find_by_provider_and_uid(auth["provider"], auth["uid"]) || User.create_with_omniauth(auth)
    session[:user_id] = user.id
    if user 
      log_in!(user)
      if user.fresh
        cache_repositories
        cache_issues
        user.update(fresh: false)
      end
      flash[:notice] = "Successfully Logged In"
      redirect_to root_url, :notice => "Signed in!"
    else
      flash.now[:errors] = ["Invalid email and/or password"]
      render :new
    end
  end

  def destroy
  
    log_out!(current_user)
    redirect_to root_url, :notice => "Signed out!"
  end
end
