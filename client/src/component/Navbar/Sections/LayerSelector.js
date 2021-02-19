import React, { useEffect, useState } from 'react'
import Notification from '../../Map/Notification'
import { List, Tabs } from 'antd';
import {MainMap} from '../../../entities/MapLayer'
import OSMLayer from '../../../Images/mapLayer/OSMLayer.jpg'
import VWorldBaseMap from '../../../Images/mapLayer/VWorldBaseMap.jpg'
import VWorldGrayMap from '../../../Images/mapLayer/VWorldGrayMap.jpg'
import FeatureLayerList from './FeatureLayerList';


const { TabPane } = Tabs;

function LayerSelector(props) {

    const LayerList = {
        VWorldBaseMap :{
            src : VWorldBaseMap,
            title : "V 월드 기본 맵"
        },
        VWorldGrayMap :{
            src : VWorldGrayMap,
            title : "V 월드 회색 맵"
        },
        OSMLayer :{
            src : OSMLayer,
            title : "OpenStreetMap 맵"
        },
    }
    const DeployedMapTileLayers = MainMap.getLayers().getArray().filter(x=>x.getProperties().type ==="TileLayer")
    
    
    const [Description, setDescription] = useState("");
    useEffect(() => {
        

        const description =  (<Tabs defaultActiveKey="1">
                            <TabPane tab="지도 레이어" key="1">
                                <List>
                                {renderMapLayerChoice}
                                </List>
                            </TabPane>
                            <TabPane tab="객체 레이어" key="2">
                                <FeatureLayerList/>
                            </TabPane>
                        </Tabs>)
        setDescription(description);
        
    }, [])

    //레이어 바꾸는 함수
    const onLayerChoice = (LayerName)=>{
        DeployedMapTileLayers.map(item=>{
            if(item.getProperties().name===LayerName){
                item.setVisible(true)
            }else{
                item.setVisible(false)
            }
        })
        
    }

    //맵 레이어 선택 부분 렌더링
    const renderMapLayerChoice = DeployedMapTileLayers.map(item=>{
        const {name} = item.getProperties();
        return (<List.Item>
                <a onClick={()=>onLayerChoice(name)}>
                    <img src={LayerList[name].src} style={{width : "20vh",height:"10vh"}}/>
                </a>
                <div >{LayerList[name].title}</div>
            </List.Item>)
    })
    
    const title = "레이어 선택"
    
    return (
        <Notification title={title} description={Description} callButton="레이어 선택" notificationKey="LayerChoice"/>
    )
}

export default LayerSelector
