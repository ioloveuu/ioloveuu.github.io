//模板
<template id='c'>
    <div id="app">
        <ul>
            <li class='box' 
                v-for="(num, index) in nums"
                v-getclass="num"
                v-getposition="index"
            >{{num}}</li>
        </ul>
        <div class="mask" v-show='show===1' @click='show=0' transition='show'>
            <div>{{msg}}</div>
        </div>
        <button @click="reset()">重置</button>
    </div>    
</template>
// 自定义指令我以为要绑定key才能在自定义指令里用idnex，不用！
<script>
// 注册
Vue.component('c', {
  template: '#c',
    data () {
        return {
            nums : []   //记录16个框格的数字
        }
    },
    mounted: function () {
        document.addEventListener('keyup', this.keyDown);
        document.querySelector('#app ul').addEventListener('touchstart', this.touchStart);
        document.querySelector('#app ul').addEventListener('touchend', this.touchEnd);
        //document上获取touchmove事件 如果是由.box触发的 则禁止屏幕滚动
        document.addEventListener('touchmove', e=>{
            e.target.classList.contains('box') && e.preventDefault();
        });
        localStorage['save'] ? this.nums = JSON.parse(localStorage['save']) : this.reset();
    },
    directives:{
        getclass(num,el) {
        let classes = num.classList;
        Array.prototype.forEach.call(classes,_=>{
            if(/^s\w+$/.test(_)){
                console.log(_)
                classes.remove(_);
                console.log(classes)
            }
        });
        el.value?classes.add('s' + el.value):classes.add('empty');
    },
// 自定义指令钩子函数指令
        getposition(el,index){
            // console.log(index)
            // let pos = this.vm.getIndexPos(index,true);
            el.style.left = index.value%4*25 + '%';
            el.style.top = Math.floor(index.value/4)*25 + '%';
        }
    },
    methods:{
        // 随机添加4和2
        randomAdd(){
            let arr = this.shuffle(this.blankIndex());
            var n = Math.random()>0.9 ? 4 : 2;
            //Vue2.0的set
            Vue.set(this.nums,arr.pop(), n)
        },
        // 获取当前空白隔索引组成的数组
        blankIndex(){
            let arr = [];
            this.nums.forEach(function(i,j){
                i==='' && arr.push(j);
            });
            return arr;
        },
        // 随机打乱数组
        shuffle(arr){
            let l = arr.length,j;
            while(l--){
                j = parseInt(Math.random()*l);
                [arr[l],arr[j]] = [arr[j],arr[l]]
            }
            return arr;
        },
        // 数组改变方向变为矩阵转置
        tranSlates(arr,n){
            n=n%4;
            if(n===0)return arr;
            var l = arr.length,d = Math.sqrt(l),tmp = [];
            for(var i=0;i<d;i+=1)
                for(var j=0;j<d;j+=1)
                    tmp[d-i-1+j*d] = arr[i*d+j];
            if(n>1)tmp=this.tranSlates(tmp,n-1);
            return tmp;
        },
        touchStart(e){
            console.log(this)
            this.disX = e.changedTouches[0].pageX;
            this.disY = e.changedTouches[0].pageY;
            console.log(this.disX)
        },
        touchEnd(e){
            console.log(this.disX)
            let curPoint = e.changedTouches[0],
                x = curPoint.pageX - this.disX,
                y = curPoint.pageY - this.disX,
                xx = Math.abs(x),
                yy = Math.abs(y),
                i = 0;
            //移动范围太小 不处理
            if(xx < 50 && yy < 50)return;    
            if( xx >= yy){ //横向滑动
                i = x < 0 ? 0 : 2;
            }else{//纵向滑动
                i = y < 0 ? 3 : 1;
            }
            this.handle(i);
        },
        /*
        *方向键 事件处理
        *把上、右、下方向通过旋转 变成左向操作
        */
        keyDown(e){
            console.log("按下")
            //左上右下 分别转置0 3 2 1 次
            const map = {37:0,38:3,39:2,40:1};
            if(!(e.keyCode in map)){
                return
            };
            this.handle(map[e.keyCode]);
        },
        handle(i){
            this.move(i);
            this.save();
            this.isPass();//判断是否过关
        },
        /*移动滑块 i:转置次数 */
        move(i){
            let tmp = this.tranSlates(this.nums,i),//把任意方向键转置，当成向左移动
                hasMove = false, //一次操作有移动方块时才添加方块
                /*
                *记录已经合并过一次的位置 避免重复合并
                *如 2 2 4 4 在一次合并后应为 4 8 0 0  而非8 4 0 0 
                */
                hasCombin = {};
            tmp.forEach((j,k)=>{
                while(k%4 && j!==''){
                    if(tmp[k-1] === ''){ //当前位置的前一位置为空,交换俩位置
                        tmp[k-1] = j;
                        tmp[k] = '';
                        hasMove = true;
                        if(hasCombin[k]){
                            hasCombin[k-1] = true;
                            hasCombin[k] = false;
                        }
                    }else if(tmp[k-1] === j && !hasCombin[k] && !hasCombin[k-1]){
                        //当前位置与前一位置数字相同，合并到前一位置，然后清空当前位置
                        j *= 2;
                        tmp[k-1] = j;
                        tmp[k] = '';
                        hasMove = true;
                        hasCombin[k-1] = true;  //记录合并位置
                    }else{
                        break;
                    }
                    k--;
                } 
            });
            this.nums = this.tranSlates(tmp,4-i);//转置回去，把数据还给this.nums
            hasMove && this.randomAdd();
        },
        save(){
           localStorage['save'] = JSON.stringify(this.nums); 
        },
        //重置游戏
        reset(){
            this.nums = Array(16).fill('');
            let i =0;
            while(i++<2){ //随机添加2个
               this.randomAdd(); 
            }
        },
        isPass(){
            let isOver=true,hasPass=false,tmp = this.tranSlates(this.nums,1);
            this.nums.forEach((i,j)=>{
                if(this.nums[j-4] == i || this.nums[j+4] == i || tmp[j-4] == tmp[j] || tmp[j+4] == tmp[j]){
                    isOver = false;
                }
                if(i==2048){
                    hasPass = true;
                }
            });
            if(!this.blankIndex().length){
                isOver && alert('游戏结束！');
            };
        }
    }
})
</script>

<style>
    @import url(../css/main.css);
</style>