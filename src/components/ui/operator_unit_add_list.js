import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import {Card, Paper, TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Socket} from "../system/socket";
import ChatBox from "./chat_box";
import {ChatLog} from "../system/chat_log";
import List from "@material-ui/core/List";


const styles = (theme) =>(
    {
         //여기에 코드 추가
    }
);



class OperatorUnitAddList extends React.Component
{
    constructor( props ) {
        super( props );


    }

    render() {
        const { classes } = this.props;

        return(
            <div>

            </div>
        )

    }

}


export default withStyles(styles)(OperatorUnitAddList)