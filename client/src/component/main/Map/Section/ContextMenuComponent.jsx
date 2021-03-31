import { message } from 'antd';
import React, { memo, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { mapMove } from '../../../../entities/CommonMethods';
import {MainMap} from '../../../../entities/MapLayer'

let clickedPoint = null 
let clickedFeature = null;

const shipContextMenu = {
  title : "선박 정보",
  func : ()=>{console.log("선박정보 입니다.")}
}

const func_contextMenu = (e)=>{
  clickedPoint = MainMap.getCoordinateFromPixel(e.pixel);
  //우클릭 위치에 선박이 있을때
  const features = MainMap.getFeaturesAtPixel(e.pixel);
  //let componentsArr = [...components];
  let targetFlag = false;
  
  features.map((item,idx)=>{
    console.log(`피쳐스${idx} : `,item.getProperties().featureType)
    let featureType = item.getProperties().featureType;
    //항적이 있는 경우
    if(featureType==="SHIP_RECORD_POINT" || featureType==="SHIP_RECORD_LINE"){
       targetFlag = true;
       clickedFeature = item;
    }else{
      clickedFeature = null;
    }

  })
}

MainMap.on('contextmenu',func_contextMenu); //우클릭 기능 장착

const ContextMenuComponent = (props) =>{
    const [copiedLoacation, setCopiedLoacation] = useState([]);
    
    const clickPoint = useRef(clickedPoint);
    const clickFeature = useRef(clickedFeature);

    const onLocationCopy=(e, data) =>{
        setCopiedLoacation(clickPoint.current)
        message.info("좌표가 복사 되었습니다.")
    }

    const onMoveCoorToPoint=()=>{
        mapMove(clickPoint.current);
    }
    const coorFlush =()=>{
      console.log(copiedLoacation);
    }
    
    const [components, setComponents] = useState([
      {
        title : "위치 복사",
        func : onLocationCopy,
      },
      {
        title : "복사위치 출력",
        func : coorFlush,
      },
      {
        title : "위치이동",
        func : onMoveCoorToPoint,
      },
      {
        title : "divider",
        func : ()=>{}
      },
      {
        title : "닫기",
        func : ()=>{}
      },
    ])

    const renderContextComponents = components.map((item,idx)=>{
      if(item.title === "divider"){
        <MenuItem key={item.title} divider></MenuItem>
      }else{
        return (
          <MenuItem onClick={item.func} key={item.title}>
          {item.title}
          </MenuItem>
        )
      }
      
    })
  

    return (
      <ContextMenuTrigger id="mainMap">
        {props.children}
        <ContextMenu id="mainMap">
        {renderContextComponents}
      </ContextMenu>
        </ContextMenuTrigger>
    )
}

export default ContextMenuComponent
