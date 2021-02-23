import React, { useState } from 'react'
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Modal } from 'antd';


const useStyles = makeStyles((theme) => ({
    cardRoot :{
        minWidth: '100%',
    },
    cardMedia :{
        height : 140
    }
  }));



function CardSection(props) {
    const {info} = props;
    const classes = useStyles();

    const [Visible, setVisible] = useState(false);

    const onMoveToPoint =(info)=>{
        props.moveToPoint(info)
    }
    const onModalHandler =()=>{
        setVisible(!Visible)
    }



    return (
        <>
        <Card className={classes.cardRoot}>
            <CardActionArea>
                <CardMedia
                className={classes.cardMedia}
                image={info.src}
                title="Contemplative Reptile"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {info.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {info.desc}
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick ={()=>onMoveToPoint(info)} >
                {info.action1}
                </Button>
                <Button size="small" color="primary" onClick={onModalHandler}>
                {info.action2}
                </Button>
                    <Modal
                    title={`${info.title} CCTV 영상`}
                    centered
                    visible={Visible}
                    onOk={() => setVisible(false)}
                    onCancel={() => setVisible(false)}
                    width={1000}
                    >
                    <video style={{width:'100%'}} src={info.videoSrc} controls/>
                    </Modal>
            </CardActions>
        </Card>
        <Divider/>
        </>
    )
}

export default CardSection
