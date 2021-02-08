import {
    LOAD_MARINE_ZONE,
    LOAD_MAIN_MAP,
    LOAD_INV_LIST,
    VIEW_INIT
} from '../_actions/types';
 

export default function(state={},action){
    switch(action.type){
        case LOAD_MARINE_ZONE:
            return {...state, marineZoneLayer: action.payload }
        case LOAD_MAIN_MAP:
            return {...state, mainMap: action.payload }
        case LOAD_INV_LIST:
            return {...state, invList: action.payload}
        case VIEW_INIT:
            return {...state, view: action.payload}
        default:
            return state;
    }
}