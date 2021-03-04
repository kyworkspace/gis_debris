import React, { useEffect, useState } from 'react'
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
import {message} from 'antd';
import TrackRows from './Sections/TrackRows';
import { selectTrackList } from '../../../entities/CallbackMethod';

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
        label : "MMSI",
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
let dateTime = new Date();
const year = dateTime.getFullYear();
const month = dateTime.getMonth()+1>10? (dateTime.getMonth()+1):"0"+(dateTime.getMonth()+1);
const date = dateTime.getDate() > 10 ? dateTime.getDate() : "0"+dateTime.getDate();
const hour = dateTime.getHours()>10 ? dateTime.getHours() : "0"+dateTime.getHours();
const min = dateTime.getMinutes()>10 ? dateTime.getMinutes() : "0"+dateTime.getMinutes();
const startDate = year+"-"+(month-1>10?month-1:"0"+(month-1))+"-"+date+"T"+hour+":"+min;
const endDate = year+"-"+month+"-"+date+"T"+hour+":"+min;

function TrackListComponent() {
    const classes = useStyles();
    const [Loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [TrackList, setTrackList] = useState([]);
    const [open, setOpen] = React.useState(false);

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
        selectTrackList(body)
        .then(response=>{
            if(response.data.success){
                if(response.data.obj){
                    setTrackList(response.data.obj);
                    setLoading(false)
                }else{
                    setLoading(true)
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
            <TrackSearch searchHandler={searchTrackList}/>
            {Loading && 
                <div className={classes.root}>
                    <LinearProgress />
                </div>
            }
            {!Loading &&
                <Paper className={classes.root}>
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
                        <TrackRows row={item} key={item.mmsi_id}/>
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
            }
        </div>
    )
}

export default TrackListComponent