import { Card } from 'antd'
import { SecurityScanFilled, EnvironmentFilled } from '@ant-design/icons';
import React, { useContext } from 'react'
import { MenuTypeContext, MENU_CHANGE } from '../../main/MainComponent';

function MarineZoneDetailComponent(props) {
    const {detailItem,dispatch} = useContext(MenuTypeContext)
    const item = detailItem;
        
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
            title : "선박항적정보",
            detailFunction:(item)=>{
                dispatch({type : MENU_CHANGE, menu: "trackList", detailItem : item.area})
            },
            moveToFunction:(item)=>{
                console.log("선박항적정보 위치이동",item)
            }
        }
        ,
        {
            id: 5,
            title : "조사/수거 통합정보",
            detailFunction:(item)=>{
                window.open(`/MarineZoneDetail/${item.salareano}`,"aa" ,"width=800,height=800,resizable=no")
            },
            moveToFunction:(item)=>{
                console.log("조사/수거 통합정보 위치이동",item)
            }
        }

    ]
    const renderCards=contents.map(content=>(
        <Card title={content.title}
        actions={[
            <SecurityScanFilled onClick={()=>content.detailFunction(item)}/>,
            <EnvironmentFilled onClick={()=>content.moveToFunction(item)}/>
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
