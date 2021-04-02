import React, { useContext, useEffect, useState } from 'react'
import { Card, List, message, Typography, Input, Pagination } from 'antd';
import { SecurityScanFilled, EnvironmentFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { setSelectVectorLayer } from '../../../_actions/map_actions'
import { selectedMarineZone } from '../../../entities/CommonMethods'
import { MainMap} from '../../../entities/MapLayer'
import { Vector as VectorLayer } from 'ol/layer'
import { Polygon } from 'ol/geom';
import { Feature } from 'ol';
import { Vector } from 'ol/source'
import { Style, Stroke, Fill } from 'ol/style'
import ListSearchBar from '../SearchSection/ListSearchBar';
import {MenuTypeContext, SET_SEARCHKEYWORD} from '../../main/MainComponent' 

const { Text } = Typography;
const { Search } = Input;

export const SelectedMarineZoneSource = new Vector();

function MarinZoneListComponent(props) {

    const { contentList } = props; // 전체 리스트

    const {dispatch, searchKeyword} = useContext(MenuTypeContext); //context
    // const dispatch = useDispatch();
    const [DisplayList, setDisplayList] = useState([]); //표출 리스트
    const [ListPage, setListPage] = useState(1) //첫시작 페이지
    const [SearchTerm, setSearchTerm] = useState(searchKeyword); //검색어
    const [CountPerPage, setCountPerPage] = useState(8); //페이지당 갯수
    const [TotalCount, setTotalCount] = useState(0) // 전체 갯수
    const [SinglePage, setSinglePage] = useState(false); // 페이징 기능이 필요한지 아닌지(검색결과가 8개 이하인지 아닌지)

    let selectedVectorLayer = useSelector(state => state.selectedVectorLayer)
    useEffect(() => {
        SearchList(SearchTerm, ListPage)
        // let tmpList = contentList.filter(x => x.seq >= (((ListPage - 1) * CountPerPage) + 1) && x.seq <= (ListPage * CountPerPage));
        // setTotalCount(contentList.length);
        // setDisplayList(tmpList);
    }, [contentList])

    const onSearchHandler = (value) => {
        SearchList(value, 1)
        setSearchTerm(value);
        dispatch({type: SET_SEARCHKEYWORD, keyword: value})
    }
    const SearchList = (value, page) => {
        let newList = contentList.filter(x =>
            x.name.indexOf(value) > -1
        );
        let tmpList = [];
        if (newList.length > CountPerPage) { //갯수가 너무 많을때 페이지당 표출 갯수로 로딩 제한....???.
            newList.forEach((item, i) => {
                if (i >= (((page - 1) * CountPerPage) + 1) && i <= (page * CountPerPage)) {
                    tmpList.push(item);
                }
            })
        } else {
            tmpList = newList;
            setSinglePage(true);
        }
        setDisplayList(tmpList)
        setListPage(page)
        setTotalCount(newList.length);

    }
    const onPageChange = (currentPage, pageSize) => {
        SearchList(SearchTerm, currentPage)
        setListPage(currentPage);
    }
    const onMoveToPointAndDisplayArea = (item) => {
        props.moveToPoint(item)//위치 이동
        let coor = item.geometry.flatCoordinates;
        var array = new Array;
        for (var i = 0; i < coor.length - 2; i++) {
            var coor1 = [coor[i], coor[i + 1]];
            array.push(coor1);
            i++;
        }

        console.log(MainMap.getLayers().getArray());

        MainMap.getLayers().getArray().forEach(item => {
            if (item.values_.name === "SelectedVectorLayer") {
                MainMap.removeLayer(item)
                document.querySelector("#clearLayer").click();
            }
        })
        var polygon = new Polygon([array]);
        var feature = new Feature(polygon);
        // var vectorSource = new Vector();
        SelectedMarineZoneSource.addFeature(feature);
        selectedVectorLayer = new VectorLayer({
            name: "SelectedVectorLayer",
            source: SelectedMarineZoneSource
        });
        MainMap.addLayer(selectedVectorLayer)
        var selectedStyle = new Style({
            stroke: new Stroke({
                color: 'rgb(051, 255, 255)',
                width: 3,
            })
            ,
            fill: new Fill({
                color: 'rgba(051, 255, 255, 0.05)',
            })
        });
        selectedVectorLayer.setStyle(selectedStyle);
        //dispatch(setSelectVectorLayer(selectedVectorLayer))
    }



    return (
        <React.Fragment>
            <ListSearchBar onInputChange={onSearchHandler}/>
            <hr />
            <List
                dataSource={DisplayList}
                renderItem={item => (
                    <List.Item style={{ justifyContent: "center" }}>
                        <Card title={item.name} bordered={false} style={{ width: "350px" }}
                            actions={[
                                <SecurityScanFilled onClick={() => props.viewDetail(item)} />,
                                <EnvironmentFilled onClick={() => onMoveToPointAndDisplayArea(item)} />
                            ]}
                        >
                            <Text>장소 : {item.name}</Text>
                            <br />
                            <Text>중심위치 : {item.coordinate[0] + " , " + item.coordinate[1]}</Text>
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
                style={{ justifyContent: "center", display: 'flex' }}
            />

        </React.Fragment>
    )
}

export default MarinZoneListComponent
