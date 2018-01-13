/**
 * Created by lenovo on 2018/1/13.
 */
//搜索框部分
var oSearch = document.getElementsByTagName("input")[0];
oSearch.onfocus = function () {
    if (oSearch.value == oSearch.defaultValue){
        oSearch.value = "";
    }
};
oSearch.onblur = function () {
    if (oSearch.value == ""){
        oSearch.value = oSearch.defaultValue;//获取文本框默认值
    }
};
//大轮播图（渐变）
var oContent = document.getElementsByClassName("content")[0];
var oUl = oContent.getElementsByTagName("ul")[0];
var aLi = oUl.getElementsByTagName("li");
var oPrev = oContent.getElementsByClassName("prev")[0];
var oNext = oContent.getElementsByClassName("next")[0];
var num = 0;
for (var i = 0; i < aLi.length; i++){
    aLi[i].style.display = "none";
}
aLi[num].style.display = "block";
oNext.onclick = function () {
    if (num >= aLi.length - 1){
        opacityAnimate(aLi,num,0);
        num = 0;
    }else{
        opacityAnimate(aLi,num,num+1);
        num++;
    }
};
oPrev.onclick = function () {
    if (num <= 0){
        opacityAnimate(aLi,num,aLi.length - 1);
        num = aLi.length - 1;
    }else{
        opacityAnimate(aLi,num,num-1);
        num--;
    }
};
//小轮播图（滑动）
var oClients = document.getElementsByClassName("clients")[0];
var oUlS = oClients.getElementsByTagName("ul")[0];
var aLiS = oClients.getElementsByTagName("li");
var oPrevS = oClients.getElementsByClassName("prev")[0];
var oNextS = oClients.getElementsByClassName("next")[0];
oUlS.style.left = "0px";
//0 -- -888
oPrevS.onclick = function () {
    if (oUlS.timer){
        window.clearInterval(oUlS.timer);
    }
    oUlS.timer = window.setInterval(function () {
        if (oUlS.style.left == "0px"){
            oUlS.style.left = "-888px";
        }
        var nowLeft = parseInt(oUlS.style.left);
        nowLeft += 2;
        oUlS.style.left = nowLeft + "px";
        if (nowLeft == 0){
            window.clearInterval(oUlS.timer);
        }
    },10);
};
oNextS.onclick = function () {
    if (oUlS.timer){
        window.clearInterval(oUlS.timer);
    }
    oUlS.timer = window.setInterval(function () {
        if (oUlS.style.left == "-888px"){
            oUlS.style.left = "0px";
        }
        var nowLeft = parseInt(oUlS.style.left);
        nowLeft -= 2;
        oUlS.style.left = nowLeft + "px";
        if (nowLeft == -888){
            window.clearInterval(oUlS.timer);
        }
    },10);
};

