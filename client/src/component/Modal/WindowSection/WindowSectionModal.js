import React, { useEffect, useState } from 'react'
import { Descriptions,Row,Col, Progress, Divider } from 'antd';
import { getMarineZone } from '../../../entities/MarineZone';
import GeoJSON from 'ol/format/GeoJSON';
import { CircularProgress } from '@material-ui/core';
import Text from 'antd/lib/typography/Text';
import axios from 'axios';
import Title from 'antd/lib/typography/Title';
import ChartComponent from '../../Chart/ChartComponent';
import ChartTableComponent from '../../Chart/ChartTableComponent';

function WindowSectionModal(props) {
    
    const todayDate = new Date();
    const marineZoneId = props.match.params.marineZoneId;
    const [Loading, setLoading] = useState(true);
    const [MarineZoneInfo, setMarineZoneInfo] = useState({});
    const [ChartDatas, setChartDatas] = useState([]);
    const [Year, setYear] = useState(todayDate.getFullYear());

    useEffect(() => {
        getMarineZone(marineZoneId)
        .then(result=>{
            if(result){
                let parser = new GeoJSON();
                let marineZone = parser.readFeatures(result);
                //해구정보 가져옴
                let properties = marineZone[0].getProperties();
                setMarineZoneInfo(properties);
                // 챠트 정보 가져옴
                let marineZoneNumber = properties.lreareano+"-"+properties.salareasub;
                let body={
                    marinezoneId : marineZoneNumber,
                    year : Year
                }
                axios.post("/gis/eng/getInvAndColDataInMarinezone",body)
                .then(response=>{
                    console.log(response.data.objList)
                    setChartDatas(response.data.objList)
                })
                //항적 정보 가져옴

                setLoading(false)
            }
        })
    }, [])


    return (
        <div style={{padding:15}}>
            <Title level={2}>조사/수거 통합정보</Title>
            <Divider/>
            {Loading ?
            <div style={{width:"100vh", height:"800px"}}>
                <div style={{position:'absolute',top:'50%',left:'40%',textAlign:'center'}}>
                    <CircularProgress />
                    <br/>
                    <Text>해구 상세 정보 불러오는중</Text>
                </div>
            </div>
            :
            <Row gutter={[16,16]}>
                <Col lg={12} xs={24}>
                    <ChartComponent data={ChartDatas}/>
                </Col>
                <Col  lg={12} xs={24}>
                <ChartTableComponent data={ChartDatas}/>
                </Col>
            </Row>
            
            }
           
        </div>
    )
}

export default WindowSectionModal
