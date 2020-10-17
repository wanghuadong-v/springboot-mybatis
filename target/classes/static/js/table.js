var selListennerArray = new Array();//行选择监听器
var setListennerArray = new Array();//输入值监听器
var dragDoneListennerArray=new Array();//选中拖动完成监听器
var enterNextFinallstener = null;
var beSelectedTag = "";//当前正在编辑的标签
var nextStr="车次,发站,到站";//跳转字串
var startRow = -1;
var endRow = -1;
var startCol = -1;
var endCol = -1;
var defFont="";//默认字体
var style = "";
var fontColor = "";
var size = "";
var backColor = "#fff";
var headId = "tableHead";
var tableId = "table";
var hasHead = true;
var frozeRow = 0;
var frozeCol = 0;
var dataRow = 0;
var dataCol = 0;
var defHeight = 20;
var onDeal = null;

function h(colName, colWidth, editor, col){
	var colCount = col || getColsCount();
	var headTr = document.getElementById("headTr");
	var headTd = headTr.insertCell(colCount);
	headTd.innerHTML = colName;
	headTd.className = "headTd";
	headTd.style.position = "absolute";
	headTd.style.marginLeft = computeOffset(colCount) + "px";
	headTd.style.marginTop = -1 + "px";
	headTd.style.width = colWidth + "px";
	if(!editor){
		editor = "文本";
	}
	headTd.setAttribute("editor", editor);
}

//获取列宽
function getColWidth(col){
	return parseInt($("#" + headId)[0].rows[0].cells[col].style.width
			.substr(0,$("#" + headId)[0].rows[0].cells[col].style.width.length-2));
}

//计算某列的偏移量
function computeOffset(col){
	var widthSum = 0;
	for(var i=0;i<col;i++){
		widthSum += 1 + parseInt($("#" + headId)[0].rows[0].cells[i].style.width
			.substr(0,$("#" + headId)[0].rows[0].cells[i].style.width.length-2));
			//console.log(widthSum)
	}
	return widthSum;
}

function resetLayer() {
	var left = $("#divLeft").css("display") === "block"? 26 : 0;
	var top =  $("#tableHead")[0].offsetHeight || 0;
	$("#divCenter").css("marginLeft", left + "px");
	$("#divCenter").css("marginTop", top + "px");
	$("#divHead").css("marginLeft", left + "px");
}

function showHead(flag){
	if(flag){
		$("#tableLeft tr").eq(0).css("display", "");
		$("#tableHead").css("display", "block");
	} else {
		$("#tableLeft tr").eq(0).css("display", "none");
		$("#tableHead").css("display", "none");
	}
	//resetLayer();
}

function showXh(flag){
	$("#divLeft").css("display", flag? "block" : "none");
	//resetLayer();
}

// 表格渲染
function cellRender(cell) {
	var text = $(cell).find(".text");
	text[0].style.fontFamily = defFont;
	text[0].style.fontStyle = style;
	text[0].style.width = "100%";
	text[0].style.height = "100%";
	text[0].style.fontSize = size + "px";
	text[0].style.color = fontColor;
	text[0].style.backgroundColor = backColor;
	//记录背景色用于还原
	text.attr("backColor", backColor);
}

//删行
function deletRow(msg) {
	$("#tableLeft").empty();//左边序号全部清空
	if(typeof msg != "undefined"){//传第几行就删除第几行
		var sp = msg.split(",");
		for (var i = sp.length - 1; i >=0; i--) {
			$("#"+tableId)[0].deleteRow(sp[i]);
		}
	}else{//如果上面都不传就全部删除
		for (var i = getRowsCount()-1; i >=dataRow; i--) {
			for(var j = getColsCount()-1;j>=dataCol;j--){
				if($("#"+tableId)[0].rows[i].cells[j]){
					$("#"+tableId)[0].rows[i].deleteCell(j);
				}
			}
		}
	}
	//重新创建左边表格
	createTableLeft();
}

function deletCell(col){
	$("#" + headId)[0].rows[0].deleteCell(col);
	for(var i=0;i<getRowsCount();i++){
		$("#"+tableId)[0].rows[i].deleteCell(col);
	}
	if(getColsCount() === 0){
		$("#table tbody").html("");
		$("#tableLeft tbody").html("");
	}
}

function doubleColName(){
	var order = 0;
	var tableHead = $("#" + headId)[0];
	var colLength = $(tableHead.rows[0]).find("td").length;
	for(var i=0;i<colLength;i++){
		(function(i){$(tableHead.rows[0].children[i]).on({dblclick:function(){
			order = !order;
			tableSort(i,order);
		}})})(i);
	}
}

//验证字符串是否是数字
function checkNumber(str) {
  var reg = /^[0-9]+.?[0-9]*$/;
  if (reg.test(str)) {
    return true;
  }
  return false;
}

//排序
function tableSort(col,order){
	var valueList = [];
	var isNumber = true;
	var rowlength = $("#"+tableId).find("tr").length;
	//获取此列的所有值并存储
	for(var i=0;i<rowlength;i++){
		var ctd = $($("#"+tableId)[0].rows[i]);
		var vl = getValueAt(i,col);
		if(typeof(vl)=='string' && !checkNumber(vl)){
			isNumber = false;
		}
		valueList.push([ctd,vl])
	}
	valueList.sort(function(x, y){
		if(isNumber){//如果是数字则按照数字排序	
			if(order){
				return Number(x[1]) - Number(y[1]);
			}else{
				return Number(y[1]) - Number(x[1]);
			}
		}else{//字符排序	
			if(order){
				return x[1].localeCompare(y[1]);
			}else{
				return y[1].localeCompare(x[1]);
			}
		}
	});
	valueList.forEach(function(val,index){
		var p1 = $($("#"+tableId)[0].rows[index]);
		val[0].insertBefore(p1);
	})
}

