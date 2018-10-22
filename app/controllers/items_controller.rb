class ItemsController < ApplicationController
  def index
    @items = Item.all
  end

  def show
    @user = User.find(params[:user_id])
    @item = Item.find(params[:id])
  end

  def new
    @item = Item.new
    @user = current_user
  end

  def create
    @item = Item.new(item_params)
    @item.user = current_user
    @item.save!
    redirect_to user_item_path(@item.user, @item)
  end

  def edit
    @item = Item.find(params[:id])
    @item.user = User.find(params[:user_id])
  end

  def update
    @item = Item.find(params[:id])
    @item.update(item_params)
    redirect_to user_item_path(@item.user, @item)
  end

  def destroy
  end

   private

  def item_params
    params.require(:item).permit(:titre, :note, :commentaire, :age, :artiste, :user_id, :photo, :categorie, :description)
  end

end
