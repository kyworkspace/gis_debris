import 'ol/ol.css';
import MousePosition from 'ol/control/MousePosition'
import { createStringXY } from 'ol/coordinate';
import {view} from './MapLayer'
import Axios from 'axios';

/************************************
 * 공통적으로 쓰이는 함수를 처리하는 곳
 * **********************************/

/***
 * 좌표 이동 함수 
 * 
 * [] 형태로 경도, 위도 필요
 * 
 * **/
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
  undefinedHTML: '&nbsp;',
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


/**
 * 사진을 드랍존에 떨어뜨릴 경우.
 * 루트 파일에 업로드함
 * 경로는 uploads/pictures
 * **/
export const pictureInsert = (file)=>{
  const formData = new FormData();
      const config ={
          header : {'content-type':'multipart/form-data'}
      }
      formData.append("file",file)
  return new Promise((resolve,reject)=>{
      Axios.post("/gis/file/upload/picture",formData,config)
      .then(response=>{
          resolve(response);
      })
  })
}


/**
 * 무한 스크롤할때 페이지 순차 처리할 큐
 * **/
// export class Queue {
//   constructor() {
//       this._arr = [];
//     }
//     enqueue(item) {
//       this._arr.push(item);
//     }
//     dequeue() {
//       return this._arr.shift();
//     }
// }

/**
 *  * 날짜 계산해서 yyyy-mm-ddThh24:mi  형태로 바꿔주는거 
 * **/
export const dateToString=(Date)=>{

  const year = Date.getFullYear();
  const month = Date.getMonth()+1>=10?Date.getMonth()+1:"0"+(Date.getMonth()+1);
  const date = Date.getDate()>=10?Date.getDate():"0"+(Date.getDate());
  const hour = Date.getHours()>=10 ? Date.getHours() : "0"+Date.getHours();
  const min = Date.getMinutes()>=10 ? Date.getMinutes() : "0"+Date.getMinutes();

  return year+"-"+month+"-"+date+"T"+hour+":"+min;
}

/**
 * JSON TO Array
 * **/
export const JsonToArray=(object)=>{
  let returnArr = [];
  const jsonKeys = Object.keys(object);
  for(let i =0 ;i <jsonKeys.length ; i++ ){
    returnArr.push(object[jsonKeys[i]]);
  }
  return returnArr;
}

/**
 * VPASS -> 공통양식으로 값바꿔줌
 * **/
export const VpassTrackConverter = (vpassTrack)=>{
   
  let trackList = vpassTrack.map(item=>{
    let obj = new Object();
   obj.mmsi = item.rfid_id;
   obj.cog = item.rfid_cog;
   obj.sog = item.rfid_sog;
   obj.geom_lon = item.rfid_lon/600000;
   obj.geom_lat = item.rfid_lat/600000;
   obj.heading = item.rfid_hdg;
   obj.rot = item.rfid_cog;

   return obj;
  })

  return trackList;
}
export const trackTermSearch=(startDate,term)=>{
  let returnStr = [];
  for(let i = 0 ; i < term+1; i++){
      let startTerm = new Date(startDate);
      let tmpDate = new Date();
      tmpDate.setFullYear(startTerm.getFullYear());
      tmpDate.setMonth(startTerm.getMonth());
      tmpDate.setDate(startTerm.getDate()+i);
      
      returnStr.push(`th_track_${dateyyyymmdd(tmpDate)}`);
  }
  return returnStr;
  
}
const dateyyyymmdd=(Date)=>{
  let year = Date.getFullYear();
  let month = Date.getMonth()+1 >= 10 ? Date.getMonth()+1 : "0"+(Date.getMonth()+1);
  let date = Date.getDate() >= 10 ? Date.getDate() : "0"+Date.getDate();

  return year+""+month+""+date;
}
