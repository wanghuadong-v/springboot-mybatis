//执行js方法
var evalMsg = function (msg) {
        if(msg){
            eval(msg);
        }

}

// 清除input输入框的记忆功能
$("input").attr('autocomplete','off');

// js时间格式化
function dateFormat(fmt,date){
    var o = {
        "M+" : date.getMonth()+1,     // 月份
        "d+" : date.getDate(),     // 日
        "h+" : date.getHours(),     // 小时
        "m+" : date.getMinutes(),     // 分
        "s+" : date.getSeconds(),     // 秒
        "q+" : Math.floor((date.getMonth()+3)/3), // 季度
        "S" : date.getMilliseconds()    // 毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}

// 时间格式化到毫秒
function getNowTime(date) {
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    this.date = date.getDate();
    this.hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    this.minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    this.second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    this.milliSeconds = date.getMilliseconds();
    var currentTime = this.year+'-'+this.month + '-' + this.date + ' ' + this.hour + ':' + this.minute + ':' + this.second + '.' + this.milliSeconds;
    return currentTime;
}

// 校验字符串是否为纯数字
function checknumber(String) {
    var reg = /^[0-9]+.?[0-9]*$/
    if (reg.test(String)) {
        return true
    }
    return false
}


// 获取本机ip
function getUserIP(onNewIP) { // onNewIp - your listener function for new IPs
    // compatibility for firefox and chrome
    var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    var pc = new myPeerConnection({
            iceServers: []
        }),
        noop = function() {},
        localIPs = {},
        ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
        key;

    function iterateIP(ip) {
        if (!localIPs[ip]) onNewIP(ip);
        localIPs[ip] = true;
    }

    // create a bogus data channel
    pc.createDataChannel("");

    // create offer and set local description
    pc.createOffer().then(function(sdp) {
        sdp.sdp.split('\n').forEach(function(line) {
            if (line.indexOf('candidate') < 0) return;
            line.match(ipRegex).forEach(iterateIP);
        });

        pc.setLocalDescription(sdp, noop, noop);
    }).catch(function(reason) {
        // An error occurred, so handle the failure to connect
    });

    // sten for candidate events
    pc.onicecandidate = function(ice) {
        if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
    };
}

// 获取url中的参数
function ups(name, hash) {//getUrlParams
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); // 定义正则表达式
    var r = (!hash? window.location.search : window.location.hash).substr(1).match(reg);
    if (r != null)
        //return unescape(r[2]);
    	return decodeURIComponent(r[2]);
    return "";
}

function initWsByUrl() {
	var lnk = ups('lnk');
	if (lnk>=0) {// 如果需要自己初始化ws
	    initWebsocket(function(){ws.send('RUN<'+lnk,null)});
	}
	return lnk;
}

//回车跳转到下一个元素
function enterNextObj(idList){
	for(var i = 0;i < idList.length; i++){
		$(oId(idList[i])).on("keydown",function(event) {
			if (event.keyCode == 13) {
				var index = idList.indexOf($(this)[0].id);
				if((index+1) == idList.length){
					oId(idList[index]).blur();
					return;
				}
				oId(idList[index+1]).focus();
			}
		});
	}
}

function timeToDate(time){
    var date = new Date();
    var st = date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate()+" "+time+":00";
    st = new Date(Date.parse(st));
    var et = new Date(st);
    et = new Date(et.setHours(st.getHours()+12));
    if(time.length<=2){
        if(date < st){
            st = new Date(st.setHours(st.getHours()-12));
        }else if(date > et){
            st = new Date(st.setHours(st.getHours()+12));
        }
    }else if(time.length > 8){
    	var day = time.substr(0,8);
		hour = time.substr(8,time.length);
		hour = hour.length>2?(hour.substr(0,2)+':'+hour.substr(2,4)):(hour+":00");
		st = new Date(Date.parse(time.substr(0,4)+"/"+time.substr(4,2)+"/"+time.substr(6,2)+" "+hour));	
    }
    return st;
}

//获取完整时间
function fullTime(startTime,hour){
	var date = startTime;
	var date = new Date(Date.parse(startTime));
	if(hour.split(':').length==2){
		hour  = hour + ":00";
	}else if(hour.split(':').length==1){
		hour  = hour + ":00:00";
	}
	if(hour.split(':')[0] < date.getHours()){
		fTime = date.getFullYear()+'/'+(date.getMonth()+1)+'/'+(date.getDate()+1)+' '+hour;
	}else{
		fTime = date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate()+' '+hour;
	}
	return fTime;
}

//input下拉框的选择
function keyListFilter(inputId,listId){		
	$("#"+listId+" option").css("display","block");
	$("#"+inputId).off("oninput");
	
	document.getElementById(inputId).oninput = function(){	
			var inputVal = document.getElementById(inputId).value.toUpperCase();//获取input的value
			var list = [];
			var select = document.getElementById(listId);  
			for (var i = 0; i < select.options.length; i++){  
				var speList = select.options[i].value.spell().match(/[A-Z]*[^A-Z]+/g);
				var curSpell = '';
				speList.forEach(function(val,index){
					curSpell = curSpell + val.substr(0,1);
				})
				var iStr = curSpell.toUpperCase().substr(0,inputVal.length);
				if(iStr != inputVal){
					select.options[i].setAttribute("style","display:none;");
				}else{
					select.options[i].setAttribute("style","display:block;");
				}
			}  
	}
	
	$("#"+inputId).on('keydown',function(event){
			if(event.keyCode == 13){
				for(var i = 0;i<$("#"+listId).find("option").length; i++){
					if($("#"+listId).children("option")[i].style.display == "block"){
						$("#"+inputId).val($("#"+listId).children("option")[i].innerHTML);
						return;
					}
				}	
			}
	})
}

function initPlus(callback) {
	var plus = ups('plus');
	if (plus) {
		var iframe = document.createElement('iframe');
		iframe.id = 'plus';
		iframe.style.display = 'none';
		iframe.src = './plus/'+getFileNameByUrl()+'_' + plus + '.html';
		document.body.appendChild(iframe);
		iframe.onload = function() {
			var plusHtml = iframe.contentWindow.$('body > *:not(script)');
			var plusScript = iframe.contentWindow.$("script:not(script[src])");
			$("body").append(plusHtml);
			window.eval(plusScript[0].innerHTML);
			callback();
		};
	}else{
		callback();
	}
}

function getFileNameByUrl() {
	var urlArr=window.location.href.split('?');
	var appU = urlArr[0].split('/');
	var fileName = appU[appU.length - 1];
	var name=fileName.split('.');
	return name[0];
}

function initParas(dwm, job) {
	var paras = {};
	if(job && dwm){
		var sql = "select para_name, para_value from czd_parameter where tab_num = '-1' and dwm='"+ dwm +"' and job='" + job + "'";
		ws.doSql(sql,function(data){
			var wsr = splitrp(data);
			for(var i = 0;i<wsr.length;i++){
				if(i % 2 == 0){
					if(!wsr[i])return;
					var key = wsr[i];
					if(!wsr[i+1])return;
					var value = wsr[i+1];
					paras[key] = value;
				}
			}
		})
		/*ws.send("actor" + M + "doSql" + M  + sql, function(data) {
			if(!data) return;
			var arr = data.split('>')
			for(var i = 0;i<arr.length;i++){
				if(i % 2 == 0){
					if(!arr[i])return;
					var key = arr[i];
					if(!arr[i+1])return;
					var value = arr[i+1].replace(/~g/g,">");
					paras[key] = value;
				}
			}
		});*/
	}
	return  paras;
}

//初始化菜单
function initMenu(id, menuId) {
	$(oId(id)).contents().bind("contextmenu", function(event) {
		var e = event || window.event;
		e.preventDefault();
		var targetEl = e.target || e.srcElement;
		var x= e.clientX + oId(id).offsetLeft;
		var y= e.clientY + oId(id).offsetTop;
		if($(targetEl).parents('tr').length>0) {
			showMenu(id, menuId, x, y);
			disItemOfMenu(id,menuId,e);
		}
	});
}

//禁用菜单
function disItemOfMenu(id,menuId, e) {

}

function showMenu(id,menuId, x, y) {
	$(oId(menuId)).css("left", x + 'px');
	$(oId(menuId)).css("top", y + 'px');
	$(oId(menuId)).show();
	$(oId(menuId)).focus();
	$(oId(menuId)).attr("data-id", id);
	
	// ///初始化菜单事件////////////////
	if ($($(oId(menuId))).attr('init') == 1) {
		return;
	}
	$(oId(menuId)).attr('init', 1);
	$(oId(menuId)).find('li').bind('click', function() {
		var disable = $(this).attr("disable");
		var execFun = $(this).attr("id");
		var dataId = $(oId(menuId)).attr("data-id");
		if (disable) return;
		if(execFun) eval(execFun+'(dataId)');
		$(oId(menuId)).hide();
	});

	$(oId(menuId)).bind("blur", function() {
		$(this).hide();
	});
}

function oId(id){
	if(document.getElementById(id)){
		return document.getElementById(id);
	} else {
		return parent.document.getElementById(id);
	}
}