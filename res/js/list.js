var area={};
if(window.localStorage.getItem('hotelName')){
	area["hotel.name"]=window.localStorage.getItem('hotelName');
}
if(window.localStorage.getItem('hotelPrice')){
	area["hotel.price"]=window.localStorage.getItem('hotelPrice');
}
if(window.localStorage.getItem('hotelAddress')){
	area["hotel.address"]=window.localStorage.getItem('hotelAddress');
}
if(window.localStorage.getItem('time1')){
	area['time1']=window.localStorage.getItem('time1');
}
if(window.localStorage.getItem('time2')){
	area['time2']=window.localStorage.getItem('time2');
}
$.ajax({
	url:WebAppUrl.HOME_APP_URL+"hotel_search.action",
	data:area,
	beforeSend:function(){},
	success:function(data){
		var data=eval("("+data+")");
		if(data.errorCode==200){
			var list=data.hotelPagelist.result,i=0,len=list.length,html=[];
			for(i;i<len;i++){
				html.push('<li><a class="setId" data="'+list[i].id+'" href="detail.html">');
				html.push('<img src="'+WebAppUrl.IMG+list[i].picPath+'" />');
				html.push('<h4>'+list[i].name+'</h4>');
				html.push('<address>'+list[i].address+'|'+list[i].city+'</address>');
				html.push('<i class="icon6">HOT</i>');
				html.push('<div class="list1Top"><strong>'+list[i].price+'</strong><em>￥</em><p>起</p></div>');
				html.push('</a></li>');
			}
			$("#hotelList").html(html.join(''));
			$("#allHotelsNums").html(len);
			// $(".ListContents").each(function(i,v){
			// 	$(v).css({"width":$(v).children("b").length*320});
			// });
			//Div.loading.hide();
		}else{
			//Div.loading.hide();
			//qz.list.lock=false;
			return false;
		}
	}
});
$(".setId").live("click",function(){
	window.localStorage.setItem('hotelId', $(this).attr("data"));
});
$("#sorts2 a").click(function(){
	var sort=$(this).attr('data'),data={
		"hotel.name": window.localStorage.getItem('hotelName'),
		"hotel.address":window.localStorage.getItem('hotelAddress'),
		"hotel.price":window.localStorage.getItem('hotelPrice'),
		"hotel.latitude":window.localStorage.getItem('latitude'),
		"hotel.longitude":window.localStorage.getItem('longitude'),
		"sort":sort
	};
	$.ajax({
		url:WebAppUrl.HOME_APP_URL+"hotel_search.action",
		data:area,
		beforeSend:function(){},
		success:function(data){
			searchDom.bg.hide();
			searchDom.sorts.hide();
			var data=eval("("+data+")");
			if(data.errorCode==200){
				var list=data.hotelPagelist.result,i=0,len=list.length,html=[];
				for(i;i<len;i++){
					html.push('<li><a class="setId" data="'+list[i].id+'" href="detail.html">');
					html.push('<img src="'+WebAppUrl.IMG+list[i].picPath+'" />');
					html.push('<h4>'+list[i].name+'</h4>');
					html.push('<address>'+list[i].address+'|'+list[i].city+'</address>');
					html.push('<i class="icon6">HOT</i>');
					html.push('<div class="list1Top"><strong>'+list[i].price+'</strong><em>￥</em><p>起</p></div>');
					html.push('</a></li>');
				}
				$("#hotelList").html(html.join(''));
				$("#allHotelsNums").html(data.totalResults);
				$(".ListContents").each(function(i,v){
					$(v).css({"width":$(v).children("a").length*320});
				});
			}else{
				return false;
			}
		}
	});
});
