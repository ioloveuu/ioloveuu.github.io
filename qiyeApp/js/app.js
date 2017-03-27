//  用户ID
var getUserId = "zzh31";
//请求时间
var appnum = "d52f0fcda612e73c2f03fd33972902d5";
// var getUserId = Js.getId();
// var appNum = Js.getNum();
// 表格初始化数据 ( 请求数据 )
$.dataFunction = function(options){
    var opts = $.extend({
        ajaxUrl : "",
        caseType : "",
        selectBoolean : true,
        tabledataObj : $(".qiye-tabs-style tbody"),
        starDate : $("#txtStartDate"),  //开始时间
        endDate : $("#txtEndDate")      //结束时间
    }, options);
    // $.getJSON(opts.ajaxUrl+'user_name='+getUserId+'&check_token='+appnum+'&custom_ids=&sdate=2017-03-01&edate=2017-03-07&callback=?',function(json){
    $.getJSON('data3.json',function(json){
        var trStr = '', tdStr = '';
        var json = (typeof json)!= "object" ? $.parseJSON(json) : json;
        if(json.status == 1){
            //json只取前5个
            qiye_info = $.grep(json.data,function(item,index){ 
                    return index<5;
            });
            top_info = $.grep(json.data,function(item,index){ 
                    return index<10;
            });
            switch(opts.caseType){
                //  首页表格 获取格式 用户id-时间-项目-平台-转化率-数据(由日期判断)
                case "index-table":
                for(k in qiye_info){
                    var num = parseInt(k.slice(k.length-1));
                    var custom_name = qiye_info[k].custom_name != null ? qiye_info[k].custom_name : '';
                    var plat_name = qiye_info[k].plat_name != null ? qiye_info[k].plat_name : '';
                    var percent = qiye_info[k].percent != null ? qiye_info[k].percent : [];
                    var pvnum = qiye_info[k].pvnum != null ? qiye_info[k].pvnum : [];
                    tdStr ='<td class="yuan-iocn color-bor'+(num%6)+'">'+custom_name+'</td><td>'+plat_name+'</td><td class="tabs-fore3">'+percent[0]+'‰</td><td class="tabs-fore3">'+pvnum[0]+'</td>';
                    trStr += '<tr>'+tdStr+'</tr>';
                };
                $('.qiye-fenxi-tabs tbody').append(trStr);
                break;
                //top-table
                case "top-table":
                for(k in top_info){
                    var custom_name = top_info[k].custom_name != null ? top_info[k].custom_name : '';
                    var plat_name = top_info[k].plat_name != null ? top_info[k].plat_name : '';
                    var percent = top_info[k].percent != null ? top_info[k].percent : [];
                    var pvnum = top_info[k].pvnum != null ? top_info[k].pvnum : [];
                    tdStr ='<td><span class="qiye-top-radius qiye-top-red">1</span>'+custom_name+'</td><td>'+percent[0]+'</td><td>'+pvnum[0]+'</td><td>'+percent[0]+'</td>';
                    trStr += '<tr>'+tdStr+'</tr>';
                }
                $('.qiye-tabs-style tbody').append(trStr);
                break;
                //可以在switch外面合并为opts.tabledataObj.html( dataStr);
                case "kpi-table":
                // for(k in data){
                //     tdStr='<td>'+data[k].projectName+'</td><td>'+data[k].conver+'</td><td>'+data[k].td4+'</td><td>'+data[k].td5+'</td><td>'+data[k].td6+'</td>';
                //     trStr += '<tr>'+tdStr+'</tr>';
                // }
                //数据保存起来 6个
                
                break;
                case "more-prject-table":
                for(k in qiye_info){
                    var custom_name = qiye_info[k].custom_name != null ? qiye_info[k].custom_name : '';
                    var plat_name = qiye_info[k].plat_name != null ? qiye_info[k].plat_name : '';
                    var percent = qiye_info[k].percent != null ? qiye_info[k].percent : [];
                    var pvnum = qiye_info[k].pvnum != null ? qiye_info[k].pvnum : [];
                    tdStr ='<td>'+custom_name+'</td><td>'+percent[0]+'</td><td>'+percent[0]+'</td><td>'+percent[0]+'</td><td>'+percent[0]+'</td><td>'+percent[0]+'</td>';
                    trStr += '<tr>'+tdStr+'</tr>';
                }
                break;
                case "leave-word-table":
                for(k in qiye_info){
                    var custom_name = qiye_info[k].custom_name != null ? qiye_info[k].custom_name : '';
                    var plat_name = qiye_info[k].plat_name != null ? qiye_info[k].plat_name : '';
                    var percent = qiye_info[k].percent != null ? qiye_info[k].percent : [];
                    var pvnum = qiye_info[k].pvnum != null ? qiye_info[k].pvnum : [];
                    tdStr ='<td>'+custom_name+'</td><td>'+percent[0]+'</td><td>'+percent[0]+'</td><td>'+percent[0]+'</td><td>'+percent[0]+'</td><td>'+percent[0]+'</td>';
                    trStr += '<tr>'+tdStr+'</tr>';
                }
                break;
            }
            opts.tabledataObj.append(trStr);
        }else{
            opts.tabledataObj.append('<div>'+json.msg+'</div>'); //给弹窗加样式
        }
    });
};
//eCharts
$.eCharts = function(options){
    var opts = $.extend({
        ajaxUrl : "",
        caseType : "",
        selectBoolean : true,
    }, options);
    $.getJSON(opts.ajaxUrl+'user_name='+getUserId+'&check_token='+appnum+'&sdate=2017-01-01&edate=2017-01-02&callback=?',function(json){
        var json = (typeof json)!= "object" ? $.parseJSON(json) : json;
        console.log(json.data)
        var arr=[];
        var arr2=[];
            for(k in json.data){
            arr.push(json.data[k].name);
            arr2.push(json.data[k].val)
        }
        // console.log(arr,arr2)
        if(json.status == 1){
            var myChart = echarts.init(document.getElementById('main'));
            // console.log(arr)
            switch(opts.caseType){
                case "time":
                var xMax=100;
                option = {
                    tooltip:{
                        show:true,
                        formatter:"{b} {c}"
                    },
                    grid:{
                        left:'40%',
                        top:'5%',
                        bottom:'0',
                        right:'0'
                    },
                    xAxis : [
                        {
                            max:xMax,
                            type : 'value',
                            axisTick: {
                            show: false,
                            },
                            axisLine: {
                                show:false,
                            },
                            axisLabel: {
                                show:false
                            },
                            splitLine: {
                                show: false
                            }
                        }
                    ],
                    yAxis : [
                        {
                            type : 'category',
                            data : arr,
                            offset: 260,
                            axisLabel : {
                                formatter: '{value}',
                                textStyle: {
                                    color: '#000',
                                    fontSize: 26,
                                    align:'left'
                                }
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                show: false,
                            }
                        }
                    ],
                    series : [
                        {
                            name:' ',
                            type:'bar',
                            barWidth:16,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'right',
                                    offset: [-5,-5],
                                    textStyle: {
                                        color: '#d3d3d3',
                                        fontSize: 26
                                    }
                                }
                            },
                            data:[
                                {
                                    value:arr2[0],
                                    itemStyle:{
                                        normal:{color:'#b7ce9e'}
                                    }
                               },{
                                    value:arr2[1],
                                    itemStyle:{
                                        normal:{color:'#acd680'}
                                    }
                                },{
                                    value:arr2[2],
                                    itemStyle:{
                                        normal:{color:'#88e186'}
                                    }
                                },{
                                    value:arr2[3],
                                    itemStyle:{
                                        normal:{color:'#81e7cf'}
                                    }
                                },{
                                    value:arr2[4],
                                    itemStyle:{
                                        normal:{color:'#82dae6'}
                                    }
                                },{
                                    value:arr2[5],
                                    itemStyle:{
                                        normal:{color:'#80cbc4'}
                                    }
                                },{
                                    value:arr2[6],
                                    itemStyle:{
                                        normal:{color:'#80cbc4'}
                                    }
                                },{
                                    value:arr2[7],
                                    itemStyle:{
                                        normal:{color:'#80cbc4'}
                                    }
                                },{
                                    value:arr2[8],
                                    itemStyle:{
                                        normal:{color:'#80cbc4'}
                                    }
                                },{
                                    value:arr2[9],
                                    itemStyle:{
                                        normal:{color:'#80cbc4'}
                                    }
                                }
                            ]
                        }
                    ]
                };
                break;
                case "pie":
                var option = {
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        right: 'right',
                        top: 'top',
                        data: arr //图形项目名称
                    },
                    series : [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius : '55%',
                            label:{
                                normal:{
                                    show:false ,
                                    position : 'outside'
                                },
                                emphasis:{
                                    show :false
                                }
                            },
                            center: ['50%', '40%'],
                            data: json.data
                        }
                    ]
                };
                break;
                case "line":
                var option= {
                    color: ['#24c6c9', '#ffaa62', '#b39be2','#00b419','#5f52a0'], //数据颜色
                    tooltip: {
                        trigger: 'axis'
                    },
                    grid: {
                        left: '0',
                        right: '20',
                        bottom: '3',
                        top:'13',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        nameLocation: 'middle',
                        boundaryGap: false,
                        //网格线
                        splitLine:{
                            show: false,
                            lineStyle:{
                                color:['#b1b1b1'],
                                type:'dashed'
                            }
                        },
                        data: arr2 //数据日期
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} %'
                        }
                    },
                    //数据内容
                    series: [
                        {
                            name:'78商机',
                            type:'line',
                            smooth: true,
                            data:arr2,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'middle'//值显示
                                }
                            }
                        },
                        {
                            name:'23商机',
                            type:'line',
                            smooth: true,
                            lineStyle: {
                                normal:{
                                    type: 'dashed'
                                }
                            },
                            data:['8','9','8','7','8'],
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            }
                        },
                        {
                            name:'89135创业小商机',
                            type:'line',
                            smooth: true,
                            data:['8','7','13','8','13'],
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            }
                        }
                    ]
                };
                break;
            }
            
            myChart.setOption(option); 
        }else{
            alert("fail")
        }
    }); 
}
// 头部初始化数据 ( 请求数据 )
$.headFunction = function(options){
    var opts = $.extend({
        ajaxUrl : "",
        caseType : "",
        selectBoolean : true,
    }, options);
    $.getJSON(opts.ajaxUrl+'user_name='+getUserId+'&check_token='+appnum+'&callback=?',function(json){
        var json = (typeof json)!= "object" ? $.parseJSON(json) : json;
        var ulStr = '', liStr = '';
        console.log(json)
        if(json.status == 1){
            switch(opts.caseType){
                case "index-table":
                for(k in json.data){
                    //列表只循环内容
                    // liStr+='<li><span><img src="'+data[k].pic+'" alt="流量">'+data[k].name+'</span><b>'+data[k].value+'</b></li>';
                    liStr='<li><span><img src="img/liuliang.png" alt="流量">流量</span><b>'+json.data.gb_count+'</b></li><li><span><img src="img/turn.png" alt="转化量">转化量</span><b>'+json.data.pv_count+'</b></li><li><span><img src="img/leaveWord.png" alt="留言量">留言量</span><b>'+json.data.chat_count+'</b></li><li><span><img src="img/ask.png" alt="有效咨询量">有效咨询量</span><b>'+json.data.tong_count+'</b></li><li><span><img src="img/twoside.png" alt="双向接通">双向接通</span><b>'+json.data.weitong_count+'</b></li><li><span><img src="img/noanswer.png" alt="项目方未接">项目方未接</span><b>'+json.data.all_count+'</b></li>';
                };
                ulStr += '<ul class="cfx mod1-list">'+liStr+'</ul>';
                break;
            }
            $('.qiye-mod1').append(ulStr);
            //当前日期
            var str = getBeforeDate(0);
            // console.log(str.slice(-5))
            $('.today').html(str.slice(-5));
        }else{
            $('.qiye-mod1').append('<div>'+json.msg+'</div>'); //给弹窗加样式
        }
    });
};

