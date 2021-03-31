import { IconButton, TableCell, TableRow, Collapse, Box, makeStyles } from '@material-ui/core';
import { SearchOutlined } from '@ant-design/icons';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { stringToDate, stringToTime, trackTermSearch, VpassTrackConverter } from '../../../../entities/CommonMethods';
import { Button, DatePicker, Divider, message, Typography } from 'antd';
import { Descriptions } from 'antd';
import React, { useContext, useState } from 'react'
import { parseShipHisRecords } from '../../../../entities/TrackHistory'
import { useDispatch } from 'react-redux';
import { AddTrackTargetToStore } from '../../../../_actions/map_actions'
import { rerenderNotification } from '../../../Notification/Notification';
import { getTrackList } from '../../../../entities/CallbackMethod';
import async from 'async'
import { TrackSearchContext } from '../TrackListComponent';

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
  const context = useContext(TrackSearchContext)
  const { row } = props;
  const [startDate, setStartDate] = useState("");
  const [endDate, setendDate] = useState("")
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();

  const onRangePickerHandler = (date, str) => {
    setStartDate(str[0]);
    setendDate(str[1]);
  }
  const onTrackDiplayHandler = (shipId) => {
    if (startDate === "") {
      alert("항적조회 시작날짜를 선택해주십시오")
      return;
    }
    if (endDate === "") {
      alert("항적조회 종료날짜를 선택해주십시오")
      return;
    }
    if (shipId.length > 8) {
      alert("RFID 만 확인 가능합니다.")
      return;
    }


    let term = new Date(new Date(endDate) - new Date(startDate)) / 86400000;
    let tableList = trackTermSearch(startDate, term);
    let trackList = [];

    let CompletedTableCount = 0;
    context.setLoadingTrack(true);
    context.setEndDate(new Date(endDate).toLocaleDateString());

    async.forEach(tableList, function (tableName, callback) {
      let body = {
        id: shipId,
        name: row.ship_ko_nm,
        tableName: tableName,
        visible: true
      }


      getTrackList(body).then(response => {
        if (response.data.success) {
          CompletedTableCount = CompletedTableCount + 1;
          console.log(response.data, 'hi')
          //진행도
          context.setLoadingTrackPercent(Math.floor(CompletedTableCount / tableList.length * 100))
          context.setSearchingDate(tableName);
          if (response.data.trackList.length === 0) {
            callback();
          } else {
            trackList.push(...response.data.trackList);
            callback();
          }
        }
      })

    }, function (err) {
      if (err) return alert("에러발생")
      //항적 표시
      parseShipHisRecords(VpassTrackConverter(trackList), shipId);
      //리덕스 추가
      dispatch(AddTrackTargetToStore({
        id: shipId,
        name: row.ship_ko_nm,
        startDate: startDate,
        endDate: endDate,
        visible: true
      }));
      // 항적상자 오픈
      rerenderNotification("TrackChoice");
      //로딩 끝내기
      context.setEndDate("");
      context.setLoadingTrackPercent(0);
      context.setSearchingDate("");
      context.setLoadingTrack(false);
    });

  }


  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="right">{row.rfid_id === '0' ? row.mmsi_id === '0' ? row.ship_id : row.mmsi_id : row.rfid_id}</TableCell>
        <TableCell align="right">{row.ship_ko_nm}</TableCell>
        <TableCell align="right">{props.timeViewer ? <p> {stringToDate(row.record_time)}<br />{stringToTime(row.record_time)} </p> : stringToDate(row.record_time)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Descriptions
                title={row.ship_ko_nm}
                bordered
                column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
                size="small"
              >
                <Descriptions.Item label="선주명">{row.owner_name}</Descriptions.Item>
                <Descriptions.Item label="주소">{row.owner_address}</Descriptions.Item>
                <Descriptions.Item label="소속항">{row.reg_port_name}</Descriptions.Item>
                <Descriptions.Item label="등록정보">{row.ship_mktrasg}</Descriptions.Item>
              </Descriptions>
              <Divider />
              <Descriptions
                title="선박 제원정보"
                bordered
                column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
                size="small"
              >
                <Descriptions.Item label="길이" >{row.ship_length}</Descriptions.Item>
                <Descriptions.Item label="넓이" >{row.ship_width}</Descriptions.Item>
                <Descriptions.Item label="깊이">{row.ship_depth}</Descriptions.Item>
                <Descriptions.Item label="톤수">{row.total_ton}</Descriptions.Item>
                <Descriptions.Item label="엔진출력">{row.engine_kw}</Descriptions.Item>
              </Descriptions>
              <Divider />
              <Typography>
                {row.ship_ko_nm} 항적조회
                </Typography>
              <hr />
              <RangePicker showTime style={{ width: 350 }} onChange={onRangePickerHandler} defaultValue={null} />
              <Button type="primary" icon={<SearchOutlined />} onClick={() => onTrackDiplayHandler(row.rfid_id === '0' ? row.mmsi_id === '0' ? row.ship_id : row.mmsi_id : row.rfid_id)}>

              </Button>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export default TrackRows
