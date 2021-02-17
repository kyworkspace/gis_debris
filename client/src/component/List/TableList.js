import React, { useEffect, useState } from 'react'
import { message, PageHeader } from 'antd';
import { useSelector } from 'react-redux';
import { mapMove } from '../../entities/CommonMethods';
import { invServiceDisplay } from '../../entities/InvestigationZone';
import MarinZoneListComponent from './MarineZoneSection/MarinZoneListComponent';
import InvestigationListComponent from './InvestigationSection/InvestigationListComponent';
import TrackListComponent from './TrackSection/TrackListComponent';
import LayerListComponent from './LayerSection/LayerListComponent';

function TableList(props) {
    const [contentList, setcontentList] = useState([]); //표출할 리스트
    const [Title, setTitle] = useState("");
    const ListinReducer = useSelector(state => state.mapReducer); //리듀서에서 가져온 항목
    const type = props.type;

    useEffect(() => {
        switch (type) {
            case "invList":
                if (ListinReducer.invList === undefined)
                    return;
                setcontentList(ListinReducer.invList);
                setTitle("조사사업 목록")
                break;
            case "marineZoneList":
                if (ListinReducer.marineZoneList === undefined)
                    return;
                setcontentList(ListinReducer.marineZoneList);
                setTitle("해구목록")
                break;
            case "trackList":
                setTitle("항적정보 목록")
                break;
            case "LayerList":
                setTitle("레이어 목록")
                break;
            default:
                break;
        }

    }, [ListinReducer])

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
                invServiceDisplay(item.seq);
                break;

            default:
                break;
        }
    }

    return (
        <React.Fragment>
            <PageHeader
                className="site-page-header"
                onBack={() => props.listHide()}
                title={Title}
            />
            {type === "marineZoneList" && <MarinZoneListComponent contentList={contentList} moveToPoint={onMoveToPoint} viewDetail={onViewDetail} />}
            {type === "invList" && <InvestigationListComponent contentList={contentList} moveToPoint={onMoveToPoint} viewDetail={onViewDetail} />}
            {type === "trackList" && <TrackListComponent contentList={contentList} moveToPoint={onMoveToPoint} viewDetail={onViewDetail} />}
            {type === "LayerList" && <LayerListComponent contentList={contentList} moveToPoint={onMoveToPoint} viewDetail={onViewDetail} />}
        </React.Fragment>
    )
}

export default TableList
