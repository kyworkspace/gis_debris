import { Button, Checkbox, List } from 'antd'
import React, { useEffect, useState } from 'react'
import Notification from '../../Notification/Notification'
import TrackFeatureList from './TrackFeatureList'
import { useDispatch, useSelector } from 'react-redux';
import {setTrackHistoryVisibility} from '../../../_actions/map_actions'

function TrackSelector(props) {
    const title ="항적선택"
    const notificationStyle ={
        top : "15vh",
        right:'50px'
    }
    // const {targetList} = props;
    const dispatch = useDispatch();
    const mapReducer = useSelector(state => state.mapReducer);
    const {selectedTrackTarget} = mapReducer;

    const deleteTrackSourceInStore=(mmsi)=>{
        dispatch(setTrackHistoryVisibility(mmsi));
    }

    const renderData = selectedTrackTarget.map((item,idx)=>(
        <TrackFeatureList item={item} deleteTrack={deleteTrackSourceInStore} key={idx}/>
    ))

    const [Description, setDescription] = useState(<List> {renderData} </List>)
    const [TrackList, setTrackList] = useState(selectedTrackTarget)
    
    useEffect(() => {
        console.log("유즈이펙트")
        setDescription(<List> {renderData} </List>)
    }, [selectedTrackTarget])
    

    return (
        // <Notification title={title} description={
        //     <List>
        //         {renderData}
        //     </List>

        // } callButton="항적 선택" notificationKey="TrackChoice" notificationStyle={notificationStyle}/>

        <Notification title={title} description={
            Description
        } callButton="항적 선택" notificationKey="TrackChoice" notificationStyle={notificationStyle}/>
    )
}

export default TrackSelector
