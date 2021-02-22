import { Checkbox,Button, List } from 'antd';
import React, { useState } from 'react'
import { removeTrackHisRecord } from '../../../entities/TrackHistory';


function TrackFeatureList(props) {
    
    const {item} = props
    const {visible,mmsi,name,startDate,endDate} = item;
    const [MMSI, setMMSI] = useState(mmsi)
    const [Visible, setVisible] = useState(visible)
    const [Name, setName] = useState(name)

    const deleteTrackSource =(mmsi)=>{
        removeTrackHisRecord(mmsi);
        props.deleteTrack(mmsi)
    }
    return (
        <List.Item>
            <div>{MMSI}</div>
            <div>{Name}</div>
            <div>{startDate}</div>
            <div>{endDate}</div>
            <div><Button onClick = {()=>deleteTrackSource(MMSI)}>삭제</Button></div>
        </List.Item>
    )
}

export default TrackFeatureList
