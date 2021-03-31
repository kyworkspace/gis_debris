import 'ol/ol.css';
import {Feature} from 'ol';
import {Style,Stroke,Icon} from 'ol/style'
import {mapMove} from './CommonMethods'
import {Point,LineString} from 'ol/geom'
import $ from 'jquery'
import trackImage from '../Images/track/trackingRecordedShip.png'
import {trackSource} from './FeatureLayer'
/***********************
 * 항적정보를 처리하는 곳
 ***********************/

// 포인트색
const trackSearchDefaultPointColor = '#FA2020';
// 라인색
const trackSearchDefaultLineColor = '#2020FA';


// 항적 삭제
// const trackingRecordOff = function () {
//     MainMap.removeLayer(trackLayer);
  
//     trackSource.clear();
//     trackLayer = null;
//     trackSource = null;
//   };

//화살표 포인트
const record2ArrowPoint = function( coord, heading, color,mmsi ) {

    let point = new Feature({
      geometry: new Point(
        coord
      )
    });
    
    //  항적 포인트를 표현하는 이미지가 있을 경우.
    point.setStyle(new Style({
      image: new Icon(({
        anchor: [0.5, 0.5],
        anchorOrigin: 'top-left',
        offset: [0, 0],
        scale: 0.7,
        opacity: 1,
        rotation: heading,
        rotateWithView: false,
        src: trackImage,
      }))
    }));
    
    return point;
};
//화살표
const records2line = function( coords, params ) {
    let line;
    try {
      line = new Feature({
        geometry: new LineString( coords )
      });
    } catch( e ) { console.error( e.message ); return null; }
  
    line.setStyle(new Style({
      stroke: new Stroke({
        color: params.lineColor ? params.lineColor  : 'rgba( 255, 72, 101, 0.9 )',
        width: 2
      })
    }));
    return line;
  };
  


//트랙
export const parseShipHisRecords = function( records ,mmsi) {
    //	if(selectedTrackHis_mmsi != null){
    //		removeTrackHisRecord(mmsi);
    //	};
         
          let params ={
                  network_type : '',
                  searchKey : mmsi,
                  pointColor : trackSearchDefaultPointColor,
                  lineColor : trackSearchDefaultLineColor
          }	
        
          let coords4line = [];
    
          $.each( records, function( idx, record ) {
              record.sog = record.sog/10;
              record.cog = record.cog/10;
    
            let coord;
            // try {
            //   if( isEmpty( record.geom_lat ) || isEmpty( record.geom_lon ) ) return true;
            // } catch ( e ) {
            //   return true; 
            // }
    
            record["cog"] = record.cog <= 180
              ? record.cog
              : record.cog - 180
    
            coord = [record.geom_lon, record.geom_lat];
            if( !isCoord( coord ) ) return true;
    
            if( coord ) {
              coords4line.push( coord );
              if(record.heading > 360)
                  record.heading = record.cog;
              let heading = record.heading * Math.PI / 180
              
              let recordPoint = record2ArrowPoint( coord, heading, params.pointColor, mmsi );
              recordPoint.setProperties({
                record: record,
                visible: true,
                featureType: 'SHIP_RECORD_POINT',
                ship_id : params.searchKey,
                recordType: (params.network_type === '' ? 'all' : params.network_type)
              });
    
              try {
                recordPoint.set('category','trackHis');
                recordPoint.set('ship_id',record.mmsi); // 아이디
                recordPoint.set('id_type',record.ais_type);//아이디 타입
                recordPoint.set('ship_la',record.geom_lat);//경도
                recordPoint.set('ship_lo',record.geom_lon);//위도
                recordPoint.set('ship_recptn_dt',record.record_time);//수신시간
                recordPoint.set('ship_sog',record.sog);//속력
                recordPoint.set('ship_cog',record.cog);//코스
                recordPoint.set('ship_hdg',record.heading);//선수방위
                var proper = {
                    ship_id : record.mmsi
                }
                recordPoint.getGeometry().setProperties(proper);
                trackSource.addFeature( recordPoint );
              } catch ( e ) { console.error ( e.message ); return true; }
            }
          });
          
          if( coords4line.length >= 2 ) {
            let line = records2line( coords4line, params );
            if( line ) {
              line.setProperties({
                  visible: true,
                  featureType: 'SHIP_RECORD_LINE',
                  ship_id : params.searchKey,
                  recordType: (params.network_type === '' ? 'all' : params.network_type)
              });
              trackSource.addFeature( line );
    
              //  첫번째 포인트로 화면을 이동한다.
              let firstCoord = coords4line[0];
              mapMove(firstCoord);
            }
          }
          
          
        //   enc.on('click', function(evt) {
        //       var feature = enc.forEachFeatureAtPixel(evt.pixel,
        //         function(feature) {
        //           return feature;
        //         });
        //       if (feature.get('category') == 'trackHis') {
        //           shipClick(feature.getProperties());		    
        //       }
        // });
          
    };

//유효한 좌표 체계 인지 확인
const isCoord = function( str ) {
    str = String( str ).replace(',', ', ');
    
    //  2-3.4-16 가 맞지만 일단 루즈하게 허용 해 준다.
    let result = str.match(/(\d{1,3})(\.)(\d{1,16})/g);
    
    if( result === null ) result =  false;
    if( result.length % 2 === 0 ) {
        result = ( isValidPiece( 'la', result[0]) && isValidPiece( 'lo', result[1]) );
    }
    return result;
};
//좌표 포맷 확인
const isValidPiece = function( piece, val ) {
    //  포멧을 확인한다.
    if( !/^((\d{1,3})(\.)(\d{2,16}))/.test(val) ) return false;
  
    //  범위를 확인한다.
    switch( piece ) {
      case 'la' : 
        if( val <= -180 || val >= 180 ) return false;
        break;
      case 'lo' :
        if( val <= -90 || val >= 90 ) return false;
        break;
      default : 
        return false;
    }
    return true;
  };

//트랙 소스에서 삭제
export const removeTrackHisRecord = function( target_id ) {
        target_id = String(target_id);
        $.each(trackSource.getFeatures(), function(idx, feature){
            let ship_id = String(feature.getProperties().ship_id);
            if( ship_id === target_id ) {
              trackSource.removeFeature(feature);
            }
        });
  };

