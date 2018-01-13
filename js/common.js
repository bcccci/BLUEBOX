/**
 * Created by lenovo on 2017/11/19.
 */
//添加事件函数
//第一个参数 绑定事件的元素
//第二个参数 绑定事件类型
//第三个参数 执行的函数
//第四个参数 是否捕获
function addEvent(elem,type,fn,flag) {
    if(elem.addEventListener){//标准
        elem.addEventListener(type,fn,flag);
    }else {//IE
        elem.attachEvent("on" + type,function () {
            fn.call(elem);
        });//IE绑定事件 this会指向window
    }
}

//获取要找的元素的第一个子元素节点
//参数 要找的元素
function firstChild(elem) {
    elem = elem.firstChild;
    if (elem && elem.nodeType != 1){
        do {
            elem = elem.nextSibling;
        }while (elem && elem.nodeType != 1);
        return elem;
    }else{
        return elem;
    }
}

//获取要找的元素的最后一个子元素节点
//参数 要找的元素
function lastChild(elem) {
    elem = elem.lastChild;
    if (elem && elem.nodeType != 1){
        do {
            elem = elem.previousSibling;
        }while (elem && elem.nodeType != 1);
        return elem;
    }else{
        return elem;
    }
}

//获取要找的元素的前一个兄弟元素节点
//参数 要找的元素
function previousSibling(elem) {
    do {
        elem = elem.previousSibling;
    }while (elem && elem.nodeType != 1);
    return elem;
}

//获取要找的元素的下一个兄弟元素节点
//参数 要找的元素
function nextSibling(elem) {
    do {
        elem = elem.nextSibling;
    }while (elem && elem.nodeType != 1);
    return elem;
}

//获取相同class名的元素
//第一个参数 必需 class名
//第二个参数 可选 从哪获取 不传默认document
function getEleByClassName(clsName,context) {
    var result = [];
    var parentEle = context || document;
    var allEle = parentEle.getElementsByTagName("*");
    for (var i = 0; i < allEle.length; i++){
        var arr = allEle[i].className.split(" ");
        for (var j = 0; j < arr.length; j++){
            arr[j] == clsName ? result.push(allEle[i]) : null;
        }
    }
    return result;
}

//滑动动画
//第一个参数 元素
//第二个参数 速度（数的绝对值越大越快） 负显示 正隐藏
//第三个参数 对象{改变的属性:[初始位置（很多个列表初始位置写内连）,要到达的位置]（不传单位）}
//第四个参数 计时器结束display是否none true/false
function slideAnimate(elem,speed,obj,flag) {
    if (elem.timer){
        window.clearInterval(elem.timer);
    }
    for (var key in obj){
        elem.style[key] == "" ? elem.style[key] = obj[key][0] + "px" : null;
        //定时器
        elem.timer = window.setInterval(function () {
            elem.style[key] = parseInt(elem.style[key]) + speed + "px";
            if ((speed > 0 && parseInt(elem.style[key]) >= obj[key][1])||(speed < 0 && parseInt(elem.style[key]) <= obj[key][1])){
                elem.style[key] = obj[key][1] + "px";
                window.clearInterval(elem.timer);
                flag ? elem.style.display = "none" : null;
            }
        },10);
    }
}

//渐变动画
//前一张 display block 透明度1-0 none
//后一张 display block 透明度0-1 block
//第一个参数 必需 要轮播的数组
//第二个参数 必需 要显示的前一张图片的索引
//第三个参数 必需 要显示的图片的索引
function opacityAnimate(arr,index1,index2) {
    for (var i = 0; i < arr.length; i++){
        arr[i].style.display = "none";
        arr[i].style.opacity = 0;
    }
    arr[index1].style.display = "block";
    arr[index1].style.opacity = 1;
    arr[index2].style.display = "block";
    arr[index2].style.opacity = 0;
    var upTimer = window.setInterval(function () {
        if (arr[index1].style.opacity != 0){
            arr[index1].style.opacity -= 0.1;
        }else {
            arr[index1].style.display = "none";
            window.clearInterval(upTimer);
        }
    },30);
    var opacity = 0;
    var downTimer = window.setInterval(function () {
        if (arr[index2].style.opacity != 1){
            opacity += 0.1;
            arr[index2].style.opacity = opacity;
        }else {
            window.clearInterval(downTimer);
        }
    },30);
}

//深克隆
//参数 必需 对象
function clone(obj) {
    var newObj = {};
    for (var key in obj){
        if (typeof obj[key] == "object"){
            newObj[key] = clone(obj[key]);
        }else {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}

//设置cookie
//第一个参数 必需 要设置的属性
//第二个参数 必需 要设置的值
//第三个参数 可选 保存多少天
function setCookie(key,value,expires) {
    var str = key + "=" + value + ";";
    if (expires){
        var date = new Date();
        date.setDate(date.getDate() + expires);
        str += "expires=" + date;
    }
    document.cookie = str;
}

//取出cookie
//参数 必需 要取出的属性
//return 要取出的值
function getCookie(key) {
    var str = document.cookie;
    var arr = str.split("; ");
    for (var i = 0; i < arr.length; i++){
        var arr1 = arr[i].split("=");
        if (arr1[0] == key){
            return arr1[1];
        }
    }
}

//去掉cookie
//参数 必需 要去除的属性
function removeCookie(key) {
    //设置成已过期的时间就没了
    setCookie(key,null,-1);
}