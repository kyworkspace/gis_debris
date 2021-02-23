import React, { useEffect, useState } from 'react'
import ListSearchBar from '../SearchSection/ListSearchBar'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { LinearProgress } from '@material-ui/core';
import CardSection from './CardSection/CardSection';

import choongnambo from '../../../Images/CCTV/choongnambo.jpg'
import choonjoobo from '../../../Images/CCTV/choonjoobo.jpg'
import hwagea from '../../../Images/CCTV/hwagea.jpg'
import kumkangbo from '../../../Images/CCTV/kumkangbo.jpg'
import nakdongbo from '../../../Images/CCTV/nakdongbo.jpg'
import sumjinbo from '../../../Images/CCTV/sumjinbo.jpg'
import tean from '../../../Images/CCTV/tean.jpg'
import testVideo from '../../../Videos/Forest - 49981.mp4'

import { videoFeature } from '../../../entities/FeatureLayer';
import { Point } from 'ol/geom';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
  }));

const datas=[
    {
        title : "충남보",
        desc : "CCTV-1",
        src : choongnambo,
        coordinate : [127.10136027621985,36.46142511049001],
        action1 : '위치 이동',
        action2 : 'CCTV 보기',
        action2Func : (name)=>{console.log(name)},
        videoSrc : testVideo,
    },
    {
        title : "태안보",
        desc : "CCTV-2",
        src : tean,
        coordinate : [126.3135140436423,36.57903463106371],
        action1 : '위치 이동',
        action2 : 'CCTV 보기',
        action2Func : (name)=>{console.log(name)},
        videoSrc : testVideo,
    }
    ,
    {
        title : "낙동강보",
        desc : "CCTV-3",
        src : nakdongbo,
        coordinate : [128.463587695448,35.839358160457195],
        action1 : '위치 이동',
        action2 : 'CCTV 보기',
        action2Func : (name)=>{console.log(name)},
        videoSrc : testVideo,
    },
    {
        title : "섬진강보",
        desc : "CCTV-4",
        src : sumjinbo,
        coordinate : [127.76184342900484,34.963645305753694],
        action1 : '위치 이동',
        action2 : 'CCTV 보기',
        action2Func : (name)=>{console.log(name)},
        videoSrc : testVideo,
    },
    {
        title : "금강보",
        desc : "CCTV-5",
        src : kumkangbo,
        coordinate : [126.9392491853058,36.31841073720779],
        action1 : '위치 이동',
        action2 : 'CCTV 보기',
        action2Func : (name)=>{console.log(name)},
        videoSrc : testVideo,
    },
    {
        title : "화개장터보",
        desc : "CCTV-6",
        src : hwagea,
        coordinate : [127.62386115800675,35.187864270170486],
        action1 : '위치 이동',
        action2 : 'CCTV 보기',
        action2Func : (name)=>{console.log(name)},
        videoSrc : testVideo,
    },
    {
        title : "충주보",
        desc : "CCTV-7",
        src : choonjoobo,
        coordinate : [127.10013043148294,37.403618347545695],
        action1 : '위치 이동',
        action2 : 'CCTV 보기',
        action2Func : (name)=>{console.log(name)},
        videoSrc : testVideo,
    }
]


function VideoListComponent(props) {
    const classes = useStyles();
    const [SearchTerm, setSearchTerm] = useState("");
    const [DisplayList, setDisplayList] = useState([]);
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        setDisplayList(datas);
    }, [])
    useEffect(() => {
        setLoading(false)
    }, [DisplayList])

    const MoveToVideoPoint =(info)=>{
        console.log(info.coordinate)
        videoFeature.setGeometry(new Point(info.coordinate))
        props.moveToPoint(info)
    }

    const renderVideoList = DisplayList.map((item,idx)=>{
        return (
        <ListItem key={idx}>
            <CardSection info={item} moveToPoint={MoveToVideoPoint}/>
        </ListItem>)
    })

    const onSearchHandler=(value)=>{
        console.log(value)
    }
    return (
        <>
        <ListSearchBar onInputChange={onSearchHandler} />
        <hr/>
        {Loading ?
            <LinearProgress />
        :
            <List className={classes.root}>
                    {renderVideoList}
            </List>
        }
          
        </>
    )
}

export default VideoListComponent
