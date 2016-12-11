
var table = {
11:0,12:0,13:0,14:0,
21:0,22:0,23:0,24:0,
31:0,32:0,33:0,34:0,
41:0,42:0,43:0,44:0
};//整个表格
var rNum = Math.random();//判断用的随机数
var curQueue = null;//需要处理的当前行和列
var key = 0;//当前操作移动的方向
var maxValue = 0;//最大值
var score = 0;//最高分数
function $(id){
	return document.getElementById(id);
}
//初始化
function init(){
	createNum();//创造随机数的盒子
	for(var i=1;i<=4;i++){
		setcurQueue(i);
		draw();//格子赋值
	}
	updateMaxValue()
}
init();
function createNum(){
	var emptyBox;
	emptyBox = findEmptyBox();
	numInEmpty(emptyBox);
}
function findEmptyBox(){
	var emptyBox = new Array();
		for(var i in table){
			if(table[i]==0){
				emptyBox.push(i);
			}
		}
	//初始所有格子
	//新生成的num不占这个格子，旧数字移动占这个格子
	return emptyBox;
}
function numInEmpty(n){//生成新的数字，n代表空盒
	var num = rNum>0.5?2:4;
	//生成2或4
	var boxNum = parseInt(rNum*(n.length));//第几个空盒塞数
	table[n[boxNum]] = num;
//当空盒只剩下一个时，判断是不是结束游戏
		if(n.length==1){
			if(!judgeMix()&&!judgeMove()){
				alert("你输了!");
				if(confirm("重新开始？")){
                    window.location.reload();
                }	
			}	
		}	
	// }
}

//设置操作的当前行（列）
function setcurQueue(i){
	switch(key){
		case 37:
			curQueue = {1:i*10+4,2:i*10+3,3:i*10+2,4:i*10+1};//左行
			break;
		case 38:
			curQueue = {1:40+i,2:30+i,3:20+i,4:10+i};//上列
			break;
		case 39:
			curQueue = {1:i*10+1,2:i*10+2,3:i*10+3,4:i*10+4};//右行
			break;
		case 40:
			curQueue = {1:10+i,2:20+i,3:30+i,4:40+i};//下列
			break;
		default:
		curQueue = {1:i*10+1,2:i*10+2,3:i*10+3,4:i*10+4};//默认
	}
}
//整体刷新16个格子,class='location+n'移动效果
function draw(){
	for(var i=10;i<=40;i+=10){
		for(var j=1;j<=4;j++){
			(table[i+j]!=0)?($('t'+(i+j)).innerHTML='<div class=n'+table[i+j]+'>'+table[i+j]+'</div>')&&($('t'+(i+j)).className = 'location'+(i+j)):($('t'+(i+j)).innerHTML='');
			if(table[i+j]==1024){
				alert("你赢了!");
				if(confirm("重新开始？")){
                    window.location.reload();
                }	
			}
		}
	}
}
//按键移动
document.onkeyup = function(){
	run();
};
function haveNum(){//行（列）不为0代表有数
	if(table[curQueue[1]]+table[curQueue[2]]+table[curQueue[3]]+table[curQueue[4]]>0){
		return true;
	}else{
		return false;
	}
}		
function judgeMove() {//当前行（列）至少比上一行（列）大，否则要移动
	if(Boolean(table[curQueue[4]])>=Boolean(table[curQueue[3]])&&Boolean(table[curQueue[3]])>=Boolean(table[curQueue[2]])&&Boolean(table[curQueue[2]])>=Boolean(table[curQueue[1]])){
		return false;
	}else {
		return true;
	}
}

function judgeMix(){//相邻行（列）不为0且相等
if((table[curQueue[4]]==table[curQueue[3]])&&table[curQueue[4]]&&table[curQueue[3]]||(table[curQueue[3]]==table[curQueue[2]])&&table[curQueue[3]]&&table[curQueue[2]]||(table[curQueue[2]]==table[curQueue[1]])&&table[curQueue[2]]&&table[curQueue[1]]) {
	return true;
}else{
	return false;
}
}

function move(){//对当前行（列）的数字进行移动：赋值
	for(var i=4;i>=2;i--) {
		if(Boolean(table[curQueue[i]]<Boolean(table[curQueue[i-1]]))){
			table[curQueue[i]] = table[curQueue[i-1]];
			table[curQueue[i-1]] = 0;
			break;
		}
	}
}

function mix(){//对当前行（列）的数字进行合并：赋值
for(var i=4;i>=2;i--) {
	if(table[curQueue[i]]==table[curQueue[i-1]]) {
		table[curQueue[i]] += table[curQueue[i-1]];
		table[curQueue[i-1]] = 0;
		score=score+table[curQueue[i]];
		$("score").innerHTML=score;
		break;
	}
}
}
//每次移动到最侧
function alsoMove(){
	while(judgeMove()){
		move();
	}
}
//按键时开始执行
function run() {
	key = event.which;
	var onOff = false;//行为每次执行一次
	if(key>=37&&key<=40){
	//只有点击上下左右键时开始执行
		for(var i=1;i<=4;i++){
			setcurQueue(i);//设置当前行（列）
			if(haveNum()){
				if(judgeMove()||judgeMix()) {
					onOff = true;//此变量用来限制每次只合并一次
				}
				alsoMove();
				if(judgeMix()) {
					if(table[curQueue[1]]==table[curQueue[2]]&&table[curQueue[3]]==table[curQueue[4]]) {//特例，当一行（列）上四个数字全部相同时候，进行两次合并
						mix();
						alsoMove();
						mix();
					}else {
						mix();
						alsoMove();
					}
				}
			}
		}
		if(onOff){//如果此次有移动或合并，即有效操作，则生成新的数字
			createNum();
		}
		updateMaxValue()
		draw();//重新绘制表格用于显示
	}
}
function updateMaxValue(){
	maxValue = 0;
	for(var i in table) {
		if(table[i]>maxValue) {
			maxValue=table[i];
		}
	}
	$("maxValue").innerHTML=maxValue;
}
		
