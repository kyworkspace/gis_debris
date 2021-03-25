import {
    SHIP_LIST_INIT
} from '../_actions/types';
 

export default function(state={},action){
    switch(action.type){
        case SHIP_LIST_INIT:
            return {...state, shipList: action.payload }
        default:
            return state;
    }
}