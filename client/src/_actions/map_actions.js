import {getCenter} from 'ol/extent'
import { getMarineZoneLayer } from '../entities/MarineZone';
import GeoJSON from 'ol/format/GeoJSON';
import {
    LOAD_MARINE_ZONE,
    LOAD_INV_LIST,
    LOAD_COL_LIST,
    LOAD_MARINE_ZONE_LIST,
    SELECT_VECTOR_LAYER,
    ADD_TRACK_TARGET_TO_STORE,
    SET_TRACK_VISIBILITY
} from './types';

export function LoadMarineZone(){
    let marineZoneLayer = getMarineZoneLayer();
    return {
        type: LOAD_MARINE_ZONE,
        payload: marineZoneLayer
    }
}
export function InvestigationListInit(response){
    let parser = new GeoJSON();
    let invList = parser.readFeatures(response);
    let invListConvert = invList.map((item,i)=>{
        let geomCheck = item.getGeometry() ? true : false;
        let property = item.getProperties();
        let convertResult = {
            name : property.inv_name,
            agent : property.inv_ord_agent,
            city : property.inv_city,
            region : property.inv_region,
            place : property.inv_place,
            type : property.inv_type,
            source : property.inv_source,
            year : property.inv_year,
            area : property.inv_area,
            seq : property.seq_no,
            geomCheck : geomCheck,
            coordinate : geomCheck ? getCenter(item.getGeometry().getExtent()):null,
            coordinateAll : property.inv_coor1
        }
        return convertResult;
    })
    return {
        type : LOAD_INV_LIST,
        payload : invListConvert
    }
}
export function CollectionListInit(response){
    let colListConvert = response.map(item=>{
        let obj = {
            ...item,
            seq : parseInt(item.row)
        }
        return obj;
    })
    return {
        type : LOAD_COL_LIST,
        payload : colListConvert
    }
}
export function MarineZoneListInit(response){
    let parser = new GeoJSON();
    let marineZoneList = parser.readFeatures(response);
    let marineZoneListConvert = marineZoneList.map((item,i)=>{
        let property = item.getProperties();
        let convertResult = {
            ...property,
            seq : (i+1),
            id : property.salareano+property.salareasub,
            name : property.lreareano + "-" + property.salareasub,
            coordinate : getCenter(item.getGeometry().getExtent())
        }
        return convertResult;
    })
    return {
        type : LOAD_MARINE_ZONE_LIST,
        payload : marineZoneListConvert
    }
}


export function setSelectVectorLayer(selectedVectorLayer){
    return {
        type : SELECT_VECTOR_LAYER,
        payload : selectedVectorLayer
    }
}

export function AddTrackTargetToStore(Feature){
    Feature.key = Feature.mmsi;
    return {
        type : ADD_TRACK_TARGET_TO_STORE,
        payload : Feature
    }
}

export function setTrackHistoryVisibility(params){
    return {
        type : SET_TRACK_VISIBILITY,
        payload : params
    }
}