//根据列号创建控件
function getControl(col){
	var editor = $("#" + headId)[0].rows[0].cells[col].getAttribute("editor");
	var creatInput = "<input autocomplete='off' style='width:100%;height:100%;border:none;' id='textId' type='text'/>";
	if(editor.indexOf("下拉") === 0){
		$("#selectControl").html("");
		editor = editor.split(",");
		editor.splice(0, 1);
		var options = '';
		for (var i = 0; i < editor.length; i++) {
			options += "<option value ='"+ editor[i] +"'>"+ editor[i] +"</option>";
		}
		var marginLeftWidth = parseInt($("#" + headId)[0].rows[0].cells[col].style.width) + "px";
		$("#selectControl").html(options);
		$("#selectControl").css("width", marginLeftWidth);
		$("#selectDiv").css("display","inline");
	}
	return "<div style='position:absolute;left:0;top:0;width:100%;height:100%;z-index:999;'>" + creatInput + "</div>";
}

function setColEditor(col, editor){
	for(var j=0; j<getRowsCount(); j++){
		var lastEditor = getCellEditor(j, col);
		table.rows[j].cells[col].removeAttribute("editor");
		if(lastEditor.indexOf(editor) === 0) continue;
		if(editor == "复选"){
			table.rows[j].cells[col].lastChild.innerHTML = "<input autocomplete='off' type='checkbox' name='checkbox' onchange='isChecked()'>";
		}
		if(editor == "文本域") {
			table.rows[j].cells[col].lastChild.innerHTML = "<textarea name='' id='' cols='' rows='' style='width:100%;height:100%;resize:none;border:none;background:none;'></textarea>";
		}

		if(lastEditor == "复选" && (editor == "文本" || editor.indexOf("下拉") === 0)) {
			table.rows[j].cells[col].lastChild.innerHTML = "";
		}

		if(lastEditor == "文本域" && (editor == "文本" || editor.indexOf("下拉") === 0)) {
			table.rows[j].cells[col].lastChild.innerHTML = table.rows[j].cells[col].lastChild.lastChild.value;
		}
	}
	$("#tableHead")[0].rows[0].cells[col].setAttribute("editor", editor);
}

function getCellEditor(row, col){
	return $("#table")[0].rows[row].cells[col].getAttribute("editor") || $("#tableHead")[0].rows[0].cells[col].getAttribute("editor");
}

function setCellEditor(startRow, startCol, endRow, endCol, editor){
	var table = document.getElementById("table");
	var comVal = compareSize(startRow, startCol, endRow, endCol);
	for(var i = comVal.startRow; i <= comVal.endRow; i++){
		for(var j = comVal.startCol; j <= comVal.endCol; j++){
			var lastEditor = getCellEditor(i ,j);
			table.rows[i].cells[j].setAttribute("editor", editor);
			if(lastEditor.indexOf(editor) === 0) continue;

			if(editor == "复选"){
				table.rows[i].cells[j].lastChild.innerHTML = "<input autocomplete='off' type='checkbox' name='checkbox' onchange='isChecked()'>";
			}

			if(editor == "文本域") {
				table.rows[i].cells[j].lastChild.innerHTML = "<textarea name='' id='' cols='' rows='' style='width:100%;height:100%;resize:none;border:none;background:none;'>"+ (table.rows[i].cells[j].lastChild.getAttribute("text") || table.rows[i].cells[j].lastChild.innerHTML || "") +"</textarea>";
			}

			if(lastEditor == "复选" && (editor == "文本" || editor.indexOf("下拉") === 0)) {
				table.rows[i].cells[j].lastChild.innerHTML = table.rows[i].cells[j].lastChild.getAttribute("text") || "";
			}
	
			if(lastEditor == "文本域" && (editor == "文本" || editor.indexOf("下拉") === 0)) {
				table.rows[i].cells[j].lastChild.innerHTML = table.rows[i].cells[j].lastChild.lastChild.value;
			}
		}
	}
}

// 还原表格颜色
function restoreColor(b) {
	var text = $(tdList[b]).find('.text');
	text.css("backgroundColor", text.attr("backColor"));
}

// 创建左边表格的行
function createTableLeft() {
	$("#tableLeft").empty();
	if($("#divLeft").css("display") === "block"){
		var defRowHeight;
		var table = document.getElementById(tableId);
		var leftTable = document.getElementById("tableLeft");
		for (var i = 0; i <=getRowsCount(); i++) {
			var leftTr = leftTable.insertRow(i);
			var leftTd = leftTr.insertCell(0);
			leftTd.style.width = "25px";
			leftTd.style.position = "absolute";
			leftTd.style.backgroundColor = "#F0F8FF";
			if(i === 0){
				leftTr.style.height = "22px";
				leftTd.style.height = "22px";
				leftTd.style.lineHeight = "22px";
				leftTd.innerHTML = "";
			} else {
				defRowHeight = parseInt(table.rows[i-1].style.height);
				leftTr.style.height = defRowHeight + "px";
				leftTd.style.height = defRowHeight + "px";
				leftTd.style.lineHeight = defRowHeight + "px";
				leftTd.innerHTML = i;
			}
		}
		if($("#tableHead").css("display") == "none"){
			$("#tableLeft tr").eq(0).css("display", "none");
		}
	}
}

