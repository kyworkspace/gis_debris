import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS'
import { MAP_SERVER } from '../main/Access';
import $ from 'jquery';

/*********************************
 * 조사사업 관련한 정보를 처리하는 곳
**********************************/
// 조사사업 레이어 소스

class InvestigationService {
  invServiceSource = null;

  constructor(){
    this.invServiceLayer = new TileLayer({ //조사사업 표출용 레이어
      source: this.invServiceSource,
      crossOrigin: 'anonymous',
      type : "FeatureLayer",
      name : "Investigation Service Layer"
    })
  }
  /**
   * 조사사업 표출 정보
   * @param seq_id
   * **/
  invServiceDisplay(no){
    this.invServiceSource =  new TileWMS({
      url: MAP_SERVER,
      params: {
        'VERSION': '1.3.0',
        'LAYERS': 'REQM:ENG_INV',
        'CQL_FILTER': 'seq_no = ' + no,
      },
      crossOrigin: 'anonymous',
    });
    this.invServiceLayer.setSource(this.invServiceSource);
  }
  
  /***
   * 조사사업 목록 호출
   * ***/
  getInvestigationServiceList(){
    return new Promise((resolve, reject) => {
      $.ajax({ //그리드형 데이터
        url: MAP_SERVER,
        dataType: 'json',
        data: {
          "service": "WFS",
          "request": "GetFeature",
          "version": "1.3.0",
          "typeName": "REQM:ENG_INV",
          "outputFormat": "application/json",
        },
        jsonpCallback: 'parseResponse'
      }).then((response) => {
        resolve(response)
      })
    })
  }
  getInvServiceLayer(){
    return this.invServiceLayer;
  }
  

}

export const InvService = new InvestigationService();