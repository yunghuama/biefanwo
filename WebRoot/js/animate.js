//Download by http://www.jb51.net
	var c0_current = 0;
	var c1_current = 0;
	var c2_current = 0;
	var c3_current = 0;
	var c4_current= 0;

	var c0_currentblock = 0;
	var c1_currentblock = 0;
	var c2_currentblock = 0;
	var c3_currentblock = 0;
	var c4_currentblock= 0;
	var allCount=0,page=0,pageSize=1,currentAllCount;
	var lastAnchor,nextAnchor;
	function flip (upperId, lowerId, changeNumber, pathUpper, pathLower){
		var upperBackId = upperId+"Back";
		$(upperId).src = $(upperBackId).src;
		$(upperId).setStyle("height", "32px");
		$(upperId).setStyle("visibility", "visible");
		$(upperBackId).src = pathUpper+parseInt(changeNumber)+".png";
		
		$(lowerId).src = pathLower+parseInt(changeNumber)+".png";
		$(lowerId).setStyle("height", "0px");
		$(lowerId).setStyle("visibility", "visible");
		
		var flipUpper = new Fx.Tween(upperId, {duration: 200, transition: Fx.Transitions.Sine.easeInOut});
		flipUpper.addEvents({
			'complete': function(){
				var flipLower = new Fx.Tween(lowerId, {duration: 200, transition: Fx.Transitions.Sine.easeInOut});
					flipLower.addEvents({
						'complete': function(){	
							lowerBackId = lowerId+"Back";
							$(lowerBackId).src = $(lowerId).src;
							$(lowerId).setStyle("visibility", "hidden");
							$(upperId).setStyle("visibility", "hidden");
						}				});					
					flipLower.start('height', 32);
					
			}
							});
		flipUpper.start('height', 0);
		
		
	}//flip
	
	function retroReport(counts){
		
		var c4 = Math.floor(counts/10000);
		var c3 = Math.floor((counts-c4*10000)/1000);
		var c2 = Math.floor((counts-c4*10000-c3*1000)/100);
		var c1 =  Math.floor((counts-c4*10000-c3*1000-c2*100)/10);
		var c0 = Math.floor(counts-c4*10000-c3*1000-c2*100-c1*10);
		
		 
		 if( c0 != c0_current){
			flip('count0Up', 'count0Down', c0, 'image/up/', 'image/down/');
			c0_current = c0;
		 }
		 
		 if( c1 != c1_current){
				flip('count1Up', 'count1Down', c1, 'image/up/', 'image/down/');
				c1_current = c1;
		 }
		 
		 if( c2 != c2_current){
				flip('count2Up', 'count2Down', c2, 'image/up/', 'image/down/');
				c2_current = c2;
		 }
		 
		 if( c3 != c3_current){
				flip('count3Up', 'count3Down', c3, 'image/up/', 'image/down/');
				c3_current = c3;
		 }

		 if( c4 != c4_current){
				flip('count4Up', 'count4Down', c4, 'image/up/', 'image/down/');
				c4_current = c4;
		 }
	}
	
	function retroBlock(counts){
		
		var c4 = Math.floor(counts/10000);
		var c3 = Math.floor((counts-c4*10000)/1000);
		var c2 = Math.floor((counts-c4*10000-c3*1000)/100);
		var c1 =  Math.floor((counts-c4*10000-c3*1000-c2*100)/10);
		var c0 = Math.floor(counts-c4*10000-c3*1000-c2*100-c1*10);
		
		 
		 if( c0 != c0_currentblock){
			flip('block0Up', 'block0Down', c0, 'image/up/', 'image/down/');
			c0_currentblock = c0;
		 }
		 
		 if( c1 != c1_currentblock){
				flip('block1Up', 'block1Down', c1, 'image/up/', 'image/down/');
				c1_currentblock = c1;
		 }
		 
		 if( c2 != c2_currentblock){
				flip('block2Up', 'block2Down', c2, 'image/up/', 'image/down/');
				c2_currentblock = c2;
		 }
		 
		 if( c3 != c3_currentblock){
				flip('block3Up', 'block3Down', c3, 'image/up/', 'image/down/');
				c3_currentblock = c3;
		 }

		 if( c4 != c4_currentblock){
				flip('block4Up', 'block4Down', c4, 'image/up/', 'image/down/');
				c4_currentblock = c4;
		 }
		
	}
	
	lastAnchor = "2012/11/1 00:00:00";
	initLoadData();
	if(realTimeCount==0){
	setInterval('initLoadData()', 1000*60);
//	setInterval('retroBlock()', 1000);
	}
	realTimeCount++;
	
	
	//---------从服务器获取数据------------
	function initLoadData(){
		nextAnchor = getCurrentTime();
		page = 0;
		loadData();
	}

	//设置数字
	function setCount(count){
		//万
		var w = count/10000;
		//千
		var q = count%10000/1000;
		//百
		var b = count%1000/100;
		//十
		var s = count%100/10;
		//个
		var g = count%10;
		//设置数量图片
		$("img.number").eq(0).attr("src","img/"+parseInt(w)+".png");
		$("img.number").eq(1).attr("src","img/"+parseInt(q)+".png");
		$("img.number").eq(2).attr("src","img/"+parseInt(b)+".png");
		$("img.number").eq(3).attr("src","img/"+parseInt(s)+".png");
		$("img.number").eq(4).attr("src","img/"+parseInt(g)+".png");
	}
	
	function loadData(){
	  /**  $j.ajax({
	    	   type: "POST",
	    	   url: "http://biefanwo.cn:8088/cloudata/system/ajax/reportNumberAnalyse.v",
	    	   data: {"lastAnchor":lastAnchor,"nextAnchor":nextAnchor,"page":page,"count":pageSize},
	    	   dataType:"json",
	    	   success: function(data){
	    		var data = jQuery.parseJSON(data);
	      	    var items = data.response.items;
	      	    if(items==null||items.length==0){
	      	    	return;
	      	    }
	      	    //迭代设置数据
	      	   for(var i=0;i<items.length;i++){
	      		  setDetail(items[i]);
	      	  	 }
	      		},
	      		error : function(msg){
	      			
	      		}
	    	});**/
		$j.getJSON("http://biefanwo.cn:8088/cloudata/system/ajax/reportNumberAnalyse.v?jsoncallback=?", { "lastAnchor":lastAnchor,"nextAnchor":nextAnchor,"page":page,"count":pageSize }, 
			function (data) {
			var data = jQuery.parseJSON(data);
      	    var items = data.response.items;
      	    if(items==null||items.length==0){
      	    	return;
      	    }
      	    //迭代设置数据
      	   for(var i=0;i<items.length;i++){
      		  setDetail(items[i]);
      	  	 }
			});
	}
	
	function setDetail(ele){
		allCount = ele.allCount;
		retroReport(allCount);
	}
	
	function getCurrentTime(){
		var servertime = "";
		
		if(servertime!=""&&servertime!=null)
			return servertime;
		
		//如果获取服务器时间失败，使用本地时间
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth();
		var day = date.getDate();
		var hour =date.getHours();
		var minute = date.getMinutes();
		var seconds = date.getSeconds();
		return year+"/"+(parseInt(month)+1)+"/"+day+" "+hour+":"+minute+":"+seconds;
	}