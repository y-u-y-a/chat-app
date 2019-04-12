$(document).ready(function(){

  // (追加)の部分
  // userのidやnicknameを取得するためにカスタムデータ属性を使用する
  // htmlを完璧にすることでフォーム送信によってgroups#createが動き、ユーザーが登録される
  function showUser(user){
    var html = `<div class = "chat-group-user">
                  <input name = "group[user_ids][]" type = "hidden" value = ${user.id}>
                  <p class="chat-group-user__nickname">${user.nickname}</p>
                  <a class = "user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id = "${user.id}" data-user-nickname = "${user.nickname}">追加</a>
                </div>`
    $("#user-search-result").append(html);
  }
  // 見つからなかった場合
  function showNoUser(user){
    var html = `<div class = "chat-group-user">
                  <p class="chat-group-user__nickname">${user}</p>
                </div>`
    $("#user-search-result").append(html);
  }
  // (削除)の部分
  function addUser(user_id,user_nickname){
    var html = `<div class = "chat-group-user">
                  <input name = "group[user_ids][]" type = "hidden" value = ${user_id}>
                  <p class="chat-group-user__nickname">${user_nickname}</p>
                  <a class = "user-search-remove chat-group-user__btn chat-group-user__btn--remove">削除</a>
                </div>`
    $("#chat-group-users").append(html);
  }


  // 1.一文字でも入力が終わったらイベント発火させる
  $("#user-search-field").on("keyup",function(e){
  // 2.users#indexで入力データを元に検索をさせ、ユーザーを一覧表示させる
    e.preventDefault();
    // 入力データを取得する
    var input = $(this).val();
  // 3.入力するたびにajax通信をする
    $.ajax({
      url: "/users",
      type: "GET",
      data: {keyword: input},  // keywordをキーとして送信する
      dataType: "json"
    })
  // 4.帰ってきたjsonデータを用いてビューを変更する
    .done(function(users){
      // 次の検索が始まったら、前の検索結果を削除する
      $("#user-search-result").empty();
      if (users.length !== 0){
        users.forEach(function(user){
          showUser(user);
        });
      }else{
        showNoUser("一致するユーザーが見つかりません");
      }
    })
    .fail(function(){
      alert("エラーです");
    })
  });

  // 動的に現れた要素に対するイベントを設定する
  // 5.(追加)の要素の追加
  $(document).on("click", ".chat-group-user__btn--add", function(){
    // 個々のユーザーのidとnicknameの取得の一例
    var user_id = $(this).attr("data-user-id");
    var user_nickname = $(this).attr("data-user-nickname");
    addUser(user_id,user_nickname);
    $(this).parent().remove();
  });
  // 6.(削除)の要素の削除
  $(document).on("click", ".chat-group-user__btn--remove", function(){
    $(this).parent().remove();
  });
});
