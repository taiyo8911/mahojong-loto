"use strict"

// 初期化
var playerCount = 0;
var notPlayerCount = 0;
var tableCount = 0;
var playerList = [];
var notPlayerList = [];
var return_btn = document.querySelector('#return');
var select = document.querySelector('[name="player_count"]');
var choice_btn = document.getElementById('choice');

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


// 人数が入力された時の処理（参加人数、必要卓数、あまり人数を計算する）
select.onchange = event => {
    playerCount = select.selectedIndex; // 参加人数
    tableCount = Math.floor(playerCount / 4); // 必要卓数
    notPlayerCount = playerCount % 4; // 余り
    return_btn.disabled = false; // 決定ボタンを押せるようにする

}


// 決定ボタン(#return_btn)が押下された時の処理（参加メンバーを決める）
return_btn.addEventListener('click', () => {
    // プレイヤー名を入力して保存する
    for (var i = 0; i < playerCount; i++) {
        playerList[i] = prompt(`参加者${i + 1} の名前を入力して、OKボタンを押して下さい!`);
    }

    // メンバーをシャッフル決定する
    playerList = arrayShuffle(playerList);

    // シャッフルした配列の0番目〜の人を欠場にする
    notPlayerList = playerList.splice(playerList[0], notPlayerCount);

    // 抽選ボタンを押せるようにする
    choice_btn.disabled = false;
});


// 抽選ボタンが押された時の処理（結果を表示）
function makeTable() {

    // テーブルの作成
    // https://www.delftstack.com/ja/howto/javascript/create-table-javascript/

    let table = document.createElement('table');
    table.className = "table table-success table-striped table-hover";
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    table.appendChild(thead);
    table.appendChild(tbody);

    document.getElementById('modal-content').appendChild(table);

    // 見出し行を作成する
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

    // 参加者一覧を作る
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

        // 次の行を作るために、配列の前から4つを削除する
        playerList.splice(playerList[0], 4);
    }

    if (notPlayerList == "") {
    } else {
        let p = document.createElement('p');
        p.innerHTML =
            `<p class="lead">お休みは・・・</p>
            <p>${notPlayerList}</p>`
        document.getElementById('modal-content').appendChild(p);
    }
}