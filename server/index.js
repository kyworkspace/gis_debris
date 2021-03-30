const express = require("express")
// const {Client} = require("pg");
const cors = require('cors')
const bodyParser = require('body-parser');
// const config = require("./config/key");

const app = express()
const port = process.env.PORT || 5000


app.use(cors())
app.use(bodyParser.urlencoded({limit:'10mb', extended:true}));
app.use(bodyParser.json({limit:'10mb'}));


app.get("/",(req,res)=>res.send("HELLO WORLD"));
app.use('/gis/track',require('./routes/track'));
app.use('/gis/eng',require('./routes/eng'));
app.use('/gis/file',require('./routes/files'));

/**
 * ref : https://expressjs.com/ko/starter/static-files.html
 * express 서버에서 정적파일을 제공받을때 세팅함
 * 파일을 올리고 파일의 절대 경로를 통해 해당 폴더내의 파일을 표출하고자 할때 사용
 * 아래의 코드는 /uploads라는  URL 경로르 통해 정적자산인 uploads 폴더에 접근 한다는 뜻
 * 파일을 업로드 하는 경우 아래와 같이 filePath를 설정하도록 해둠
 * 그렇기 때문에 uploads/ 폴더를 찾아서 이동함
 * "uploads\1614218551675_1.png"
 */
app.use('/uploads/pictures', express.static('uploads/pictures'));


app.listen(port,()=>console.log("Port Access Completed!!!!"))