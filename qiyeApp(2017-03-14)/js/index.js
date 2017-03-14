// 确认取消开关
$(".cancel").click(function(){
    $(".project-control").hide();
    $("#bg").hide();
});
$("#bg").click(function(){
  $(this).hide();
  $(".box1").hide();
  $(".turn-tit-box").hide();
  $(".time-box").hide();
});
// view more
$(".info-more").click(function(){
    $(this).parent().hide();
    $(this).parent().prev('.info-dl').css('height',$(document).height())
})
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
    $.fn.tabs.show=function($this,settings){
        var t='';
        var n=0;
        $this.children('ul').children('li').mouseover(function(){
        var _this=$(this);
        $this.find('.'+settings).removeClass(settings);
        _this.addClass(settings);
        if($this.find('span').length){
          $this.find('i').removeClass('turn-btn');
          _this.find('i').addClass('turn-btn');
        }else{
          // $this.find('i').removeClass('yes-btn');//多选保存
          _this.find('i').toggleClass('yes-btn');
        }
        $("#bg").css({
            display: "block", height: $(document).height()
        });
        if($this.next().children()!=$('.index-info-tit span')){
            $this.next().children().hide();
            $('.index-info-tit span').css('display','inline-block')
            $this.next().children().eq(_this.index()).show();//tit
            $this.next().children().eq(_this.index()).children().show();
        }
        $this.children('#content').children().hide();
        $this.children('#content').children().eq(_this.index()).show();
        // 控制最大10个
        if(_this.find('i').hasClass('yes-btn')){
          n++;
        }
        if(n>4){
          $(".project-warn-info").toggle();
        }else{
          $(".project-warn-info").hide();
        }
    });
  }
})(Zepto)
$(function(){
    $('.box1').tabs('select');
    $('#content').tabs('select');
    $('.turn-tit-box').tabs('select');
    $('.tit-c').tabs('active');
});





