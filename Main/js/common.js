//Using ES6 to import objects from outside
import {maphelper} from './maphelper';

export var common = common || {};
//Init map using maphelper's function
common.initMap = function (){
    maphelper.init('mymap',{
        x:104,
        y:36.5
    },3);
};
//Read in Cityid in China
common.getCityId = function(){
    $.ajax({
        url: './js/city.json',
        type: 'get',
        datatype: 'json',
        success: function(result){
            var jsonResult = JSON.parse(result);
            console.log(jsonResult[0]);
        }
    })
}

//Get temperature value 
common.getTemperature = function (cityid){
    $.ajax({
        url: "http://v0.yiketianqi.com/api?version=v61&appid=62451812&appsecret=Me3e4Ziu",
        type: 'get',
        //The data type of data you want to get
        datatype: 'json',
        async: false,
        timeout: 1500,
        //What you want to post to remote server
        data: {
            cityid : cityid,
        },
        success : function(result){
            console.log(result)
        }
    })
}


//Draw China

