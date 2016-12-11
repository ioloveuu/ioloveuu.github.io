//搜索框事件 不完全
    $('#search input').on({
        focus:function(){
            var name = this.value;
            var list = [];
            for(var i = 0; i < data.files.length;i++){
                list.push(data.files[i].title)
            }
            var newList = list.filter(function (item){
                return item.indexOf(name) !== -1   
            })
            console.log(newList);
        },
        blur:function(){
            if (this.value == '') {
                this.value = '搜索你的文件';
            };
        }
    })

    document.body.onselectstart = function(ev) {
        ev = ev || window.event;
        ev.preventDefault(); //标准
        ev.returnValue = false; //IE
        return false; //用于处理使用对象属性注册的处理程序
    }
    //objRename 记录重命名的obj
    var objRename = null;
    //重命名ing
    var Rename = false;
    //新建文件夹的命名框
    var namebox = null;
    //记录当前文件夹父级ID
    var folderPid = 0;

//处理hash
    function hashinitial() {
        var hash = window.location.hash;
        var arrHash = hash.match(/(path=)([^&]+)/);
        var arrTemp = [];
        var hashPid = 0;
        if (arrHash && arrHash[2]) {
            arrTemp = arrHash[2].match(/[^/^\\]+/g);
            // console.log(arrHash, arrTemp);
            hashPid = fndataByTitleArr(data, arrTemp);
        }
        fnPageID(hashPid); //初始化
        fnHistory(hashPid);
    }

    if (window.location.hash) {
        hashinitial();
    } else {
        fnPageID(0); //初始化
        fnHistory(0);
    }
    window.onhashchange = function() {
        hashinitial();
    }

//点击删除
    $('.confirm').click(function() {
        var Folders = $('dd').find('.checked');
        var arrID = [];
        for (var i = 0; i < Folders.length; i++) {
            // 确定删除添加数组
            Folders[i].remove();
            arrID.push(Folders[i]._id);
        }
        for(var id of arrID){
            dataDelete.files.push(fnDeleteByID(data, id));
        }
        $('.checkAll')._checked = false;
        $('.checkAll').css('backgroundPosition','0 0');
        $('#operateDisplay').css('display','none');
        $('#confirmDelete').css('display','none');
        loadedCount();
    })
    //删除弹窗,取消按钮
    $('#confirmDelete .footer a.cancel').on('click',function(){
        $('#confirmDelete').css('display','none');
    })
    // 拖拽确认删除框
    var orgLeft = $('#confirmDelete').offset().left;
    var orgTop = $('#confirmDelete').offset().top;

    $('#confirmDelete .header').mousedown(function(e) {
        e = e || event;
        var disX = orgLeft - e.clientX;
        var disY = orgTop - e.clientY;
        var t = 0;
        var l = 0;
        if ($('#confirmDelete').css('top')) {
            t = parseFloat($('#confirmDelete').css('top'));
        }
        if ($('#confirmDelete').css('left')) {
            l = parseFloat($('#confirmDelete').css('left'));
        }
        $(document).mousemove(function(e){
            $('#confirmDelete').css('left',(e.pageX + disX - orgLeft + l / 2) * 2);
            $('#confirmDelete').css('top',(e.pageY + disY - orgTop + t / 2) * 2);
        })
        $(document).mouseup(function(){
            $(document).off();
        })
   
    })


//新建文件夹按钮
    $('.newfolder').on('click' ,function() {
    if (Rename) {
        namebox.select();
        return;
    }
    var div1 = newFolder(true);
    namebox = fnDiv3(div1, true);
    Rename = true;
    $(this)._checked = false;
    $('.checkAll').css('backgroundPosition','0 0');
    for (var i = 0; i < $('dd').children().length; i++) {
        $('dd').find('.gridItem')._checked = false;
    }
        $('.countTips').html(`已选中${checkCount().num}个文件/文件夹`);
        loadedCount();
    });

//生成历史导航
    function fnHistory(id) {
        if ((!id) && id !== 0) {
            return;
        }
        var arr = allParentId(data, id);
        if (arr.length == 0) {
            $('.historyListManager').css('display','none');
            window.location.hash = "path=/";
            return;
        }
        $('.historyListManager').css('display','block');
        var prev = fnPid(data, id);
        var li1 = document.createElement('li');
        var span1 = document.createElement('span');
        var a1 = document.createElement('a');
        a1.href = "javascript:;";
        a1.innerHTML = "返回上一级";
        a1.onclick = function() {
            fnPageID(prev);
            fnHistory(prev);
        }
        span1.className = "historylistmanager-separator";
        span1.innerHTML = "|";
        li1.appendChild(a1);
        li1.appendChild(span1);
        $('.historyListManager').html('');
        $('.historyListManager').append(li1);
        var str = "";
        for (var i = arr.length - 1; i >= 0; i--) {
            var json = fndataByID(data, arr[i]);
            var li2 = document.createElement('li');
            var a2 = document.createElement('a');
            var span2 = document.createElement('span');
            a2.href = "javascript:;";
            a2.innerHTML = json.title;
            a2.dataId = arr[i];
            a2.onclick = function() {
                fnPageID(this.dataId);
                fnHistory(this.dataId);
            }
            span2.innerHTML = "&gt;";
            li2.appendChild(a2);
            li2.appendChild(span2);
            $('.historyListManager').append(li2);
            if (i < arr.length - 1) {
                str += "/" + json.title;
            }
        }
        var li3 = document.createElement('li');
        var span3 = document.createElement('span');
        span3.innerHTML = fndataByID(data, id).title;
        li3.appendChild(span3);
        $('.historyListManager').append(li3);
        str += "/" + span3.innerHTML;
        console.log(str);
        window.location.hash = "path=" + str;
    }

