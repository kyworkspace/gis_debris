import { Spin } from 'antd';
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import PropType from 'prop-types';
import {Queue} from '../../entities/CommonMethods.js'

const pageQueue = new Queue();

function InfiniteScrollComponent(props) {

    const {CountPerPage,ListContent,LoadNextPage} = props;
    const [DisplayList, setDisplayList] = useState([]);
    const [HasMoreItems, setHasMoreItems] = useState(true);
    const [Loading, setLoading] = useState(false);

    const [PageStart, setPageStart] = useState(0)

    const onLoadItems =(page)=>{
        pageQueue.enqueue(page)
        if(Loading) return;
        setLoading(true);
        let addList = [...DisplayList];
        while(pageQueue._arr.length>0){
            let callPage = pageQueue.dequeue()
            LoadNextPage(callPage)
            .then(response=>{
                if(response.success){
                    addList.push(...response.objList)
                    setLoading(false)
                }
            })
        }
        setDisplayList(addList);
        setPageStart(page)
        if(addList.length<=CountPerPage*page){
            setHasMoreItems(false)
        }
    }
    const loader = <div className="demo-loading-container"> <Spin /> </div>;
    
    return (
        <InfiniteScroll
            pageStart={PageStart}
            loadMore={onLoadItems}
            hasMore={HasMoreItems}
            loader={loader}
            useWindow={false}
        >
            {ListContent(DisplayList)}
        </InfiniteScroll>
    )
}

InfiniteScrollComponent.propTypes={
    ContentList:PropType.array,
    CountPerPage:PropType.number,
    IndexColumn:PropType.string,
    ListContent:PropType.func
}

export default InfiniteScrollComponent
