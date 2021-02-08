import React, { useEffect, useState } from 'react'
import { Card, List, message, Typography,Input,Pagination } from 'antd';
import { useSelector } from 'react-redux';
import { SecurityScanFilled, EnvironmentFilled } from '@ant-design/icons';
import { mapMove,invServiceDisplay } from '../../main/CommonMethods';

const {Text} = Typography;
const {Search} = Input;

function TableList(props) {
    const [contentList, setcontentList] = useState([]); //표출할 리스트
    const ListinReducer = useSelector(state => state.mapReducer); //리듀서에서 가져온 항목
    const type = props.type;
    const [ListPage, setListPage] = useState(1) //첫시작 페이지
    const [SearchTerm, setSearchTerm] = useState(""); //검색어
    const [CountPerPage, setCountPerPage] = useState(8); //페이지당 갯수
    const [TotalCount, setTotalCount] = useState(0); //전체 갯수
    const [AllList, setAllList] = useState([]); //전체 목록


    useEffect(() => {
        switch (type) {
            case "invList":      
            if(ListinReducer.invList===undefined)
                return ;
            let tmpList = ListinReducer.invList.filter(x=>x.seq>=(((ListPage-1)*CountPerPage)+1) && x.seq<=(ListPage*CountPerPage));
            setcontentList(tmpList);
            setAllList(ListinReducer.invList);
            setTotalCount(ListinReducer.invList.length);
            break;
        
            default:
                break;
        }
        
    }, [ListinReducer])
    const onSearchHandler=(e)=>{
        SearchList(e.currentTarget.value,1)
    }
    const SearchList=(value,page)=>{
        let newList = AllList.filter(x=>
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
        }
        setcontentList(tmpList)
        setTotalCount(newList.length);
        setSearchTerm(value);
    }

    const onViewDetail=(item)=>{
        
    }

    const onMoveToPoint=(item)=>{
        //좌표가 있을때만 실행
        if(item.coordinate){
            mapMove(item.coordinate)
        }else{
            message.warning("저장된 좌표가 없습니다.")
        }
        switch (type) {
            case "invList":
                invServiceDisplay(item.seq);
                break;
        
            default:
                break;
        }
    }
    const onPageChange=(currentPage,pageSize)=>{
        SearchList(SearchTerm,currentPage)
        setListPage(currentPage);
    }

    return (
        // <Table dataSource={contentList} columns={Columns}/>
        <React.Fragment>
            <div
                style={{display:'flex',justifyContent:'flex-end', margin:'1rem auto',marginRight:20}}
            >
                <Search 
                    placeholder="년도, 사업명, 지역명..."
                    style={{width:300}}
                    enterButton
                    value={SearchTerm}
                    onChange={onSearchHandler}
                />
            </div>
            <hr/>
            <List 
            // header={<Divider>조사사업</Divider>}
            // footer={<div>푸터</div>}
            dataSource={contentList}
            renderItem={item=>(
                <List.Item style={{justifyContent:"center"}}>
                    <Card title={item.name} bordered={false} style={{width:"350px"}}
                    actions={[
                        <SecurityScanFilled onClick={()=>onViewDetail(item)}/>,
                        <EnvironmentFilled onClick={()=>onMoveToPoint(item)}/>
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
                onChange={onPageChange} 
                simple 
                style={{justifyContent:"center",display:'flex'}}
            />
            
        </React.Fragment>
        
    )
}

export default TableList
