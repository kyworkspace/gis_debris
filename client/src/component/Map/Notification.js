import React from 'react'
import { Affix, Button, notification } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { useState } from 'react';
function Notification(props) {
    
  const [Layers, setLayers] = useState([]);
  const {title,description,duration,callButton,notificationKey} = props;
  const [NotificationOpened, setNotificationOpened] = useState(false)

  const openNotification = () => {
    const args = {
      message: title ? title :'Notification Title',
      description:
        description ? description : 'Description Space',
      duration: duration ? duration : 0,
      bottom : 30,
      placement:"bottomRight",
      key : notificationKey ? notificationKey : 0
    };

    if(NotificationOpened){
      notification.close(notificationKey)
      setNotificationOpened(false)
    }else{
      notification.open(args);
      setNotificationOpened(true)
    }
  };
    return (
            <Affix style={{zIndex:1, position:'absolute', top:"10vh", right:'50px'}}>
                <Button type="primary" onClick={() => openNotification()} shape="round">
                {callButton}
                </Button>
            </Affix>
    )
}

export default Notification
