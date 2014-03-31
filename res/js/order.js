$.ajax({
	url:WebAppUrl.HOME_APP_URL+"hotel_search.action",
	data:{"userId":localStorage.getItem('userId')},
	beforeSend:function(){},
	success:function(data){
		var data=eval("("+data+")");
		if(data.errorCode==200){
			var list=data.hotelPagelist.result,i=0,len=list.length,html=[];
			for(i;i<len;i++){
				html.push('<li><a class="setId" data="'+list[i].id+'" href="order.html">');
				html.push('<img src="'+WebAppUrl.IMG+list[i].picPath+'" />');
				html.push('<h4>'+list[i].name+'</h4>');
				html.push('<address>'+list[i].address+'|'+list[i].city+'</address>');
				html.push('<div class="list1Top"><strong>200</strong><em>￥</em><p>起</p></div>');
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

