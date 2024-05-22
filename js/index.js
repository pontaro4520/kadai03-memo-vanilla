let key = 0;

//1.Save クリックイベント
$("#save").on("click", function(){
  key++;
  console.log(key, "key No.")
  const text = $("#text").val();
  const deleteButton = `<button id="delete" type="button" style="height: 25px;">削除</button>`

  let value = [text, deleteButton]    

  localStorage.setItem(key, value);
  const html = `
  <li>
    <p>${value}</p>
  </li>  
    `;

    $("#list").append(html);

// ボタンを押した時に中身を削除
$("#text").val("");
  });

//2.clear クリックイベント
$("#clear").on("click", function(){
  localStorage.clear();
  $("#list").empty();
 })


//3.ページ読み込み：保存データ取得表示
for (let i = 0; i < localStorage.length; i++){
  const exist = localStorage.key(i);
  const value = localStorage.getItem(key);

  // テンプレートリテラル
  const html = `
  <li>
    <p>${value}</p>
    </li>  
    `;
    $("#list").append(html);      
    key = exist + 1;

}


// 6.1項目削除ボタンのクリックイベント
$("#list").on("click", "#delete", function() {

    // 親要素である <li> を取得し、削除する
    $(this).closest("li").remove();

    // 削除されたデータのキーを取得し、localStorageからも削除する
    const key = $(this).closest("li").find(key).text();
    localStorage.removeItem(key);
});

