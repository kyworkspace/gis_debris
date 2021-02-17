import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS'
import { MAP_SERVER } from '../main/Access';
import $ from 'jquery';
import axios from 'axios';

/*********************************
 * 조사사업 관련한 정보를 처리하는 곳
**********************************/

// 조사사업 레이어 소스
let invServiceSource = null;
let invServiceLayer = new TileLayer({ //조사사업 표출용 레이어
  source:invServiceSource,
  crossOrigin: 'anonymous',
})

export const getInvServiceLayer =()=>{
    return invServiceLayer;
}
//조사사업 지도 정보 가져옴
  export const invServiceDisplay = (no) =>{
    invServiceSource= new TileWMS({
      url: MAP_SERVER,
      params: {
      'VERSION' : '1.3.0',
      'LAYERS' : 'REQM:ENG_INV',
      'CQL_FILTER' : 'seq_no = '+no,
      },
      crossOrigin: 'anonymous',
  });
  invServiceLayer.setSource(invServiceSource);
}


//조사사업 목록 불러오기
export const getInvestigationServiceList=async()=>{
    return new Promise((resolve,reject)=>{
            $.ajax({ //그리드형 데이터
                url: MAP_SERVER,
                dataType: 'json',
                data : {
                    "service" : "WFS",
                    "request" : "GetFeature",
                    "version" : "1.3.0",
                    "typeName" : "REQM:ENG_INV",
                    "outputFormat" : "application/json",
                },
                jsonpCallback: 'parseResponse'
            }).then((response)=>{
                resolve(response)
            })
        })
    
}
