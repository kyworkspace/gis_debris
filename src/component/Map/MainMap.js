import React,{ useEffect, useState } from 'react'
import 'ol/ol.css';
import {Map,View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS'
import GeoJSON from 'ol/format/GeoJSON';
import $ from 'jquery';
import { useDispatch } from "react-redux";
import {message} from 'antd';
import { MAP_SERVER } from '../../main/Access';
import { InvInit } from '../../_actions/map_actions';
import {view} from '../../main/CommonMethods';
import {getInvServiceLayer} from '../../main/CommonMethods'

function MainMap() {
    
    const [Center, setCenter] = useState(['126.929804','37.526908']);
    //const [Zoom, setZoom] = useState(1);
    const dispatch = useDispatch();
    

    const MainMap = new Map({
        target: null,
        layers: [
          new TileLayer({
            source: new OSM()  //기본 레이어, 오픈레이어스에서 제공하는 지형정보를 가져온다.
          })
        ],
        view: view
      });

    useEffect(() => {
      MainMap.setTarget("map");
      message.warn("해구정보를 불러옵니다.")
      let marineZoneLayer = new TileLayer({ //해구정보
        source:new TileWMS({
          url : MAP_SERVER,
          params: {
            'VERSION' : '1.3.0',
            'LAYERS' : 'REQM:small_trench_mapPolygon',
          },
          crossOrigin: 'anonymous',
        })
      })
      message.success("해구정보를 성공적으로 불러왔습니다.")


      let todayDate = new Date();
      let year = todayDate.getFullYear();
      let month = todayDate.getMonth()+1 < 10 ? "0"+(todayDate.getMonth()+1):(todayDate.getMonth()+1);
      let day = todayDate.getDate() <10 ? "0"+todayDate.getDate() :todayDate.getDate();
      message.warn("양식장정보를 불러옵니다.")
      let cineralZoneLayer = new TileLayer({ //양식장정보
        source:new TileWMS({
          url : MAP_SERVER,
          params: {
            'VERSION' : '1.3.0',
            'LAYERS' : 'REQM:GOV_AQUQFARM',
            'CQL_FILTER' : "LICE_EDATE > '"+year+month+day+"'"
          },
          crossOrigin: 'anonymous',
        })
      })
      message.success("양식장정보를 성공적으로 불러왔습니다.")

      //조사사업 목록 불러오기
      let parser = new GeoJSON();
      message.warn("조사사업 목록을 불러옵니다.")
      $.ajax({ //그리드형 데이터
          url: MAP_SERVER,
          dataType: 'json',
          data : {
              "service" : "WFS",
              "request" : "GetFeature",
              "version" : "1.3.0",
              "typeName" : "REQM:ENG_INV",
              "outputFormat" : "application/json",
          },
          jsonpCallback: 'parseResponse'
      }).then((response)=>{
          let result = parser.readFeatures(response);
          message.success("조사사업 목록을 성공적으로 불러왔습니다.")
          dispatch(InvInit(result));
      })


      MainMap.addLayer(marineZoneLayer);
      MainMap.addLayer(cineralZoneLayer);
      MainMap.addLayer(getInvServiceLayer());

    }, [])
    return (
        <div id = "map" style={{ width: "100%", height: "100vh" }}></div>
    )
}

export default MainMap
