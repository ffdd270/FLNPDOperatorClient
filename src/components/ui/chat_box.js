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
        paper: {

        },
        avatar: {
            backgroundColor: red[500],
            width: 40,
            height: 40,
        },
        user_name: {
            fontSize: "1.2rem",
            position: 'relative',
            bottom: 10,
        },
        content_pos: {
            position: 'relative',
            left: 56,
            top: -50,
        },
        text: {
            fontSize: "1.0rem"
        }
    }
);


class ChatBox extends React.Component
{
    render() {
        const {classes} = this.props;
        let name = this.props.name === undefined ? '하루가카' : this.props.name;

        return (
            <div>
                <Card elevation={0}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label={"recipe"} className={classes.avatar}>
                                {name[0]}
                            </Avatar>}
                        title={ <div className={classes.user_name}>{name}</div> }
                    />
                    <CardContent className={classes.content_pos}>
                        <Typography variant={"h3"} className={classes.text}>
                            {this.props.text}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        )
    }

}

export default withStyles(styles)( ChatBox );
