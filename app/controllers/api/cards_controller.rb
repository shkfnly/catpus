class Api::CardsController < ApplicationController
    before_action :require_board_member!

  def create
    @card = current_list.cards.new(card_params)

    if @card.save
      render json: @card
    else
      render json: @card.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    @card = current_list.cards.find(params[:id])
    if @card.update_attributes(card_params)
      render json: @card
    else
      render json: @card.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @card = Card.find(params[:id])
    @card.destroy
    render json: {}
  end

  def show
    @card = current_list.cards.find(params[:id])
    render :show
  end

  private
    def card_params
      params.require(:card).permit(:title, :list_id, :ord)
    end

    def current_list
      if params[:id]
        @card = Card.find(params[:id])
        @list = @card.list
      elsif params[:card]
        @list = List.find(params[:card][:list_id])
      end
    end
end
