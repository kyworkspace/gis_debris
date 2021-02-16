import { none } from 'ol/centerconstraint'
import { MousePosition } from 'ol/control'
import { createStringXY } from 'ol/coordinate'
import React, { useState, useEffect } from 'react'
import { lonlat, MainMap } from '../../../entities/CommonMethods'
import "./UtilBox.css"



function UtilBox() {
    const [NowTime, setNowTime] = useState('')
    const [OverLati, setOverLati] = useState('111')
    const [OverLong, setOverLong] = useState('')

    setInterval(() => {
        let today = new Date();
        let dateString = today.toLocaleDateString('ko-Kr');
        let dayName = today.toLocaleDateString('ko-KR', { weekday: 'long' });
        let timeString = today.toLocaleTimeString('it-IT')
        setNowTime(dateString + dayName + timeString)
    }, 1 * 1000)



    return (
        <div className="util_mn_top">
            <div className="util_box">
                <p>{NowTime}</p>
            </div>

            <div className="util_box">
                <p className="util_tit">위도</p>
                <p className="util_tit">경도</p>
            </div>
        </div>
    )
}


export default UtilBox
