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
        "jquery": "../moudle/jquery/jquery",                    //加载jquery
        "layer":"../moudle/layer/layer",                        //layer插件路径加载
        "layerext":"../moudle/layer/extend/layer.ext",
        "validate":"../moudle/validata/jquery.validate",        //表单验证插件
        "bootstrap":"../moudle/bootstrap/js/bootstrap",         //bootstrap框架插件js集合
        "lightbox":"../moudle/lightbox/js/lightbox",
        //css文件的定义方法
        "layercss": "../moudle/layer/skin/layer",               //异步请求layer插件需要的layer.css文件
        "layerextcss":"../moudle/layer/skin/layer.ext",         //异步请求layer.ext.js插件需要的layer.ext.css文件
        "lightboxcss":"../moudle/lightbox/css/lightbox"         //异步请求light插件需要的layer.css文件
    },
    waitSeconds: 10 ,
    //加载layer插件需要的css之前需要的require外部插件css.js
    map: {
        '*': {
            'cssjs': '../moudle/layer/css',
        }
    },
    
    shim:{
        //调用layer之前，必须先加载jquery.js。layer插件需要在jq的环境下才能运行。
        "layer":{
            deps:['jquery'],
            exports:"layer"
        },
        //调用layer相册功能之前，必须先加载jquery.ext.js。layer插件需要在jq的环境下才能运行。
        "layerext":{
            deps:['jquery'],
            exports:"layerext"
        },
        //调用bootstrap.js之前，必须先加载jquery.js。bootstrap插件需要在jq的环境下才能运行。
        "bootstrap":{
            deps:['jquery'],
            exports:"bootstrap"
        },
        //调用lightbox.js之前，必须先加载jquery.js。lightbox插件需要在jq的环境下才能运行。
        "lightbox":{
            deps:['jquery'],
            exports:"lightbox"
        }
    }

});
//（以上方法二选一）

//通过主模块，运用AMD规范定义的的require()函数调用其他模块。这里分别是(jquery.js)、(all.js)、(boss.js)三个子模块。
require(['jquery','validate','bootstrap','layer','layerext','lightbox','cssjs!layercss','cssjs!layerextcss','cssjs!lightboxcss'], function (){
    //require()函数接受两个参数。
    //第一个参数是一个数组，表示所依赖的模块，上例就是['moduleA', 'moduleB', 'moduleC']，即主模块依赖这三个模块；
    //第二个参数是一个回调函数，当前面指定的模块都加载成功后，它将被调用。
    //加载的模块会以参数形式传入该函数，从而在回调函数内部就可以使用这些模块。
    $('#btn1').click(function(){
        layer.open({
            type: 1,
            area: ['600px', '360px'],       //layer弹窗的宽高设置
            closeBtn: 1,                    //layer提供了两种风格的关闭按钮，可通过配置1和2来展示，如果不显示，则closeBtn: 0
            shadeClose: true,               //shadeClose - 是否点击遮罩关闭。类型：Boolean，默认：false如果你的shade是存在的，那么你可以设定shadeClose来控制点击弹层外区域关闭。
            time:0,                         //自动关闭所需毫秒.类型：Number，默认：0 默认不会自动关闭。当你想自动关闭时，可以time: 5000，即代表5秒后自动关闭，注意单位是毫秒（1秒=1000毫秒）
            maxmin:false,                   //最大最小化。类型：Boolean，默认：false.该参数值对type:1和type:2有效。默认不显示最大小化按钮。需要显示配置maxmin: true即可
            fix:true,                       //固定。类型：Boolean，默认：true。即鼠标滚动时，层是否固定在可视区域。如果不想，设置fix: false即可
            scrollbar:false,                //是否允许浏览器出现滚动条。类型：Boolean，默认：true。默认允许浏览器滚动，如果设定scrollbar: false，则屏蔽
            moveOut:true,                   //是否允许拖拽到窗口外。类型：Boolean，默认：false。默认只能在窗口内拖拽，如果你想让拖到窗外，那么设定moveOut: true即可
            tips:[1, '#c00'],               //tips方向和颜色。类型：Number/Array，默认：2。tips层的私有参数。支持上右下左四个方向，通过1-4进行方向设定。如tips: 3则表示在元素的下面出现。有时你还可能会定义一些颜色，可以设定tips: [1, '#c00']
            
            content: '\<\div style="padding:20px;"><a href="javascript:" id="eebtn"></a>\<\/div>',            //弹出内容设置

            success: function(){            //success - 层弹出后的成功回调方法.类型：Function，默认：null.当你需要在层创建完毕时即执行一些语句，可以通过该回调。success会携带两个参数，分别是当前层DOM当前层索引
                //do something
            },                              //确定按钮回调方法.类型：Function，默认：null.该回调携带两个参数，分别为当前层索引、当前层DOM对象。
            
            cancel: function(index){        // 取消和关闭按钮触发的回调.类型：Function，默认：null.该回调同样只携带当前层索引一个参数，无需进行手工关闭。如果不想关闭，return false即可
                //do something
            } 
        });
    });
    
    /*layer实现图片点击放大居中效果测试*/
    layer.ready(function(){ //为了layer.ext.js加载完毕再执行
        layer.photos({
            photos: '#layerbox'
        });
    });

});
