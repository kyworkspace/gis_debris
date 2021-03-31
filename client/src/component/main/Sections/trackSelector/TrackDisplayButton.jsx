import { Switch } from 'antd'
import React, { useState } from 'react'

function TrackDisplayButton(props) {
    
    const {loading,visible} = props.info;
    const [Input, setInput] = useState(visible);

    const onUnCheckButton =()=>{
        setInput(!Input)
        let obj = {
            ...props.info,
            visible : !Input
        }
        props.onTrackDisplay(obj)
    }

    return (
        <Switch checked={Input} checkedChildren="표시" unCheckedChildren="미표시" onChange={onUnCheckButton} loading={loading}/>
    )
}

export default TrackDisplayButton
