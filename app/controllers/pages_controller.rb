class PagesController < ApplicationController
  def index
    redirect_to landing_url unless logged_in?
    # redirect_to "/#/users/#{current_user.id}" unless current_user.fresh
  end

  def about
  end

  def landing

  end
  
end
