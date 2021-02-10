import 'ol/ol.css';
import {View} from 'ol';


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
