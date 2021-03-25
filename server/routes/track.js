const express = require('express');
const router = express.Router();
var async = require('async');
const config = require("../config/key");



router.post("/selectShipList",(req,res)=>{
    const {Client} = require("pg");
    const client = new Client(config.TrackDBAccess)
    client.connect();
    let {ids} = req.body;
    let queryString = `select * from ship_t_tb_newdb where rfid_id in (${ids.map(item=>`'${item}'`).toString()})`;
    client.query( queryString,(err,queryRes)=>{
        if(err) return res.json({success:false,err})

        client.end();
        return res.status(200).json({success:true,shipList:queryRes.rows})
    })
})
router.post("/track",(req,res)=>{

    const {Client} = require("pg");
    const client = new Client(config.TrackDBAccess)
    client.connect();

    let {id,startDate,endDate} = req.body
    let startTerm = new Date(startDate)
    let endTerm = new Date(endDate);
    let term = new Date(endTerm-startTerm)/86400000;

    let tableList = trackTermSearch(startTerm,term);

    let trackList = [];
    async.forEach(tableList,function(tableName,callback){
        console.log(tableName, " 작업중");
        let queryString =
	   ` select * from 
			${tableName} tt
		where
		1=1
        and
		rfid_id = '${id}'
        order by rfid_revdate 
		`
        client.query(queryString, async function(err,queryRes,fields){
            await trackList.push(...queryRes.rows);
            callback();
        })
    },function(err){ 
        client.end();
        if(err){
            return res.status(400).json({success : false,err});
        }else{
            console.log(trackList.length);
            return res.status(200).json({success : true,trackList}) ;
        }
    })

    // let queryString=`select
    //                     *
    //                 from
    //                     \"AIS\".track_92_5 t
    //                 where
    //                     t.record_time between to_timestamp('${startDate}','yyyy-mm-dd hh24:mi:ss')  
    //                     and to_timestamp('${endDate}','yyyy-mm-dd hh24:mi:ss') and mmsi = ${mmsi}`
    // client.query(queryString,(err,queryRes)=>{
    //     if(err) return res.json({success:false,err})
    //     let trackList= [];
    //     queryRes.rows.forEach(item=>{
    //         trackList.push(item)
    //     })
    //     client.end();
    //     return res.status(200).json({success:true,trackList})
    // })
})

router.post("/list", (req,res)=>{
    let {shipType,shipName,startDate,endDate,area} = req.body
    let startTerm = new Date(startDate)
    let endTerm = new Date(endDate);
    let term = new Date(endTerm-startTerm)/86400000;

    let tableList = trackTermSearch(startTerm,term);
    //let tableList = ['th_track_20200101','th_track_20200102'];
    let shipInAreaList={};

    const {Client} = require("pg");
    const client = new Client(config.TrackDBAccess)
    client.connect()
    async.forEach(tableList,function(tableName,callback){
        console.log(tableName, " 작업중");
        let queryString =
	   ` select rfid_id from 
			${tableName} tt
		where
		1=1
		${area &&
			`and ( select st_contains( ST_GeomFromText('POLYGON(( ${area.toString()} ))')
			, st_astext(ST_GeomFromText('POINT(' || (tt.rfid_lon / 600000) || ' ' || tt.rfid_lat/600000 || ')'))) ) = true`
		}
		`
        client.query(queryString, async function(err,queryRes,fields){
            await queryRes.rows.forEach(item=>{
                shipInAreaList[item.rfid_id ] = item.rfid_id;
            })
            callback();
        })
    },function(err){ 
        client.end();
        if(err){
            return res.status(400).json({success : false,err});
        }else{
            return res.status(200).json({success : true,shipInAreaList}) ;
        }
    })
})


const trackTermSearch=(startDate,term)=>{
    let returnStr = [];
    for(let i = 0 ; i < term+1; i++){
        let startTerm = new Date(startDate);
        let tmpDate = new Date();
        tmpDate.setFullYear(startTerm.getFullYear());
        tmpDate.setMonth(startTerm.getMonth());
        tmpDate.setDate(startTerm.getDate()+i);
        
        returnStr.push(`th_track_${dateyyyymmdd(tmpDate)}`);
    }
    return returnStr;
    
}
const dateyyyymmdd=(Date)=>{
    let year = Date.getFullYear();
    let month = Date.getMonth()+1 > 10 ? Date.getMonth()+1 : "0"+(Date.getMonth()+1);
    let date = Date.getDate() > 10 ? Date.getDate() : "0"+Date.getDate();

    return year+""+month+""+date;
}

module.exports = router;