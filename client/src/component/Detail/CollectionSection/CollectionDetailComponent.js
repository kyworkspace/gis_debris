import React, { useEffect, useRef, useState } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import ImageSlider from '../../utils/ImageSlider';
import { Button, message, Modal } from 'antd';
import FileUploadComponent from '../../utils/FileUploadComponent';
import { deleteFileAll, FileUpload, selectFileList } from '../../../entities/CallbackMethod';
import { formatLat, formatLon } from '../../../entities/CommonMethods'


function CollectionDetailComponent(props) {
    const {item} = props;
    console.log({item})

    const useStyles = makeStyles({
        table: {
            minWidth: 150,
        },
        input: {
            display: 'none',
        },
    });

    const classes = useStyles();
    const [ModalVisible, setModalVisible] = useState(false)
    const [ModalSubmitLoading, setModalSubmitLoading] = useState(false);
    const [Files, setFiles] = useState([])//최초 실행될때의 파일 리스트
    
    const fileRef = useRef();

    const coordinateAllDisplay = (coordinate) =>{
        //데이터 구조가 
        //["34.45456454 126.654564564 , 35.54564564 128.56487897"]
        if(!coordinate) return false;
        let coordinateArr = coordinate.split(",")
        
        let component = coordinateArr.map(item=>{
            const splitItem = item.split(" ")
            return (
             <>
            <div>{formatLat(Number(splitItem[1]),0)}</div>
            <div>{formatLon(Number(splitItem[0]),0)}</div>
            </>
            )
        });
        return component;
    }



    



    useEffect(() => {
        let body = {
            target_table : 'tb_odm_col_ser2',
            target_seq : item.seq_no
        }
        selectFileList(body)
        .then(response=>{
            if(response.success){
                if(response.objList.length>0){
                    message.success("파일목록을 불러오는데 성공했습니다.")
                    setFiles(response.objList);
                    fileRef.current = response.objList;
                }
            }else{
                message.error("파일 목록을 불러오는데 실패했습니다.")
            }
        })
        
    }, [])


    const updateFiles=(newFiles)=>{
        fileRef.current = newFiles;
    }
    const onOpenInvPictureUploadModal =()=>{
        setModalVisible(true);
    }
    const modalOk = () => {
        setModalSubmitLoading(true);
        let body = {
            target_table : "tb_odm_col_ser2",
            target_seq : item.seq_no,
            files : fileRef.current
        }
        if(Files){ //기존에 파일있으면 삭제
            deleteFileAll(body)
            .then(response=>{
                if(response.success){
                    if(fileRef.current.length>0){ //새로운거 추가
                        FileUpload(body)
                        .then(response=>{
                            if(response.success){
                                fileEditCompleted();
                            }else{
                                message.error("수정 실패")
                                setModalSubmitLoading(false);
                            }
                        })
                    }else{
                        fileEditCompleted();
                    }
                }else{
                    message.error("수정 실패")
                    setModalSubmitLoading(false);
                }
            })
        }
        
      };
    
    const modalCancel = () => {
        setModalVisible(false)
    };
    const fileEditCompleted=()=>{
        message.success("수정 성공")
        setModalSubmitLoading(false);
        setModalVisible(false)
        setFiles(fileRef.current);
    }
    

    return (
        <>
        
        <TableContainer component={Paper} style={{padding:'10px' }}>
            <div style={{paddingLeft:'10px'}}>
                <ImageSlider detail={Files}/>   
            </div>
        <div>
            {/* <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
            <label htmlFor="icon-button-file"> */}
            <IconButton color="primary" aria-label="upload picture" component="span" onClick={onOpenInvPictureUploadModal}>
            <PhotoCamera />
            </IconButton>
            사진 업로드 및 수정
            {/* </label> */}
        </div>
            
        <Table className={classes.table} aria-label="simple table">
          <TableBody>
            <TableRow>
                <TableCell align="right">사업명</TableCell>
                <TableCell align="center">{item.col_ser_dtl}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="right">발주처</TableCell>
                <TableCell align="center">{item.col_ord_agent}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="right">지역</TableCell>
                <TableCell align="center">{item.col_city} &nbsp; {item.col_region} </TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="right">년도</TableCell>
                <TableCell align="center">{item.col_year}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="right">수거면적(ha)</TableCell>
                <TableCell align="center">{item.col_area}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="right">수거량(ton)</TableCell>
                <TableCell align="center">{item.col_amount}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="right">페어망(ton)</TableCell>
                <TableCell align="center">{item.col_fishing_net}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="right">고철류(ton)</TableCell>
                <TableCell align="center">{item.col_scrap}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="right">로프류(ton)</TableCell>
                <TableCell align="center">{item.col_rope}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="right">통발류(ton)</TableCell>
                <TableCell align="center">{item.col_nettrap}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="right">기타(ton)</TableCell>
                <TableCell align="center">{item.col_etc}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="right">좌표</TableCell>
                <TableCell align="center">{coordinateAllDisplay(item.col_coor1)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>


      <Modal
          visible={ModalVisible}
          title={`${item.col_year}년 ${item.col_city} ${item.col_ser_dtl} 사진등록`}
          onOk={modalOk}
          onCancel={modalCancel}
          footer={[
            <Button key="back" onClick={modalCancel}>
              Return
            </Button>,
            <Button key="submit" type="primary" loading={ModalSubmitLoading} onClick={modalOk}>
              Submit
            </Button>,
          ]}
          height={800}
          width={800}
        >
        <FileUploadComponent existfiles = {Files} refreshFunction={updateFiles}/> 
        </Modal>


      </>
    )
}

export default CollectionDetailComponent
