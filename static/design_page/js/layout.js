$(function(){
	$('.midArea').css('height',$('body').height()-35);
	console.log($('body').height());
	console.log($('body').height()-$('.navbar').height()-35);
	console.log($('.midArea').height());
	$('.mySidebar').css('height',$('body').height() - 51);
	$('#dashboard').css('height',$('.midArea').height()*0.6);
	$('.bottombar').css('height',$('.midArea').height()*0.4);
})
