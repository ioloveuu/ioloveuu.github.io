var oBlockValue;//用来记录每个小方块应对应的值
var markNum = 0;//用来记录用户标记的数目
var resetNum =0;//用来记录重置
var key = 0;
var sec =0;
var timer = null;
function $(id){
    return document.getElementById(id);
}
init(9,6);
//选择难度
function selectLevel(level){
    if(level=="0"){
        init(9,6);
        faceChoice(0);
        clearInterval(timer);
        timer=setInterval(timeFn,1200);  
    }else if(level=="1"){
        init(12,15);
        faceChoice(0);
        clearInterval(timer);
        timer=setInterval(timeFn,1200); 
    }else if(level=="2"){
        init(14,25);
        faceChoice(0);
        clearInterval(timer);
        timer=setInterval(timeFn,1200); 
    }else if(level =='3'){
        console.log(123);
        faceChoice(0);
        clearInterval(timer);
        timer=setInterval(timeFn,1000); 
    }
    resetNum = level;
}
//计算时间函数
function timeFn(){
    sec++;
    numToImage(sec,"gameTime");
    if(sec>=5){
        clearInterval(timer); 
        sec=0; 
        $('face').src = 'img/face_fail.bmp';    
    }
}
//脸部选择函数
function faceChoice(key){
    switch(key){
        case 0:
            $('face').src = 'img/face_nomal.bmp';
        case 1:
            $('face').src = 'img/face_fail.bmp';           
        case 2:
            $('face').src = 'img/face_success.bmp';
        default:
            $('face').src = 'img/face_nomal.bmp';       
    }
}
//脸部点击函数
$('face').onclick=function reset(){
    selectLevel(resetNum);
    $('face').src = 'img/face_nomal.bmp';
    clearInterval(timer);
    sec=0;
    timer=setInterval(timeFn,1300);
}
// numToImage(10,"markNum");//雷数
// numToImage(1,"gameTime");//时间
//布局游戏界面 size是布局大小，number是布雷数
function init(size,number){
    // markArr=(number+'').split('');//获取到了雷数的数组
    // var imgBomb = $("markNum").getElementsByTagName('img');
    // imgBomb.src = 'img/d'+num;
    markNum=number;
    numToImage(number,"markNum");
    var mainCont=$("mainInt");
    mainCont.innerHTML="";
    var mine=[];
    for(var i=0;i<size;i++){
        mine[i]=new Array(size);//游戏内容row{col}
    }
    mine=randomNumber(mine,number);//调用布雷函数，完成数组生成  
    oBlockValue=mine;
    for(var i=0;i<size;i++){
        mainCont.appendChild(createRow(i,size,mine));
    }
}
//图片函数
function numToImage(num,ele){
    if(num>999){
        num = 999;
    }else if(num<0){
        num = 000;
    }else if(num<10){
        num = "00"+num;
    }   else if(num< 100){
        num = "0"+num;
    }
    var ele = $(ele).getElementsByTagName('img');
    for (var i = 0,eLen=ele.length; i < eLen; i++) {
        ele[i].src="img/d"+num.toString().charAt(i)+".bmp";
    };
}
//参数mine,num分别表示一个二维数组和布雷的数目 
 function randomNumber(mine,num) {
    var mine=mine;
    var rows=mine.length;
    var cols=mine.length;
    var i=0;
//完成布雷工作
    while(i<num){
        //随机布行
        var row=Math.ceil((rows*Math.random()))-1;
        // 随机布列
        var col=Math.ceil((cols*Math.random()))-1;
        if(mine[row][col]!="雷"){
            mine[row][col]="雷";
            i++;
            //i是雷数
        }
    }
    //完成雷数提示工作
    for(var i=0;i<rows;i++){
        for(var j=0;j<cols;j++){
            var bombNum=0;
            //判断左上
            if((i-1>=0)&&(j-1>=0)){
                if(mine[i-1][j-1]=="雷")
                bombNum++;
            }
            //判断正上
            if(i>=1){
                if(mine[i-1][j]=="雷")
                bombNum++;
            }
            //判断右上
            if((i-1>=0)&&(j<=cols-2)){
                if(mine[i-1][j+1]=="雷")
                bombNum++;
            }
            //判断左边
            if(j>=1){
                if(mine[i][j-1]=="雷")
                bombNum++;
            }
            //判断右边 
            if(j<=cols-2){
                if(mine[i][j+1]=="雷")
                bombNum++;
            }
            //判断左下
            if((i<=rows-2)&&(j-1>=0)){
                if(mine[i+1][j-1]=="雷")
                bombNum++;
            }
            //判断正下
            if(i<=rows-2){
                if(mine[i+1][j]=="雷")
                bombNum++;
            }
            //判断右下
            if((i<=rows-2)&&(j<=cols-2)){
                if(mine[i+1][j+1]=="雷")
                bombNum++;
            }
            if(mine[i][j]!="雷"){
                mine[i][j]=bombNum;
            }
        }
 }
    return mine;
 }

