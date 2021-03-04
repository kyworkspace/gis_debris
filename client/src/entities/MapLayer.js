import 'ol/ol.css';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS'
import { message } from 'antd';

import { MainMap } from './CommonMethods';
import { MAP_SERVER } from '../main/Access';

export function LoadLayer() {

    //해구 레이어
    message.warn("해구정보를 불러옵니다.")
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
    })
    message.success("해구정보를 성공적으로 불러왔습니다.")


    //양식장레이어
    let todayDate = new Date();
    let year = todayDate.getFullYear();
    let month = todayDate.getMonth() + 1 < 10 ? "0" + (todayDate.getMonth() + 1) : (todayDate.getMonth() + 1);
    let day = todayDate.getDate() < 10 ? "0" + todayDate.getDate() : todayDate.getDate();
    message.warn("양식장정보를 불러옵니다.")
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
    })
    message.success("양식장정보를 성공적으로 불러왔습니다.")

    //기상정보

    //풍량정보

    //등등 넣을예정

    MainMap.addLayer(marineZoneLayer);
    MainMap.addLayer(cineralZoneLayer);

    const marineZone_Layer = cineralZoneLayer;
    marineZone_Layer.setVisible(false);
    const LayerList = [{
        LayerName: '해구',
        Layer: marineZoneLayer,
        Visible: true,
    }
        , {
        LayerName: '양식장',
        Layer: cineralZoneLayer,
        Visible: true,
    }

    ]

    return LayerList
}