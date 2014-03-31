$("#search").click(function(){
	var hotelPrice=$("#priceShow").html(),area=$("#setArea").find(".on").html();
	if(area=="不限"){
		area="";
	}
	window.localStorage.setItem('hotelName', $("#input").val());
	window.localStorage.setItem('hotelAddress', area);
	window.localStorage.setItem('hotelPrice', hotelPrice.substring(1,hotelPrice.length));
	location.href="list.html";
});