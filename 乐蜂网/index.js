/*页面滑动触发事件*/
window.onscroll = function(){
	var t=document.documentElement.scrollTop || document.body.scrollTop;
	var zc=document.querySelector(".zcgd");
	var fhdb=document.querySelector(".fhdb");
		if(t>= 400){
			zc.style.display = "inline";
			fhdb.style.display = "inline";
		} else{
			zc.style.display = "none";
			fhdb.style.display = "none";
		}

}
/*轮播图*/
window.onload=function(){
    var oBody=document.querySelector(".xunhuan");
    var oS=oBody.style;
    function BgChenge(){
        oS.backgroundImage='url(./imgs/'+(parseInt(Math.random() * 7) + 1)+'.jpg)';
    };
    function LoadMethod(){
        BgChenge();
        BgPosition()
    };
    setInterval(LoadMethod,1800);
};
