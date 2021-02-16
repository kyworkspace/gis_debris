import React,{ useEffect, useState } from 'react'
import 'ol/ol.css';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS'
import { useDispatch } from "react-redux";
import {message} from 'antd';
import { MAP_SERVER } from '../../main/Access';
import { InvestigationListInit,MarineZoneListInit } from '../../_actions/map_actions';
import {view,MainMap as map} from '../../entities/CommonMethods';
import {getInvestigationServiceList, getInvServiceLayer} from '../../entities/InvestigationZone'
import { getMarineZoneList } from '../../entities/MarineZone';

function MainMap() {
    
    const [Center, setCenter] = useState(['126.929804','37.526908']);
    //const [Zoom, setZoom] = useState(1);
    const dispatch = useDispatch();
    
    useEffect(() => {
      map.setTarget("map");
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

      //조사사업 정보 목록 호출
      getInvestigationServiceList().then(result=>{
        dispatch(InvestigationListInit(result));
      })
      //해구정보 목록 호출
      getMarineZoneList().then(result=>{
        dispatch(MarineZoneListInit(result));
      })


      map.addLayer(marineZoneLayer);
      map.addLayer(cineralZoneLayer);
      map.addLayer(getInvServiceLayer());

    }, [])
    return (
        <div id = "map" style={{ width: "100%", height: "100vh" }}></div>
    )
}

export default MainMap
