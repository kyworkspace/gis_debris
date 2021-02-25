import React, { useEffect, useState } from 'react'
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
import { selectCollectionServiceList } from '../../entities/CallbackMethod';

function TableList(props) {
    const [contentList, setcontentList] = useState([]); //표출할 리스트
    const [Title, setTitle] = useState("");
    const ListinReducer = useSelector(state => state.mapReducer); //리듀서에서 가져온 항목
    const [Loading, setLoading] = useState(true);

    const type = props.type;
    useEffect(() => {
        //타입이 바뀌면 로딩시작
        setLoading(true)
    }, [type])
    useEffect(() => { 
        switch (type) {
            case "invList":
                if (ListinReducer.invList === undefined)
                    return;
                setcontentList(ListinReducer.invList);
                setTitle("조사사업 목록")
                break;
            case "colList":
                if (ListinReducer.colList === undefined)
                    return;
                setcontentList(ListinReducer.colList);
                setTitle("수거사업 목록")
                break;
            case "marineZoneList":
                if (ListinReducer.marineZoneList === undefined)
                    return;
                setcontentList(ListinReducer.marineZoneList);
                setTitle("해구목록")
                break;
            case "trackList":
                setcontentList([]);
                setTitle("항적 조회")
                break;
            case "videoList":
                setcontentList([]);
                setTitle("CCTV 목록")
                break;
            case "LayerList":
                setcontentList([]);
                setTitle("레이어 목록")
                break;
            default:
                break;
        }
    }, [Loading])

    useEffect(() => {
        //위의 useEffect가 작업이 끝나면 contentList가 바뀌는데, 이를 감지해서 Loading을 false로 바꿔줌
        setLoading(false)
    }, [contentList])

    const onViewDetail = (item) => {
        props.detailDisplay(item)
    }

    const onMoveToPoint = (item) => {
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
    const onClearLayer=(type)=>{
        switch (type) {
            case 'trackList':
                trackSource.clear()
                break;
            case 'marineZoneList':
                SelectedMarineZoneSource.clear()
                break;
            case 'invList':
                InvService.invServiceDisplay('none');
                break;
            case 'videoList':
                videoSource.clear()
                break;
            default:
                break;
        }
    }
    const renderList = ()=>{
        if(!contentList) return;
        switch (type) {
            case 'trackList':
                return "trackList" && <TrackListComponent contentList={contentList} moveToPoint={onMoveToPoint} viewDetail={onViewDetail} />
            case 'marineZoneList':
                return <MarinZoneListComponent contentList={contentList} moveToPoint={onMoveToPoint} viewDetail={onViewDetail} />
            case 'invList':
                return <InvestigationListComponent contentList={contentList} moveToPoint={onMoveToPoint} viewDetail={onViewDetail} />
            case 'colList':
                return <CollectionListComponent contentList={contentList} moveToPoint={onMoveToPoint} viewDetail={onViewDetail} />
            case 'videoList':
                return "videoList" && <VideoListComponent moveToPoint={onMoveToPoint} viewDetail={onViewDetail} />
            case 'LayerList' :
                return <LayerListComponent contentList={contentList} moveToPoint={onMoveToPoint} viewDetail={onViewDetail} />
            default:
                break;
        }
    }

    return (
        <React.Fragment>
            <PageHeader
                className="site-page-header"
                onBack={() => props.listHide()}
                title={[Title,<Button type="primary" shape="round" onClick={()=>onClearLayer(type)}><DeleteOutlined /></Button>]}
            />
            {!Loading
                ?
                renderList()
                :
                <div>로딩중</div>
                
            }
            {/* {type === "marineZoneList" && <MarinZoneListComponent contentList={contentList} moveToPoint={onMoveToPoint} viewDetail={onViewDetail} />}
            {type === "invList" && <InvestigationListComponent contentList={contentList} moveToPoint={onMoveToPoint} viewDetail={onViewDetail} />}
            {type === "trackList" && <TrackListComponent contentList={contentList} moveToPoint={onMoveToPoint} viewDetail={onViewDetail} />}
            {type === "videoList" && <VideoListComponent moveToPoint={onMoveToPoint} viewDetail={onViewDetail} />}
            {type === "LayerList" && <LayerListComponent contentList={contentList} moveToPoint={onMoveToPoint} viewDetail={onViewDetail} />} */}
        </React.Fragment>
    )
}

export default TableList
