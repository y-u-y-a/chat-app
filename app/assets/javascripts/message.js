// HTMLを読み込んで関数を実行する
// readeyメソッドとは、DOMを完全に読み込んでから、という意味
$(document).ready(function(){

  function buildSendMessageHTML(message){
    if (message.image !== null){
      var img = `<img src="${message.image}">`
    }else{
      var img = ""
    }
    var html = `<div class = "message">
                  <div class = "message-top">
                    <div class = "message-top__name">${message.user_nickname}</div>
                    <div class = "message-top__date">${message.created_at}</div>
                  </div>
                  <div class = "message-bottom">
                    <div class = "message-bottom__text">${message.content}</div>
                    <div class = "message-bottom__image">${img}</div>
                  </div>
                </div>`
    return html;
  }
// ⬇︎メッセージ機能の非同期化
//1.フォームが送信されたら、第一引数にイベント名、第二引数に発火した後の処理(関数)
  $("#message-form").on("submit", function(e){
    e.preventDefault();
// 2.イベントが発火したら、ajaxを利用してmessage#createが動くようにする
    // action属性の値はURL、検証で確認する
    var url = $(this).attr("action")
    // フォームに入力されたデータを取得する
    var formData = new FormData(this);
// 3.ajax通信を開始する
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    // ajax通信に成功した場合の処理
    .done(function(message){
      var html = buildSendMessageHTML(message);
      $(".messages").append(html);
      // 送信後に入力部分をリセットする、[0]がないとエラーになる！
      $("form")[0].reset();
      // 連続クリック防止を無効にする(連続投稿を可能にする)
      $("#submit").prop("disabled", false);
      // 最下部に自動スクロール
      $(".messages").animate({scrollTop:$(".messages")[0].scrollHeight}, "fast");
    })
    // ajax通信に失敗した場合の処理
    .fail(function(){
      alert("エラーです");
    })
  });
});
