import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import {Card, CardHeader, Paper, TextField, Avatar, CardContent} from "@material-ui/core";
import { red } from '@material-ui/core/colors';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Socket} from "../system/socket";

const styles = (theme) =>(
    {
        '*': {
            margin: 0,
            padding: 0,
            'box-sizing': 'border-box'
        },
        root: {
            'box-sizing': 'border-box',
            width: "100%"
        },
        avatar: {
            backgroundColor: red[500],
            position: 'relative',
            left: 10,
            top: 10,

            width: 40,
            height: 40,
        },
        user_name: {
            fontSize: "1.2rem",
            position: 'relative',

            left: 50 + 10,
            top: -30
        },
        content_pos: {
            position: 'relative',
            left: 61,
            top: -30,
            'box-sizing': 'border-box',
            //width: "100%",
        },
        text: {
            position: 'relative',
            fontSize: "1.0rem",
            'box-sizing': 'border-box'
        }
    }
);

/*
                    <CardHeader
                        avatar={
                            <Avatar aria-label={"recipe"} className={classes.avatar}>
                                {name[0]}
                            </Avatar>}
                        title={ <div className={classes.user_name}>{name}</div> }
                    />
 */


class ChatBox extends React.Component
{
    render() {
        const {classes} = this.props;
        let log = this.props.log;

        let name = log.sender === undefined ? '하루가카' : log.sender;

        console.log("classes.root??", classes.root);

        return (
            <div className={classes.root}>
                <div>
                    <Avatar aria-label={"recipe"} className={classes.avatar}>
                        {name[0]}
                    </Avatar>

                    <Typography variant={"h2"} className={classes.user_name}>
                        {name}
                    </Typography>
                </div>

                <div className={classes.content_pos} >
                    <Typography variant={"h3"} className={classes.text}>
                        {
                            log.massages ? log.massages.map( c =>
                            {
                                return <div>{c}</div>;
                            }) : ''
                        }
                    </Typography>
                </div>
            </div>
        )
    }

}

export default withStyles(styles)( ChatBox );