//删除按钮
    $('.delete')[0].onclick = function() {
        $('#confirmDelete').css('display','block');
    }

//全选按钮
    $('.checkAll').on('click',function(){
        if (Rename) {
            return;
        }
        if ($('dd').find('.gridItem').length == 0) {
            return;
        }
        if (this._checked) {
            this._checked = false;
            $('.checkAll').css('backgroundPosition','0 0');
            for (var i = 0; i < $('dd').find('.gridItem').length; i++) {
                $('dd').find('.gridItem')._checked = false;
                $('dd').find('.gridItem').removeClass('checked');
            }
            fnOperateReset();
        } else {
            this._checked = true;
            // console.log("全选中")
            $('.checkAll').css('backgroundPosition','-40px 0');
            for (var i = 0; i < $('dd').find('.gridItem').length; i++) {
                $('dd').find('.gridItem')._checked = true;
                $('dd').find('.gridItem').addClass('checked');
            }
            fnRenameUN();
            $('.countTips').html(`已选中${$('dd').find('.gridItem').length}个文件/文件夹`);
            $('#operateDisplay').css('display','block');
        }
    })

//禁用重命名
    function fnRenameUN() {
        objRename = null;
        $('a.ico3').eq(0).css('color','#e7e7e7');
        $('a.ico3').eq(0).css('backgroundColor','#a1a1a1');
        $('a.ico3').eq(0).css('cursor','context-menu');
        $('a.ico3').eq(0)._disabled = true;
    }
//启用重命名
    function fnRename() {
        objRename = checkCount().obj;
        $('a.ico3').eq(0).css('cssText','');
        $('a.ico3').eq(0)._disabled = false;
    }


//重命名按钮
    $('a.ico3').eq(0).on('click',function(){
        if ($(this)._disabled || Rename) {
            return;
        }
        if (objRename) {
            // console.log(objRename);
            Rename = true;
            fnDiv3(objRename, false);
        }
    })
    // <div class="rename">
    //     <input type="text">
    //     <span class="_true"></span>
    //     <span class="_false"></span>
    // </div>
//重命名输入框
    function fnDiv3(div1, onOff) {
        var div3 = document.createElement('div');
        var input1 = document.createElement('input');
        var _true = document.createElement('span');
        var _false = document.createElement('span');
        var a = div1.querySelector('a');

        input1.type = "text";
        input1.value = a.innerHTML;

        _true.onclick = function(ev) {
            ev = ev || window.event;
            ev.stopPropagation();
            Rename = false;
            div1.removeChild(div3);
            loadedCount();
            var tailnum = 1;
            var tempTitle = input1.value;
            if (onOff) {

                // console.log(fnTitleRepeat (data,folderPid,input1.value));
                while (fnTitleRepeat(data, folderPid, input1.value)) {
                    input1.value = tempTitle + '(' + tailnum + ')';
                    tailnum++;
                    console.log(input1.value);
                }
                if (input1.value != '') {
                    a.innerHTML = input1.value;
                }
                var json = {};
                json.pid = folderPid;
                json.id = fnProID(data);
                json.title = input1.value;
                json.type = 'file';

                div1._pid = json.pid;
                div1._id = json.id;

                data.files.unshift(json);
                // console.log(data);
            } else {
                while (fnTitleRepeat(data, folderPid, input1.value, div1._id)) {
                    input1.value = tempTitle + '(' + tailnum + ')';
                    tailnum++;
                    console.log(input1.value);
                }
                if (input1.value != '') {
                    a.innerHTML = input1.value;
                }
                fndataByID(data, div1._id).title = input1.value;
            }
        }
        _false.onclick = function(ev) {
            ev = ev || window.event;
            ev.stopPropagation();
            Rename = false;
            div1.removeChild(div3);
            if (onOff) {
                div1.parentNode.removeChild(div1);
            }
        }
        _true.className = "_true";
        _false.className = "_false";
        div3.className = "rename";
        div3.appendChild(input1);
        div3.appendChild(_true);
        div3.appendChild(_false);
        div1.appendChild(div3);
        input1.select();
        return input1;
    }

//全选复位
    function fnCheckAllReset() {
        $('.checkAll')._checked = false;
        $('.checkAll').css('backgroundPosition','0 0');
    }
//操作栏复位隐藏
    function fnOperateReset() {
        $('countTips').html(`已选中0个文件/文件夹`);
        $('#operateDisplay').css('display','none');
    }



