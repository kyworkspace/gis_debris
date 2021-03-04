import { message } from 'antd';
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

function LayerListComponent() {
    const wholeList = useRef(
        Array(100).fill('').map((item,idx)=>{
            let obj = new Object();
            obj.layer_name = idx+"";
            obj.seq_no = idx;
            obj.geoserver_name = "지오서버네임"+idx;
            obj.test="글자글자";
            return obj;
        })
    )
    const [CountPerPage, setCountPerPage] = useState(8)
    const [DisPlayList, setDisPlayList] = useState([])
    const [CurrentPage, setCurrentPage] = useState(1)
    
    const divRef = useRef();
    const currentPageRef = useRef(1);

    const displayListLoad=(page)=>{
        let addList = wholeList.current.filter((item,idx)=>{
            if(item.seq_no>=((page-1)*CountPerPage)+1 && item.seq_no<=(CountPerPage*page)){
                return item;
            }
        })
        setDisPlayList([...DisPlayList,...addList])
    }

    useMemo(() => displayListLoad(currentPageRef.current), [currentPageRef.current])

    const infiniteScroll = () => {
        if(divRef.current){
            const st = divRef.current.scrollTop;
            const ch = divRef.current.clientHeight;
            const sh = divRef.current.scrollHeight;
            if(st+ch >=sh){
                if((((currentPageRef.current-1)*CountPerPage)+1) >= wholeList.current.length){
                    return;
                }
                currentPageRef.current = currentPageRef.current+1;
                setCurrentPage(currentPageRef.current)
            }
        }

      };

    useEffect(() => {
        window.addEventListener("scroll", infiniteScroll, true);
        return () => {
            window.removeEventListener("scroll", infiniteScroll);
        }
    }, [])
    const renderDiv = DisPlayList.map((item,idx)=>{
        return <div style={{border:'solid', height:'300px',backgroundColor:'violet'}} key={idx}>{item.layer_name}</div>
    })
    return (
        <div ref={divRef} style={{height:'950px', overflowY:'auto'}} className="infiniteScrollDiv">
            {renderDiv}
        </div>
    )
}

export default LayerListComponent
