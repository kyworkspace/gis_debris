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
 * @param countPerPage
 * @param startRowNumber
 * @param endRowNumber
 * @param page
 * **/
export const selectCollectionServiceList=(body)=>{
    return new Promise((resolve,reject)=>{
        axios.post("/gis/eng/colList",body)
        .then(response=>{
            resolve(response.data)
        })
    })
}
/**
 * File 업로드
 * @param OBJECT
 * {
 *    target_table : 대상 테이블
 *    target_seq : 대상 시퀀스
 *    files : [] 파일 정보 목록
 * }
 * @returns Promise
 */
export const FileUpload =(body)=>{
    return new Promise((resolve,reject)=>{
      axios.post("/gis/file/upload",body)
      .then(response=>{
        resolve(response.data);
      })
    })
  }
  /** 
   * File List 가져오기
   * @param OBJECT
   * {
   *    target_table : 대상 테이블
   *    target_seq : 대상 시퀀스
   * }
   */
  export const selectFileList =(body)=>{
      return new Promise((resolve,reject)=>{
          axios.post("/gis/file/list",body)
          .then(response=>{
              resolve(response.data);
          })
      })
  }
  /** 
   * 특정 row 데이터와 관련된 파일 데이터 전체 삭제
   * @param OBJECT
   * {
   *    target_table : 대상 테이블
   *    target_seq : 대상 시퀀스
   * }
   */
  export const deleteFileAll =(body)=>{
    return new Promise((resolve,reject)=>{
        axios.post("/gis/file/deleteAll",body)
        .then(response=>{
            resolve(response.data);
        })
    })
  }