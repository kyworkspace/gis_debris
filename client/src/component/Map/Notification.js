import React from 'react'
import { Affix, Button, notification } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { useState } from 'react';
function Notification(props) {
    
  const [Layers, setLayers] = useState([]);
  const {title,description,duration} = props;

  const openNotification = () => {
    const args = {
      message: title ? title :'Notification Title',
      description:
        description ? description : 'Description Space',
      duration: duration ? duration : 3,
      bottom : 30,
      placement:"bottomRight"
    };
    notification.open(args);
  };
    return (
            <Affix style={{zIndex:1, position:'absolute', top:"90vh", right:'100px'}}>
                <Button type="primary" onClick={() => openNotification()} shape="round">
                알림창 만들고 싶을때
                </Button>
            </Affix>
    )
}

export default Notification
