import {
    LOAD_MARINE_ZONE,
    LOAD_INV_LIST,
    LOAD_COL_LIST,
    LOAD_MARINE_ZONE_LIST,
    SELECT_VECTOR_LAYER,
    ADD_TRACK_TARGET_TO_STORE,
    SET_TRACK_VISIBILITY,
    SHIP_LIST_INIT
} from '../_actions/types';
 

export default function(state={},action){
    switch(action.type){
        case LOAD_MARINE_ZONE:
            return {...state, marineZoneLayer: action.payload }
        case LOAD_INV_LIST:
            return {...state, invList: action.payload}
        case LOAD_COL_LIST : 
            return {...state, colList : action.payload}
        case LOAD_MARINE_ZONE_LIST:
            return {...state, marineZoneList : action.payload}
        case SELECT_VECTOR_LAYER:
            return {...state, selectedVectorLayer:action.payload}
        case ADD_TRACK_TARGET_TO_STORE:
            //리덕스에 배열형태로 저장
            let TargetList=[];
            //기존에 저장된거 있으면 그거 스프레드로 이어붙일거임
            if(state.selectedTrackTarget){
                //같은거 검색했는지 찾고 있으면 삭제
                let removeIdx = -1;
                state.selectedTrackTarget.map((item,idx)=>{
                    if(item.id === action.payload.id){
                        removeIdx = idx;
                    }
                })
                //삭제
                if(removeIdx >-1){
                    state.selectedTrackTarget.splice(removeIdx,1);
                }
                
                TargetList = [
                    ...state.selectedTrackTarget
                ]
            }
            //새로운거를 넣어서
            TargetList.push(action.payload)
            //리턴
            return {...state, selectedTrackTarget :TargetList}
        case SET_TRACK_VISIBILITY:
            //리덕스에 배열형태로 저장
            let VisibleList=[...state.selectedTrackTarget];
            //기존에 저장된거 있으면 그거 스프레드로 이어붙일거임
            if(VisibleList){
                //같은거 검색했는지 찾고 있으면 visible false
                VisibleList.map((item,idx)=>{
                    if(item.id === action.payload.id){
                        item.visible = action.payload.visible
                    }
                })
            }
            return {...state,selectedTrackTarget : VisibleList}
        default:
            return state;
    }
}