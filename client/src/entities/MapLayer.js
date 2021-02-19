import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { OSM } from 'ol/source';
import {Select} from 'ol/interaction'


//지도에 들어가는 뷰
export const view = new View({
    projection: "EPSG:4326",
    center: ['126.929804', '37.526908'], //최초 좌표
    maxZoom: 19,
    minZoom: 7,
    zoom: 11
  })
  

//VworldMap Base
export const VWolrdBaseMap = new TileLayer({
    source: new XYZ({
    url: 'http://xdworld.vworld.kr:8080/2d/Base/202002/{z}/{x}/{y}.png'
  }),
  visible:true,
  name : "VWorldBaseMap",
  type : "TileLayer"

});
export const VWolrdGrayMap = new TileLayer({
    source: new XYZ({
    url: 'http://xdworld.vworld.kr:8080/2d/gray/202002/{z}/{x}/{y}.png'
}),
    visible:false,
    name : "VWorldGrayMap",
    type : "TileLayer"
});
// OpenStreetMap
export const OSMLayer = new TileLayer({
    source: new OSM(),
    visible:false,
    name : "OSMLayer",
    type : "TileLayer"
});

//지도레이어
export const MainMap = new Map({
    // controls: defaultControls().extend([mousePositionControl]),
    target: null,
    layers: [
        VWolrdBaseMap,
        VWolrdGrayMap,
        OSMLayer
    ],
    view: view
  });

