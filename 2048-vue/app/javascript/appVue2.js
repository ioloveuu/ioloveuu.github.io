'use strict';

// 注册
Vue.component('c', {
    template: '#c',
    data: function data() {
        return {
            show: 0,
            msg: '',
            pass: false,
            start: {}, //记录移动端触摸起始点
            nums: [] //记录16个框格的数字
        };
    },

    mounted: function mounted() {
        document.addEventListener('keyup', this.keyDown);
        document.querySelector('#app ul').addEventListener('touchstart', this.touchStart);
        document.querySelector('#app ul').addEventListener('touchend', this.touchEnd);
        //document上获取touchmove事件 如果是由.box触发的 则禁止屏幕滚动
        document.addEventListener('touchmove', function (e) {
            e.target.classList.contains('box') && e.preventDefault();
        });
        localStorage['save'] ? this.nums = JSON.parse(localStorage['save']) : this.reset();
    },
    directives: {
        getclass: function getclass(num, el) {
            var classes = num.classList;
            Array.prototype.forEach.call(classes, function (_) {
                if (/^s\w+$/.test(_)) {
                    console.log(_);
                    classes.remove(_);
                    console.log(classes);
                }
            });
            el.value ? classes.add('s' + el.value) : classes.add('empty');
        },

        // 自定义指令钩子函数指令
        getposition: function getposition(el, index) {
            // console.log(index)
            el.style.left = index.value % 4 * 25 + '%';
            el.style.top = Math.floor(index.value / 4) * 25 + '%';
        }
    },
    methods: {
        // 随机添加4和2
        randomAdd: function randomAdd() {
            var arr = this.shuffle(this.blankIndex()),
                n = Math.random() > 0.9 ? 4 : 2;
            //Vue2.0的set
            Vue.set(this.nums, arr.pop(), n);
        },

        // 获取当前空白隔索引组成的数组
        blankIndex: function blankIndex() {
            var arr = [];
            this.nums.forEach(function (i, j) {
                i === '' && arr.push(j);
            });
            return arr;
        },

        // 随机打乱数组
        shuffle: function shuffle(arr) {
            var l = arr.length,
                j = void 0;
            while (l--) {
                j = parseInt(Math.random() * l);
                var _ref = [arr[j], arr[l]];
                arr[l] = _ref[0];
                arr[j] = _ref[1];
            }
            return arr;
        },

        // 数组改变方向变为矩阵转置
        tranSlates: function tranSlates(arr, n) {
            n = n % 4;
            if (n === 0) {
                return arr;
            }
            var l = arr.length,
                d = Math.sqrt(l),
                tmp = [];
            for (var i = 0; i < d; i += 1) {
                for (var j = 0; j < d; j += 1) {
                    tmp[d - i - 1 + j * d] = arr[i * d + j];
                }
            }
            if (n > 1) {
                tmp = this.tranSlates(tmp, n - 1);
            }
            return tmp;
        },
        touchStart: function touchStart(e) {
            // console.log(this)
            this.disX = e.changedTouches[0].pageX;
            this.disY = e.changedTouches[0].pageY;
        },
        touchEnd: function touchEnd(e) {
            var curPoint = e.changedTouches[0],
                x = curPoint.pageX - this.disX,
                y = curPoint.pageY - this.disX,
                xx = Math.abs(x),
                yy = Math.abs(y),
                i = 0;
            if (xx < 50 && yy < 50) return;
            if (xx >= yy) {
                i = x < 0 ? 0 : 2; //横向滑动
            } else {
                i = y < 0 ? 3 : 1; //纵向滑动
            }
            this.control(i);
        },
        keyDown: function keyDown(e) {
            var map = { 37: 0, 38: 3, 39: 2, 40: 1 };
            if (!(e.keyCode in map)) {
                return;
            };
            this.control(map[e.keyCode]);
        },
        control: function control(i) {
            this.move(i);
            this.save();
            this.judge();
        },

        // 移动滑块  
        move: function move(i) {
            var tmp = this.tranSlates(this.nums, i),
                //把任意方向键转置，当成向左移动
            hasMove = false,
                //一次操作有移动方块时才添加方块
            hasCombin = {}; //记录合并
            tmp.forEach(function (j, k) {
                while (k % 4 && j !== '') {
                    if (tmp[k - 1] === '') {
                        //当前位置的前一位置为空,交换俩位置
                        tmp[k - 1] = j;
                        tmp[k] = '';
                        hasMove = true;
                        if (hasCombin[k]) {
                            hasCombin[k - 1] = true;
                            hasCombin[k] = false;
                        }
                    } else if (tmp[k - 1] === j && !hasCombin[k] && !hasCombin[k - 1]) {
                        //当前位置与前一位置数字相同，合并到前一位置，然后清空当前位置
                        j *= 2;
                        tmp[k - 1] = j;
                        tmp[k] = '';
                        hasMove = true;
                        hasCombin[k - 1] = true; //记录合并位置
                    } else {
                        break;
                    }
                    k--;
                }
            });
            this.nums = this.tranSlates(tmp, 4 - i); //转置回去，把数据还给this.nums
            hasMove && this.randomAdd();
        },
        save: function save() {
            localStorage['save'] = JSON.stringify(this.nums);
        },

        //重置游戏
        reset: function reset() {
            this.nums = Array(16).fill('');
            var i = 0;
            while (i++ < 2) {
                this.randomAdd();
            }
        },
        judge: function judge() {
            var _this = this;

            var isOver = true,
                tmp = this.tranSlates(this.nums, 1);
            this.nums.forEach(function (i, j) {
                if (_this.nums[j - 4] == i || _this.nums[j + 4] == i || tmp[j - 4] == tmp[j] || tmp[j + 4] == tmp[j]) {
                    isOver = false;
                }
                if (i == 2048 && !_this.pass) {
                    _this.msg = "2048";
                    _this.show = 1;
                    _this.pass = true;
                }
            });
            if (!this.blankIndex().length) {
                isOver && alert('游戏结束！');
            };
        }
    }
});
new Vue({
    el: 'c'
});