// 草稿初始化数据 ( 请求数据 )
$.caogaoFunction = function(options){
    var opts = $.extend({
        ajaxUrl : "",
        caseType : "",
        selectBoolean : true,
    }, options);
    $.getJSON(opts.ajaxUrl+'user_name='+getUserId+'&check_token='+appnum+'&callback=?',function(json){
        var json = (typeof json)!= "object" ? $.parseJSON(json) : json;
        var trStr = '', tdStr = '', tabStr = '';
        if(json.status == 1){
            for(k in json.data){
                trStr = '';
                for(j in json.data[k].custom_content){
                    trStr += '<tr><td class="gdtabs-name">'+json.data[k].custom_content[j].name+'</td><td>'+json.data[k].custom_content[j].val+'</td></tr>';
                }
                tabStr +='<table class="gaodan-info-tabs module-bg mt20"><thead><tr><td class="gdtabs-name">客户名称</td><td>'+json.data[k].custom_name+'<i class="arrow-btn"></i></td></tr></thead><tbody class="hide">'+trStr+'</tbody></table>';
            }
            $("#caoGaoDataTabsBox").append(tabStr);
            $("#caoGaoDataTabsBox .gaodan-info-tabs").eq(0).removeClass("mt20");
        }else if(json.status == 0){
            $("#caoGaoDataTabsBox").append('<div>'+json.msg+'</div>');
            alert("404")
        }
    });
};
// 表格开关
$(document).delegate('.gaodan-info-tabs .arrow-btn',"click",function(ev){
  var  $this = $(this);
  $this.parents("table").siblings().find("tbody").hide();
  $this.parents("table").siblings().find(".arrow-btn").removeClass("active")
  $this.toggleClass("active");
  $this.parents("table").find("tbody").toggle();
})
// $('.gaodan-info-tabs .arrow-btn').on('click', );
//  tab初始化 换成循环判断
$.tabFunction = function(options){
    var opts = $.extend({
        ajaxUrl : "",
        caseType : "",
        selectBoolean : true,
        tabsStyleBoolean: true,
        tabsLeftBoolean: true
    }, options);
    // $.getJSON(opts.ajaxUrl+'user_name='+getUserId+'&check_token='+appnum+'&callback=?',function(json){
    $.getJSON('data3.json',function(json){
        var ulStr1 = '', liStr1 = '';
        var ulStr2 = '', liStr2 = '';
        var ulStr3 = '', liStr3 = '';
        var ulStr4 = '', liStr4 = '';
        var ulStr5 = '', liStr5 = '';
        var ulStr6 = '', liStr6 = '';
        var ulStr7 = '', liStr7 = '';
        var leftLi = '',leftUl="";
        // console.log(json.data)
        // console.log(json)
        // for(k in json.data){
        //     console.log(json.data[k].custom_name)
        // }
        var json = (typeof json)!= "object" ? $.parseJSON(json) : json;
            switch(opts.caseType){
                case "index-table":
                if(opts.tabsStyleBoolean){
                        liStr1='';
                    }else{
                        liStr1='<li class="a1"><span class="choose-all">[全选]</span></li>';
                }
                for(k in json.data){
                    // console.log(json.data[k].plat_name)
                    //列表只循环内容  加个排序 这里要判断
                    // console.log(json.data[k].custom_id)
                    if(opts.tabsLeftBoolean){
                        liStr1+='<li class="a1" flot-type="'+json.data[k].custom_id+'"><span class="turn-cont">'+json.data[k].custom_name+'</span><i class=""></i></li>';
                    }
                    // 匹配 obj.match(/(\d+)\_/);//匹配前面 obj.match(/\_(\d+)/);//匹配后面
                    // console.log(json.data[k].custom_id)
                    switch(json.data[k].plat_name){
                            case "23.cn":
                            liStr2+='<li class="a1" flot-type="'+json.data[k].custom_id+'"><span class="turn-cont">'+json.data[k].custom_name+'</span><i class=""></i></li>';
                            break;
                            case "36578.com":
                            liStr3+='<li class="a1" flot-type="'+json.data[k].custom_id+'"><span class="turn-cont">'+json.data[k].custom_name+'</span><i class=""></i></li>';
                            break;
                            case "89178.com":
                            liStr6+='<li class="a1" flot-type="'+json.data[k].custom_id+'"><span class="turn-cont">'+json.data[k].custom_name+'</span><i class=""></i></li>';
                            break;
                            case "k18.com":
                            liStr7+='<li class="a1" flot-type="'+json.data[k].custom_id+'"><span class="turn-cont">'+json.data[k].custom_name+'</span><i class=""></i></li>';
                            break;
                            case "2958.cn":
                            liStr4+='<li class="a1" flot-type="'+json.data[k].custom_id+'"><span class="turn-cont">'+json.data[k].custom_name+'</span><i class=""></i></li>';
                            break;
                            case 2:
                            liStr2+='<li class="a1" flot-type="'+json.data[k].custom_id+'"><span class="turn-cont">'+json.data[k].custom_name+'</span><i class=""></i></li>';
                            break;
                    }
                };
                break;
                case "view-tabs":
                for(k in data){
                        //列表只循环内容             
                    liStr1+='<li class="a1 box-tit ajax-c" data-type="jump">'+data[k].projectName+'<i class=""></i></li>';
                    switch(data[k].pid){
                            case 1:
                            liStr2+='<li class="a1 box-tit ajax-c" data-type="jump">'+data[k].projectName+'<i class=""></i></li>';
                            break;
                            case 2:
                            liStr3+='<li class="a1 box-tit ajax-c" data-type="jump">'+data[k].projectName+'<i class=""></i></li>';
                            break;
                    }
                };
                break;
            }
            var hash = {};
            for ( var i = 0; i < json.data.length; i++) {
            //去除json数组里面重复情况
                (hash[json.data[i]] == undefined) && (hash[json.data[i]["plat_name"]]=json.data[i]["plat_name"]);
                // ulStr1 = '<ul class="fl right-li hide">'+liStr1+'</ul>';
            }
            //设置json长度
            var hashLength = getJsonLength(hash);
            for(var o in hash){
                leftLi+='<li class="box-tit a1">'+hash[o]+'</li>';
                
            }
            // console.log(hash);
            // for(var i = 1;i<=hashLength+1;i++){
            //     console.log(i)
            // }
            
            ulStr3 += '<ul class="fl right-li hide">'+liStr3+'</ul>';
            ulStr4 += '<ul class="fl right-li hide">'+liStr4+'</ul>';
            ulStr5 += '<ul class="fl right-li hide">'+liStr5+'</ul>';
            ulStr6 += '<ul class="fl right-li hide">'+liStr6+'</ul>';
            ulStr7 += '<ul class="fl right-li hide">'+liStr7+'</ul>';
            // leftUl += '<li class="box-tit a1 select">所有平台</li>'+leftLi; //1+6
            if(opts.tabsLeftBoolean){
                        leftUl += '<li class="box-tit a1 select">所有平台</li>'+leftLi;
                        ulStr1 += '<ul class="fl right-li" >'+liStr1+'</ul>';
                        ulStr2 += '<ul class="fl right-li hide">'+liStr2+'</ul>';
                    }else{
                        leftUl += leftLi;
                        ulStr2 += '<ul class="fl right-li">'+liStr2+'</ul>';
            }

            //选项卡上拉加载更多
            $ulStr2 = $(ulStr2);

            var startPosY = 0;
            var ulStartPosY = 0;
            var disXX = 0;
            var restHeight = 0;

            $ulStr2.on('touchstart',function (ev) {
                startPosY = ev.changedTouches[0].pageY;//开始手指位置

                $this = $(this);

                disXX = $this.height() - $this.parent().height();

                restHeight = disXX - $this.parent().scrollTop();

                $ulStr2.css({
                        transition:'transform 0.1s'
                });

            });
            var needMoveY = 0;
            $ulStr2.on('touchmove',function (ev) {
                var nowPosY = ev.changedTouches[0].pageY;//现在手指位置

                var disY = startPosY - nowPosY;

                needMoveY = disY - restHeight;

                if (needMoveY > 0) {
                    if (needMoveY > 89) {
                        needMoveY = 89;
                    }
                    $ulStr2.css({
                        transform:'translateY('+ -needMoveY +'px)',
                        WebkitTransform:'translateY('+ -needMoveY +'px)'
                    });
                    ev.preventDefault();
                }else{
                    $ulStr2.css({
                        transform:'translateY(0px)',
                        WebkitTransform:'translateY(0px)'
                    });
                }
            });

            $ulStr2.on('touchend',function (ev) {
                if (needMoveY >= 40 ) {
                    var $this = this;
                   console.log('加载');                 
                    $.getJSON('data3.json',function(json){
                        var list =  json.data;
                        var liStr = '';
                        for (var i = 0; i < list.length; i++) {
                            liStr += '<li class="a1" flot-type="'+list[i].custom_id+'"><span class="turn-cont">'+list[i].custom_name+'</span><i class=""></i></li>';
                        }
                        $ulStr2.append(liStr);
                        disXX = $ulStr2.height() - $ulStr2.parent().height();
                        $ulStr2.css({
                            transition:'transform 0s',
                        });

                        setTimeout(function(argument) {
                            $ulStr2.css({
                                transform:'translateY(0px)',
                                WebkitTransform:'translateY(0px)'
                            });
                            $('#content').scrollTop($ulStr2.parent().scrollTop() + needMoveY);
                        },100);
                        console.log($ulStr2.parent().scrollTop(),needMoveY);
                    });          
                }else{
                        $ulStr2.css({
                            transition:'transform 0.6s',
                            transform:'translateY(0px)',
                            WebkitTransform:'translateY(0px)'
                        });
                }
            });

            $('.contentBox').append(ulStr1);
            $('.contentBox').append($ulStr2);
            $('.contentBox').append(ulStr3);
            $('.contentBox').append(ulStr4);
            $('.contentBox').append(ulStr5);
            $('.contentBox').append(ulStr6);
            $('.contentBox').append(ulStr7);
            $('.left-li').append(leftUl);

        //json只取前5个 应该不取
        // qiye_info = $.grep(json.data,function(item,index){ 
        //         return index<5;
        // });
        // for(var i = 1;i<=qiye_info.length;i++){
        //     $(".right-li").eq(0).children().eq(i).toggleClass("select").find("i").toggleClass("turn-btn");
        // } 
    });
};

