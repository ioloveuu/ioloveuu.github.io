// 初始化数据 ( 请求数据 )
$.dataFunction = function(options){
    var opts = $.extend({
        ajaxUrl : "",
        caseType : "",
        selectBoolean : true,
        tabledataObj : $(".qiye-tabs-style tbody"),
        starDate : $("#txtStartDate"),  //开始时间
        endDate : $("#txtEndDate")      //结束时间
    }, options);
    $.getJSON('data2.json',function(data){
        var trStr = '', tdStr = '';
        switch(opts.caseType){
            //  首页表格
            case "index-table":
            for(k in data){
                tdStr = '';
                var num = parseInt(k.slice(k.length-1));
                for(j in data[k]){
                    tdStr='<td class="yuan-iocn color-bor'+(num%6)+'">'+data[k].td1+'</td><td>'+data[k].td2+'</td><td class="tabs-fore3">'+data[k].td3+'</td>';
                }
                trStr += '<tr>'+tdStr+'</tr>';
            };
            $('.qiye-fenxi-tabs tbody').append(trStr);
            break;
            //top-table
            case "top-table":
            for(k in data){
                tdStr = '';
                for(j in data[k]){
                    tdStr='<td><span class="qiye-top-radius qiye-top-red">1</span>'+data[k].td1+'</td><td>'+data[k].td2+'</td><td>'+data[k].td3+'</td><td>'+data[k].td4+'</td>';
                }
                trStr += '<tr>'+tdStr+'</tr>';
            }
            $('.qiye-tabs-style tbody').append(trStr);
            break;
            //可以在switch外面合并为opts.tabledataObj.html( dataStr);
            case "kpi-table":
            for(k in data){
                tdStr = '';
                tdStr='<td>'+data[k].td1+'</td><td>'+data[k].td3+'</td><td>'+data[k].td4+'</td><td>'+data[k].td5+'</td><td>'+data[k].td6+'</td>';
                for(j in data[k]){
                    // tdStr='<td>'+data[k].td1+'</td><td>'+data[k].td3+'</td><td>'+data[k].td4+'</td><td>'+data[k].td5+'</td><td>'+data[k].td6+'</td>';
                }
                trStr += '<tr>'+tdStr+'</tr>';
            }
            break;
            case "more-prject-table":
            for(k in data){
                tdStr = '';
                for(j in data[k]){
                    tdStr='<td>'+data[k].td1+'</td><td>'+data[k].td2+'</td><td>'+data[k].td3+'</td><td>'+data[k].td4+'</td><td>'+data[k].td5+'</td><td>'+data[k].td5+'</td>';
                }
                trStr += '<tr>'+tdStr+'</tr>';
            }
            break;
            case "leave-word-table":
            for(k in data){
                tdStr = '';
                for(j in data[k]){
                    tdStr='<td>'+data[k].td1+'</td><td>'+data[k].td3+'</td><td>'+data[k].td4+'</td><td>'+data[k].td6+'</td><td>'+data[k].td5+'</td><td>'+data[k].td3+'</td>';
                }
                trStr += '<tr>'+tdStr+'</tr>';
            }
            break;
        }
        opts.tabledataObj.append(trStr);
    });
};
// 设置请求内容：项目或时间  加个定时器
$.fn.dateSearch = function(options){
    var opts = $.extend({
        starDate : "",  //开始时间
        endDate : "",   //结束时间
        projectName : "",  //项目名称
        ajaxUrl : "",   // 请求地址
    }, options );
    return this.each(function(i){
        var _this = $(this);
        $(".project-warn-info").hide();
        _this.on("click",function(){
            console.log('ajax')
            var dataType = $(this).attr("data-type");
            if( opts.starDate !='' && opts.endDate != '' ){
                var starTime = parseInt( opts.starDate.val().split('-').join('') );
                var endTime = parseInt( opts.endDate.val().split('-').join('') );
                if( starTime > endTime ){
                    $(".project-warn-info").show();
                    return;
                }
            }
            $(".box1").hide();
            $(".project-control").hide();
            $("#bg").hide();
            $(".turn-tit-box").hide();
            $(".control-tit-box .turn-tit").hide();
            switch(dataType){
                //  首页
                case "index-table" :
                $.dataFunction({
                    ajaxUrl : "data2.json",
                    caseType :  dataType
                });
                break;
                // top排行
                case "top-table" :
                $.dataFunction({
                    ajaxUrl : "data2.json",
                    caseType :  dataType
                });
                // 单选
                case "jump" :
                $.dataFunction({
                    ajaxUrl : "data2.json",
                    caseType :  dataType
                });
                break;
                // 客户KPI
                case "kpi-table" :
                $.dataFunction({
                    ajaxUrl : "data2.json",
                    caseType :  dataType
                });
                break;
                //  更多项目概况
                case "more-prject-table" :
                $.dataFunction({
                    ajaxUrl : "data2.json",
                    caseType :  dataType,
                });
                break;
                //  留言概况
                case "leave-word-table" :
                $.dataFunction({
                    ajaxUrl : "data2.json",
                    caseType :  dataType,
                });
                break;

            };
        });
    });
};
//   3级tab  2级tab
$.fn.tabJs = function(options){
    var opts = $.extend( {
        ajaxUrl : "",
        caseType : "",
        selectBoolean : true,
        onClass:"",
        onStyle : "clickObj"  //clickObj(对象本身确定) dbclickObj(用button确定)
    }, options );
    return this.each(function(i){
        //console.log(this); //全部li的父级
        //console.log(_this);//当前li
        var _this = $(this);
        _this.on("click",function(){
            // console.log(opts.onClass)
            _this.toggleClass(opts.onClass).siblings().removeClass(opts.onClass);  //类的添删
        })
    })
};
//jump
;(function($){
$.links = function(obj){
    $(document).on('click',obj,function(event) {
        if($(this).attr("_href") != ''){
            var hrefStr = $(this).attr("_href");
            console.log("jump")
            // JsInvoke.pageJump(hrefStr);
        }
        return false;
    });
};
$.links(".targetLinks");
})(jQuery);

