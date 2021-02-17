const express = require("express")
// const {Client} = require("pg");
const cors = require('cors')
const bodyParser = require('body-parser');
// const config = require("./config/key");

const app = express()
const port = process.env.PORT || 5000


app.use(cors())
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// const client = new Client(config.DBAccess)
// client.connect().then(response=>{console.log("DB Connected!!")})

app.get("/",(req,res)=>res.send("HELLO WORLD"));
app.use('/gis/track',require('./routes/track'));
app.use('/gis/eng',require('./routes/eng'));


app.listen(port,()=>console.log("Port Access Completed!!!!"))