import { message } from 'antd';
import React, { memo, useEffect, useMemo, useRef, useState } from 'react'
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { mapMove } from '../../../entities/CommonMethods';
import {MainMap} from '../../../entities/MapLayer'


const ContextMenuComponent = memo((props) =>{

    const [location, setLocation] = useState([]);
    const [copiedLoacation, setCopiedLoacation] = useState([]);
    const clickPoint = useRef([]);

    const func_contextMenu = (e)=>{
      clickPoint.current = MainMap.getCoordinateFromPixel(e.pixel);
    }

    MainMap.on('contextmenu',func_contextMenu); //우클릭 기능 장착
    

    const onLocationCopy=(e, data) =>{
        setCopiedLoacation(clickPoint.current)
        message.info("좌표가 복사 되었습니다.")
    }

    const onMoveCoorToPoint=(e)=>{
        mapMove(clickPoint.current);
    }
    const coorFlush =(e)=>{
      console.log(copiedLoacation);
    }
  

    return (
      
      <ContextMenuTrigger id="mainMap">
        {props.children}
        <ContextMenu id="mainMap">
        <MenuItem onClick={onLocationCopy}>
          위치복사
        </MenuItem>
        <MenuItem onClick={coorFlush}>
          복사위치 출력
        </MenuItem>
        <MenuItem onClick={onMoveCoorToPoint}>
          위치이동
        </MenuItem>
        <MenuItem divider />
        <MenuItem>
          닫기
        </MenuItem>
      </ContextMenu>
        </ContextMenuTrigger>
    )
})

export default ContextMenuComponent
