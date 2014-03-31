/**
 * @author 鲁文彬
 */
var iniD=new Date(),iniD2=new Date(iniD.getTime()+1000*60*60*24),m={};
quzhu.title.beginTime=iniD.getFullYear()+"-"+(iniD.getMonth()+1)+"-"+iniD.getDate();
quzhu.title.endTime=iniD2.getFullYear()+"-"+(iniD2.getMonth()+1)+"-"+iniD2.getDate();
m.m1=quzhu.util.setMonth(iniD.getMonth()+1);
m.d1=iniD.getDate()<10?"0"+iniD.getDate():iniD.getDate();
m.w1=quzhu.util.setWeek(iniD.getDay());
m.m2=quzhu.util.setMonth(iniD2.getMonth()+1);
m.d2=iniD2.getDate()<10?"0"+iniD2.getDate():iniD2.getDate();
m.w2=quzhu.util.setWeek(iniD2.getDay());
selectDom.setBeginTime.html('<b>'+m.m1+'</b><a data="'+(iniD.getMonth()+1)+'">'+m.d1+'</a><span>'+m.w1+'</span>');
selectDom.setEndTime.html('<b>'+m.m2+'</b><a data="'+(iniD2.getMonth()+1)+'">'+m.d2+'</a><span>'+m.w2+'</span>');
quzhu.title.sumDay();
localStorage.setItem('timeLive',quzhu.title.beginTime);
localStorage.setItem('days',1);

$("#find").click(function(){
	var hotelPrice=$("#priceShow").html(),area=$("#setArea").find(".on").html();
	if(area=="不限"){
		area="";
	}
	window.localStorage.setItem('hotelName', '');
	window.localStorage.setItem('hotelAddress', '');
	window.localStorage.setItem('hotelPrice', '');
	location.href="list.html";
});