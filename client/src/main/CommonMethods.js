import 'ol/ol.css';
import {Map,View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';


//지도에 들어가는 뷰
export const view = new View({
    projection: "EPSG:4326",
    center: ['126.929804','37.526908'], //최초 좌표
    maxZoom : 23,
    minZoom: 1,
    zoom: 7
  })
  
//좌표 이동 함수
export const mapMove =(coordinate)=>{
    view.animate({
        center:coordinate,
        duration: 1000,
        zoom : 12
    })
}
//지도레이어
export const MainMap = new Map({
    target: null,
    layers: [
      new TileLayer({
        source: new OSM()  //기본 레이어, 오픈레이어스에서 제공하는 지형정보를 가져온다.
      })
    ],
    view: view
  });

export const selectedMarineZone = undefined;