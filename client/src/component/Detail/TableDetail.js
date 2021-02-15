import React, { useEffect, useState } from 'react'
import { PageHeader } from 'antd';
import InvestigationDetailComponent from '../List/InvestigationSection/InvestigationDetailComponent'

function TableDetail(props) {

    const [Title, setTitle] = useState("");

    useEffect(() => {
        setTitle("상세보기")
        
    }, [])

    return (
        <div>
            <PageHeader
                className="site-page-header"
                onBack={() => props.listHide(false)}
                title={Title}
            />
            <hr/>
            <InvestigationDetailComponent item={props.detailItem}/>   
        </div>
    )
}

export default TableDetail
