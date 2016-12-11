var score = document.getElementById('score');
var newGame = document.getElementById('newGame');
var play = document.getElementsByClassName('play')[0];
var td = document.getElementsByTagName('td');
var t = table.tBodies[0];
var snake,time,key,runWay,snakeFoot;
var speed = 500;
var difficult = document.getElementById('difficult');
difficult.onchange = function(){
	speed = difficult.value;
}
function _play(){												
	play.parentNode.style.display = 'none';
	_new_game();
	_create_shit();
}
function _new_game(){												//开始新游戏，清空snak数据
	if(play.parentNode.style.display == 'none'){
		clearInterval(time);
		for(var i=0;i<td.length;i++){
			td[i].innerHTML = '';
		}
		key = 37;
		snake = [{}];							//生成头
		snake[0].x = 7;
		snake[0].y = 7;
		snake[0].snakeWay = key;
		var img = document.createElement('img');
		img.src = 'img/header'+37+'.png';
		snake[0].img = img;
		t.rows[snake[0].x].cells[snake[0].y].appendChild(snake[0].img);
		snakeFoot = {};					//生成尾巴	
		snakeFoot.x = 7;
		snakeFoot.y = 8;
		snakeFoot.snakeWay = snake[0].snakeWay;
		var img2 = document.createElement('img');
		img2.src = 'img/footer37.png';
		img2.id = 'footer';
		snakeFoot.img = img2;
		t.rows[snakeFoot.x].cells[snakeFoot.y].appendChild(snakeFoot.img);
		_run();
	}
}
function _run(){													//snake运行
	time = setInterval(function(){
		if(_judge()){
			clearInterval(time);
			return alert('你失败了！');
		}
		//如果本td有img，则拿到最后一位snake的x，y，并新建img，
		var snakeLength = snake.length;
		var lengthX = snake[snake.length-1].x;
		var lengthY = snake[snake.length-1].y;
		var lengthSnakeWay = snake[snake.length-1].snakeWay;
		console.log(lengthSnakeWay);
		for(var i=snake.length-1;i>0;i--){
			if(snake[i-1]){
				snake[i].x = snake[i-1].x;
				snake[i].y = snake[i-1].y;
				snake[i].snakeWay = snake[i-1].snakeWay;
			}
			console.log(snake[i].snakeWays,snake[snake.length-1].snakeWay)
		}
		switch (key){
			case 0 :
				snake[0].x--;
			break;
			case 37 :
				snake[0].x--;
			break;
			case 38 :
				snake[0].y--;
			break;
			case 39 :
				snake[0].x++;
			break;
			case 40 :
				snake[0].y++;
			break;
		}
		if(t.rows[snake[0].y].cells[snake[0].x].children[0]){
			if(t.rows[snake[0].y].cells[snake[0].x].children[0].id == 'shit'){
				var imgs = document.createElement('img');
				imgs.src = 'img/body.png';
				snake[snake.length] = {};
				snake[snake.length-1].x = lengthX;
				snake[snake.length-1].y = lengthY;
				snake[snake.length-1].img = imgs;
				snake[snake.length-1].snakeWay = lengthSnakeWay;
				t.rows[snake[0].y].cells[snake[0].x].removeChild(t.rows[snake[0].y].cells[snake[0].x].children[0]);
				score.innerHTML = snake.length-1;
			}
		}
		//此处再重新赋值，并删除本身的shit，
		snake[0].img.src = 'img/header'+key+'.png';
		snake[0].snakeWay = key;
		t.rows[snake[0].y].cells[snake[0].x].appendChild(snake[0].img);
		runWay = Number(snake[0].img.src.split('header',2)[1].split('.',1)[0]);
		for(var i=1;i<snake.length;i++){
			var X = snake[i].x;
			var Y = snake[i].y
			t.rows[Y].cells[X].appendChild(snake[i].img);
		}
		if(snakeLength == snake.length){
			snakeFoot.x = lengthX;
			snakeFoot.y = lengthY;
			snakeFoot.snakeWay = snake[snake.length-1].snakeWay;
		}
		snakeFoot.img.src = 'img/footer'+snakeFoot.snakeWay+'.png';
		t.rows[snakeFoot.y].cells[snakeFoot.x].appendChild(snakeFoot.img);
		for(var i=0;i<td.length;i++){
			if(td[i].children[0]){
				if(td[i].children[0].id == 'shit'){
					return;
				}
			}
		}_create_shit();
		
	},speed)
}
window.onkeydown = function(e){
	if(play.parentNode.style.display == 'none'&&e.keyCode>=37&&e.keyCode<=40){
		if(e.keyCode != runWay&&e.keyCode != runWay+2&&e.keyCode != runWay-2){
			key = e.keyCode;
		}	
	}	
}
function _can_create(){							//随机生成一个可以创建shit或者gold的td的下标值
	var random = Math.floor(Math.random()*td.length);
	if(td[random].children[0]){
		_random_shit();
	}else{
		return random;
	}
}
function _create_shit(){						//生成shit
	var img = document.createElement('img');
	img.src = 'img/shit.png';
	img.id = 'shit';
	td[_can_create()].appendChild(img);
}
function _judge(){							//判断是否碰撞
	var x = snake[0].x;
	var y = snake[0].y;
	switch (key){
		case 0 :
			x--;
		break;
		case 37 :
			x--;
		break;
		case 38 :
			y--;
		break;
		case 39 :
			x++;
		break;
		case 40 :
			y++;
		break;
	}
	if(x>14||x<0||y>14||y<0){
		return true;
	}else if(t.rows[y].cells[x].children[0]){
			if(!t.rows[y].cells[x].children[0].id){
				return true;
		}		
	}			
} 
