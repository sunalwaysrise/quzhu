quzhu.util={
	setMonth:function(i){
		var m="";
		i=Number(i);
		switch(i){
			case 1:
			m="一";
			break;
			case 2:
			m="二";
			break;
			case 3:
			m="三";
			break;
			case 4:
			m="四";
			break;
			case 5:
			m="五";
			break;
			case 6:
			m="六";
			break;
			case 7:
			m="七";
			break;
			case 8:
			m="八";
			break;
			case 9:
			m="九";
			break;
			case 10:
			m="十";
			break;
			case 11:
			m="十一";
			break;
			case 12:
			m="十二";
			break;
		}
		return m+"月";
	},
	setWeek:function(i){
		var m="";
		switch(i){
			case 1:
			m="一";
			break;
			case 2:
			m="二";
			break;
			case 3:
			m="三";
			break;
			case 4:
			m="四";
			break;
			case 5:
			m="五";
			break;
			case 6:
			m="六";
			break;
			case 7:
			m="七";
			break;
			case 0:
			m="日";
		}
		return "周"+m;
	}
};
quzhu.setPrice={
	price:124,
	step:3,
	set:function(i){
		this.price=124+i*this.step;
	}
};
quzhu.search={
	price:quzhu.setPrice.price,
	area:""
};