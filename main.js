"use strict"

// 初期化
var playerCount = 0;
var notPlayerCount = 0;
var tableCount = 0;
var playerList = [];
var notPlayerList = [];
var input = document.querySelector('input');
var go_btn = document.querySelector('#go');

// 配列をシャッフルする関数
function arrayShuffle(array) {
    for (var i = (array.length - 1); 0 < i; i--) {

        // 0〜(i+1)の範囲で値を取得
        var r = Math.floor(Math.random() * (i + 1));

        // 要素の並び替えを実行
        var tmp = array[i];
        array[i] = array[r];
        array[r] = tmp;
    }
    return array;
}


// 決定ボタン(#go)が押下されたら、必要卓数、あまり人数を表示。除外メンバー、参加メンバーを決定
go_btn.addEventListener('click', () => {
    // playerList = new Array(); // 配列を初期化
    playerCount = document.getElementById('player-count').value; // 参加人数

    if (playerCount > 20) {
        errMsg.innerText = "※参加人数は、20人までです!!";
        input.value = "";
    } else {
        tableCount = Math.floor(playerCount / 4); // 必要卓数
        notPlayerCount = playerCount % 4; // 余り

        // エラーメッセージを消去
        errMsg.innerText = "";

        // プレイヤー名を入力して保存する
        for (var i = 0; i < playerCount; i++) {
            playerList[i] = prompt(`参加者${i + 1} の名前を入力して、OKボタンを押して下さい!`);
        }

        // メンバーをシャッフル決定する
        playerList = arrayShuffle(playerList);

        // シャッフルした配列の0番目〜の人が欠場
        notPlayerList = playerList.splice(playerList[0], notPlayerCount);

        document.getElementById('choice').disabled = false;
    };

});


// 抽選結果を作成
function makeTable() {

    // テーブルの作成
    // https://www.delftstack.com/ja/howto/javascript/create-table-javascript/

    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    table.className = "table table-success table-striped table-hover";
    table.appendChild(thead);
    table.appendChild(tbody);

    document.getElementById('modal-content').appendChild(table);

    let heading_row = document.createElement('tr');

    let heading_1 = document.createElement('th');
    let heading_2 = document.createElement('th');
    heading_2.innerHTML = "東";
    let heading_3 = document.createElement('th');
    heading_3.innerHTML = "南";
    let heading_4 = document.createElement('th');
    heading_4.innerHTML = "西";
    let heading_5 = document.createElement('th');
    heading_5.innerHTML = "北";

    heading_row.appendChild(heading_1);
    heading_row.appendChild(heading_2);
    heading_row.appendChild(heading_3);
    heading_row.appendChild(heading_4);
    heading_row.appendChild(heading_5);
    thead.appendChild(heading_row);


    for (var i = 0; i < tableCount; i++) {

        let row = document.createElement('tr');

        let row_data_1 = document.createElement('td');
        row_data_1.scope = "row";
        row_data_1.innerHTML = `${i + 1}`;
        let row_data_2 = document.createElement('td');
        row_data_2.innerHTML = `${playerList[0]}`;
        let row_data_3 = document.createElement('td');
        row_data_3.innerHTML = `${playerList[1]}`;
        let row_data_4 = document.createElement('td');
        row_data_4.innerHTML = `${playerList[2]}`;
        let row_data_5 = document.createElement('td');
        row_data_5.innerHTML = `${playerList[3]}`;


        row.appendChild(row_data_1);
        row.appendChild(row_data_2);
        row.appendChild(row_data_3);
        row.appendChild(row_data_4);
        row.appendChild(row_data_5);
        tbody.appendChild(row);

        // 配列の前から4つを削除して次の行を印字
        playerList.splice(playerList[0], 4);
    }


    if (notPlayerList == "") {
    } else {
        let p = document.createElement('p');
        p.innerHTML =
            `<p>お休みは・・・</p>
            <p>${notPlayerList}</p>`


        document.getElementById('modal-content').appendChild(p);
    }

    document.getElementById('choice').disabled = true;

}