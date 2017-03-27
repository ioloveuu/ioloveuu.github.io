// 确认取消开关
$(".cancel,.index-info-cancel").click(function(){
    $(".project-control,.box1").hide();
    $("#bg").hide();
    $(".qiye-select").find(".select-item").removeClass("active");
    $("html,body").css({"height":'100%',"overflow":""});
});
$("#bg").click(function(){
  $(this).hide();
  $(".box1").hide();
  $(".turn-tit-box").hide();
  $(".time-box").hide();
  $(".qiye-select").find(".select-item").removeClass("active");
  $("html,body").css({"height":'100%',"overflow":""});
});
// view more
// $(".info-more").click(function(){
//     $(this).parent().hide();
//     $(this).parent().prev('.info-dl').removeClass('info-dl-height');
// })
// 表格开关
$('.gaodan-info-tabs .arrow-btn').on('click', function(ev){
  var  $this = $(this);
  $this.parents("table").siblings().find("tbody").hide();
  $this.parents("table").siblings().find(".arrow-btn").removeClass("active")
  $this.toggleClass("active");
  $this.parents("table").find("tbody").toggle();
});
// 选项卡切换
;(function($){
    $.fn.tabs=function(settings){
        $.fn.tabs.show($(this),settings);
    };
    //settings是传进来的值
    $.fn.tabs.show=function($this,settings){
        var t='';
        var n=0;
        $this.children('ul').children('li').mouseover(function(){
        var _this=$(this);
        // 来回切换
        // $this.find('.'+settings).removeClass(settings);
        // _this.addClass(settings);
        // console.log($this,_this)
        // if($this.hasClass("turn-tit-box")){
        //   $this.find('i').removeClass('yes-btn');//圆圈单选
        //   _this.find('i').toggleClass('yes-btn');
        // }else if($this.hasClass("control-tit-box") || $this.hasClass("mChoice")){
        //   $this.find('i').removeClass('yes-btn');//对号单选
        //   _this.find('i').toggleClass('yes-btn');
        // }else if($this.hasClass("contentBox")){
        //   _this.find('i').toggleClass('turn-btn'); //多选
        // }
        // $("#bg").css({
        //     "display": "block", "height": $(document).height()
        // });
        if($this.next().children()!=$('.index-info-tit span')){
            // var indexH = $this.next().children().eq(_this.index()).height();
            // if(indexH>1240){
            //     $(".index-info-tit").css("position","fixed");
            // }else{
            //     $(".index-info-tit").css("position","absolute");
            // }
            // $this.next().children().hide();
            // $('.index-info-tit span').css('display','inline-block')
            // console.log($this,$this.next().children().eq(_this.index()))
            $this.next().children().eq(_this.index()).show();  //tit
            // $this.next().children().eq(_this.index()).children().show();
        }
        $("html,body").css({"height":'100%',"overflow":"hidden"});
        // //3级选项卡子页面切换
        // $this.children('#content').children().hide();
        // $this.children('#content').children().eq(_this.index()).toggle();
        // var arr = [];
        // // 控制最大10个
        // if(_this.find('i').hasClass('yes-btn')){
        //   n++;
        // }
        // if(n>4){
        //   $(".project-warn-info").toggle();
        // }else{
        //   $(".project-warn-info").hide();
        // }
        // for(var i=0;i<n;i++){
        //     arr.push(_this.text());
        // }
    });
  }
})(jQuery)
$(function(){
    // $('.box1').tabs('select');
    // $('#content').tabs('select');
    // // $('.turn-tit-box').tabs('select');
    // $('.tit-c').tabs('active');
    // $('.control-data-box').tabs('active');
    // $('.control-tit-box').tabs('select');
});

