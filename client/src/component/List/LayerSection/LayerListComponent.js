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
    // const [DisPlayList, setDisPlayList] = useState([])
    const [pageInterval, setpageInterval] = useState(8)
    const [CurrentPage, setCurrentPage] = useState(1)
    
    const divRef = useRef();
    const currentPageRef = useRef(1);
    const DisplayListRef = useRef([]);

    useLayoutEffect(() => {
        console.log()
        let addList = wholeList.current.filter((item,idx)=>{
            if(item.seq_no>=0 && item.seq_no<=CountPerPage){
                return item;
            }
        })
        // setDisPlayList(addList)
        DisplayListRef.current = addList;
    }, [])

    

    const displayListLoad=(page)=>{
        console.log("새로고침")
        let addList = wholeList.current.filter((item,idx)=>{
            if(item.seq_no>=((page-1)*pageInterval)+1 && item.seq_no<=(pageInterval*page)){
                return item;
            }
        })
        console.log(...DisplayListRef.current,...addList)
        
        DisplayListRef.current = [...DisplayListRef.current,...addList]

        return DisplayListRef.current;
    }
    const memoList = useMemo(() => displayListLoad(CurrentPage), [CurrentPage])

    const infiniteScroll = () => {
        const { documentElement, body } = document;
        if(divRef.current){
            const st = divRef.current.scrollTop;
            const ch = divRef.current.clientHeight;
            const sh = divRef.current.scrollHeight;

            if(st+ch >=sh){
                console.log("페이지 바뀜")
                currentPageRef.current = currentPageRef.current+1;
                console.log(currentPageRef.current);
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
    const renderDiv = memoList.map((item,idx)=>{
        return <div style={{border:'solid', height:'300px'}} key={idx}>{item.layer_name}</div>
    })
    
    return (
        <div ref={divRef} style={{height:'800px', backgroundColor:'violet',overflow:'auto'}}>
            {renderDiv}
        </div>
    )
}

export default LayerListComponent