//创建行（第几行i，行长度size，数组mine）
function createRow(row,len,mine){
    var mine=mine;
    var tr=document.createElement("tr");
    for(var i=0;i<len;i++){
        var td=document.createElement("td");
        var ins=document.createElement("input");
        ins.id=row+"."+i;//将坐标分解为行列
        ins.className="contArea";//点击之前设置类     
        var context=mine[row][i];//获取内容
        ins.onclick=function (){
            getValue(this);//将按钮的值获取的函数
            if(this.value=="雷"){
                getValue("over");//让获取函数跳到over条件
                clearInterval(timer);
                alert("你触雷了，游戏结束！");
                if(confirm("重新开始？")){
                    window.location.reload();
                }
                return false;
            }
            if(this.value==0){
                showSpace(this);
            }
            this.oncontextmenu=function (){
                return false;
            };
            judge();//判断雷排完了没有
        };

        //右键的事件
        ins.oncontextmenu=function (){
            if(markNum>0){ 
                if(this.value!="确定"||this.value!="?"){
                    if(this.value=="确定"){
                        this.value="?";
                        this.style.background = 'url(img/ask.bmp) no-repeat 2px 2px';
                        markNum++;
                        // $("markNum").innerHTML=markNum; 
                        numToImage(markNum,"markNum");            
                    }else if(this.value=="?"){
                        this.value="";
                        this.style.background = '';
                    }else{
                        this.value="确定";
                        this.style.background = 'url(img/flag.bmp) no-repeat 2px 2px';
                        markNum--;  
                        numToImage(markNum,"markNum");
                        judge();
                    }
                }
            }
        };
        //ins.value=mine[row][i];
        td.appendChild(ins);
        tr.appendChild(td);
    }
    return tr;
}
//当点击的不是空白区或者是触动雷的时候调用下面的函数
function getValue(object){
    if("over"!=object){
        var id=object.id;
        var ins=document.getElementById(id);
        var row=id.split(".")[0];
        var col=id.split(".")[1];
        //获取点击的行列
        ins.value=oBlockValue[row][col];
        ins.className="contArea"+ins.value;//让按钮显示点击后的样式
    }else{
        for(var i=0;i<oBlockValue.length;i++){
            for(var j=0;j<oBlockValue[i].length;j++){
                var ins = $(i+"."+j);
                if(oBlockValue[i][j]=="雷"){
                    ins.className="bomb";
                    // faceChoice(1);
                    $('face').src = 'img/face_fail.bmp';
                }
            }
        }
    }
}
//当点击的区域为空白区域时调用的下面的函数将与该区域相连的空白区域都显示出来
 function showSpace(object){
    var id=object.id;
    var row=parseInt(id.split(".")[0]);
    var col=parseInt(id.split(".")[1]);
    //alert(row+"."+col);
    var cols=oBlockValue.length;
    var rows=oBlockValue.length;
            //判断左上
            if((row-1>=0)&&(col-1>=0)){
                var spaces=$((row-1)+"."+(col-1));

                if(spaces.value!="0"){
                spaces.value=(oBlockValue[row-1][col-1]=="雷")?"" : oBlockValue[row-1][col-1];
                spaces.className="contArea"+spaces.value;
                  if(spaces.value=="0"){
                    showSpace(spaces);
                  }
                }   
            }
            //判断正上
            if(row>=1){
                var spaces=$((row-1)+"."+(col));
                if(spaces.value!="0"){
                spaces.value=(oBlockValue[row-1][col]=="雷") ? "" : oBlockValue[row-1][col];
                spaces.className="contArea"+spaces.value;
                 if(spaces.value=="0"){
                    showSpace(spaces);
                  }
                }
            }
            //判断右上
            if((row-1>=0)&&(col<=cols-2)){
                var spaces=$((row-1)+"."+(col+1));
                if(spaces.value!="0"){
                spaces.value=(oBlockValue[row-1][col+1]=="雷") ? "" : oBlockValue[row-1][col+1];
                spaces.className="contArea"+spaces.value;
                 if(spaces.value=="0"){
                    showSpace(spaces);
                  }
                }
            }
            //判断左边
            if(col>=1){
                var spaces=$((row)+"."+(col-1));
                if(spaces.value!="0"){
                spaces.value=(oBlockValue[row][col-1]=="雷") ? "" : oBlockValue[row][col-1];
                spaces.className="contArea"+spaces.value;
                 if(spaces.value=="0"){
                    showSpace(spaces);
                  }
                }
            }
            //判断右边 
            if(col<=cols-2){
                var spaces=$((row)+"."+(col+1));
                if(spaces.value!="0"){
                spaces.value=(oBlockValue[row][col+1]=="雷") ? "" : oBlockValue[row][col+1];
                spaces.className="contArea"+spaces.value;
                 if(spaces.value=="0"){
                    showSpace(spaces);
                  }
                }
            }
            //判断左下
            if((row<=rows-2)&&(col-1>=0)){
                var spaces=$((row+1)+"."+(col-1));
                if(spaces.value!="0"){
                spaces.value=(oBlockValue[row+1][col-1]=="雷") ? "" : oBlockValue[row+1][col-1];
                spaces.className="contArea"+spaces.value;
                 if(spaces.value=="0"){
                    showSpace(spaces);
                  }
                }
            }
            //判断正下
            if(row<=rows-2){
                var spaces=$((row+1)+"."+(col));
                if(spaces.value!="0"){
                spaces.value=(oBlockValue[row+1][col]=="雷") ? "" : oBlockValue[row+1][col];
                spaces.className="contArea"+spaces.value;
                 if(spaces.value=="0"){
                    showSpace(spaces);
                  }
                }
            }
            //判断右下
            if((row<=rows-2)&&(col<=cols-2)){
                var spaces=$((row+1)+"."+(col+1));
                if(spaces.value!="0"){
                spaces.value=(oBlockValue[row+1][col+1]=="雷") ? "" : oBlockValue[row+1][col+1];
                spaces.className="contArea"+spaces.value;
                 if(spaces.value=="0"){
                    showSpace(spaces);
                  }
                }
            }
 }
 
 //判断是否所有的雷是否都是正确的找出来了
 function judge(){
    var cols=oBlockValue.length;
    var rows=oBlockValue.length;
    var allTrue=true;
    for(var i=0;i<cols;i++){
        for(var j=0;j<rows;j++){
            var ins = $(i+"."+j);
            if(oBlockValue[i][j]=="雷"&&ins.value!="确定"){
                allTrue=false;
            }else if(oBlockValue[i][j]!="雷"&&ins.value!=oBlockValue[i][j]){
                allTrue=false;
            }
        }
    }
    if(allTrue){
        $('face').src = 'img/face_success.bmp';
        clearInterval(timer);
        if(confirm("全部雷已经挖出，你胜利了!重新开始?")){
            window.location.reload();
        }
    }
 }
