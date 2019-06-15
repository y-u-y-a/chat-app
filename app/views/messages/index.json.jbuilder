if @new_messages.present? # @new_messageに中身があれば
  json.array!  @new_messages do |message| # 複数の最新メッセージがあるかもしれないので、配列形式から抜き出す
    json.id                  message.id
    json.user_nickname           message.user.nickname
    json.created_at          message.created_at.strftime("%Y/%m/%d %H:%M")
    json.content             message.content
    json.image               message.image.url
  end
end
