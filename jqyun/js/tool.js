//根据pid找到第一级子数据
    function fndata (data,id) {
        var arr=[];
        var _files=data.files;
        for (var i = 0; i < _files.length; i++) {
            if(_files[i].pid==id){
                arr.push(_files[i]);
            }
        }
        // console.log(arr);
        return arr;
    }


//找到id的所有祖宗pid
    function allParentId (data,id) {
        var arr=[];
        var _files=data.files;
        var temp=id;
        while (fnPid(data,temp)!=-1) {
            arr.push(fnPid(data,temp));
            temp=fnPid(data,temp);
            if (!temp&&temp!=0) {
                console.log(temp);
                break;
            }

        }
        return arr;
    }

//返回id的pid
    function fnPid (data,id) {
        var _files=data.files;
        for (var i = 0; i < _files.length; i++) {
            if(_files[i].id==id){
                return _files[i].pid;           
            }
        }
        return null;
    }

//通过id找到对应的数据json
    function fndataByID (data,id) {
        var _files=data.files;
        for (var i = 0; i < _files.length; i++) {
            if(_files[i].id==id){
                return _files[i];
            }
        }
        return null;
    }

//生成随机ID且不与现有的重复
    function fnProID(data) {
        var num;
        var onOff=true;
        num=Math.round(Math.random()*100000);


        while (onOff) {
            if (fnIfRepeat(data,num)) {
                num=Math.round(Math.random()*100000);
            }else {
                onOff=false;
            }
        }


        return num;
    }

//判断ID是否重复
    function fnIfRepeat(data,num) {
        var _files=data.files;
        for (var i = 0; i < _files.length; i++) {
            if(_files[i].id==num){
                return true;
            }
        }
        return false;
    }

//通过id删除对应数据,并返回删除的数据
    function fnDeleteByID(data,id) {
        var _files=data.files;
        for (var i = 0; i < _files.length; i++) {
            if(_files[i].id==id){
                return _files.splice(i, 1)[0];
            }
        }
    }


//判断同父级pid下是否重名
    function fnTitleRepeat (data,pid,title,id) {
        var _files=data.files;
        for (var i = 0; i < _files.length; i++) {
            if (id&&_files[i].id==id) {
                continue;
            }
            if(_files[i].pid==pid&&_files[i].title==title){         
                return true;//有
            }
        }
        return false;//无
    }


    function fndataByTitleArr(data, arr) {

        var _files = data.files;
        var n = 0;      
        var nowpid = 0;
        if (!arr) {
            return nowpid;
        }
        while (n < arr.length) {

            var nowtitle = arr[n];
            for (var i = 0; i < _files.length; i++) {
                if (_files[i].pid == nowpid && _files[i].title == nowtitle) {
                    nowpid = _files[i].id;
                    break;
                }
            }
            n++;
        }

        return nowpid;

    }

// var arrtttt=["我的音乐", "周杰伦"];
// console.log(fndataByTitleArr(data,arrtttt));

//判断id是否是PPid的子孙, 
//是子孙返回true
//不是子孙返回false
    function fnifPPid (id,PPid) {
        var arrPPids=allParentId (data,id);
        var onOff=false;
        for (var i = 0; i < arrPPids.length; i++) {
            if (arrPPids[i]==PPid) {
                onOff=true;
            }
        }
        return onOff;
    }

    function fnAllSonsID (ppid) {
        var arr=[];
        var _files = data.files;
        for (var i = 0; i < _files.length; i++) {
            if (fnifPPid (_files[i].id,ppid)) {
                arr.push(_files[i].id);
            }
        }
        return arr;
    }

// console.log(fnAllSonsID (2));
//碰撞检测
    function pz(obj1,obj2){
        if(getPos(obj1).right<getPos(obj2).left||getPos(obj1).bottom<getPos(obj2).top||getPos(obj2).right<getPos(obj1).left||getPos(obj1).top>getPos(obj2).bottom){
            return false;
        }else{
            return true;
        }
    }
    function getPos(obj){
        return obj.getBoundingClientRect();
    }
//获取选中元素
    function checkCount() {
        var json = {};
        json.num = 0;
        json.arr = [];
        for (var i = 0; i < $('dd').children().length; i++) {
            if ($('dd').find('.gridItem')[i]._checked == true) {
                json.num++;
                json.arr.push($('dd').find('.gridItem')[i]);
            }
        }
        if (json.num == 1) {
            json.obj = json.arr[0];
        }
        return json;
    }
//判断是否全选
    function checkifAll() {
        for (var i = 0; i < $('dd').find('.gridItem').length; i++) {
            if ($('dd').find('.gridItem')._checked == false) {
                return false;
            }
        }
        return true;
    }
//记录已加载个数
    function loadedCount() {
        $('#main .history em').html(`已加载了${$('dd').find('.gridItem').length}个`);
    }