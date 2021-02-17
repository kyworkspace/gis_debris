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
  //target: document.getElementById('lonlati'),
  undefinedHTML: '&nbsp;',
});

//지도레이어
export const MainMap = new Map({
  // controls: defaultControls().extend([mousePositionControl]),
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


export const formatLat = (latitude, flag) => {
  var val;
  var lat = funcDegressToDMS(latitude);
  if (Number(latitude) > 90 || Number(latitude) < -90) {
    val = 'N/A';
  } else {
    if (Number(latitude) > 0) {
      if (flag == 0) {
        val = "N " + lat.d + "º " + lat.m + "' " + convertZero(Number(lat.s)) + '"';
      } else {
        val = "N " + Number(latitude).toPrecision(8) + "º";
      }
      //            val = "N " + lat.d + "º " + lat.m + "' " + Number(lat.s).toFixed(2) + '"';
    } else {
      if (flag == 0) {
        val = "S " + Math.abs(Number(lat.d)) + "º " + lat.m + "' " + convertZero(Number(lat.s)) + '"';
      } else {
        val = "S " + Math.abs(Number(latitude)).toPrecision(8) + "º";
      }
      //            val = "S " + Math.abs(Number(lat.d)) + "º " + lat.m + "' " + Number(lat.s).toFixed(2) + '"';
    }
  }
  return val;
}


export const formatLon = (longitude, flag) => {
  var val;
  var lon = funcDegressToDMS(longitude);
  if (Number(longitude) > 180 || Number(longitude) < -180) {
    val = 'N/A';
  } else {
    if (Number(longitude) > 0) {

      if (flag == 0) {
        val = "E " + lon.d + "º " + lon.m + "' " + convertZero(Number(lon.s)) + '"';
      } else {
        val = "E " + Number(longitude).toPrecision(9) + "º";
      }
      //          val = "E "+lon.d+"º "+lon.m+"' "+Number(lon.s).toFixed(2)+'"';
    } else {
      if (flag == 0) {
        val = "W " + Math.abs(Number(lon.d)) + "º " + lon.m + "' " + convertZero(Number(lon.s)) + '"';
      } else {
        val = "W " + Math.abs(Number(longitude)).toPrecision(9) + "º";
      }
      //            val = "W "+Math.abs(Number(lon.d))+"º "+lon.m+"' "+Number(lon.s).toFixed(2)+'"';
    }
  }

  return val;
}



export const convertZero = (value) => {
  let result;
  if (value === undefined) {
    result = '-'
  } else {
    var fix = Number(value).toFixed(2);
    for (var i = fix.length - 1; i < 0; i++) {
      if (fix[i] == "0") {
        fix.substring(0, fix.length - 1);
      } else if (fix[i] == ".") {
        fix.substring(0, fix.length - 1);
        break;
      } else {
        break;
      }
    }
    result = Number(fix);
  }

  return result;
}


export const funcDegressToDMS = (ldDegress) => {
  ldDegress = parseFloat(ldDegress);
  var lrDMS = { d: 0, m: 0, s: 0 };
  var tmp;
  lrDMS.d = Math.floor(ldDegress);

  tmp = ((ldDegress * 100000000000000 - lrDMS.d * 100000000000000) / 100000000000000 * 60).toFixed(10);

  lrDMS.m = Math.floor(tmp);
  lrDMS.s = (tmp * 100000000000000 - lrDMS.m * 100000000000000) / 100000000000000 * 60;

  return lrDMS;
}

