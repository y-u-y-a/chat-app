class MessagesController < ApplicationController
  before_action :set_group, only: [:index]

  # メインページへ
  def index
  end

  private
  def set_group
    @group = Group.find(params[:group_id])
    # messages#indexを動かす時のparamsを確認すると、group_idにグループのgroup.idが入っていることがわかる
  end
end
