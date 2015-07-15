$(document).ready(function(){
	//Список серверов
	var servers = {
		'Король-лич - Орда':'server',
		'Гром - Альянс':'server',
		'Вечная Песня - Орда':'server',
	}
	
	var orderlimit = 116720; //Лимит старых заказов
	
	
	
	/***REQUIRED VARIABLES***/
	var eH
	var stop = false;
	var delay = 2; //in seconds
	/***REQUIRED VARIABLES***/
	
	
	
	/***PARSER INTERFACE***/
	$('head').append('<style id="parsercss"></style>');
	$('body').append('<div id="editor"></div>');
	window.$('#editor').append('<div id="editor-controll"><input type="button" value="Старт" id="start" class="parser-button" /><input type="button" value="Стоп" id="stop" class="parser-button" /><input type="button" value="" title="Развернуть" id="show" class="parser-interface-button parser-interface-show" /><input type="button" value="" title="Свернуть" id="close" class="parser-interface-button parser-interface-close" /><span class="order-limit">MIN ORDER ID: '+orderlimit+'</span></div><div id="text"></div>');
	
	var css = '#editor{position:fixed;box-sizing:border-box;background:rgba(45,51,55,.95);overflow:hidden;padding:70px 0px 30px 20px;box-shadow:0 0 3px 2px rgba(0, 0, 0, .1);-moz-box-shadow:0 0 3px 2px rgba(0, 0, 0, .1);-webkit-box-shadow:0 0 3px 2px rgba(0, 0, 0, .1); opacity: 1; top: 51px; right: 0; width: 300px; height: ' + ($( window ).height()) + 'px;}'+
			  '#editor-controll{position:fixed;width:260px;height:50px;top:0;margin-top:70px;background:transparent;box-sizing:border-box;}'+
			  '.parser-button{padding:5px 10px;font-size:12px;line-height:1.5;border:none;background-color:#aea79f;border-color:#aea79f;border-radius:3px;color:#fff;margin-right:15px;}'+
			  '.parser-interface-button{display:block;position:absolute;width:13px;height:13px;top:0;right:20px;border:none;border-radius:50%;}'+
			  '.parser-interface-show{right:20px;background:#37C94C;border:1px solid #36BD44;}'+
			  '.parser-interface-close{right:0;background:#FB605C;border:1px solid #EA5954;}'+
			  '.order-limit{position:relative;display:block;margin-top:5px;padding-bottom:5px;color:#FFF;}'+
			  '.order-limit:after{content:"";position:absolute;width:100%;height:1px;bottom:0;left:0;background-color:#DDD;opacity:.5;}'+
			  '#text{position:relative;height:100%;overflow:auto;margin-top:15px !important;}'+
			  '#text p{color:#9a8297;}'+
			  '#text p span{color:#ddca7e;}';
			  
	$('#parsercss').text(css);
	
	eH = $('#editor').css('height');
	/***PARSER INTERFACE***/
	
	
	
	/***PAGE INTERACTION***/
	var n = 0;
	var tnum = parseInt($(".table tbody tr").length);
	for (var i=0;i<=tnum;i++) {
		if($('.table tbody tr:eq('+i+') td:eq( 7 ) .btn-group a').hasClass('ship-button')){
			$('#stop').trigger( "click" );
			logwrite('Attention! Order on your server!', true);
			alert('Attention! Order on your server!');
			break
		}
	}
	
	
	if(!stop){
		start();
	}
	
	function start() {
		logwrite('Start Parsing', false);
		var n = 0;
		var tnum = parseInt($(".table tbody tr").length);
		for (var i=0;i<=tnum;i++) {	
			if ( $('.table tbody tr:eq('+i+') td:eq( 2 )').html() in servers ) {
				if($('.table tbody tr:eq('+i+') td:eq( 7 )').html().trim() != 'Выполняется'){
					var server = $('.table tbody tr:eq('+i+') td:eq( 2 )').html();
					var orderid = parseInt($('.table tbody tr:eq('+i+') td:eq( 7 ) a').attr('href').replace('/new/lock/','').replace('/',''));
					if(orderid > orderlimit){
						var href = $('.table tbody tr:eq('+i+') td:eq( 7 ) a').attr('href');
						window.location.replace("https://supply.elfmoney.ru"+href);
					}	
				}
				n++;
			}
		}
		
		logwrite('Timeout '+ delay +'sec', false);
		var i = 1;
		var timer = setInterval(function() {
			if(!stop){
				var tostart = delay - i;
				logwrite(tostart +' sec left', false);
				i++;
				if(i == delay){
					window.clearInterval(timer);
					window.location.replace("https://supply.elfmoney.ru/");
				}
			}else{
				window.clearInterval(timer);
			}
		}, 1000);
	}
	/***PAGE INTERACTION***/
	
	
	
	/***INTERFACE ACTIONS***/
	$('#start').click(function(event) {
		event.preventDefault();
		logwrite('Start Parsing', false);
		if(stop){
			stop = false;
			start();
		}
	});
	
	$('#stop').click(function(event) {
		event.preventDefault();
		logwrite('Stop Parsing', false);
		if(!stop){
			stop = true;
		}
	});
	
	$('#close').click(function(event) {
		event.preventDefault();
		$('#editor').css({'height':'90px','overflow':'hidden'});
	});
	
	$('#show').click(function(event) {
		event.preventDefault();
		$('#editor').css({'height':eH,'overflow':'hidden'});
	});
	
	$(window).scroll(function(){
		if ($(window).scrollTop() > 60) {
			$('#editor').css('top','0');
			$('#editor div').css('margin-top','20px');
		}else{
			$('#editor').css('top','51px');
			$('#editor div').css('margin-top','70px');
		}
	});
	/***INTERFACE ACTIONS***/
	
	
		
	/***LOG WRITING***/
	function logwrite(msg, important) {
		var currentdate = new Date(); 
		var datetime = currentdate.getDate() + "/"+  (parseInt(currentdate.getMonth())    + 1)
		+ "/" + currentdate.getFullYear() + " - "  
		+ currentdate.getHours() + ":"  
		+ currentdate.getMinutes() + ":" + currentdate.getSeconds() + ': '; 
	
		if(important){
			var p = "<p style='color:red;'>";
		}else{
			var p = "<p>";
		}
	
		var content = p + '<span>' + datetime + '</span>' + msg + '</p>';
		$("#text").prepend(content);
	}
	/***LOG WRITING***/
});
