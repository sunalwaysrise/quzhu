var headDom={curTime:$("#curTime"),header:$("#header"),headerH2:$("#h2"),headerH3:$("#h3"),headerback2:$("#back2"),headerback1:$("#back1"),headerCheckTime:$("#checkTime")};
var priceDom={priceBtn:$("#priceBtn"),setPriceIn:$("#setPriceIn"),priceShow:$("#priceShow")};
quzhu.ui={
	alert:function(t){
		var DBoxAlert=$("#DBoxAlert");
		if(DBoxAlert.length>0){
			DBoxAlert.html(t).fadeIn();
		}else{
			$("#DBox").append("<div id='DBoxAlert'>"+t+"</div>");
		}
		setTimeout('quzhu.ui.closeAlert()',1000);
	},
	closeAlert:function(){
		$("#DBoxAlert").fadeOut();
	},
	time:function(){
		var now=new Date(),H=now.getHours(),M=now.getMinutes(),AP="AM";
		if(M<10){M="0"+M;}
		if(H>12){
			H=H-12;
			AP="PM";
		}
		headDom.curTime.html(H+" : "+M+" "+AP);
	},
	slideLeft:function(o){
		var slidePart=$("#"+o.d),nav=$("#"+o.d+o.d),cur=nav.attr("data");
		nav.children("a").removeClass("on");
		if(!cur){cur=0;}
		if(!o.m){
			o.m=$("#L1L1").children('a').length;
		}
		cur++;
		if(cur>=o.m){
			cur=0;
		}
		nav.attr({"data":cur});
		nav.children("a").eq(cur).addClass("on");
		slidePart.animate({left: -o.width},function(){
			slidePart.append(slidePart.children("b").eq(0).clone());
			slidePart.children("b").eq(0).remove();
			slidePart.css({"left":0});
		});
	},
	slideRight:function(o){
		var slidePart=$("#"+o.d),nav=$("#"+o.d+o.d),cur=nav.attr("data");
		nav.children("a").removeClass("on");
		if(!cur){cur=0;}
		cur--;
		if(!o.m){
			o.m=$("#L1L1").children('a').length;
		}
		if(cur<0){
			cur=o.m-1;
		}
		nav.attr({"data":cur});
		slidePart.prepend(slidePart.children("b").eq(o.len-1).clone()).css({"left":-o.width});
		slidePart.children("b").eq(o.len).remove();
		nav.children("a").eq(cur).addClass("on");
		slidePart.animate({left: 0});
	}
};
quzhu.ui.time();
setInterval('quzhu.ui.time()',500);
quzhu.ui.touch={
	tX:[],
	//tY:[],
	touchStart:function(a){
		this.tX.push(a.touches[0].pageX);
		//this.tY.push(a.touches[0].pageY);
	},
	touchMove:function(c){
		this.tX.push(c.touches[0].pageX);
		//c.preventDefault();
	},
	touchMove2:function(c){
		this.tX.push(c.touches[0].pageX);
		var left=c.touches[0].pageX;
		if(left<0){
			left=0;
		}else if(left>250){
			left=250;
		}
		quzhu.setPrice.set(left);
		priceDom.priceBtn.css({"left":left-20});
		priceDom.setPriceIn.css({"width":left});
		priceDom.priceShow.css({"left":left-40}).html("￥"+quzhu.setPrice.price);
		c.preventDefault();
	},
	touchEnd:function(e,l){
		if (this.tX[0] - this.tX[this.tX.length - 1] > 20) {
			quzhu.ui.slideLeft({width:320,len:3,d:e,m:l});
		}else if( this.tX[this.tX.length - 1] - this.tX[0] > 20){
			quzhu.ui.slideRight({width:320,len:3,d:e,m:l});
		}
		this.tX = [];
	},
	touchEnd2:function(){
		this.tX = [];
	}
};
$("#curTime").click(function(){
	quzhu.ui.slideLeft({width:320,len:3,d:"L1"});
});
$(".ListContents").each(function(i,v){
	$(v).css({"width":$(v).children("a").length*320});
});
var selectDom={setCitys:$("#setCitys"),setTimes:$("#setTimes"),weekNav:$("#weekNav"),month:$("#month"),monthList:$("#monthList"),dayList:$("#dayList"),setBeginTime:$("#setBeginTime"),setEndTime:$("#setEndTime"),totalTime:$("#totalTime")};

