var S = "<";
var S1 = "~k";
var E = ">";
var E1 = "~g";
var LOGIN="LG";
var F = ",";
var F1 = "~d";
var CENTER = "CENTER";
var LEFT = "LEFT";
var TOP = "TOP";

var SIZE = "SIZE";
var READY = "RDY";
var SCROLL = "RLL";
var INFO = "inf";
var LINE = "L";
var OVAL = "O";
var RECT = "R";
var STR = "S";
var POLY = "P";
var FILLRECT = "FR";
var FILLPOLY = "FP";
var COLOR = "C";
var FONT = "F";

var CSL = "CSL";
var ENG = "ENG";
var BALANCE = "BL";
var BLOCK = "BK";
var BROKENlINE = "BLN";
var TEXTCIRCLE = "TC";
var YES = "Y";
var NO = "N";
var PRESSINFO="PINF";

var MOUSE_MOVED = "MM";
var MOUSE_PRESSED = "MP";
var MOUSE_DRAGED = "MD";
var MOUSE_RELEASED = "MR";
var MOUSE_CLICKED = "MC";
var MOUSE_LEFT_CLICKED="LMC";
var FIND_CC = "FC";
var OPEN="open";
var CURRENT="current";
var SELECTTABLE="STAB";
var REFRESH="REF";
var ONLYREAD="READ";
var END="END";
var RUN="RUN";
var TABNS="TABNS";
var M = "ΠΣΥ";
var P = "φψω";
var PD = "@#$";
var ALERT = "alert!QAZ@WSX";
var ERR = "ERR";

//线型
var A="AP";//双竖颜色一致
var B="BP";//方框颜色一致
var D="DP";//圆圈颜色一致
var G="GP";//红圈
var H="HP";//加号+竖线
var I="IP";//虚线
var J="JP";//虚线方框
var K="KP";//蓝圈
var N="NP";//三角
var Q="QP";//箭头
var V="VP";//X号
var T1="T1";//线型附带的文字1
var T2="T2";//线型附带的文字2
var T3="T3";//线型附带的文字3
var T4="T4";//线型附带的文字4
var T5="T5";//线型附带的文字5
var T6="T6";//线型附带的文字5
var T7="T7";//线型附带的文字5
var T8="T8";//线型附带的文字5
var wr;
var VERTICAL="V";//双竖线
var SQUARE="S";//方框
var CIRCLE="C";//圆圈
var PLUS_VERTICAL="PV";//加号和竖线
var TRIANGLE="T";//三角
var ARROWS="A";//箭头
var WRONG="W";//×
var IMAGINARYLINE_SQUARE="IS";//虚线加方框
function splitrp(str){
	var arr = str.split(E);
	arr=arr.map(function(val,index){		
		return val.replace(new RegExp(E1,"g"),E);	
	})
	return arr;
}
function kv(data){
	var kvArr = [];
	var keys = data.substring(0,data.indexOf(E+E)).split(E);
	var values = splitrp(data.substring(data.indexOf(E+E)+2));
	var k;	
	for(var i = 0; i<values.length;i++){
		if(i%keys.length==0){
			k = {};
			kvArr.push(k);
		}
		k[keys[i%keys.length]] = values[i];
	}
	wr=kvArr;
}

