/**
 * Created by Administrator on 2016/5/6.
 */
define(function(){
    function lzd123(msg) {
        alert("lzd1" + msg);

    };

    function lzd456(msg) {
        alert("lzd1sdfasdfasdf" + msg);
    };

    var returnVar = {
        qqq: lzd456,
        www: lzd123
    }


    return returnVar;

});
