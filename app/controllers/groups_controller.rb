class GroupsController < ApplicationController
  before_action :group_params, only: [:create, :update]
  before_action :set_group, only: [:edit, :update]

  # rootのページへ
  def index
  end

  # グループ新規作成ページへ
  def new
    @group = Group.new
    # ここでグループ作成者をグループに入れる
    @group.users << current_user
  end

# 作成完了ページ表示
  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path, notice: "グループを作成しました"
    else
      render :new
    end
  end

# 編集ページへ
  def edit
  end

# 更新完了ページ表示
  def update
    if @group.update(group_params)
      redirect_to group_messages_path(@group), notice: "グループを編集しました！"
    else
      render :edit
    end
  end

  private

  def group_params
    params.require(:group).permit(:name, user_ids: [])
    # groupsテーブルの外部キーであるuser_idを配列形式で取得してきたものをを許可する、という意味
  end

  def set_group
    # パスで送られてきたidを取得する
    @group = Group.find(params[:id])
  end


end
