// HTMLを読み込んで関数を実行する
// readyメソッドとは、DOMを完全に読み込んでから、という意味
$(document).ready(function(){

  // 投稿するメッセージのHTMLを構築する関数
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
  $("#message-form").on("submit", function(e){ //1.第一引数にイベント名(フォームが送信されたら)、第二引数に発火した後の処理(関数)
    e.preventDefault();
    var url = $(this).attr("action") // 2.イベントが発火したら、ajaxを利用してmessage#createが動くようにする(action属性の値はURL、検証で確認する)
    var formData = new FormData(this); // 3.フォームに入力されたデータを取得する

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    // ajax通信が成功したら、HTMLをappendする
    .done(function(message){
      var html = buildSendMessageHTML(message);
      $(".messages").append(html);
      $("form")[0].reset(); // 送信後に入力部分をリセットする、[0]がないとエラーになる！
      $("#submit").prop("disabled", false); // 連続クリック防止を無効にする(連続投稿を可能にする)
      $(".messages").animate({scrollTop:$(".messages")[0].scrollHeight}, "fast"); // 最下部に自動スクロール
    })
    // ajax通信に失敗したら、エラー表示
    .fail(function(){
      alert("エラーです");
    })
  });
// =============================================================================

  // ⬇自動更新の際にコントローラからJSON形式で帰ってきたデータが代入される関数
  function buildNewMessageHTML(newMessage) {
    var img = (newMessage.image !== null) ? `<img src="${newMessage.image}">` : ""; // 三項演算子で記述
    var html = `<div class="message" data-message_id=${newMessage.id}>
                  <div class="message-top">
                    <div class="message-top__name">${newMessage.user_nickname}</div>
                    <div class="message-top__date">${newMessage.created_at}</div>
                  </div>
                  <div class="message-bottom">
                    <div class="message-bottom__text">${newMessage.content}</div>
                  </div>
                  <div class="message-bottom">
                    <div class="message-bottom__image">${img}</div>
                  </div>
                </div>`
    $(".messages").append(html)
  }


// ⬇︎はチャット画面の自動更新に関する処理
  function autoApdate(){ // 今表示されている最新のメッセージよりも最新のメッセージがあれば、そのdata-id属性を取得する
    if($(".message")[0]){ // messageクラスの要素の１つ目を表す(配列とみなしてindex番号を使う)
      var message_id = $(".message:last").data("message_id"); // 指定したクラスの最後の要素(最新の要素)のdata-message-id属性の値を取得する(htmlでmessage.idが格納されている)
    } else {
      var message_id = 0 // message_idにはmessage.idが入るので、"0"は無しを表す
    }
    $.ajax({
      url: location.href, //urlは現在のページを指定
      type: "GET",
      data: { id: message_id }, // 渡すparamsの"id"には"message_id"を入れる
      dataType: "json"
    })
    .done(function(newMessages){ //配列形式で帰ってきたデータ(@new_messages)
      $.each(newMessages, function(i,newMessage){ // 配列形式で受けたデータnewMessagesをeachで回す
        buildNewMessageHTML(newMessage); // 上で定義した関数をnewMessageを引数として実行する
      });
    })
  }
  setInterval(autoApdate, 5000); //5000ミリ秒ごとにautoApdateという関数を実行する
});

