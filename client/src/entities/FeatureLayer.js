import 'ol/ol.css';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS'
import { MAP_SERVER } from '../main/Access';
import {Style,Fill,Stroke,Circle,Icon} from 'ol/style'
import {Vector as VectorLayer} from 'ol/layer'
import {Vector as VectorSource} from 'ol/source'
import { MainMap as Map } from './MapLayer';
import {Feature} from 'ol';
import {Point,LineString} from 'ol/geom'
import videoPoint from '../Images/CCTV/CCTV_point.png'
/*****************************
 * 객체가 표출되는 레이어를 처리하는 곳
 ****************************/

export const LoadMarineZoneLayer=()=>{
    return new Promise((resolve,reject)=>{
        //해구 레이어
        let marineZoneLayer = new TileLayer({ //해구정보
            source: new TileWMS({
                url: MAP_SERVER,
                params: {
                    'VERSION': '1.3.0',
                    'LAYERS': 'REQM:small_trench_mapPolygon',
                },
                crossOrigin: 'anonymous',
            }),
            visible: true,
            type : "FeatureLayer",
            name : "MarineZoneLayer"
        })
        resolve(marineZoneLayer);
    })
}

export const LoadAquaFarmLayer=()=>{
    //양식장레이어
    let todayDate = new Date();
    let year = todayDate.getFullYear();
    let month = todayDate.getMonth() + 1 < 10 ? "0" + (todayDate.getMonth() + 1) : (todayDate.getMonth() + 1);
    let day = todayDate.getDate() < 10 ? "0" + todayDate.getDate() : todayDate.getDate();

    return new Promise((resolve,reject)=>{
        let cineralZoneLayer = new TileLayer({ //양식장정보
            source: new TileWMS({
                url: MAP_SERVER,
                params: {
                    'VERSION': '1.3.0',
                    'LAYERS': 'REQM:GOV_AQUQFARM',
                    'CQL_FILTER': "LICE_EDATE > '" + year + month + day + "'"
                },
                crossOrigin: 'anonymous',
            }),
            visible: true,
            type : "FeatureLayer",
            name : "AquaFarmLayer"
        })
        resolve(cineralZoneLayer);
    })
}

// 항적소스, 레이어
export const trackSource = new VectorSource({
    crossOrigin: 'anonymous'
});
export const trackLayer = new VectorLayer({
    source: trackSource,
    crossOrigin: 'anonymous',
    style : new Style({
      fill : new Fill({
        color: 'rgba( 255, 72, 101, 0.9 )',
      }),
      stroke: new Stroke({
        color: 'rgba( 255, 72, 101, 0.9 )',
        width: 2
      }),
      image: new Circle({
        radius: 2,
        fill: new Fill({
          color: 'rgba( 255, 72, 101, 0.9 )'
        })
      })
    }),
    type : "FeatureLayer",
    name : "TrackLayer"
  });


/**
 * 비디오 feature
 * 한개의 포인트로 돌려쓸 것이기 때문에
 * 포인트가 이동할때 마다 AddFeature가 아닌 setCoordi 형태로 한다.
 * **/
export const videoFeature = new Feature({
})
var iconStyle  = new Style({
    image: new Icon({
        scale:0.1,
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: videoPoint,
    }),
  });
videoFeature.setStyle(iconStyle)
/****
 * 비디오 벡터 소스
 * ****/
export const videoSource = new VectorSource({
    crossOrigin: 'anonymous'
});
videoSource.addFeatures([videoFeature])
/****
 * 비디오 벡터 레이터
 * ****/
export const videoLayer = new VectorLayer({
    source: videoSource,
    crossOrigin: 'anonymous',
    type : "FeatureLayer",
    name : "VideoLayer"
  });

LoadMarineZoneLayer().then(response=>{
    Map.addLayer(response);
})
LoadAquaFarmLayer().then(response=>{
    Map.addLayer(response);
})
// LoadTrackLayer().then(response=>{
//     Map.addLayer(response);
// })
Map.addLayer(trackLayer);
Map.addLayer(videoLayer);