class PagesController < ApplicationController
  def index
    redirect_to landing_url unless logged_in?
  end

  def about
  end

  def landing

  end
  
end
