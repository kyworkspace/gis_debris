import React, { useContext, useEffect, useState} from 'react'
import { Card, List, Typography,Input,Pagination } from 'antd';
import { SecurityScanFilled, EnvironmentFilled } from '@ant-design/icons';
import ListSearchBar from '../SearchSection/ListSearchBar';
import {MenuTypeContext, SET_SEARCHKEYWORD} from '../../main/MainComponent'


const {Text} = Typography;

function InvestigationListComponent(props) {

    const {contentList} = props;// 전체 리스트

    const {dispatch, searchKeyword} = useContext(MenuTypeContext); //context
    const [DisplayList, setDisplayList] = useState([]); //표출 리스트
    const [ListPage, setListPage] = useState(1) //페이지 번호
    const [SearchTerm, setSearchTerm] = useState(searchKeyword); //검색어
    const [CountPerPage, setCountPerPage] = useState(8); //페이지당 갯수
    const [TotalCount, setTotalCount] = useState(0) //전체 갯수
    const [SinglePage, setSinglePage] = useState(false); // 페이징 기능이 필요한지 아닌지(검색결과가 8개 이하인지 아닌지)
    


    useEffect(() => {
        console.log(SearchTerm)
        SearchList(SearchTerm,ListPage)
        // let tmpList = contentList.filter(x=>x.seq>=(((ListPage-1)*CountPerPage)+1) && x.seq<=(ListPage*CountPerPage));
        // setTotalCount(contentList.length);
        // setDisplayList(tmpList);
    }, [contentList])

    const onSearchHandler=(value)=>{
        SearchList(value,1)
        setSearchTerm(value);
        dispatch({type: SET_SEARCHKEYWORD, keyword: value})
    }
    const SearchList=(value,page)=>{
        let newList = contentList.filter(x=>
            x.place.indexOf(value)>-1
            || x.name.indexOf(value)>-1
            || x.year === value
            || x.city.indexOf(value)>-1
            || x.region.indexOf(value)>-1
            );
        let tmpList =[];
        if(newList.length > CountPerPage){ //갯수가 너무 많을때 페이지당 표출 갯수로 로딩 제한....???.
            newList.forEach((item,i)=>{
                if(i>=(((page-1)*CountPerPage)+1) && i<=(page*CountPerPage)){
                    tmpList.push(item);
                }
            })
        }else{
            tmpList = newList;
            setSinglePage(true);
        }
        setDisplayList(tmpList)
        setTotalCount(newList.length);
        setListPage(page)
        
    }
    const onPageChange=(currentPage,pageSize)=>{
        SearchList(SearchTerm,currentPage)
        setListPage(currentPage);
    }


    return (
        <React.Fragment>
            <ListSearchBar onInputChange={onSearchHandler}/>
            <hr/>
            <List 
            dataSource={DisplayList}
            renderItem={item=>(
                <List.Item style={{justifyContent:"center"}}>
                    <Card title={item.name} bordered={false} style={{width:"350px"}}
                    actions={[
                        <SecurityScanFilled onClick={()=>props.viewDetail(item)}/>,
                        <EnvironmentFilled onClick={()=>props.moveToPoint(item)}/>
                    ]}
                    >
                        <Text>장소 : {item.place}</Text>
                        <br/>
                        <Text>지역 : {item.city} {item.region}</Text>
                        <br/>
                        <Text>년도 : {item.year}</Text>
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
            />
            
        </React.Fragment>
    )
}

export default InvestigationListComponent
