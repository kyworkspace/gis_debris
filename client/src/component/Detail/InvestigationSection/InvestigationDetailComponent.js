import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

function InvestigationDetailComponent(props) {
    const {item} = props;

    const useStyles = makeStyles({
        table: {
            minWidth: 200,
        },
    });

    const classes = useStyles();
    const coordinateAllDisplay = (coordinate) =>{
        if(!coordinate) return false;
        let coordinateArr = coordinate.split(",")
        let component = coordinateArr.map(item=>(
                         <div>{item}</div>
                        )) ;
        return component;
    }

    return (
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableBody>
            <TableRow>
                <TableCell align="right">사업명</TableCell>
                <TableCell align="center">{item.name}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="right">발주처</TableCell>
                <TableCell align="center">{item.agent}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="right">면적</TableCell>
                <TableCell align="center">{item.area}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="right">지역</TableCell>
                <TableCell align="center">{item.city} &nbsp; {item.region} </TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="right">장소</TableCell>
                <TableCell align="center">{item.place}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="right">출처</TableCell>
                <TableCell align="center">{item.source}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="right">년도</TableCell>
                <TableCell align="center">{item.year}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="right">좌표</TableCell>
                <TableCell align="center">{coordinateAllDisplay(item.coordinateAll)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    )
}

export default InvestigationDetailComponent
