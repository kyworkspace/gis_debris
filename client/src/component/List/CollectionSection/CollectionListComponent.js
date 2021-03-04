import { EnvironmentFilled, SecurityScanFilled } from '@ant-design/icons';
import { Card, List, Pagination, Spin } from 'antd';
import Text from 'antd/lib/typography/Text';
import React, { useEffect, useRef, useState } from 'react'
import { selectCollectionServiceList } from '../../../entities/CallbackMethod';
import ListSearchBar from '../SearchSection/ListSearchBar'
import InfiniteScroll from 'react-infinite-scroller'

function CollectionListComponent(props) {
    //const [SearchTerm, setSearchTerm] = useState(""); //검색어
    const [CountPerPage, setCountPerPage] = useState(8); //페이지당 갯수
    const [DisplayList, setDisplayList] = useState([]);
    const [HasMoreItems, setHasMoreItems] = useState(true);
    const [SearchLoading, setSearchLoading] = useState(false);

    const loader = <div className="demo-loading-container"> <Spin /> </div>; //다음 페이지 로딩 될때의 로딩바

    const SearchTermRef = useRef("")

    const onSearchHandler=(value)=>{
        SearchTermRef.current = value;
    }
    
    const onLoadItems =(page)=>{
        let body={
            countPerPage : CountPerPage,
            startRowNumber : (((page - 1) * CountPerPage)+1),
            endRowNumber : (page * CountPerPage),
            page : page,
            searchTerm : SearchTermRef.current
        }
        selectCollectionServiceList(body)
        .then(response=>{
            if(page === 1){
                setDisplayList(response.objList);
                if(response.objList.length<CountPerPage*page){
                    setHasMoreItems(false)
                }
            }else{
                if(response.objList){
                    setDisplayList([...DisplayList,...response.objList]) 
                    console.log([...DisplayList,...response.objList]);
                    if([...DisplayList,...response.objList].length<CountPerPage*page){
                        setHasMoreItems(false)
                    }
                }
            }
            setSearchLoading(false);
        })
    }
    const enterSearchButton =()=>{
        console.log("엔터버튼")
        onLoadItems(1)
        setHasMoreItems(true);
        setSearchLoading(true); //검색할때 인피니트 스크롤 초기화
    }
    return (
        <>
            <ListSearchBar onInputChange={onSearchHandler} searchButtonHandler={enterSearchButton}/>
            <hr/>
            {!
            SearchLoading
            &&
            <InfiniteScroll
            pageStart={0}
            loadMore={onLoadItems}
            hasMore={HasMoreItems}
            loader={loader}
            useWindow={false}
            >
                <List
                    dataSource={DisplayList}
                    renderItem={item => (
                        <List.Item style={{justifyContent:"center"}}>
                        <Card title={`${item.col_ser_dtl} ${item.rownumber}`} bordered={false} style={{width:"350px"}}
                        actions={[
                            <SecurityScanFilled onClick={()=>props.viewDetail(item)}/>,
                            <EnvironmentFilled onClick={()=>props.moveToPoint(item)}/>
                        ]}
                        >
                            <Text>장소 : {item.col_city}</Text>
                            <br/>
                            <Text>지역 : {item.col_region} </Text>
                            <br/>
                            <Text>년도 : {item.col_year}</Text>
                            <br/>
                            <Text>수거량 : {item.col_amount}</Text>
                            <br/>
                            <Text>좌표여부 : {item.geomCheck ? '좌표 있음':'좌표 없음'}</Text>
                            <br/>
                            <Text>중심위치 : {item.geomCheck && item.coordinate[0] +" , "+item.coordinate[1]}</Text>
                        </Card>
                    </List.Item>
                    )}
                />
            </InfiniteScroll>
            }
            
        </>
    )
}

export default CollectionListComponent
