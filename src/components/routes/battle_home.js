import React from 'react';
import CharacterCardForm from '../ui/character_card_form'
import socketio from "socket.io-client";

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
        const socket = socketio.connect('http://localhost:3000');
        (() => {
            socket.emit('init', { name: 'bella' });

            socket.on('welcome', async (msg) =>
            {
                console.log(msg);
                let body = await this.callGetCharacter( 1 );
                let characters = [ body ];

                this.setState( {
                    characters : characters
                } );
            });
        })();
    }


    async callGetCharacter( id )
    {
        const response = await fetch("/api/get_character/" + id);
        const body = await response.json();

        return body;
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
            </div>
        )
    }


}

export default BattleHome;