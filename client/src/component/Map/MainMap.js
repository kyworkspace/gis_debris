import React, { useEffect, useState } from 'react'
import 'ol/ol.css';
import { useDispatch } from "react-redux";
import { InvestigationListInit, MarineZoneListInit, setLayerList } from '../../_actions/map_actions';
import { MainMap as map } from '../../entities/CommonMethods';
import { getInvestigationServiceList, getInvServiceLayer } from '../../entities/InvestigationZone'
import { getMarineZoneList } from '../../entities/MarineZone';
import { LoadLayer } from '../../entities/MapLayer';

function MainMap() {

  const [Center, setCenter] = useState(['126.929804', '37.526908']);
  //const [Zoom, setZoom] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    map.setTarget("map");

    //레이어로드-양식장, 해구 return = map에 add된 레이어 리스트
    const LayerList = LoadLayer();

    //조사사업 정보 목록 호출
    getInvestigationServiceList().then(result => {
      dispatch(InvestigationListInit(result));
    })
    //해구정보 목록 호출
    getMarineZoneList().then(result => {
      dispatch(MarineZoneListInit(result));
    })

    dispatch(setLayerList(LayerList))



    map.addLayer(getInvServiceLayer());

  }, [])



  return (
    <div id="map" style={{ width: "100%", height: "100vh" }}></div>
  )
}

export default MainMap
