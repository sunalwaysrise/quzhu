var countDown={
	t:60,
	init:function(){
		if(this.t>1){
			this.t--;
			$("#count").html(this.t);
			setTimeout("countDown.init()",1000);
		}else{
			$("#resendVeri").html('<span onclick="countDown.restart();">重新发送</span>');
		}
	},
	restart:function(){
		this.t=60;
		$("#resendVeri").html('<span id="count">'+this.t+"</span>秒后重发");
		this.init();
	}
};
quzhu.user={
	set:function(){
		$("#IndexsetArea").show();
		$("#myName").show();
		$("#myName2").show();
		$("#unlogin").hide();
		$("#unlogin2").hide();
		$("#closeSet").show();
		$("#curTime").addClass("setTop");
		$("#quzhuIndex2").css({"width":1024});
		$("#quZhuIndex").addClass('quZhuIndexOn');
	},
	set2:function(){
		$("#IndexsetArea").show();
		$("#myName").hide();
		$("#myName2").hide();
		$("#unlogin").show();
		$("#unlogin2").show();
		$("#closeSet").show();
		$("#curTime").addClass("setTop");
		$("#quzhuIndex2").css({"width":1024});
		$("#quZhuIndex").addClass('quZhuIndexOn');
	},
	setName:function(n){
		var s=localStorage.getItem('score');
		if(!s){s=0;}
		$("#myName a").html(localStorage.getItem('mobile'));
		$("#myScore").html(s);
	},
	closeSet:function(){
		$("#IndexsetArea").hide();$("#closeSet").hide();
		$("#curTime").removeClass("setTop");
		$("#quzhuIndex2").css({"width":''});
		$("#quZhuIndex").removeClass('quZhuIndexOn');
	},
	signOut:function(){
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+"user_loginOut.action",
			success:function(){
				quzhu.user.closeSet();
			},
			error:function(){
				quzhu.user.closeSet();
			}
		});
	},
	status:function(fn){
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+"user_status.action",
			success:function(data){
				var data=eval("("+data+")");
				if(data.status==1){
					localStorage.setItem('userId',data.user.id);
					localStorage.setItem('name',data.user.name);
					localStorage.setItem('mobile',data.user.mobile);
					localStorage.setItem('score',data.user.score);
					fn();
				}else{
					quzhu.user.set2();
				}
			}
		});
	},
	signInBox:function(){
		var html=[];
		html.push('<h2>登录</h2>');
		html.push('<div class="content">');
		html.push('<input class="input0 input1" type="text" id="moblie" placeholder="手机号码" />');
		html.push('<input class="input0 input2" type="password" id="password" placeholder="密码" />');
		html.push('<a class="btn0 btn1 mt8" onclick="quzhu.user.signIn()">登录</a>');
		html.push('<p><span onclick="quzhu.dialog.close();quzhu.user.findPasswordBox();">忘记密码？&gt;</span>');
		html.push('<span class="fr" onclick="quzhu.dialog.close();quzhu.user.signUpBox();">注册？&gt;</span></p>');
		html.push('</div>');
		quzhu.dialog.open(html.join(''),{height:"200px"});
	},
	signIn:function(){
		var data={
			"user.userName":$("#moblie").val(),
			"user.password":$("#password").val()
		};
		if(!data['user.userName'] || !data['user.password']){return quzhu.ui.alert("信息不能为空");}
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+"quzhu/user_login.action",
			data:data,
			success:function(data){
				var data=eval("("+data+")");
				if(data.errorCode==200){
					quzhu.ui.alert(data.errorMsg);
					try{
						localStorage.setItem('userId',data.user.id);
						localStorage.setItem('name',data.user.name);
						localStorage.setItem('mobile',data.user.mobile);
						localStorage.setItem('score',data.user.score);
					}catch(e){}
					
					quzhu.user.closeSet();
					
					setTimeout('quzhu.dialog.close()',1000);
				}else{
					quzhu.ui.alert(data.errorMsg);
				}
			}
		});
	},
	signUpBox:function(){
		var html=[];
		html.push('<h2>快速注册</h2>');
		html.push('<div class="content">');
		html.push('<input class="input0 input1" type="text" id="moblie" placeholder="请输入11位手机号码" />');
		html.push('<a class="btn0 btn1 mt45" onclick="quzhu.dialog.close();quzhu.user.signUpBox2()">下一步</a>');
		html.push('<p><span>初始密码将短信发送到您的手机上</span></p>');
		html.push('</div>');
		quzhu.dialog.open(html.join(''),{height:"200px"});
	},
	signUpBox2:function(){
		var moblie=$("#moblie").val();
		var html=[];
		//发送接口//
		html.push('<h2>快速注册</h2>');
		html.push('<div class="content">');
		html.push('<input class="input0 input3" type="text" id="password" placeholder="请输入密码" /><a class="input4" id="resendVeri"><span id="count">60</span>秒后重发</a>');
		html.push('<input type="hidden" id="moblie" value="'+moblie+'"/><a class="btn0 btn1 mt45" onclick="quzhu.user.signUp();">确认输入</a>');
		html.push('<p><span>接受密码的手机号码为'+moblie+'</span></p>');
		html.push('</div>');
		quzhu.dialog.open(html.join(''),{height:"200px"});
		countDown.t=60;
		setTimeout('countDown.init()',1000);
	},
	signUp:function(){
		var data={
			"user.mobile":$("#moblie").val(),
			"user.password":$("#password").val()
		};
		if(!data['user.mobile'] || !data['user.password']){return quzhu.ui.alert("信息不能为空");}
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+"quzhu/user_save.action",
			data:data,
			success:function(data){
				var data=eval("("+data+")");
				if(data.errorCode==200){
					quzhu.ui.alert(data.errorMsg);
					setTimeout('quzhu.dialog.close();quzhu.dialog.signInBox();',1000);
					$("#moblie").html(num);
				}else{
					quzhu.ui.alert(data.errorMsg);
				}
			}
		});
	},
	findPasswordBox:function(){
		var html=[];
		html.push('<h2>找回密码</h2>');
		html.push('<div class="content">');
		html.push('<input class="input0 input1" type="text" id="moblie" placeholder="请输入11位手机号码" />');
		html.push('<a class="btn0 btn1 mt45" onclick="quzhu.dialog.close();quzhu.user.findPasswordBox2()">下一步</a>');
		html.push('<p><span>请输入您注册使用的手机号码</span></p>');
		html.push('</div>');
		quzhu.dialog.open(html.join(''),{height:"200px"});
	},
	findPasswordBox2:function(){
		var moblie=$("#moblie").val();
		var html=[];
		html.push('<h2>找回密码</h2>');
		html.push('<div class="content">');
		html.push('<input class="input0 input3" type="text" id="password" placeholder="请输入密码" /><a class="input4"><span id="count">60</span>秒后重发</a>');
		html.push('<input type="hidden" id="moblie" value="'+moblie+'"/><a class="btn0 btn1 mt45" onclick="quzhu.dialog.close();quzhu.user.findPassword()">确认输入</a>');
		html.push('<p><span>接受密码的手机号码为'+moblie+'</span></p>');
		html.push('</div>');
		quzhu.dialog.open(html.join(''),{height:"200px"});
	},
	findPassword:function(){
		
	},
	editMoreBox:function(){
		var html=[],v=localStorage.getItem('name');
		if(!v){
			v="";
		}
		html.push('<h2>更多信息</h2>');
		html.push('<div class="content">');
		html.push('<input class="input0 input1" type="text" value="'+v+'" id="username" placeholder="您的姓名" />');
		html.push('<div>输入默认使用的姓名以方便您填写订单</div>');
		html.push('<a class="btn0 btn2 mt8" onclick="quzhu.user.editMore()">确认</a>');
		html.push('<a class="btn0 btn3 mt8" onclick="quzhu.dialog.close();quzhu.user.changePasswordBox()">修改密码</a>');
		html.push('<p><span>请输入您注册使用的手机号码</span></p>');
		html.push('</div>');
		quzhu.dialog.open(html.join(''),{height:"200px"});
	},
	editMore:function(){
		var v=$("#username").val().trim(),data={
			"user.name":v
		};
		if(!v){return false;}
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+"user_update.action",
			data:data,
			success:function(data){
				var data=eval("("+data+")");
				if(data.errorCode==200){
					quzhu.ui.alert(data.errorMsg);
					localStorage.setItem('name',v);
				}else{
					quzhu.ui.alert(data.errorMsg);
				}
			}
		});
	},
	changePasswordBox:function(){
		var html=[];
		html.push('<h2>修改密码</h2>');
		html.push('<div class="content">');
		html.push('<input class="input0 input1" type="password" id="password" placeholder="旧密码" />');
		html.push('<input class="input0 input40" type="password" id="password2" placeholder="新密码" />');
		html.push('<input class="input0 input2" type="password" id="password3" placeholder="重复新密码" />');
		html.push('<a class="btn0 btn2 mt8" onclick="quzhu.user.changePassword()">确认修改</a>');
		html.push('<p><span>请输入您注册使用的手机号码</span></p>');
		html.push('</div>');
		quzhu.dialog.open(html.join(''),{height:"240px"});
	},
	changePassword:function(){
		var oldPassword=$("#password").val().trim(),
			newPassword=$("#password2").val().trim(),
			newPassword2=$("#password3").val().trim(),
			data={
				oldPassword:oldPassword,
				newPassword:newPassword
			};
		if(!oldPassword || !newPassword || !newPassword2){
			return quzhu.ui.alert("必填信息不能为空");
		}
		if(newPassword!=newPassword2){
			return quzhu.ui.alert("两次密码不一致");
		}
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+"user_updatePassword.action",
			data:data,
			success:function(data){
				var data=eval("("+data+")");
				if(data.errorCode==200){
					quzhu.ui.alert(data.errorMsg);
				}else{
					quzhu.ui.alert(data.errorMsg);
				}
			}
		});
	}
};
quzhu.dialog={
	setPosition:function(_obj){
		var t = document.documentElement.scrollTop || document.body.scrollTop,
			viewHeight = $(window).height(), viewWidth = $(window).width(), _objHeight = _obj.height(), _objWidth = _obj.width(),
			dialogTop = (viewHeight / 2) - (_objHeight / 2) + t,
			dialogLeft = (viewWidth  - _objWidth) / 2-10;
		_obj.css({top : dialogTop,left : dialogLeft});
	},
	open:function(o,css){
		if($("#DBox").length==0){
      		$("body").append('<div id="DBox"><a class="closeDialog" onclick="quzhu.dialog.close();"></a>'+o+'</div>');
    	}else{
			$("#DBox").html('<a class="closeDialog" onclick="quzhu.dialog.close();"></a>'+o);
		}
    	$("#DBox").css({height:css.height}).show();
    	this.locked=true;
    	this.lock();
    	this.setPosition($("#DBox"));
    	$(window).on("orientationchange",function(){
    		if(quzhu.dialog.locked){
    			quzhu.dialog.setPosition($("#DBox"));
    		}
    	});
	},
	locked:false,
	lock:function(){
		if($("#LockedBg").length==0){
		  	$("body").append('<div id="LockedBg"></div>');
		}
		$("#LockedBg").show();
	},
	close:function(){
		this.locked=false;
		$("#LockedBg").hide();
    	$("#DBox").hide();
	}
};
//quzhu.user.status();
$("#MyOrder").click(function(){
	quzhu.user.status(function(){
		location.href="myOrder.html";
	});
});
$("#setBtn").click(function(){
	quzhu.user.status(function(){
		quzhu.user.set();
		quzhu.user.setName();
	});
});
$("#closeSet").click(function(){
	quzhu.user.closeSet();
});
