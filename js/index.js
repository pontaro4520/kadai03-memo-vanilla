//1.Save クリックイベント
$("#save").on("click", function(){
  
  const key = $("#title").val();    
  let value = $("#text").val();    



           // 現在の日付を取得し、フォーマットする
              const now = new Date();
              const dateStr = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;
              const timeStr = `${("0" + now.getHours()).slice(-2)}:${("0" + now.getMinutes()).slice(-2)}`;

            // 日付と時刻を組み合わせた形式で保存
            const timestamp = `${dateStr} ${timeStr}`;      




  localStorage.setItem(key, value);
  const html = `
  <li>
             <p>${timestamp}</p>
    <p>${key}</p>
    <p>${value}</p>
    <button id="edit" type="button" class="icon-button" style="height: 25px;">編集</button>
    <button id="delete" type="button" style="height: 25px;">削除</button> 
         
    </li>  
    `;

    $("#list").append(html);

// ボタンを押した時に中身を削除
$("#title").val("");
$("#text").val("");

  });

  function save(){
    let jsondatas = JSON.stringify(datas);
  
    // console.log(`datas= ${datas}`);
    // console.log(`jsondatas= ${jsondatas}`);
    localStorage.setItem('datas', jsondatas);
    let origin = JSON.parse(localStorage.getItem("datas")) 
    // console.log(`origin= ${origin}`);
   }
  
   function load(){
    dataBox.length = 0; //dataBox初期化
    main.innerHTML = ''; //HTML描画初期化
    datas.forEach((data, index) => {
      console.log(data.title);
      dataBox[index] = new dataDraw(index, data.title, data.img);
    });
    console.log(`dataBox= ${dataBox}`);
   }
  

//2.clear クリックイベント
$("#clear").on("click", function(){
  localStorage.clear();
  $("#list").empty();
 })


//3.ページ読み込み：保存データ取得表示
for (let i = 0; i < localStorage.length; i++){
  const key = localStorage.key(i);
  const value = localStorage.getItem(key);

  // テンプレートリテラル
  const html = `
  <li>
    <p>${key}</p>
    <p>${value}</p>
    </li>  
    `;
    $("#list").append(html);      

}

// 4.edit クリックイベント
$("#list").on("click", "#edit", function() {

// データ取得
const listItem = $(this).closest("li");

const timestamp = listItem.find("p:first").text();

const key = listItem.find("p:nth-child(2)").text();
const value = listItem.find("p:nth-child(3)").text();

// データをセット
$("#editTitle").val(key);
$("#editText").val(value);
$("#editTimestamp").text(timestamp);


// 編集用フォーム表示
$("#editForm").show();

});

// 5.saveEditクリックイベント
$("#saveEdit").on("click", function() {

// 編集データを取得

const editedKey = $("#editTitle").val();
const editedValue = $("#editText").val();
const timestamp = $("#editTimestamp").text();

// 編集対象の項目を特定
const listItem = $("#list").find("li").filter(function() {
    return $(this).find("p:first").text() === timestamp;
});

// 元のデータを置き換えて保存
listItem.find("p:nth-child(2)").text(editedKey);
listItem.find("p:nth-child(3)").text(editedValue);

// localStorageにも保存
localStorage.setItem(editedKey, editedValue);

// 編集フォームを非表示にする
$("#editForm").hide();
});

// 6.1項目削除ボタンのクリックイベント
$("#list").on("click", "#delete", function() {

    // 親要素である <li> を取得し、削除する
    $(this).closest("li").remove();

    // 削除されたデータのキーを取得し、localStorageからも削除する
    const key = $(this).closest("li").find("p:nth-child(2)").text();
    localStorage.removeItem(key);
});