// 获得滚动条位置
function getScrollSitu() {
	var scrollTop = 0;
	var scrollLeft = 0;
	if (document.documentElement && document.documentElement.scrollTop) {
		scrollTop = document.documentElement.scrollTop;
	} else if (document.body) {
		scrollTop = $("body")[0].scrollTop;
	}
	if (document.documentElement && document.documentElement.scrollLeft) {
		scrollLeft = document.documentElement.scrollLeft;
	} else if (document.body) {
		scrollLeft = $("body")[0].scrollLeft;
	}
	var situation = new Array(scrollTop, scrollLeft);
	return situation;
}

// 控制div的位置，让其跟随滚动条移动，始终保持在屏幕边缘
function divSitu() {
	var table = $("#"+tableId)[0];
	var tableLeft = $("#tableLeft")[0];
	var tableHead = $("#" + headId)[0];
	var situ = getScrollSitu();
	document.getElementById("divHead").style.marginTop = situ[0] + 'px';
	document.getElementById("divLeft").style.marginLeft = situ[1] + 'px';
	// 固定行
	for (var j = 0; j < frozeRow; j++) { 
		if(table.rows[j]){
			for (var i = 0; i < table.rows[j].cells.length; i++) {
				table.rows[j].cells[i].style.marginTop = situ[0] + 'px';
			}
		}
	}
	
	// 固定列
	for (var i = 0; i < table.rows.length; i++) {
		for (var j = 0; j < frozeCol; j++) {
			if(table.rows[i] && table.rows[i].cells[j]){
				table.rows[i].cells[j].style.marginLeft = situ[1]+ computeOffset(j) + 'px';
			}
		}
	}
	
	// 固定左边序号列
	for (var i = 0; i <= frozeRow; i++) {
	   if(tableLeft.rows[i] && tableLeft.rows[i].cells) {
		 for (var k = 0; k < tableLeft.rows[i].cells.length; k++) {
			tableLeft.rows[i].cells[k].style.marginTop = situ[0] + "px";
		}
	  }
	}
	
	// 固定上表头
	for (var k = 0; k < tableHead.rows.length; k++) {
		for (var j = 0; j < frozeCol; j++) {
			if(tableHead.rows[k].cells[j]){
				tableHead.rows[k].cells[j].style.marginLeft = situ[1] + computeOffset(j) + 'px';
			}
		}
	}
}

function scrollRow(){

}

function scrollCol(){

}

var isDown = 0;
// 选择的哪几行
function selectedRow() {
	var selectedCount = Math.abs(endRow - startRow);// 3,4,5
	selectedRowArr = new Array();
	for (var i = 0; i <= selectedCount; i++) {
		selectedRowArr[i] = startRow;
		startRow++
	}
	return selectedRowArr;
}
// 选择单行、多行
var selRowArr=new Array();
var firstCtrl=true; //是否点击过左键
function selectMore() {
	var newStartRow=-1;
	var newEndRow=-1;
	var newStartCol=-1;
	var newEndCol=-1;
	var newSelRowArr = [];
	tdList = document.getElementById(tableId).getElementsByTagName("td");
	for (var i = 0; i < tdList.length; i++) {
		tdList[i].onmousedown = function(e) {
			if (e.button == 0) {//点击鼠标左键
				if(e.ctrlKey==0){//不按压ctrl
					firstCtrl=true;
					isDown = 1;
					//隐藏悬浮框
					$("#floatBox").css("display","none");
					newSelRowArr = [];
					newStartCol=this.cellIndex;//开始列
					newEndCol = newStartCol;
					var parent = this.parentNode;
					newStartRow = parent.rowIndex;//开始行
					newEndRow = newStartRow;//因为只选择了一行，所以开始和结束是一样的
				}
				if(e.ctrlKey==1 ) {//如果左键按下，并且按住ctrl
					if(firstCtrl && newStartRow != -1){
						newSelRowArr.push(newStartRow);//选中的数组
					}
					firstCtrl=false;
					if(newSelRowArr.indexOf(this.parentNode.rowIndex)==-1){
						newSelRowArr.push(this.parentNode.rowIndex);//选中的数组
					}else{
						removeByValue(newSelRowArr,this.parentNode.rowIndex);
					}
				}
				setSelect(newStartRow,newStartCol,newEndRow,newEndCol,newSelRowArr);
			}
		}
		tdList[i].onmouseover = function(e) {
			if (isDown == 1) {
				// 删除
				var parent = this.parentNode;
				newEndRow = parent.rowIndex;
				newEndCol=this.cellIndex;
				setSelect(newStartRow,newStartCol,newEndRow,newEndCol,newSelRowArr);
			} 

			if(isDown == 2){
				var parent = this.parentNode;
				var dragPosi = calculateDragPosi(parent.rowIndex, this.cellIndex);
				changeDragLacus(dragPosi.dragStartRow, dragPosi.dragStartCol, parent.rowIndex, this.cellIndex);
			}
		}
		tdList[i].onmouseup = function(e) {
			newEndRow = this.parentNode.rowIndex;//结束行
			newEndCol = this.cellIndex;//结束列
			if(isDown == 1){
				showDragDiv();//显示悬浮框
			}
			if(isDown == 2){
				var dragPosi = calculateDragPosi(newEndRow, newEndCol);
				changeDragLacus(dragPosi.dragStartRow, dragPosi.dragStartCol, newEndRow, newEndCol);
				dragDone(dragPosi.dragStartRow,dragPosi.dragStartCol,newEndRow,newEndCol);
			}
		}
		tdList[i].onkeydown = function(event) {
			if (event.keyCode == 13) {
				enterNext();
			}
		};
	}
}

