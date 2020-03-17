import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import CharacterCardForm from '../ui/character_card_form'
import socketio from "socket.io-client";
import {Socket} from "../system/socket";
import BattleChat from "../ui/battle_chat_main";
import OperatorView from "../ui/operator_view";
import BattleList from "../dialog/battle_list";
import {ChatLog} from "../system/chat_log";
import {Eventer} from "../system/eventer";

const styles  = (theme) =>(
    {
        enemy: {
            position: 'fixed',
            left: 500
        },
        friend: {
            position: 'fixed',
            left: 0
        }
    }
);

class BattleHome extends React.Component
{
    state = {
        characters: [],
        battle_id: "",
    };


    constructor(props) {
        super(props);

        this.setBattleSocket = this.setBattleSocket.bind( this );
        this.onSelectBattle = this.onSelectBattle.bind( this );
    }


    setBattleSocket( battle_id ) {
        Socket.AddEventHandler( "units", (msg)=>{
            this.setState( {
                characters: msg
            });
        });

        Socket.AddEventHandler( "added unit", (msg)=>{
            console.log ( msg );

            this.state.characters.push( msg );

            this.setState({
                characters: this.state.characters
            });
        });

        Socket.AddEventHandler( 'command', (msg)=>
        {
            Eventer.SendMsg(msg.command, msg);
        });

        this.callGetCharacter(battle_id).then(
            (json)=>
            {
                this.setState( {
                    characters : json
                } );
            });

        this.setState({
            battle_id: battle_id
        });
    }

    onSelectBattle( battle_id )
    {
        this.setBattleSocket( battle_id );
    }

    async callGetCharacter( id )
    {
        const response = await fetch("/api/get_all_units/" + id);
        return await response.json();
    }

    render()
    {
        const { classes } = this.props;

        console.log( classes );

        let enemys = [];
        let friends = [];

        if( this.state.characters )
        {
            this.state.characters.map( c =>
            {
                if( c.is_enemy )
                {
                    enemys.push( c );
                }
                else
                {
                    friends.push( c );
                }
            } );
        }


        return (
            <div>
                <BattleList onSelectBattle={this.onSelectBattle}/>
                <div className={classes.friend}>
                    {
                        friends.map( c =>
                        {
                            return <CharacterCardForm character={c} battle_id={this.state.battle_id}/>
                        })
                    }
                </div>

                <div className={classes.enemy}>
                    {
                        enemys.map( c =>
                        {
                            return <CharacterCardForm character={c} battle_id={this.state.battle_id}/>
                        })
                    }
                </div>

                <OperatorView battle_id={this.state.battle_id}/>
                <BattleChat  battle_id={this.state.battle_id}/>
            </div>
        )
    }

}

export default withStyles(styles)(BattleHome);