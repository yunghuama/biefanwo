//Download by http://www.jb51.net
	var c0_current = 0;
	var c1_current = 0;
	var c2_current = 0;
	var c3_current = 0;
	var c4_current= 0;
	var c5_current= 0;

	var c0_currentblock = 0;
	var c1_currentblock = 0;
	var c2_currentblock = 0;
	var c3_currentblock = 0;
	var c4_currentblock= 0;
	var c5_currentblock= 0;
	var allCount=0,page=0,pageSize=1,currentAllCount;
	var lastAnchor,nextAnchor;
	function flip (upperId, lowerId, changeNumber, pathUpper, pathLower){
		$j("#"+upperId).attr("src",pathUpper+parseInt(changeNumber)+".png");
		$j("#"+lowerId).attr("src",pathLower+parseInt(changeNumber)+".png");
		
	}
	
	function retroReport(counts){
		
		var c5 = Math.floor(counts/100000);
		var c4 = Math.floor((counts-c5*100000)/10000);
		var c3 = Math.floor((counts-c5*100000-c4*10000)/1000);
		var c2 = Math.floor((counts-c5*100000-c4*10000-c3*1000)/100);
		var c1 =  Math.floor((counts-c5*100000-c4*10000-c3*1000-c2*100)/10);
		var c0 = Math.floor(counts-c5*100000-c4*10000-c3*1000-c2*100-c1*10);
		
		 
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
		 if( c5 != c5_current){
				flip('count5Up', 'count5Down', c5, 'image/up/', 'image/down/');
				c5_current = c5;
		 }
	}
	
	function retroBlock(counts){
		
		var c5 = Math.floor(counts/100000);
		var c4 = Math.floor((counts-c5*100000)/10000);
		var c3 = Math.floor((counts-c5*100000-c4*10000)/1000);
		var c2 = Math.floor((counts-c5*100000-c4*10000-c3*1000)/100);
		var c1 =  Math.floor((counts-c5*100000-c4*10000-c3*1000-c2*100)/10);
		var c0 = Math.floor(counts-c5*100000-c4*10000-c3*1000-c2*100-c1*10);
		
		 
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
		 
		 if( c5 != c5_currentblock){
				flip('block5Up', 'block5Down', c5, 'image/up/', 'image/down/');
				c5_currentblock = c5;
		 }
		
	}
	
	lastAnchor = "2012/11/1 00:00:00";
	initLoadData();
	if(realTimeCount==0){
	setInterval('initLoadData()', 1000*60);
	}
	realTimeCount++;
	
	
	//---------从服务器获取数据------------
	function initLoadData(){
		nextAnchor = getCurrentTime();
		page = 0;
		loadData();
	}


	
	function loadData(){
		$j.getJSON("http://biefanwo.cn:8088/cloudata/system/ajax/reportNumberAnalyse.v?jsoncallback=?", { "lastAnchor":lastAnchor,"nextAnchor":nextAnchor,"page":page,"count":pageSize }, 
			function (data) {
			var data = jQuery.parseJSON(data);
      	    var items = data.response.items;
      	    if(items==null||items.length==0){
      	    	return;
      	    }
      	    //迭代设置数据
      	   for(var i=0;i<items.length;i++){
      		  setRepDetail(items[i]);
      	  	 }
			});
		$j.getJSON("http://biefanwo.cn:8088/cloudata/system/ajax/reportIntercept.v?jsoncallback=?", { "lastAnchor":lastAnchor,"nextAnchor":nextAnchor,"page":page,"count":pageSize }, 
				function (data) {
				var data = jQuery.parseJSON(data);
	      	    var items = data.response.items;
	      	    if(items==null||items.length==0){
	      	    	return;
	      	    }
	      	    //迭代设置数据
	      	   for(var i=0;i<items.length;i++){
	      		 setInterceptDetail(items[i]);
	      	  	 }
				});
	}
	
	function setRepDetail(ele){
		allCount = ele.allCount;
		retroReport(allCount);
	}
	
	function setInterceptDetail(ele){
		allCount = ele.allCount;
		retroBlock(allCount);
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