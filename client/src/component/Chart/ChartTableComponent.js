import React from 'react'
import { Table, Tag, Space,Typography } from 'antd';

const { Column, ColumnGroup } = Table;
const {Text} = Typography;
function ChartTableComponent(props) {

    const {data} = props;

    const chartData=data.map(item=>{
        let obj = new Object();
        obj.year = (item.inv_year || item.col_year);
        obj.invAmount = item.inv_amount;
        obj.colAmount = item.col_amount;
        obj.colFishingNet = item.col_fishing_net;
        obj.colScrap = item.col_scrap;
        obj.colNettrap = item.col_nettrap;
        obj.colRope = item.col_rope;
        obj.colEtc = item.col_etc;
        console.log(obj)
        return obj;
    })
    const columns=[
        {
            title : '년도',
            dataIndex :'year'
        },
        {
            title : '조사량',
            dataIndex :'invAmount'
        },
        {
            title : '수거량',
            dataIndex :'colAmount'
        },
        {
            title : "수거 종류",
            children : [
                {
                    title : '어망',
                    dataIndex :'colFishingNet'
                },
                {
                    title : '고철',
                    dataIndex :'colScrap'
                },
                {
                    title : '그물',
                    dataIndex :'colNettrap'
                },
                {
                    title : '로프',
                    dataIndex :'colRope'
                },
                {
                    title : '기타',
                    dataIndex :'colEtc'
                }
            ]

        }
        
    ]


    return (
        <Table 
        dataSource={chartData}
        columns={columns}
        pagination = {false}
        summary={pageData => {
            let totalInvAmount = 0;
            let totalColAmount = 0;
            let totalColFishingNet = 0;
            let totalcolScrap = 0;
            let totalcolNettrap = 0;
            let totalcolRope = 0;
            let totalcolEtc = 0;
    
            pageData.forEach(({ invAmount, colAmount,colFishingNet,colScrap,colNettrap,colRope,colEtc }) => {
                totalInvAmount += parseFloat(invAmount||0);
                totalColAmount += parseFloat(colAmount||0);
                totalColFishingNet += parseFloat(colFishingNet||0);
                totalcolScrap += parseFloat(colScrap||0);
                totalcolNettrap += parseFloat(colNettrap||0);
                totalcolRope += parseFloat(colRope||0);
                totalcolEtc += parseFloat(colEtc||0);
            });
            return (
                <>
                  <Table.Summary.Row>
                    <Table.Summary.Cell>합계</Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Text type="danger">{totalInvAmount}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Text>{totalColAmount}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Text>{totalColFishingNet}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Text>{totalcolScrap}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Text>{totalcolNettrap}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Text>{totalcolRope}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Text>{totalcolEtc}</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                  {/* <Table.Summary.Row>
                    <Table.Summary.Cell>Balance</Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={2}>
                      <Text type="danger">{totalBorrow - totalRepayment}</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row> */}
                </>
              );
            }}
        >
        </Table>
    )
}

export default ChartTableComponent
