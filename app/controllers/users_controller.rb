class UsersController < ApplicationController

  # インクリメンタルサーチの検索一覧
  def index
    if params[:keyword] != ""
      @users = User.where("nickname LIKE ?", "%#{params[:keyword]}%")
    end
    respond_to do |format|
      format.html
      format.json
    end
  end

  # user編集ページへ(ログアウト)
  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:nickname, :email)
  end
end
