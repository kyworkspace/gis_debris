import { Card } from 'antd'
import { SecurityScanFilled, EnvironmentFilled } from '@ant-design/icons';
import React from 'react'

const contents=[
    {
        id: 1,
        title : "해구시설정보",
        detailFunction:(item)=>{
            console.log("해구시설정보 상세",item)
        },
        moveToFunction:(item)=>{
            console.log("해구 시설정보 위치이동",item)
        }
    },
    {
        id: 2,
        title : "해구 현존량예측",
        detailFunction:(item)=>{
            console.log("해구현존량예측 상세",item)
        },
        moveToFunction:(item)=>{
            console.log("해구현존량예측 위치이동",item)
        }
    }
    ,
    {
        id: 3,
        title : "해구 잔존량예측",
        detailFunction:(item)=>{
            console.log("해구 잔존량예측 상세",item)
        },
        moveToFunction:(item)=>{
            console.log("해구 잔존량예측 위치이동",item)
        }
    }
    ,
    {
        id: 4,
        title : "조사사업정보",
        detailFunction:(item)=>{
            console.log("조사사업정보 상세",item)
        },
        moveToFunction:(item)=>{
            console.log("조사사업정보 위치이동",item)
        }
    }
    ,
    {
        id: 5,
        title : "수거사업정보",
        detailFunction:(item)=>{
            console.log("수거사업정보 상세",item)
        },
        moveToFunction:(item)=>{
            console.log("수거사업정보 위치이동",item)
        }
    }
    ,
    {
        id: 6,
        title : "선박항적정보",
        detailFunction:(item)=>{
            console.log("선박항적정보 상세",item)
        },
        moveToFunction:(item)=>{
            console.log("선박항적정보 위치이동",item)
        }
    }
    ,
    {
        id: 7,
        title : "조사/수거 통합정보",
        detailFunction:(item)=>{
            console.log("조사/수거 통합정보 상세",item)
        },
        moveToFunction:(item)=>{
            console.log("조사/수거 통합정보 위치이동",item)
        }
    }

]

function MarineZoneDetailComponent() {
    const renderCards=contents.map(item=>(
        <Card title={item.title}
        actions={[
            <SecurityScanFilled onClick={()=>item.detailFunction(item)}/>,
            <EnvironmentFilled onClick={()=>item.moveToFunction(item)}/>
        ]}
        ></Card>
    ))
    return (
        <React.Fragment>
            {renderCards}    
        </React.Fragment>
        
    )
}

export default MarineZoneDetailComponent
