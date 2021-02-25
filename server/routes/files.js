const express = require('express');
const router = express.Router();
const multer = require('multer');
const config = require("../config/key");

/**
 * file upload 및 Download에 사용
 * 
 * file Table
 * TableName : tb_odm_file
 * seq : 시퀀스 번호
 * target_table : 대상 테이블 명
 * target_seq : 대상 테이블 시퀀스 번호
 * original_name : 파일 원본명
 * encrypted_name : 암호화파일명
 * file_size : 파일 크기
 * file_type : 파일 타입
 * file_path : 파일 경로
 * **/

 /*
    //테이블 생성
    create table tb_odm_file(
    seq numeric primary key,
    target_table varchar not null,
    target_seq numeric not null,
    original_name varchar not null,
    encrypted_name varchar not null,
    file_size numeric ,
    file_type varchar,
    file_path varchar
    );
    //시퀀스
    CREATE SEQUENCE seq_tb_odm_file START 1;
***/

var storage = multer.diskStorage({
    //파일이 저장되는 물리적인 경로
   destination: function (req, file, cb) {
     cb(null, 'uploads/pictures/')
   },
   filename: function (req, file, cb) {
     cb(null, `${Date.now()}_${file.originalname}`)
   }
 })
 //사진 올릴때 쓸 multer Storage
 //이미지를 여러개 받을때는 array('키',최대 갯수)로 한다. 하면 되는데 안되서...files를 map으로 돌려서 업로드 하도록 함
 var uploadPicture = multer({ storage: storage }).single("file")

router.post('/upload/picture',(req,res)=>{
  uploadPicture(req,res,(err)=>{
      //실패했을때
      if(err) return res.json({success:false, err});
      /***
       * 성공했을때 파일정보를 전달 fileInfo
       * destination: "uploads/pictures/"
       * encoding: "7bit"
       * fieldname: "file"
       * filename: "1614219520378_1.png"
       * mimetype: "image/png"
       * originalname: "1.png"
       * path: "uploads\pictures\1614219520378_1.png"
       * size: 518107
       * ***/
      return res.json({success:true,fileInfo : res.req.file})
    })
})

router.post("/upload",(req,res)=>{
  const {Client} = require("pg");
  const client = new Client(config.DBAccess)
  client.connect()
  let {target_table, target_seq, files} = req.body;
  if(files.length>0){
    queryString = `insert into tb_odm_file (seq,target_table,target_seq,original_name,encrypted_name,file_size,file_type,file_path) values`
    files.forEach((element,idx) => {
      if(idx!=0){
        queryString+=','
      }
      queryString+=`(nextval('seq_tb_odm_file'),
                      '${target_table}',
                      ${target_seq},'
                      ${element.originalname||element.original_name}',
                      '${element.filename||element.encrypted_name}',
                      ${element.size||element.file_size},
                      '${element.mimetype||element.file_type}',
                      '${element.path||element.file_path}')`
    });
    client.query(queryString,(err)=>{
      if(err) return res.json({success:false,err})
      client.end();
      return res.status(200).json({success:true})
    })
  }else{
    return res.status(200).json({success:true})
  }
})
router.post('/deleteAll',(req,res)=>{ //파일 삭제
  const {Client} = require("pg");
  const client = new Client(config.DBAccess)
  client.connect()
  let {target_table, target_seq} = req.body;
  let queryString = `delete from tb_odm_file where target_table='${target_table}' and target_seq=${target_seq}` //해당 목록 삭제했다가 전체 추가
  client.query(queryString,(err)=>{
    if(err) return res.json({success:false,err})
    client.end();
    return res.status(200).json({success:true})
  })
})

router.post('/list',(req,res)=>{
  let {target_table,target_seq} = req.body;
  const {Client} = require("pg");
  const client = new Client(config.DBAccess)
  client.connect()

  let queryString = `select * from tb_odm_file where target_table = '${target_table}' and target_seq=${target_seq}`;
  client.query(queryString,(err,queryRes)=>{
    if(err) return res.json({success:false,err});
    let objList= [];
    queryRes.rows.forEach(item=>{
      objList.push(item)
    })
    client.end()
    return res.status(200).json({success:true,objList})
  })
})

 

module.exports = router;