//Create a object contain all the properties and functions and using ES6 export it
import {cRange} from './ChineseRange.js';

export let maphelper = {
	isMapInited: false,
	map: null,
	$elebox: null,
	$mapbox: null
};
//Init the map and give values to properties
maphelper.init = function (mapid,px,zoom){
    //init the map container
    var lmap = L.map(mapid,{
        crs: L.CRS.EPSG900913,
        center: {lon: px.x, lat: px.y},
        zoom: zoom,
        maxZoom: 10,
        minZoom: 4,
        attributionControl: false,
        zoomControl: false,
    });
    //init vector layer https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw
    var vector_url = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
    var vectormap = L.tileLayer(vector_url,{
        center: {lon: px.x, lat: px.y},
        id: 'mapbox.streets',
        zoom: zoom,
        maxZoom: 10,
        minZoom: 4,
    });
    //init satellite images layer
    var sat_url = "https://api.mapbox.com/styles/v1/yqcim/cizh1ma3400ez2so5x1anhuzo/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoieXFjaW0iLCJhIjoiY2l6ZmhnZjExMDBhajJ4cGxnNGN5MnhpdCJ9.pcZtdfk8mSFboCdwqkvW6g";
    var sat = L.tileLayer(sat_url,{
        center: {lon: px.x,lat:px.y},
        zoom:zoom,
        maxZoom: 10,
        minZoom: 4,
    });
    var terr_url = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
    var terr = L.tileLayer(terr_url,{
        center: {lon: px.x,lat:px.y},
        zoom:zoom,
        maxZoom: 10,
        minZoom: 4,
        id:'terrain-data',
    })
    //Add layer properties to maphelper
    maphelper.vectormap = vectormap;
    maphelper.sat = sat;
    maphelper.terr = terr;
    //Add layers to map container
    lmap.addLayer(vectormap);
    lmap.addLayer(sat);
    lmap.addLayer(terr)
    maphelper.map = lmap;
};
//Change the base map
maphelper.switchMap = function (maptype){
    switch (maptype) {
        case 'vectormap':
            maphelper.map.removeLayer(maphelper.sat)
            maphelper.map.removeLayer(maphelper.terr)
            maphelper.map.addLayer(maphelper.vectormap)
            break;
        case 'satellite':
            maphelper.map.removeLayer(maphelper.vectormap)
            maphelper.map.removeLayer(maphelper.terr)
            maphelper.map.addLayer(maphelper.sat)
            break;
        case 'terr':
            maphelper.map.removeLayer(maphelper.vectormap)
            maphelper.map.removeLayer(maphelper.sat)
            maphelper.map.addLayer(maphelper.terr)
            break;
        default:
            break;
    }
}

//Draw Chinese range
maphelper.drawChina = function(){
    var myStyle = {
        //"color": 'white',
        'weight': 2,
        'opacity': 0,
        'fillOpacity': 0
    }

    var cRangeLayer = L.geoJSON(cRange,{
        style: myStyle,
    }).addTo(maphelper.map);
    return cRangeLayer;
}


/**Add images
 *param imageUrl: url of images that you added
 *param minX, maxX: longitude of top-left and bottom-right 
 *param minY, maxY: latitude of bottom-right and top-left
*/
maphelper.addImage = function(imageUrl,minX,minY,maxX,maxY,f){
    var imageBounds = [[minY,minX],[maxY,maxX]];
    var imageOverlay = L.imageOverlay(imageUrl,imageBounds,{
        opacity: f
    }).addTo(maphelper.map);

    return {
        visable: function(flag) {
            imageOverlay._image.hidden = flag;
        },
        changeUrl: function(url, f){
            imageOverlay.setOpacity(f);
            imageOverlay.setUrl(url)
        },
        remove: function(){
            maphe
        }

    }
}