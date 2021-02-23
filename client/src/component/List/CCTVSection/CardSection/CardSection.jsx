import React from 'react'
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';


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

    const onMoveToPoint =(info)=>{
        props.moveToPoint(info)
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
                해당 위치로 이동
                </Button>
                <Button size="small" color="primary">
                상세보기
                </Button>
            </CardActions>
        </Card>
        <Divider/>
        </>
    )
}

export default CardSection
