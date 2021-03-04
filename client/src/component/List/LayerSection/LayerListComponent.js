import { EnvironmentFilled, SecurityScanFilled } from '@ant-design/icons';
import { Card, message } from 'antd';
import Text from 'antd/lib/typography/Text';
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { selectCollectionServiceList } from '../../../entities/CallbackMethod';
import InfiniteScrollComponent from '../../utils/InfiniteScrollComponent';
import ListSearchBar from '../SearchSection/ListSearchBar';

function LayerListComponent(props) {
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
    const [DisplayList, setDisplayList] = useState([])
    const [SearchTerm, setSearchTerm] = useState("")
    const [HasMoreItems, setHasMoreItems] = useState(true);
    const [CurrentPage, setCurrentPage] = useState(0);
    const [Loading, setLoading] = useState(false);
    const onSearchHandler = (value) => {
        setSearchTerm(value)
        displayListLoad(1,value)
        setHasMoreItems(true)
    }


    const displayListLoad=(page,searchValue)=>{
        if(HasMoreItems && !Loading){
            setLoading(true)
            let body={
                countPerPage : CountPerPage,
                startRowNumber : (((page - 1) * CountPerPage)+1),
                endRowNumber : (page * CountPerPage),
                page : page,
                searchTerm : (searchValue||SearchTerm)
            }
            selectCollectionServiceList(body)
            .then(response=>{
                setCurrentPage(page);
                if(page === 1){
                    setDisplayList(response.objList)
                }else{
                    if(response.objList){
                        setDisplayList([...DisplayList,...response.objList]) 
                        console.log([...DisplayList,...response.objList]);
                    }
                }
                
                if([...DisplayList,...response.objList].length < CountPerPage*page){
                    console.log(`[...DisplayList,...response.objList].length : ${[...DisplayList,...response.objList].length} CountPerPage*page :${CountPerPage*page}`)
                    
                    console.log("더없음")
                    setHasMoreItems(false)
                }
                
            })
            setLoading(false);
        }
        
    }
    const renderDiv = DisplayList.map((item,idx)=>{
        return (
            <div style={{width:'100%',justifyContent:'center',display:'flex',padding:"20px"}} key={idx}>
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
          </div>
        )
    })
    

    return (
        <>
            <ListSearchBar onInputChange={onSearchHandler}/>
            <InfiniteScrollComponent pageLoad={displayListLoad} renderFunc={renderDiv} HasMoreItems={HasMoreItems} page={CurrentPage}/>
        </>
        
    )
}

export default LayerListComponent
