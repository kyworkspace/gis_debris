import React, { useState, useEffect } from 'react'
import { formatLat, formatLon } from '../../../../entities/CommonMethods'
import { MainMap } from '../../../../entities/MapLayer'
import "./UtilBox.css"
import $ from 'jquery';
import Clock from './Clock';


function UtilBox() {

    const [Flag, setFlag] = useState(false)
    const [OverLati, setOverLati] = useState('111')
    const [OverLong, setOverLong] = useState('')

    useEffect(() => {
        let coord = [];
        let lon = '';
        let lat = '';
        MainMap.on('pointermove', function (evt) {
            coord = evt.coordinate;
            if (coord.length > 0) {
                lon = coord[0]
                lat = coord[1]
            }
        })
        document.addEventListener('pointermove', function () {
            $("#main_la_view").text(formatLat(Number(lat), 0));
            $("#main_lo_view").text(formatLon(Number(lon), 0));
        });

    }, [])





    return (
        <div className="util_mn_top">
            <div className="util_box">
                <Clock />
            </div>

            <div className="util_box">
                <p className="util_tit">위도</p>
                <p style={{ width: '140px' }} className="util_cnt"><font name="global_La" id="main_la_view"><span style={{ color: 'white' }}>..</span></font></p>
                <p className="util_tit">경도</p>
                <p style={{ width: '140px' }} className="util_cnt"><font name="global_La" id="main_lo_view"><span style={{ color: 'white' }}>..</span></font></p>
            </div>
        </div>
    )
}


export default UtilBox
