
/*
1.创建游戏地图
2.创建蛇
3.创建随机食物
4.键盘事件移动蛇
*/
//获取元素
var wrap = document.querySelector('.wrap');
var scoreDiv = document.querySelector('.score span:nth-child(2)');
var food = document.querySelector('.food');
var oBtn = document.querySelector('.btn');
var inp1 = document.querySelector('.inp1');
var inp2 = document.querySelector('.inp2');
var le = document.querySelector('#sel');

//全局变量
var arr = [];//map
var sX = 0,sY = 2;//蛇头位置
var score = 0;
var row,column;//行列
var dir = 'right';//初始方向
var isMove;//是否在移动
var timer;//蛇移动定时器
var num;//定时器事件
var isClick = true;


//创建map
function createMap(row,column){
    for(var i = 0;i < row;i++){
        var rowDivs = document.createElement('div');
        rowDivs.className= 'row';
        wrap.appendChild(rowDivs);
        var innerArr = [];
        for(var j = 0;j < column;j++){
            var columnDivs = document.createElement('div');
            columnDivs.className  = 'column';
            rowDivs.appendChild(columnDivs);
            innerArr.push(columnDivs);
        }
        arr.push(innerArr);
    }
}


//创建蛇
var snackArr = [];
function snack(length){
    for(j = 0;j < length;j++){
        arr[sX][j].style.background = 'yellow';
        snackArr.push(arr[0][j]);
    }
}

//随机函数
function random(num1,num2){
    return parseInt(Math.random() * (num2 - num1 + 1) + num1);
}
//创建随机食物
var x =0;
var y = 0;
function randFood(){
    x = random(0,row-1);
    y = random(0,column-1);
    if(snackArr.indexOf(arr[x][y]) < 0){
        var newFood = document.createElement('div');
        newFood.className = 'food';
        arr[x][y].appendChild(newFood);
    }
}


//游戏结束函数
function gameover(){
    alert('游戏结束');
    clearInterval(timer);
    document.onkeydown = null;
    scoreDiv.innerHTML = 0;
    isClick = true;

}
//键盘移动蛇
// 	 var num = 100;
function snackMove(num) {
    timer = setInterval(function () {

        switch (dir) {

            case 'left':
                sY--;
                break;
            case 'up':
                sX--;
                break;
            case 'right':
                sY++;
                break;
            case 'down':
                sX++;
                break;
            default:
                break;

        }
        //当蛇超出范围时游戏结束
        if (sX < 0 || sY < 0 || sX >= row || sY >= column || arr[sX][sY].style.background == 'yellow') {
            gameover();
            return;
        }
        //蛇的状态  蛇吃到食物和没吃到食物
        if (x == sX && y == sY) {
            arr[sX][sY].style.background = 'yellow';
            snackArr.push(arr[sX][sY]);
            score++;
            scoreDiv.innerHTML = score;
            arr[sX][sY].children[0].remove();
            randFood();
        } else {
            arr[sX][sY].style.background = 'yellow';
            snackArr.push(arr[sX][sY]);
            snackArr[0].style.background = 'white';
            snackArr.shift();
            isMove = false;
        }

    }, num);
    isClick = false;
}

//键盘事件
function keyItem() {
    document.onkeydown = function (ev) {
        if (!isMove) {
            var ev = ev || window.event;
            //判断如果蛇的移动方向和用户点的不一样则不执行
            if (dir == 'left' && ev.keyCode == 39) {
                return;
            }
            if (dir == 'up' && ev.keyCode == 40) {
                return;
            }
            if (dir == 'right' && ev.keyCode == 37) {
                return;
            }
            if (dir == 'down' && ev.keyCode == 38) {
                return;
            }

            switch (ev.keyCode) {
                case 37:
                    dir = 'left';
                    break;
                case 38:
                    dir = 'up';
                    break;
                case 39:
                    dir = 'right';
                    break;
                case 40:
                    dir = 'down';
                    break;

            }
        }
    }
}


//btn点击事件
oBtn.onclick = function(){
        if(isClick) {
            wrap.innerHTML = '';
            score=0;
            arr = [];
            snackArr = [];
            sX=0;
            sY=2;
            dir='right';
            num = le.value;
            row = inp1.value,column = inp2.value;
            wrap.style.height = row * 50 + 'px';
            wrap.style.width = column * 50 + 'px';
            wrap.style.border = '1px solid black';
            createMap(row,column);
            snack(3);
            randFood();
            snackMove(num);
            console.log(sX,sY,arr[sX][sY].style.background);
            keyItem();
            isClick = false;
        }
    }

