import { notification, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import Notification from '../../../Notification/Notification'
import { useDispatch, useSelector } from 'react-redux';
import {setTrackHistoryVisibility} from '../../../../_actions/map_actions'
import TrackDisplayButton from './TrackDisplayButton';
import { parseShipHisRecords, removeTrackHisRecord } from '../../../../entities/TrackHistory';
import { getTrackList } from '../../../../entities/CallbackMethod';
import { trackTermSearch, VpassTrackConverter } from '../../../../entities/CommonMethods';
import async from 'async'

function TrackSelector() {
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
            title : "선박번호",
            dataIndex : "id"
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
        const {startDate,endDate,id} = searchParam;
        let term = new Date(new Date(endDate)-new Date(startDate))/86400000;
        let tableList = trackTermSearch(startDate,term);
        let trackList = [];
        if(searchParam.visible){
            //로딩 시작
            setTrackVisibilityInStore({...searchParam,loading : true})
            async.forEach(tableList, function(tableName,callback){
                let body={
                  id : id,
                  tableName : tableName,
                  visible : true
                }
        
                getTrackList(body).then(response=>{
                  if(response.data.success){
                    if(response.data.trackList.length===0){
                      callback();
                    }else{
                      trackList.push(...response.data.trackList);
                      callback();  
                    }
                  }
                })
        
              },function(err){
                if(err) return alert("에러발생")
                //로딩 끝
                console.log('조회 완료')
                parseShipHisRecords(VpassTrackConverter(trackList),searchParam.id);
                setTrackVisibilityInStore({...searchParam,loading : false})
                // 활성 창 닫음
                // 표시 중인 로딩이 바뀌지 않아서 강제로 리렌더링 하기위한 방법
                notification.close("TrackChoice")
              });
        }else{
            setTrackVisibilityInStore(searchParam)
            removeTrackHisRecord(searchParam.id)
        }
    }
    //TrackList 조절하는 Effect
    useEffect(() => {
        let tmpList = selectedTrackTarget.map(item =>{
            let obj = {
                ...item,
                input :  <TrackDisplayButton info={item} onTrackDisplay={onTrackDisplay} key = {item.id}/>
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
