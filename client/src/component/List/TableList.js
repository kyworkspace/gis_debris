import React, { useMemo } from 'react'
import { Button, message, PageHeader } from 'antd';
import { useSelector } from 'react-redux';
import { mapMove } from '../../entities/CommonMethods';
import { InvService } from '../../entities/InvestigationZone';
import MarinZoneListComponent, { SelectedMarineZoneSource } from './MarineZoneSection/MarinZoneListComponent';
import InvestigationListComponent from './InvestigationSection/InvestigationListComponent';
import TrackListComponent from './TrackSection/TrackListComponent';
import LayerListComponent from './LayerSection/LayerListComponent';
import VideoListComponent from './CCTVSection/VideoListComponent';
import { DeleteOutlined } from '@ant-design/icons';
import { trackSource, videoSource } from '../../entities/FeatureLayer';
import CollectionListComponent from './CollectionSection/CollectionListComponent';

function TableList(props) {
    const ListinReducer = useSelector(state => state.mapReducer); //리듀서에서 가져온 항목
    const type = props.type;

    const onViewDetail = (item) => { // 상세보기
        props.detailDisplay(item)
    }
    const onMoveToPoint = (item) => { //좌표로 위치 이동
        //좌표가 있을때만 실행
        if (item.coordinate) {
            mapMove(item.coordinate)
        } else {
            message.warning("저장된 좌표가 없습니다.")
        }
        switch (type) {
            case "invList":
                InvService.invServiceDisplay(item.seq)
                break;

            default:
                break;
        }
    }

    const changeList=(type)=>{
        switch (type) {
            case "invList":
                return {
                    title : "조사사업 목록",
                    clearLayer : ()=>InvService.invServiceDisplay('none'),
                    component : <InvestigationListComponent contentList={ListinReducer.invList} moveToPoint={onMoveToPoint} viewDetail={onViewDetail} />
                }
            case "colList":
                return {
                    title : "수거사업 목록",
                    clearLayer : ()=>console.log("수거사업 레이어 초기화"),
                    // component : <CollectionListComponent contentList={ListinReducer.colList} moveToPoint={onMoveToPoint} viewDetail={onViewDetail} />
                    component : <CollectionListComponent moveToPoint={onMoveToPoint} viewDetail={onViewDetail} />
                }
            case "marineZoneList":
                return {
                    title : "해구 목록",
                    clearLayer : ()=>SelectedMarineZoneSource.clear(),
                    component : <MarinZoneListComponent contentList={ListinReducer.marineZoneList} moveToPoint={onMoveToPoint} viewDetail={onViewDetail} />
                }
            case "trackList":
                return {
                    List : [],
                    title : "항적조회",
                    clearLayer : ()=>trackSource.clear(),
                    component : <TrackListComponent moveToPoint={onMoveToPoint} viewDetail={onViewDetail} />
                }
            case "videoList":
                return {
                    List : [],
                    title : "CCTV 목록",
                    clearLayer:()=>videoSource.clear(),
                    component : <VideoListComponent moveToPoint={onMoveToPoint} viewDetail={onViewDetail} />
                }
            case "LayerList":
                return {
                    List : [],
                    title : "레이어 목록",
                    component : <LayerListComponent moveToPoint={onMoveToPoint} viewDetail={onViewDetail} />
                }
            default:
                break;
        }
    }
    const contentList = useMemo(() => changeList(type), [type])
    return (
        <React.Fragment>
            <PageHeader
                className="site-page-header"
                onBack={() => props.listHide()}
                title={[contentList.title,<Button type="primary" shape="round" onClick={contentList.clearLayer}><DeleteOutlined /></Button>]}
            />
            { contentList.component }
        </React.Fragment>
    )
}

export default TableList
