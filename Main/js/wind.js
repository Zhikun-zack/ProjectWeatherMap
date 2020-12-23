import staPoint from "./station-point"
import {maphelper} from './maphelper'

let velocityLayer;
/**
 * Main function, using drawWind and removeWind to show and cancel wind map
 */
export function windyShow(dateTime){
    var url =     
    ctx +
    "/gis/getJson?funItemMenuId=115990104&dateTime=" +
    dateTime +
    "&position=JSON_CHN";
    removeWind();
    drawWind(url);
    console.log('url')
}

/**
 * Remove wind layer or color map
 */

export function removeWind(){
    if (velocityLayer != null && typeof velocityLayer != 'undefined'){
        maphelper.map.removeLayer(velocityLayer)
    }
    if(staPoint.img) {
        staPoint.img.changeUrl(ctx +'/ultra/img/gis/me_noProduct.png',0);
    }
}

/**
 * Get data and draw wind map using outside library "leaflet-velocity.js"
 */
export function drawWind (url){
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data){
            if (data && data.DS && data.DS.content){
                //data = new Function("return " + data.DS.content)();
                var data1 = data.DS.content
                //type of data1 is string, data3 is object, input data of velocitylayer should be object so we need to parse
                var data3 = JSON.parse(data1)
            }
            else{
                return;
            }


            
            velocityLayer = L.velocityLayer({
                displayValues: true,
                displayOptions: {
                    velocityType: 'Wind',
                    displayPosition: 'bottomleft',
                    displayEmptyString: 'No wind data'
                },
                data: data3,
                velocityScale: 0.02,
                particleAge: 40,
                lineWidth: 1,
                particleMutiplier: 1 / 800,
                frameRate: 18,
                colorScale: [
                    "#fff",
                    "#fff",
                    "#fff",
                    "#fff",
                    "#fff",
                    "#fff",
                    "#fff",
                    "#fff",
                    "#fff",
                    "#fff",
                    "#fff",
                    "#fff",
                    "#fff"
                ]
            });
            maphelper.map.addLayer(velocityLayer);
        }
    });
}
