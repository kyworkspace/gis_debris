const express = require("express")
const {Client} = require("pg");
const app = express()
const port = 5000

app.get("/",(req,res)=>res.send("HELLO WORLD"));
app.listen(port,()=>console.log("EXAMPLE"))

const client = new Client({
    user : "postgres",
    host : "118.220.143.152",
    database:"eNavDB",
    password:"hongstouch",
    port:5432
})

client.connect().then(response=>{console.log("DB Connected!!")})

client.query("select now()",(err,res)=>{
    console.log(res.rows);
    client.end();
})