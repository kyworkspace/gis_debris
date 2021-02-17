import React, { useEffect, useState } from 'react'
import { Descriptions,Row,Col, Progress, Divider } from 'antd';
import { getMarineZone } from '../../../entities/MarineZone';
import GeoJSON from 'ol/format/GeoJSON';
import { CircularProgress } from '@material-ui/core';
import Text from 'antd/lib/typography/Text';
import axios from 'axios';
import Title from 'antd/lib/typography/Title';
import ChartComponent from '../../Chart/ChartComponent';

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
                    <Descriptions
                        title="Responsive Descriptions"
                        bordered
                        column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
                        >
                        <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
                        <Descriptions.Item label="Billing">Prepaid</Descriptions.Item>
                        <Descriptions.Item label="time">18:00:00</Descriptions.Item>
                        <Descriptions.Item label="Amount">$80.00</Descriptions.Item>
                        <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
                        <Descriptions.Item label="Official">$60.00</Descriptions.Item>
                        <Descriptions.Item label="Config Info">
                            Data disk type: MongoDB
                            <br />
                            Database version: 3.4
                            <br />
                            Package: dds.mongo.mid
                            <br />
                            Storage space: 10 GB
                            <br />
                            Replication factor: 3
                            <br />
                            Region: East China 1
                        </Descriptions.Item>
                    </Descriptions>
                </Col>
                <Col  lg={12} xs={24}>
                데이터 부분
                </Col>
            </Row>
            
            }
           
        </div>
    )
}

export default WindowSectionModal
