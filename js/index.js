
$(window).on('load', function() {
    const existTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskList = $("#task-list");
    existTasks.forEach(function(taskText) {
        createTask(taskText);
    });

// saveボタンクリックイベント

    $("#save").on("click", function() {
        const taskText = $("#task-text").val();
        if (taskText) { //タスクが入力されているときだけ発動
            createTask(taskText); 
            saveTask(taskText);
            $("#task-text").val("");
        }
    });

    function createTask(taskText) {
        const taskList = $("#task-list");
        const taskItem = $("<li>").text(taskText);
        const deleteButton = $("<button>").text("done");
        deleteButton.on("click", function() {
            deleteTask(taskText);
            taskItem.remove();
        });

        taskItem.append(deleteButton);
        taskList.append(taskItem);
    }

    function saveTask(taskText) {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        savedTasks.push(taskText);
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
    }

    function deleteTask(taskText) {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const updatedTasks = savedTasks.filter(function(task) {
            return task !== taskText;
        });
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
});







// //1.Save クリックイベント
// $("#save").on("click", function(){
//   key++;
//   console.log(key, "key No.")
//   const text = $("#text").val();
//   const deleteButton = `<button id="delete" type="button" style="height: 25px;">done</button>`

//   let value = [text, deleteButton]    

//   localStorage.setItem(key, value);
//   const html = `
//   <li>
//     <p>${value}</p>
//   </li>  
//     `;

//     $("#list").append(html);

// // ボタンを押した時に中身を削除
// $("#text").val("");
//   });

// //2.clear クリックイベント
// $("#clear").on("click", function(){
//   localStorage.clear();
//   $("#list").empty();
//  })


// //3.ページ読み込み：保存データ取得表示
// for (let i = 0; i < localStorage.length; i++){
//   let exist = localStorage.key(i);
//   console.log(exist)
//   const value = localStorage.getItem(exist);

//   // テンプレートリテラル
//   const html = `
//   <li>
//   <p>${exist}</p>
//     <p>${value}</p>
//     </li>  
//     `;
//     $("#list").append(html);      
//     };


//     key = localStorage.length;
//     console.log(key, "表示済みの数");


// // 6.1項目削除ボタンのクリックイベント
// $("#list").on("click", "#delete", function() {
//         let exist = localStorage.length;

//     // 親要素である <li> を取得し、削除する
//     $(this).closest("li").remove();

//     // 削除されたデータのキーを取得し、localStorageからも削除する
//     let del = $(this).closest("li").find(exist).text();
//     console.log(del, "削除したいデータのキー");
//     localStorage.removeItem(del);
// });

