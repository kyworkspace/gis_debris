const express = require('express');
const router = express.Router();


const config = require("../config/key");

router.post("/ship",(req,res)=>{
    client.query("select now()",(err,queryRes)=>{
        if(err) return res.json({success:false,err})

        let obj= [];
        queryRes.rows.forEach(item=>{
            obj.push(item)
        })
        res.status(200).json({success:true,obj})
        client.end();
    })
})
router.post("/track",(req,res)=>{

    const {Client} = require("pg");
    const client = new Client(config.DBAccess)
    client.connect();

    let {mmsi,startDate,endDate} = req.body
    let queryString=`select
                        *
                    from
                        \"AIS\".track_92_5 t
                    where
                        t.record_time between to_timestamp('${startDate}','yyyy-mm-dd hh24:mi:ss')  
                        and to_timestamp('${endDate}','yyyy-mm-dd hh24:mi:ss') and mmsi = ${mmsi}`
    client.query(queryString,(err,queryRes)=>{
        if(err) return res.json({success:false,err})
        let trackList= [];
        queryRes.rows.forEach(item=>{
            trackList.push(item)
        })
        client.end();
        return res.status(200).json({success:true,trackList})
    })
    
    
})

router.post("/list",(req,res)=>{
    const {Client} = require("pg");
    const client = new Client(config.DBAccess)
    client.connect()

    let {shipType,shipName,startDate,endDate} = req.body
    let queryString = `select
                            ms.mmsi_id,
                            ms.ship_ko_nm ,
                            ms.call_sign ,
                            t.record_time,
                            ms.owner_name ,
                            ms.owner_address ,
                            ms.reg_port_name ,
                            ms.ship_mktrasg ,
                            ms.engine_kw ,
                            ms.ship_length ,
                            ms.ship_width ,
                            ms.ship_depth ,
                            ms.total_ton 
                        from
                            (
                                select
                                    mmsi , max(record_time) as record_time 
                                from
                                    "AIS".track_92_5 t
                                where
                                    t.record_time between '${startDate}' and '${endDate}' 
                                group  by mmsi
                            ) t
                        left join ship_t_tb ms on
                            t.mmsi = ms.mmsi_id ::numeric
                        where ms.ship_ko_nm is not null
                        and ms.ship_ko_nm like '%${shipName}%'
                        order by ms.ship_ko_nm
                        `
    client.query(queryString,(err,queryRes)=>{
        let obj= [];
        queryRes.rows.forEach(item=>{
            obj.push(item)
        })
        client.end()
        return res.status(200).json({success:true,obj})
    })
    // client.query(queryString)
    // .then(response=>{ 
    //     let obj= [];
    //     response.rows.forEach(item=>{
    //         obj.push(item)
    //     })
    //     return res.status(200).json({success:true,obj})
    // })
    // .catch(err=>{
    //     return res.json({success:false,err})
    // })
    // .then(()=>client.end())
})

module.exports = router;