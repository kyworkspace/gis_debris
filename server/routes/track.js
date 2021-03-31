const express = require('express');
const router = express.Router();
var async = require('async');
const config = require("../config/key");



// router.post("/selectShipList", (req, res) => {
//     const { Client } = require("pg");
//     const client = new Client(config.TrackDBAccess)
//     client.connect();
//     let { ids } = req.body;
//     let queryString = `select * from ship_t_tb_newdb where rfid_id in (${ids.map(item => `'${item}'`).toString()}) order by rfid_id`;

//     // let queryString = `select * from ship_t_tb_newdb where rfid_id in (${ids.map(item=>`'${item.rfid_id}'`).toString()})`;
//     client.query(queryString, (err, queryRes) => {
//         if (err) return res.json({ success: false, err })

//         client.end();
//         return res.status(200).json({ success: true, shipList: queryRes.rows })
//     })
// })

router.post("/track", (req, res) => {

    const { Client } = require("pg");
    const client = new Client(config.TrackDBAccess)
    client.connect();

    let { id, tableName } = req.body
    let queryString =
        ` select * from 
			${tableName} tt
		where
		1=1
        and
		rfid_id = '${id}'
        order by rfid_revdate 
		`
    console.log(queryString)
    client.query(queryString, function (err, queryRes, fields) {
        client.end();
        if (err) {
            return res.status(400).json({ success: false, err });
        } else {
            return res.status(200).json({ success: true, trackList: queryRes.rows, tableName });
        }
    })
})

router.post("/list", (req, res) => {


    let { shipType, shipName, startDate, endDate, area } = req.body
    let startTerm = new Date(startDate)
    let endTerm = new Date(endDate);
    let term = new Date(endTerm - startTerm) / 86400000;

    let tableList = trackTermSearch(startTerm, term);
    //let tableList = ['th_track_20200101','th_track_20200102'];
    let shipInAreaList = {};
    const { Client } = require("pg");
    const client = new Client(config.TrackDBAccess)
    client.connect()

    // if(shipName){ //선박명이 있는 경우에는 선박 rfid를 먼저 가지고 온다.

    // }else{

    // }
    async.forEach(tableList, function (tableName, callback) {
        let queryString =
            ` select * from (select distinct rfid_id from 
			${tableName} tt
		where
		1=1
		${area ?
                `and ( select st_contains( ST_GeomFromText('POLYGON(( ${area.toString()} ))')
			, tt.geom)) = true`
                :
                ""
            }) a left join ship_t_tb_newdb sttn on a.rfid_id = sttn.rfid_id where 1=1 ${shipName ? `and sttn.ship_ko_nm like '%${shipName}%'` : ""}
		`
        console.log(queryString)
        client.query(queryString, async function (err, queryRes, fields) {
            if (err) {
                console.log(err)
                return callback();
            }
            await queryRes.rows.forEach(item => {
                shipInAreaList[item.rfid_id] = item;
            })
            callback();
        })
    }, function (err) {
        client.end();
        if (err) {
            return res.status(400).json({ success: false, err });
        } else {
            return res.status(200).json({ success: true, shipInAreaList });
        }
    })
})


const trackTermSearch = (startDate, term) => {
    let returnStr = [];
    for (let i = 0; i < term + 1; i++) {
        let startTerm = new Date(startDate);
        let tmpDate = new Date();
        tmpDate.setFullYear(startTerm.getFullYear());
        tmpDate.setMonth(startTerm.getMonth());
        tmpDate.setDate(startTerm.getDate() + i);

        returnStr.push(`th_track_${dateyyyymmdd(tmpDate)}`);
    }
    return returnStr;

}
const dateyyyymmdd = (Date) => {
    let year = Date.getFullYear();
    let month = Date.getMonth() + 1 >= 10 ? Date.getMonth() + 1 : "0" + (Date.getMonth() + 1);
    let date = Date.getDate() >= 10 ? Date.getDate() : "0" + Date.getDate();

    return year + "" + month + "" + date;
}

module.exports = router;