function enterNext(){
	var editing;
	stopEdit();
	editing = enterNextLocation();
	if(!editing.isNextEdit) return; //回车时是否跳转，nextStr为空字符串，或都不匹配或者没有enternextfinallstener函数
	if(editing.editingRowIndex !=="" && editing.editingCellIndex!=="") {
		startEdit(editing.editingRowIndex,editing.editingCellIndex);
		setSelect(editing.editingRowIndex,editing.editingCellIndex,editing.editingRowIndex,editing.editingCellIndex,[]);
	} else {
		enterNextFinallstener();
	}
}

//获取正在编辑的行
function getEditRow(){
	if(beSelectedTag){
		return beSelectedTag.parentNode.parentNode.parentNode.rowIndex;
	}
	return -1;
}

//获取正在编辑的列
function getEditCol(){
	if(beSelectedTag){
		return beSelectedTag.parentNode.parentNode.cellIndex;
	}
	return -1;
}

//比较大小
function compareSize(newStartRow, newStartCol, newEndRow, newEndCol){
	var temp;
	if(newStartRow > newEndRow){
		temp = newStartRow;
		newStartRow = newEndRow;
		newEndRow = temp;
	}
	
	if(newStartCol > newEndCol){
		temp = newStartCol;
		newStartCol = newEndCol;
		newEndCol = temp;
	}
	
	return {
		startRow: newStartRow,
		endRow: newEndRow,
		startCol: newStartCol,
		endCol: newEndCol
	}
}

//根据拖动的结束位置计算开始位置
function calculateDragPosi(dragEndRow, dragEndCol){
	var rowNum = startRow >= endRow? startRow - endRow : endRow - startRow;
	var colNum = startCol >= endCol? startCol - endCol : endCol - startCol;

	var dragStartRow = dragEndRow-rowNum >= 0? dragEndRow-rowNum : 0;
	var dragStartCol = dragEndCol-colNum >= 0? dragEndCol-colNum : 0;
	
	return {
		dragStartRow: dragStartRow,
		dragStartCol: dragStartCol
	}
	
}

//改变拖动的位置
function changeDragLacus(newStartRow, newStartCol, newEndRow, newEndCol){
	var situation = getScrollSitu();
	var tableLeftWid =  $("#divCenter").css("marginLeft");
	var tableHeadHei = $("#divCenter").css("marginTop");
	
	//计算矩形宽,高
	var comVal = compareSize(newStartRow, newStartCol, newEndRow, newEndCol);//比较大小
	var startPosi = $("#"+tableId)[0].rows[comVal.startRow].cells[comVal.startCol].getBoundingClientRect();
	var startTop= startPosi.top - parseInt(tableHeadHei.substr(0,tableHeadHei.length - 2)) + situation[0];
	var startLeft= startPosi.left - parseInt(tableLeftWid.substr(0,tableLeftWid.length - 2)) + situation[1];
	var recentSelColWidth = getClintLeft(comVal.startRow, comVal.startCol, comVal.endRow, comVal.endCol);
	var recentSelColHeight = getClintTop(comVal.startRow, comVal.startCol, comVal.endRow, comVal.endCol);
	
	//生成svg边框
	$("#selDiv").css("display","inline");
	$("#selDiv").css("marginTop",startTop);
	$("#selDiv").css("marginLeft",startLeft);
	$("#dragBorder").css("width",recentSelColWidth);
	$("#dragBorder").css("height",recentSelColHeight);
	$("#dragBorderSVG").css("width",recentSelColWidth);
	$("#dragBorderSVG").css("height",recentSelColHeight);
}

function insertTitle(id,content,font){
	var head = document.getElementById(id).contentWindow.document.body;
	var p = document.createElement('div');
	var p1 = document.createElement('div');
	var f = font;
	p.id = "title";
	p.innerHTML = content;
	p1.innerHTML = content;
	p.style.backgroundColor = "#fff";
	p1.style.position = "fixed";
	p1.style.zIndex = "10";
	p1.style.width = "100%";
	p1.style.backgroundColor = "#fff";
	for(var key in font){
        p.style[key] = font[key];
        p1.style[key] = font[key];
	}
	head.prepend(p);
	head.prepend(p1);
}

function removeByValue(arr, val) {//删除数组的某个元素
	for(var i = 0; i < arr.length; i++) {
		if(arr[i] == val) {
			arr.splice(i, 1);
			break;
		}
	}
}
window.onscroll = function() {
	if ($(".selectDivClass")) {
        $(".selectDivClass").css("display", "none");
    }
	divSitu();// 改变div的位置
};

/**
 * 合并单元格--------并不是真正意义上的合并单元格，只是让想要合并的单元格上浮并变大， 遮住被合并的单元格，为了使合并之后单元格在表格中的行列不变
 *
 * @param starR
 *            开始的行
 * @param starC
 *            开始的列
 * @param countR
 *            合并多少行
 * @param countC
 *            合并多少列
 * @returns
 */
