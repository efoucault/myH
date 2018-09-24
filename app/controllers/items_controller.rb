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
    @user = current_user
    if @item.save
      @item.save!
      redirect_to user_item_path(@user, @item)
    else
      @item.errors.messages
      render "items/new"
    end
  end

  def edit
    @user = User.find(params[:user_id])
    @item = Item.find(params[:id])
  end

  def update
    @user = User.find(params[:user_id])
    @item = Item.find(params[:id])
    @item.update(item_params)
    redirect_to user_item_path(@user, @item)
  end

  def destroy
  end

   private

  def item_params
    params.require(:item).permit(:titre, :note, :commentaire, :age, :artiste, :user_id)
  end

end
