class MessagesController < ApplicationController
  before_action :set_group

  # メインページへ
  def index
    # form_forに使うため
    @message = Message.new
    # グループで投稿されたメッセージ全てが格納されている
    @messages = @group.messages.includes(:user)

    respond_to do |format|
      format.html
      format.json { @new_messages = @messages.where("id > ?", params[:id])} # 取得してきたdata-message-id属性のmessagesテーブルのidよりも大きい場合代入する
    end
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      # {}内はそれぞれのformatの場合の処理を記述する
      respond_to do |format|
        format.html{redirect_to group_messages_path(@group), notice: "メッセージが送信されました"}
        format.json
      end
    else
      # 保存に失敗した場合、indexアクションと同じように。
      @messages = @group.messages.includes(:user)
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
