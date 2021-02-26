import { Card, Checkbox, List } from 'antd';
import Text from 'antd/lib/typography/Text';
import React, { useLayoutEffect, useRef, useState } from 'react'
import InfiniteScrollComponent from '../../utils/InfiniteScrollComponent';
import ListSearchBar from '../SearchSection/ListSearchBar';

function LayerListComponent() {
    const [CountPerPage, setCountPerPage] = useState(10)
    const [ContentList, setContentList] = useState([])
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

    const onSearchHandler = (value)=>{
        const filteredList = wholeList.current.filter(item=>{return item.layer_name.indexOf(value)>-1})
        console.log(filteredList);
        setContentList(filteredList);
    }
    const ListContent=(DisplayList)=>{
        return <List
                    dataSource={DisplayList}
                    renderItem={item => (
                        <List.Item style={{ justifyContent: "center" }}>
                            <Card title={item.layer_name} bordered={false} style={{ width: "350px" }}
                                actions={[
                                    <Checkbox >표출여부</Checkbox>,
                                ]}
                            >
                                <Text>인피니트 : {item.test}</Text>
                                
                            </Card>
                        </List.Item>
                    )}
                />
    }

    useLayoutEffect(() => {
        const filteredList = wholeList.current
        setContentList(filteredList);
    }, [ContentList])

    return (
        <>
        <ListSearchBar onInputChange={onSearchHandler}/>
            <hr/>
        <InfiniteScrollComponent ContentList={ContentList} CountPerPage={CountPerPage} IndexColumn="seq_no" ListContent={ListContent}/>
        </>
    )
}

export default LayerListComponent
