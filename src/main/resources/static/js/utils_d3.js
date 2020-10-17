/* 
 * MAP对象，实现MAP功能 
 * 
 * 接口： 
 * size() 获取MAP元素个数 
 * isEmpty() 判断MAP是否为空 
 * clear() 删除MAP所有元素 
 * put(key, value) 向MAP中增加元素（key, value) 
 * remove(key) 删除指定KEY的元素，成功返回True，失败返回False 
 * get(key) 获取指定KEY的元素值VALUE，失败返回NULL 
 * element(index) 获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL 
 * containsKey(key) 判断MAP中是否含有指定KEY的元素 
 * containsValue(value) 判断MAP中是否含有指定VALUE的元素 
 * values() 获取MAP中所有VALUE的数组（ARRAY） 
 * keys() 获取MAP中所有KEY的数组（ARRAY） 
 * 
 * 例子： 
 * var map = new Map(); 
 * 
 * map.put("key", "value"); 
 * var val = map.get("key") 
 * …… 
 */


var tBoxSumWidth=0;//线上文字的总长度
function Map() {
	this.elements = new Array();

	// 获取MAP元素个数
	this.size = function() {
		return this.elements.length;
	};

	// 判断MAP是否为空
	this.isEmpty = function() {
		return (this.elements.length < 1);
	};

	// 删除MAP所有元素
	this.clear = function() {
		this.elements = new Array();
	};

	// 向MAP中增加元素（key, value)
	this.put = function(_key, _value) {

		// 判断map中是否存在
		var flag = this.containsKey(_key);
		if (flag) {
			for (i = 0; i < this.elements.length; i++) {
				if (this.elements[i].key == _key) {
					this.elements.splice(i, 1, {
						key : _key,
						value : _value
					});
				}
			}
		} else {
			this.elements.push({
				key : _key,
				value : _value
			});
		}

	};

	// 删除指定KEY的元素，成功返回True，失败返回False
	this.removeByKey = function(_key) {
		var bln = false;
		try {
			for (i = 0; i < this.elements.length; i++) {
				if (this.elements[i].key == _key) {
					this.elements.splice(i, 1);
					return true;
				}
			}
		} catch (e) {
			bln = false;
		}
		return bln;
	};

	// 删除指定VALUE的元素，成功返回True，失败返回False
	this.removeByValue = function(_value) {// removeByValueAndKey
		var bln = false;
		try {
			for (i = 0; i < this.elements.length; i++) {
				if (this.elements[i].value == _value) {
					this.elements.splice(i, 1);
					return true;
				}
			}
		} catch (e) {
			bln = false;
		}
		return bln;
	};

	// 删除指定VALUE的元素，成功返回True，失败返回False
	this.removeByValueAndKey = function(_key, _value) {
		var bln = false;
		try {
			for (i = 0; i < this.elements.length; i++) {
				if (this.elements[i].value == _value
						&& this.elements[i].key == _key) {
					this.elements.splice(i, 1);
					return true;
				}
			}
		} catch (e) {
			bln = false;
		}
		return bln;
	};

	// 获取指定KEY的元素值VALUE，失败返回NULL
	this.get = function(_key) {
		try {
			for (i = 0; i < this.elements.length; i++) {
				if (this.elements[i].key == _key) {
					return this.elements[i].value;
				}
			}
		} catch (e) {
			return false;
		}
		return false;
	};

	// 获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL
	this.element = function(_index) {
		if (_index < 0 || _index >= this.elements.length) {
			return null;
		}
		return this.elements[_index];
	};

	// 判断MAP中是否含有指定KEY的元素
	this.containsKey = function(_key) {
		var bln = false;
		try {
			for (i = 0; i < this.elements.length; i++) {
				if (this.elements[i].key == _key) {
					bln = true;
				}
			}
		} catch (e) {
			bln = false;
		}
		return bln;
	};

	// 判断MAP中是否含有指定VALUE的元素
	this.containsValue = function(_value) {
		var bln = false;
		try {
			for (i = 0; i < this.elements.length; i++) {
				if (this.elements[i].value == _value) {
					bln = true;
				}
			}
		} catch (e) {
			bln = false;
		}
		return bln;
	};

	// 判断MAP中是否含有指定VALUE的元素
	this.containsObj = function(_key, _value) {
		var bln = false;
		try {
			for (i = 0; i < this.elements.length; i++) {
				if (this.elements[i].value == _value
						&& this.elements[i].key == _key) {
					bln = true;
				}
			}
		} catch (e) {
			bln = false;
		}
		return bln;
	};

	// 获取MAP中所有VALUE的数组（ARRAY）
	this.values = function() {
		var arr = new Array();
		for (i = 0; i < this.elements.length; i++) {
			arr.push(this.elements[i].value);
		}
		return arr;
	};

	// 获取MAP中所有VALUE的数组（ARRAY）
	this.valuesByKey = function(_key) {
		var arr = new Array();
		for (i = 0; i < this.elements.length; i++) {
			if (this.elements[i].key == _key) {
				arr.push(this.elements[i].value);
			}
		}
		return arr;
	};

	// 获取MAP中所有KEY的数组（ARRAY）
	this.keys = function() {
		var arr = new Array();
		for (i = 0; i < this.elements.length; i++) {
			arr.push(this.elements[i].key);
		}
		return arr;
	};

	// 获取key通过value
	this.keysByValue = function(_value) {
		var arr = new Array();
		for (i = 0; i < this.elements.length; i++) {
			if (_value == this.elements[i].value) {
				arr.push(this.elements[i].key);
			}
		}
		return arr;
	};

	// 获取MAP中所有KEY的数组（ARRAY）
	this.keysRemoveDuplicate = function() {
		var arr = new Array();
		for (i = 0; i < this.elements.length; i++) {
			var flag = true;
			for (var j = 0; j < arr.length; j++) {
				if (arr[j] == this.elements[i].key) {
					flag = false;
					break;
				}
			}
			if (flag) {
				arr.push(this.elements[i].key);
			}
		}
		return arr;
	};
}