$.viewInfo = function(options){
    var opts = $.extend({
        ajaxUrl : "",
        caseType : "",
        selectBoolean : true,
        tabsStyleBoolean: true,
    }, options);
    params.ajaxUrl = opts.ajaxUrl;

    params.user_name = getUserId;

    params.check_token = appnum;


    // console.log(creatCondition());

    // $.getJSON(opts.ajaxUrl+'user_name='+getUserId+'&check_token='+appnum+'&sdate=2017-01-01&plat=3&gbook_type=1&page=0&custom_id=1552&callback=?',function(json){
    $.getJSON('view-content.json',function(json){
    // gbook_type 可疑留言判断 page 第2页 2   json里面pagesize <5 完结
        var json = (typeof json)!= "object" ? $.parseJSON(json) : json;
        if(json.status == 1){
            //项目数量 长度变化由json.data.pagesize决定
            var conStr = '';
            switch(opts.caseType){
                case "liuyan":
                for(k in json.data.data){
                    // console.log(json.data.pagesize)
                    conStr += '<section class="module-bg view-info-box"><div class="info-title"><h3>'+json.data.data[k].custom_name+'</h3><span class="info-type">类型：留言</span></div><ul class="cfx view-info-list"><li><span class="li-name">姓名</span>'+json.data.data[k].guestname+'</li><li class="call-item"><span class="li-name">电话</span>'+json.data.data[k].phone+'<button class="call-btn">拨打电话</button></li><li><span class="li-name">日期：</span>'+json.data.data[k].datetime0+'</li><li><span class="li-name">内容</span>'+json.data.data[k].content+'</li></ul><div class="city-text">'+json.data.data[k].area+json.data.data[k].ip+'</div></section>'
                }
                break;
                case "zixun":
                for(k in json.data.data){
                    conStr += '<section class="module-bg view-info-box"><div class="info-title"><h3>'+json.data.data[k].custom_name+'</h3><span class="info-type">类型：咨询</span></div><ul class="cfx view-info-list"><li><span class="li-name">姓名：</span>'+json.data.data[k].guestname+'</li><li class="call-item"><span class="li-name">电话：</span>'+json.data.data[k].phone+'<button class="call-btn">拨打电话</button></li><li><span class="li-name">日期：</span>'+json.data.data[k].datetime0+'</li></ul><div><div class="city-text">'+json.data.data[k].area+json.data.data[k].ip+'</div><div class="info-more"><span>查看更多</span></div></div></section>'
                }
                break;
                case "zixunMore":
                for(k in json.data.data){
                    // 这个应该是判断哪一个再渲染
                    conStr ='<section class="module-bg view-info-box full-screen"><div class="info-title"><h3>'+json.data.data[k].custom_name+'</h3><span class="info-type">类型：咨询</span></div><ul class="cfx view-info-list"><li><span class="li-name">姓名：</span>'+json.data.data[k].guestname+'</li><li class="call-item"><span class="li-name">电话：</span>'+json.data.data[k].phone+'<button class="call-btn">拨打电话</button></li><li><span class="li-name">日期：</span>'+json.data.data[k].datetime0+'</li><li><span class="li-name">内容：</span>客户明天去火星归期未定，客户明天去火星归期未定客户明天去火星归期未定</li></ul><dl class="info-dl"><dt class="tb-name">通宝客服 23:20</dt><dd>客户明天去火星归期未定，客户明天去火星归期未定客户明天去火星归期未定</dd><dt class="fk-name">访客 23:20</dt><dd>'+json.data.data[k].content+'</dd><dt class="fk-name">访客 23:20</dt><dd>'+json.data.data[k].content+'</dd><dt class="tb-name">通宝客服 23:20</dt><dd>客户明天去火星归期未定，客户明天去火星归期未定客户明天去火星归期未定</dd></dl></section>'
                }
                break;
                case "dianhua":
                for(k in json.data.data){
                    conStr +='<section class="module-bg view-info-box"><div class="info-title"><h3>'+json.data.data[k].custom_name+'</h3><span class="info-type">类型：电话</span></div><ul class="cfx view-info-list"><li><span class="li-name">姓名：</span>'+json.data.data[k].guestname+'</li><li class="call-item"><span class="li-name">电话：</span>'+json.data.data[k].phone+'<button class="call-btn">拨打电话</button></li><li><span class="li-name">日期：</span>'+json.data.data[k].datetime0+'</li><li class="number-item"><span class="li-name">被叫号码：</span>'+json.data.data[k].phone+'[项目方未接听]</li></ul><div class="city-text">'+json.data.data[k].area+json.data.data[k].ip+'</div></section>'
                }
                break;

            }
            $("#qiye-view").append(conStr)


            //选项卡上拉加载更多
            $conStr2 = $("#qiye-view");
            var startPosY = 0;
            var ulStartPosY = 0;
            var disXX = 0;
            var restHeight = 0;
            $conStr2.on('touchstart',function (ev) {
                startPosY = ev.changedTouches[0].pageY;//开始手指位置

                $this = $(this);

                disXX = $this.height() - $this.parent().height();

                restHeight = disXX - $this.parent().scrollTop();

                $conStr2.css({
                        transition:'transform 0.1s'
                });

            });
            var needMoveY = 0;
            $conStr2.on('touchmove',function (ev) {
                var nowPosY = ev.changedTouches[0].pageY;//现在手指位置

                var disY = startPosY - nowPosY;

                needMoveY = disY - restHeight;
                console.log(needMoveY)
                if (needMoveY > 0) {
                    if (needMoveY > 1974) {
                        needMoveY = 1974;
                    }
                    $conStr2.css({
                        transform:'translateY('+ -needMoveY +'px)',
                        WebkitTransform:'translateY('+ -needMoveY +'px)'
                    });
                    ev.preventDefault();
                }else{
                    // $conStr2.css({
                    //     transform:'translateY(0px)',
                    //     WebkitTransform:'translateY(0px)'
                    // });
                }
            });

            $conStr2.on('touchend',function (ev) {
                if (needMoveY >= 1168 ) {
                    var $this = this;
                   console.log('加载');                 
                    $.getJSON('view-content.json',function(json){
                        var list =  json.data.data;
                        var overSize = json.data.pagesize;
                        var liStr = '';
                        console.log(overSize)
                        for (var i = 0; i < list.length; i++) {
                             //这里用pagesize判断加载完毕与否
                            liStr += '<section class="module-bg view-info-box"><div class="info-title"><h3>'+json.data.data[i].custom_name+'</h3><span class="info-type">类型：留言</span></div><ul class="cfx view-info-list"><li><span class="li-name">姓名</span>'+json.data.data[i].guestname+'</li><li class="call-item"><span class="li-name">电话</span>'+json.data.data[i].phone+'<button class="call-btn">拨打电话</button></li><li><span class="li-name">日期：</span>'+json.data.data[i].datetime0+'</li><li><span class="li-name">内容</span>'+json.data.data[i].content+'</li></ul><div class="city-text">'+json.data.data[i].area+json.data.data[i].ip+'</div></section>';
                        }

                        $conStr2.append(liStr);
                        disXX = $conStr2.height() - $conStr2.parent().height();
                        $conStr2.css({
                            transition:'transform 0s',
                        });

                        setTimeout(function(argument) {
                            // $conStr2.css({
                            //     transform:'translateY(0px)',
                            //     WebkitTransform:'translateY(0px)'
                            // });
                            $("#b").scrollTop($conStr2.parent().scrollTop() + needMoveY);
                        },100);
                        // console.log($conStr.parent().scrollTop(),needMoveY);
                    });          
                }else{
                        $conStr2.css({
                            transition:'transform 0.6s',
                            transform:'translateY(0px)',
                            WebkitTransform:'translateY(0px)'
                        });
                }
            });




        }else if(json.status == 0){
            $("").append('<div>'+json.msg+'</div>');
            alert("404")
        }
    });
}




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
            var dataType = $(this).attr("data-type");
            //今天、近七天和自定义不应该同时存在
            var d = new Date();
            var nowDate = parseInt( getBeforeDate(0).split('-').join('') );
            // var prevD = parseInt( getBeforeDate(1).split('-').join('') );
            var sevenD = parseInt( getBeforeDate(7).split('-').join('') );

            $('.qiye-fenxi-tabs tbody').html("");//清空上一次

            // var sevenDate = parseInt( prevD+sevenD );
            // if(_this.hasClass("txtNowDate")){   
            //     $(".time-tit").html(_this.find(".view-font").html())
            //     // console.log(nowDate)
            // }else if(_this.hasClass("txtSevenDate")){
            //     $(".time-tit").html(_this.find(".view-font").html())
            // }
            // 


            if (opts.starDate != '' ) {
                params.sdate = opts.starDate.val();
            }


            if (params.timeSelectNum == 1) {

            }

            if (params.timeSelectNum == 2) {
                if( opts.starDate != '' && opts.endDate != '' ){
                        var starTime = parseInt( opts.starDate.val().split('-').join('') );
                        var endTime = parseInt( opts.endDate.val().split('-').join('') );
                        var zidingyiTime = starTime - endTime;
                        //确定清除今天和七天的选中状态
                        // _this.siblings().removeClass("select").siblings().find(".yes-btn").removeClass(); 
                        // || isNaN(starTime)  || isNaN(endTime)          
                        if( starTime > endTime || endTime-starTime>7 ){
                            // $(".time-warn-info").show();
                            alert("时间选择错误");
                            //如果选择错误清空
                            // opts.starDate.val("");
                            // opts.endDate.val("");
                            return false;
                        }
                        
                        if($(".txtNowDate").hasClass("select")){
                            console.log("today");
                        }else if($(".txtSevenDate").hasClass("select")){
                            console.log("7");
                        }else{
                            console.log("zidingyiTime");
                        }
                    }
            }
            
            


            //时间设置 今天时间nowDate 七天sevenD 自定时zidingyiTime
            // if( opts.starDate != '' && opts.endDate != '' ){
            //     var starTime = parseInt( opts.starDate.val().split('-').join('') );
            //     var endTime = parseInt( opts.endDate.val().split('-').join('') );
            //     var zidingyiTime = starTime - endTime;
            //     //确定清除今天和七天的选中状态
            //     // _this.siblings().removeClass("select").siblings().find(".yes-btn").removeClass(); 
            //     // || isNaN(starTime)  || isNaN(endTime)          
            //     if( starTime > endTime || endTime-starTime>7 ){
            //         // $(".time-warn-info").show();
            //         alert("时间选择错误");
            //         //如果选择错误清空
            //         // opts.starDate.val("");
            //         // opts.endDate.val("");
            //         return false;
            //     }
                
            //     if($(".txtNowDate").hasClass("select")){
            //         console.log("today");
            //     }else if($(".txtSevenDate").hasClass("select")){
            //         console.log("7");
            //     }else{
            //         console.log("zidingyiTime");
            //     }
            // }
            $(".box1").hide();
            $(".project-control").hide();
            $("#bg").hide();
            $(".turn-tit-box").hide();
            $(".control-tit-box .turn-tit").hide();
            $(".qiye-select").find(".select-item").removeClass("active");
            $("html,body").css({"height":'100%',"overflow":""});
            
            
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
$(".data-tit li").on('click',function (ev) {
    if ($(this).data('filed')) {
        params.gbook_type = $(this).data('filed');
    }else{
        params.gbook_type = 1;
    }    
    var reqName = 'list_gb_select';
    switch(params.gbook_type){
        case 1:
            reqName = 'list_gb_select';
            break;
        case 2:
            reqName = 'list_tel_select';
            break;
        case 3:
            reqName = 'list_chat_select';
            break;
        default:
            reqName = 'list_gb_select';
        }
    var reqUrl = 'https://guest.qudao.com/app/'+reqName+'?user_name='+params.user_name+'&check_token='+params.check_token+'&plat='+params.plat;
    // guest.qudao.com/app/list_tel_select?user_name=zzh31&check_token=9b1f962342d6d9f916bac3626b0f5919&plat=30
    // params.plat来控制是选择了哪个平台
    console.log(params.plat);
    //这里变化
    var result = {
        "status": 1,
        "msg": "OK",
        "data": {
            "1": "全部数据",
            "2": "双向接通",
            "3": "项目方未接",
            "4": "访客挂断"
        },
        "datatype": "array"
    };
    // <li class="" data-type="jump"><span>所有数据</span><i class=""></i></li>
    // <li data-type="jump"><span>有效数据</span><i class=""></i></li>
    // <li data-type="jump"><span>无效数据</span><i class=""></i></li>

    $('.filter-tit').empty();

    var liHtml = '';

    if (result.status == 1) {
        $.each(result.data, function (key,value) {
            liHtml += '<li data-type="jump" data-key="'+key+'"><span>'+value+'</span><i class=""></i></li>';
        });
        var aLi = $(liHtml);

        aLi.on('click',function(ev) {
            var $this = $(this);

            $this.parent().find('i').removeClass('yes-btn');
            $this.parent().find('li').removeClass('select');
            
            $this.find('i').addClass('yes-btn');
            $this.addClass('select');


            if ($this.data('key')) {
                params.filterKey = $this.data('key');
            }else{
                params.filterKey = 1;
            }
            
        });
        $('.filter-tit').append(aLi);
    }else{
    }
    return;
    $.getJSON(reqUrl,function(result) {
        

    });

});


