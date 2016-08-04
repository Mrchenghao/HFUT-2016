var canvas = document.getElementById('design_background');
var ctx = canvas.getContext('2d');
canvas.width = canvas.parentNode.offsetWidth;
// canvas.height = canvas.parentNode.offsetHeight;
canvas.height = 100;
ctx.fillStyle = "rgba(0,222,255, 0.2)";//开始绘制路径
ctx.beginPath();//左上角
ctx.moveTo(0, canvas.height/2);//右上角
ctx.lineTo(canvas.width, canvas.height/2);//右下角
ctx.lineTo(canvas.width, canvas.height);//左下角
ctx.lineTo(0, canvas.height);//左上角
ctx.lineTo(0, canvas.height/2);//闭合路径
ctx.closePath();//填充路径
ctx.fill();
$(function(){
    var temp_class;
    var temp_node;
    $("#dashboard").sortable({
        group:{
            name:'dragable',
            pull:false,
            put:true,
        },
        animation: 150,
    });
    $("#test").sortable({
        group:{
            name:'dragable',
            pull: 'clone',
            put:false,
        },
        filter: ".ignore-elements",
        //sort: false,
        animation: 150,
        onRemove: function (/**Event*/evt) {
            var itemEl = $(evt.item);
            itemEl.children("md-divider").remove();
            itemEl.find('img').after('<br />')
            itemEl.removeClass();
            itemEl.addClass('col-lg-2 col-md-2 col-sm-3 col-xs-3');
        },
    });
    $(".recommend_list").sortable({
        group:{
            name:'dragable',
            pull:'clone',
            put:false,
        },
        animation: 150,
        onRemove: function (/**Event*/evt) {
            var itemEl = $(evt.item);
            itemEl.children("md-divider").remove();
            itemEl.removeClass();
            itemEl.addClass('col-lg-2 col-md-2 col-sm-3 col-xs-3');
        },
    });
    $("#clipboard").sortable({
        group:{
            name:'dragable',
            pull:'clone',
            put:true,
        },
        animation: 150,
        onadd: function (/**Event*/evt) {
            var itemEl = $(evt.item);
            itemEl.children("md-divider").remove();
            itemEl.removeClass();
            //itemEl.addClass('col-lg-2 col-md-2 col-sm-3 col-xs-3');
        },
    });
})