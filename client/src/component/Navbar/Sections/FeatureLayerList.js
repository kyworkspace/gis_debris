import { Checkbox, List } from 'antd'
import React, { useEffect, useState } from 'react'
import { MainMap } from '../../../entities/MapLayer';


function FeatureLayerList() {
    const [LayerList, setLayerList] = useState([])
    const [CheckStatus, setCheckStatus] = useState({})
    
    useEffect(() => {
        // 피쳐용레이어 선택부분 렌더링
        const DeployedFeatureTileLayers = MainMap.getLayers().getArray().filter(x=>x.getProperties().type ==="FeatureLayer")
        const FeatureDatas = DeployedFeatureTileLayers.map((item,idx)=>{
            const {name,visible} = item.getProperties();
            return {
                title : name,
                visible : visible
            }
        })
        setLayerList(FeatureDatas)
    }, [])
    const onFeatureLayerToggle =(title)=>{
        console.log(title)
    }
    function onChange(e) {
        //레이어 표출 변경        
        let ChosenLayer = MainMap.getLayers().getArray().find(x=>x.getProperties().name ===e.target.value)
        ChosenLayer.setVisible(e.target.checked)
        //state값 바꿔줄때 쓸것
        let list = [
            ...LayerList,
        ]
        // 새로운 값으로 바꿔서 덮어 쓰기
        let target = list.findIndex(item=>item.title===e.target.value)
        list[target].visible = e.target.checked;
        setLayerList(list);
      }
    
    //맵 레이어 선택 부분 렌더링
    const renderMapLayerChoice = LayerList.map(item=>{
        return (
                <List.Item>
                    <Checkbox onChange={onChange} checked={item.visible} value={item.title}>{item.title}</Checkbox>
                </List.Item>
                )
    })

    return (
        <List>
            {renderMapLayerChoice}
        </List>
    )
}

export default FeatureLayerList
