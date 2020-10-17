/**
 * 输入值的函数入口
 */
function setValue(rows,cols,value){
    var editor = getCellEditor(rows,cols);
    if(editor === "复选"){
        for(var i=0;i<setListennerArray.length;i++){
            setListennerArray[i](rows,cols,value);
        }
        return;
    }
    $("#"+tableId)[0].rows[rows].cells[cols].children[0].innerHTML=value;
    for(var i=0;i<setListennerArray.length;i++){
        setListennerArray[i](rows,cols,value);
    }
}
function sleep(n) { // n表示的毫秒数
    var start = new Date().getTime();
    while (true)
        if (new Date().getTime() - start > n)
            break;
}
/**
 * 选择的函数入口
 */

function setSelect(newStartRow, newStartCol, newEndRow, newEndCol, newSelRowArr){
	if(getRowsCount()<1) return;
	var comVal;
	var lastStartRow = startRow;
	var lastEndRow = endRow;
	var lastStartCell = startCol;
	var lastEndCol = endCol;
	var lastSelRowArr = selRowArr;
	
	startRow = newStartRow;
	endRow = newEndRow;
	startCol = newStartCol;
	endCol = newEndCol;
	selRowArr = newSelRowArr;
	
    //sleep(10000)
    for (var b = 0; b < tdList.length; b++) {
        restoreColor(b);
    }

    //改变行的颜色
    if(selRowArr && selRowArr.length>0){
        for(var i=0;i<selRowArr.length;i++){
            var selectedTr = document.getElementById(tableId).rows[selRowArr[i]];
            for (var d = 0; d < selectedTr.children.length; d++) {
            	$(selectedTr.children[d]).find(".text").css("backgroundColor", "#cfe0ff");
            }
        }
    }else {
    	comVal = compareSize(newStartRow, newStartCol, newEndRow, newEndCol);
    	for (var j = comVal.startRow; j < comVal.endRow + 1; j++) {
             var selectedTr = document.getElementById(tableId).rows[j];
             for (var d = 0; d < getColsCount(); d++) {
            	 if(d>=comVal.startCol && d < comVal.endCol + 1){
            		 $(selectedTr.children[d]).find(".text").css("backgroundColor", "#a4dcf7");
            	 } else {
            		 $(selectedTr.children[d]).find(".text").css("backgroundColor", "#cfe0ff");
            	 }
             }
        }
    }
    for(var i=0;i<selListennerArray.length;i++){
    	 selListennerArray[i](lastStartRow,lastStartCell,lastEndRow,lastEndCol,lastSelRowArr);
    }
}

function dragDone(newStartRow, newStartCol, newEndRow, newEndCol){
    for(var i=0;i<dragDoneListennerArray.length;i++){
        dragDoneListennerArray[i](newStartRow, newStartCol, newEndRow, newEndCol);
    }
}