import React, { useEffect, useState } from 'react'
import 'ol/ol.css';
import { useDispatch, useSelector } from "react-redux";
import { InvestigationListInit, MarineZoneListInit } from '../../_actions/map_actions';
import { MainMap as map } from '../../entities/MapLayer';
import { InvService} from '../../entities/InvestigationZone'
import { getMarineZoneList } from '../../entities/MarineZone';
import LayerSelector from '../Navbar/Sections/LayerSelector';
import TrackSelector from '../Navbar/Sections/TrackSelector';

function MainMap() {

  const dispatch = useDispatch();
  const [MapTargetSet, setMapTargetSet] = useState(false)

  const mapReducer = useSelector(state => state.mapReducer);
  const {selectedTrackTarget} = mapReducer;


  useEffect(() => {
    map.setTarget("map");
    //레이어로드-양식장, 해구 return = map에 add된 레이어 리스트
    
    //조사사업 정보 목록 호출
    InvService.getInvestigationServiceList().then(result => {
      dispatch(InvestigationListInit(result));
    })
    //해구정보 목록 호출
    getMarineZoneList().then(result => {
      dispatch(MarineZoneListInit(result));
    })
    map.addLayer(InvService.getInvServiceLayer())
    setMapTargetSet(true);

  }, [])


  return (
    <>
    <div id="map" style={{ width: "100%", height: "100vh" }}></div>
      {MapTargetSet && <LayerSelector/>}
      {selectedTrackTarget && selectedTrackTarget.length>0 && <TrackSelector/>}
    </>
  )
}

export default MainMap