$.fn.tabJs = function(options){
    var opts = $.extend( {
        ajaxUrl : "",
        caseType : "",
        selectBoolean : true,
        onClass:"",
        onStyle : "clickObj"  //clickObj(对象本身确定) dbclickObj(用button确定)
    }, options );
    return $(this).each(function(i){
        var _this = $(this);
        var $this = _this.parents();
        _this.on("click",function(){
            //点击自定义其他状态消失,确定改变
            if(_this.hasClass("txtNowDate")){   
                $(".time-tit").html(_this.find(".view-font").html())
                // console.log(nowDate)
            }else if(_this.hasClass("txtSevenDate")){
                $(".time-tit").html(_this.find(".view-font").html())
            }else{
                $(".time-tit").html($(".project-control-info").find(".view-font").html());
            }

            // 加判断在三级区域不点击就保持着最后一次状态
            if(opts.selectBoolean){
                _this.parent().parent().find('.'+opts.onClass).removeClass(opts.onClass);
            }
            _this.toggleClass(opts.onClass);
            // 转化量 || 控制数据 || 项目
            if($this.hasClass("project-control") || $this.hasClass("turn-tit") || $this.parent().hasClass("control-tit-box") || $this.parent().hasClass("mChoice")){
                _this.parent().parent().find('i').removeClass('yes-btn');//对号单选
                _this.find('i').toggleClass('yes-btn');
            }else if($this.parent().hasClass("contentBox")){
                _this.find('i').toggleClass('turn-btn'); //多选
            }

            //合并遮罩层函数
            $("#bg").css("display","block");
            $("html,body").css({"height":'100%',"overflow":"hidden"});
            // if(_this.parents(".tit-c").next().children()!=$('.index-info-tit span')){
                //只有一个选项切换
                if(!opts.selectBoolean){
                    _this.parent().next().toggle();
                }
                $this.next().children().hide();
                $this.next().children().eq(_this.index()).show();//tit 也控制滚动插件
                $this.next().children().eq(_this.index()).children().show();
                $('.index-info-tit span').css('display','inline-block');
                return false;
            // }
        })
    })
};
//jump
;(function($){
$.links = function(obj){
    $(document).on('click',obj,function(event) {
        if($(this).attr("_href") != ''){
            var hrefStr = $(this).attr("_href");
            // JsInvoke.pageJump(hrefStr);
        }
        return false;
    });
};
$.links(".targetLinks");
})(jQuery);
//获取日期
function getBeforeDate(n,link){
    if (n === undefined) {
        n = 0;
    }

    var d = new Date();
    var year = d.getFullYear();
    var mon=d.getMonth()+1;
    var day=d.getDate();
    if(day <= n){
            if(mon>1) {
               mon=mon-1;
            } else {
             year = year-1;
             mon = 12;
             }
           }
          d.setDate(d.getDate()-n);
          year = d.getFullYear();
          mon=d.getMonth()+1;
          day=d.getDate();

          if (typeof link !== 'string') {
            link = '/';
          }

    s = year+link+(mon<10?('0'+mon):mon)+link+(day<10?('0'+day):day);
    return s
}
function getJsonLength(jsonData){
    var jsonLength = 0;
    for(var item in jsonData){
        jsonLength++;
    }
    return jsonLength;
}

