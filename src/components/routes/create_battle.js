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
        this.handleClickCreate = this.handleClickCreate.bind( this );
        this.query = this.query.bind( this )
    }

    handleValueChange( event )
    {
        this.setState( {
            name: event.target.value
        });
    }

    handleClickCreate( event )
    {
        if ( this.state.name !== "" )
        {
            return this.query( this.state.name );
        }
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
                <TextField label="이름" type="text" name="name" value={this.state.name} onChange={this.handleValueChange}/>
                <Button variant={"outlined"} color={"primary"}  onClick={this.handleClickCreate}>생성</Button>
            </div>
        )
    }
}

export default withStyles(styles)(CreateBattlePage)