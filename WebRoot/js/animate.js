//Download by http://www.jb51.net
	var c0_current = 0;
	var c1_current = 0;
	var c2_current = 0;
	var c3_current = 0;
	var c4_current= 0;

	
	function flip (upperId, lowerId, changeNumber, pathUpper, pathLower){
		var upperBackId = upperId+"Back";
		console.debug(upperBackId);
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
				
	var i = 8888;
	var current_i;
	function retroClock(){
		
		var c4 = Math.floor(i/10000);
		var c3 = Math.floor((i-c4*10000)/1000);
		var c2 = Math.floor((i-c4*10000-c3*1000)/100);
		var c1 =  Math.floor((i-c4*10000-c3*1000-c2*100)/10);
		var c0 = Math.floor(i-c4*10000-c3*1000-c2*100-c1*10);
		
		 console.debug(c0+"/"+c1+"/"+c2+"/"+c3+"/"+c4);
		 
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
		
		 i++;
	}
	
	if(realTimeCount==0)
	setInterval('retroClock()', 1000);
	realTimeCount++;
	