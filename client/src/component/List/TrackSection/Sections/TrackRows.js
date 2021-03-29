import { IconButton,TableCell,TableRow,Collapse,Box,makeStyles } from '@material-ui/core';
import { SearchOutlined } from '@ant-design/icons';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {stringToDate,stringToTime, VpassTrackConverter} from '../../../../entities/CommonMethods';
import { Button, DatePicker, Divider, message, Typography  } from 'antd';
import { Descriptions } from 'antd';
import React, { useState } from 'react'
import {parseShipHisRecords} from '../../../../entities/TrackHistory'
import {useDispatch} from 'react-redux';
import {AddTrackTargetToStore} from '../../../../_actions/map_actions'
import { rerenderNotification } from '../../../Notification/Notification';
import { getTrackList } from '../../../../entities/CallbackMethod';

const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });
const { RangePicker } = DatePicker;



function TrackRows(props) {
    const dispatch = useDispatch();

    const { row } = props;
    const [startDate, setStartDate] = useState("");
    const [endDate, setendDate] = useState("")
    const [open, setOpen] = useState(false);
    const classes = useRowStyles();

    const onRangePickerHandler=(date,str)=>{
        setStartDate(str[0]);
        setendDate(str[1]);
    }
    const onTrackDiplayHandler=(shipId)=>{
      if(startDate === ""){
        alert("항적조회 시작날짜를 선택해주십시오")
        return ;
      }
      if(endDate === ""){
        alert("항적조회 종료날짜를 선택해주십시오")
        return ;
      }
      if(shipId.length > 8){
        alert("RFID 만 확인 가능합니다.")
        return ;
      }
      
      let body={
        id : shipId,
        name : row.ship_ko_nm,
        startDate : startDate,
        endDate : endDate,
        visible : true
      }
      getTrackList(body).then(response=>{
        if(response.data.success){
          if(response.data.trackList.length===0){
            message.info("조회된 항적이 없습니다.")
          }else{
            parseShipHisRecords(VpassTrackConverter(response.data.trackList),shipId);
            //리덕스에 추가함
            dispatch(AddTrackTargetToStore(body));
            rerenderNotification("TrackChoice");
          }
        }else{
          message.error(response.data.err.hint)
        }
      })
  }

    
    return (
        <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell align="right">{row.mmsi_id === '0' ? row.rfid_id=== '0' ? row.ship_id : row.rfid_id : row.mmsi_id}</TableCell>
          <TableCell align="right">{row.ship_ko_nm}</TableCell>
          <TableCell align="right">{props.timeViewer ?<p> {stringToDate(row.record_time)}<br/>{stringToTime(row.record_time)} </p>:stringToDate(row.record_time) }</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Descriptions
                    title={row.ship_ko_nm}
                    bordered
                    column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
                >
                    <Descriptions.Item label="선주명">{row.owner_name}</Descriptions.Item>
                    <Descriptions.Item label="주소">{row.owner_address}</Descriptions.Item>
                    <Descriptions.Item label="소속항">{row.reg_port_name}</Descriptions.Item>
                    <Descriptions.Item label="등록정보">{row.ship_mktrasg}</Descriptions.Item>
                </Descriptions>
                <Divider/>
                <Descriptions
                    title="선박 제원정보"
                    bordered
                    column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
                >
                    <Descriptions.Item label="길이">{row.ship_length}</Descriptions.Item>
                    <Descriptions.Item label="넓이">{row.ship_width}</Descriptions.Item>
                    <Descriptions.Item label="깊이">{row.ship_depth}</Descriptions.Item>
                    <Descriptions.Item label="톤수">{row.total_ton}</Descriptions.Item>
                    <Descriptions.Item label="엔진출력">{row.engine_kw}</Descriptions.Item>
                </Descriptions>
                <Divider/>
                <Typography>
                    {row.ship_ko_nm} 항적조회
                </Typography>
                <hr/>
                <RangePicker showTime style={{width:350}} onChange={onRangePickerHandler} defaultValue={null}/>
                <Button type="primary" icon={<SearchOutlined />} onClick={()=>onTrackDiplayHandler(row.mmsi_id === '0' ? row.rfid_id=== '0' ? row.ship_id : row.rfid_id : row.mmsi_id)}>
                    Search
                </Button>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    )
}

export default TrackRows
