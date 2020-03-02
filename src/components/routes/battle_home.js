import React from 'react';
import CharacterCardForm from '../ui/character_card_form'
import socketio from "socket.io-client";
import {Socket} from "../system/socket";
import BattleChat from "../ui/battle_chat_main";
import OperatorView from "../ui/operator_view";

class BattleHome extends React.Component
{
    state = {
        characters : []
    };


    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind( this );
    }


    componentDidMount() {
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

        this.callGetCharacter('Sample').then(
            (json)=>
            {
                this.setState( {
                    characters : json
                } );
            }
        );
    }

    async callGetCharacter( id )
    {
        const response = await fetch("/api/get_party_units/" + id);
        return await response.json();
    }

    render()
    {

        return (
            <div>
                {
                    this.state.characters ? this.state.characters.map( c =>
                    {
                        return <CharacterCardForm character={ c } />
                    }) : ''
                }
                <OperatorView/>
                <BattleChat/>
            </div>
        )
    }

}

export default BattleHome;