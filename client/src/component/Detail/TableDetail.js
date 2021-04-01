import React, { useContext, useEffect, useState } from 'react'
import { PageHeader } from 'antd';
import InvestigationDetailComponent from './InvestigationSection/InvestigationDetailComponent';
import CollectionDetailComponent from './CollectionSection/CollectionDetailComponent'
import MarineZoneDetailComponent from './MarineZoneSection/MarineZoneDetailComponent';
import { MenuTypeContext, MOVE_TO_PREV } from '../main/MainComponent';


function TableDetail() {
    const {menu,dispatch,detailItem} = useContext(MenuTypeContext)
    const [Title, setTitle] = useState("");

    useEffect(() => {
        switch (menu) {
            case "invList":  
                setTitle("조사사업 상세정보")
                break;
            case "colList" :
                setTitle("수거사업 상세정보") 
                break;   
            case "marineZoneList" :
                setTitle(`${detailItem.name} 해구 정보 목록`)
                break;
            case "trackList" :
                break;
            default:
                break;
        }
    }, [])

    return (
        <div >
            <PageHeader
                className="site-page-header"
                onBack={() => dispatch({type : MOVE_TO_PREV})}
                title={Title}
            />
            <hr/>
            {menu==="invList" &&  <InvestigationDetailComponent item={detailItem}/> }
            {menu==="colList" &&  <CollectionDetailComponent item={detailItem}/> }
            {menu==="marineZoneList" &&  <MarineZoneDetailComponent/> }
        </div>
    )
}

export default TableDetail
