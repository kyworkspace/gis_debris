const express = require('express');
const router = express.Router();

const {Client} = require("pg");
const config = require("../config/key");
const client = new Client(config.DBAccess)
client.connect().then(response=>{console.log("DB ENG Connected!!")})

router.post("/getInvAndColDataInMarinezone",(req,res)=>{
    let {marinezoneId}=req.body;
    let queryString=`
    select
    *
    from
        (
        select
            col_year, sum(col_amount) as col_amount, sum(col_fishing_net) as col_fishing_net, sum(col_scrap) as col_scrap, sum(col_nettrap) as col_nettrap, sum(col_rope) as col_rope, sum(col_etc) as col_etc
        from
            tb_odm_col_ser tois
        where
            col_marine_zone like '%${marinezoneId}%'
        group by
            col_year ) as col
    full outer join (
        select
            inv_year , inv_type, sum(inv_int_mng_area) as inv_int_mng_area, sum(inv_area) as inv_area, sum(inv_qnt) as inv_qnt, sum(inv_amount) as inv_amount
        from
            tb_odm_inv_ser tois
        where
            inv_marine_zone like '%${marinezoneId}%'
        group by
            inv_year , inv_type ) as inv on
        col.col_year = inv.inv_year
    `
    client.query(queryString,(err,queryRes)=>{
        if(err) return res.json({success:false,err})
        let objList= [];
        queryRes.rows.forEach(item=>{
            objList.push(item)
        })
        // client.end();
        return res.status(200).json({success:true,objList})
    })
    
    
})



module.exports = router;