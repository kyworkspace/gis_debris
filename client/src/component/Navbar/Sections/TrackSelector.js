import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import Notification from '../../Notification/Notification'
import { useDispatch, useSelector } from 'react-redux';
import {setTrackHistoryVisibility} from '../../../_actions/map_actions'
import TrackDisplayButton from './TrackDisplayButton';
import { parseShipHisRecords, removeTrackHisRecord } from '../../../entities/TrackHistory';
import { getTrackList } from '../../../entities/CallbackMethod';

function TrackSelector(props) {
    const title ="항적선택"
    const notificationStyle ={
        top : "15vh",
        right:'50px'
    }
    
    const columns=[
        {
            title : "표출",
            dataIndex : "input"
        },
        {
            title : "MMSI",
            dataIndex : "mmsi"
        },
        {
            title : "선박명",
            dataIndex : "name"
        },
        {
            title : "시작 날짜",
            dataIndex : "startDate"
        },
        {
            title : "종료 날짜",
            dataIndex : "endDate"
        }
    ]


    const dispatch = useDispatch();
    const mapReducer = useSelector(state => state.mapReducer);
    const {selectedTrackTarget} = mapReducer;

    const setTrackVisibilityInStore=(params)=>{
        dispatch(setTrackHistoryVisibility(params));
    }
    const [Description, setDescription] = useState("")
    const [TrackList, setTrackList] = useState([])
    
    const onTrackDisplay=(searchParam)=>{
        if(searchParam.visible){
            getTrackList(searchParam)
            .then(response=>{
                parseShipHisRecords(response.data.trackList,searchParam.mmsi)
                setTrackVisibilityInStore(searchParam)
            })
        }else{
            setTrackVisibilityInStore(searchParam)
            removeTrackHisRecord(searchParam.mmsi)
        }
    }
    //TrackList 조절하는 Effect
    useEffect(() => {
        let tmpList = selectedTrackTarget.map(item =>{
            let obj = {
                ...item,
                input :<TrackDisplayButton info={item} onTrackDisplay={onTrackDisplay}/>
            }
            return obj;
        })
        setTrackList(tmpList)
    }, [selectedTrackTarget])
    
    //TrackList가 바뀔때 Description을 바꿔줌
    useEffect(() => {
        setDescription(<Table columns={columns} dataSource={TrackList} scroll={{ y: 240 }}/>)
    }, [TrackList])

    return (
        <Notification title={title} description={ Description } callButton="항적 선택" notificationKey="TrackChoice" notificationStyle={notificationStyle}/>
    )
}

export default TrackSelector
