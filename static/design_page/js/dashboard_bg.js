$(document).ready(function setDashBoardFloat(){
            var number = 5;
            var elements = $('#dashboard').children().filter('*').removeClass("pull-right");
            for( var i = 0; i<elements.length; i++){
                var row = parseInt(i/number+1);
                if( row%2==0 ){
                    $(elements[i]).addClass("pull-right");
                }
            }
            draw();
            function draw(){
                var width = $('#dashboard').width();
                var rowNumber = parseInt(elements.length/number)+1;
                var height = rowNumber*84;
                $('#background').attr("height",height).attr("width",width);
                var canvas = document.getElementById("background");
                var context = canvas.getContext("2d");
                // context.lineWidth = 10;
                context.lineWidth = 6;
                context.strokeStyle = "#bbbbbb";
                var radius = 42;
                var start;
                var stop ;
                var centerX;
                var centerY=86;
                var moveToX ;
                var moveToY = 44;
                var lineToX ;
                var lineToY = 44;
                for(var i=0; i<rowNumber; i++){
                    if(i%2==0){
                        start = 1.5*Math.PI;
                        stop = 0.5*Math.PI;
                        centerX=width-50;
                        moveToX = 50;
                        lineToX = width-50;
                        context.moveTo(moveToX,moveToY);
                        context.lineTo(lineToX,lineToY);
                        context.stroke();
                        context.beginPath();
                        context.arc(centerX,centerY,radius,start,stop);
                        context.stroke();
                        context.beginPath();
                    }else{
                        start = 0.5*Math.PI;
                        stop = 1.5*Math.PI;
                        centerX=50;
                        moveToX = width-50;
                        lineToX = 50;
                        context.moveTo(moveToX,moveToY);
                        context.lineTo(lineToX,lineToY);
                        context.stroke();
                        context.beginPath();
                        context.arc(centerX,centerY,radius,start,stop);
                        context.stroke();
                        context.beginPath();
                    }
                    moveToY+=84;
                    lineToY+=84;
                    centerY+=84;
                }
            }
        });