/**
 * 清除对应的图层，然后将对应的图层重新绘制
 * 
 * @param msg
 */
var cleanLayer = function(msg, topGroup_0, topGroup_1, leftGroup_0,
		leftGroup_1, centerGroup_0, centerGroup_1, centerGroup_2,
		centerGroup_3, centerGroup_4, centerGroup_5, centerGroup_6,
		centerGroup_7, centerGroup_8) {
	// 清除上面的层
	if (msg.indexOf("<TOP,0>") != -1) {
		$(topGroup_0).empty();
	}
	if (msg.indexOf("<TOP,1>") != -1) {
		$(topGroup_1).empty();
	}
	// 清除左边的层
	if (msg.indexOf("<LEFT,0>") != -1) {
		$(leftGroup_0).empty();
	}
	if (msg.indexOf("<LEFT,1>") != -1) {
		$(leftGroup_1).empty();
	}
	// 清除中间的层
	if (msg.indexOf("<CENTER,0>") != -1) {
		$(centerGroup_0).empty();
	}
	if (msg.indexOf("<CENTER,1>") != -1) {
		$(centerGroup_1).empty();
	}
	if (msg.indexOf("<CENTER,2>") != -1) {
		$(centerGroup_2).empty();
	}
	if (msg.indexOf("<CENTER,3>") != -1) {
		$(centerGroup_3).empty();
	}
	if (msg.indexOf("<CENTER,4>") != -1) {
		$(centerGroup_4).empty();
	}
	if (msg.indexOf("<CENTER,5>") != -1) {
		$(centerGroup_5).empty();
	}
	if (msg.indexOf("<CENTER,6>") != -1) {
		$(centerGroup_6).empty();
	}
	if (msg.indexOf("<CENTER,7>") != -1) {
		$(centerGroup_7).empty();
	}
	if (msg.indexOf("<CENTER,8>") != -1) {
		$(centerGroup_8).empty();
	}
}

/**
 * 选择当前对应的图层
 * 
 * @param sp
 *            分隔之后的数组
 * @param currentGroup
 *            对应图层的指针
 */
var chooseCurrentLayer = function(sp, currentGroup, topGroup_0, topGroup_1,
		leftGroup_0, leftGroup_1, centerGroup_0, centerGroup_1, centerGroup_2,
		centerGroup_3, centerGroup_4, centerGroup_5, centerGroup_6,
		centerGroup_7, centerGroup_8) {
	if ("TOP" == sp[0]) {
		if ("0" == sp[1]) {
			currentGroup = topGroup_0;
		}
		if ("1" == sp[1]) {
			currentGroup = topGroup_1;
		}
	}
	if ("LEFT" == sp[0]) {
		if ("0" == sp[1]) {
			currentGroup = leftGroup_0;
		}
		if ("1" == sp[1]) {
			currentGroup = leftGroup_1;
		}
	}
	if ("CENTER" == sp[0]) {
		if ("0" == sp[1]) {
			currentGroup = centerGroup_0;
		}
		if ("1" == sp[1]) {
			currentGroup = centerGroup_1;
		}
		if ("2" == sp[1]) {
			currentGroup = centerGroup_2;
		}
		if ("3" == sp[1]) {
			currentGroup = centerGroup_3;
		}
		if ("4" == sp[1]) {
			currentGroup = centerGroup_4;
		}
		if ("5" == sp[1]) {
			currentGroup = centerGroup_5;
		}
		if ("6" == sp[1]) {
			currentGroup = centerGroup_6;
		}
		if ("7" == sp[1]) {
			currentGroup = centerGroup_7;
		}
		if ("8" == sp[1]) {
			currentGroup = centerGroup_8;
		}
	}

	return currentGroup;
}

// 绘图的方法
/** ctx表示用的那个画布 a 表示< 之前的值，b< 之后的括号里面的值 */
// b 的 值 CENTER,0 6551,2983,121,21
// a 的值 Size ,RDY, c

