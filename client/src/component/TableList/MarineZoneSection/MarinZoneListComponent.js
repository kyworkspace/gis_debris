import React, { useEffect, useState } from 'react'
import { Card, List, message, Typography,Input,Pagination } from 'antd';
import { SecurityScanFilled, EnvironmentFilled } from '@ant-design/icons';

const {Text} = Typography;
const {Search} = Input;

function MarinZoneListComponent(props) {

    const {contentList} = props;

    const [DisplayList, setDisplayList] = useState([]);
    const [ListPage, setListPage] = useState(1) //첫시작 페이지
    const [SearchTerm, setSearchTerm] = useState(""); //검색어
    const [CountPerPage, setCountPerPage] = useState(8); //페이지당 갯수
    const [TotalCount, setTotalCount] = useState(0)
    const [SinglePage, setSinglePage] = useState(false);
    
    useEffect(() => {
        let tmpList = contentList.filter(x=>x.seq>=(((ListPage-1)*CountPerPage)+1) && x.seq<=(ListPage*CountPerPage));
        setTotalCount(contentList.length);
        setDisplayList(tmpList);
    }, [contentList])

    const onSearchHandler=(e)=>{
        SearchList(e.currentTarget.value,1)
        setSearchTerm(e.currentTarget.value);
    }
    const SearchList=(value,page)=>{
        let newList = contentList.filter(x=>
            x.name.indexOf(value)>-1
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
        setListPage(page)
        setTotalCount(newList.length);
        
    }
    const onPageChange=(currentPage,pageSize)=>{
        SearchList(SearchTerm,currentPage)
        setListPage(currentPage);
    }


    return (
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
            dataSource={DisplayList}
            renderItem={item=>(
                <List.Item style={{justifyContent:"center"}}>
                    <Card title={item.name} bordered={false} style={{width:"350px"}}
                    actions={[
                        <SecurityScanFilled onClick={()=>props.viewDetail(item)}/>,
                        <EnvironmentFilled onClick={()=>props.moveToPoint(item)}/>
                    ]}
                    >
                        <Text>장소 : {item.name}</Text>
                        <br/>
                        <Text>중심위치 : {item.coordinate[0] +" , "+item.coordinate[1]}</Text>
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

export default MarinZoneListComponent
