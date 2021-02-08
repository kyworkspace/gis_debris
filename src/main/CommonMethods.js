import 'ol/ol.css';
import {View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS'
import { MAP_SERVER } from './Access';

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


// 조사사업 레이어 소스
let invServiceSource = null;
let invServiceLayer = new TileLayer({ //조사사업 표출용 레이어
  source:invServiceSource,
  crossOrigin: 'anonymous',
})

export const getInvServiceLayer =()=>{
    return invServiceLayer;
}
//조사사업 지도 정보 가져옴
  export const invServiceDisplay = (no) =>{
    invServiceSource= new TileWMS({
      url: MAP_SERVER,
      params: {
      'VERSION' : '1.3.0',
      'LAYERS' : 'REQM:ENG_INV',
      'CQL_FILTER' : 'seq_no = '+no,
      },
      crossOrigin: 'anonymous',
  });
  invServiceLayer.setSource(invServiceSource);
}
