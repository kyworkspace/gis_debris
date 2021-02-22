import 'ol/ol.css';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS'
import { message } from 'antd';
import { MAP_SERVER } from '../main/Access';
import {Style,Fill,Stroke,Circle,Icon} from 'ol/style'
import {Vector as VectorLayer} from 'ol/layer'
import {Vector as VectorSource} from 'ol/source'
import { MainMap as Map } from './MapLayer';

export const LoadMarineZoneLayer=()=>{
    message.warn("해구정보를 불러옵니다.")
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
        message.success("해구정보를 성공적으로 불러왔습니다.")

        resolve(marineZoneLayer);
    })
}

export const LoadAquaFarmLayer=()=>{
    //양식장레이어
    let todayDate = new Date();
    let year = todayDate.getFullYear();
    let month = todayDate.getMonth() + 1 < 10 ? "0" + (todayDate.getMonth() + 1) : (todayDate.getMonth() + 1);
    let day = todayDate.getDate() < 10 ? "0" + todayDate.getDate() : todayDate.getDate();

    message.warn("양식장정보를 불러옵니다.")
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
        message.success("양식장정보를 성공적으로 불러왔습니다.")
        resolve(cineralZoneLayer);
    })
}

// 소스, 레이어
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
// export const LoadTrackLayer = ()=>{
//     return new Promise((resolve,reject)=>{
//         const trackLayer = new VectorLayer({
//             source: trackSource,
//             crossOrigin: 'anonymous',
//             style : new Style({
//               fill : new Fill({
//                 color: 'rgba( 255, 72, 101, 0.9 )',
//               }),
//               stroke: new Stroke({
//                 color: 'rgba( 255, 72, 101, 0.9 )',
//                 width: 2
//               }),
//               image: new Circle({
//                 radius: 2,
//                 fill: new Fill({
//                   color: 'rgba( 255, 72, 101, 0.9 )'
//                 })
//               })
//             }),
//             type : "FeatureLayer",
//             name : "TrackLayer"
//           });
//         resolve(trackLayer);
//     })
// }

LoadMarineZoneLayer().then(response=>{
    Map.addLayer(response);
})
LoadAquaFarmLayer().then(response=>{
    Map.addLayer(response);
})
// LoadTrackLayer().then(response=>{
//     Map.addLayer(response);
// })
Map.addLayer(trackLayer)