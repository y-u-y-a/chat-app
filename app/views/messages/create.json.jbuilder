json.user_nickname      @message.user.nickname
json.created_at         @message.created_at.strftime("%Y/%m/%d %H:%M")
json.content            @message.content
json.image              @message.image.url
# 左側はアンダースコアで！メソッドではないから！
# コントローラから帰ってくるのは、@message