var draw = function(layer, a, b, styleMap,fontMap) {
	if (b == undefined) {
		return;
	}

	// 将需要拆解的 <> 内外的值进行处理
	var ss = b.split(",");

	// 处理颜色问题
	if (a == COLOR) {
		styleMap.put("color", ss);
	}
	// 处理矩形 和填充矩形问题
	if (a == RECT || a == FILLRECT) {

		var colorArray = styleMap.get("color");
		var color = "rgb(" + colorArray[0] + "," + colorArray[1] + ","
				+ colorArray[2] + ")";
		if(ss[2]<0){
			ss[2]=-ss[2];
			ss[0]=ss[0]-ss[2];
		}

		var svg = d3.select(layer)
					.append("rect")
					.attr("x", ss[0])
					.attr("y", ss[1])
					.attr("width", ss[2])
					.attr("height", ss[3])
					.attr("stroke-opacity",1);
		// 如果是画矩形
		if (a == RECT) {
			svg.attr("style","fill:none;stroke-width:0.5;stroke:"+ color);
		}
		// 如果是填充矩形
		else if (a == FILLRECT) {
			svg.attr("style", "stroke-width:1;fill:" + color);
		}
		
	}

	// 处理文本字体问题
	else if (a == FONT) {//F<Dialog,0,12>   字体   粗细    大小
		fontMap.put("font", ss);
	}
	// 处理文本 文字问题
	else if (a == STR) {   //S<4,6352,16>  字符串    x   y

		// x="25" y="25" font-size="16" style="fill:rgb(0,0,0);
		// 配置颜色
		var colorArray = styleMap.get("color");
		var fontArray = fontMap.get("font");
		var color = "rgb(" + colorArray[0] + "," + colorArray[1] + ","
				+ colorArray[2] + ")";
		var fontweight;
		if(fontArray[1]==0){
			fontweight=400;
		}else if(fontArray[1]==1){
			fontweight=700;
		}
		 d3.select(layer)
					.append("text")
					.text(ss[0])   // 设置文本内容
					.attr("x", ss[1])
					.attr("y", ss[2])
					.attr("font-size", fontArray[2])
					.attr("style", "fill:" + color)
					.attr("font-family",fontArray[0])
					.attr("font-weight",fontweight);
	}

	// 处理圆的问题
	else if (a == OVAL) {
		// 配置颜色
		var colorArray = styleMap.get("color");
		var color = "rgb(" + colorArray[0] + "," + colorArray[1] + ","
				+ colorArray[2] + ")";

		// 计算坐标
		var x = parseFloat(ss[0]) + parseFloat(ss[2]) / 2;
		var y = parseFloat(ss[1]) + parseFloat(ss[3]) / 2;
		var r = parseFloat(ss[3]) / 2;

		// 画圆
		 d3.select(layer)
					.append("circle")
					.attr("cx", x)
					.attr("cy", y)
					.attr("r", r)
					.attr("stroke-opacity",1)
					.attr("style", "fill:none;stroke-width:1;stroke:"+ color);
					
	}

	// 处理直线的问题
	else if (a == LINE) {

		var colorArray = styleMap.get("color");
		var color = "rgb(" + colorArray[0] + "," + colorArray[1] + ","
				+ colorArray[2] + ")";
		
		 d3.select(layer)
					.append("line")
					.attr("x1", ss[0])
					.attr("y1", ss[1])
					.attr("x2", ss[2])
					.attr("y2", ss[3])
					.attr("stroke-opacity",1)
					.attr("style", "stroke-width:0.5;stroke:" + color);
		
	}
	//记录列车类型
	/*else if(a==A || a==B || a==D  || a==H || a==I  || a==K || a==N || a==Q || a==T || a==U){
        trainNumColorMap.put( "color",styleMap.get("color"));
        trainTypeMap.put("type",a);
    }*/
	// 处理多边形 和，多边曲线问题
	else if (a == POLY || a == FILLPOLY) {

		// 获得一共有几个点    171,171,170,20 -*-7,2
		var pointCount = parseInt(ss[ss.length - 1]);//2

		var is = new Array((ss.length - 1) / 2);
		var is2 = new Array(is.length);
		for (var i = 0; i < is.length; i++) {
			is[i] = parseFloat(ss[i]);//is=[171,171]
		}

		for (var i = 0; i < is2.length; i++) {
			is2[i] = parseFloat(ss[i + is.length]);//is2=[170,207]
		}

		// 这后面可以使用 动态的 points点的集合来进行计算
		 var point = new Array();//[171,170]

		for(var i = 0;i < pointCount * 2;i=i+2){
			point[i] = is[i/2];
			point[i+1] = is2[i/2];
		}

//    	console.log(point);
		var colorArray = styleMap.get("color");
		var color = "rgb(" + colorArray[0] + "," + colorArray[1] + ","
				+ colorArray[2] + ")";

		var svg ;
		// P 表示的line
		if (a == POLY) {
            polyMap.put("lastP",point);
                svg = d3.select(layer)
                    .append("polyline")
                    .attr("stroke-opacity",1)
                    .attr("style", "fill:none;stroke-width:0.5;stroke:"+ color);
			polyMap.put("lastPoly",svg);
		}
		else if (a == FILLPOLY) {
			svg = d3.select(layer)
					.append("polygon")
					.attr("stroke-opacity",1)
					.attr("style", "stroke-width:0.5;fill:" + color);
		}
		svg.attr("points", point);

	}else if(a==A || a==B || a==D  || a==H  || a==J || a==G|| a==K || a==N ||  a==V ||a==Q){


        var pointCount = parseInt(ss[ss.length - 1]);//2
        var is = new Array((ss.length - 1) / 2);
        var is2 = new Array(is.length);
        for (var i = 0; i < is.length; i++) {
            is[i] = parseFloat(ss[i]);//is=[171,171]
        }
        for (var i = 0; i < is2.length; i++) {
            is2[i] = parseFloat(ss[i + is.length]);//is2=[170,207]
        }
        point = new Array();//[171,170]
        for(var i = 0;i < pointCount * 2;i=i+2){
            point[i] = is[i/2];
            point[i+1] = is2[i/2];
        }
        var colorArray = styleMap.get("color");
        var color = "rgb(" + colorArray[0] + "," + colorArray[1] + "," + colorArray[2] + ")";
        var thirdPoint=getThirdPoint(point);//两个三分点的坐标也就是方框的中心坐标。
        var length=Math.sqrt( (thirdPoint[0]-point[0])*(thirdPoint[0]-point[0])+ (thirdPoint[1]-point[1])* (thirdPoint[1]-point[1]));

       if(a!=J){

           svg = d3.select(layer)
               .append("polyline")
               .attr("stroke-opacity",1)
               .attr("style", "fill:none;stroke-width:0.5;stroke:"+ color)
               .attr("stroke-dasharray",""+(length-10)+",20,"+(length-20)+",20,"+(length-10)+",20");
           svg.attr("points", point);
           polyMap.put("lastPoly",svg);
           polyMap.put("lastP",point);
       }

    }else if(a==I){

        var pointCount = parseInt(ss[ss.length - 1]);//2
        var is = new Array((ss.length - 1) / 2);
        var is2 = new Array(is.length);
        for (var i = 0; i < is.length; i++) {
            is[i] = parseFloat(ss[i]);//is=[171,171]
        }
        for (var i = 0; i < is2.length; i++) {
            is2[i] = parseFloat(ss[i + is.length]);//is2=[170,207]
        }
        var point = new Array();//[171,170]
        for(var i = 0;i < pointCount * 2;i=i+2){
            point[i] = is[i/2];
            point[i+1] = is2[i/2];
        }
        var colorArray = styleMap.get("color");
        var color = "rgb(" + colorArray[0] + "," + colorArray[1] + "," + colorArray[2] + ")";
        svg = d3.select(layer)
            .append("polyline")
            .attr("stroke-opacity",1)
            .attr("style", "fill:none;stroke-width:0.5;stroke:"+ color)
            .attr("stroke-dasharray","5,3");
        svg.attr("points", point);

        polyMap.put("lastPoly",svg);
        polyMap.put("lastP",point);
}


	//画标志
	 if(a==A){//双竖线颜色一致
        drawTrainType(VERTICAL,color,layer,point);
	}else if(a==B){//方框颜色一致
      drawTrainType(SQUARE,color,layer,point);
    }
    else if(a==D){//圆圈颜色一致
            drawTrainType(CIRCLE,color,layer,point);
    }else if(a==G){//红圈

        var color="rgb(255,0,0)";
            drawTrainType(CIRCLE,color,layer,point);
	}
     else if(a==K){//蓝圈
         var color="rgb(0,0,255)";
         drawTrainType(CIRCLE,color,layer,point);
     }else if(a==H){//加号加竖线
     	drawTrainType(PLUS_VERTICAL,color,layer,point);
	}else if(a==J){//虚线方框颜色一致

       drawTrainType(IMAGINARYLINE_SQUARE,color,layer,point)

	}else if(a==N){//三角形颜色一致
		drawTrainType(TRIANGLE,color,layer,point);
	}else if(a==Q){//箭头

     	drawTrainType(ARROWS,color,layer,point);

	}else if(a==V){//X号


         drawTrainType(WRONG,color,layer,point);
	 }else if(a==T1 ){
         tBoxSumWidth=0;
         var colorArray = styleMap.get("color");
         var color = "rgb(" + colorArray[0] + "," + colorArray[1] + ","
             + colorArray[2] + ")";
            var point=polyMap.get("lastP");
            var midPoint=getMidPoint(point);//中点坐标
            var angle=Math.atan2((point[3]-point[1]),(point[2]-point[0]))*180/Math.PI;
             t1=d3.select(layer)
                .append("text")
                .text(b)   // 设置文本内容
                .attr("x", point[0])
                .attr("y", midPoint[1])
                .attr("font-size", "15")
                .attr("style", "fill:"+color )
                .attr("font-family","微软雅黑")
                .attr("font-weight","600")
                .attr("transform"," rotate("+angle+","+midPoint[0]+","+midPoint[1]+")");
			tBoxSumWidth+=t1.node().getBBox().width;//记录t1的宽度
	 }else if(a==T2){
		var text="";
		if(b!=""){
            text=b;
		}
         var colorArray = styleMap.get("color");
         var color = "rgb(" + colorArray[0] + "," + colorArray[1] + ","
             + colorArray[2] + ")";
         var point=polyMap.get("lastP");
         var midPoint=getMidPoint(point);//中点坐标
         var angle=Math.atan2((point[3]-point[1]),(point[2]-point[0]))*180/Math.PI;
          t2=d3.select(layer)
             .append("text")
             .text(text)   // 设置文本内容
             .attr("x", point[0]+tBoxSumWidth+10)
             .attr("y", midPoint[1])
             .attr("font-size", "15")
             .attr("style", "fill:"+color )
             .attr("font-family","微软雅黑")
             .attr("font-weight","600")
             .attr("transform"," rotate("+angle+","+midPoint[0]+","+midPoint[1]+")");
         tBoxSumWidth+=t2.node().getBBox().width;//记录t1的宽度

     }else if(a==T3){
         if(b!=""){
             text="+"+b;
         }
         var colorArray = styleMap.get("color");
         var color = "rgb(" + colorArray[0] + "," + colorArray[1] + ","
             + colorArray[2] + ")";
         var point=polyMap.get("lastP");
         var midPoint=getMidPoint(point);//中点坐标
         var angle=Math.atan2((point[3]-point[1]),(point[2]-point[0]))*180/Math.PI;
         t3=d3.select(layer)
             .append("text")
             .text(text)   // 设置文本内容
             .attr("x", point[0]+tBoxSumWidth+10)
             .attr("y", midPoint[1])
             .attr("font-size", "15")
             .attr("style", "fill:"+color )
             .attr("font-family","微软雅黑")
             .attr("font-weight","600")
             .attr("transform"," rotate("+angle+","+midPoint[0]+","+midPoint[1]+")");
         tBoxSumWidth+=t3.node().getBBox().width;//记录t1的宽度

     }else if(a==T4){
         if(b!=""){
             text="+"+b;
         }
         var colorArray = styleMap.get("color");
         var color = "rgb(" + colorArray[0] + "," + colorArray[1] + ","
             + colorArray[2] + ")";
         var point=polyMap.get("lastP");
         var midPoint=getMidPoint(point);//中点坐标
         var angle=Math.atan2((point[3]-point[1]),(point[2]-point[0]))*180/Math.PI;
         t4=d3.select(layer)
             .append("text")
             .text(text)   // 设置文本内容
             .attr("x", point[0]+tBoxSumWidth+10)
             .attr("y", midPoint[1])
             .attr("font-size", "15")
             .attr("style", "fill:"+color )
             .attr("font-family","微软雅黑")
             .attr("font-weight","600")
             .attr("transform"," rotate("+angle+","+midPoint[0]+","+midPoint[1]+")");
         tBoxSumWidth+=t4.node().getBBox().width;//记录t1的宽度

     }else if(a==T5){
         if(b!=""){
			 text="+"+b;
         }
         var colorArray = styleMap.get("color");
         var color = "rgb(" + colorArray[0] + "," + colorArray[1] + ","
             + colorArray[2] + ")";
         var point=polyMap.get("lastP");
         var midPoint=getMidPoint(point);//中点坐标
         var angle=Math.atan2((point[3]-point[1]),(point[2]-point[0]))*180/Math.PI;
         t5=d3.select(layer)
             .append("text")
             .text(text)   // 设置文本内容
             .attr("x", point[0]+tBoxSumWidth+10)
             .attr("y", midPoint[1])
             .attr("font-size", "15")
             .attr("style", "fill:"+color )
             .attr("font-family","微软雅黑")
             .attr("font-weight","600")
             .attr("transform"," rotate("+angle+","+midPoint[0]+","+midPoint[1]+")");
         tBoxSumWidth+=t5.node().getBBox().width;//记录t1的宽度

     }else if(a==T6){
		 if(b!=""){
			 text="+"+b;
		 }
		 var colorArray = styleMap.get("color");
		 var color = "rgb(" + colorArray[0] + "," + colorArray[1] + ","
			 + colorArray[2] + ")";
		 var point=polyMap.get("lastP");
		 var midPoint=getMidPoint(point);//中点坐标
		 var angle=Math.atan2((point[3]-point[1]),(point[2]-point[0]))*180/Math.PI;
		 t6=d3.select(layer)
			 .append("text")
			 .text(text)   // 设置文本内容
			 .attr("x", point[0]+tBoxSumWidth+10)
			 .attr("y", midPoint[1])
			 .attr("font-size", "15")
			 .attr("style", "fill:"+color )
			 .attr("font-family","微软雅黑")
			 .attr("font-weight","600")
			 .attr("transform"," rotate("+angle+","+midPoint[0]+","+midPoint[1]+")");
		 tBoxSumWidth+=t6.node().getBBox().width;//记录t1的宽度

	 }else if(a==T7){
		 if(b!=""){
			 text="+"+b;
		 }
		 var colorArray = styleMap.get("color");
		 var color = "rgb(" + colorArray[0] + "," + colorArray[1] + ","
			 + colorArray[2] + ")";
		 var point=polyMap.get("lastP");
		 var midPoint=getMidPoint(point);//中点坐标
		 var angle=Math.atan2((point[3]-point[1]),(point[2]-point[0]))*180/Math.PI;
		 t7=d3.select(layer)
			 .append("text")
			 .text(text)   // 设置文本内容
			 .attr("x", point[0]+tBoxSumWidth+10)
			 .attr("y", midPoint[1])
			 .attr("font-size", "15")
			 .attr("style", "fill:"+color )
			 .attr("font-family","微软雅黑")
			 .attr("font-weight","600")
			 .attr("transform"," rotate("+angle+","+midPoint[0]+","+midPoint[1]+")");
		 tBoxSumWidth+=t7.node().getBBox().width;//记录t1的宽度

	 }else if(a==T8){
		 if(b!=""){
			 text=b;
		 }
		 var colorArray = styleMap.get("color");
		 var color = "rgb(" + colorArray[0] + "," + colorArray[1] + ","
			 + colorArray[2] + ")";
		 var point=polyMap.get("lastP");
		 var midPoint=getMidPoint(point);//中点坐标
		 var angle=Math.atan2((point[3]-point[1]),(point[2]-point[0]))*180/Math.PI;
		 t8=d3.select(layer)
			 .append("text")
			 .text(text)   // 设置文本内容
			 .attr("x", point[0]+tBoxSumWidth+20)
			 .attr("y", midPoint[1])
			 .attr("font-size", "15")
			 .attr("style", "fill:"+color )
			 .attr("font-family","微软雅黑")
			 .attr("font-weight","600")
			 .attr("transform"," rotate("+angle+","+midPoint[0]+","+midPoint[1]+")");
		 tBoxSumWidth+=t8.node().getBBox().width;//记录t1的宽度

	 }

}

