import {getCenter} from 'ol/extent'
import { MarineZone } from '../entities/MarineZone';
import {
    LOAD_MARINE_ZONE,
    LOAD_MAIN_MAP,
    LOAD_INV_LIST,
    VIEW_INIT
} from './types';

export function LoadMarineZone(){
    let marineZoneLayer = MarineZone();
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
export function InvInit(invList){
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
export function ViewInit(view){
    return {
        type : VIEW_INIT,
        payload : view,
    }

}