function cc(starR, starC, countR, countC) {
	if(countR == 0 || countC==0) return;
	var tb = document.getElementById(tableId);
	// 合并后的宽度
	var afterSpanWidth = getClintLeft(starR, starC, starR, starC + countC - 1)-2;
	// 合并后的高度
	var afterSpanHeight = getClintTop(starR, starC, starR+countR-1, starC + countC - 1)-3;
	//console.log(afterSpanWidth, afterSpanHeight)
	tb.rows[starR].cells[starC].style.position = "absolute";
	tb.rows[starR].cells[starC].className = "cc";
	tb.rows[starR].cells[starC].setAttribute("mergeR", countR);
	tb.rows[starR].cells[starC].setAttribute("mergeC", countC);
	tb.rows[starR].cells[starC].style.width = afterSpanWidth + "px";
	tb.rows[starR].cells[starC].style.height = afterSpanHeight + "px";
}

// 确认输入的值
function stopEdit() {
	var textConp = document.getElementById("textId");
	var recentSelectDiv = document.getElementById("selectDiv");
	if (textConp) {
		textConp.parentNode.parentNode.children[1].innerHTML = textConp.value;
		$("#textId").parent("div").remove();
		setValue(endRow, endCol, textConp.value);
		beSelectedTag= "";//beSelectedCell是当前编辑的标签
	}
	recentSelectDiv.style.display = "none";
}

//回车跳转
function enterNextLocation(){
	var editingCellIndex = endCol;//当前正在被编辑的列索引
	var editingRowIndex = endRow;//当前正在被编辑的行索引
	var nextCell;
	var nextCellArr = nextStr.split(",");//跳转指定列的数组
	var firstColNumArr = [];
	var rowsCount = getRowsCount();
	var colsCount = getColsCount();
	var isNextEdit=true;
	
	for(var k=0;k<nextCellArr.length;k++){
		nextCell = getColNumByName(nextCellArr[k]);
		if(nextCell != undefined && firstColNumArr.indexOf(nextCell) == -1) { //去重
			firstColNumArr.push(nextCell);
		}
	}
	firstColNumArr.sort();//排序
	while(editingRowIndex<rowsCount && editingCellIndex<colsCount){
		editingCellIndex++;
		//跳转时是最后一行新增否则跳转到下一行
		if(editingCellIndex > colsCount-1){
			editingRowIndex++;
			editingCellIndex = firstColNumArr[0];
			if(editingRowIndex == rowsCount){
				//新增行
				if(enterNextFinallstener){
					editingRowIndex = "";
					editingCellIndex = "";
				} else {
					editingRowIndex = -1;
					editingCellIndex = -1;
				}
			}
			break;
		}
		//在当前行跳转
		if(nextCellArr.indexOf(getNameByColNum(editingCellIndex)) != -1){
			break;
		}
	}
	//设置当前编辑行列
	selRowArr = [];
	editingRowIndex = editingRowIndex == undefined? -1 : editingRowIndex;
	editingCellIndex = editingCellIndex == undefined? -1 : editingCellIndex;
	if(editingRowIndex == -1 || editingCellIndex == -1 || firstColNumArr[0] == undefined){
		isNextEdit=false;
	}
	return {
		editingRowIndex: editingRowIndex,
		editingCellIndex: editingCellIndex,
		isNextEdit: isNextEdit
	}
}

// 显示select框+
function startEdit(row,cell) {
	var recentSelect;
	var recentSelectDiv;
	if(row == -1 || cell == -1) return;
	var editor = getCellEditor(row, cell);
	if(editor === "复选" || editor === "文本域") return;
	var recentCol=$("#"+tableId)[0].rows[row].cells[cell].lastChild;
	if($(recentCol).attr("editAble")!=1) return;

	// 双击展示下拉框
	var textConp = document.getElementById("textId");
	if (textConp != null) {
		// 赋值
		var recentValue = textConp.value;
	}else{
		var recentValue = $(recentCol).html();
		$(recentCol.parentNode).prepend(getControl(cell));
	}
	$("#textId").attr("value", recentValue);

	//如果此列是下拉选项，则添加功能keyList
	if(editor.indexOf("下拉") === 0){
		recentSelectDiv = document.getElementById("selectDiv");
		if (recentSelectDiv) {
			recentSelectDiv.style.display = "inline";
			recentSelectDiv.style.marginTop = getClintTop(0, cell, row, cell) + "px";
			recentSelectDiv.style.marginLeft = recentCol.parentNode.style.marginLeft;
		}
		recentSelect = document.getElementById("selectControl");		
		keyListFilter("textId", "selectControl");
	}
	
	cellFocus();
	if(recentSelect){
		recentSelect.onchange = function() {
			// 把下拉框的值给文本框，下拉框隐藏
			cellFocus();
			document.getElementById("textId").value = recentSelect.options[recentSelect.selectedIndex].value;
			recentSelectDiv.style.display = "none";
		}
	}
	beSelectedTag = $("#"+tableId)[0].rows[row].cells[cell].children[0].children[0];
}

// 文本框自动获取焦点
function cellFocus(){
	document.getElementById("textId").focus();
	document.getElementById("textId").select();
}

