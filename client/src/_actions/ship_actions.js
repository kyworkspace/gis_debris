import {
    SHIP_LIST_INIT
} from './types';



export function ShipListInit(shipList){
    let jsonList = {};

    shipList.forEach((item)=>{
        jsonList[item.rfid_id==="0" ? item.ship_id : item.rfid_id] = item;
    })


    return {
        type : SHIP_LIST_INIT,
        payload:jsonList,
    }
}