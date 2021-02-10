import {getCenter} from 'ol/extent'
import { getMarineZoneLayer } from '../entities/MarineZone';
import GeoJSON from 'ol/format/GeoJSON';
import {
    LOAD_MARINE_ZONE,
    LOAD_MAIN_MAP,
    LOAD_INV_LIST,
    VIEW_INIT,
    LOAD_MARINE_ZONE_LIST,
    SELECT_VECTOR_LAYER,
} from './types';

export function LoadMarineZone(){
    let marineZoneLayer = getMarineZoneLayer();
    return {
        type: LOAD_MARINE_ZONE,
        payload: marineZoneLayer
    }
}
export function MainMapInit(MainMap){
    return {
        type : LOAD_MAIN_MAP,
        payload : MainMap
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
            coordinate : geomCheck ? getCenter(item.getGeometry().getExtent()):null
        }
        return convertResult;
    })
    return {
        type : LOAD_INV_LIST,
        payload : invListConvert
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

export function ViewInit(view){
    return {
        type : VIEW_INIT,
        payload : view,
    }

}

export function setSelectVectorLayer(selectedVectorLayer){
    return {
        type : SELECT_VECTOR_LAYER,
        payload : selectedVectorLayer
    }
}