// 初始化单元格的zIndex值
function initZ() {
	var zIndex;
	var tdClass;
	var table = document.getElementById(tableId);
	var tableLeft = document.getElementById("tableLeft");
	var tableHead = document.getElementById("tableHead");
	for (var i = 0; i < getRowsCount(); i++) {
		for (var j = 0; j < getColsCount(); j++) {
			if(table.rows[i].cells[j]){
				zIndex = 0;
				tdClass =table.rows[i].cells[j].className;
				if (frozeCol > j) {
					zIndex += 2;
				}

				if (frozeRow > i) {
					zIndex += 2;
				}

				if (tdClass == "cc") {
					zIndex += 1;
				}
				table.rows[i].cells[j].style.zIndex = zIndex;
			}
		}
	}
	
	for (var j = 0; j <= frozeRow; j++) {
		if(tableLeft.rows[j]){
			for (var i = 0; i < tableLeft.rows[j].cells.length; i++) {
				if (tableLeft.rows[j].cells[i]) {
					tableLeft.rows[j].cells[i].style.zIndex = 2;
				}
			}
		}
	}

	for (var i = 0; i < tableHead.rows.length; i++) {
		for (var j = 0; j < frozeCol; j++) {
			if (tableHead.rows[i].cells[j]) {
				tableHead.rows[i].cells[j].style.zIndex = 2;
			}
		}
	}
}

//清空表格
function clearTable() {
	$("#tableHead tr").html("");
	$("#table tbody").html("");
	$("#tableLeft tbody").html("");
}

function isChecked(){
	var sc=$("#"+tableId)[0].rows[endRow].cells[endCol];
	var isCheck;
	if($(sc).find("input").prop("checked")){
		isCheck = 1;
	} else {
		isCheck = 0;
	}
	setValue(endRow,endCol,isCheck);
}

function rowAdd(){
	if(typeof startRow  == "undefined"){
		return getRowsCount()-1;
	}else {
		return startRow;
	}
}

var deal = function (str) {
	var isEval = false;
	var s = str.split(">");
	var msg = s[0].split("<");
	if(msg[0] === "ADD" || msg[0] === "SEL"){
		dealVector(str);
	}else if(msg[0] === "DEL"){
		deletRow(msg[1]);
	}else if(msg[0] === "UPD"){
		updVector(str);
	}else if(msg[0] === "格") {
		dealMean(str);
	}else {
		isEval = true;
		eval(str);
	}
	doubleColName();
	if(onDeal) onDeal(isEval, str);
}

//设置指定行高度
function setRowHeight(height, row){
	if(Array.isArray(row)){
		for(var i=0;i<row.length;i++){
			$($("#"+tableId)[0].rows[i]).css("height",height+"px");
			$($("#"+tableId)[0].rows[i]).find("td").css("height",height+"px");
			$($("#"+tableId)[0].rows[i]).find("td").css("lineHeight",1);
			$($("#tableLeft")[0].rows[i+1]).find("td").css("height",height+"px");
			$($("#tableLeft")[0].rows[i+1]).find("td").css("lineHeight",height+"px");
			$($("#tableLeft")[0].rows[i+1]).css("height",height+"px") ;
		}
	} else if(row || row ==0){
		$($("#"+tableId)[0].rows[row]).css("height",height+"px");
		$($("#"+tableId)[0].rows[row]).find("td").css("height",height+"px");
		$($("#"+tableId)[0].rows[row]).find("td").css("lineHeight",1);
		$($("#tableLeft")[0].rows[row+1]).find("td").css("height",height+"px");
		$($("#tableLeft")[0].rows[row+1]).find("td").css("lineHeight",height+"px");
		$($("#tableLeft")[0].rows[row+1]).css("height",height+"px") ;
	} else {
		$("#"+tableId).find("tr").css("height",height+"px");
		$("#"+tableId).find("td").css("height",height+"px");
		$("#"+tableId).find("td").css("lineHeight",1);
		$("#tableLeft").find("tr").css("height",height+"px");
		$("#tableLeft").find("td").css("height",height+"px");
		$("#tableLeft").find("td").css("lineHeight",height+"px");
	}
	
}

//设置指定单元格高度
function setCellHeight(row, col, height){
	$($("#"+tableId)[0].rows[row]).css("height",height+"px");
	$($("#"+tableId)[0].rows[row].cells[col]).css("height",height+"px");
	$($("#"+tableId)[0].rows[row].cells[col]).css("lineHeight",	1);
}

function replace(value){
	var replaced=value.replace(new RegExp(S1,"g"),S);
	replaced=replaced.replace(new RegExp(F1,"g"),F);
	var replaced=replaced.replace(new RegExp(E1,"g"),E);
	return replaced;
}

function getValueAt(rows,cells){
	var value="";
	if($("#"+tableId)[0].rows[rows].cells[cells]){
		value = $("#"+tableId)[0].rows[rows].cells[cells].children[0].innerHTML;
	}
	return value;
}

function setValueAt(rows,cells,value){
	$("#"+tableId)[0].rows[rows].cells[cells].children[0].innerHTML = value;
}

