import axios from "axios";

/****************************
 * 콜백 함수 처리
 * 
 * 명명 법
 * 
 * select~List : 목록 가져오기
 * get~ : 단일 정보 가져오기
 * get~Detail : 단일 상세정보 가져오기
 * get~List : 단일 상세 정보 목록 가져오기
 * get~Count : 갯수 가져오기
 * ***************************/



/****
 * 단일 항적 목록 호출
 * @param OBJECT
 * @param mmsi
 * @param name
 * @param startDate
 * @param endDate
 * @param visible
 * let body={
        mmsi : 
        name : 
        startDate : 
        endDate : 
        visible : true
      }
 * ****/
export const getTrackList=(body)=>{
    return new Promise((resolve,reject)=>{
        axios.post("/gis/track/track",body)
            .then(response=>{
            resolve(response)
        })
    })
}
/******
 * 항적을 가진 선박 목록 호출
 * @param OBJECT
 * @param shipName
 * @param shipType
 * @param startDate
 * @param endDate
 * ****/
export const selectTrackList=(body)=>{
    return new Promise((resolve,reject)=>{
        axios.post("/gis/track/list",body)        
        .then(response=>{
            resolve(response)
        })
    })
}

export const getCollectionService=(seq_no)=>{

}

/**
 * 수거사업 목록 가져오기
 * @param OBJECT
 * @param year
 * @param city
 * @param region
 * **/
export const selectCollectionServiceList=(body)=>{
    return new Promise((resolve,reject)=>{
        axios.post("/gis/eng/colList",body)
        .then(response=>{
            resolve(response)
        })
    })
}