//panSet={默认:焦点:标题:遮罩:按钮:按钮中文数组,下拉:选项数组,fn:事件函数}
function showPane(id, paneSet){
	var paneContent = "";
	var isKeyListFilter = false;
	var shade = paneSet["遮罩"]? 0.3 : 0;
	var divId = document.getElementById(id);
	var paneId = document.getElementById(id + "Pane");
	if(!paneId){
	    layer.open({
	    	id: id + "Pane",
	        type: 1,
	        title: paneSet["标题"] || '',
	        area: ['300px', '260px'],
	        moveOut: true,
	        resize: true,
	        btn:(!divId && paneSet["按钮"]) || "",
	        btnAlign: 'c',
	        //btn: paneSet["按钮"],
	        shadeClose: false,
	        shade: shade,
	        cancel: function(index, layero){
	         	$(layero).hide();
		        $("#layui-layer-shade"+index).hide();
	    	  	return false;
	        },
	        content: "",
	        success: function(layero, index){
	           var paneId = document.getElementById(id + "Pane");
	           paneId.style.boxSizing = "border-box";
	           paneId.style.padding = "20px";
	           
	     	   $("#layui-layer-shade"+index).on("click", function(layero, index){
	              $(layero).hide();
	              if(paneSet["遮罩"]) $("#layui-layer-shade"+index).hide();
	           });
	        	    
	    	   if(!divId) {
	    	    	isKeyListFilter  = true;
	    	    	divId = document.createElement("div");
	    	    	divId.id = id;
	    	   /* if(paneSet["按钮"]){
	    	    	$(paneId).parents(".layui-layer").find(".layui-layer-btn a").unbind("click");
	    	    	console.log("ann")
	    	    }*/
	    	    	if(paneSet["按钮"]){
	    	    		$(paneId).parents(".layui-layer").find(".layui-layer-btn").html("");
	    		        for(var i=0; i<paneSet["按钮"].length; i++){
	    		            var button = document.createElement("button");
	    		            button.id = id + "Btn" + i;
	    		            button.innerHTML = paneSet["按钮"][i];
	    		            $(paneId).parents(".layui-layer").find(".layui-layer-btn").append(button);
	    		            if(paneSet["fn"]){
	    		                button.onclick = function(){
	    		                    paneSet["fn"](this.innerHTML);
	    		                }
	    		            }
	    		        }
	    		     }
	    	    	
	    	    	 if(paneSet["下拉"]){
	    	    		var optionStr  = "";
	    		    	var input = document.createElement("input");
	    		        var select = document.createElement("select");
	    		        input.id = id + "Input";
	    		        input.value = paneSet["默认"] || "";
	    		        input.style.padding = "0px 6px";
	    		        select.id = id + "Select"; 
	    		        select.size = 10;
	    		        select.multiple = "multiple";
	    		        select.style.position = "absolute";
	    		        select.style.left = "20px";
	    		        select.style.top = "94px";
	    		        select.style.zIndex = 999;
	    		        select.style.display = "none";
	    		        
	    		        for(var i=0; i<paneSet["下拉"].length; i++){
	    		            optionStr += "<option value='"+ paneSet["下拉"][i] +"'>"+ paneSet["下拉"][i] +"</option>"
	    		        }
	    		        select.innerHTML = optionStr;
	    		        
	    		        input.onclick = function(event) {
	    		        	input.focus();
	    		        	input.select();
	    		        	select.value = this.value;
	    		        	select.style.display = "block";
	    		        }
	    		        
	    		        input.onblur = function(event){
	    		    	   if(!event.relatedTarget || event.relatedTarget.id != id + "Select"){
	    		    		   select.style.display = "none";
	    		    	   }
	    		        }
	
	    		        select.onchange = function(){
	    		        	input.focus();
	    		        	input.select();
	    		        	input.value = this.value;
	    		        	this.style.display = "none";
	    		        }
	    		        divId.appendChild(input);
	    		        document.getElementById("layui-layer"+index).appendChild(select);
	    		    }
	    	    } else {
	    	    	var model = document.getElementById(id);
	    	    	var btns =  model.getElementsByTagName("button");
	    	    	for(var j=0; j<btns.length; j++){
	    	    		if(paneSet["fn"] && !btns[j].onclick){
	    		    		btns[j].onclick = function(){
	    		                paneSet["fn"](this.innerHTML);
	    		            }
	    	    	    }
	    	    	}
	    	    }
	    	    paneId.appendChild(divId);
	    	    divId.style.display = "block";
	    	    if(isKeyListFilter)  keyListFilter(id + "Input", id + "Select");
	    	    
	    	    if(paneSet["焦点"]){
		    	    document.addEventListener( "keyup", function(event){
		    	 	   if(event.keyCode == 13 && $(paneId).parents(".layui-layer").css("display") == "block"){
		    	 		  var focusBtn = document.getElementById(paneSet["焦点"]);
		    	 		  if(focusBtn) focusBtn.click();
		    	 		  $("#layui-layer" + index).hide();
		    	          if(paneSet["遮罩"]) $("#layui-layer-shade"+index).hide();
		    	 	   }
		    		} ,false);
	    	   }
	        }
	    });
	} else {
		 var times = $(paneId).parents(".layui-layer").attr("times");
		 $("#layui-layer" + times).show();
   	   	 if(paneSet["遮罩"]) $("#layui-layer-shade" + times).show();
	}
    return paneSet;
}