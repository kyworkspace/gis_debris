import React, { useEffect, useState } from 'react'
import { Card, List, Typography, Input, Pagination, Checkbox } from 'antd';
import { EnvironmentFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { MainMap } from '../../../entities/CommonMethods';
import { setLayerList } from '../../../_actions/map_actions';
const { Text } = Typography;
const { Search } = Input;



function LayerListComponent(props) {

    // const { contentList } = props;
    const dispatch = useDispatch();

    const [DisplayList, setDisplayList] = useState([]);
    const [ListPage, setListPage] = useState(1) //첫시작 페이지
    const [SearchTerm, setSearchTerm] = useState(""); //검색어
    const [CountPerPage, setCountPerPage] = useState(8); //페이지당 갯수
    const [TotalCount, setTotalCount] = useState(0)
    const [SinglePage, setSinglePage] = useState(false);

    console.log(DisplayList)
    useEffect(() => {
        setDisplayList(props.contentList)
        // const marineZoneLayer = DisplayList[0].Layer
        // console.log(marineZoneLayer)
        // marineZoneLayer.setVisible(false);
        // let tmpList = props.contentList.filter(x => x.seq >= (((ListPage - 1) * CountPerPage) + 1) && x.seq <= (ListPage * CountPerPage));
        // console.log(tmpList);

    }, [])



    return (
        <React.Fragment>
            <div
                style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto', marginRight: 20 }}
            >
                <Search
                    placeholder="레이어명.."
                    style={{ width: 300 }}
                    enterButton
                    value={SearchTerm}
                // onChange={onSearchHandler}
                />
            </div>
            <hr />
            <List
                dataSource={DisplayList}
                renderItem={item => (
                    <List.Item style={{ justifyContent: "center" }}>
                        <Card title={item.LayerName} bordered={false} style={{ width: "350px" }}
                            actions={[
                                <Checkbox >표출여부</Checkbox>
                            ]}
                        >
                            {/* <Text>장소 : {item.place}</Text>
                            <br />
                            <Text>지역 : {item.city} {item.region}</Text>
                            <br />
                            <Text>년도 : {item.year}</Text>
                            <br />
                            <Text>좌표여부 : {item.geomCheck ? '좌표 있음' : '좌표 없음'}</Text>
                            <br />
                            <Text>중심위치 : {item.geomCheck && item.coordinate[0] + " , " + item.coordinate[1]}</Text> */}
                        </Card>
                    </List.Item>
                )}
            />
            <Pagination
                current={ListPage}
                pageSize={CountPerPage}
                total={TotalCount}
                hideOnSinglePage={SinglePage}
                // onChange={onPageChange}
                simple
                style={{ justifyContent: "center", display: 'flex' }}
            />

        </React.Fragment>
    )
}

export default LayerListComponent
