import staPoint from "./station-point";
import {maphelper} from './maphelper';
import {common} from './common';

/**
 * Get the colormap url and add it to basemap
 * param typeCode: type of color map, we can see from "http://data.cma.cn/dataGis/gis.html"
 * param dateTime: input date time
 * these two param are also for sending ajax query
 */
export function getColorMap(typeCode,dateTime){
    $.ajax({
        url: ctx +'/gis/getColorMap',
        type: 'get',
        dataType: 'json',
        async: false,
        data:{
            typeCode: typeCode,
            dateTime: dateTime,
        },
        success: function(result){
            if(result.returnCode === '0'){
                globalParam.fcstDateTime = result.DS.D_DATETIME;
                //if basemap has already contained image, change it
                if(staPoint.img){
                    staPoint.img.changeUrl(result.DS.url,0.8);
                } else{
                    staPoint.img = maphelper.addImage(
                        result.DS.url,
                        72.4,
                        15.5,
                        136.5,
                        54.5,
                        0.8
                    );
                }
            }
        },
    

    })
}

/**
 * Get the legend color and the range of value for each color
 * Calling the setDataRange function and get the range
 */
export function getLegend(funItemMenuId, position){
    $.ajax({
        url : ctx + "/multiExhibition/getLegend",
        type : "GET",
        dataType: 'json',
        data: {
            funItemMenuId: funItemMenuId,
            position: position,
        },
        success: function (result){
            setDataRange(result)
        }
    })
}
/**
 * Get the start temperature and end temperature of each level
 * Return: list, contain each level's color and range(start, end)
 */
export function setDataRange(result){
    globalParam.splitList = [];
    let list = result.list;
    let len = list.length;
    for (let i = 0; i < len; i++){
        let obj = {};
        let start = list[i].rule.split(',')[0];
        let end = list[i].rule.split(',')[1];
        if (start == ''){
            obj.end = parseInt(end);
            obj.color = list[i].color;
        }
        if (end == "") {
            obj.start = Number(start);
            obj.color = list[i].color;
        }
        if (start != "" && end != "") {
            obj.start = Number(start);
            obj.end = Number(end);
            obj.color = list[i].color;
        }
        globalParam.splitList.push(obj);
    }
    //console.log(globalParam.splitList)
    
}