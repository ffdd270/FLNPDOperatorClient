import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import CharacterCardForm from '../ui/character_card_form'
import socketio from "socket.io-client";
import {Socket} from "../system/socket";
import BattleChat from "../ui/battle_chat_main";
import OperatorView from "../ui/operator_view";
import BattleList from "../dialog/battle_list";

const styles  = (theme) =>(
    {
        enemy: {
            position: 'fixed',
            left: 0
        },
        friend: {
            position: 'fixed',
            left: 500
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
        const response = await fetch("/api/get_party_units/" + id);
        return await response.json();
    }

    render()
    {
        const { classes } = this.props;

        console.log( classes );

        return (
            <div>
                <BattleList onSelectBattle={this.onSelectBattle}/>
                {
                    this.state.characters ? this.state.characters.map( c =>
                    {
                        if ( c.is_enemy )
                        {
                            return <CharacterCardForm character={c} set_position={0}/>
                        }
                        else
                        {
                            return <CharacterCardForm character={c} set_position={250}/>
                        }
                    }) : ''
                }
                <OperatorView battle_id={this.state.battle_id}/>
                <BattleChat/>
            </div>
        )
    }

}

export default withStyles(styles)(BattleHome);