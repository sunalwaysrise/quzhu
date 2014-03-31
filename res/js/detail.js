$("#headerback1").click(function(){
	history.go(-1);
});
localStorage.removeItem('room');
localStorage.removeItem('hotelName');
localStorage.removeItem('picPath');
localStorage.removeItem('city');
localStorage.removeItem('address');
var id=localStorage.getItem('hotelId'),latitude,longitude,hotelName='',hotelPrice='';
$.ajax({
	url:WebAppUrl.HOME_APP_URL+"hotel_get.action",
	data:{"hotel.id":id},
	beforeSend:function(){},
	success:function(data){
		var data=eval("("+data+")");
		if(data.errorCode==200){
			var hotel=data.hotel,picArr=[],html=[],D1=$("#d1");
			latitude=hotel.latitude;
			longitude=hotel.longitude;
			hotelName=hotel.name;
			hotelPrice=hotel.price;
			if(hotel.picPath){picArr.push(hotel.picPath);}
			if(hotel.picPath1){picArr.push(hotel.picPath1);}
			if(hotel.picPath2){picArr.push(hotel.picPath2);}
			if(hotel.picPath3){picArr.push(hotel.picPath3);}
			if(hotel.picPath4){picArr.push(hotel.picPath4);}
			html.push('<div class="ListContents list1Content" id="L1">');
			var j=0,jlen=picArr.length;
			for(j;j<jlen;j++){html.push('<b><img src="'+WebAppUrl.IMG+picArr[j]+'" /></b>');}
			html.push('</div>');
			D1.html(html.join(''));
			html=[];
			html.push('<div class="list1Top"><strong>'+hotel.price+'</strong><em>￥</em><p>起</p></div>');
			html.push('<div class="list1Bottom">');
			html.push('<i class="hot">HOT</i>');
			html.push('<div class="tip">');
			html.push('<p>'+hotel.name+'</p>');
			html.push('<div>'+hotel.province+'|'+hotel.city+'</div>');
			html.push('</div>');
			html.push('<p class="nav" id="L1L1">');
			j=0;for(j;j<jlen;j++){
				if(j==0){
					html.push('<a class="on"></a>');
				}else{
					html.push('<a></a>');
				}
			}
			html.push('</p>');
			html.push('</div>');
			D1.after(html.join(''));
			var LC=$(".ListContents");
			LC.css({"width":jlen*100+"%"});
			LC.find('b').css({"width":100/jlen+"%"});
			document.getElementById('d3').innerHTML=hotel.province+'|'+hotel.city;
			document.getElementById('d4').innerHTML=hotel.name;
			document.getElementById("d2").innerHTML=hotel.intro;
			localStorage.setItem('picPath',picArr[0]);
			localStorage.setItem('city',hotel.city);
			localStorage.setItem('address',hotel.province);
			html=[];
			html.push('<div class="list2Content"><img src="'+WebAppUrl.IMG+picArr[0]+'"></div>');
			html.push('<div class="list1Bottom"><div class="tip"><p>'+hotel.name+'</p><div>'+hotel.province+'|'+hotel.city+'</div></div></div>');
			var D = new Date(),m=D.getMonth()+1,d=D.getDate(),
				d3=new Date(D.getTime()+1000*60*60*24),
				_name=localStorage.getItem('name'),
				_mobile=localStorage.getItem('mobile');
			if(!_name){
				_name="";
			}
			if(!_mobile){
				_mobile="";
			}
			html.push('<div class="Center"><div id="theTimes" class="theTimes"><p id="theTimes2">入住'+m+'月'+d+'日-退房'+(d3.getMonth()+1)+'月'+d3.getDate()+'日</p><span>点击调整</span></div>');
			html.push('<div id="myRoom"></div>');
			html.push('<div class="line9"><span>联系人姓名：</span><input value="'+_name+'" id="name" class="input9" type="text" /><a onclick="quzhu.Contact.get();">添加</a></div>');
			html.push('<div class="line9"><span>手机号码：</span><input value="'+_mobile+'" id="mobile" class="input9" type="number"/></div><div class="bankPm40"></div></div>');
			html.push('<a class="find" id="checkOut">确定订单信息无误<i class="icon4"></i></a>');
			html.push('</div>');
			document.getElementById('orderDetail').innerHTML=html.join('');
			$("#theTimes").click(function(){
				$("#setTimesBGo").show();
			});
			$("#checkOut").click(function(){
				quzhu.user.status(function(){
					var r=localStorage.getItem('room'),i=0,html=[],price=0;
					r=eval("("+r+")");
					for(i in r){
						html.push(i+'|'+r[i][0]);
						price+=r[i][0]*r[i][1];
					}
					var data={
						"order.userId":localStorage.getItem('userId'),
						"order.name":$("#name").val(),
						"order.hotelName":hotel.name,
						"order.roomName":html.join('#'),
						"order.mobile":$("#mobile").val(),
						"order.timeLive":localStorage.getItem('timeLive'),
						"order.days":localStorage.getItem('days'),
						"order.status":0,
						"order.price":price,
						"order.picPath":localStorage.getItem('picPath'),
						"order.city":localStorage.getItem('city'),
						"order.address":localStorage.getItem('address'),
						"order.remark":''
					};
		if(!data["order.userId"]||!data["order.name"]||!data["order.hotelName"]||!data["order.roomName"]||!data["order.mobile"]||!data["order.timeLive"]||!data["order.days"]||!data["order.price"]){
			return false;
		}
					$.ajax({
						url:WebAppUrl.HOME_APP_URL+"order_save.action",
						data:data,
						success:function(data){
							var data=eval("("+data+")");
							if(data.errorCode==200){
								location.href="myOrder.html";
							}
						}
					});
				});
			});
		}else{
			$("#title").html(data.errorMsg);
		}
	}
});
$("#backK2").click(function(){
	$("#setTimeHeader").hide();
	$("#weekNav").hide();
	$("#setTimes").hide();
	$("#header").removeClass("header2").addClass("header1");
});
$(".setTime").click(function(){
	$("#setTimeHeader").show();
});
$("#checkTime2").click(function(){
	var t=quzhu.day.show(),
		n=new Date(t[0],t[1]-1,t[2]).getDay(),
		m=quzhu.util.setMonth(t[1]),
		w=quzhu.util.setWeek(n),
		d=t[2];
	d<10?d="0"+d:"";
	if(quzhu.title.status==1){
		quzhu.title.beginTime=t[0]+"-"+t[1]+"-"+t[2];
		selectDom.setBeginTime.html('<b>'+m+'</b><a data="'+t[1]+'">'+d+'</a><span>'+w+'</span>');
	}else if(quzhu.title.status==2){
		quzhu.title.endTime=t[0]+"-"+t[1]+"-"+t[2];
		selectDom.setEndTime.html('<b>'+m+'</b><a data="'+t[1]+'">'+d+'</a><span>'+w+'</span>');
	}
	$("#backK2").click();
	quzhu.title.sumDay();
});
$("#okTime").click(function(){
	var a=$("#setBeginTime").children("a"),b=$("#setEndTime").children("a"),
		a1=a.attr("data"),
		a2=a.html(),
		a3=b.attr("data"),
		a4=b.html();
	if(!a1 || !a2 || !a3 || !a4){
		return false;
	}
	document.getElementById('theTimes2').innerHTML="入住"+a1+"月"+a2+"日-退房"+a3+"月"+a4+"日";
	$("#setTimesBGo").hide();
	localStorage.setItem('timeLive',quzhu.title.beginTime);
	localStorage.setItem('days',$("#totalTime").html());
});
$.ajax({
	url:WebAppUrl.HOME_APP_URL+"room_list.action",
	data:{"hotelId":id},
	beforeSend:function(){},
	success:function(data){
		var data=eval("("+data+")");
		if(data.errorCode==200){
			var roomList=data.roomList,i=0,len=roomList.length,html=[];
			$("#pp0").html(roomList[0].price);
			$("#pp1").html(roomList[0].price1);
			$("#pp2").html(roomList[0].price2);
			for(i;i<len;i++){
				var picArr=[];
				if(roomList[i].picPath){picArr.push(roomList[i].picPath);}
				if(roomList[i].picPath1){picArr.push(roomList[i].picPath1);}
				if(roomList[i].picPath2){picArr.push(roomList[i].picPath2);}
				if(roomList[i].picPath3){picArr.push(roomList[i].picPath3);}
				if(roomList[i].picPath4){picArr.push(roomList[i].picPath4);}
				var j=0,jlen=picArr.length;
				html.push('<li><h6><span>'+roomList[i].name+'</span><div data="'+roomList[i].name+'" data2="'+roomList[i].price+'"><a class="sub"><b></b></a><code>0</code><a class="add gery"><b></b><em></em></a></div></h6><div class="room">');
				html.push('<div class="list1Contents" ontouchstart="quzhu.ui.touch.touchStart(event)" ontouchmove="quzhu.ui.touch.touchMove(event);" ontouchend="quzhu.ui.touch.touchEnd(\'L_2\','+jlen+');">');
				html.push('<div class="ListContents list1Content ListContents2" id="L_2">');
				
				for(j;j<jlen;j++){
					html.push('<b><img src="'+WebAppUrl.IMG+picArr[j]+'" /></b>');
				}
				html.push('</div>');
				html.push('<p class="nav" id="L2L2">');
				j=0;
				for(j;j<jlen;j++){
					if(j==0){
						html.push('<a class="on"></a>');
					}else{
						html.push('<a></a>');
					}
				}
				var p0,p1,p2;
				if(roomList[i].price){p0=roomList[i].price;}
				if(roomList[i].price1){p1=roomList[i].price1;}
				if(roomList[i].price2){p2=roomList[i].price2;}
				html.push('</p>');
				html.push('</div>');
				html.push('<div class="rankTypes">');
				html.push('<div>');
				html.push('<p class="rankTypeP1"><a>日</a>租</p>');
				html.push('<p class="rankTypeP2"><sup>￥</sup><span>'+p0+'</span></p>');
				html.push('<p class="rankTypeP3">每天</p>');
				html.push('</div>');
				html.push('<div>');
				html.push('<p class="rankTypeP1"><a>周</a>租</p>');
				html.push('<p class="rankTypeP2"><sup>￥</sup><span>'+p1+'</span></p>');
				html.push('<p class="rankTypeP3">每天</p>');
				html.push('</div>');
				html.push('<div>');
				html.push('<p class="rankTypeP1"><a>月</a>租</p>');
				html.push('<p class="rankTypeP2"><sup>￥</sup><span>'+p2+'</span></p>');
				html.push('<p class="rankTypeP3">每天</p>');
				html.push('</div>');
				html.push('</div>');
				var k=0,d=roomList[i].prop.split('|'),klen=d.length,kl=[];
				for(k;k<klen;k++){
					kl.push('<a>'+d[k]+'</a>');
				}
				html.push('<p class="roomTip">'+kl.join('')+'</p>');
				html.push('</div></li>');
			}
			document.getElementById('roomDetail').innerHTML=html.join('');
			$(".ListContents2").each(function(i,v){
				$(v).css({"width":100+"%"});
			});
			$(".sub").click(function(){
				quzhu.setRoom($(this),$(this).next(),$(this).next().next(),false,$(this).parent().attr('data'),$(this).parent().attr('data2'));
				return false;
			});
			$(".add").click(function(){
				quzhu.setRoom($(this).prev().prev(),$(this).prev(),$(this),true,$(this).parent().attr('data'),$(this).parent().attr('data2'));
				return false;
			});
			$(".room").eq(0).show();
			$("h6").click(function(){
				$(".room").hide();
				$(this).next().show();
			});
		}else{
			$("#title").html(data.errorMsg);
		}
	}
});
quzhu.setRoom=function(s,c,a,tf,d,d2){
	var h=c.html(),r=localStorage.getItem('room');
	if(tf){
		h++;
	}else{
		h--;
	}
	if(h<1){
		h=0;
		s.removeClass('gery');
		c.removeClass('gery');
	}else if(h>20){
		h=20;
	}else{
		s.addClass('gery');
		c.addClass('gery');
	}
	if(r){
		r=eval("("+r+")");
		
		if(h==0){
			delete r[d];
		}else{
			r[d]=[h,d2];
		}
		localStorage.setItem('room',JSON.stringify( r ));
	}else{
		localStorage.setItem('room','{"'+d+'":['+h+','+d2+']}');
	}
	c.html(h);
};
quzhu.setMap={
	showMapBox:function(){
		if(longitude && latitude){
			$("#mapArea").show();
			if($("#mapArea").children("div").length==0){
				this.setMap();
			}			
			detailDom.headerback1.hide();
			detailDom.headerback4.show();
			detailDom.mapBtn.hide();
		}
	},
	hideMapBox:function(){
		$("#mapArea").hide();
		detailDom.headerback1.show();
		detailDom.headerback4.hide();
		detailDom.mapBtn.show();
	},
	mapObj:{},
	setMap:function(){
		var mapObj = new AMap.Map("mapArea",{center:new AMap.LngLat(longitude,latitude),level:13});
		this.mapObj=mapObj;
		this.addMark();
	},
	addMark:function(){ 
		//自定义点标记内容
		var markerContent = document.createElement("div");
		markerContent.className = "markerContentStyle";
		//点标记中的图标
		var markerImg= document.createElement("em");
		markerImg.className="markerlnglat";
		markerContent.appendChild(markerImg);
		 //点标记中的文本
		var markerSpan = document.createElement("div");
		markerSpan.className = "markerSpan";
		markerSpan.innerHTML = hotelName+" ¥"+hotelPrice+"起";
		markerContent.appendChild(markerSpan);
		marker = new AMap.Marker({
			map:quzhu.setMap.mapObj,
			position:new AMap.LngLat(longitude,latitude),
			offset:new AMap.Pixel(-18,-36),
			draggable:false,
			content:markerContent//自定义点标记覆盖物内容  
		});  
		marker.setMap(quzhu.setMap.mapObj); 
	}
};

//测试 phoneGap 通讯录

quzhu.Contact={
	get:function(){
		
	}
}

