var WebAppUrl={
		RESOURCE_URL:"",
		HOME_APP_URL:'http://112.124.12.51/',
		USER_STATU:"",
		IMG:"http://112.124.12.51/upload/",
	}
	,quzhu={};
quzhu.getArgs=function(){
     var params = {};
     var loc = String(document.location);
     if (loc.indexOf("?") > 0){
	 	loc = loc.substr(loc.indexOf('?') + 1);
	 }else{
	 	loc = uexWindow.getUrlQuery();
	 }
     var pieces = loc.split('&');
     params.keys = [];
     for (var i = 0; i < pieces.length; i += 1) {
       var keyVal = pieces[i].split('=');
       params[keyVal[0]] = decodeURIComponent(keyVal[1]);
       params.keys.push(keyVal[0]);
     }
     return params;
};
quzhu.showMap=function(lat,lon){
	var position=new AMap.LngLat(lon,lat);  
  	var mapObj = new AMap.Map("container", {
		center: position,
		zooms: [8, 15],
		level: 10});
	var marker=new AMap.Marker({
		icon:"http://webapi.amap.com/images/marker_sprite.png",  
		position:new AMap.LngLat(lon,lat)
	});
    marker.setMap(mapObj);
};
quzhu.pic={
	cur:0,
	picPath:[],
	next:function(){
		//console.log(this.cur,this.picPath.length);
		if(this.cur==this.picPath.length){
			return false;
		}
		if(this.cur+1<this.picPath.length){
			this.cur++;
			curPic.attr({"src":WebAppUrl.IMG+this.picPath[this.cur]+"_320x160.jpg"});
		}
	},
	prev:function(){
		if(this.cur==0){
			return false;
		}
		if(this.cur-1>=0){
			this.cur--;
			curPic.attr({"src":WebAppUrl.IMG+this.picPath[this.cur]+"_320x160.jpg"});
		}
	}
};

$("#step1").click(function(){
	var num=$("#userID").val();
	$.getJSON(WebAppUrl.HOME_APP_URL+"quzhu/user_save.action?user.mobile="+num,function(data){
		if(data.errorCode==200){
			$("#register1").hide();
			$("#register2").show();
			$("#moblie").html(num);
		}else{
			$("#tip").html(data.errorMsg);
		}
	});
});

$("#loginBtn").click(function(){
	var moblie=$("#moblie").val(),password=$("#password").val();
	$.getJSON(WebAppUrl.HOME_APP_URL+"quzhu/user_login.action?user.userName="+moblie+"&user.password="+password,function(data){
		if(data.errorCode==200){
			$("#status").html(data.errorMsg);
		}else{
			$("#status").html(data.errorMsg);
		}
	});
});
quzhu.list={
	index:function(t,p){
		return false;
		!p?p=1:"";
		$.getJSON(WebAppUrl.HOME_APP_URL+"hotel_list.action?pageNo="+p+"&pageSize=10",function(data){
			if(data.errorCode==200){
				var list=data.hotelPagelist.result,i=0,len=list.length,html=[];
				for(i;i<len;i++){
					html.push('<li><a href="detail.html?id='+list[i].id+'"><img src="'+WebAppUrl.IMG+list[i].picPath+'_60x60.jpg" /><b>'+list[i].name+'</b><span>'+list[i].intro.substr(0,20)+'</span></a></li>');
				}
				$("#list").html(html.join(''));
				var pageNum=Math.floor(data.totalResults/10),pages=[];i=0;
				for(i;i<pageNum;i++){
					if(i==(p-1)){
						pages.push('<span>'+(i+1)+'</span>');
					}else{
						pages.push('<a onclick="quzhu.list.index(1,'+(i+1)+')">'+(i+1)+'</a>');
					}
				}
				$("#pages").html(pages.join(''));
			}else{
				$("#title").html(data.errorMsg);
			}
		});
	},
	detail:function(id){
		return false;
		$.getJSON(WebAppUrl.HOME_APP_URL+"hotel_get.action?hotel.id="+id,function(data){
			if(data.errorCode==200){
				$("#title").html(data.hotel.name);
				var html=[];
				$("#stars").addClass("stars_"+data.hotel.level);
				$("#level").val(data.hotel.level);
				curPic.attr({"src":WebAppUrl.IMG+data.hotel.picPath+"_320x160.jpg"});
				html.push('<p class="address>'+data.hotel.province+','+data.hotel.city+','+data.hotel.address+'</p>');
				html.push('<p class="intro">'+data.hotel.intro+'</p>');
				$("#detail").html(html.join(''));
				quzhu.showMap(data.hotel.latitude,data.hotel.longitude);
				if(data.hotel.picPath){quzhu.picPath.push(data.hotel.picPath)}
				if(data.hotel.picPath1){quzhu.picPath.push(data.hotel.picPath1)}
				if(data.hotel.picPath2){quzhu.picPath.push(data.hotel.picPath2)}
				if(data.hotel.picPath3){quzhu.picPath.push(data.hotel.picPath3)}
				if(data.hotel.picPath4){quzhu.picPath.push(data.hotel.picPath4)}
				$("#prev").click(function(){
					quzhu.pic.prev();
				});
				$("#next").click(function(){
					quzhu.pic.next();
				});
			}else{
				$("#title").html(data.errorMsg);
			}
		});
	}
};
$("#map").click(function(){
	if(!$(this).hasClass("on")){
		$(this).addClass("on");
		$("#backToDetail").show();
		$("#backToList").hide();
		window.scrollTo('0','0');
	}
});
$("#backToList").click(function(){
	window.history.go(-1);
});
$("#backToDetail").click(function(){
	$(this).hide();
	$("#backToList").show();
	$("#map").removeClass("on");
});
curPic=$("#curPic");
if (navigator.geolocation){
	navigator.geolocation.getCurrentPosition(function(position){
		window.localStorage.setItem('latitude', position.coords.latitude );
		window.localStorage.setItem('longitude', position.coords.longitude );
	},function(error){
		window.localStorage.setItem('latitude', '29.8683356932' );
		window.localStorage.setItem('longitude', '121.5449237823' );
	});
}else{
	window.localStorage.setItem('latitude', '29.8683356932' );
	window.localStorage.setItem('longitude', '121.5449237823' );
}