//设置单元格border
function setBorder(startRow, startCol, endRow, endCol, direction, borderWidth, borderColor){
	var cell;
	if(endRow == -1 || endCol == -1) return;
	var compareVal = compareSize(startRow, startCol, endRow, endCol);
	borderWidth = borderWidth? borderWidth : 0;
	borderColor = borderWidth? borderColor : "none";
	borderStyle = borderWidth? "solid" : "none";
	for(var i=compareVal.startRow;i<=compareVal.endRow;i++){
		for(var j=compareVal.startCol;j<=compareVal.endCol;j++){
			cell = $("#"+tableId)[0].rows[i].cells[j].children[0];
			cell.style.boxSizing = "border-box";
			if (direction.indexOf("上") > -1) {
				cell.style.borderTopStyle = borderStyle;
				cell.style.borderTopColor = borderColor;
				cell.style.borderTopWidth = borderWidth+"px";
			}
			if (direction.indexOf("下") > -1) {
				cell.style.borderBottomStyle = borderStyle;
				cell.style.borderBottomColor = borderColor;
				cell.style.borderBottomWidth = borderWidth+"px";
			}
			if (direction.indexOf("左") > -1){
				cell.style.borderLeftStyle = borderStyle;
				cell.style.borderLeftColor = borderColor;
				cell.style.borderLeftWidth = borderWidth+"px";
			}
			if(direction.indexOf("右") > -1) {
				cell.style.borderRighStyle = borderStyle;
				cell.style.borderRightColor = borderColor;
				cell.style.borderRightWidth = borderWidth+"px";
			}
		}
	}
}

//修改单元格颜色
function setBackground(startRow,startCol,endRow,endCol,bgColor){
	for(var i=startRow;i<=endRow;i++){
		for(var j=startCol;j<=endCol;j++){
			$("#"+tableId)[0].rows[i].cells[j].children[0].style.backgroundColor = bgColor;
			//记录背景色用于还原
			$($("#"+tableId)[0].rows[i].cells[j].children[0]).attr("backColor", bgColor);
		}
	}
}

//修改单元格样式
function setFont(startRow,startCol,endRow,endCol,attr){
	for(var i=startRow;i<=endRow;i++){
		for(var j=startCol;j<=endCol;j++){
			var cellSpan = $("#"+tableId)[0].rows[i].cells[j].children[0];
			cellSpan.style.fontSize = attr.fontSize + "px";
			cellSpan.style.fontFamily = attr.fontFamily;
			cellSpan.style.fontWeight = attr.fontWeight;
			cellSpan.style.fontStyle = attr.fontStyle;
			cellSpan.style.textDecoration = attr.textDecoration;
		}
	}
}

function setGradeColor(color){
	$("#table").attr("gradeColor", color);
	$("#table").find("td").css("borderColor", color);
}

//修改单元格字体颜色
function setFontColor(startRow,startCol,endRow,endCol,color){
	for(var i=startRow;i<=endRow;i++){
		for(var j=startCol;j<=endCol;j++){
			$("#"+tableId)[0].rows[i].cells[j].children[0].style.color= color;
		}
	}
}

//根据列名获取列号
function getColNumByName(colName){
	for(var i=0;i<getColsCount();i++){
		if($("#" + headId)[0].rows[0].cells[i].innerHTML == colName){
			return i;
		}
	}
}

function getNameByColNum(colNum){
	return $("#" + headId)[0].rows[0].cells[colNum].innerHTML;
}

//获取表格的总行数
function getRowsCount(){
	return $("#"+tableId)[0].rows.length;
}

//获取表格的总列数
function getColsCount(){
	return $("#" + headId)[0].rows[0].cells.length;
}

//获取总行高
function getTableHeight(){
	return parseFloat($("#"+tableId).css("height").substr(0,$("#"+tableId).css("height").length - 2))
		+parseFloat($("#divHead").css("height").substr(0,$("#divHead").css("height").length - 2));
}

//获取总列宽
function getTableWidth(){
	return $("#" + headId)[0].rows[0].cells[getColsCount()-1].offsetLeft+parseFloat($("#" + headId)[0].rows[0].cells[getColsCount()-1].style.width.substr
		(0,$("#" + headId)[0].rows[0].cells[getColsCount()-1].style.width.length - 2));
}

//专门处理后台VectorToTable传过来的字符串，只有>符号，直接用>打断    SEL<>1>2>3>4>5> 或 ADD<9>23>6>6>
function dealVector(vectorStr){
	var recentRow;// 当前行
	var recentColIndex = dataCol;// 当前列的索引
	var addIndex=dataRow;// 从第几行开始增加
	var msg;
	var splitStr;
	if(vectorStr.indexOf("SEL<>") === 0){
		deletRow();
		splitStr = "SEL<>";
	} else {
		splitStr = vectorStr.split(">")[0];
		if(splitStr.split("<")[1] != ""){
			addIndex = splitStr.split("<")[1];
			recentRow = $("#"+tableId)[0].insertRow(addIndex);
		} else {
			addIndex = getRowsCount();
		}
		splitStr = splitStr + ">";
	}
	
	msg = vectorStr.split(splitStr);
	var ss = msg[1].split(">");
	for(var i=0;i<ss.length-1;i++){//ss[i]就是每个格的值
		if(addIndex == getRowsCount()){
			recentColIndex=dataCol;
		}else{
			recentColIndex=$("#"+tableId)[0].rows[addIndex].cells.length;
		}
		recentRow = $("#"+tableId)[0].rows[addIndex];
		
		if (recentColIndex == dataCol || recentColIndex == getColsCount()) {
			//如果表格有行不满则加到此行，如果没有新建一行
			if(addIntoRowNum()==getRowsCount()){
				// 插入到指定位置之前，也就是指定几，插入之后就是第几行,如果不传参数，则插入到最后
				recentRow = $("#"+tableId)[0].insertRow(getRowsCount());
				recentColIndex = dataCol;
				fillRow(recentRow.rowIndex);
			}else{
				recentRow =$("#"+tableId)[0].rows[addIntoRowNum()];//当前要添加的行
				recentColIndex=recentRow.cells.length;
			}
		}
		addCell(recentRow.rowIndex, recentColIndex, ss[i]);
		recentColIndex++;
	}
	selectMore();
	createTableLeft();
	initZ();
}

