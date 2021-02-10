const express = require('express');
const { client } = require('../index');
const router = express.Router();


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

module.exports = router;