$.ajax({
	url:WebAppUrl.HOME_APP_URL+"order_list.action",
	data:{"userId":localStorage.getItem('userId')},
	beforeSend:function(){},
	success:function(data){
		var data=eval("("+data+")");
		if(data.errorCode==200){
			var list=data.roomList,i=0,len=list.length,html=[];
			for(i;i<len;i++){
				html.push('<li><a class="setId" data="'+list[i].id+'" >');
				html.push('<img src="'+WebAppUrl.IMG+list[i].picPath+'" />');
				html.push('<h4>'+list[i].hotelName+'</h4>');
				html.push('<address>'+list[i].address+'|'+list[i].city+'</address>');
				html.push('<div class="list2Top">￥'+list[i].price+'</div>');
				html.push('<div class="list8Top">入住:'+list[i].timeLive.month+'月'+list[i].timeLive.date+'日</div>');
				//if(list[i].checkOut){
				html.push('<div class="list9Top">退房:'+list[i].checkOut.month+'月'+list[i].checkOut.date+'日</div>');	
				//}
				html.push('</a></li>');
			}
			$("#hotelList").html(html.join(''));
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

