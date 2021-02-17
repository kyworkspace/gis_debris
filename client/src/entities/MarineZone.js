import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import { MAP_SERVER } from '../main/Access';
import $ from 'jquery';

/*********************************
 * 해구정보 관련한 정보를 처리하는 곳
**********************************/

export function getMarineZoneLayer() {
    let marineZoneLayer = new TileLayer({
        source:new TileWMS({
          url : MAP_SERVER,
          params: {
            'VERSION' : '1.3.0',
            'LAYERS' : 'REQM:small_trench_mapPolygon',
          },
          crossOrigin: 'anonymous',
        })
      })
      return marineZoneLayer
}

export function getMarineZoneList(){
  return new Promise((resolve,reject)=>{
      $.ajax({
        url: MAP_SERVER,
        dataType: 'json',
        data : {
          "service" : "WFS",
          "request" : "GetFeature",
          "version" : "1.3.0",
          "typeName" : "REQM:small_trench_mapPolygon",
          "outputFormat" : "application/json",
        },
        jsonpCallback: 'parseResponse'
      }).then(response=>{
        resolve(response)
      })
  })
    
}

export function getMarineZone(id){
  return new Promise((resolve,reject)=>{
      $.ajax({
        url: MAP_SERVER,
        dataType: 'json',
        data : {
          "service" : "WFS",
          "request" : "GetFeature",
          "version" : "1.3.0",
          "typeName" : "REQM:small_trench_mapPolygon",
          "outputFormat" : "application/json",
          "CQL_FILTER" : `salareano = ${id}`
        },
        jsonpCallback: 'parseResponse'
      }).then(response=>{
        resolve(response)
      })
  })
    
}