// function judeObj(obj){
//     var json = (typeof json)!= "object" ? $.parseJSON(json) : json;
//     var custom_name = qiye_info[k].custom_name != null ? qiye_info[k].custom_name : '';
//     var percent = qiye_info[k].percent != null ? qiye_info[k].percent : [];  
//     if((typeof json) = "object"){
//     }
// }


//动态选项卡  选项卡方法
// 匹配 obj.match(/(\d+)\_/);//匹配前面 obj.match(/\_(\d+)/);//匹配后面
//var params.custom_id = [];//原因就是全局变量

var params={
    user_name:'',
    check_token:'',
    custom_id:[1552],
    gbook_type:1,
    sdate:getBeforeDate(0,'-'),
    plat:5,  //默认 用选择匹配来得到
    page:0,
    ajaxUrl:'',
    filterKey:1,
    timeSelectNum:1,
}

$(document).delegate(".a1","click",function(e){
    var _this = $(this);
    var $this = _this.parent();
    
    var n =0;
    if(_this.hasClass("box-tit")){
        $this.find(".select").removeClass("select");  
    }
    _this.toggleClass("select");
    if($this.hasClass("project-control") || $this.hasClass("turn-tit") || $this.parent().hasClass("control-tit-box") || $this.parent().hasClass("mChoice")){
        $this.find('i').removeClass('yes-btn');//对号单选
        _this.find('i').toggleClass('yes-btn');
    }else if(_this.parent().hasClass("right-li")){
        _this.find('i').toggleClass('turn-btn'); //多选
    }
    //全选功能
    if(_this.find(".choose-all") && _this.hasClass("select")){
        _this.find(".choose-all").parent().siblings().addClass("select");
        _this.find(".choose-all").parent().siblings().find('i').addClass('turn-btn');
    }else{
        _this.find(".choose-all").parent().siblings().removeClass("select");
        _this.find(".choose-all").parent().siblings().find('i').removeClass('turn-btn');   
    }
     //选中存储起来
        //判断在右侧才进入
        if(typeof(_this.attr("flot-type"))!="undefined"){
            // var arr = {};
                // 由fID判断平台,不同平台间不能同时选择
                // var projectId = _this.attr("flot-type").match(/\_(\d+)/)[1];
                // var flotId = _this.attr("flot-type").match(/(\d+)\_/)[1];
            if(_this.hasClass('select')){
                
                // arr["projectId"] = projectId;
                // arr["flotId"] = flotId;
                //params.custom_id.push(parseInt(flotId)); //选中保存数组

                //debugger;

                params.custom_id.push(getCumID(_this.attr("flot-type")));
                
                // console.log(params.plat)
                //console.log(params.custom_id)
                //这里每次都存最后一次的
                //
                function getPro(str) {
                    return str.split('_')[0];
                }

                function getCumID (str) {
                    return str.split('_')[1];
                }

                if(params.plat != getPro(_this.attr("flot-type")) ){
                    params.plat = getPro(_this.attr("flot-type"));

                    var last = params.custom_id[params.custom_id.length-1];
                    params.custom_id = [last];
                    _this.parent().siblings().children().removeClass("select").find('i').removeClass('turn-btn');
                }             
            }else{
                var delIndex = params.custom_id.indexOf(_this.attr("flot-type"));
                params.custom_id.splice(delIndex,1);
            }
        }
    $this.next().children().hide();
    $this.next().children().eq(_this.index()).show();//左侧tab
    $this.next().children().eq(_this.index()).children().show();
    $("#bg").css("display","block");
});


/*
$.getJSON(opts.ajaxUrl+'user_name='+getUserId+'&check_token='+appnum+'&sdate=2017-01-01&plat=3&gbook_type=1&page=0&custom_id=1051,105445&callback=?'
sdate = 2017-01-01
plat = data.plat
gbook_type = 1
 */
// console.log($(''))

            

function creatCondition() {
    return params.ajaxUrl+'user_name='+params.user_name+'&check_token='+params.check_token+'&sdate='+params.sdate+'&plat='+params.plat+'&gbook_type='+params.gbook_type+'&page='+params.page+'&custom_id='+params.custom_id.join()+'&callback=?';
}
