import React, { useEffect, useMemo, useRef, useState } from 'react'

function InfiniteScrollComponent(props) {
    const {page} = props;
    const divRef = useRef();

    const [CurrentPage, setCurrentPage] = useState(1)

    const currentPageRef = useRef(1);
    useMemo(() => props.pageLoad(CurrentPage), [CurrentPage])

    const infiniteScroll = () => {
        if(divRef.current ){
            const st = divRef.current.scrollTop;
            const ch = divRef.current.clientHeight;
            const sh = divRef.current.scrollHeight;
            if(st+ch >=sh){
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

    return (
        <div ref={divRef} style={{height:'950px', overflowY:'auto'}} className="infiniteScrollDiv">
            {props.renderFunc}
        </div>
    )
}

export default InfiniteScrollComponent
