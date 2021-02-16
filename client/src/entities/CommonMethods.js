import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { defaults as defaultControls } from 'ol/control';
import MousePosition from 'ol/control/MousePosition'
import { createStringXY } from 'ol/coordinate';

//지도에 들어가는 뷰
export const view = new View({
  projection: "EPSG:4326",
  center: ['126.929804', '37.526908'], //최초 좌표
  maxZoom: 23,
  minZoom: 1,
  zoom: 7
})

//좌표 이동 함수
export const mapMove = (coordinate) => {
  view.animate({
    center: coordinate,
    duration: 1000,
    zoom: 12
  })
}


export const mousePositionControl = new MousePosition({
  coordinateFormat: createStringXY(4),
  projection: 'EPSG:4326',
  // comment the following two lines to have the mouse position
  // be placed within the map.
  target: document.getElementById('lonlati'),
  undefinedHTML: '&nbsp;',
});

//지도레이어
export const MainMap = new Map({
  controls: defaultControls().extend([mousePositionControl]),
  target: null,
  layers: [
    new TileLayer({
      source: new OSM()  //기본 레이어, 오픈레이어스에서 제공하는 지형정보를 가져온다.
    })
  ],
  view: view
});

export const selectedMarineZone = undefined;
//날짜 변환 메서드
export const stringToDate = (StringDate) => {

  let dateTime = new Date(StringDate);
  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1 > 10 ? (dateTime.getMonth() + 1) : "0" + (dateTime.getMonth() + 1);
  const date = dateTime.getDate() > 10 ? dateTime.getDate() : "0" + dateTime.getDate();

  return year + "-" + month + "-" + date;
}

export const stringToTime = (StringDate) => {

  let dateTime = new Date(StringDate);
  const hour = dateTime.getHours() > 10 ? dateTime.getHours() : "0" + dateTime.getHours();
  const min = dateTime.getMinutes() > 10 ? dateTime.getMinutes() : "0" + dateTime.getMinutes();

  const label = hour - 12 > 0 ? "오후" : "오전"

  return label + " " + hour + ":" + min;

}