//画列车线的标志
function drawTrainType(type,color,layer,point){
	//方框
	 if(type==SQUARE){
        var thirdPoint=getThirdPoint(point);//两个三分点的坐标也就是圆心坐标。
        var angle=Math.atan2((point[3]-point[1]),(point[2]-point[0]))*180/Math.PI;
        var x1=thirdPoint[0]-8;
        var y1=thirdPoint[1]-8;
        var x2=thirdPoint[2]-8;
        var y2=thirdPoint[3]-8;
        d3.select(layer)
            .append("rect")
            .attr("x", x1)
            .attr("y", y1)
            .attr("width", 16)
            .attr("height", 16)
            .attr("stroke-opacity",1)
            .attr("style","fill:none;stroke-width:0.5;stroke:"+color)
            .attr("transform"," rotate("+angle+","+thirdPoint[0]+","+thirdPoint[1]+")");
        d3.select(layer)
            .append("rect")
            .attr("x", x2)
            .attr("y", y2)
            .attr("width", 16)
            .attr("height", 16)
            .attr("stroke-opacity",1)
            .attr("style","fill:none;stroke-width:0.5;stroke:"+color)
            .attr("transform"," rotate("+angle+","+thirdPoint[2]+","+thirdPoint[3]+")");
	}
	//圆
	else if(type==CIRCLE){
        var thirdPoint=getThirdPoint(point);//两个三分点的坐标也就是圆心坐标。
        var angle=Math.atan2((point[3]-point[1]),(point[2]-point[0]))*180/Math.PI;
        d3.select(layer)
            .append("circle")
            .attr("cx", thirdPoint[0])
            .attr("cy", thirdPoint[1])
            .attr("r", 8)
            .attr("stroke-opacity",1)
            .attr("style", "fill:none;stroke-width:1;stroke:"+ color);
        d3.select(layer)
            .append("circle")
            .attr("cx", thirdPoint[2])
            .attr("cy", thirdPoint[3])
            .attr("r", 8)
            .attr("stroke-opacity",1)
            .attr("style", "fill:none;stroke-width:1;stroke:"+ color);

	}
	//双竖线
	else if(type==VERTICAL){
         var thirdPoint=getThirdPoint(point);//两个三分点的坐标也就是圆心坐标。
         var angle=Math.atan2((point[3]-point[1]),(point[2]-point[0]))*180/Math.PI;
        d3.select(layer)
            .append("line")
            .attr("x1", thirdPoint[0]-4)
            .attr("y1", thirdPoint[1]-8)
            .attr("x2", thirdPoint[0]-4)
            .attr("y2", thirdPoint[1]+8)
            .attr("stroke-opacity",1)
            .attr("style", "stroke-width:0.5;stroke:"+color )
    		.attr("transform"," rotate("+angle+","+thirdPoint[0]+","+thirdPoint[1]+")");
        d3.select(layer)
            .append("line")
            .attr("x1", thirdPoint[0]+4)
            .attr("y1", thirdPoint[1]-8)
            .attr("x2", thirdPoint[0]+4)
            .attr("y2", thirdPoint[1]+8)
            .attr("stroke-opacity",1)
            .attr("style", "stroke-width:0.5;stroke:"+color )
    .attr("transform"," rotate("+angle+","+thirdPoint[0]+","+thirdPoint[1]+")");
        d3.select(layer)
            .append("line")
            .attr("x1", thirdPoint[2]-4)
            .attr("y1", thirdPoint[3]-8)
            .attr("x2", thirdPoint[2]-4)
            .attr("y2", thirdPoint[3]+8)
            .attr("stroke-opacity",1)
            .attr("style", "stroke-width:0.5;stroke:"+color )
            .attr("transform"," rotate("+angle+","+thirdPoint[2]+","+thirdPoint[3]+")");
        d3.select(layer)
            .append("line")
            .attr("x1", thirdPoint[2]+4)
            .attr("y1", thirdPoint[3]-8)
            .attr("x2", thirdPoint[2]+4)
            .attr("y2", thirdPoint[3]+8)
            .attr("stroke-opacity",1)
            .attr("style", "stroke-width:0.5;stroke:"+color )
            .attr("transform"," rotate("+angle+","+thirdPoint[2]+","+thirdPoint[3]+")");

	}
//三角形
	else if(type==TRIANGLE){
         var thirdPoint=getThirdPoint(point);//两个三分点的坐标也就是圆心坐标。
         var angle=Math.atan2((point[3]-point[1]),(point[2]-point[0]))*180/Math.PI;
         var point1 = new Array();//[171,170]
         var point2 = new Array();//[171,170]
		 point1.push(thirdPoint[0]-8);
         point1.push(thirdPoint[1]-10);
         point1.push(thirdPoint[0]-8);
         point1.push(thirdPoint[1]+10);
         point1.push(thirdPoint[0]+8);
         point1.push(thirdPoint[1]);
         point2.push(thirdPoint[2]-8);
         point2.push(thirdPoint[3]-10);
         point2.push(thirdPoint[2]-8);
         point2.push(thirdPoint[3]+10);
         point2.push(thirdPoint[2]+8);
         point2.push(thirdPoint[3]);
      var svg=d3.select(layer)
             .append("polygon")
             .attr("stroke-opacity",1)
             .attr("style", "fill:none;stroke-width:0.5;stroke:"+ color)
             .attr("transform"," rotate("+angle+","+thirdPoint[0]+","+thirdPoint[1]+")");
          svg.attr("points", point1);
		  svg=d3.select(layer)
			 .append("polygon")
			 .attr("stroke-opacity",1)
			 .attr("style", "fill:none;stroke-width:0.5;stroke:"+ color)
			 .attr("transform"," rotate("+angle+","+thirdPoint[2]+","+thirdPoint[3]+")");
		  svg.attr("points", point2);

	}
	 //加号加竖线

	 else if(type==PLUS_VERTICAL){
         var thirdPoint=getThirdPoint(point);//两个三分点的坐标也就是圆心坐标。
         var angle=Math.atan2((point[3]-point[1]),(point[2]-point[0]))*180/Math.PI;
         d3.select(layer)
             .append("line")
             .attr("x1", thirdPoint[0]-8)
             .attr("y1", thirdPoint[1])
             .attr("x2", thirdPoint[0]+8)
             .attr("y2", thirdPoint[1])
             .attr("stroke-opacity",1)
             .attr("style", "stroke-width:0.5;stroke:"+color )
             .attr("transform"," rotate("+angle+","+thirdPoint[0]+","+thirdPoint[1]+")");
         d3.select(layer)
             .append("line")
             .attr("x1", thirdPoint[0])
             .attr("y1", thirdPoint[1]-8)
             .attr("x2", thirdPoint[0])
             .attr("y2", thirdPoint[1]+8)
             .attr("stroke-opacity",1)
             .attr("style", "stroke-width:0.5;stroke:"+color )
             .attr("transform"," rotate("+angle+","+thirdPoint[0]+","+thirdPoint[1]+")");
         d3.select(layer)
             .append("line")
             .attr("x1", thirdPoint[2])
             .attr("y1", thirdPoint[3]-8)
             .attr("x2", thirdPoint[2])
             .attr("y2", thirdPoint[3]+8)
             .attr("stroke-opacity",1)
             .attr("style", "stroke-width:0.5;stroke:"+color )
             .attr("transform"," rotate("+angle+","+thirdPoint[2]+","+thirdPoint[3]+")");
	 }
	 //箭头
	 else if(type==ARROWS){
         var thirdPoint=getThirdPoint(point);//两个三分点的坐标也就是圆心坐标。
         var angle=Math.atan2((point[3]-point[1]),(point[2]-point[0]))*180/Math.PI;
         d3.select(layer)
             .append("line")
             .attr("x1", thirdPoint[0]-8)
             .attr("y1", thirdPoint[1])
             .attr("x2", thirdPoint[0]+8)
             .attr("y2", thirdPoint[1])
             .attr("stroke-opacity",1)
             .attr("style", "stroke-width:0.5;stroke:"+color )
             .attr("transform"," rotate("+angle+","+thirdPoint[0]+","+thirdPoint[1]+")");
         d3.select(layer)
             .append("line")
             .attr("x1", thirdPoint[2]-8)
             .attr("y1", thirdPoint[3])
             .attr("x2", thirdPoint[2]+8)
             .attr("y2", thirdPoint[3])
             .attr("stroke-opacity",1)
             .attr("style", "stroke-width:0.5;stroke:"+color )
             .attr("transform"," rotate("+angle+","+thirdPoint[2]+","+thirdPoint[3]+")");
         var point1 = new Array();//第一个箭头的点坐标集合
         var point2 = new Array();//第二个箭头的点坐标集合
         point1.push(thirdPoint[0]+2);
         point1.push(thirdPoint[1]-2);
         point1.push(thirdPoint[0]+3);
         point1.push(thirdPoint[1]);
         point1.push(thirdPoint[0]+2);
         point1.push(thirdPoint[1]+2);
         point1.push(thirdPoint[0]+8);
         point1.push(thirdPoint[1]);

         point2.push(thirdPoint[2]+2);
         point2.push(thirdPoint[3]-2);
         point2.push(thirdPoint[2]+3);
         point2.push(thirdPoint[3]);
         point2.push(thirdPoint[2]+2);
         point2.push(thirdPoint[3]+2);
         point2.push(thirdPoint[2]+8);
         point2.push(thirdPoint[3]);
         var svg=d3.select(layer)
             .append("polygon")
             .attr("stroke-opacity",1)
             .attr("style", "fill:"+color+";stroke-width:0.5;stroke:"+ color)
             .attr("transform"," rotate("+angle+","+thirdPoint[0]+","+thirdPoint[1]+")");
         svg.attr("points", point1);
         var svg=d3.select(layer)
             .append("polygon")
             .attr("stroke-opacity",1)
             .attr("style", "fill:"+color+";stroke-width:0.5;stroke:"+ color)
             .attr("transform"," rotate("+angle+","+thirdPoint[2]+","+thirdPoint[3]+")");
         svg.attr("points", point2);
	 }
	 //X号
	else if(type==WRONG){

         var thirdPoint=getThirdPoint(point);//两个三分点的坐标也就是圆心坐标。
         var angle=Math.atan2((point[3]-point[1]),(point[2]-point[0]))*180/Math.PI;
         d3.select(layer)
             .append("line")

             .attr("x1", thirdPoint[0]-8)
             .attr("y1", thirdPoint[1]-8)
             .attr("x2", thirdPoint[0]+8)
             .attr("y2", thirdPoint[1]+8)

             .attr("stroke-opacity",1)
             .attr("style", "stroke-width:0.5;stroke:"+color )
             .attr("transform"," rotate("+angle+","+thirdPoint[0]+","+thirdPoint[1]+")");
         d3.select(layer)
             .append("line")

             .attr("x1", thirdPoint[0]-8)
             .attr("y1", thirdPoint[1]+8)
             .attr("x2", thirdPoint[0]+8)
             .attr("y2", thirdPoint[1]-8)

             .attr("stroke-opacity",1)
             .attr("style", "stroke-width:0.5;stroke:"+color )
             .attr("transform"," rotate("+angle+","+thirdPoint[0]+","+thirdPoint[1]+")");
         d3.select(layer)
             .append("line")

             .attr("x1", thirdPoint[2]-8)
             .attr("y1", thirdPoint[3]-8)
             .attr("x2", thirdPoint[2]+8)
             .attr("y2", thirdPoint[3]+8)
             .attr("stroke-opacity",1)
             .attr("style", "stroke-width:0.5;stroke:"+color )
             .attr("transform"," rotate("+angle+","+thirdPoint[2]+","+thirdPoint[3]+")");
         d3.select(layer)
             .append("line")
             .attr("x1", thirdPoint[2]-8)
             .attr("y1", thirdPoint[3]+8)
             .attr("x2", thirdPoint[2]+8)
             .attr("y2", thirdPoint[3]-8)

             .attr("stroke-opacity",1)
             .attr("style", "stroke-width:0.5;stroke:"+color )
             .attr("transform"," rotate("+angle+","+thirdPoint[2]+","+thirdPoint[3]+")");
	 }

	 //虚线加方框
	 else if(type==IMAGINARYLINE_SQUARE){
         var thirdPoint=getThirdPoint(point);//两个三分点的坐标也就是圆心坐标。
         var angle=Math.atan2((point[3]-point[1]),(point[2]-point[0]))*180/Math.PI;
         console.log(angle);
         d3.select(layer)
             .append("line")
             .attr("x1", point[0])
             .attr("y1", point[1])
             .attr("x2", thirdPoint[0])
             .attr("y2", thirdPoint[1])
             .attr("stroke-opacity",1)
             .attr("style", "stroke-width:0.5;stroke:"+color )
             .attr("stroke-dasharray","5,3")
             .attr("transform"," rotate("+angle+","+point[0]+","+point[1]+")");
         d3.select(layer)
             .append("line")
             .attr("x1", thirdPoint[0])
             .attr("y1", thirdPoint[1])
             .attr("x2", thirdPoint[2])
             .attr("y2", thirdPoint[3])
             .attr("stroke-opacity",1)
             .attr("style", "stroke-width:0.5;stroke:"+color )
             .attr("stroke-dasharray","5,3")
             .attr("transform"," rotate("+angle+","+point[0]+","+point[1]+")");
         d3.select(layer)
             .append("line")
             .attr("x1", thirdPoint[2])
             .attr("y1", thirdPoint[3])
             .attr("x2", point[2])
             .attr("y2", point[3])
             .attr("stroke-opacity",1)
             .attr("style", "stroke-width:0.5;stroke:"+color )
             .attr("stroke-dasharray","5,3")
             .attr("transform"," rotate("+angle+","+point[0]+","+point[1]+")");
         var x1=thirdPoint[0]-9;
         var y1=thirdPoint[1]-8;
         var x2=thirdPoint[2]-9;
         var y2=thirdPoint[3]-8;
         d3.select(layer)
             .append("rect")
             .attr("x", x1)
             .attr("y", y1)
             .attr("width", 16)
             .attr("height", 16)
             .attr("stroke-opacity",1)
             .attr("style","fill:none;stroke-width:0.5;stroke:"+color)
             .attr("transform"," rotate("+angle+","+thirdPoint[0]+","+thirdPoint[1]+")");
         d3.select(layer)
             .append("rect")
             .attr("x", x2)
             .attr("y", y2)
             .attr("width", 16)
             .attr("height", 16)
             .attr("stroke-opacity",1)
             .attr("style","fill:none;stroke-width:0.5;stroke:"+color)
             .attr("transform"," rotate("+angle+","+thirdPoint[2]+","+thirdPoint[3]+")");
	 }

}

