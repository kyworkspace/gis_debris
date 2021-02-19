import React, { useEffect, useState } from 'react'
import 'ol/ol.css';
import { useDispatch } from "react-redux";
import { InvestigationListInit, MarineZoneListInit } from '../../_actions/map_actions';
import { MainMap as map } from '../../entities/MapLayer';
import { getInvestigationServiceList, getInvServiceLayer } from '../../entities/InvestigationZone'
import { getMarineZoneList } from '../../entities/MarineZone';
import { MainMap as Map } from '../../entities/MapLayer';
import {LoadAquaFarmLayer,LoadMarineZoneLayer,LoadTrackLayer} from '../../entities/FeatureLayer'
import LayerSelector from '../Navbar/Sections/LayerSelector';

function MainMap() {

  const dispatch = useDispatch();
  const [MapTargetSet, setMapTargetSet] = useState(false)

  useEffect(() => {
    map.setTarget("map");
    //레이어로드-양식장, 해구 return = map에 add된 레이어 리스트
    
    //조사사업 정보 목록 호출
    getInvestigationServiceList().then(result => {
      dispatch(InvestigationListInit(result));
    })
    //해구정보 목록 호출
    getMarineZoneList().then(result => {
      dispatch(MarineZoneListInit(result));
    })

    map.addLayer(getInvServiceLayer());
    setMapTargetSet(true);
  }, [])

  return (
    <>
    <div id="map" style={{ width: "100%", height: "100vh" }}></div>
      {MapTargetSet && <LayerSelector/>}
    </>
  )
}

export default MainMap