quzhu.day={
	Y:"",M:"",D:"",
	init:function(){
		var _m=[],i=1,d=new Date();
		this.Y=d.getFullYear();
		this.M=d.getMonth()+1;
		this.D=d.getDate();
		for(i;i<13;i++){
			//if(i<10){i="0"+i;}
			_m.push("<li data='"+i+"'>"+i+"</li>");
		}
		selectDom.month.html(this.M+"月");
		selectDom.monthList.html(_m.join(""));
		$("#monthList li").click(function(){
			var m=$(this).attr("data");
			quzhu.day.day(m);
			selectDom.monthList.hide();
			selectDom.month.html(m+"月");
			quzhu.day.M=m;
		});
        this.day();
	},
	day:function(M){
		if(M){this.M=M;}
		var m=this.M,y=this.Y,ds,i=1,_d=[],d,xq=new Date(y,(m-1),01),xqq=xq.getDay(),xqqi=0;
		for(xqqi;xqqi<xqq;xqqi++){
			_d.push('<a></a>');
		}
		if(m=="1"||m=="3"||m=="5"||m=="7"||m=="8"||m=="10"||m=="12"){
			ds=31;
		}else if(m=="4"||m=="6"||m=="9"||m=="11"){
			ds=30;
		}else{
			(y%4==0&&y%100!=0||y%400==0)?ds=29:ds=28;
		}
		var TD=new Date(),TDM=Number(TD.getMonth())+1<10?"0"+(TD.getMonth()+1):TD.getMonth()+1,TDD=TD.getDate();
		for(i;i<=ds;i++){
			if(this.M==TDM && TDD==i){
				_d.push('<a class="cur click">'+i+'</a>');
			}else if(this.M<=TDM && i<TDD){
				_d.push('<a class="unclick">'+i+'</a>');
			}else{
				_d.push('<a class="click">'+i+'</a>');
			}
		}
		selectDom.dayList.html(_d.join(""));
		$("#dayList a.click").click(function(){
			$(this).siblings().removeClass("cur").end().addClass("cur");
			quzhu.day.D=$(this).html();
		});
	},
	show:function(){
		return [this.Y,this.M,this.D];
	}
};
quzhu.title={
	status:1,
	step1:function(){
		headDom.header.removeClass("header2").addClass("header1");
		headDom.headerH2.html("设置我的行程");
		headDom.headerH3.show();
		headDom.headerback1.show();
		headDom.headerback2.hide();
		selectDom.setCitys.hide();
		selectDom.setTimes.hide();
		selectDom.weekNav.hide();
		headDom.headerCheckTime.hide();
		$("html,body").scrollTop(0);
	},
	step2:function(d){
		headDom.header.removeClass("header1").addClass("header2");
		headDom.headerH2.html(d);
		headDom.headerH3.hide();
		headDom.headerback1.hide();
		headDom.headerback2.show();
		$("html,body").scrollTop(0);
	},
	step3:function(o){
		this.step2(o.d);
		this.status=o.o;
		selectDom.weekNav.show();
		headDom.headerCheckTime.show();
		quzhu.day.init();
	},
	beginTime:"",
	endTime:"",
	sumDay:function(){
		if(this.beginTime && this.endTime){
			var b=this.beginTime.split("-"),e=this.endTime.split("-"),date=new Date(e[0],(e[1]-1),e[2]).getTime()-new Date(b[0],(b[1]-1),b[2]).getTime(),tt=Math.floor(date/(24*3600*1000));
			if(tt<1){
				quzhu.title.endTime="";
				selectDom.setEndTime.html('<b></b><a></a><span></span>');
				selectDom.totalTime.html("");
			}else{
				selectDom.totalTime.html(tt);
			}
		}
	}
};
$("#setCity").click(function(){
	quzhu.title.step2($(this).attr("data"));
	selectDom.setCitys.show();
});
headDom.headerback2.click(function(){
	quzhu.title.step1();
});
$(".setTime").click(function(){
	quzhu.title.step3({d:$(this).attr("data"),o:$(this).attr("data2")});
	selectDom.setTimes.show();
});
selectDom.month.click(function(){
	selectDom.monthList.toggle();
});
/*headDom.headerCheckTime.click(function(){
	var t=quzhu.day.show(),
		n=new Date(t[0],t[1]-1,t[2]).getDay(),
		m=quzhu.util.setMonth(t[1]),
		w=quzhu.util.setWeek(n),
		d=t[2];
	d<10?d="0"+d:"";
	if(quzhu.title.status==1){
		quzhu.title.beginTime=t[0]+"-"+t[1]+"-"+t[2];
		selectDom.setBeginTime.html('<b>'+m+'</b><a>'+d+'</a><span>'+w+'</span>');
	}else if(quzhu.title.status==2){
		quzhu.title.endTime=t[0]+"-"+t[1]+"-"+t[2];
		selectDom.setEndTime.html('<b>'+m+'</b><a>'+d+'</a><span>'+w+'</span>');
	}
	quzhu.title.step1();
	quzhu.title.sumDay();
});*/
headDom.headerCheckTime.click(function(){
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
	$("#back2").click();
	quzhu.title.sumDay();
});
//Search Page 4
var searchDom={	sorts:$("#sorts"),bg:$("#bg"),sort:$("#sort"),input:$("#input"),clear:$("#clear"),setArea:$("#setArea a")};
searchDom.sort.click(function(){
	searchDom.bg.show();
	searchDom.sorts.show();
});
$("#cancelSort").click(function(){
	searchDom.bg.hide();
	searchDom.sorts.hide();
});
searchDom.input.blur(function(){
	if($(this).val()){
		searchDom.clear.show();
	}else{
		searchDom.clear.hide();
	}
});
searchDom.clear.click(function(){
	$(this).hide();searchDom.input.val("").focus();
});
searchDom.setArea.click(function(){
	searchDom.setArea.removeClass("on");
	$(this).addClass("on");
	quzhu.search.area=$(this).html();
});
//Detail Page 5
var detailDom={
	headerback1:$("#headerback1"),
	headerback2:$("#headerback2"),
	headerback3:$("#headerback3"),
	headerback4:$("#headerback4"),
	mapBtn:$("#mapBtn"),
	roomDetail:$("#roomDetail"),
	orderDetail:$("#orderDetail"),
	booking:$("#booking"),
	viewRoom:$("#viewRoom"),
	bottomFixed:$("#detailBox")
};
quzhu.room={
	step1:function(){
		headDom.header.removeClass("header2").addClass("header1");
		headDom.headerH2.html("公寓详情");
		headDom.headerH3.html("宁波市，浙江省，中国");
		detailDom.headerback1.show();
		detailDom.headerback2.hide();
		detailDom.headerback3.hide();
		detailDom.headerback4.hide();
		detailDom.mapBtn.show();
		detailDom.roomDetail.hide();
		detailDom.orderDetail.hide();
		detailDom.bottomFixed.show();
		$("#setTimesBGo").hide();
		$("html,body").scrollTop(0);
	},
	step2:function(){
		headDom.header.removeClass("header1").addClass("header2");
		headDom.headerH2.html("房型");
		headDom.headerH3.html("该公寓面向整套租用的用户");
		detailDom.headerback1.hide();
		detailDom.headerback2.show();
		detailDom.headerback3.hide();
		detailDom.headerback4.hide();
		detailDom.orderDetail.hide();
		detailDom.mapBtn.hide();
		detailDom.roomDetail.show();
		detailDom.bottomFixed.hide();
		$("html,body").scrollTop(0);
	},
	step3:function(){
		var r=localStorage.getItem('room'),f=false,i;
		r=eval("("+r+")");
		for(i in r){
			if(r[i][0]>0){
				f=true;
			}
		}
		if(!f){
			return quzhu.room.step2();
		}
		var r=localStorage.getItem('room'),i=0,html=[];
		r=eval("("+r+")");
		for(i in r){
			html.push('<p ><span>'+i+'X'+r[i][0]+'</span><em>￥'+(r[i][0]*r[i][1])+'</em></p>');
		}
		document.getElementById('myRoom').innerHTML=html.join('');
		headDom.header.removeClass("header2").addClass("header1");
		headDom.headerH2.html("确认订单");
		headDom.headerH3.html("请确认您的入住时间与联系方式");
		detailDom.headerback1.hide();
		detailDom.headerback2.hide();
		detailDom.headerback3.show();
		detailDom.headerback4.hide();
		detailDom.roomDetail.hide();
		detailDom.mapBtn.hide();
		detailDom.orderDetail.show();
		detailDom.bottomFixed.hide();
		$("html,body").scrollTop(0);
	}
};
detailDom.headerback1.click(function(){quzhu.room.step1();});
detailDom.headerback2.click(function(){quzhu.room.step1();});
detailDom.headerback3.click(function(){quzhu.room.step1();});
detailDom.viewRoom.click(function(){quzhu.room.step2();});
detailDom.booking.click(function(){quzhu.room.step3();});