//三分点的坐标
function getThirdPoint(point){
	var thirdPoint=new Array();
    var px1=(parseInt(2*point[0])+parseInt(point[2]))/3;
    var py1=(parseInt(2*point[1])+parseInt(point[3]))/3;
    var px2=(parseInt(point[0])+parseInt(2*point[2]))/3;
    var py2=(parseInt(point[1])+parseInt(2*point[3]))/3;
    thirdPoint.push(px1);
    thirdPoint.push(py1);
    thirdPoint.push(px2);
    thirdPoint.push(py2);
   return thirdPoint;
}

//中点坐标
function getMidPoint(point){
	var midPoint=new Array();
	var x=(parseInt(point[0])+parseInt(point[2]))/2;
	var y= (parseInt(point[1])+parseInt(point[3]))/2;
    midPoint.push(x);
    midPoint.push(y);
    return midPoint;
}
var setContainerSize = function($topSvg, $leftSvg, $centerSvg, sp) {

	// 设置顶部 区域的宽度和大小
	$topSvg.attr("width", sp[0]);
	$topSvg.attr("height", sp[3]);

	// 设置左部区域的 宽度和大小
	$leftSvg.attr("width", sp[2]);
	$leftSvg.attr("height", sp[1]);

	// 设置中央区域的宽 和高
	$centerSvg.attr("width", sp[0]);
	$centerSvg.attr("height", sp[1]);
	
	
}