//补行
function fillRow(row){
	for(var i=0;i<dataCol;i++){
		addCell(row, i, "");
	}
}

function addCell(recentRowIndex, recentColIndex, value){ //生成单元格
	var height;
	var ss = value.split(',');
	var recentValue=replace(ss[0]);
	var tableHead = document.getElementById(headId);
	var table = document.getElementById(tableId);
	var recentRow = table.rows[recentRowIndex];
	// 给当前行添加内容,首先给当前行添加列，然后给列赋上值
	var recentCol = recentRow.insertCell(recentColIndex);
	recentCol.style.position = "absolute";// 设置单元格的position为absolute，为了方便以后的固定行和列
	recentCol.style.width = parseInt(tableHead.rows[0].cells[recentColIndex].style.width.substr(0, tableHead.rows[0].cells[recentColIndex].style.width.length - 2)) + "px";
	// 给每个单元格设置宽度
	recentCol.style.marginLeft = computeOffset(recentColIndex) + "px";
	recentCol.style.zIndex = 0;
	//recentCol.style.borderLeftWidth = 1 + "px";
	if(recentValue==null){
		recentValue="";
	}
	var editor = $("#" + headId)[0].rows[0].cells[recentColIndex].getAttribute("editor");
	//复选框
	if(editor.indexOf("复选") === 0){
		if(recentValue == 1){
			recentCol.innerHTML = "<span class='text cellSpan' text='"+ recentValue +"'><input autocomplete='off' type='checkbox' name='checkbox' onchange='isChecked()' checked='checked'></span>";
		}else{
			recentCol.innerHTML = "<span class='text cellSpan' text='"+ recentValue +"'><input autocomplete='off' type='checkbox' name='checkbox' onchange='isChecked()'></span>";
		}
	} else if(editor.indexOf("文本域") === 0){
		recentCol.innerHTML = "<span  class='text cellSpan'><textarea name='' id='' cols='' rows='' style='width:100%;height:100%;resize:none;border:none;background:none;'>"+ recentValue +"</textarea></span >";
	} else {
		//文本
		recentCol.innerHTML = "<span  class='text cellSpan'>" + recentValue + "</span >";
		if(ss[1] === 0){
			$(recentCol.children[0]).attr("editAble","0");
		} else {
			$(recentCol.children[0]).attr("editAble","1");
		}
	}
	$(recentCol.children[0]).on({
		dblclick : function(e) {
			startEdit(this.parentNode.parentNode.rowIndex,this.parentNode.cellIndex);
		},
		mousedown : function(e) {
			if (e.button == 0) {
				stopEdit();
			}
		}
	});
	
	if($("#"+tableId)[0].rows[recentRowIndex].style.height){
		height = parseInt($("#"+tableId)[0].rows[recentRowIndex].style.height);
	} else {
		height = defHeight;
	}
	setCellHeight(recentRowIndex, recentColIndex, height);
	cellRender(recentCol);// 设置单元格的格式
}

function dealMean(vectorStr){
	var msg = vectorStr.split("CEL<>");
	var ss = msg[1].split(">");
	var tds = $("#"+tableId).find("td");
	for(var i=0;i<(ss.length-1)/2;i++){
		for(var j=0;j<tds.length;j++){
			if(ss[2*i] === tds.eq(j).find("span").attr("mean")){
				tds.eq(j).find("span").html(ss[2*i+1]);
			}
		}
	}
}

function addIntoRowNum(){
	var addIndex=getRowsCount();
	var col = getColsCount();
	for(var i=0;i<getRowsCount();i++){
		if($("#"+tableId)[0].rows[i].cells.length<col){
			addIndex= i;
			break;
		}
	}
	return addIndex;
}

//更新行数据 值>
function updVector(message) {
	var ss = message.split(">");
	var sss;
	var recentValue;
	var recentColIndex = 0;// 当前列的索引
	var addIndexAppint=-1;//指定添加到第几行
	for (var i = 0; i < ss.length-1; i++) {
		sss = ss[i].split("<");
		if (sss[0] == "UPD") {
			if (sss[1] != "") {
				addIndexAppint = sss[1];
			} else {
				addIndexAppint = addIntoRowNum();//从空缺行开始加
			}
		}else if (sss.length == 1) { // 值>
			recentValue = sss[0];
			if(recentValue==null){
				recentValue="";
			}
			$("#"+tableId)[0].rows[addIndexAppint].cells[recentColIndex].lastChild.innerText = replace(recentValue);
			recentColIndex++;
		}
	}
	startEdit(getEditRow(),getEditCol());
}

function getData(colSep, rowSep, colNameArr){
	var data = "";
	for(var i=0; i<getRowsCount(); i++){
		for(var j=0; j<colNameArr.length; j++){
			var col = getColNumByName(colNameArr[j]);
			if(col != undefined){
				var colVal = getValueAt(i, col);
				data += j === colNameArr.length -1? colVal : colVal + colSep;
			}
		}
		data += rowSep;
	}
	return data;
}