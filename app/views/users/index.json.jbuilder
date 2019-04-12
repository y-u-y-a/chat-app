# 配列から１つずつ取り出す記述
json.array! @users do |user|
  json.id               user.id
  json.nickname         user.nickname
end