/**
 * 获得相对父容器的坐标，不确定是否兼容 IE
 */
var getPosition = function(event) {
	var evt = event || window.event;
	var srcObj = evt.target || evt.srcElement;
	if (evt.offsetX) {
		return {
			x : parseInt(evt.pageX-leftWidth),
			//  不知道为什么在IE中获得的y轴的坐标是浮点型，但是后台需要的是整形，所以将浮点型转成整形
			// y : evt.offsetY
			y : parseInt(evt.pageY-21)
		};
	} else {
		var rect = srcObj.getBoundingClientRect();
		return {
			x : parseInt(evt.screenX  - rect.left),
			y : parseInt(evt.screenY - rect.top)
		}
	}
};

// 判断键盘按键是否按下的 方法，并返回相应的值
var getModifiers = function(e){
	var i = 0;
	if( e.ctrlKey == 1 &&  e.shiftKey==1){
		i = 130;
	}	
	if(e.ctrlKey == 1 && e.shiftKey !=1 ){
		i = 1170;
	}
	if(e.ctrlKey != 1 && e.shiftKey ==1 ){
		i = 65;
	}
	return i;
}



/**
 *  方法报错，需要验证的方法，现在是各个浏览器都报错
 */
// 获取相对父容器的坐标，此方法好像暂时还不能成功使用
var getElPosition = function(el) {
	var t = el.offsetTop, l = el.offsetLeft;
	while (el = el.offsetParent) {
		t += el.offsetTop;
		l += el.offsetLeft;
	}
	return {
		x : l,
		y : t
	};
};



