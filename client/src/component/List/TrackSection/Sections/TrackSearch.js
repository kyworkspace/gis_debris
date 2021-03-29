import React,{ useState } from 'react'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { dateToString } from '../../../../entities/CommonMethods';

const shipType=[
    {
        id : 1,
        type : "어선"
    },
    {
        id : 2,
        type : "여객선"
    },
    {
        id : 3,
        type : "상선"
    },
    {
        id : 4,
        type : "컨테이너선"
    },
    {
        id : 5,
        type : "기타"
    }
]
const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
  })
);
//초기 날짜
const today = new Date(2021,0,1);
//페이지 열릴때 기본 날짜 현재날짜 -7
const past = new Date(2021,0,1);
past.setDate(today.getDate()-1)
const startDate = dateToString(past);
const endDate = dateToString(today);
  
function TrackSearch(props) {
    const {btnState,searchHandler}  = props;
    const classes = useStyles();
    const [ShipType, setShipType] = useState(1);
    const [StartDate, setStartDate] = useState(startDate);
    const [EndDate, setEndDate] = useState(endDate);
    const [ShipName, setShipName] = useState("");

    const handleChange = (event) => {
        setShipType(event.target.value);
    };
    const onStartDateHandler=(e)=>{
        setStartDate(e.currentTarget.value);
    }
    const onEndDateHandler=(e)=>{
        setEndDate(e.currentTarget.value);
    }
    const onShipNameHandler=(e)=>{
        setShipName(e.currentTarget.value);
    }
    const onResetHandler=(e)=>{
        setShipName("");
        setStartDate(startDate);
        setEndDate(endDate)
        setShipType(1);
    }
    const onSearchHandler=(e)=>{
        e.preventDefault();
        let variable={
            shipName : ShipName,
            shipType : ShipType,
            startDate : StartDate,
            endDate : EndDate
        }
        searchHandler(variable);
    }
    return (
        <form className={classes.root} noValidate autoComplete="off" onSubmit={onSearchHandler}>
                    <TextField id="standard-search" label="선박명" type="search" value={ShipName} onChange={onShipNameHandler}/>
                    <TextField
                        id="standard-select-currency"
                        select
                        label="선박종류"
                        value={ShipType}
                        onChange={handleChange}
                    >
                        {shipType.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                        {option.type}
                        </MenuItem>
                    ))}
                    </TextField>
                    <div>
                        <TextField
                            id="track_startDate"
                            label="시작날짜"
                            type="datetime-local"
                            defaultValue={StartDate}
                            value={StartDate}
                            className={classes.textField}
                            onChange={onStartDateHandler}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                         <TextField
                            id="track_endDate"
                            label="종료날짜"
                            type="datetime-local"
                            defaultValue={EndDate}
                            value={EndDate}
                            onChange={onEndDateHandler}
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </div>
                    <div style={{textAlign:"right"}}>
                        <Button variant="contained" color="secondary" style={{margin:5}} onClick={onResetHandler} disabled={btnState}>
                            초기화
                        </Button>
                        <Button variant="contained" color="primary" style={{margin:5}} onClick={onSearchHandler} disabled={btnState}>
                            검색
                        </Button>
                    </div>
            </form>
    )
}

export default TrackSearch
