import { EnvironmentFilled, SecurityScanFilled } from '@ant-design/icons';
import { Card, List, Pagination } from 'antd';
import Text from 'antd/lib/typography/Text';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { selectCollectionServiceList } from '../../../entities/CallbackMethod';
import InfiniteScrollComponent from '../../utils/InfiniteScrollComponent';
import ListSearchBar from '../SearchSection/ListSearchBar'

function CollectionListComponent(props) {
    // const {contentList} = props;

    const [DisplayList, setDisplayList] = useState([]);
    const [ListPage, setListPage] = useState(1) //첫시작 페이지
    const [SearchTerm, setSearchTerm] = useState(""); //검색어
    const [CountPerPage, setCountPerPage] = useState(8); //페이지당 갯수
    const [TotalCount, setTotalCount] = useState(0)
    const [SinglePage, setSinglePage] = useState(false);

    // useEffect(() => {
    //     let tmpList = contentList.filter(x=>x.seq>=(((ListPage-1)*CountPerPage)+1) && x.seq<=(ListPage*CountPerPage));
    //     setTotalCount(contentList.length);
    //     setDisplayList(tmpList);
    // }, [contentList])

    
    const onSearchHandler=(value)=>{
        console.log(value)
        setSearchTerm(value);
    //     SearchList(value,1)
    //     setSearchTerm(value);
    // }
    // const SearchList=(value,page)=>{
    //     let newList = contentList.filter(x=>
    //         x.col_ser_dtl.indexOf(value)>-1
    //         || x.col_city.indexOf(value)>-1
    //         || x.col_year === value
    //         || x.col_region.indexOf(value)>-1
    //         );
    //     let tmpList =[];
    //     if(newList.length > CountPerPage){ //갯수가 너무 많을때 페이지당 표출 갯수로 로딩 제한....???.
    //         newList.forEach((item,i)=>{
    //             if(i>=(((page-1)*CountPerPage)) && i<=(page*CountPerPage)){
    //                 tmpList.push(item);
    //             }
    //         })
    //     }else{
    //         tmpList = newList;
    //         setSinglePage(true);
    //     }
    //     setDisplayList(tmpList)
    //     setTotalCount(newList.length);
    //     setListPage(page)
        
    }
    const ListContent=(DisplayList)=>{
        
        return <List
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
    }
    const getColList=(page)=>{
        return new Promise((resolve,reject)=>{
            let body={
                countPerPage : CountPerPage,
                startRowNumber : (((page - 1) * CountPerPage)+1),
                endRowNumber : (page * CountPerPage),
                page : page,
                searchTerm : SearchTerm
            }
            console.log(body)
            selectCollectionServiceList(body)
            .then(response=>{
              resolve(response.data)
            })
        })
    }

    return (
        <>
            <ListSearchBar onInputChange={onSearchHandler}/>
            <hr/>
            <InfiniteScrollComponent ListContent={ListContent} LoadNextPage={getColList} searchTerm={SearchTerm}/>
            {/* <List 
            dataSource={DisplayList}
            renderItem={item=>(
                <List.Item style={{justifyContent:"center"}}>
                    <Card title={item.col_ser_dtl} bordered={false} style={{width:"350px"}}
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
            <Pagination 
                current={ListPage} 
                pageSize={CountPerPage} 
                total={TotalCount} 
                hideOnSinglePage={SinglePage}
                onChange={onPageChange} 
                simple 
                style={{justifyContent:"center",display:'flex'}}
            /> */}
        </>
    )
}

export default CollectionListComponent
