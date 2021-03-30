import React from 'react'
import { Affix, Button, notification } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { useState } from 'react';
import './Notification.css'

export const rerenderNotification=(key)=>{
  notification.close(key);
}


function Notification(props) {
      
  const {title,description,duration,callButton,notificationKey} = props;
  const [NotificationOpened, setNotificationOpened] = useState(false)

  const onClickCloseButton = ()=>{
      notification.close(notificationKey)
      setNotificationOpened(false)
  }

  const openNotification = () => {
    const args = {
      message: title ? title :'Notification Title',
      description:
        description ? description : 'Description Space',
      duration: duration ? duration : 0,
      bottom : 30,
      placement:"bottomRight",
      key : notificationKey ? notificationKey : 0,
      className:`notification-${notificationKey}`,
      onClose : onClickCloseButton
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
            <Affix style={{zIndex:1, position:'absolute', top:props.notificationStyle.top, right:props.notificationStyle.right}}>
                <Button type="primary" onClick={() => openNotification()} shape="round">
                {callButton}
                </Button>
            </Affix>
    )
}

export default Notification
