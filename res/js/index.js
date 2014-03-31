var qz={},Div={list:$("#list"),loading:$("#loading")},WebAppUrl={
	HOME_APP_URL:'http://112.124.12.51/',
	IMG:"http://112.124.12.51/upload/"
};
qz.list={
	p:0,
	totalPage:1,
	lock:false,
	get:function(){
		if(qz.list.lock){
			return false;
		}
		if(qz.list.p==qz.list.totalPage){
			return false;
		}
		qz.list.lock=true;
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+"hotel_list.action",
			data:{pageNo:qz.list.p,pageSize:10},
			beforeSend:function(){
				Div.loading.show();
			},
			success:function(data){
				var data=eval("("+data+")");
				if(data.errorCode==200){
					var list=data.hotelPagelist.result,i=0,len=list.length,html=[];
		for(i;i<len;i++){
			var picArr=[];
			if(list[i].picPath){picArr.push(list[i].picPath);}
			if(list[i].picPath1){picArr.push(list[i].picPath1);}
			if(list[i].picPath2){picArr.push(list[i].picPath2);}
			if(list[i].picPath3){picArr.push(list[i].picPath3);}
			if(list[i].picPath4){picArr.push(list[i].picPath4);}
			var j=0,jlen=picArr.length;
			html.push('<div class="list1"><a href="detail.html" class="setId" data="'+list[i].id+'">');
			html.push('<div class="list1Contents" ontouchstart="quzhu.ui.touch.touchStart(event)" ontouchmove="quzhu.ui.touch.touchMove(event);" ontouchend="quzhu.ui.touch.touchEnd(\'L'+qz.list.p+'_'+i+'\','+jlen+');">');
			html.push('<div class="ListContents list1Content" id="L'+qz.list.p+'_'+i+'">');
			
			for(j;j<jlen;j++){
				html.push('<b><img src="'+WebAppUrl.IMG+picArr[j]+'" /></b>');
			}
			html.push('</div>');
			html.push('</div></a>');
			html.push('<div class="list1Top"><strong>'+list[i].price+'</strong><em>￥</em><p>起</p></div>');
			html.push('<div class="list1Bottom">');
			html.push('<i class="hot">HOT</i>');
			html.push('<div class="tip">');
			html.push('<p>'+list[i].name+'</p>');
			html.push('<div>'+list[i].address+'|'+list[i].city+'</div>');
			html.push('</div>');
			html.push('<p class="nav" id="L'+qz.list.p+'_'+i+'L'+qz.list.p+'_'+i+'">');
			j=0;
			for(j;j<jlen;j++){
				if(j==0){
					html.push('<a class="on"></a>');
				}else{
					html.push('<a></a>');
				}
			}
			html.push('</p></div>');
			html.push('</div>');
		}
					Div.list.append(html.join(''));
					$(".ListContents").each(function(i,v){
						$(v).css({"width":$(v).children("b").length*100+"%"});
						$(v).find('b').css({"width":100/$(v).children("b").length+"%"});
					});
					Div.loading.hide();
					qz.list.totalPage=Math.ceil(data.totalResults/10);
					qz.list.p++;
					qz.list.lock=false;
				}else{
					Div.loading.hide();
					qz.list.lock=false;
					return false;
				}
			}
		});
	}
};
qz.list.get();
$(".setId").live("click",function(){
	window.localStorage.setItem('hotelId', $(this).attr("data"));
});
$(window).bind("scroll", function() {
	if ($(document).scrollTop() + $(window).height() > $(document).height() - 50) {
		qz.list.get();
	}
});