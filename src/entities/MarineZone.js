import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import { MAP_SERVER } from '../main/Access';

export function MarineZone() {
    let marineZoneLayer = new TileLayer({
        source:new TileWMS({
          url : MAP_SERVER,
          params: {
            'VERSION' : '1.3.0',
            'LAYERS' : 'REQM:small_trench_mapPolygon',
          },
          crossOrigin: 'anonymous',
        })
      })
      return marineZoneLayer
}

