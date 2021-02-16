import React, { useEffect, useState } from 'react'
import { PageHeader } from 'antd';
import InvestigationDetailComponent from './InvestigationSection/InvestigationDetailComponent';
import MarineZoneDetailComponent from './MarineZoneSection/MarineZoneDetailComponent';


function TableDetail(props) {

    const [Title, setTitle] = useState("");

    useEffect(() => {
        switch (props.type) {
            case "invList":  
                setTitle("조사사업 상세정보")
                break;
            case "marineZoneList" :
                setTitle(`${props.detailItem.name} 해구 정보 목록`)
                break;
            case "trackList" :
                break;
            default:
                break;
        }
    }, [])

    return (
        <div>
            <PageHeader
                className="site-page-header"
                onBack={() => props.listHide(false)}
                title={Title}
            />
            <hr/>
            {props.type==="invList" &&  <InvestigationDetailComponent item={props.detailItem}/> }
            {props.type==="marineZoneList" &&  <MarineZoneDetailComponent item={props.detailItem}/> }
            
        </div>
    )
}

export default TableDetail
