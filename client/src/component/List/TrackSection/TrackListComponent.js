import React, { createContext, useContext, useEffect, useState } from 'react'
import TrackSearch from './Sections/TrackSearch'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import {TableCell,TableBody} from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import LinearProgress from '@material-ui/core/LinearProgress';
import {message, Progress} from 'antd';
import TrackRows from './Sections/TrackRows';
import { selectShipInfoList, selectTrackList } from '../../../entities/CallbackMethod';
import { dateToString, JsonToArray } from '../../../entities/CommonMethods';
import { MenuTypeContext } from '../../Navbar/MainComponent';
import Text from 'antd/lib/typography/Text';

const useStyles = makeStyles((theme)=>({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
    container: {
      maxHeight: '100%',
      maxWidth:'100%'
    },
  }));

const columns =[
    {
        id:"mmsi_id",
        label : "MMSI/RFID",
        minWidth : 50,
        maxWidth : 100,
        align :'center'
    }
    ,{
        id:"ship_ko_nm",
        label : "선박명",
        minWidth : 50,
        maxWidth : 70,
        align :'center'
    }
    ,{
        id:"record_time",
        label : "수신시간",
        minWidth : 50,
        maxWidth : 70,
        align :'center'
    }

]
//검색 초기 날짜
const dateTime = new Date(2020,0,2);
const past = new Date(2020,0,2);
past.setDate(dateTime.getDate()-1)
const startDate = dateToString(past);
const endDate = dateToString(dateTime)



export const TrackSearchContext = createContext({
    setSearchingDate : ()=>{},
    setEndDate : ()=>{},
    setLoadingTrackPercent : ()=>{},
    setLoadingTrack :()=>{}
})


const TrackListComponent=() =>{

    const {detailItem} = useContext(MenuTypeContext) //영역임
    
    const classes = useStyles();
    const [Loading, setLoading] = useState(true);
    
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [TrackList, setTrackList] = useState([]);

    //항적조회중일때 표출 항목
    const [LoadingTrack, setLoadingTrack] = useState(false)
    const [SearchingDate, setSearchingDate] = useState("")
    const [EndDate, setEndDate] = useState("")
    const [LoadingTrackPercent, setLoadingTrackPercent] = useState(0)
    // context 초기값
    const SearchingTrack={
        setSearchingDate  : setSearchingDate, //검색중인날짜
        setEndDate : setEndDate, //종료 날짜
        setLoadingTrackPercent : setLoadingTrackPercent, //진행률
        setLoadingTrack : setLoadingTrack //로딩중인지 아닌지
    }

    useEffect(() => {
        searchTrackList();
    }, [])

    const searchTrackList=(parameter)=>{
        setLoading(true)
        //shipName
        //shipType
        //startDate
        //endDate
        let body={
            startDate : startDate,
            endDate : endDate
        }
        if(parameter){
            body = parameter
        }
        if(detailItem){
            body.area = detailItem;
        }
        selectTrackList(body)
        .then(response=>{
            if(response.data.success){
                const {shipInAreaList} = response.data;
                message.success("항적이 있는 선박을 조회하였습니다.")
                if(Object.keys(shipInAreaList).length > 0 ){
                    message.info("선박정보를 호출합니다.")
                    selectShipInfoList(JsonToArray(shipInAreaList))
                    .then(response=>{
                        if(response.success){
                            setTrackList(response.shipList);
                            message.info("선박정보를 호출하였습니다.")
                            setLoading(false)
                        }else{
                        message.error("선박정보 호출에 실패하였습니다.")  
                        setLoading(false)
                        }
                    })
                }else{
                    message.info("항적 기록이 없습니다.")
                    setLoading(false)
                }
            }else{
                console.log(response.data.err)
                message.error("항적을 불러오는데 실패하였습니다.")
            }
        })
    }
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
    return (
        <div style={{maxWidth:"500px"}}>
            <TrackSearchContext.Provider value={SearchingTrack}>
            <TrackSearch searchHandler={searchTrackList} btnState = {Loading}/>
            {Loading && 
                <div className={classes.root}>
                    <LinearProgress />
                </div>
            }
            {!Loading &&
                <div style={{maxHeight:'850px', overflowY:'auto'}}>
                {LoadingTrack && <div style={{
                    minWidth:'100%', 
                    minHeight:'100%', 
                    backgroundColor:'white',
                    opacity:'0.9', 
                    position:'absolute',
                    }}>
                        <Progress percent={LoadingTrackPercent} 
                        
                        type="circle"
                        strokeColor={{
                            '0%': '#108ee9',
                            '100%': '#87d068',
                          }}
                        style={{
                            position:'absolute',
                            top: "18%",
                            left : "30%"
                        }}/>
                        <Text
                        style={{
                            position : 'absolute',
                            top : '32%',
                            left : '20%',
                            color : 'black'
                        }}
                        >{SearchingDate}를 조회 중입니다.</Text>
                        </div>}
                <Paper className={classes.root} 
                style={{pointerEvents:`${LoadingTrack ? 'none':""}`}}
                >
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                        <TableCell/>
                        {columns.map((column) => (
                            <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth, maxWidth : column.maxWidth }}
                            >
                            {column.label}
                            </TableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {TrackList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item=>(
                        <TrackRows row={item} key={item.ship_id}/>
                    ))}
                        
                    </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={TrackList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            </div>
            }
            </TrackSearchContext.Provider>
        </div>
    )
}

export default TrackListComponent