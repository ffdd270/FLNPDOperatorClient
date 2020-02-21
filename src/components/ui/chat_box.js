import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import {Card, Paper, TextField} from "@material-ui/core";
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
    }
);


class ChatBox extends React.Component
{

    render() {

        return (
            <div>
                {this.props.text}
            </div>
        )
    }

}

export default ChatBox;
