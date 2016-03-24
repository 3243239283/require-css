/**
 * Created by Administrator on 2016/3/21.
 */
/*
 require.config是用来配置模块加载位置，简单点说就是给模块起一个更短更好记的名字，
 比如将百度的jquery库地址标记为jquery，这样在require时只需要写["jquery"]就可以加载该js，
 本地的js我们也可以这样配置：
 require.config({
 paths : {
 "jquery" : ["http://libs.baidu.com/jquery/2.0.3/jquery"]
 }
 })
 */
//如果这些模块在其他目录，比如js/lib目录，则有两种写法。逐一/统一 指定路径。
//1、统一指定模块路径
/*
 require.config({
 baseUrl:"js/indexJS/",    //当各个模块路径统一时，可以一次性制定路径。否则需要单独制定各个模块的路径。
 paths: {
 "jquery": "jquery",
 "a": "boss",
 "b": "all"
 }
 });
 */
//2、逐一制定模块路径
require.config({
    paths: {
        "jquery": "../moudle/jquery/jquery",        //加载jquery
        "layer":"../moudle/layer/layer",            //layer插件路径加载
        "validate":"../moudle/validata/jquery.validate",

        //css文件的定义方法
        "layercss": "../moudle/layer/skin/layer"     //异步请求layer插件需要的layer.css文件
    },
    waitSeconds: 10 ,
    //加载layer插件需要的.css之前需要的require外部插件css.js
    map: {
        '*': {
            'cssjs': '../moudle/layer/css'
        }
    },
    //调用layer之前，必须先加载jquery.js。layer插件需要在jq的环境下才能运行。
    shim:{
        "layer":{
            deps:['jquery'],
            exports:"layer"
        }
    }

});
//（以上方法二选一）

//通过主模块，运用AMD规范定义的的require()函数调用其他模块。这里分别是(jquery.js)、(all.js)、(boss.js)三个子模块。
require(['jquery','layer','cssjs!layercss'], function (){
    //require()函数接受两个参数。
    //第一个参数是一个数组，表示所依赖的模块，上例就是['moduleA', 'moduleB', 'moduleC']，即主模块依赖这三个模块；
    //第二个参数是一个回调函数，当前面指定的模块都加载成功后，它将被调用。
    //加载的模块会以参数形式传入该函数，从而在回调函数内部就可以使用这些模块。

    $('#btn1').click(function(){
        layer.open({
            type: 1,
            area: ['600px', '360px'],
            shadeClose: true, //点击遮罩关闭
            content: '\<\div style="padding:20px;">自定义内容\<\/div>'
        });
    });

});
