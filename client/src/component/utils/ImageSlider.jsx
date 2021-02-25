import { Empty } from 'antd';
import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery';

function ImageSlider(props) {
    const [Images, setImages] = useState([])
    const [Loading, setLoading] = useState(true);
    useEffect(() => {
        console.log(props.detail);
        if(props.detail && props.detail.length > 0){ //등록된 이미지가 있는 경우
            let images=[];
            props.detail.map(item=>{
                images.push({
                    original:`http://localhost:5000/${item.file_path||item.path}`,
                    thumbnail:`http://localhost:5000/${item.file_path||item.path}`
                })
            })
            setImages(images)
            setLoading(false)
        }else{
            setLoading(true);
        } 
    }, [props.detail])
    
    return (
        <div>
            {Loading ? 
            <Empty description={<div >등록된 사진이 없습니다.</div>} style={{width:'400px', height:'300px'}}/>
            : 
            <ImageGallery items={Images} />}
        </div>
    )
}

export default ImageSlider
