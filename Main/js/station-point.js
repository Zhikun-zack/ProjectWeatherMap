let staPoint = {};
//Used to contain all the 'list' data value getting from http://data.cma.cn/dataGis/exhibitionData/getMarker
staPoint.rangeallList = [];

//Sending ajax quest and invoking 'drawPoint' function to draw 
staPoint.getPoint = function(dttime,funitemmenuid,province){
    $.ajax({
        url: ctx +'/exhibitionData/getMarker',
        type: 'get',
        dataType : 'json',
        async : true,
        data:{
            dateTime: dttime,
            funitemmenuid: funitemmenuid,
            province: province,
            typeCode: 'NWST',
        },
        success: function(result){
			staPoint.eleAttr = result.eleValue;
			if(province === '1000'){
				
				staPoint.drawPoint(result, funitemmenuid,globalParam.splitList);
				console.log('ok');
			} 
        }
    })
}

/**Using echart to draw all station Points
 * param splitList: color and range of each level, get from colormap.js setDataRange
 * */
staPoint.drawPoint = function(result, funitemmenuid, splitList){
	var mapChart = echarts.init(document.getElementById('mymap'))
	let list = result.list;
	let length = list.length;
	let eleAttr = result.eleValue;
	let unit = result.unit;
	let arrEle = eleAttr.split(',');
	if (length > 0){
		let data = [];
		var echartsData = [];
		let geoCoordMap = {};
		for (let i = 0; i < length; i++){
			let obj1 = {};
			obj1.name = list[i][arrEle[0]];
            obj1.value = list[i][arrEle[6]];
            obj1.stationId = list[i][arrEle[1]];
            obj1.stationName = list[i][arrEle[0]];
            obj1.lat = list[i][arrEle[2]];
            obj1.lon = list[i][arrEle[3]];
			obj1.stationLev = list[i][arrEle[5]];
			obj1.funitemmenuid = funitemmenuid;
			obj1.unit = unit;
			data.push(obj1);
			let obj2 = [];
			obj2.push(list[i][arrEle[3]]);
			obj2.push(list[i][arrEle[2]]);
			geoCoordMap[obj1.name] = obj2;
			echartsData.push([list[i][arrEle[3]],list[i][arrEle[2]], obj1.value,obj1]);
		}
		
	}
	
	//For echart visualMap
	let pieces = [];
	let color = [];

	let option = {
		coordinateSystem: 'leaflet',
		series: [{
			name: 'sk',
			type: 'scatter',
			data: echartsData,
		}],
	}
	staPoint.option = option;

	mapChart.setOption(option);


}

//Get the newest time
staPoint.getLastTime = function (funItemMenuId, position, isDefault, timeDifference) {
	$.ajax({
		url : ctx + "/multiExhibition/autoStationNewTime",
		type : "post",
		dataType : "json",
		async : false,
		data : {
			funItemMenuId : funItemMenuId,
			position : position,
			isDefault : isDefault,
			timeDifference : timeDifference
		},
		success : function(result) {
			if (result != undefined && result !== "") {
				staPoint.timeStr=result.timeStr;
				staPoint.datetime = result.datetime;
				staPoint.productCode = result.productCode;
				let time = staPoint.datetime;
				if(time == undefined || time === ""){
					let date = new Date();
					time = date.format("yyyy-MM-dd HH") + "时";
				}else{
					time = time.substring(0,4)+ "-" + time.substring(4,6)+ "-" + time.substring(6,8)+ " " + time.substring(8,10) + "时";
				}
			}else{

			}
		}
	});
}
//

export default staPoint