import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import socketio from "socket.io-client";
import {Socket} from "../system/socket";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {post_query} from "../system/util";
import DialogContent from "@material-ui/core/DialogContent";

const styles = (theme) => (
    {

    }
);

class CreateBattlePage extends  React.Component
{
    state ={
        name: ""
    };

    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind( this );
    }

    handleValueChange( event )
    {

    }

    query( battle_name )
    {
        return post_query( "create_battle", {
            battle_id: battle_name
        });
    }


    render() {
        return(
            <div>
                <TextField label="이름" type="text" name="name" value={this.state.name} onChange={this.handleValueChange} />

            </div>
        )
    }
}

export default withStyles(styles)(CreateBattlePage)