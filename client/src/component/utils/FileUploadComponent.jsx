import React, { useEffect, useState } from 'react'
import Dropzone from 'react-dropzone'
import { pictureInsert } from '../../entities/CommonMethods';


function FileUploadComponent(props) {
    const [Files, setFiles] = useState([])
    const {existfiles} = props;
    useEffect(() => {
        setFiles(existfiles);
    }, [existfiles])


    const onDropHandler = async (files)=>{
        const uploadFileList = await Promise.all(
            files.map(file=>{
                return pictureInsert(file).then(response=>{return response.data.fileInfo});
            })
        )
        setFiles([...Files,...uploadFileList])
        props.refreshFunction([...Files,...uploadFileList])
    }

    

    const deleteHandler =(image)=>{
        //삭제하고자하는 이미지 인덱스
        const currentIndex = Files.indexOf(image);
        //기존 이미지 복사
        let newImages = [...Files]
        //삭제
        newImages.splice(currentIndex,1);
        //덮어씌움
        setFiles(newImages)
        //부모 컴포넌트에 값 전달
        props.refreshFunction(newImages);
    }

    return (
        <div style={{ justifyContent:'space-between'}}>
            <Dropzone onDrop={onDropHandler}>
            {({getRootProps, getInputProps}) => (
                <section>
                <div 
                    style={{ 
                        width:750 , height:240, border : '1px solid lightgray',
                        alignItems:'center' , justifyContent:'center',
                        textAlign:'center'
                    }}
                    {...getRootProps()}
                >
                    <input {...getInputProps()} accept='image/*' multiple/>
                    <p>사진을 드래그하여 넣어주세요</p>
                    <br/>
                    <p>확장자는 *.jpg,*.jpeg,*.png 만 가능합니다.</p>
                    <br/>
                    <p>목록에서 사진을 클릭하면 삭제됩니다.</p>
                </div>
                </section>
            )}
            </Dropzone>
            <div style={{display:'flex', width:"750px",height:'240px',overflowX:'scroll'}}>
                {Files.map((item,index)=>(
                    <div key={index} style={{margin:'10px'}} onClick={()=>deleteHandler(item)}>
                        <img style={{height:'200px'}}
                        src = {`http://localhost:5000/${item.path||item.file_path}`}
                        />
                    </div>
                ))}

            </div>
        </div>
    )
}

export default FileUploadComponent
