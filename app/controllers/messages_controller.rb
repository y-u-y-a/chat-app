class MessagesController < ApplicationController
  before_action :set_group

  # メインページへ
  def index
    # form_forに使うため
    @message = Message.new
    # グループで投稿されたメッセージ全てが格納されている
    @messages = @group.messages.includes(:user)
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      redirect_to group_messages_path(@group), notice: "メッセージが送信されました"
    else
      # 保存に失敗した場合、indexアクションと同じように。
      @messages = @group.message.includes(:user)
      # flashメッセージを表示させる
      flash[:alert] = "メッセージを入力してください"
      # indexビューを表示させる
      render :index
    end
  end

  private

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
    # mergeメソッドはハッシュを結合する、paramsを許可するハッシュとuser_idが格納されたハッシュを結合！
  end

  def set_group
    @group = Group.find(params[:group_id])
    # messages#indexを動かす時のparamsを確認すると、group_idにグループのgroup.idが入っていることがわかる
  end
end
