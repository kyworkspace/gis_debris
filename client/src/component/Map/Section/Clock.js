import React, { useState, useEffect } from 'react'

function Clock() {
    const [NowDay, setNowDay] = useState('')
    const [NowDate, setNowDate] = useState('')
    const [NowTime, setNowTime] = useState('')

    useEffect(() => {
        setInterval(() => {
            let today = new Date();
            let dateString = today.toLocaleDateString('ko-Kr');
            let dayName = today.toLocaleDateString('ko-KR', { weekday: 'long' });
            let timeString = today.toLocaleTimeString('it-IT')
            setNowDate(dateString)
            setNowDay(dayName)
            setNowTime(timeString)

        }, 1 * 1000)
    }, [])

    return (
        <p style={{ margin: '0 10px' }}>{NowDate} { NowDay} {NowTime}</p>
    )
}

export default Clock
