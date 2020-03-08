import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import CharacterCardForm from '../ui/character_card_form'
import socketio from "socket.io-client";
import {Socket} from "../system/socket";
import {post_query} from "../system/util";

const styles = (theme) => (
    {

    }
);

class CreateBattlePage extends  React.Component
{
    constructor(props) {
        super(props);
    }

    query( battle_name )
    {
        return post_query( "create_battle", {
            battle_id: battle_name
        });
    }
    render() {


    }
}