//生成ID为id的页面
    function fnPageID(pid) {
        var temp = fndata(data, pid);
        console.log(temp)
        //渲染页面有几个文件夹
        $('dd').html('');
        for (var i = 0; i < temp.length; i++) {
            newFolder(false, temp[i].title, temp[i].pid, temp[i].id);
        }
        fnCheckAllReset();//全选
        loadedCount(); //已加载
        fnOperateReset(); //操作栏隐藏
    }
//生成文件夹
    function newFolder(_new, _filename, _pid, _id) {
        if (_filename !== 0) {
            _filename = _filename || '新建文件夹';
        }
        if (_pid || _pid === 0) {
            folderPid = _pid;
        }
        var div1 = document.createElement('div');
        var div2 = document.createElement('div');
        var span = document.createElement('span');
        var a = document.createElement('a');
        div1.className = 'gridItem';
        div1._checked = false;
        div1._pid = _pid || 0;
        div1._id = _id || 0;
        div1.onclick = function() {
            if (Rename) {
                return;
            }
            folderPid = div1._id;
            fnPageID(div1._id);
            fnHistory(div1._id);
        }
        span.onclick = function(ev) {
            ev = ev || window.event;
            ev.stopPropagation();
            if (Rename) {
                return;
            }
            div1._checked = !div1._checked;
            div1.className = div1._checked ? "gridItem checked" : "gridItem";

            if (checkCount().num > 0) {
                // console.log(checkCount().num)
                $('.countTips').html(`已选中${checkCount().num}个文件/文件夹`);
                $('#operateDisplay').css('display','block');
            } else {
                $('#operateDisplay').css('display','none');
            }
            if (checkCount().num > 1) {
                fnRenameUN();
            } else {
                fnRename();
            }
            if (checkifAll()) {
                $('.checkAll')._checked = true;
                $('.checkAll').css('backgroundPosition','-40px 0');
            } else {
                $('.checkAll')._checked = false;
                $('.checkAll').css('backgroundPosition','0 0');
            }

        }

        a.onmouseover = function() {
            this.style.textDecoration = "underline";
        }
        a.onmouseout = function() {
            this.style.textDecoration = "none";
        }
        div2.className = 'dirLarge';
        a.className = 'filename';
        a.href = "javascript:;";
        a.innerHTML = _filename;
        div2.appendChild(span);
        div1.appendChild(div2);
        div1.appendChild(a);
        div1.onmouseover = function() {
            if (this._checked || Rename) {
                return;
            }
            this.className = "gridItem hover";
        }

        div1.onmouseout = function() {
            if (this._checked || Rename) {
                return;
            }
            this.className = "gridItem";
        }

        if (_new) {
            if ($('.gridItem')) {
                $('.gridItem').eq(0).before(div1);
                // oDd.insertBefore(div1, oDd.firstElementChild);
            } else {
                $('dd').append(div1);
                // oDd.appendChild(div1);
            }
        } else {
            $('dd').append(div1);
            // oDd.appendChild(div1);
        }
        return div1;
    }

// 框选
    $('.gridView').on('mousedown',function(e) {
        if (Rename) {
            return;
        }
        e = e || event;
        var div = document.createElement('div');
        div.className = "selectDiv";
        var left1 = e.pageX;
        var top1 = e.pageY;
        document.body.appendChild(div);
        document.onmousemove = function(e) {
            e = e || event;
            var w = e.pageX - left1;
            var h = e.pageY - top1;
                // console.log(w,h);
                if (w < 0) {
                    div.style.left = e.pageX + "px";
                    div.style.width = -w + "px";
                } else {
                    div.style.left = left1 + "px";
                    div.style.width = w + "px";
                }
                if (h < 0) {
                    div.style.top = e.pageY + "px";
                    div.style.height = -h + "px";
                } else {
                    div.style.top = top1 + "px";
                    div.style.height = h + "px";
                }
                var arr = [];
                for (var i = 0; i < $('dd').find('.gridItem').length; i++) {
                    if (pz($('dd').find('.gridItem')[i], div)) {
                        arr.push($('dd').find('.gridItem')[i]);
                    }
                    $('dd').find('.gridItem')[i]._checked = false;
                    $('dd').find('.gridItem').removeClass('checked');
                }
                for (var i = 0; i < arr.length; i++) {
                    arr[i]._checked = true;
                    arr[i].className = "gridItem checked";
                }
                if (arr.length > 0) {
                    $('#operateDisplay').css('display','block');
                } else {
                    $('#operateDisplay').css('display','none');
                }
                $('.countTips').html(`已选中${arr.length}个文件/文件夹`);
                if (arr.length > 1) {
                    fnRenameUN();
                } else {
                    fnRename();
                }
                if (arr.length > 0 && arr.length == $('dd').find('.gridItem').length) {
                    $('.checkAll')._checked = true;
                    $('.checkAll').css('backgroundPosition','-40px 0');
                } else {
                    fnCheckAllReset();
                }
                return false;
        }
        document.onmouseup = function() {
            document.body.removeChild(div);
            document.onmouseup = document.onmousemove = null;
        }
    })